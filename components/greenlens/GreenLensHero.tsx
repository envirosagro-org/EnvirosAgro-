import React from 'react';
import { PlayCircle, Info } from 'lucide-react';

export const GreenLensHero = ({ activeFilm, handleWatchNow, handleOpenDetails }: any) => {
  return (
    <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl mb-12 bg-black">
      <img src={activeFilm.image} alt={activeFilm.title} className="absolute inset-0 w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20"></div>

      <div className="relative z-10 flex flex-col justify-end h-full p-12 text-white">
        <div className="max-w-2xl">
          <p className="text-sm font-black uppercase tracking-widest text-green-400">Featured Documentary</p>
          <h1 className="text-6xl font-black leading-tight my-4">{activeFilm.title}</h1>
          <p className="text-lg text-gray-300 mb-8">{activeFilm.description}</p>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleWatchNow(activeFilm)}
              className="px-8 py-4 bg-green-500 text-white rounded-full font-bold text-lg flex items-center gap-2 hover:bg-green-600 transition-all shadow-lg active:scale-95"
            >
              <PlayCircle size={24} />
              Watch Now
            </button>
            <button 
              onClick={() => handleOpenDetails(activeFilm)}
              className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-bold text-lg flex items-center gap-2 hover:bg-white/20 transition-all active:scale-95"
            >
              <Info size={24} />
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};