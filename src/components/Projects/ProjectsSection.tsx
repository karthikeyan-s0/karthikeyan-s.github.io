import React, { useState, useRef } from 'react';
import { projectsData } from '../../data/projectsData';
import type { Project } from '../../types';
import { 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  Smartphone, 
  Layers, 
  Receipt, 
  Activity, 
  ShieldCheck, 
  Globe, 
  CheckCircle2,
  Lock,
  RotateCw,
  ChevronRight as ArrowRightSmall,
  ChevronLeft as ArrowLeftSmall
} from 'lucide-react';
import { playSubtleHover } from '../../utils/sound';

export const ProjectsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeProject = projectsData[currentIndex];

  const handleNext = () => {
    if (currentIndex < projectsData.length - 1) {
      scrollToProject(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToProject(currentIndex - 1);
    }
  };

  const scrollToProject = (index: number) => {
    setCurrentIndex(index);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const targetCard = container.children[index] as HTMLElement;
      if (targetCard) {
        // Calculate precise scroll target within the container
        const targetScroll = targetCard.offsetLeft - container.offsetLeft - (container.clientWidth - targetCard.clientWidth) / 2;
        container.scrollTo({ left: targetScroll, behavior: 'smooth' });
      }
    }
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.children[0]?.clientWidth || 1;
    const newIdx = Math.round(scrollLeft / cardWidth);
    if (newIdx !== currentIndex && newIdx >= 0 && newIdx < projectsData.length) {
      setCurrentIndex(newIdx);
    }
  };

  // Wheel horizontal navigation without trapping page scroll
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    // If scrolling predominantly horizontally (trackpad), let it scroll naturally
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

    const container = scrollContainerRef.current;
    const isAtStart = container.scrollLeft <= 0;
    const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;

    // If wheeling down and not at end, scroll horizontal
    if (e.deltaY > 0 && !isAtEnd) {
      container.scrollBy({ left: e.deltaY * 1.5, behavior: 'auto' });
      e.preventDefault();
    } else if (e.deltaY < 0 && !isAtStart) {
      container.scrollBy({ left: e.deltaY * 1.5, behavior: 'auto' });
      e.preventDefault();
    }
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full py-24 sm:py-32 z-10 flex flex-col justify-center overflow-hidden bg-space-950/60"
    >
      {/* Editorial Section Introduction */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12 mb-8 sm:mb-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs tracking-widest text-accent-cyan">02 / SELECTED WORK</span>
            <div className="h-[1px] w-12 bg-accent-cyan/30" />
            <span className="font-mono text-xs tracking-widest text-slate-400">HORIZONTAL GALLERY</span>
          </div>

          {/* Project Counter 01 / 06 (Specification 24) */}
          <div className="font-mono text-sm tracking-widest text-white flex items-center gap-2">
            <span className="text-accent-cyan font-bold">{activeProject.number}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">06</span>
          </div>
        </div>

        {/* Huge Typographic Header: THINGS I'VE BUILT (Specification 16) */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-8xl tracking-tight text-white uppercase">
            THINGS <span className="text-slate-600">I'VE</span> BUILT
          </h2>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-400">
            <span>SCROLL OR DRAG TO EXPLORE</span>
          </div>
        </div>

        {/* Quick Domain Jump Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-6">
          {projectsData.map((p, pIdx) => (
            <button
              key={p.id}
              onClick={() => scrollToProject(pIdx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 whitespace-nowrap flex items-center gap-2 border ${
                currentIndex === pIdx
                  ? 'bg-accent-cyan/15 text-white border-accent-cyan/60 shadow-glow-blue'
                  : 'bg-white/[0.02] text-slate-400 border-white/5 hover:text-slate-200 hover:border-white/10'
              }`}
            >
              <span className="text-[10px] text-accent-cyan font-bold">{p.number}</span>
              <span>{p.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Project Track in Normal Document Flow */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onWheel={handleWheel}
        className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none px-4 sm:px-8 lg:px-12 pb-8 w-full max-w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projectsData.map((project) => (
          <div
            key={project.id}
            onMouseEnter={() => playSubtleHover()}
            className="flex-shrink-0 w-[92vw] sm:w-[84vw] lg:w-[72vw] max-w-5xl snap-center"
            data-cursor="project"
          >
            <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-white/10 hover:border-accent-cyan/40 transition-all duration-500 flex flex-col gap-6 sm:gap-8 group">
              {/* Card Top Metadata */}
              <div className="flex items-start justify-between border-b border-white/[0.08] pb-5 sm:pb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-accent-cyan">
                      {project.number}
                    </span>
                    <span className="font-mono text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-white mt-1 sm:mt-2 group-hover:text-accent-cyan transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="font-mono text-xs sm:text-sm text-accent-cyan tracking-wider mt-1 uppercase">
                    {project.subtitle}
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="flex items-center gap-3">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-mono tracking-wider text-white bg-accent-cyan/20 border border-accent-cyan/50 hover:bg-accent-cyan/30 transition-all"
                      data-cursor="link"
                    >
                      <span>VISIT SITE</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-accent-cyan group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-mono tracking-wider text-slate-300 bg-white/[0.04] border border-white/10 hover:border-accent-cyan/40 hover:text-white transition-all"
                      data-cursor="link"
                    >
                      <span>CODE REPO</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-accent-cyan group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </div>

              {/* Card Body: Narrative & Specialized Interactive Mockup */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                {/* Left Narrative */}
                <div className="lg:col-span-5 flex flex-col gap-5">
                  <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                    {project.description}
                  </p>

                  {/* Core Verified Features */}
                  {project.features && (
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[11px] tracking-wider text-slate-400 uppercase">
                        Technical Highlights
                      </span>
                      {project.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent-cyan flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded text-[11px] font-mono bg-white/[0.04] border border-white/10 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Interactive Spatial Mockup */}
                <div className="lg:col-span-7">
                  <ProjectInteractiveMockup project={project} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls & Pagination */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12 mt-2 sm:mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {projectsData.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => scrollToProject(dotIdx)}
              aria-label={`Go to project ${dotIdx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIdx === currentIndex ? 'w-8 bg-accent-cyan' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous project"
            className="p-3 rounded-full border border-white/10 bg-white/[0.03] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-accent-cyan/50 hover:text-accent-cyan transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === projectsData.length - 1}
            aria-label="Next project"
            className="p-3 rounded-full border border-white/10 bg-white/[0.03] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-accent-cyan/50 hover:text-accent-cyan transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Specialized Visual Mockup per Project
const ProjectInteractiveMockup: React.FC<{ project: Project }> = ({ project }) => {
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setTilt({ x, y });
  };

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
  };

  switch (project.visualType) {
    case 'handdance':
      return (
        <div className="relative rounded-2xl bg-space-950/80 border border-sky-500/20 p-5 sm:p-6 overflow-hidden flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
              <Smartphone className="w-4 h-4" />
              <span>CameraX // 30 FPS YUV_420_888</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              CONFIDENCE 96.4%
            </span>
          </div>

          <div className="relative h-56 rounded-xl bg-space-900 border border-white/5 flex flex-col items-center justify-center p-4 overflow-hidden">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-sky-500/30 animate-ping opacity-25" />
              <div className="w-28 h-28 rounded-full border border-dashed border-sky-400/40 flex items-center justify-center">
                <span className="text-4xl select-none">🤟</span>
              </div>
              <div className="absolute top-2 left-6 w-2 h-2 rounded-full bg-sky-400 shadow-glow-blue" />
              <div className="absolute top-1 right-8 w-2 h-2 rounded-full bg-sky-400 shadow-glow-blue" />
              <div className="absolute bottom-4 left-10 w-2 h-2 rounded-full bg-sky-400 shadow-glow-blue" />
            </div>

            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between bg-space-950/90 px-3 py-2 rounded-lg border border-white/10">
              <span className="font-mono text-xs text-slate-300">DETECTED SIGN:</span>
              <span className="font-mono text-xs font-bold text-sky-400 tracking-wider">"HELLO" (Greeting)</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Model: handdance_isl_v1.tflite</span>
            <span>100% On-Device Neural Pipeline</span>
          </div>
        </div>
      );

    case 'retail':
      return (
        <div className="relative rounded-2xl bg-space-950/80 border border-purple-500/20 p-5 sm:p-6 overflow-hidden flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
              <Layers className="w-4 h-4" />
              <span>YOLOv8 + PaddleOCR Retail Stream</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
              PLANOGRAM COMPLIANCE 94.2%
            </span>
          </div>

          <div className="relative min-h-56 sm:h-56 rounded-xl bg-space-900 border border-white/5 p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 overflow-hidden">
            {[
              { name: 'SKU #1042', status: 'MATCH', color: 'border-purple-400 text-purple-300' },
              { name: 'SKU #1043', status: 'MATCH', color: 'border-purple-400 text-purple-300' },
              { name: 'SKU #1044', status: 'FACING GAP', color: 'border-amber-400 text-amber-300' },
              { name: 'SKU #1045', status: 'MATCH', color: 'border-purple-400 text-purple-300' },
              { name: 'SKU #1046', status: 'MATCH', color: 'border-purple-400 text-purple-300' },
              { name: 'SKU #1047', status: 'MATCH', color: 'border-purple-400 text-purple-300' },
            ].map((sku, i) => (
              <div
                key={i}
                className={`relative rounded-lg border-2 ${sku.color} bg-white/[0.02] p-2 flex flex-col justify-between`}
              >
                <span className="text-[10px] font-mono font-bold">{sku.name}</span>
                <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-black/50 self-start">
                  {sku.status}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>FastAPI Backend + Flutter Scanner</span>
            <span>Real-time Facing Verification</span>
          </div>
        </div>
      );

    case 'saas':
      return (
        <div className="relative rounded-2xl bg-space-950/80 border border-sky-500/20 p-5 sm:p-6 overflow-hidden flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
              <Receipt className="w-4 h-4" />
              <span>GSTify SaaS Ledger & Invoice Engine</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              AUDIT VERIFIED
            </span>
          </div>

          <div className="relative h-56 rounded-xl bg-space-900 border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div>
                <div className="text-xs font-bold text-white">TAX INVOICE #GST-2024-88</div>
                <div className="text-[10px] font-mono text-slate-400">HSN CODE: 998314 // IT SERVICES</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-accent-cyan">₹ 1,42,800.00</div>
                <div className="text-[10px] font-mono text-slate-400">CGST (9%) + SGST (9%)</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-auto">
              <div className="p-2 rounded bg-white/[0.02] border border-white/5 flex sm:flex-col justify-between sm:justify-start">
                <div className="text-[10px] text-slate-400">RECEIVABLES</div>
                <div className="text-xs font-mono font-bold text-emerald-400">₹ 8.45 L</div>
              </div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/5 flex sm:flex-col justify-between sm:justify-start">
                <div className="text-[10px] text-slate-400">INPUT TAX CREDIT</div>
                <div className="text-xs font-mono font-bold text-sky-400">₹ 1.20 L</div>
              </div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/5 flex sm:flex-col justify-between sm:justify-start">
                <div className="text-[10px] text-slate-400">ACTIVE CLIENTS</div>
                <div className="text-xs font-mono font-bold text-purple-400">28 ENTITIES</div>
              </div>
            </div>

            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 w-4/5" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>FastAPI + Relational SQL Core</span>
            <span>Automated Tax Compliance</span>
          </div>
        </div>
      );

    case 'audio':
      return (
        <div className="relative rounded-2xl bg-space-950/80 border border-indigo-500/20 p-5 sm:p-6 overflow-hidden flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
              <Activity className="w-4 h-4" />
              <span>VoiceForge // Neural Stream /ws</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              LATENCY &lt; 180ms
            </span>
          </div>

          <div className="relative h-56 rounded-xl bg-space-900 border border-white/5 p-4 flex flex-col justify-between items-center overflow-hidden">
            <div className="flex items-center justify-center gap-1.5 h-28 w-full">
              {[20, 45, 75, 30, 90, 60, 40, 85, 100, 70, 40, 60, 95, 50, 30, 80, 55, 35, 70, 45].map(
                (height, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-gradient-to-t from-indigo-500 via-sky-400 to-purple-400 rounded-full animate-pulse"
                    style={{
                      height: `${height}%`,
                      animationDelay: `${(i % 5) * 120}ms`,
                      animationDuration: '1.2s'
                    }}
                  />
                )
              )}
            </div>

            <div className="w-full flex items-center justify-between bg-space-950/80 px-3 py-2 rounded-lg border border-white/10 font-mono text-xs">
              <span className="text-slate-400">SAMPLING: 24 kHz 16-BIT</span>
              <span className="text-indigo-400 font-bold">COQUI XTTS v2 CLONE ACTIVE</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>FastAPI + Celery + Redis Broker</span>
            <span>Real-Time WebSocket Micro-Chunks</span>
          </div>
        </div>
      );

    case 'auth':
      return (
        <div className="relative rounded-2xl bg-space-950/80 border border-sky-500/20 p-5 sm:p-6 overflow-hidden flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
              <ShieldCheck className="w-4 h-4" />
              <span>OAuth2 + JWT Cryptographic Guard</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30">
              ZERO-TRUST ACTIVE
            </span>
          </div>

          <div className="relative h-56 rounded-xl bg-space-900 border border-white/5 p-4 flex flex-col justify-center gap-3 overflow-hidden">
            <div className="p-3 rounded-lg bg-space-950 border border-white/10 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">BEARER TOKEN:</span>
              <span className="text-sky-400 truncate max-w-[200px]">eyJhbGciOiJIUzI1NiIsIn...</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs font-mono">
                <span className="text-slate-400 block text-[10px]">ROLE-BASED MATRIX</span>
                <span className="text-emerald-400 font-bold">RBAC GRANTED</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs font-mono">
                <span className="text-slate-400 block text-[10px]">ROTATION STRATEGY</span>
                <span className="text-sky-400 font-bold">ANTI-REPLAY ON</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Password Hashing & Session Isolation</span>
            <span>FastAPI Security Handshake</span>
          </div>
        </div>
      );

    case 'clients':
      return (
        <div
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform'
          }}
          className="relative rounded-2xl bg-space-950/85 border border-purple-500/30 p-5 sm:p-6 overflow-hidden flex flex-col gap-4 shadow-glass"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
              <Globe className="w-4 h-4" />
              <span>3D PERSPECTIVE BROWSER WORKSPACE</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              LIVE ON VERCEL
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 3D Browser Window 1: Stylerz Make */}
            <a
              href="https://stylerz-make.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/15 bg-space-900/90 overflow-hidden flex flex-col hover:border-accent-cyan/60 hover:shadow-glow-blue transition-all duration-300 group/browser"
              data-cursor="link"
            >
              <div className="bg-space-950 px-3 py-2 border-b border-white/10 flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-1 text-slate-500 ml-1">
                  <ArrowLeftSmall className="w-3 h-3" />
                  <ArrowRightSmall className="w-3 h-3" />
                  <RotateCw className="w-2.5 h-2.5 ml-0.5" />
                </div>
                <div className="flex-1 bg-white/[0.04] rounded px-2 py-0.5 flex items-center justify-center gap-1 font-mono text-[9px] text-slate-400 truncate">
                  <Lock className="w-2.5 h-2.5 text-emerald-400" />
                  <span>stylerz-make.vercel.app</span>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between min-h-[140px] bg-gradient-to-b from-space-900 to-space-950">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover/browser:text-accent-cyan transition-colors">
                      Stylerz Make
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-300">
                      PRODUCTION
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-2 line-clamp-2">
                    Premium salon & personal styling modern web application with appointment flows.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/5 font-mono text-[10px] text-accent-cyan">
                  <span>LAUNCH SITE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/browser:translate-x-0.5 group-hover/browser:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </a>

            {/* 3D Browser Window 2: VEYRA Studio */}
            <a
              href="https://veyra-studio-tau.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/15 bg-space-900/90 overflow-hidden flex flex-col hover:border-accent-violet/60 hover:shadow-glow-violet transition-all duration-300 group/browser"
              data-cursor="link"
            >
              <div className="bg-space-950 px-3 py-2 border-b border-white/10 flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-1 text-slate-500 ml-1">
                  <ArrowLeftSmall className="w-3 h-3" />
                  <ArrowRightSmall className="w-3 h-3" />
                  <RotateCw className="w-2.5 h-2.5 ml-0.5" />
                </div>
                <div className="flex-1 bg-white/[0.04] rounded px-2 py-0.5 flex items-center justify-center gap-1 font-mono text-[9px] text-slate-400 truncate">
                  <Lock className="w-2.5 h-2.5 text-emerald-400" />
                  <span>veyra-studio-tau.vercel.app</span>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between min-h-[140px] bg-gradient-to-b from-space-900 to-space-950">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover/browser:text-accent-violet transition-colors">
                      VEYRA Studio
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-300">
                      EDITORIAL
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-2 line-clamp-2">
                    Contemporary digital design studio portfolio with minimalist luxury typography.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/5 font-mono text-[10px] text-accent-violet">
                  <span>LAUNCH SITE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/browser:translate-x-0.5 group-hover/browser:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </a>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
            <span>React + TypeScript + Vite</span>
            <span>Interactive 3D Perspective Browser Physics</span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
