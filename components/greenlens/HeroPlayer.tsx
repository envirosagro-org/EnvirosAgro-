import React from 'react';
import { Play, Pause, X, Info } from 'lucide-react';
import { DOCS_LIBRARY } from './data';

export const HeroPlayer = ({
  activeFilm,
  isPaused,
  progress,
  setIsWatching,
  setIsPaused,
  handleWatchNow,
  handleOpenDetails,
}: any) => {
  const upNextDocs = DOCS_LIBRARY.filter(d => d.id !== activeFilm.id).slice(0, 3);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-grow">
        <div className="relative aspect-video rounded-2xl bg-black shadow-2xl overflow-hidden">
          <img src={activeFilm.image} alt={activeFilm.title} className="w-full h-full object-cover opacity-50" />

          <div className="absolute inset-0 flex items-center justify-center">
            <button onClick={() => setIsPaused(!isPaused)} className="text-white/80 hover:text-white transition-transform duration-300 hover:scale-110">
              {isPaused ? <Play size={96} /> : <Pause size={96} />}
            </button>
          </div>

          <div className="absolute top-6 left-6">
            <button onClick={() => setIsWatching(false)} className="bg-black/50 rounded-full p-3 text-white hover:bg-black/80 transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-4 bg-black/30">
            <div className="h-full bg-green-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="mt-6 text-white">
          <h1 className="text-4xl font-bold">{activeFilm.title}</h1>
          <p className="text-gray-400 text-lg mt-2">{activeFilm.category} &middot; {activeFilm.year} &middot; {activeFilm.duration}</p>
          <button
            onClick={() => handleOpenDetails(activeFilm)}
            className="mt-4 flex items-center gap-2 text-green-400 font-semibold hover:text-green-300 transition-colors"
          >
            <Info size={20} />
            <span>Full Synopsis & Credits</span>
          </button>
        </div>
      </div>

      <div className="lg:w-80 flex-shrink-0">
        <h3 className="text-xl font-bold text-white mb-4">Up Next</h3>
        <div className="space-y-4">
          {upNextDocs.map(doc => (
            <div
              key={doc.id}
              onClick={() => handleWatchNow(doc)}
              className="group flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
            >
              <div className="relative w-32 h-20 rounded-md overflow-hidden flex-shrink-0">
                <img src={doc.image} alt={doc.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Play size={32} className="text-white" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm leading-tight">{doc.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{doc.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};