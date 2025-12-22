import React from 'react';
import { TrendingUp, X, Clock, Loader2, Search } from 'lucide-react';

interface NewsListProps {
  isRescanning: boolean;
  activeCategoryFilter: string | null;
  setActiveCategoryFilter: (cat: string | null) => void;
  displayedSegments: any[];
  activeSegment: any;
  setActiveSegment: (segment: any) => void;
  isBroadcasting: boolean;
  setVideoProgress: (progress: number) => void;
  setShowArchive: (show: boolean) => void;
}

export const NewsList: React.FC<NewsListProps> = ({
  isRescanning,
  activeCategoryFilter,
  setActiveCategoryFilter,
  displayedSegments,
  activeSegment,
  setActiveSegment,
  isBroadcasting,
  setVideoProgress,
  setShowArchive,
}) => {
  return (
    <div className="bg-white dark:bg-earth-900 border border-earth-200 dark:border-earth-800 rounded-[2.5rem] p-8 shadow-sm flex flex-col h-full relative overflow-hidden">
      {isRescanning && (
        <div className="absolute inset-0 z-10 bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in">
          <Loader2 className="text-agro-600 animate-spin mb-4" size={48} />
          <p className="text-[10px] font-black text-agro-600 uppercase tracking-[0.4em]">Rescanning Network...</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-earth-900 dark:text-white flex items-center gap-2">
          <TrendingUp size={20} className="text-agro-600" /> {activeCategoryFilter ? activeCategoryFilter : 'Top Stories'}
        </h3>
        {activeCategoryFilter && (
          <button onClick={() => setActiveCategoryFilter(null)} className="p-1 hover:bg-earth-100 dark:hover:bg-earth-800 rounded-lg text-earth-400"><X size={16} /></button>
        )}
      </div>

      <div className="space-y-4 overflow-y-auto flex-1 pr-2 custom-scrollbar">
        {displayedSegments.length > 0 ? displayedSegments.map((segment) => (
          <div
            key={segment.id}
            onClick={() => { setActiveSegment(segment); if (isBroadcasting) setVideoProgress(0); }}
            className={`flex gap-4 p-4 rounded-2xl cursor-pointer transition-all border-2 ${activeSegment.id === segment.id ? 'bg-agro-50 dark:bg-agro-900/20 border-agro-200 dark:border-agro-800 shadow-sm' : 'hover:bg-earth-50 dark:hover:bg-earth-800/50 border-transparent'}`}
          >
            <div className="w-24 h-16 rounded-xl overflow-hidden shrink-0 relative shadow-sm">
              <img src={segment.image} className="w-full h-full object-cover" alt={segment.title} />
              <div className="absolute bottom-1 right-1 bg-black/80 backdrop-blur-sm text-white text-[8px] font-black px-1.5 py-0.5 rounded-md border border-white/10">
                {segment.duration}
              </div>
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-black text-agro-600 uppercase tracking-widest mb-1 block">{segment.category}</span>
              <h4 className={`text-xs font-bold leading-tight line-clamp-2 mb-1 transition-colors ${activeSegment.id === segment.id ? 'text-earth-900 dark:text-agro-400' : 'text-earth-700 dark:text-earth-300'}`}>
                {segment.title}
              </h4>
              <span className="text-[10px] text-earth-400 font-bold flex items-center gap-1 uppercase tracking-tighter">
                <Clock size={10} /> {segment.time}
              </span>
            </div>
          </div>
        )) : (
          <div className="py-20 text-center opacity-40">
            <Search size={40} className="mx-auto mb-4" />
            <p className="text-xs font-bold uppercase tracking-widest">No segments found in this node.</p>
          </div>
        )}
      </div>
      <button
        onClick={() => setShowArchive(true)}
        className="w-full mt-6 text-[10px] font-black text-center text-earth-400 hover:text-agro-600 uppercase tracking-[0.2em] py-4 border-t border-earth-100 dark:border-earth-800 transition-all"
      >
        View All Global Reports
      </button>
    </div>
  );
};
