import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './WhatsAppButton.css';

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
    const phoneNumber = '37060000000'; // Replace with your actual number
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
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        className="whatsapp-icon"
      >
        <path
          fill="white"
          d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.253 1.408 1.417-5.234-0.321-0.527c-1.312-2.148-2.006-4.628-2.006-7.185 0-7.444 6.056-13.5 13.5-13.5s13.5 6.056 13.5 13.5c0 7.444-6.056 13.5-13.5 13.5zM21.936 18.894c-0.388-0.194-2.294-1.132-2.65-1.261-0.355-0.129-0.614-0.194-0.873 0.194s-1.003 1.261-1.229 1.52c-0.226 0.258-0.452 0.291-0.84 0.097s-1.638-0.604-3.119-1.925c-1.153-1.028-1.932-2.298-2.159-2.686s-0.024-0.597 0.17-0.791c0.175-0.175 0.388-0.452 0.582-0.679 0.194-0.226 0.258-0.388 0.388-0.646 0.129-0.258 0.065-0.485-0.032-0.679s-0.873-2.103-1.196-2.879c-0.314-0.755-0.633-0.653-0.873-0.665-0.226-0.012-0.485-0.015-0.743-0.015s-0.679 0.097-1.035 0.485c-0.355 0.388-1.358 1.326-1.358 3.234s1.39 3.751 1.583 4.009c0.194 0.258 2.717 4.15 6.583 5.818 0.92 0.397 1.638 0.634 2.199 0.811 0.924 0.294 1.766 0.253 2.431 0.153 0.742-0.111 2.294-0.938 2.617-1.843s0.323-1.682 0.226-1.843c-0.097-0.161-0.355-0.258-0.743-0.452z"
        />
      </svg>
    </a>
  );
};

export default WhatsAppButton;

