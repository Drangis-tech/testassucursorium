import { useEffect, useRef, useState } from 'react';

interface ClientMountWhenVisibleProps {
  children: React.ReactNode;
  rootMargin?: string;
}

/**
 * Delays mounting children until the element is in viewport
 * Prevents heavy components from blocking initial paint
 */
export default function ClientMountWhenVisible({ 
  children, 
  rootMargin = '200px' 
}: ClientMountWhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect(); // Stop observing once visible
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      io.observe(ref.current);
    }

    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {show ? children : null}
    </div>
  );
}

