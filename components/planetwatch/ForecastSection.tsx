import React from 'react';
import { Cloud, Sun, Droplets, Thermometer, Wind, Zap } from 'lucide-react';

export const ForecastSection: React.FC = () => {
  const days = [
    { day: 'Mon', temp: '28°C', icon: <Sun className="text-yellow-500" />, status: 'Sunny' },
    { day: 'Tue', temp: '26°C', icon: <Cloud className="text-slate-400" />, status: 'Cloudy' },
    { day: 'Wed', temp: '22°C', icon: <Droplets className="text-blue-500" />, status: 'Rain' },
    { day: 'Thu', temp: '24°C', icon: <Sun className="text-yellow-500" />, status: 'Partly Cloudy' },
    { day: 'Fri', temp: '29°C', icon: <Zap className="text-amber-500" />, status: 'Storm' },
  ];

  return (
    <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-[3rem] p-10 shadow-sm mb-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-2xl font-bold text-earth-900 dark:text-white">Regional Climate Forecast</h3>
          <p className="text-earth-500 dark:text-earth-400 text-sm mt-1">72-hour predictive modeling for agricultural planning.</p>
        </div>
        <button className="text-[10px] font-black uppercase tracking-widest text-agro-600 dark:text-agro-400 bg-agro-50 dark:bg-agro-900/20 px-6 py-3 rounded-xl hover:bg-agro-100 transition-colors">
          Download Dataset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {days.map((d, i) => (
          <div key={i} className="bg-earth-50 dark:bg-earth-800/50 p-6 rounded-[2rem] border border-transparent hover:border-agro-500/20 transition-all text-center group">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-earth-400 mb-4 block group-hover:text-agro-600 transition-colors">{d.day}</span>
            <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform">
              {React.cloneElement(d.icon as React.ReactElement, { size: 40 })}
            </div>
            <span className="text-2xl font-bold text-earth-900 dark:text-white block mb-1">{d.temp}</span>
            <span className="text-[10px] font-bold text-earth-500 uppercase tracking-widest">{d.status}</span>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-agro-50/50 dark:bg-agro-900/10 p-8 rounded-[2rem] border border-agro-100 dark:border-agro-800/50">
          <div className="flex items-center gap-4 mb-6">
             <div className="p-3 bg-white dark:bg-earth-900 rounded-xl shadow-sm text-agro-600">
               <Wind size={20} />
             </div>
             <div>
               <h4 className="font-bold text-earth-900 dark:text-white">Wind Patterns</h4>
               <p className="text-xs text-earth-500">Predicted velocity shifts in Northern quadrants.</p>
             </div>
          </div>
          <div className="h-2 bg-earth-200 dark:bg-earth-800 rounded-full overflow-hidden">
            <div className="h-full bg-agro-600 w-3/4 rounded-full"></div>
          </div>
          <div className="flex justify-between mt-3">
             <span className="text-[10px] font-bold text-earth-400">Current: 12km/h</span>
             <span className="text-[10px] font-bold text-agro-600">Peak: 24km/h</span>
          </div>
        </div>

        <div className="bg-blue-50/50 dark:bg-blue-900/10 p-8 rounded-[2rem] border border-blue-100 dark:border-blue-800/50">
          <div className="flex items-center gap-4 mb-6">
             <div className="p-3 bg-white dark:bg-earth-900 rounded-xl shadow-sm text-blue-600">
               <CloudRain size={20} />
             </div>
             <div>
               <h4 className="font-bold text-earth-900 dark:text-white">Rain Probability</h4>
               <p className="text-xs text-earth-500">Projected accumulation for the next 48 hours.</p>
             </div>
          </div>
          <div className="h-2 bg-earth-200 dark:bg-earth-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 w-1/2 rounded-full"></div>
          </div>
          <div className="flex justify-between mt-3">
             <span className="text-[10px] font-bold text-earth-400">Current: 2mm</span>
             <span className="text-[10px] font-bold text-blue-600">Target: 15mm</span>
          </div>
        </div>
      </div>
    </div>
  );
};
