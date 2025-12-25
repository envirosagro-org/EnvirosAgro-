import React from 'react';
import { Activity, Droplets, Sun, Wind, CloudRain, Zap } from 'lucide-react';

export const PlanetWatchStats: React.FC = () => {
  const stats = [
    { label: 'Soil Moisture', value: '42%', change: '-3%', trend: 'down', icon: <Droplets className="text-blue-500" /> },
    { label: 'UV Index', value: '8.2', change: '+1.5', trend: 'up', icon: <Sun className="text-amber-500" /> },
    { label: 'Air Quality', value: 'AQI 34', change: 'Good', trend: 'stable', icon: <Wind className="text-green-500" /> },
    { label: 'Precipitation', value: '12mm', change: '+2mm', trend: 'up', icon: <CloudRain className="text-sky-500" /> },
    { label: 'Solar Output', value: '4.8kW', change: '-0.2', trend: 'down', icon: <Zap className="text-yellow-500" /> },
    { label: 'Biodiversity', value: '92.4', change: '+0.1', trend: 'up', icon: <Activity className="text-purple-500" /> },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-5 rounded-3xl shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-earth-50 dark:bg-earth-800 rounded-xl">
              {stat.icon}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-earth-400">{stat.label}</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-xl font-bold text-earth-900 dark:text-white">{stat.value}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              stat.trend === 'up' ? 'bg-green-100 text-green-700' : 
              stat.trend === 'down' ? 'bg-red-100 text-red-700' : 
              'bg-blue-100 text-blue-700'
            }`}>
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
