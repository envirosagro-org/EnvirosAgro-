import React from 'react';
import { Play, Info, Calendar, Clock, User } from 'lucide-react';

interface GreenLensHeroProps {
  activeFilm: any;
  handleWatchNow: (film: any) => void;
  handleOpenDetails: (film: any) => void;
}

export const GreenLensHero: React.FC<GreenLensHeroProps> = ({ activeFilm, handleWatchNow, handleOpenDetails }) => {
  return (
    <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl mb-16 group border border-earth-100 dark:border-earth-800">
      <img 
        src={activeFilm.image} 
        className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" 
        alt={activeFilm.title} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      
      <div className="absolute top-10 left-10 flex gap-3">
        <span className="bg-agro-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
           Featured Documentary
        </span>
        <span className="bg-white/10 backdrop-blur-md text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
           {activeFilm.category}
        </span>
      </div>

      <div className="absolute bottom-12 left-12 right-12 text-white">
        <h2 className="text-5xl md:text-7xl font-serif font-black mb-6 leading-tight tracking-tight drop-shadow-2xl max-w-4xl">
           {activeFilm.title}
        </h2>
        
        <div className="flex flex-wrap items-center gap-8 mb-10 text-earth-200">
           <div className="flex items-center gap-2">
              <Calendar size={18} className="text-agro-400" />
              <span className="text-sm font-bold">{activeFilm.year}</span>
           </div>
           <div className="flex items-center gap-2">
              <Clock size={18} className="text-agro-400" />
              <span className="text-sm font-bold">{activeFilm.duration}</span>
           </div>
           <div className="flex items-center gap-2">
              <User size={18} className="text-agro-400" />
              <span className="text-sm font-bold">Directed by {activeFilm.director}</span>
           </div>
        </div>

        <p className="text-lg md:text-xl text-earth-300 max-w-2xl mb-10 font-medium leading-relaxed drop-shadow-lg">
           {activeFilm.description}
        </p>

        <div className="flex flex-wrap gap-6">
           <button 
             onClick={() => handleWatchNow(activeFilm)}
             className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-4 hover:bg-agro-50 hover:scale-105 active:scale-95 transition-all shadow-2xl"
           >
              <Play fill="currentColor" size={20} /> Start Film
           </button>
           <button 
             onClick={() => handleOpenDetails(activeFilm)}
             className="bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest border border-white/20 hover:bg-white/20 transition-all flex items-center gap-4"
           >
              <Info size={20} /> Story & Impact
           </button>
        </div>
      </div>
    </div>
  );
};
