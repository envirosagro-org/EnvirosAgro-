import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const HealthStats: React.FC = () => {
  const stats = [
    { label: 'Active Alerts', value: '12', status: 'High', color: 'text-red-600' },
    { label: 'Nodes Syncing', value: '4,842', status: 'Optimal', color: 'text-green-600' },
    { label: 'Response Units', value: '184', status: 'Mobilized', color: 'text-blue-600' },
    { label: 'Defense Protocol', value: 'v4.2', status: 'Active', color: 'text-slate-900 dark:text-white' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-5 rounded-3xl shadow-sm">
           <span className="text-[9px] font-black uppercase tracking-widest text-earth-400 block mb-2">{stat.label}</span>
           <div className="flex items-end justify-between">
              <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
              <span className="text-[8px] font-bold text-earth-400 bg-earth-50 dark:bg-earth-800 px-2 py-0.5 rounded-full uppercase tracking-tighter">{stat.status}</span>
           </div>
        </div>
      ))}
    </div>
  );
};
