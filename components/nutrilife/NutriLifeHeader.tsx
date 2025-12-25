import React from 'react';
import { Heart, Activity, Salad, Info } from 'lucide-react';

export const NutriLifeHeader: React.FC = () => {
  return (
    <div className="bg-rose-900 rounded-[2.5rem] p-8 md:p-12 text-white mb-10 relative overflow-hidden shadow-xl border-4 border-rose-950/20">
      <div className="absolute top-0 right-0 p-6 opacity-10 transform scale-125 pointer-events-none">
        <Heart size={200} />
      </div>
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-rose-300 font-black uppercase tracking-[0.2em] text-[9px] mb-4">
            <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-pulse"></span> Wellness Ag Network
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-[1] tracking-tighter">NutriLife <br/><span className="text-rose-400 italic">Soil to Health</span></h2>
          <p className="text-rose-100 text-lg max-w-2xl leading-relaxed font-medium opacity-90">
            Connecting soil nutrient density directly to human wellness and nutritional security.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4">
             <div className="p-2 bg-rose-500 rounded-lg">
                <Activity size={20} />
             </div>
             <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-rose-200 block">Health Index</span>
                <span className="text-xl font-bold">94.2</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
