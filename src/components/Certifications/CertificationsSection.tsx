import React, { useState } from 'react';
import { certificationsData } from '../../data/portfolioData';
import { Award, Trophy, CheckCircle } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  const [tilt, setTilt] = useState<{ [key: string]: { x: number; y: number } }>({});

  const handleMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setTilt((prev) => ({ ...prev, [id]: { x, y } }));
  };

  const handleMouseLeave = (id: string) => {
    setTilt((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
  };

  return (
    <section
      id="certificates"
      className="relative min-h-[70vh] w-full flex flex-col justify-center px-6 sm:px-12 py-24 z-10"
    >
      <div className="max-w-7xl w-full mx-auto">
        {/* Section Tag */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs tracking-widest text-accent-cyan">03.5 / CREDENTIALS</span>
          <div className="h-[1px] w-12 bg-accent-cyan/30" />
          <span className="font-mono text-xs tracking-widest text-slate-400">AUTHENTIC RECOGNITION</span>
        </div>

        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-12">
          CERTIFICATIONS & RECOGNITIONS
        </h2>

        {/* 3D Tilting Physical Cards Gallery (Specification 28) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificationsData.map((cert, idx) => {
            const cardTilt = tilt[cert.id] || { x: 0, y: 0 };
            return (
              <div
                key={cert.id}
                onMouseMove={(e) => handleMouseMove(cert.id, e)}
                onMouseLeave={() => handleMouseLeave(cert.id)}
                style={{
                  transform: `perspective(1000px) rotateX(${cardTilt.y}deg) rotateY(${cardTilt.x}deg)`,
                  transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  willChange: 'transform'
                }}
                className="glass-panel p-8 sm:p-10 rounded-2xl sm:rounded-3xl border border-white/10 hover:border-accent-cyan/50 transition-all duration-300 relative group overflow-hidden"
                data-cursor="pointer"
              >
                {/* Subtle reflective gradient sheen on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-start justify-between border-b border-white/10 pb-6 mb-6">
                  <div className="p-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20">
                    {idx === 0 ? (
                      <Award className="w-6 h-6 text-accent-cyan" />
                    ) : (
                      <Trophy className="w-6 h-6 text-accent-violet" />
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs text-accent-cyan font-bold block">
                      {cert.type.toUpperCase()}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">
                      ISSUED: {cert.year}
                    </span>
                  </div>
                </div>

                <h3 className="font-display font-bold text-2xl text-white mb-2 group-hover:text-accent-cyan transition-colors">
                  {cert.title}
                </h3>
                <div className="font-mono text-xs text-slate-400 mb-4">
                  ORGANIZATION // {cert.issuer.toUpperCase()}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {cert.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-4 border-t border-white/5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>VERIFIED ACADEMIC & TECHNICAL RECORD</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
