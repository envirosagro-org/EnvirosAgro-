import React from 'react';
import { Award, Users, Map, Heart } from 'lucide-react';

export const GreenLensStats: React.FC = () => {
  const stats = [
    { label: 'Films Produced', value: '24', icon: <Map className="text-green-500" /> },
    { label: 'Awards Won', value: '12', icon: <Award className="text-amber-500" /> },
    { label: 'Viewers Reached', value: '2.4M', icon: <Users className="text-blue-500" /> },
    { label: 'Impact Score', value: '98%', icon: <Heart className="text-rose-500" /> },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-8 rounded-[2.5rem] shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
          <div className="w-16 h-16 bg-earth-50 dark:bg-earth-800 rounded-2xl flex items-center justify-center text-earth-400 group-hover:scale-110 transition-transform shadow-inner">
            {React.cloneElement(stat.icon as React.ReactElement, { size: 32 })}
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-earth-400 block mb-1">{stat.label}</span>
            <span className="text-3xl font-black text-earth-900 dark:text-white leading-none">{stat.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
