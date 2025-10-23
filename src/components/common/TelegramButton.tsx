import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './TelegramButton.css';

const TelegramButton = () => {
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
    // Opens Telegram with pre-filled message
    const username = 'yourusername'; // Replace with your Telegram username or bot
    const message = encodeURIComponent('Sveiki! Norėčiau gauti daugiau informacijos.');
    window.open(`https://t.me/${username}?text=${message}`, '_blank');
  };

  return (
    <a
      ref={buttonRef}
      onClick={handleClick}
      className="telegram-floating-button"
      aria-label="Chat on Telegram"
    >
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="telegram-icon"
      >
        <path
          fill="white"
          d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.654-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"
        />
      </svg>
    </a>
  );
};

export default TelegramButton;

