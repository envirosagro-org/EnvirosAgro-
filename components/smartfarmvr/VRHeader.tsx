import React from 'react';
import { Glasses, Box, Cpu, Activity } from 'lucide-react';

export const VRHeader: React.FC = () => {
  return (
    <div className="bg-blue-900 rounded-[2.5rem] p-8 md:p-12 text-white mb-10 relative overflow-hidden shadow-xl border-4 border-blue-950/20">
      <div className="absolute top-0 right-0 p-6 opacity-10 transform scale-125 pointer-events-none">
        <Glasses size={200} />
      </div>
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-blue-300 font-black uppercase tracking-[0.2em] text-[9px] mb-4">
            <span className="w-1.5 h-1.5 bg-agro-400 rounded-full animate-pulse"></span> Technical Ag Hub
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-[1] tracking-tighter">SmartFarm <br/><span className="text-blue-400 italic">VR Training</span></h2>
          <p className="text-blue-100 text-lg max-w-2xl leading-relaxed font-medium opacity-90">
            Immersive virtual reality simulations for precision machinery training, field diagnostics, and sustainable infrastructure planning.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4">
             <div className="p-2 bg-blue-500 rounded-lg">
                <Box size={20} />
             </div>
             <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-200 block">Environments</span>
                <span className="text-xl font-bold">12 Active</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
