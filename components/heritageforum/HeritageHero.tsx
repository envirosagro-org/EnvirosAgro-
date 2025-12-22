import React from 'react';
import { Scroll, Feather, Library } from 'lucide-react';

interface HeritageHeroProps {
  setShowShareModal: (show: boolean) => void;
  setShowArchiveModal: (show: boolean) => void;
}

export const HeritageHero: React.FC<HeritageHeroProps> = ({ setShowShareModal, setShowArchiveModal }) => {
  return (
    <div className="bg-rose-900 rounded-[3rem] p-10 md:p-16 text-white mb-16 relative overflow-hidden shadow-2xl border-4 border-rose-950/20">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-[5s]">
        <Scroll size={400} className="text-white" />
      </div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 text-rose-300 font-black uppercase tracking-[0.3em] text-[10px] mb-6">
            <div className="w-8 h-px bg-rose-400"></div>
            <Feather size={14} /> Heritage Hub
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-[0.9] tracking-tighter">
            Preserving the <br />
            <span className="text-rose-400 italic">Soul of Agriculture</span>
          </h1>
          <p className="text-rose-100 text-xl leading-relaxed mb-10 font-medium opacity-90">
            A sanctuary for indigenous knowledge, cultural storytelling, and the timeless wisdom that connects us to the land.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowShareModal(true)}
              className="bg-white text-rose-900 font-black py-4 px-10 rounded-2xl hover:bg-rose-50 transition-all flex items-center gap-3 shadow-xl active:scale-95 text-xs uppercase tracking-widest"
            >
              <Scroll size={18} /> Share Your Story
            </button>
            <button
              onClick={() => setShowArchiveModal(true)}
              className="bg-rose-800/40 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-rose-800/60 transition-all"
            >
              <Library size={18} /> Browse Archives
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 max-w-sm shadow-2xl relative group">
          <div className="absolute -top-4 -left-4 bg-amber-400 text-rose-950 p-2 rounded-xl shadow-lg">
            {/* Sparkles icon usually imported in main but using placeholder if needed */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="m12 3 1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
          </div>
          <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-rose-300 mb-4">Daily Wisdom</h3>
          <p className="text-rose-50 italic text-lg leading-relaxed mb-6 font-medium">
            "The earth does not belong to us; we belong to the earth. Treat the soil as a living ancestor, and it will feed your children's children."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-400/30 flex items-center justify-center text-rose-100 font-bold text-xs">M</div>
            <p className="text-xs font-black uppercase tracking-widest text-rose-200">Maasai Proverb</p>
          </div>
        </div>
      </div>
    </div>
  );
};
