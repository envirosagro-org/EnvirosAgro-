import React from 'react';
import { Radio, Globe, Search, X, Play, Clock, MousePointer2, Activity } from 'lucide-react';

interface ArchiveModalProps {
  archiveSearch: string;
  setArchiveSearch: (search: string) => void;
  setShowArchive: (show: boolean) => void;
  archiveResults: any[];
  handleWatchNow: (segment: any) => void;
  newsSegmentsCount: number;
}

export const ArchiveModal: React.FC<ArchiveModalProps> = ({
  archiveSearch,
  setArchiveSearch,
  setShowArchive,
  archiveResults,
  handleWatchNow,
  newsSegmentsCount,
}) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-earth-950/95 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="bg-white dark:bg-earth-900 w-full max-w-5xl h-[85vh] rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border-4 border-agro-900/10 flex flex-col">
        <div className="bg-agro-900 p-10 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Radio size={300} /></div>
          <div className="relative z-10 flex items-center gap-6">
            <div className="p-5 bg-white/10 rounded-[2rem] border border-white/20 shadow-2xl backdrop-blur-md">
              <Globe size={40} className="text-agro-400" />
            </div>
            <div>
              <h3 className="text-4xl font-serif font-bold tracking-tight">Global News Archive</h3>
              <p className="text-xs text-agro-300 font-black uppercase tracking-[0.4em] mt-2">Verified Satellite Intelligence • 100% Transparency</p>
            </div>
          </div>

          <div className="relative z-10 flex-1 max-w-md w-full">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-agro-300" size={20} />
              <input
                type="text"
                value={archiveSearch}
                onChange={(e) => setArchiveSearch(e.target.value)}
                placeholder="Search by region, alert type, or year..."
                className="w-full bg-white/10 border-2 border-white/10 rounded-[2.5rem] pl-14 pr-6 py-4 text-sm text-white placeholder-agro-300/50 focus:outline-none focus:border-agro-400 transition-all shadow-inner"
              />
            </div>
          </div>

          <button onClick={() => setShowArchive(false)} className="relative z-10 p-3 bg-white/5 hover:bg-white/20 rounded-full transition-all border border-white/10 hover:rotate-90">
            <X size={28} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-earth-50/30 dark:bg-earth-950/20">
          {archiveResults.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {archiveResults.map((s) => (
                <div
                  key={s.id}
                  onClick={() => handleWatchNow(s)}
                  className="bg-white dark:bg-earth-800 p-6 rounded-[3rem] border border-earth-100 dark:border-earth-700 hover:shadow-2xl transition-all group flex flex-col hover:-translate-y-1 cursor-pointer"
                >
                  <div className="relative aspect-video rounded-[2.2rem] overflow-hidden mb-6 shadow-md">
                    <img src={s.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={s.title} />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-agro-700 shadow-2xl">
                        <Play fill="currentColor" size={24} className="ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600/90 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                        {s.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 text-[9px] font-black text-agro-600 dark:text-agro-400 uppercase tracking-widest mb-3">
                      <Clock size={12} /> {s.time}
                    </div>
                    <h4 className="text-xl font-bold text-earth-900 dark:text-white group-hover:text-agro-700 transition-colors leading-tight mb-3">{s.title}</h4>
                    <p className="text-xs text-earth-500 dark:text-earth-400 font-medium leading-relaxed line-clamp-2">
                      {s.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-earth-50 dark:border-earth-700 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {s.tags.slice(0, 2).map(t => (
                        <span key={t} className="text-[8px] font-black text-earth-400 uppercase tracking-tighter border border-earth-100 px-2 py-0.5 rounded-md">{t}</span>
                      ))}
                    </div>
                    <span className="text-[10px] font-black text-agro-600 uppercase tracking-widest flex items-center gap-1.5">
                      Switch feed <MousePointer2 size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-32 text-center text-earth-300">
              <Search size={64} className="mx-auto mb-6 opacity-20" />
              <p className="text-xl font-serif italic text-earth-400">The historical lens found no results.</p>
              <button onClick={() => setArchiveSearch('')} className="mt-6 text-agro-600 font-black uppercase text-xs tracking-widest hover:underline">Reset Intelligence Stream</button>
            </div>
          )}
        </div>

        <div className="p-8 bg-earth-50 dark:bg-earth-950/50 border-t border-earth-100 dark:border-earth-800 flex items-center justify-between px-16 shrink-0">
          <div className="flex items-center gap-3">
            <Activity size={20} className="text-agro-600" />
            <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Integrated m(t) Historical Audit Path Active</p>
          </div>
          <div className="flex gap-10">
            <div className="text-right">
              <p className="text-[9px] font-black text-earth-300 uppercase tracking-widest mb-1">Archive Total</p>
              <p className="text-lg font-serif font-bold text-earth-900 dark:text-white">{newsSegmentsCount} Records</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black text-earth-300 uppercase tracking-widest mb-1">Data Depth</p>
              <p className="text-lg font-serif font-bold text-earth-900 dark:text-white">4.2 TB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
