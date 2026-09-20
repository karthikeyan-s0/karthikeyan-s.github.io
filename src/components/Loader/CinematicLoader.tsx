import React, { useState, useEffect, useRef } from 'react';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'k' | 'name' | 'tagline' | 'exit'>('k');
  const [progress, setProgress] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Only run this sequence once on initial mount
    const timer1 = setTimeout(() => {
      setPhase('name');
    }, 450);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 30);

    const timer2 = setTimeout(() => {
      setPhase('tagline');
    }, 1100);

    const timer3 = setTimeout(() => {
      setPhase('exit');
    }, 1700);

    const timer4 = setTimeout(() => {
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
      setIsDismissed(true);
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearInterval(interval);
    };
  }, []); // Strictly run once!

  if (isDismissed) {
    return null; // Completely remove from DOM once finished
  }

  return (
    <div
      className={`fixed inset-0 z-[150] bg-space-950 flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        phase === 'exit' ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      <div className="flex flex-col items-center text-center px-6 max-w-xl">
        {/* Animated Letter / Name */}
        <div className="h-16 flex items-center justify-center overflow-hidden">
          {phase === 'k' && (
            <span className="font-display text-5xl md:text-6xl font-extrabold tracking-widest text-white animate-pulse">
              K
            </span>
          )}
          {(phase === 'name' || phase === 'tagline' || phase === 'exit') && (
            <h1 className="font-display text-2xl md:text-4xl font-bold tracking-[0.25em] text-white transition-all duration-500 ease-out">
              KARTHIKEYAN S
            </h1>
          )}
        </div>

        {/* Minimal Progress Bar and Indicator */}
        <div className="w-48 sm:w-64 mt-6 flex flex-col items-center gap-2">
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-cyan via-accent-indigo to-accent-violet transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-mono text-[10px] tracking-widest text-slate-400">
            {progress}% INITIALIZING
          </span>
        </div>

        {/* Subtitle Reveal */}
        <div className="h-6 mt-4 overflow-hidden">
          <p
            className={`font-mono text-[11px] sm:text-xs tracking-[0.3em] uppercase text-accent-cyan transition-all duration-500 ${
              phase === 'tagline' || phase === 'exit'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            BUILDING DIGITAL EXPERIENCES
          </p>
        </div>
      </div>
    </div>
  );
};
