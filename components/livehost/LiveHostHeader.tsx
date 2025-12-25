import React from 'react';
import { Radio, Users, Activity, Signal } from 'lucide-react';

export const LiveHostHeader: React.FC = () => {
  return (
    <div className="bg-red-900 rounded-[2.5rem] p-8 md:p-12 text-white mb-10 relative overflow-hidden shadow-xl border-4 border-red-950/20">
      <div className="absolute top-0 right-0 p-6 opacity-10 transform scale-125 pointer-events-none">
        <Radio size={200} />
      </div>
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-red-300 font-black uppercase tracking-[0.2em] text-[9px] mb-4">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span> Live Studio
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-[1] tracking-tighter">Network <br/><span className="text-red-400 italic">Live Host</span></h2>
          <p className="text-red-100 text-lg max-w-2xl leading-relaxed font-medium opacity-90">
            Direct secure uplink to global studios. Participate in real-time briefings, expert AMAs, and planetary health monitoring.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4">
             <div className="p-2 bg-red-600 rounded-lg">
                <Signal size={20} />
             </div>
             <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-red-200 block">Status</span>
                <span className="text-xl font-bold uppercase tracking-tight">On-Air</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
