import { useEffect, useState, useCallback, useRef } from 'react';

// Mapping of lines to target element IDs
// Order matches the visual hierarchy (inner lines to top sections, outer lines to bottom sections)
const CONNECTIONS = [
  { id: 'statistics', x: 72, color: '#F2CA50', type: 'cross-through' },     // Topmost (Inner)
  { id: 'about', x: 64, color: '#F2CA50', type: 'center-path' },
  { id: 'services', x: 56, color: '#F2CA50', type: 'heading-connect', headingId: 'services-heading' },
  { id: 'border-services', x: 48, color: '#F2CA50', type: 'heading-to-cards' },
  { id: 'faq', x: 40, color: '#F2CA50', type: 'heading-connect', headingId: 'faq-heading' },
  { id: 'contact-form', x: 32, color: '#F2CA50', type: 'heading-to-cards-contact', headingId: 'contact-heading' },   // Bottommost (Outer)
];

interface Connection {
    id: string;
    x: number;
    color: string;
    type?: string;
    headingId?: string;
    crossThrough?: boolean; // Keep for backward compatibility if needed, though type handles it
}

export default function DecorativeLines() {
  const [paths, setPaths] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Add intersection observer refs
  const observedElements = useRef<Set<string>>(new Set());

  const updateLines = useCallback(() => {
    if (!wrapperRef.current) return;

    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    
    const docWidth = Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      window.innerWidth
    );
    
    setDimensions({ width: docWidth, height: docHeight });

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    
    // Get wrapper position to convert absolute coordinates to local coordinates
    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const wrapperTop = wrapperRect.top + scrollTop;
    const wrapperLeft = wrapperRect.left + scrollLeft;

    const newPaths = CONNECTIONS.map((conn) => {
      const element = document.getElementById(conn.id);
      if (!element) return '';

      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + scrollTop;
      
      // Check if element is rendered/visible
      if (rect.height === 0) return '';

      let targetY = 0;
      let targetX = 0;

      if (conn.type === 'cross-through') {
        // Logic for statistics: Center vertically on cards and span across all of them
        const gridElement = element.querySelector('.grid');
        if (gridElement) {
          const gridRect = gridElement.getBoundingClientRect();
          // Center vertically relative to the grid (which contains the cards)
          targetY = (gridRect.top + gridRect.height / 2 + scrollTop) - wrapperTop;
          // Extend to the right edge of the grid
          targetX = (gridRect.right + scrollLeft) - wrapperLeft;
        } else {
          // Fallback if grid not found
          targetY = absoluteTop - wrapperTop + 100;
          targetX = (window.innerWidth * 0.1) + conn.x + 50;
        }
        // Path
        return `M ${conn.x} 0 L ${conn.x} ${targetY} L ${targetX} ${targetY}`;

      } else if (conn.type === 'center-path') {
        // Logic for about section: 
        // 1. Down to section top
        // 2. Right to screen center
        // 3. Down to card vertical center
        // 4. Right to card
        const card = document.getElementById('about-card');
        if (card) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterY = (cardRect.top + cardRect.height / 2 + scrollTop) - wrapperTop;
            const cardLeft = (cardRect.left + scrollLeft) - wrapperLeft;
            const screenCenter = (window.innerWidth / 2) - wrapperLeft; // Center relative to wrapper
            
            // Start Y: We can use the top of the section plus some padding to make the turn
            // Or maybe align the turn with the start of the heading or image?
            // Let's use absoluteTop (section top) + 100px as the turn point for the first horizontal segment
            const firstTurnY = absoluteTop - wrapperTop + 100;

            return `M ${conn.x} 0 L ${conn.x} ${firstTurnY} L ${screenCenter} ${firstTurnY} L ${screenCenter} ${cardCenterY} L ${cardLeft} ${cardCenterY}`;
        } else {
             // Fallback
             targetY = absoluteTop - wrapperTop + 100;
             targetX = (window.innerWidth * 0.1) + conn.x + 50;
             return `M ${conn.x} 0 L ${conn.x} ${targetY} L ${targetX} ${targetY}`;
        }

      } else if (conn.type === 'heading-connect') {
        // Logic for Services section: Connect to vertical center of heading
        const headingId = (conn as any).headingId;
        const heading = headingId ? document.getElementById(headingId) : null;
        
        if (heading) {
          const headingRect = heading.getBoundingClientRect();
          // Use inner height of the heading for more accurate centering if it has padding
          const style = window.getComputedStyle(heading);
          const paddingTop = parseFloat(style.paddingTop);
          const paddingBottom = parseFloat(style.paddingBottom);
          const contentHeight = headingRect.height - paddingTop - paddingBottom;
          
          // Calculate center based on content area + top padding
          targetY = (headingRect.top + paddingTop + contentHeight / 2 + scrollTop) - wrapperTop;
          
          // Connect to the left edge of the heading
          targetX = (headingRect.left + scrollLeft) - wrapperLeft;
          
          // Add horizontal segment to reach the center if needed, but here we want straight connection
          // The line comes from top (x=56), goes down to targetY, then goes right to targetX
          return `M ${conn.x} 0 L ${conn.x} ${targetY} L ${targetX} ${targetY}`;
        } else {
           // Fallback
           targetY = absoluteTop - wrapperTop + 100;
           targetX = (window.innerWidth * 0.1) + conn.x + 50;
           return `M ${conn.x} 0 L ${conn.x} ${targetY} L ${targetX} ${targetY}`;
        }
      
      } else if (conn.type === 'heading-to-cards') {
         // Logic for Border Services: 
         // 1. Down to heading vertical center
         // 2. Right to heading horizontal center (passing behind)
         // 3. Down to cards vertical center
         // 4. Spanning all cards horizontally
         
         const heading = document.getElementById('border-services-heading');
         // Use element (the section) to find the grid
         const gridElement = element.querySelector('.grid');
         
         if (heading && gridElement) {
             const headingRect = heading.getBoundingClientRect();
             const gridRect = gridElement.getBoundingClientRect();
             
             // Improved centering logic for heading
             const style = window.getComputedStyle(heading);
             const paddingTop = parseFloat(style.paddingTop);
             const paddingBottom = parseFloat(style.paddingBottom);
             const contentHeight = headingRect.height - paddingTop - paddingBottom;
             const headingCenterY = (headingRect.top + paddingTop + contentHeight / 2 + scrollTop) - wrapperTop;
             
             const headingLeft = (headingRect.left + scrollLeft) - wrapperLeft;
             const headingCenterX = (headingRect.left + headingRect.width / 2 + scrollLeft) - wrapperLeft;
             
             const cardsCenterY = (gridRect.top + gridRect.height / 2 + scrollTop) - wrapperTop;
             const gridLeft = (gridRect.left + scrollLeft) - wrapperLeft;
             const gridRight = (gridRect.right + scrollLeft) - wrapperLeft;
             
             // Path:
             // 1. Start -> Heading Level (connect to left edge like services)
             // 2. Heading Level Left -> Heading Center (passing behind)
             // 3. Heading Center -> Cards Level
             // 4. Cards Level Left -> Cards Level Right
             
             return `M ${conn.x} 0 
                     L ${conn.x} ${headingCenterY} 
                     L ${headingLeft} ${headingCenterY}
                     M ${headingLeft} ${headingCenterY}
                     L ${headingCenterX} ${headingCenterY} 
                     L ${headingCenterX} ${cardsCenterY}
                     M ${gridLeft} ${cardsCenterY}
                     L ${gridRight} ${cardsCenterY}`;
         } else {
            // Fallback
            targetY = absoluteTop - wrapperTop + 100;
            targetX = (window.innerWidth * 0.1) + conn.x + 50;
            return `M ${conn.x} 0 L ${conn.x} ${targetY} L ${targetX} ${targetY}`;
         }

      } else if (conn.type === 'heading-to-cards-contact') {
         // Logic for Contact section: 
         // Similar to border services but uses specific selectors for contact section layout
         
         const headingId = (conn as any).headingId;
         const heading = headingId ? document.getElementById(headingId) : null;
         // The contact section has a grid with 2 columns: Form + Info
         const gridElement = element.querySelector('.grid');
         
         if (heading && gridElement) {
             const headingRect = heading.getBoundingClientRect();
             const gridRect = gridElement.getBoundingClientRect();
             
             // Improved centering logic for heading
             const style = window.getComputedStyle(heading);
             const paddingTop = parseFloat(style.paddingTop);
             const paddingBottom = parseFloat(style.paddingBottom);
             const contentHeight = headingRect.height - paddingTop - paddingBottom;
             const headingCenterY = (headingRect.top + paddingTop + contentHeight / 2 + scrollTop) - wrapperTop;
             
             const headingLeft = (headingRect.left + scrollLeft) - wrapperLeft;
             const headingCenterX = (headingRect.left + headingRect.width / 2 + scrollLeft) - wrapperLeft;
             
             const cardsCenterY = (gridRect.top + gridRect.height / 2 + scrollTop) - wrapperTop;
             const gridLeft = (gridRect.left + scrollLeft) - wrapperLeft;
             const gridRight = (gridRect.right + scrollLeft) - wrapperLeft;
             
             // Path:
             // 1. Start -> Heading Level (connect to left edge)
             // 2. Heading Level Left -> Heading Center (passing behind)
             // 3. Heading Center -> Cards Level
             // 4. Cards Level Left -> Cards Level Right (connecting both form and contact info)
             
             return `M ${conn.x} 0 
                     L ${conn.x} ${headingCenterY} 
                     L ${headingLeft} ${headingCenterY}
                     M ${headingLeft} ${headingCenterY}
                     L ${headingCenterX} ${headingCenterY} 
                     L ${headingCenterX} ${cardsCenterY}
                     M ${gridLeft} ${cardsCenterY}
                     L ${gridRight} ${cardsCenterY}`;
         } else {
            // Fallback
            targetY = absoluteTop - wrapperTop + 100;
            targetX = (window.innerWidth * 0.1) + conn.x + 50;
            return `M ${conn.x} 0 L ${conn.x} ${targetY} L ${targetX} ${targetY}`;
         }

      } else {
        // Standard logic: Connect to start of container
        targetY = absoluteTop - wrapperTop + 100;
        
        const container = element.querySelector('.container');
        if (container) {
          const containerRect = container.getBoundingClientRect();
          targetX = (containerRect.left + scrollLeft) - wrapperLeft;
        } else {
          targetX = (window.innerWidth * 0.1) + conn.x + 50;
        }
        // Path
        // Constrain targetX
        if (targetX < conn.x + 20) targetX = conn.x + 20;
        return `M ${conn.x} 0 L ${conn.x} ${targetY} L ${targetX} ${targetY}`;
      }
    });

    setPaths(newPaths);
  }, []);

  useEffect(() => {
    // Initial update
    updateLines();
    
    // Continuously update for the first 2.5 seconds to track entry animations
    let animationFrameId: number;
    const startTime = Date.now();
    
    const animate = () => {
      updateLines();
      if (Date.now() - startTime < 2500) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    animate();
    
    // Update when fonts are loaded
    if (document.fonts) {
        document.fonts.ready.then(updateLines);
    }

    // Intersection Observer for target elements
    // When a target element comes into view, trigger animations loop for 1 second
    // to catch any whileInView animations
    const observer = new IntersectionObserver((entries) => {
      let shouldAnimate = false;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          shouldAnimate = true;
        }
      });

      if (shouldAnimate) {
        const start = Date.now();
        const animateView = () => {
          updateLines();
          if (Date.now() - start < 1500) { // Run for 1.5s after intersection
            requestAnimationFrame(animateView);
          }
        };
        animateView();
      }
    }, { threshold: 0.1 });

    // Observe all connection targets
    CONNECTIONS.forEach(conn => {
      const el = document.getElementById(conn.id);
      if (el) observer.observe(el);
    });

    // Observer for document body size changes
    const resizeObserver = new ResizeObserver(() => {
      updateLines();
    });
    
    if (document.body) {
      resizeObserver.observe(document.body);
    }
    
    // Window resize & scroll listeners
    window.addEventListener('resize', updateLines);
    window.addEventListener('load', updateLines);
    window.addEventListener('scroll', updateLines);
    
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      observer.disconnect();
      window.removeEventListener('resize', updateLines);
      window.removeEventListener('load', updateLines);
      window.removeEventListener('scroll', updateLines);
    };
  }, [updateLines]);

  return (
    <div
      ref={wrapperRef}
      className="hidden min-[1471px]:block absolute left-0 top-0 w-full pointer-events-none"
      style={{ 
        zIndex: 1,
        height: dimensions.height || '100vh', 
      }}
    >
      <svg
        className="w-full h-full"
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        style={{ display: 'block' }}
      >
        {paths.map((d, i) => (
          d ? (
            <path 
              key={CONNECTIONS[i].id}
              d={d} 
              stroke={CONNECTIONS[i].color} 
              strokeWidth="2" 
              fill="none" 
              strokeLinecap="round" 
              opacity="0.6" 
            />
          ) : null
        ))}
      </svg>
    </div>
  );
}
