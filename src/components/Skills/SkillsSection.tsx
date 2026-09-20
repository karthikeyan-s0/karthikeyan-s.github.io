import React, { useState } from 'react';
import { technologiesSequence } from '../../data/portfolioData';
import { ArrowRight } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 py-28 z-10 overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto">
        {/* Section Label */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs tracking-widest text-accent-cyan">01.5 / SKILLS</span>
            <div className="h-[1px] w-12 bg-accent-cyan/30" />
            <span className="font-mono text-xs tracking-widest text-slate-400">TECHNOLOGY PROGRESSION</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-400">
            <span>HOVER TO INSPECT SUBSYSTEM</span>
          </div>
        </div>

        {/* Typographic Progression Stream */}
        <div className="flex flex-col gap-2 sm:gap-4">
          {technologiesSequence.map((tech, index) => {
            const isHovered = hoveredSkill === tech.name;
            return (
              <div
                key={tech.name}
                onMouseEnter={() => setHoveredSkill(tech.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="group relative border-b border-white/[0.06] py-3 sm:py-4 transition-all duration-300"
                data-cursor="pointer"
              >
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span className="font-mono text-xs text-slate-500 w-6">
                      0{index + 1}
                    </span>
                    <h3
                      className={`font-display font-black text-3xl sm:text-6xl lg:text-7xl tracking-tighter transition-all duration-300 ${
                        isHovered
                          ? 'text-white translate-x-4 sm:translate-x-6'
                          : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    >
                      {tech.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono text-xs sm:text-sm tracking-wider transition-all duration-300 hidden md:inline-block ${
                        isHovered ? 'text-accent-cyan opacity-100' : 'text-slate-500 opacity-60'
                      }`}
                    >
                      {tech.desc}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 text-accent-cyan transition-all duration-300 ${
                        isHovered ? 'translate-x-1 opacity-100' : '-translate-x-2 opacity-0'
                      }`}
                    />
                  </div>
                </div>

                {/* Ambient glow accent line */}
                <div
                  className={`absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-accent-cyan via-accent-violet to-transparent transition-all duration-500 ${
                    isHovered ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-12 flex items-center justify-between font-mono text-[11px] text-slate-400">
          <span>NO ARBITRARY PERCENTAGE BARS</span>
          <span className="hidden sm:inline">PURE FUNCTIONAL FLUENCY & PROJECT-PROVEN TOOLING</span>
        </div>
      </div>
    </section>
  );
};
