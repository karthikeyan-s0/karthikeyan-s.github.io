import React from 'react';
import { journeyMilestones } from '../../data/portfolioData';
import { GraduationCap, Code2, Briefcase } from 'lucide-react';

export const JourneySection: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <GraduationCap className="w-5 h-5 text-accent-cyan" />;
      case 1:
        return <Code2 className="w-5 h-5 text-accent-violet" />;
      case 2:
        return <Briefcase className="w-5 h-5 text-indigo-400" />;
      default:
        return null;
    }
  };

  return (
    <section
      id="journey"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 py-28 z-10"
    >
      <div className="max-w-7xl w-full mx-auto">
        {/* Section Tag */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs tracking-widest text-accent-cyan">03 / JOURNEY</span>
          <div className="h-[1px] w-12 bg-accent-cyan/30" />
          <span className="font-mono text-xs tracking-widest text-slate-400">EVOLUTION & FOCUS</span>
        </div>

        {/* Huge Typographic Triad: BUILDING. LEARNING. EXPERIMENTING. (Specification 27) */}
        <div className="flex flex-col mb-16 select-none">
          <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-9xl text-white tracking-tighter leading-none hover:text-accent-cyan transition-colors duration-300">
            BUILDING.
          </h2>
          <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-9xl text-slate-500 tracking-tighter leading-none hover:text-white transition-colors duration-300">
            LEARNING.
          </h2>
          <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-9xl text-slate-700 tracking-tighter leading-none hover:text-accent-violet transition-colors duration-300">
            EXPERIMENTING.
          </h2>
        </div>

        {/* Milestone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {journeyMilestones.map((milestone, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-2xl flex flex-col justify-between"
              data-cursor="pointer"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10">
                    {getIcon(idx)}
                  </div>
                  <span className="font-mono text-xs text-slate-400">
                    {milestone.period}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-2">
                  {milestone.title}
                </h3>
                <div className="font-mono text-xs text-accent-cyan mb-4">
                  {milestone.organization}
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {milestone.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-white/5">
                {milestone.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-slate-400 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Academic Verification Badge */}
        <div className="mt-8 glass-panel p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <span>INSTITUTION: PATRICIAN COLLEGE OF ARTS AND SCIENCE, CHENNAI</span>
          <span>PROGRAM: BACHELOR OF COMPUTER APPLICATIONS (BCA) // CURRENT: 3RD YEAR</span>
        </div>
      </div>
    </section>
  );
};
