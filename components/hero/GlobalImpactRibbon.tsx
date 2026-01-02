import React from 'react';
import { Globe, Layers, Users, Wallet } from 'lucide-react';

const impactStats = [
  { label: "Network Nodes", value: "12,482", icon: Globe, trend: "+2.4%", color: "text-blue-500" },
  { label: "Biomass Vol", value: "2.4M Tons", icon: Layers, trend: "+12.1%", color: "text-agro-500" },
  { label: "Community Hubs", value: "840+", icon: Users, trend: "+5.8%", color: "text-rose-500" },
  { label: "Impact Assets", value: "$420M+", icon: Wallet, trend: "+18.2%", color: "text-amber-500" }
];

export const GlobalImpactRibbon: React.FC = () => {
  return (
    <div className="relative z-20 -mt-32 mb-40 px-12">
      <div className="w-full bg-white dark:bg-slate-900 rounded-[4rem] border border-white/10 shadow-cinematic-xl py-14 px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 items-center backdrop-blur-3xl relative overflow-hidden">
        {impactStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="flex items-center gap-10 group cursor-default relative z-10">
              <div className="p-6 bg-black/5 dark:bg-white/5 rounded-[2.2rem] group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 shadow-inner ring-1 ring-white/10">
                <Icon className={stat.color} />
              </div>
              <div>
                <div className="flex items-baseline gap-4">
                  <div className="text-4xl font-serif font-black text-slate-900 dark:text-white tracking-tight leading-none">{stat.value}</div>
                  <span className="text-[10px] font-black text-agro-500">{stat.trend}</span>
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2 opacity-80">{stat.label}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};