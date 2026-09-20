import React, { useEffect, useState, useRef } from 'react';
import { personalIdentity } from '../../data/portfolioData';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  isLoaded: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isLoaded }) => {
  const [lettersVisible, setLettersVisible] = useState(false);
  const [sVisible, setSVisible] = useState(false);
  const [rolesVisible, setRolesVisible] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isLoaded) {
      const t1 = setTimeout(() => setLettersVisible(true), 200);
      const t2 = setTimeout(() => setSVisible(true), 850);
      const t3 = setTimeout(() => setRolesVisible(true), 1300);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [isLoaded]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const nameLetters = personalIdentity.firstName.split('');

  // 3D Foreground Flying Shards (Specification 09: Depth sandwich layering)
  const foregroundShards = [
    { top: '22%', left: '18%', size: 'w-7 h-7', rot: 25, speed: 1.4, color: 'from-sky-300 via-white to-sky-500' },
    { top: '38%', right: '14%', size: 'w-10 h-10', rot: -40, speed: -1.8, color: 'from-slate-100 via-sky-400 to-indigo-500' },
    { top: '64%', left: '32%', size: 'w-6 h-6', rot: 60, speed: 1.2, color: 'from-purple-300 via-white to-purple-600' },
    { top: '55%', right: '28%', size: 'w-8 h-8', rot: -15, speed: -1.3, color: 'from-sky-200 via-white to-sky-400' },
    { top: '78%', left: '12%', size: 'w-5 h-5', rot: 45, speed: 2.0, color: 'from-white via-slate-300 to-slate-600' },
  ];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between px-4 sm:px-8 md:px-12 pt-24 sm:pt-28 pb-8 sm:pb-12 select-none z-10 overflow-hidden"
    >
      {/* 3D Foreground Flying Shards Layer (Physical sandwich in front of typography) */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {foregroundShards.map((shard, idx) => (
          <div
            key={idx}
            className={`absolute ${shard.size} transition-transform duration-200 ease-out`}
            style={{
              top: shard.top,
              left: shard.left,
              right: shard.right,
              transform: `translate3d(${mouseOffset.x * shard.speed}px, ${mouseOffset.y * shard.speed}px, 0) rotate(${shard.rot + mouseOffset.x}deg)`,
            }}
          >
            <div
              className={`w-full h-full bg-gradient-to-br ${shard.color} opacity-85 shadow-[0_0_20px_rgba(56,189,248,0.4)] backdrop-blur-xs`}
              style={{
                clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Top Location & Identity Indicator */}
      <div className="flex items-center justify-between max-w-7xl w-full mx-auto relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping" />
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-slate-300">
            {personalIdentity.location.toUpperCase()}
          </span>
        </div>

        <div className="font-mono text-[10px] sm:text-xs tracking-widest text-slate-400">
          SYS.V3 // ACTIVE
        </div>
      </div>

      {/* Main Massive Editorial Typography */}
      <div className="max-w-7xl w-full mx-auto my-auto flex flex-col justify-center py-6 relative z-10">
        {/* Line 1: KARTHIKEYAN character reveal */}
        <div className="w-full overflow-hidden">
          <h1 className="font-display font-black text-[10vw] sm:text-[8.5vw] md:text-[8vw] lg:text-[7.2vw] leading-none tracking-tight text-white flex justify-between sm:justify-start sm:gap-[0.06em] whitespace-nowrap">
            {nameLetters.map((char, index) => (
              <span
                key={index}
                className={`inline-block transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  lettersVisible
                    ? 'opacity-100 translate-y-0 filter-none'
                    : 'opacity-0 translate-y-16 sm:translate-y-24 blur-sm'
                }`}
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Line 2: S & Dynamic Roles */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 sm:gap-6 mt-1 sm:mt-3">
          <div className="overflow-hidden">
            <span
              className={`font-display font-black text-[16vw] sm:text-[12vw] md:text-[10vw] lg:text-[9vw] leading-none text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-white to-accent-violet inline-block transform transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                sVisible
                  ? 'opacity-100 scale-100 translate-x-0'
                  : 'opacity-0 scale-75 -translate-x-8'
              }`}
            >
              {personalIdentity.lastName}
            </span>
          </div>

          {/* Roles */}
          <div
            className={`flex flex-col gap-1 sm:text-right transform transition-all duration-700 ease-out ${
              rolesVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="font-mono text-xs sm:text-sm md:text-base font-bold tracking-widest text-white">
              {personalIdentity.primaryRole.toUpperCase()}
            </span>
            <div className="flex flex-wrap sm:justify-end gap-x-2 gap-y-1 font-mono text-[10px] sm:text-xs tracking-wider text-slate-300">
              {personalIdentity.secondaryRoles.map((role, idx) => (
                <span key={role}>
                  {role.toUpperCase()} {idx < personalIdentity.secondaryRoles.length - 1 && '•'}
                </span>
              ))}
            </div>
            <p className="text-[10px] sm:text-xs font-mono text-slate-400 tracking-wider mt-0.5">
              PATRICIAN COLLEGE OF ARTS AND SCIENCE // 3RD YEAR BCA
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Invitation & Section Indicator */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between border-t border-white/[0.08] pt-4 sm:pt-6 relative z-10">
        <a
          href="#about"
          className="group inline-flex items-center gap-2 sm:gap-3 font-mono text-[11px] sm:text-xs tracking-widest text-slate-400 hover:text-white transition-colors"
          data-cursor="pointer"
        >
          <span className="w-6 sm:w-8 h-[1px] bg-accent-cyan group-hover:w-10 sm:group-hover:w-12 transition-all duration-300" />
          <span>SCROLL TO ENTER</span>
          <ChevronDown className="w-3.5 h-3.5 text-accent-cyan animate-bounce" />
        </a>

        <div className="hidden sm:flex items-center gap-4 font-mono text-[11px] text-slate-400">
          <span>01 / 06</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>EXPLORE DIGITAL REALM</span>
        </div>
      </div>
    </section>
  );
};
