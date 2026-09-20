import React, { useState } from 'react';
import { personalIdentity } from '../../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';

export const ConnectSection: React.FC = () => {
  const [ghMagnetic, setGhMagnetic] = useState({ x: 0, y: 0 });
  const [liMagnetic, setLiMagnetic] = useState({ x: 0, y: 0 });

  const handleMagnetic = (
    e: React.MouseEvent<HTMLAnchorElement>,
    setter: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
    setter({ x, y });
  };

  const resetMagnetic = (
    setter: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  ) => {
    setter({ x: 0, y: 0 });
  };

  return (
    <section
      id="connect"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 py-28 z-10 select-none"
    >
      <div className="max-w-7xl w-full mx-auto">
        {/* Minimal Typographic Triad: CODE -> IDEAS -> PEOPLE (Specification 29) */}
        <div className="flex flex-col gap-1 mb-12 sm:mb-16">
          <span className="font-display font-black text-5xl sm:text-7xl lg:text-9xl text-slate-800 tracking-tighter leading-none hover:text-white transition-colors duration-500">
            CODE.
          </span>
          <span className="font-display font-black text-5xl sm:text-7xl lg:text-9xl text-slate-600 tracking-tighter leading-none hover:text-accent-cyan transition-colors duration-500">
            IDEAS.
          </span>
          <span className="font-display font-black text-5xl sm:text-7xl lg:text-9xl text-slate-400 tracking-tighter leading-none hover:text-accent-violet transition-colors duration-500">
            PEOPLE.
          </span>
        </div>

        {/* Two Giant Interactive Magnetic Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* GitHub Magnetic Link */}
          <a
            href={personalIdentity.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={(e) => handleMagnetic(e, setGhMagnetic)}
            onMouseLeave={() => resetMagnetic(setGhMagnetic)}
            style={{
              transform: `translate3d(${ghMagnetic.x}px, ${ghMagnetic.y}px, 0)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="group glass-panel p-6 sm:p-10 lg:p-14 rounded-2xl sm:rounded-3xl border border-white/10 hover:border-accent-cyan/60 flex flex-col justify-between min-h-60 sm:h-72 transition-colors duration-300"
            data-cursor="link"
          >
            <div className="flex items-center justify-between">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:border-accent-cyan/40 text-white group-hover:text-accent-cyan transition-colors">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </div>
              <ArrowUpRight className="w-7 h-7 text-slate-500 group-hover:text-accent-cyan group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>

            <div>
              <span className="font-mono text-xs text-slate-400 block mb-1">
                OPEN SOURCE & REPOSITORIES
              </span>
              <h3 className="font-display font-bold text-3xl sm:text-4xl text-white group-hover:text-accent-cyan transition-colors">
                GITHUB // karthikeyan-s0
              </h3>
            </div>
          </a>

          {/* LinkedIn Magnetic Link */}
          <a
            href={personalIdentity.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={(e) => handleMagnetic(e, setLiMagnetic)}
            onMouseLeave={() => resetMagnetic(setLiMagnetic)}
            style={{
              transform: `translate3d(${liMagnetic.x}px, ${liMagnetic.y}px, 0)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="group glass-panel p-6 sm:p-10 lg:p-14 rounded-2xl sm:rounded-3xl border border-white/10 hover:border-accent-violet/60 flex flex-col justify-between min-h-60 sm:h-72 transition-colors duration-300"
            data-cursor="link"
          >
            <div className="flex items-center justify-between">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:border-accent-violet/40 text-white group-hover:text-accent-violet transition-colors">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </div>
              <ArrowUpRight className="w-7 h-7 text-slate-500 group-hover:text-accent-violet group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>

            <div>
              <span className="font-mono text-xs text-slate-400 block mb-1">
                PROFESSIONAL NETWORK & COLLABORATION
              </span>
              <h3 className="font-display font-bold text-3xl sm:text-4xl text-white group-hover:text-accent-violet transition-colors">
                LINKEDIN // karthikeyan-s
              </h3>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
