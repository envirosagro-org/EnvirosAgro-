import React from 'react';
import { ShieldAlert, Bell, Phone } from 'lucide-react';

interface SafeHarvestHeaderProps {
  onSmsClick: () => void;
  onHotlineClick: () => void;
}

export const SafeHarvestHeader: React.FC<SafeHarvestHeaderProps> = ({ onSmsClick, onHotlineClick }) => {
  return (
    <div className="bg-red-900 rounded-[2.5rem] p-8 md:p-12 text-white mb-10 relative overflow-hidden shadow-xl border-4 border-red-950/20">
      <div className="absolute top-0 right-0 p-6 opacity-10 transform scale-125 pointer-events-none">
        <ShieldAlert size={200} />
      </div>
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-red-300 font-black uppercase tracking-[0.2em] text-[9px] mb-4">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-ping"></span> Health Ag Network
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-[1] tracking-tighter">SafeHarvest <br/><span className="text-red-400 italic">Alert Network</span></h2>
          <p className="text-red-100 text-lg max-w-2xl leading-relaxed font-medium opacity-90">
            Real-time threat detection and standardized emergency response for global agriculture.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button 
            onClick={onSmsClick}
            className="flex-1 md:flex-none bg-white text-red-900 px-8 py-3 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-red-50 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            <Bell size={16} /> SMS Alerts
          </button>
          <button 
            onClick={onHotlineClick}
            className="flex-1 md:flex-none bg-red-800 text-white border border-red-700/50 px-8 py-3 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Phone size={16} /> Hotline
          </button>
        </div>
      </div>
    </div>
  );
};
