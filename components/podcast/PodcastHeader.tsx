import React from 'react';
import { Mic, Headphones, Radio, Share2 } from 'lucide-react';

export const PodcastHeader: React.FC = () => {
  return (
    <div className="bg-orange-900 rounded-[2.5rem] p-8 md:p-12 text-white mb-10 relative overflow-hidden shadow-xl border-4 border-orange-950/20">
      <div className="absolute top-0 right-0 p-6 opacity-10 transform scale-125 pointer-events-none">
        <Mic size={200} />
      </div>
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-orange-300 font-black uppercase tracking-[0.2em] text-[9px] mb-4">
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></span> Social Ag Network
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-[1] tracking-tighter">AgroCulture <br/><span className="text-orange-400 italic">Podcast</span></h2>
          <p className="text-orange-100 text-lg max-w-2xl leading-relaxed font-medium opacity-90">
            Voices from the field, indigenous narratives, and deep-dives into the cultural dimensions of sustainable agriculture.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4">
             <div className="p-2 bg-orange-600 rounded-lg">
                <Headphones size={20} />
             </div>
             <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-orange-200 block">Episodes</span>
                <span className="text-xl font-bold">142</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
