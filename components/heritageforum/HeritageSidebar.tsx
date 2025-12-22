import React from 'react';
import { Users, PlusCircle, CalendarCheck, Loader2, CheckCircle2 } from 'lucide-react';

interface HeritageSidebarProps {
  rsvpStatus: 'IDLE' | 'LOADING' | 'SUCCESS';
  handleRSVP: () => void;
}

export const HeritageSidebar: React.FC<HeritageSidebarProps> = ({ rsvpStatus, handleRSVP }) => {
  return (
    <div className="space-y-8">
      <div className="bg-rose-50 dark:bg-rose-950/20 p-8 rounded-[2.5rem] border border-rose-100 dark:border-rose-900/50 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] rotate-12 group-hover:rotate-45 transition-transform duration-1000"><Users size={180} /></div>
        <h3 className="font-bold text-xl text-rose-900 dark:text-rose-100 mb-6 flex items-center gap-3 relative z-10">
          <Users size={24} className="text-rose-600" /> Community Elders
        </h3>
        <p className="text-sm text-rose-800 dark:text-rose-300 mb-8 font-medium leading-relaxed relative z-10">
          Connect with keepers of tradition who can guide you on sustainable, time-tested practices.
        </p>
        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-4 bg-white dark:bg-earth-800 p-4 rounded-2xl shadow-sm border border-rose-50 dark:border-rose-900 transition-all hover:scale-[1.02]">
            <div className="w-12 h-12 rounded-2xl bg-earth-200 overflow-hidden border-2 border-white shadow-md">
              <img src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=60" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-earth-900 dark:text-white truncate">Gogo Nyota</p>
              <p className="text-[9px] text-earth-500 font-black uppercase tracking-widest">Herbalist • 40y Exp</p>
            </div>
            <button className="bg-rose-600 text-white p-2 rounded-xl hover:bg-rose-700 transition-colors shadow-lg shadow-rose-600/20">
              <PlusCircle size={18} />
            </button>
          </div>
          <div className="flex items-center gap-4 bg-white dark:bg-earth-800 p-4 rounded-2xl shadow-sm border border-rose-50 dark:border-rose-900 transition-all hover:scale-[1.02]">
            <div className="w-12 h-12 rounded-2xl bg-earth-200 overflow-hidden border-2 border-white shadow-md">
              <img src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=100&auto=format&fit=crop&q=100" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-earth-900 dark:text-white truncate">Mzee Kiptoo</p>
              <p className="text-[9px] text-earth-500 font-black uppercase tracking-widest">Soil Guardian • 50y Exp</p>
            </div>
            <button className="bg-rose-600 text-white p-2 rounded-xl hover:bg-rose-700 transition-colors shadow-lg shadow-rose-600/20">
              <PlusCircle size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-earth-900 p-10 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm text-center relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid.png')]"></div>
        {rsvpStatus === 'SUCCESS' && (
          <div className="absolute top-4 right-4 animate-in zoom-in duration-300">
            <div className="bg-agro-500 text-white p-1 rounded-full shadow-lg">
              <CheckCircle2 size={24} />
            </div>
          </div>
        )}
        <h3 className="font-bold text-earth-900 dark:text-white mb-2 uppercase tracking-widest text-[10px]">Upcoming Gathering</h3>
        <div className="text-6xl font-serif font-bold text-rose-600 mb-2 group-hover:scale-110 transition-transform">14</div>
        <div className="text-xs font-black text-earth-400 dark:text-earth-500 uppercase tracking-[0.4em] mb-6">May 2024</div>
        <div className="bg-earth-50 dark:bg-earth-800 p-6 rounded-2xl mb-8 border border-earth-100 dark:border-earth-700">
          <p className="text-sm text-earth-900 dark:text-white font-bold leading-tight">
            Global Storytelling Night
          </p>
          <p className="text-[10px] text-rose-600 font-black uppercase tracking-widest mt-2">Theme: "Seeds of Ancestors"</p>
        </div>
        <button
          onClick={handleRSVP}
          disabled={rsvpStatus !== 'IDLE'}
          className={`w-full font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl ${
            rsvpStatus === 'IDLE'
              ? 'bg-rose-900 text-white hover:bg-rose-800 shadow-rose-900/20 active:scale-95'
              : rsvpStatus === 'LOADING'
                ? 'bg-earth-100 dark:bg-earth-800 text-earth-400 cursor-wait'
                : 'bg-agro-50 dark:bg-agro-900/30 text-agro-700 dark:text-agro-400 border border-agro-100 dark:border-agro-800 shadow-none'
            }`}
        >
          {rsvpStatus === 'IDLE' && <><CalendarCheck size={18} /> Confirm Attendance</>}
          {rsvpStatus === 'LOADING' && <><Loader2 size={18} className="animate-spin" /> Syncing Node...</>}
          {rsvpStatus === 'SUCCESS' && <><CheckCircle2 size={18} /> Calendar Secured</>}
        </button>
      </div>
    </div>
  );
};
