import React from 'react';
import { Play, Mic, FileText } from 'lucide-react';

interface MediaHeroProps {
  activeMedia: any;
  handlePlayNow: (media: any) => void;
}

export const MediaHero: React.FC<MediaHeroProps> = ({ activeMedia, handlePlayNow }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'audio':
        return <Mic size={20} />;
      case 'article':
        return <FileText size={20} />;
      default:
        return <Play size={20} />;
    }
  };

  return (
    <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl mb-16 group border border-earth-100 dark:border-earth-800">
      <img 
        src={activeMedia.image} 
        className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" 
        alt={activeMedia.title} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      
      <div className="absolute top-10 left-10 flex gap-3">
        <span className="bg-agro-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
           Featured Media
        </span>
      </div>

      <div className="absolute bottom-12 left-12 right-12 text-white">
        <h2 className="text-5xl md:text-6xl font-serif font-black mb-6 leading-tight tracking-tight drop-shadow-2xl max-w-4xl">
           {activeMedia.title}
        </h2>
        
        <p className="text-lg md:text-xl text-earth-300 max-w-2xl mb-10 font-medium leading-relaxed drop-shadow-lg">
           {activeMedia.description}
        </p>

        <div className="flex flex-wrap gap-6">
           <button 
             onClick={() => handlePlayNow(activeMedia)}
             className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-4 hover:bg-agro-50 hover:scale-105 active:scale-95 transition-all shadow-2xl"
           >
              {getIcon(activeMedia.type)} Start Media
           </button>
        </div>
      </div>
    </div>
  );
};
