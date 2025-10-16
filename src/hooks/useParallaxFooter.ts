import { useEffect } from 'react';
import type { RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useParallaxFooter = (footerRef: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    if (!footerRef.current) return;

    const footer = footerRef.current;
    const background = footer.querySelector('[data-parallax-bg]') as HTMLElement;

    if (!background) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    tl.to(background, {
      y: -50,
      ease: 'none',
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === footer) {
          trigger.kill();
        }
      });
    };
  }, [footerRef]);
};

