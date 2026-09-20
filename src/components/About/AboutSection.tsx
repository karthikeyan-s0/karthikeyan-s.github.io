import React from 'react';
import { personalIdentity } from '../../data/portfolioData';
import { Cpu, Terminal, Sparkles, Layers } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const architecturalNodes = [
    { name: 'Python', role: 'Backend Core', color: 'border-sky-500/30 text-sky-400' },
    { name: 'FastAPI', role: 'Async Microservices', color: 'border-emerald-500/30 text-emerald-400' },
    { name: 'AI / ML', role: 'Edge & Neural TFLite', color: 'border-violet-500/30 text-violet-400' },
    { name: 'Web', role: 'React & Modern UI', color: 'border-cyan-500/30 text-cyan-400' },
    { name: 'SQL', role: 'Relational Schemas', color: 'border-amber-500/30 text-amber-400' },
    { name: 'Data', role: 'Power BI & Analytics', color: 'border-indigo-500/30 text-indigo-400' },
    { name: 'Git & GitHub', role: 'CI/CD Pipelines', color: 'border-slate-500/30 text-slate-300' },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 py-28 z-10"
    >
      <div className="max-w-7xl w-full mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs tracking-widest text-accent-cyan">01 / ABOUT</span>
          <div className="h-[1px] w-12 bg-accent-cyan/30" />
          <span className="font-mono text-xs tracking-widest text-slate-400">ENGINEERING MANIFESTO</span>
        </div>

        {/* Main Statement */}
        <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.15] max-w-5xl tracking-tight">
          {personalIdentity.about.statement}
        </h2>

        {/* Supporting Copy & Architecture Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 items-start">
          {/* Left: Authentic Bio Narrative */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              {personalIdentity.about.copy}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="glass-panel p-5 rounded-xl">
                <div className="flex items-center gap-2 text-accent-cyan mb-2">
                  <Terminal className="w-4 h-4" />
                  <span className="font-mono text-xs tracking-wider">FOUNDATION</span>
                </div>
                <div className="text-white font-medium text-sm">BCA — 3rd Year</div>
                <div className="text-slate-400 text-xs mt-1">Patrician College, Chennai</div>
              </div>

              <div className="glass-panel p-5 rounded-xl">
                <div className="flex items-center gap-2 text-accent-violet mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-mono text-xs tracking-wider">ACTIVE FOCUS</span>
                </div>
                <div className="text-white font-medium text-sm">Edge AI & Microservices</div>
                <div className="text-slate-400 text-xs mt-1">TFLite, FastAPI & React</div>
              </div>
            </div>
          </div>

          {/* Right: Floating Digital Architecture (Specification 14) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="flex items-center justify-between font-mono text-xs text-slate-400 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-accent-cyan" />
                <span>FLOATING ARCHITECTURE // ORBITAL MATRIX</span>
              </div>
              <span>MANY TECHNOLOGIES → ONE DEVELOPER</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {architecturalNodes.map((node) => (
                <div
                  key={node.name}
                  className={`glass-panel p-4 rounded-xl border ${node.color} hover:scale-105 transition-all duration-300 group`}
                  data-cursor="pointer"
                >
                  <div className="text-sm font-semibold text-white group-hover:text-accent-cyan transition-colors">
                    {node.name}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">
                    {node.role}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between text-xs font-mono text-slate-400 mt-2">
              <span className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-accent-cyan" />
                Zero Bloat Architecture
              </span>
              <span>100% Real Implementations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
