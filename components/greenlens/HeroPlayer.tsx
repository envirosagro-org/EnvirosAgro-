import React from 'react';
import { Play, Pause, X, Wifi, Volume2, Settings, Maximize, Info, Heart } from 'lucide-react';

interface HeroPlayerProps {
  isWatching: boolean;
  activeFilm: any;
  isPaused: boolean;
  progress: number;
  setIsWatching: (watching: boolean) => void;
  setIsPaused: (paused: boolean) => void;
  handleWatchNow: () => void;
  handleOpenDetails: (film: any) => void;
}

export const HeroPlayer: React.FC<HeroPlayerProps> = ({
  isWatching,
  activeFilm,
  isPaused,
  progress,
  setIsWatching,
  setIsPaused,
  handleWatchNow,
  handleOpenDetails,
}) => {
  return (
    <div className="relative rounded-[3rem] overflow-hidden shadow-2xl mb-16 aspect-[21/9] group bg-black border border-earth-100 dark:border-earth-800">
      {isWatching ? (
        <div className="absolute inset-0 flex flex-col bg-slate-950">
          <img
            src={activeFilm.image}
            className={`w-full h-full object-cover transition-all duration-1000 ${isPaused ? 'opacity-30 blur-md scale-110' : 'opacity-60'}`}
            alt="Cinema Feed"
          />

          {/* HUD Overlays */}
          <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between items-start">
              <div className="bg-green-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg border border-green-500/50">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> CINEMATIC STREAM
              </div>
              <button
                onClick={() => setIsWatching(false)}
                className="bg-black/40 hover:bg-white/10 backdrop-blur-md text-white p-2 rounded-full border border-white/10 transition-all pointer-events-auto"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col items-center gap-4">
              {isPaused && (
                <button
                  onClick={() => setIsPaused(false)}
                  className="pointer-events-auto w-24 h-24 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20 flex items-center justify-center text-white hover:scale-110 transition-all shadow-2xl animate-in zoom-in"
                >
                  <Play size={40} fill="currentColor" className="ml-2" />
                </button>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="w-full max-w-4xl mx-auto bg-black/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10 pointer-events-auto shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-6">
                  <button onClick={() => setIsPaused(!isPaused)} className="text-white hover:text-green-400 transition-colors">
                    {isPaused ? <Play size={24} fill="currentColor" /> : <Pause size={24} fill="currentColor" />}
                  </button>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-none">{activeFilm.title}</h4>
                    <p className="text-[10px] text-green-400 font-black uppercase tracking-widest mt-1">HD • {activeFilm.category} Documentary</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Volume2 size={20} className="text-slate-400 hover:text-white transition-colors cursor-pointer" />
                  <Settings size={20} className="text-slate-400 hover:text-white transition-colors cursor-pointer" />
                  <Maximize size={20} className="text-slate-400 hover:text-white transition-colors cursor-pointer" />
                </div>
              </div>

              <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden group/seek cursor-pointer">
                <div
                  className="h-full bg-green-500 relative transition-all duration-300"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-0 h-full w-2 bg-white shadow-[0_0_20px_#22c55e] opacity-0 group-hover/seek:opacity-100"></div>
                </div>
              </div>

              <div className="flex justify-between mt-3 text-[10px] font-mono text-slate-500">
                <span>{Math.floor(progress * 0.84)}:{(Math.floor(progress * 60) % 60).toString().padStart(2, '0')}</span>
                <span>{activeFilm.duration}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <img
            src={activeFilm.image}
            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[2s]"
            alt={activeFilm.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
            <div className="flex items-center gap-4 mb-4 text-sm font-medium text-green-300">
              <span className="bg-green-900/80 px-3 py-1 rounded border border-green-700">{activeFilm.category}</span>
              <span>{activeFilm.year}</span>
              <span>{activeFilm.duration}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl leading-tight tracking-tight">{activeFilm.title}</h1>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl line-clamp-2 md:line-clamp-none leading-relaxed">
              {activeFilm.description || "A powerful story of nature's resilience and the human spirit."}
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => handleWatchNow()}
                className="bg-green-600 hover:bg-green-500 text-white px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest flex items-center gap-3 transition-all shadow-xl shadow-green-900/50 hover:scale-105 active:scale-95"
              >
                <Play fill="currentColor" size={20} /> Watch Now
              </button>
              <button
                onClick={() => handleOpenDetails(activeFilm)}
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all border border-white/20 backdrop-blur-md"
              >
                <Info size={20} /> Documentary Details
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full font-bold transition-all border border-white/20 backdrop-blur-md">
                <Heart size={20} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
