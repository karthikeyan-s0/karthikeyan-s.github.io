import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isTouch, setIsTouch] = useState(true);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if device supports touch
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hover targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectEl = target.closest('[data-cursor="project"]');
      const linkEl = target.closest('[data-cursor="link"], a');
      const interactiveEl = target.closest('button, [data-cursor="pointer"]');

      if (projectEl) {
        setIsHovered(true);
        setCursorText('VIEW');
      } else if (linkEl) {
        setIsHovered(true);
        setCursorText('OPEN ↗');
      } else if (interactiveEl) {
        setIsHovered(true);
        setCursorText('');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth animation loop for trailing ring
    let animationFrameId: number;
    const render = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Inner precise dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-accent-cyan rounded-full pointer-events-none z-[100] transition-opacity duration-200"
        style={{ willChange: 'transform' }}
      />

      {/* Outer interactive ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99] rounded-full border border-accent-cyan/60 flex items-center justify-center transition-[width,height,background-color,border-color] duration-300 ease-out ${
          cursorText
            ? 'w-16 h-16 bg-accent-cyan/15 backdrop-blur-xs border-accent-cyan'
            : isHovered
            ? 'w-12 h-12 bg-white/10 border-white/50'
            : 'w-8 h-8 bg-transparent border-white/30'
        }`}
        style={{ willChange: 'transform' }}
      >
        {cursorText && (
          <span className="text-[9px] font-mono tracking-widest text-accent-cyan uppercase font-bold text-center select-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};
