import { useEffect, useRef } from 'react';

interface AnimatedLinesProps {
  sections: Array<{
    id: string;
    selector: string;
  }>;
}

export default function AnimatedLines({ sections }: AnimatedLinesProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const linesRef = useRef<SVGPathElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop (lg breakpoint and above)
    const checkDesktop = () => {
      return window.innerWidth >= 1024; // lg breakpoint
    };

    if (!checkDesktop() || !svgRef.current || sections.length === 0) {
      return;
    }

    const svg = svgRef.current;
    const container = containerRef.current;
    if (!container) return;

    // Logo padding from header CSS: padding: 2em = 32px (assuming 16px base)
    const logoLeftMargin = 32; // 2em = 32px
    const viewportWidth = window.innerWidth;
    
    // Get full document height for lines that span entire page
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    // Create 6 lines horizontally spaced to the right
    const totalLines = 6;
    const horizontalGap = 8; // Gap between lines in pixels
    const lineSpacing = documentHeight / (totalLines + 1); // Vertical spacing for extension points

    // Create SVG paths for each line
    const lineConfigs: Array<{
      path: SVGPathElement;
      sectionElement: Element | null;
      lineIndex: number;
      startY: number;
      xPosition: number;
      updateLine?: () => void;
      cardAbsoluteY?: number | null;
      cardAbsoluteX?: number | null;
    }> = [];

    // Clear existing paths
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    linesRef.current = [];

    for (let i = 0; i < totalLines; i++) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const pathId = `line-${i}`;
      path.setAttribute('id', pathId);
      
      // Calculate X position: first line at logoLeftMargin, then spaced to the right
      const xPosition = logoLeftMargin + (i * horizontalGap);
      // Start Y position for horizontal extension (evenly spaced vertically)
      const startY = lineSpacing * (i + 1);
      
      // Initial path: full vertical line from top (0) to bottom of document
      path.setAttribute('d', `M ${xPosition} 0 L ${xPosition} ${documentHeight}`);
      
      path.setAttribute('stroke', '#F2CA50');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('opacity', '0.6');
      
      svg.appendChild(path);
      linesRef.current[i] = path;

      // Find matching section for this line (if any)
      // Assign sections to lines from the end
      // Last line (index 6) gets statistics section
      // Second to last line (index 5) gets about section
      // Third to last line (index 4) gets services section
      // Fourth to last line (index 3) gets border-services section
      // Fifth to last line (index 2) gets faq section
      // Sixth to last line (index 1) gets contact-form section
      let sectionElement: Element | null = null;
      if (sections.length > 0) {
        if (i === totalLines - 1) {
          // Last line (index 6) gets the first section (statistics)
          sectionElement = document.querySelector(sections[0].selector);
        } else if (i === totalLines - 2 && sections.length > 1) {
          // Second to last line (index 5) gets the second section (about)
          sectionElement = document.querySelector(sections[1].selector);
        } else if (i === totalLines - 3 && sections.length > 2) {
          // Third to last line (index 4) gets the third section (services)
          sectionElement = document.querySelector(sections[2].selector);
        } else if (i === totalLines - 4 && sections.length > 3) {
          // Fourth to last line (index 3) gets the fourth section (border-services)
          sectionElement = document.querySelector(sections[3].selector);
        } else if (i === totalLines - 5 && sections.length > 4) {
          // Fifth to last line (index 2) gets the fifth section (faq)
          sectionElement = document.querySelector(sections[4].selector);
        } else if (i === totalLines - 6 && sections.length > 5) {
          // Sixth to last line (index 1) gets the sixth section (contact-form)
          sectionElement = document.querySelector(sections[5].selector);
        }
      }

      lineConfigs.push({
        path,
        sectionElement,
        lineIndex: i,
        startY: startY, // Store for horizontal extension point
        xPosition: xPosition, // Store X position for this line
        cardAbsoluteY: null, // Store absolute Y position when connected
        cardAbsoluteX: null, // Store absolute X position when connected
      });
    }

    // Update SVG to cover full document height
    svg.setAttribute('viewBox', `0 0 ${viewportWidth} ${documentHeight}`);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('height', `${documentHeight}`);

    // Helper function to get absolute Y position of an element
    const getAbsoluteTop = (element: HTMLElement): number => {
      let top = 0;
      let currentElement: HTMLElement | null = element;
      while (currentElement) {
        top += currentElement.offsetTop;
        currentElement = currentElement.offsetParent as HTMLElement | null;
      }
      return top;
    };

    // Draw all lines in their final connected state (static, no scroll triggers)
    const drawStaticLines = () => {
      lineConfigs.forEach((config) => {
        if (!config.sectionElement) {
          // For lines without sections, draw full vertical line from top to bottom
          config.path.setAttribute('d', `M ${config.xPosition} 0 L ${config.xPosition} ${documentHeight}`);
          return;
        }

        const sectionElement = config.sectionElement;
        const sectionRect = sectionElement.getBoundingClientRect();
        
        // Special handling for statistics section - 6th line (index 5) should target third card (rightmost)
        if (sectionElement.id === 'statistics' && config.lineIndex === 5) {
          // Find all statistics cards and select the third one (rightmost)
          const statsGrid = sectionElement.querySelector('.grid');
          const allStatsCards = Array.from(statsGrid?.querySelectorAll('.relative.group') || []) as HTMLElement[];
          
          // Get the third card (index 2) - the rightmost card
          const thirdCard = allStatsCards.length >= 3 ? allStatsCards[2] : allStatsCards[allStatsCards.length - 1];
          
          if (thirdCard) {
            const cardRect = thirdCard.getBoundingClientRect();
            
            // Use absolute document position
            const targetX = cardRect.left;
            const targetY = getAbsoluteTop(thirdCard) + cardRect.height / 2; // Center of the card vertically, absolute position
            
            // Update path: vertical line from top (0) down to target Y, then horizontal to target X
            // The line extends horizontally to reach the third card (goes behind the first two cards)
            const newPath = `M ${config.xPosition} 0 L ${config.xPosition} ${targetY} L ${targetX} ${targetY}`;
            config.path.setAttribute('d', newPath);
            
            // Activate hover state on all three statistics cards when line connects
            allStatsCards.forEach((card) => {
              // Find the card's inner div (the one with the background)
              const cardInner = card.querySelector('.relative.h-full') as HTMLElement;
              if (cardInner) {
                // Add custom class to track connection state
                cardInner.classList.add('line-connected');
                
                // Manually trigger hover effects by setting styles
                // Border color: hover:border-[#F2CA50]/50
                cardInner.style.borderColor = 'rgba(242, 202, 80, 0.5)';
                
                // Find and activate the shine effect (group-hover:opacity-100)
                const shineEffect = Array.from(cardInner.querySelectorAll('div')).find(
                  (el) => el.classList.contains('absolute') && 
                          el.classList.contains('inset-0') && 
                          el.classList.contains('rounded-2xl') &&
                          el.classList.contains('bg-gradient-to-br')
                ) as HTMLElement | undefined;
                
                if (shineEffect) {
                  shineEffect.style.opacity = '1';
                }
                
                // Find and activate the corner accent (group-hover:opacity-100)
                const cornerAccent = Array.from(cardInner.querySelectorAll('div')).find(
                  (el) => el.classList.contains('absolute') && 
                          el.classList.contains('top-0') && 
                          el.classList.contains('right-0') &&
                          el.classList.contains('w-12')
                ) as HTMLElement | undefined;
                
                if (cornerAccent) {
                  cornerAccent.style.opacity = '1';
                }
              }
            });
          }
        } else if (sectionElement.id === 'about' && config.lineIndex === 4) {
          // Special handling for about section - 5th line (index 4)
          // Line goes horizontally (above image) then vertically down to card
          
          // Find the card in the about section - look for Card component with specific classes
          // Find all cards and select the one in the second column (right side)
          const allCards = Array.from(sectionElement.querySelectorAll('.relative.overflow-hidden')) as HTMLElement[];
          // The card in the second column will be positioned on the right side
          // Find the card that's positioned to the right of the section center
          const sectionCenterX = sectionElement.getBoundingClientRect().left + sectionElement.getBoundingClientRect().width / 2;
          const aboutCard = allCards.find(card => {
            const cardRect = card.getBoundingClientRect();
            return cardRect.left > sectionCenterX; // Card is in the second column (right side)
          }) as HTMLElement | undefined;
          
          if (aboutCard) {
            const cardRect = aboutCard.getBoundingClientRect();
            const sectionRect = sectionElement.getBoundingClientRect();
            
            // Horizontal extension point - above the image (top of section) - absolute position
            const horizontalY = getAbsoluteTop(sectionElement as HTMLElement);
            // Go horizontally right to middle of section (or slightly less than cardX to ensure we go right at the end)
            // This ensures the final segment always goes right to touch the card
            const sectionMiddle = sectionRect.left + sectionRect.width / 2;
            const horizontalX = Math.min(sectionMiddle, cardRect.left - 10); // Go to middle or slightly before card, ensuring final segment goes right
            
            // Card position - target the left edge of the card - absolute position
            const cardX = cardRect.left;
            const cardY = getAbsoluteTop(aboutCard) + cardRect.height / 2; // Center of the card vertically, absolute position
            
            // Add extra vertical offset before turning right to touch the card
            const verticalOffset = 30; // Extra pixels to go down before turning right
            const finalY = cardY + verticalOffset;
            
            // Path: vertical down -> horizontal right -> vertical down MORE -> horizontal right to card
            // Always go to cardX at the end to ensure we touch the card (going right)
            const newPath = `M ${config.xPosition} 0 L ${config.xPosition} ${horizontalY} L ${horizontalX} ${horizontalY} L ${horizontalX} ${finalY} L ${cardX} ${finalY}`;
            config.path.setAttribute('d', newPath);
            
            // Activate hover state on the card when line connects
            // Add 'group' class if not present to enable group-hover effects
            if (!aboutCard.classList.contains('group')) {
              aboutCard.classList.add('group');
            }
            // Add custom class to track connection state
            aboutCard.classList.add('line-connected');
            
            // Manually trigger hover effects by setting styles
            // Border color: hover:border-[#F2CA50]/50
            aboutCard.style.borderColor = 'rgba(242, 202, 80, 0.5)';
            // Shadow: hover:shadow-xl
            aboutCard.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            
            // Find and activate the shine effect (group-hover:opacity-100)
            // The shine effect is: <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F2CA50]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            const shineEffect = Array.from(aboutCard.querySelectorAll('div')).find(
              (el) => el.classList.contains('absolute') && 
                      el.classList.contains('inset-0') && 
                      el.classList.contains('rounded-2xl') &&
                      el.classList.contains('bg-gradient-to-br')
            ) as HTMLElement | undefined;
            
            if (shineEffect) {
              shineEffect.style.opacity = '1';
            }
          }
        } else if (sectionElement.id === 'services' && config.lineIndex === 3) {
          // Special handling for services section - 4th line (index 3)
          // Line goes horizontally to touch the heading "Mūsų paslaugos"
          
          // Find the heading in the services section
          const heading = sectionElement.querySelector('h2') as HTMLElement | null;
          
          if (heading) {
            const headingRect = heading.getBoundingClientRect();
            
            // Get computed style to check for padding
            const computedStyle = window.getComputedStyle(heading);
            const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
            
            // Target the actual text start position (accounting for centering and padding)
            // Since text is center-aligned, calculate where the text visually starts
            const headingCenter = headingRect.left + headingRect.width / 2;
            
            // Use canvas to measure actual text width for accuracy
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (context && heading.textContent) {
              const fontSize = computedStyle.fontSize || '90px';
              const fontFamily = computedStyle.fontFamily || 'Baloo 2';
              const fontWeight = computedStyle.fontWeight || 'bold';
              context.font = `${fontWeight} ${fontSize} ${fontFamily}`;
              const textWidth = context.measureText(heading.textContent).width;
              const textStartX = headingCenter - (textWidth / 2) + paddingLeft;
              
              const targetX = textStartX + 10; // Add small offset to ensure we touch the text
              const targetY = getAbsoluteTop(heading) + headingRect.height / 2; // Center of the heading vertically, absolute position
              
              // Path: vertical down to heading level, then horizontal right to heading
              const newPath = `M ${config.xPosition} 0 L ${config.xPosition} ${targetY} L ${targetX} ${targetY}`;
              config.path.setAttribute('d', newPath);
            }
          }
        } else if (sectionElement.id === 'border-services' && config.lineIndex === 2) {
          // Special handling for border-services section - 3rd line (index 2)
          // Line comes from heading and extends horizontally across all cards
          
          // Find the heading and cards in the border-services section
          const heading = sectionElement.querySelector('h2') as HTMLElement | null;
          const cardsGrid = sectionElement.querySelector('.grid') as HTMLElement | null;
          
          if (heading && cardsGrid) {
            const headingRect = heading.getBoundingClientRect();
            const cardsGridRect = cardsGrid.getBoundingClientRect();
            
            // Find all cards in the grid
            const allCards = Array.from(cardsGrid.querySelectorAll('.relative.group')) as HTMLElement[];
            
            if (allCards.length > 0) {
              // Use heading center for the line position
              const headingCenter = headingRect.left + headingRect.width / 2;
              const textCenterX = headingCenter; // Center of the text
              
              // Start from heading's vertical center - absolute position
              const headingCenterY = getAbsoluteTop(heading) + headingRect.height / 2;
              // Target: vertical center of the cards grid - absolute position
              const targetY = getAbsoluteTop(cardsGrid) + cardsGridRect.height / 2;
              
              // Get the rightmost card's right edge
              const lastCard = allCards[allCards.length - 1];
              const lastCardRect = lastCard.getBoundingClientRect();
              const rightEdge = lastCardRect.right;
              
              // Get the leftmost card's left edge
              const firstCard = allCards[0];
              const firstCardRect = firstCard.getBoundingClientRect();
              const leftEdge = firstCardRect.left;
              
              // Path: vertical down to heading center, horizontal to text center, 
              // vertical down to cards center, then horizontal across all cards
              const newPath = `M ${config.xPosition} 0 L ${config.xPosition} ${headingCenterY} L ${textCenterX} ${headingCenterY} L ${textCenterX} ${targetY} L ${leftEdge} ${targetY} L ${rightEdge} ${targetY}`;
              config.path.setAttribute('d', newPath);
              
              // Activate hover state on all cards when line connects
              allCards.forEach((card) => {
                const cardInner = card.querySelector('.relative.h-full') as HTMLElement;
                if (cardInner) {
                  cardInner.classList.add('line-connected');
                  cardInner.style.borderColor = 'rgba(242, 202, 80, 0.5)';
                  
                  const shineEffect = Array.from(cardInner.querySelectorAll('div')).find(
                    (el) => el.classList.contains('absolute') && 
                            el.classList.contains('inset-0') && 
                            el.classList.contains('rounded-2xl') &&
                            el.classList.contains('bg-gradient-to-br')
                  ) as HTMLElement | undefined;
                  
                  if (shineEffect) {
                    shineEffect.style.opacity = '1';
                  }
                  
                  const cornerAccent = Array.from(cardInner.querySelectorAll('div')).find(
                    (el) => el.classList.contains('absolute') && 
                            el.classList.contains('top-0') && 
                            el.classList.contains('right-0') &&
                            el.classList.contains('w-12')
                  ) as HTMLElement | undefined;
                  
                  if (cornerAccent) {
                    cornerAccent.style.opacity = '1';
                  }
                }
              });
            }
          }
        } else if (sectionElement.id === 'faq' && config.lineIndex === 1) {
          // Special handling for faq section - 2nd line (index 1)
          // Line goes horizontally to touch the heading "DUK"
          
          // Find the heading in the faq section
          const heading = sectionElement.querySelector('h2') as HTMLElement | null;
          
          if (heading) {
            const headingRect = heading.getBoundingClientRect();
            
            // Get computed style to check for padding
            const computedStyle = window.getComputedStyle(heading);
            const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
            
            // Target the actual text start position (accounting for centering and padding)
            // Since text is center-aligned, calculate where the text visually starts
            const headingCenter = headingRect.left + headingRect.width / 2;
            
            // Use canvas to measure actual text width for accuracy
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (context && heading.textContent) {
              const fontSize = computedStyle.fontSize || '90px';
              const fontFamily = computedStyle.fontFamily || 'Baloo 2';
              const fontWeight = computedStyle.fontWeight || 'bold';
              context.font = `${fontWeight} ${fontSize} ${fontFamily}`;
              const textWidth = context.measureText(heading.textContent).width;
              const textStartX = headingCenter - (textWidth / 2) + paddingLeft;
              
              const targetX = textStartX + 10; // Add small offset to ensure we touch the text
              const targetY = getAbsoluteTop(heading) + headingRect.height / 2; // Center of the heading vertically, absolute position
              
              // Path: vertical down to heading level, then horizontal right to heading
              const newPath = `M ${config.xPosition} 0 L ${config.xPosition} ${targetY} L ${targetX} ${targetY}`;
              config.path.setAttribute('d', newPath);
            }
          }
        } else if (sectionElement.id === 'contact-form' && config.lineIndex === 0) {
          // Special handling for contact-form section - 1st line (index 0)
          // Line comes from heading and extends horizontally across both cards (form and contact info)
          
          // Find the heading and cards grid in the contact-form section
          const heading = sectionElement.querySelector('h2') as HTMLElement | null;
          const cardsGrid = sectionElement.querySelector('.grid.lg\\:grid-cols-2') as HTMLElement | null;
          
          if (heading && cardsGrid) {
            const headingRect = heading.getBoundingClientRect();
            const cardsGridRect = cardsGrid.getBoundingClientRect();
            
            // Find all cards in the grid
            const allCards = Array.from(cardsGrid.querySelectorAll('.relative.overflow-hidden')) as HTMLElement[];
            
            if (allCards.length > 0) {
              // Use heading center for the line position
              const headingCenter = headingRect.left + headingRect.width / 2;
              const textCenterX = headingCenter; // Center of the text
              
              // Start from heading's vertical center - absolute position
              const headingCenterY = getAbsoluteTop(heading) + headingRect.height / 2;
              // Target: vertical center of the cards grid - absolute position
              const targetY = getAbsoluteTop(cardsGrid) + cardsGridRect.height / 2;
              
              // Get the rightmost card's right edge
              const lastCard = allCards[allCards.length - 1];
              const lastCardRect = lastCard.getBoundingClientRect();
              const rightEdge = lastCardRect.right;
              
              // Get the leftmost card's left edge
              const firstCard = allCards[0];
              const firstCardRect = firstCard.getBoundingClientRect();
              const leftEdge = firstCardRect.left;
              
              // Path: vertical down to heading center, horizontal to text center, 
              // vertical down to cards center, then horizontal across both cards
              const newPath = `M ${config.xPosition} 0 L ${config.xPosition} ${headingCenterY} L ${textCenterX} ${headingCenterY} L ${textCenterX} ${targetY} L ${leftEdge} ${targetY} L ${rightEdge} ${targetY}`;
              config.path.setAttribute('d', newPath);
              
              // Activate hover state on both cards when line connects
              allCards.forEach((card) => {
                card.classList.add('line-connected');
                card.style.borderColor = 'rgba(242, 202, 80, 0.5)';
                
                const shineEffect = Array.from(card.querySelectorAll('div')).find(
                  (el) => el.classList.contains('absolute') && 
                          el.classList.contains('inset-0') && 
                          el.classList.contains('rounded-2xl') &&
                          el.classList.contains('bg-gradient-to-br')
                ) as HTMLElement | undefined;
                
                if (shineEffect) {
                  shineEffect.style.opacity = '1';
                }
              });
            }
          }
        } else {
          // Default behavior: extend to section center - absolute position
          const targetX = sectionRect.left + sectionRect.width / 2;
          const targetY = getAbsoluteTop(sectionElement as HTMLElement) + sectionRect.height / 2;
          const newPath = `M ${config.xPosition} 0 L ${config.xPosition} ${targetY} L ${targetX} ${targetY}`;
          config.path.setAttribute('d', newPath);
        }
      });
    };

    // Draw all lines once - static, no scroll-based updates
    // Wait for window load to ensure all content is fully rendered and positioned
    const initializeLines = () => {
      // Additional delay after load to let any animations/layout settle
      setTimeout(() => {
        drawStaticLines();
      }, 200);
    };

    if (document.readyState === 'complete') {
      // Page already loaded
      initializeLines();
    } else {
      // Wait for page to fully load
      window.addEventListener('load', initializeLines);
    }

    // Handle window resize - redraw static lines
    const handleResize = () => {
      if (!checkDesktop()) {
        return;
      }
      
      // Update viewBox on resize
      const newViewportWidth = window.innerWidth;
      const newDocumentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      svg.setAttribute('viewBox', `0 0 ${newViewportWidth} ${newDocumentHeight}`);
      svg.setAttribute('height', `${newDocumentHeight}`);
      
      // Redraw lines with new dimensions
      setTimeout(() => {
        drawStaticLines();
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', initializeLines);
      // Clean up SVG paths
      linesRef.current.forEach(path => {
        if (path.parentNode) {
          path.parentNode.removeChild(path);
        }
      });
      linesRef.current = [];
    };
  }, [sections]);

  return (
    <div
      ref={containerRef}
      className="hidden lg:block absolute left-0 top-0 w-full pointer-events-none"
      style={{ 
        zIndex: 1,
        minHeight: '100vh'
      }}
    >
      <svg
        ref={svgRef}
        className="w-full"
        style={{ 
          width: '100%',
          display: 'block'
        }}
      >
        {/* Lines will be dynamically added here */}
      </svg>
    </div>
  );
}

