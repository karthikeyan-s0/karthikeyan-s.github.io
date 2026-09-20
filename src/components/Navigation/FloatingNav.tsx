import React, { useState, useEffect } from 'react';
import { personalIdentity } from '../../data/portfolioData';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export const FloatingNav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Journey', href: '#journey' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-12 py-5 transition-all duration-500 ${
          scrolled
            ? 'py-4 bg-space-950/70 backdrop-blur-xl border-b border-white/[0.06] shadow-glass'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            data-cursor="pointer"
          >
            <div className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center font-display font-bold text-sm tracking-wider text-white group-hover:border-accent-cyan/50 group-hover:text-accent-cyan transition-colors">
              KS
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-semibold tracking-widest text-slate-200 group-hover:text-white transition-colors">
                {personalIdentity.name}
              </span>
              <span className="text-[10px] font-mono tracking-wider text-slate-400">
                CHENNAI / INDIA
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-white/[0.08]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1 text-xs font-mono tracking-wider text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-full transition-all duration-200"
                data-cursor="pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`mailto:${personalIdentity.email}`}
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider text-slate-200 bg-white/[0.04] border border-white/10 hover:border-accent-cyan/50 hover:bg-accent-cyan/10 transition-all duration-300"
              data-cursor="link"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-accent-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-lg border border-white/10 text-slate-200"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-space-950/95 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-display font-medium text-slate-200 hover:text-accent-cyan transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`mailto:${personalIdentity.email}`}
              onClick={() => setMobileOpen(false)}
              className="mt-6 inline-flex items-center gap-2 text-lg font-mono text-accent-cyan"
            >
              <span>START A CONVERSATION</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </nav>
        </div>
      )}
    </>
  );
};
