import React from 'react';
import { PlayCircle, Clock, Heart, Share2 } from 'lucide-react';

interface FilmStripProps {
  docs: any[];
  onSelect: (doc: any) => void;
  title: string;
}

export const FilmStrip: React.FC<FilmStripProps> = ({ docs, onSelect, title }) => {
  return (
    <div className="mb-20">
      <div className="flex items-center justify-between mb-8 px-2">
        <h3 className="text-2xl font-black text-earth-900 dark:text-white uppercase tracking-tight">{title}</h3>
        <button className="text-[10px] font-black uppercase tracking-widest text-agro-600 dark:text-agro-400 hover:underline">
          View Collection
        </button>
      </div>
      
      <div className="flex gap-8 overflow-x-auto pb-8 no-scrollbar -mx-2 px-2">
        {docs.map((doc) => (
          <div 
            key={doc.id} 
            className="flex-shrink-0 w-[350px] group cursor-pointer"
            onClick={() => onSelect(doc)}
          >
            <div className="relative h-52 rounded-[2rem] overflow-hidden mb-5 border border-earth-100 dark:border-earth-800 shadow-sm group-hover:shadow-xl transition-all group-hover:-translate-y-2">
              <img src={doc.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={doc.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
                 <div className="bg-white text-black p-3 rounded-xl shadow-lg">
                    <PlayCircle size={20} fill="currentColor" />
                 </div>
                 <div className="flex gap-2">
                    <button className="bg-white/20 backdrop-blur-md p-3 rounded-xl text-white hover:bg-white/40 transition-colors">
                       <Heart size={16} />
                    </button>
                    <button className="bg-white/20 backdrop-blur-md p-3 rounded-xl text-white hover:bg-white/40 transition-colors">
                       <Share2 size={16} />
                    </button>
                 </div>
              </div>
              <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-black text-white uppercase tracking-widest border border-white/10">
                 {doc.duration}
              </div>
            </div>
            
            <div className="px-2">
              <span className="text-[10px] font-black text-agro-600 uppercase tracking-widest mb-2 block">{doc.category}</span>
              <h4 className="text-lg font-bold text-earth-900 dark:text-white mb-2 leading-tight group-hover:text-agro-600 transition-colors">{doc.title}</h4>
              <p className="text-xs text-earth-500 dark:text-earth-400 line-clamp-2 font-medium">{doc.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
