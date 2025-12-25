import React from 'react';
import { Globe, Thermometer, Wind, AlertTriangle, ShieldCheck } from 'lucide-react';

export const PlanetWatchHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
      <div className="flex items-center gap-6">
        <div className="bg-agro-100 dark:bg-agro-900/30 p-5 rounded-[2rem] text-agro-600 dark:text-agro-400 shadow-inner">
          <Globe size={48} strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-black text-earth-900 dark:text-white leading-none tracking-tight">Planet Watch</h1>
          <p className="text-earth-500 dark:text-earth-400 text-sm md:text-base mt-3 font-medium max-w-md">
            Global environmental intelligence, real-time climate monitoring, and planetary health forensics.
          </p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-center md:justify-end">
        <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-4 rounded-[1.5rem] shadow-sm flex items-center gap-4 transition-all hover:border-red-500/20 group">
          <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
            <Thermometer size={20} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-earth-400 block">Global Temp</span>
            <span className="text-lg font-mono font-bold text-red-600">+1.24°C</span>
          </div>
        </div>

        <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-4 rounded-[1.5rem] shadow-sm flex items-center gap-4 transition-all hover:border-blue-500/20 group">
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
            <Wind size={20} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-earth-400 block">CO2 Level</span>
            <span className="text-lg font-mono font-bold text-blue-600">421.5 ppm</span>
          </div>
        </div>

        <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-4 rounded-[1.5rem] shadow-sm flex items-center gap-4 transition-all hover:border-amber-500/20 group">
          <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
            <AlertTriangle size={20} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-earth-400 block">Risk Index</span>
            <span className="text-lg font-mono font-bold text-amber-600">High</span>
          </div>
        </div>
      </div>
    </div>
  );
};
