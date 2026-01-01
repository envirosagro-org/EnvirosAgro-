import React from 'react';
import { NutriLifeHeader } from './nutrilife/NutriLifeHeader';
import { SoilToHealth } from './nutrilife/SoilToHealth';
import { NutrientTracker } from './nutrilife/NutrientTracker';
import { ArrowLeft, Heart, Sprout, ShieldCheck, Zap } from 'lucide-react';
import { View } from '../types';

interface NutriLifeProps {
    onNavigate?: (view: View) => void;
}

export const NutriLife: React.FC<NutriLifeProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12 animate-in fade-in duration-700 bg-white dark:bg-earth-950 transition-colors duration-500 min-h-screen">
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-10">
        <button 
          onClick={() => onNavigate?.(View.HOME)}
          className="flex items-center gap-2 text-earth-400 hover:text-rose-600 font-black text-[10px] uppercase tracking-widest transition-all group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Home
        </button>
      </div>

      <NutriLifeHeader />
      
      <div className="mt-16 mb-24">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
                <div className="ea-label-meta mb-4 text-rose-500">Biological Resilience Tracking</div>
                <h2 className="text-5xl lg:text-7xl font-serif font-black text-earth-900 dark:text-white leading-none tracking-tighter">
                    Nutri<span className="text-rose-600 italic">Life</span> Portal
                </h2>
                <p className="text-xl text-earth-500 dark:text-earth-400 mt-6 font-medium">
                    Tracking the horizontal path from soil integrity to community wellness using the m(t) biological constant.
                </p>
            </div>
            <div className="flex gap-4">
                <div className="bg-earth-50 dark:bg-earth-900 px-6 py-4 rounded-2xl border border-earth-100 dark:border-earth-800 flex items-center gap-4 shadow-sm">
                    <div className="p-3 bg-rose-50 dark:bg-rose-900/30 text-rose-600 rounded-xl">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase text-earth-400 block">System Status</span>
                        <span className="text-sm font-bold text-earth-900 dark:text-white tracking-tight uppercase">Health Node Nominal</span>
                    </div>
                </div>
            </div>
        </div>

        <NutrientTracker />
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-32">
        <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-12 rounded-[3.5rem] shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 -rotate-12 transition-transform duration-[10s] group-hover:rotate-0"><Heart size={250} /></div>
            <h3 className="text-3xl font-serif font-black text-earth-900 dark:text-white mb-8 border-l-4 border-rose-600 pl-6">Regional Nutrient Density</h3>
            <div className="aspect-video bg-earth-50 dark:bg-earth-800 rounded-[2rem] flex items-center justify-center relative overflow-hidden border border-earth-100 dark:border-earth-800">
                <img 
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200" 
                    className="w-full h-full object-cover opacity-20" 
                    alt="Map"
                />
                <div className="absolute inset-0 bg-rose-500/5 backdrop-blur-[1px]"></div>
                {[
                    { top: '30%', left: '40%' },
                    { top: '60%', left: '20%' },
                    { top: '45%', left: '70%' }
                ].map((pos, i) => (
                    <div key={i} className="absolute w-4 h-4 bg-rose-500 rounded-full animate-ping" style={pos}></div>
                ))}
                <span className="absolute bottom-6 left-6 right-6 z-10 text-[10px] font-black uppercase tracking-[0.3em] text-rose-800 dark:text-rose-200 bg-white/90 dark:bg-earth-900/90 py-4 text-center rounded-2xl border border-rose-100 dark:border-rose-800 shadow-2xl backdrop-blur-md">
                    Live Density Monitoring: Cluster Alpha-9 Active
                </span>
            </div>
        </div>

        <div className="space-y-8 flex flex-col justify-center">
           <h3 className="text-3xl font-serif font-black text-earth-900 dark:text-white mb-4">Wellness Intelligence</h3>
           {[
              { title: 'Vitamin C in Heirloom Varieties', val: '+42%', desc: 'Comparative study with industrial conventional seeds.', color: 'text-rose-600', icon: <Sprout size={20}/> },
              { title: 'Selenium Bio-availability', val: '+18%', desc: 'Result of regenerative microbial soil inoculation.', color: 'text-blue-600', icon: <Zap size={20}/> },
              { title: 'Omega-3 in Pasture Dairy', val: 'Optimal', desc: 'Direct correlation with multispecies forage systems.', color: 'text-agro-600', icon: <ShieldCheck size={20}/> }
           ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-8 rounded-[2.5rem] flex items-center justify-between group hover:shadow-xl transition-all shadow-sm">
                 <div className="flex items-center gap-6">
                    <div className="p-4 bg-earth-50 dark:bg-earth-800 rounded-2xl text-earth-400 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <div>
                        <h4 className="font-bold text-earth-900 dark:text-white text-lg mb-1">{item.title}</h4>
                        <p className="text-sm text-earth-500 dark:text-earth-400 font-medium">{item.desc}</p>
                    </div>
                 </div>
                 <span className={`text-3xl font-black ${item.color} group-hover:scale-110 transition-transform`}>{item.val}</span>
              </div>
           ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-serif font-black text-earth-900 dark:text-white mb-12 border-l-4 border-rose-600 pl-6">Biological Path Logic</h2>
        <SoilToHealth />
      </div>
    </div>
  );
};
