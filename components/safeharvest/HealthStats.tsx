import React from 'react';
import { Microscope, ShieldCheck, Activity } from 'lucide-react';

const stats = [
  { label: 'Global Contamination Risk', value: '1.8%', icon: <Microscope size={24} /> },
  { label: 'Proactive Defense Coverage', value: '72%', icon: <ShieldCheck size={24} /> },
  { label: 'Avg. Response Time', value: '4h', icon: <Activity size={24} /> },
];

export const HealthStats: React.FC = () => {
  return (
    <div className="bg-white dark:bg-earth-900 p-6 rounded-[2rem] border border-earth-100 dark:border-earth-800 shadow-sm">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-earth-400 mb-6 flex items-center gap-3">
            <Activity size={18} className="text-red-500" /> Health & Risk Summary
        </h3>
        <div className="space-y-5">
            {stats.map((stat, i) => (
                <div key={i} className="flex items-start gap-4">
                    <div className="p-2 bg-red-50 dark:bg-red-900/30 text-red-600 rounded-lg">
                        {stat.icon}
                    </div>
                    <div>
                        <p className="font-bold text-earth-800 dark:text-earth-200 text-sm leading-tight">{stat.label}</p>
                        <p className="font-mono text-xl font-black text-red-500 mt-1">{stat.value}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};