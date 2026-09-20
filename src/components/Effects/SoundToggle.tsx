import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { setAudioEnabled } from '../../utils/sound';

export const SoundToggle: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  const toggleSound = () => {
    const next = !enabled;
    setEnabled(next);
    setAudioEnabled(next);
  };

  return (
    <button
      onClick={toggleSound}
      aria-label={enabled ? "Mute ambient audio" : "Enable ambient audio"}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-2 rounded-full glass-panel border border-white/10 hover:border-accent-cyan/40 text-xs font-mono text-slate-300 hover:text-white transition-all duration-300 group"
    >
      <div className="flex items-center gap-1">
        {enabled ? (
          <>
            <span className="w-1 h-3 bg-accent-cyan animate-pulse" />
            <span className="w-1 h-4 bg-accent-cyan animate-pulse delay-75" />
            <span className="w-1 h-2 bg-accent-cyan animate-pulse delay-150" />
            <Volume2 className="w-3.5 h-3.5 ml-1 text-accent-cyan" />
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200" />
            <span className="text-[10px] tracking-wider text-slate-400 group-hover:text-slate-200">SOUND OFF</span>
          </>
        )}
      </div>
    </button>
  );
};
