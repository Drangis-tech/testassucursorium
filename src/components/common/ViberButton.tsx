import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ViberButton.css';
import viberLogo from '@/assets/logo/viber.svg';

const ViberButton = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const isVisible = useRef(false);
  const rafId = useRef<number | null>(null);
  const hasShownOnce = useRef(false);
  const scrollTimeout = useRef<number | null>(null);

  useEffect(() => {
    // Detect if mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
    let isScrolling = false;
    
    const handleScroll = () => {
      // Use requestAnimationFrame for smooth mobile performance
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      
      // On mobile, wait for scroll to settle before first appearance
      if (isMobile && !hasShownOnce.current) {
        isScrolling = true;
        if (scrollTimeout.current !== null) {
          clearTimeout(scrollTimeout.current);
        }
      }
      
      rafId.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        // Show button when scrolled down more than 200px
        if (currentScrollY > 200 && !isVisible.current) {
          // On mobile, add delay for first appearance to avoid browser chrome flicker
          if (isMobile && !hasShownOnce.current) {
            scrollTimeout.current = window.setTimeout(() => {
              if (window.scrollY > 200 && !isVisible.current) {
                isVisible.current = true;
                hasShownOnce.current = true;
                gsap.to(buttonRef.current, {
                  y: 0,
                  opacity: 1,
                  duration: 0.3,
                  ease: 'power2.out',
                  force3D: true,
                  transformPerspective: 1000,
                  clearProps: '',
                });
              }
            }, 150);
          } else {
            isVisible.current = true;
            hasShownOnce.current = true;
            gsap.to(buttonRef.current, {
              y: 0,
              opacity: 1,
              duration: isMobile ? 0.3 : 0.5,
              ease: 'power2.out',
              force3D: true,
              transformPerspective: 1000,
              clearProps: isMobile ? '' : 'all',
            });
          }
        }
        // Hide button when scrolled back to top (less than 200px)
        else if (currentScrollY <= 200 && isVisible.current) {
          isVisible.current = false;
          gsap.to(buttonRef.current, {
            y: 100,
            opacity: 0,
            duration: isMobile ? 0.25 : 0.4,
            ease: 'power2.in',
            force3D: true,
            transformPerspective: 1000,
          });
        }
      });
    };

    // Initial state - hidden with GPU acceleration
    if (buttonRef.current) {
      gsap.set(buttonRef.current, {
        y: 100,
        opacity: 0,
        force3D: true,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      if (scrollTimeout.current !== null) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const handleClick = () => {
    // Opens Viber chat - works on both web and mobile
    const phoneNumber = '%2B37065088892'; // Phone number with country code, no + or spaces
    window.open(`https://viber.click/${phoneNumber}`, '_blank');
  };

  return (
    <a
      ref={buttonRef}
      onClick={handleClick}
      className="viber-floating-button"
      aria-label="Chat on Viber"
    >
      <img
        src={viberLogo}
        alt="Viber"
        className="viber-icon"
      />
    </a>
  );
};

export default ViberButton;

