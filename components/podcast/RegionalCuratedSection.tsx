import React from 'react';
import { HeadphonesIcon, Sparkles } from 'lucide-react';

interface RegionalCuratedSectionProps {
  onShowArchive: () => void;
}

export const RegionalCuratedSection: React.FC<RegionalCuratedSectionProps> = ({ onShowArchive }) => {
  return (
    <div className="mt-24 p-12 bg-agro-50 dark:bg-agro-900/10 rounded-[3.5rem] border-2 border-dashed border-agro-200 dark:border-agro-800 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-5 transform rotate-12 group-hover:rotate-45 transition-transform duration-1000">
        <HeadphonesIcon size={200} />
      </div>
      <div className="w-24 h-24 bg-white dark:bg-earth-900 rounded-[2rem] flex items-center justify-center text-agro-600 shadow-xl border border-agro-100 dark:border-agro-800 shrink-0">
        <Sparkles size={40} className="animate-pulse" />
      </div>
      <div className="flex-1 relative z-10 text-center md:text-left">
        <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white mb-2">Curated for Your Region</h3>
        <p className="text-earth-600 dark:text-earth-400 leading-relaxed font-medium">
          Our AI models analyze global environmental data to recommend content that strengthens your regional ecological resilience.
        </p>
      </div>
      <button
        onClick={onShowArchive}
        className="bg-agro-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-agro-900/20 transition-all hover:scale-105 active:scale-95"
      >
        Global Discovery
      </button>
    </div>
  );
};
