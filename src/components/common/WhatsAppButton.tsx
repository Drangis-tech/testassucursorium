import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './WhatsAppButton.css';
import whatsappLogo from '@/assets/logo/whatsapp.svg';

const WhatsAppButton = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const isVisible = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Detect if mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    const handleScroll = () => {
      // Use requestAnimationFrame for smooth mobile performance
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      
      rafId.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        // Show button when scrolled down more than 200px
        if (currentScrollY > 200 && !isVisible.current) {
          isVisible.current = true;
          gsap.to(buttonRef.current, {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.3 : 0.5,
            ease: 'power2.out',
            force3D: true,
          });
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
          });
        }
      });
    };

    // Initial state - hidden
    if (buttonRef.current) {
      gsap.set(buttonRef.current, {
        y: 100,
        opacity: 0,
        force3D: true,
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const handleClick = () => {
    // Opens WhatsApp with pre-filled message
    const phoneNumber = '37065088892'; // Replace with your actual number
    const message = encodeURIComponent('Sveiki! Norėčiau gauti daugiau informacijos.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <a
      ref={buttonRef}
      onClick={handleClick}
      className="whatsapp-floating-button"
      aria-label="Chat on WhatsApp"
    >
      <img
        src={whatsappLogo}
        alt="WhatsApp"
        className="whatsapp-icon"
      />
    </a>
  );
};

export default WhatsAppButton;

