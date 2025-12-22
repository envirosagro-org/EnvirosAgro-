import React from 'react';
import { Mic, History, Search, X, Play, Calendar, User, ExternalLink, Sparkles } from 'lucide-react';

interface PodcastArchiveModalProps {
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredEpisodes: any[];
  onSelectEpisode: (ep: any) => void;
  totalEpisodes: number;
}

export const PodcastArchiveModal: React.FC<PodcastArchiveModalProps> = ({
  onClose,
  searchQuery,
  setSearchQuery,
  filteredEpisodes,
  onSelectEpisode,
  totalEpisodes,
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-earth-950/95 backdrop-blur-2xl animate-in fade-in duration-500 overflow-hidden">
      <div className="w-full max-w-5xl h-[85vh] bg-white dark:bg-earth-900 rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border-4 border-agro-900/10 flex flex-col">
        {/* Modal Header */}
        <div className="bg-agro-900 p-10 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Mic size={300} /></div>
          <div className="relative z-10 flex items-center gap-6">
            <div className="p-5 bg-white/10 rounded-[2rem] border border-white/20 shadow-2xl backdrop-blur-md">
              <History size={40} className="text-agro-300" />
            </div>
            <div>
              <h3 className="text-4xl font-serif font-bold tracking-tight">AgroCulture Archive</h3>
              <p className="text-xs text-agro-300 font-black uppercase tracking-[0.4em] mt-2">Verified Oral Intelligence • Data Sovereignty Enabled</p>
            </div>
          </div>

          <div className="relative z-10 flex-1 max-w-md w-full">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-agro-300" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Explore Global Agro-Discussions..."
                className="w-full bg-white/10 border-2 border-earth-200 dark:border-earth-700 rounded-full pl-14 pr-6 py-3 text-sm text-white placeholder-agro-300/50 focus:outline-none focus:border-agro-500 transition-all"
              />
            </div>
          </div>

          <button onClick={onClose} className="relative z-10 p-3 bg-white/5 hover:bg-white/20 rounded-full transition-all border border-white/10 hover:rotate-90">
            <X size={28} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] dark:bg-none">
          {filteredEpisodes.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEpisodes.map((ep) => (
                <div
                  key={ep.id}
                  onClick={() => onSelectEpisode(ep)}
                  className="bg-white dark:bg-earth-800 p-6 rounded-[3rem] border border-earth-100 dark:border-earth-700 hover:shadow-2xl transition-all group flex flex-col hover:-translate-y-1 cursor-pointer"
                >
                  <div className="relative h-48 rounded-[2rem] overflow-hidden mb-6 shadow-lg">
                    <img src={ep.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={ep.title} />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-agro-700 shadow-2xl">
                        <Play fill="currentColor" size={24} className="ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-agro-600/90 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                        {ep.tags[0]}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-[9px] font-black px-3 py-1 rounded-lg border border-white/10 uppercase tracking-widest">
                      {ep.duration}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 text-[9px] font-black text-agro-600 uppercase tracking-[0.2em] mb-3">
                      <Calendar size={12} /> {ep.date}
                    </div>
                    <h4 className="text-xl font-bold text-earth-900 dark:text-white group-hover:text-agro-700 transition-colors leading-tight mb-3">{ep.title}</h4>
                    <p className="text-xs text-earth-500 dark:text-earth-400 font-medium leading-relaxed line-clamp-2 mb-6">
                      {ep.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-earth-50 dark:border-earth-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-earth-50 dark:bg-earth-900 flex items-center justify-center text-earth-400 group-hover:text-agro-600">
                        <User size={16} />
                      </div>
                      <span className="text-[10px] font-bold text-earth-600 dark:text-earth-300 uppercase tracking-wider">{ep.host}</span>
                    </div>
                    <button className="text-earth-300 group-hover:text-agro-600 transition-colors">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-32 text-center text-earth-300">
              <Search size={64} className="mx-auto mb-6 opacity-20" />
              <p className="text-xl font-serif italic text-earth-400">The echoes are distant. No episodes match your criteria.</p>
              <button onClick={() => setSearchQuery('')} className="mt-6 text-agro-600 font-black uppercase text-xs tracking-widest hover:underline">Reset Data Stream</button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-8 bg-earth-50 dark:bg-earth-950/50 border-t border-earth-100 dark:border-earth-800 flex items-center justify-between px-16 shrink-0">
          <div className="flex items-center gap-3">
            <Sparkles size={20} className="text-agro-600" />
            <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Integrated m(t) Cultural Sync Protocol Active</p>
          </div>
          <div className="flex gap-10">
            <div className="text-right">
              <p className="text-[9px] font-black text-earth-300 uppercase tracking-widest mb-1">Archive Total</p>
              <p className="text-lg font-serif font-bold text-earth-900 dark:text-white">{totalEpisodes} Records</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black text-earth-300 uppercase tracking-widest mb-1">Listening Time</p>
              <p className="text-lg font-serif font-bold text-earth-900 dark:text-white">4.2 Hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
