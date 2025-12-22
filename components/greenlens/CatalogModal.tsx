import React from 'react';
import { Film, PlayCircle, Search, X, Play, Star, ChevronRight, Activity } from 'lucide-react';

interface CatalogModalProps {
  catalogSearch: string;
  setCatalogSearch: (search: string) => void;
  setShowFullCatalog: (show: boolean) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  categories: string[];
  filteredCatalog: any[];
  handleOpenDetails: (film: any) => void;
  handleWatchNow: (film: any) => void;
}

export const CatalogModal: React.FC<CatalogModalProps> = ({
  catalogSearch,
  setCatalogSearch,
  setShowFullCatalog,
  activeCategory,
  setActiveCategory,
  categories,
  filteredCatalog,
  handleOpenDetails,
  handleWatchNow,
}) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-earth-950/95 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="bg-white dark:bg-earth-900 w-full max-w-6xl h-[85vh] rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-white/10 flex flex-col">
        {/* Catalog Header */}
        <div className="bg-green-900 p-10 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Film size={300} /></div>
          <div className="relative z-10 flex items-center gap-6">
            <div className="p-5 bg-white/10 rounded-[2rem] border border-white/20 shadow-2xl backdrop-blur-md text-green-400">
              <PlayCircle size={40} />
            </div>
            <div>
              <h3 className="text-4xl font-serif font-bold tracking-tight">GreenLens Catalog</h3>
              <p className="text-xs text-green-300 font-black uppercase tracking-[0.4em] mt-2">Verified Cinematic Assets • 4K HDR Optimized</p>
            </div>
          </div>

          <div className="relative z-10 flex-1 max-w-md w-full">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-green-300" size={20} />
              <input
                type="text"
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                placeholder="Search by title, theme, or region..."
                className="w-full bg-white/10 border-2 border-white/10 rounded-[2.5rem] pl-14 pr-6 py-4 text-sm text-white placeholder-green-300/50 focus:outline-none focus:border-green-400 transition-all shadow-inner"
              />
            </div>
          </div>

          <button onClick={() => setShowFullCatalog(false)} className="relative z-10 p-3 bg-white/5 hover:bg-white/20 rounded-full transition-all border border-white/10 hover:rotate-90">
            <X size={28} />
          </button>
        </div>

        {/* Catalog Navigation */}
        <div className="px-10 py-6 border-b border-earth-100 dark:border-earth-800 bg-earth-50 dark:bg-earth-900/50 flex gap-4 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-green-600 text-white shadow-lg' : 'bg-white dark:bg-earth-800 text-earth-500 border border-earth-100 dark:border-earth-700 hover:bg-earth-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-white dark:bg-earth-900">
          {filteredCatalog.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredCatalog.map((s) => (
                <div
                  key={s.id}
                  onClick={() => handleOpenDetails(s)}
                  className="bg-white dark:bg-earth-800 p-4 rounded-[2.5rem] border border-earth-100 dark:border-earth-700 hover:shadow-2xl transition-all group flex flex-col hover:-translate-y-1 cursor-pointer"
                >
                  <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 shadow-md">
                    <img src={s.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={s.title} />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-green-700 shadow-2xl">
                        <Play fill="currentColor" size={24} className="ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                        {s.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-[8px] font-black px-3 py-1 rounded-lg border border-white/10 uppercase tracking-widest">
                      {s.duration}
                    </div>
                  </div>

                  <div className="flex-1 px-2">
                    <div className="flex items-center gap-3 text-[9px] font-black text-green-600 dark:text-green-400 uppercase tracking-widest mb-2">
                      <Star size={10} fill="currentColor" /> Premium Original
                    </div>
                    <h4 className="text-lg font-bold text-earth-900 dark:text-white group-hover:text-green-700 transition-colors leading-tight mb-3 line-clamp-2">{s.title}</h4>
                    <p className="text-xs text-earth-500 dark:text-earth-400 font-medium leading-relaxed line-clamp-2">
                      {s.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-earth-50 dark:border-earth-700 flex items-center justify-between px-2">
                    <span className="text-[10px] font-black text-earth-400 uppercase tracking-widest">{s.year}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleWatchNow(s); }}
                      className="text-[10px] font-black text-green-600 uppercase tracking-widest flex items-center gap-1.5 group-hover:gap-3 transition-all"
                    >
                      Watch Now <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-32 text-center text-earth-300">
              <Film size={64} className="mx-auto mb-6 opacity-20" />
              <p className="text-xl font-serif italic text-earth-400">The vault is quiet. No documentaries match your search.</p>
              <button onClick={() => { setCatalogSearch(''); setActiveCategory('All'); }} className="mt-6 text-green-600 font-black uppercase text-xs tracking-widest hover:underline">Reset Catalog View</button>
            </div>
          )}
        </div>

        {/* Catalog Footer */}
        <div className="p-8 bg-earth-50 dark:bg-earth-950/50 border-t border-earth-100 dark:border-earth-800 flex items-center justify-between px-16 shrink-0">
          <div className="flex items-center gap-3">
            <Activity size={20} className="text-green-600" />
            <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Integrated m(t) Cultural Sync Protocol Active</p>
          </div>
          <div className="flex gap-10">
            <div className="text-right">
              <p className="text-[9px] font-black text-earth-300 uppercase tracking-widest mb-1">Catalog Size</p>
              <p className="text-lg font-serif font-bold text-earth-900 dark:text-white">12.5 TB</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black text-earth-300 uppercase tracking-widest mb-1">Available Titles</p>
              <p className="text-lg font-serif font-bold text-earth-900 dark:text-white">42 Films</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
