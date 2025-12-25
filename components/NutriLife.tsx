import React from 'react';
import { NutriLifeHeader } from './nutrilife/NutriLifeHeader';
import { SoilToHealth } from './nutrilife/SoilToHealth';

export const NutriLife: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <NutriLifeHeader />
      
      <div className="mb-20">
        <h2 className="text-3xl font-serif font-black text-earth-900 dark:text-white mb-8 border-l-4 border-rose-600 pl-6">The Pathway to Wellness</h2>
        <SoilToHealth />
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-24">
        <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-10 rounded-[3rem] shadow-sm">
          <h3 className="text-2xl font-bold text-earth-900 dark:text-white mb-6">Regional Nutrient Map</h3>
          <div className="aspect-square bg-earth-50 dark:bg-earth-800 rounded-[2rem] flex items-center justify-center relative overflow-hidden">
             <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800" className="w-full h-full object-cover opacity-50" />
             <div className="absolute inset-0 bg-rose-500/10 backdrop-blur-[2px]"></div>
             <span className="relative z-10 text-[10px] font-black uppercase tracking-widest text-rose-800 dark:text-rose-200 bg-white/80 dark:bg-earth-900/80 px-4 py-2 rounded-full border border-rose-200 shadow-xl">
                High Density Cluster: Alpha-9
             </span>
          </div>
        </div>

        <div className="space-y-8">
           <h3 className="text-2xl font-bold text-earth-900 dark:text-white">Wellness Intelligence</h3>
           {[
              { title: 'Vitamin C in Heirloom Tomatoes', val: '+42%', desc: 'Comparative study with conventional varieties.' },
              { title: 'Selenium Bio-availability', val: '+18%', desc: 'Impact of regenerative microbial inoculation.' },
              { title: 'Omega-3 Ratio in Pasture Dairy', val: 'Optimal', desc: 'Direct result of multispecies forage systems.' }
           ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-8 rounded-[2rem] flex items-center justify-between group hover:border-rose-500/30 transition-all shadow-sm">
                 <div>
                    <h4 className="font-bold text-earth-900 dark:text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-earth-500 dark:text-earth-400">{item.desc}</p>
                 </div>
                 <span className="text-2xl font-black text-rose-600 group-hover:scale-110 transition-transform">{item.val}</span>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};
