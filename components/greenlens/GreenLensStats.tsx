import React from 'react';
import { Users, Globe, Film, Award } from 'lucide-react';

const stats = [
  {
    value: "2M+",
    label: "Global Viewers",
    icon: <Users size={32} />
  },
  {
    value: "15",
    label: "Countries Featured",
    icon: <Globe size={32} />
  },
  {
    value: "50+",
    label: "Impact Stories Told",
    icon: <Film size={32} />
  },
  {
    value: "12",
    label: "International Awards",
    icon: <Award size={32} />
  },
];

export const GreenLensStats = () => {
  return (
    <div className="bg-white/5 dark:bg-gray-800/20 rounded-3xl border border-white/10 shadow-lg mb-20 backdrop-blur-md">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
        {stats.map((stat, index) => (
          <div key={index} className="py-10 px-6 text-center text-white">
            <div className="flex justify-center text-green-400 mb-4">{stat.icon}</div>
            <p className="text-4xl font-bold tracking-tighter">{stat.value}</p>
            <p className="text-sm uppercase text-gray-400 font-semibold tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};