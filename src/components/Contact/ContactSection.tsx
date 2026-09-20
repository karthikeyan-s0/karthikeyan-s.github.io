import React, { useState } from 'react';
import { personalIdentity } from '../../data/portfolioData';
import { Mail, ArrowUpRight, Copy, Check, Briefcase, Rocket, MessageSquare, Sparkles } from 'lucide-react';
import { playSubtleHover, playChime } from '../../utils/sound';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<'job' | 'freelance' | 'chat'>('job');
  const [customName, setCustomName] = useState('');
  const [customOrg, setCustomOrg] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalIdentity.email);
    playChime();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const templates = {
    job: {
      label: 'Hire Full-Time',
      icon: Briefcase,
      subject: `[Job Opportunity] Python / AI Developer - Karthikeyan S`,
      body: `Hi Karthikeyan,\n\nI reviewed your portfolio and engineering projects (including HandDance, PlanoVision AI, and VoiceForge AI). We are interested in speaking with you regarding an opportunity at ${customOrg || '[Your Organization]'}.\n\nBest regards,\n${customName || '[Your Name]'}`
    },
    freelance: {
      label: 'Freelance Project',
      icon: Rocket,
      subject: `[Freelance Inquiry] Web / AI Application Development`,
      body: `Hi Karthikeyan,\n\nI came across your client work on Stylerz Make and VEYRA Studio. I would like to discuss a custom web/AI development project for ${customOrg || '[Our Company/Brand]'}.\n\nTimeline & Scope:\n- Project: [Brief details]\n\nLet's connect,\n${customName || '[Your Name]'}`
    },
    chat: {
      label: 'Technical Chat',
      icon: MessageSquare,
      subject: `[Discussion] Connecting with Karthikeyan S`,
      body: `Hey Karthikeyan,\n\nI was impressed by your on-device ISL recognition and FastAPI microservices architecture. Would love to connect and chat about tech, AI, and building software.\n\nCheers,\n${customName || '[Your Name]'}`
    }
  };

  const currentTpl = templates[selectedTemplate];
  const mailtoLink = `mailto:${personalIdentity.email}?subject=${encodeURIComponent(currentTpl.subject)}&body=${encodeURIComponent(currentTpl.body)}`;

  return (
    <footer
      id="contact"
      className="relative min-h-screen w-full flex flex-col justify-between px-4 sm:px-8 lg:px-12 pt-20 lg:pt-28 pb-10 z-10 select-none overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto">
        {/* Top Tag */}
        <div className="flex items-center gap-4 mb-8 sm:mb-12">
          <span className="font-mono text-xs tracking-widest text-accent-cyan">04 / CONTACT</span>
          <div className="h-[1px] w-12 bg-accent-cyan/30" />
          <span className="font-mono text-xs tracking-widest text-slate-400">INITIATE TRANSMISSION</span>
        </div>

        {/* Huge Editorial Headline: HAVE AN IDEA? LET'S BUILD IT. */}
        <div className="flex flex-col gap-1 sm:gap-2 mb-12 sm:mb-16">
          <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-9xl text-white tracking-tighter leading-none">
            HAVE
          </h2>
          <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-9xl text-slate-500 tracking-tighter leading-none">
            AN IDEA?
          </h2>
          <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-white to-accent-violet tracking-tighter leading-none mt-1 sm:mt-2">
            LET'S BUILD IT.
          </h2>
        </div>

        {/* 1-Click Recruiter Inquiry Quick-Builder (Upgrade 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          {/* Left: Interactive Preset Selectors */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="flex items-center gap-2 font-mono text-xs text-accent-cyan tracking-wider uppercase">
              <Sparkles className="w-4 h-4" />
              <span>1-Click Recruiter & Client Dispatch</span>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {(Object.keys(templates) as Array<'job' | 'freelance' | 'chat'>).map((key) => {
                const item = templates[key];
                const Icon = item.icon;
                const active = selectedTemplate === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedTemplate(key);
                      playSubtleHover();
                    }}
                    className={`p-3 sm:p-4 rounded-xl border flex flex-col items-center gap-2 text-center transition-all duration-200 ${
                      active
                        ? 'bg-accent-cyan/15 border-accent-cyan text-white shadow-glow-blue'
                        : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-accent-cyan' : 'text-slate-400'}`} />
                    <span className="font-mono text-[11px] sm:text-xs font-semibold">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Live Name & Organization inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-400 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Connor"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-space-900 border border-white/10 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-accent-cyan"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-400 mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acme AI Labs"
                  value={customOrg}
                  onChange={(e) => setCustomOrg(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-space-900 border border-white/10 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-accent-cyan"
                />
              </div>
            </div>

            {/* Direct Email Dispatch Panel */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
              <div>
                <span className="font-mono text-[10px] text-slate-400 uppercase block">
                  Direct Electronic Mail
                </span>
                <span className="font-display font-bold text-base sm:text-lg text-white">
                  {personalIdentity.email}
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-full border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:border-white/30 transition-all flex items-center justify-center"
                  title="Copy email address"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>

                <a
                  href={mailtoLink}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider text-space-950 bg-white hover:bg-accent-cyan hover:shadow-glow-blue transition-all duration-300"
                  data-cursor="link"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>DISPATCH EMAIL</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Live Formatted Inquiry Preview */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-5 sm:p-6 border border-white/10 bg-space-950/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>PREVIEW: INQUIRY DISPATCH</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">AUTO-FORMATTED</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Subject:</span>
                  <span className="text-accent-cyan font-medium">{currentTpl.subject}</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Message Body:</span>
                  <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed bg-white/[0.02] p-3 rounded-lg border border-white/5 max-h-48 overflow-y-auto">
                    {currentTpl.body}
                  </pre>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-slate-500 mt-4">
              <span>Ready for instant mail launch</span>
              <span>100% Direct Response</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Loop Ending Screen (Specification 31) */}
      <div className="max-w-7xl w-full mx-auto pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-slate-400">
        <div>
          <span className="text-white font-bold tracking-widest">{personalIdentity.name}</span>
          <span className="mx-2 text-slate-600">//</span>
          <span>PYTHON DEVELOPER / WEB DEVELOPER / AI ENTHUSIAST</span>
        </div>

        <div className="flex items-center gap-4">
          <span>{personalIdentity.location.toUpperCase()}</span>
          <span className="text-slate-600">•</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};
