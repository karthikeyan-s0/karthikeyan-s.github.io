import React, { useEffect, useRef, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [section, setSection] = useState('hero');
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animId: number;

    const updateProgress = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const prog = maxScroll > 0 ? scrollY / maxScroll : 0;
      const pct = Math.round(prog * 100);

      if (percentTextRef.current) {
        percentTextRef.current.textContent = `${pct}%`;
      }
      if (barRef.current) {
        barRef.current.style.height = `${pct}%`;
      }

      let curSec = 'hero';
      if (prog > 0.85) curSec = 'contact';
      else if (prog > 0.72) curSec = 'journey';
      else if (prog > 0.42) curSec = 'projects';
      else if (prog > 0.28) curSec = 'skills';
      else if (prog > 0.14) curSec = 'about';

      setSection((prev) => (prev !== curSec ? curSec : prev));
    };

    const onScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4 pointer-events-none select-none">
      <span
        ref={percentTextRef}
        className="font-mono text-[10px] text-accent-cyan tracking-widest -rotate-90 origin-center mb-4"
      >
        0%
      </span>

      <div className="w-[2px] h-32 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="w-full bg-gradient-to-b from-accent-cyan to-accent-violet transition-all duration-75 ease-out"
          style={{ height: '0%' }}
        />
      </div>

      <span className="font-mono text-[9px] text-slate-400 tracking-widest uppercase -rotate-90 origin-center mt-4">
        {section}
      </span>
    </div>
  );
};
