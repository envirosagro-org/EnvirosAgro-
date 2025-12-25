import React from 'react';
import { Rocket, Calendar, MapPin, Ticket } from 'lucide-react';

export const ScaleUpHeader: React.FC = () => {
  return (
    <div className="bg-indigo-900 rounded-[2.5rem] p-8 md:p-12 text-white mb-10 relative overflow-hidden shadow-xl border-4 border-indigo-950/20">
      <div className="absolute top-0 right-0 p-6 opacity-10 transform scale-125 pointer-events-none">
        <Rocket size={200} />
      </div>
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-indigo-300 font-black uppercase tracking-[0.2em] text-[9px] mb-4">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping"></span> Global Summit 2024
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-[1] tracking-tighter">ScaleUp <br/><span className="text-indigo-400 italic">Summit</span></h2>
          <p className="text-indigo-100 text-lg max-w-2xl leading-relaxed font-medium opacity-90">
            Connecting industrial agricultural leaders, technology pioneers, and strategic investors to scale planetary restoration.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-[2rem] flex flex-col gap-4 shadow-2xl">
             <div className="flex items-center gap-4">
                <Calendar size={20} className="text-indigo-400" />
                <div>
                   <span className="text-[9px] font-black uppercase tracking-widest text-indigo-200 block">Date</span>
                   <span className="text-sm font-bold">Nov 14-16, 2024</span>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <MapPin size={20} className="text-indigo-400" />
                <div>
                   <span className="text-[9px] font-black uppercase tracking-widest text-indigo-200 block">Location</span>
                   <span className="text-sm font-bold">Nairobi Tech District</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
