import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './WhatsAppButton.css';
import whatsappLogo from '@/assets/logo/whatsapp.svg';

const WhatsAppButton = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const isVisible = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show button when scrolled down more than 200px
      if (currentScrollY > 200 && !isVisible.current) {
        isVisible.current = true;
        gsap.to(buttonRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
      // Hide button when scrolled back to top (less than 200px)
      else if (currentScrollY <= 200 && isVisible.current) {
        isVisible.current = false;
        gsap.to(buttonRef.current, {
          y: 100,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
        });
      }
    };

    // Initial state - hidden
    if (buttonRef.current) {
      gsap.set(buttonRef.current, {
        y: 100,
        opacity: 0,
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
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

