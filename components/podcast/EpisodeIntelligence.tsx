import React from 'react';
import { Headphones, Share2, Download, ArrowRight } from 'lucide-react';

interface EpisodeIntelligenceProps {
  currentEpisode: any;
  setShowTranscript: (show: boolean) => void;
}

export const EpisodeIntelligence: React.FC<EpisodeIntelligenceProps> = ({
  currentEpisode,
  setShowTranscript,
}) => {
  return (
    <div className="bg-white dark:bg-earth-900 p-10 rounded-[3rem] shadow-sm border border-earth-100 dark:border-earth-800">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-agro-50 dark:bg-agro-950/30 rounded-2xl text-agro-600">
          <Headphones size={24} />
        </div>
        <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white">Episode Intelligence</h3>
      </div>
      <p className="text-earth-600 dark:text-earth-400 leading-relaxed mb-10 text-lg font-medium">
        {currentEpisode.description}
      </p>
      <div className="flex flex-wrap gap-3 mb-10">
        {currentEpisode.tags?.map((t: string) => (
          <span key={t} className="bg-earth-50 dark:bg-earth-800 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-earth-100 dark:border-earth-800">
            {t}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 border-t border-earth-100 dark:border-earth-800 pt-8">
        <button className="flex items-center gap-3 text-earth-500 hover:text-agro-600 font-black text-[10px] uppercase tracking-widest transition-all">
          <Share2 size={20} /> Share Session
        </button>
        <button className="flex items-center gap-3 text-earth-500 hover:text-agro-600 font-black text-[10px] uppercase tracking-widest transition-all">
          <Download size={20} /> Offline Access
        </button>
        <button
          onClick={() => setShowTranscript(true)}
          className="ml-auto flex items-center gap-3 text-agro-600 font-black text-[10px] uppercase tracking-widest group"
        >
          View Transcript <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
