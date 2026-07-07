import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const requestRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Mouse positions
  const mouseCoords = useRef({ x: 0, y: 0 });
  const cursorCoords = useRef({ x: 0, y: 0 });
  const dotCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Setup interactive elements hovers to scale cursor
    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.classList.add('cursor-hovering');
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.classList.remove('cursor-hovering');
    };

    const setupHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, [role="button"], select, input, textarea, .hover-trigger');
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Run setup immediately
    setupHoverListeners();

    // Create mutation observer to listen for dynamically added items
    const observer = new MutationObserver(() => {
      setupHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Tick function to update cursor coordinates with lerp (linear interpolation)
    const tick = () => {
      // Smooth interpolation for main outline cursor (lerp factor 0.15)
      cursorCoords.current.x += (mouseCoords.current.x - cursorCoords.current.x) * 0.15;
      cursorCoords.current.y += (mouseCoords.current.y - cursorCoords.current.y) * 0.15;

      // Faster interpolation for center dot (lerp factor 0.35)
      dotCoords.current.x += (mouseCoords.current.x - dotCoords.current.x) * 0.35;
      dotCoords.current.y += (mouseCoords.current.y - dotCoords.current.y) * 0.35;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorCoords.current.x}px`;
        cursorRef.current.style.top = `${cursorCoords.current.y}px`;
      }

      if (dotRef.current) {
        dotRef.current.style.left = `${dotCoords.current.x}px`;
        dotRef.current.style.top = `${dotCoords.current.y}px`;
      }

      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
      observer.disconnect();
      
      const hoverables = document.querySelectorAll('a, button, [role="button"], select, input, textarea, .hover-trigger');
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={dotRef} className="custom-cursor-dot hidden md:block" />
    </>
  );
}
