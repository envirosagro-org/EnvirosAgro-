import React from 'react';
import { NutriLifeHeader } from './nutrilife/NutriLifeHeader';
import { SoilToHealth } from './nutrilife/SoilToHealth';
import { NutrientTracker } from './nutrilife/NutrientTracker';
import { WellnessBlog } from './nutrilife/WellnessBlog';
import { 
  Dna, Heart, Activity, Microscope, 
  ChevronRight, Sparkles, ShieldCheck, 
  MapPin, Wind, Sun
} from 'lucide-react';

export const NutriLife: React.FC = () => {
  return (
    <div className="bg-white dark:bg-earth-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-700">
        <NutriLifeHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-20">
           {[
             { label: 'Nutrient Density Index', val: '8.4/10', icon: <Microscope className="text-rose-600" />, trend: '+1.2' },
             { label: 'Soil Microbial Health', val: 'Active', icon: <Dna className="text-blue-600" />, trend: 'Stable' },
             { label: 'Regional Wellness Rank', val: 'Tier 1', icon: <Heart className="text-emerald-600" />, trend: 'Top 5%' },
             { label: 'System Compliance', val: 'Verified', icon: <ShieldCheck className="text-amber-600" />, trend: '100%' }
           ].map((stat, i) => (
             <div key={i} className="bg-white dark:bg-earth-900 p-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 shadow-sm group hover:scale-[1.02] transition-all cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-125 transition-transform">
                   {React.cloneElement(stat.icon as React.ReactElement, { size: 100 })}
                </div>
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="p-3 bg-earth-50 dark:bg-earth-800 rounded-2xl group-hover:bg-rose-50 dark:group-hover:bg-rose-900/20 transition-colors">
                    {stat.icon}
                  </div>
                  <span className="text-[10px] font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 px-3 py-1 rounded-full">{stat.trend}</span>
                </div>
                <h4 className="text-earth-500 dark:text-earth-400 font-bold text-[10px] uppercase tracking-widest relative z-10">{stat.label}</h4>
                <p className="text-3xl font-black text-earth-900 dark:text-white mt-1 relative z-10">{stat.val}</p>
             </div>
           ))}
        </div>

        <div className="mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
             <div className="max-w-2xl">
                <div className="ea-label-meta mb-4 text-rose-600">Bio-Linkage Protocol</div>
                <h2 className="text-4xl lg:text-5xl font-serif font-black text-earth-900 dark:text-white leading-tight">The <span className="text-rose-600 italic">Nutrient-Pathway</span> to Human Resilience</h2>
                <p className="text-lg text-earth-500 mt-4 font-medium italic">Tracing the direct correlation between soil microbial diversity and human systemic health.</p>
             </div>
             <button className="flex items-center gap-3 bg-earth-900 text-white dark:bg-white dark:text-earth-900 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                Download Research Hub <ChevronRight size={16} />
             </button>
          </div>
          <SoilToHealth />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-10 rounded-[3rem] shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between mb-10 relative z-10">
               <div>
                  <h3 className="text-2xl font-bold text-earth-900 dark:text-white flex items-center gap-3">
                     <MapPin className="text-rose-600" /> Regional Nutrient Map
                  </h3>
                  <p className="text-xs text-earth-500 mt-1">Satellite-verified bioavailability across the sector.</p>
               </div>
               <div className="flex gap-2">
                  <span className="p-2 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-lg"><Sun size={18}/></span>
                  <span className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg"><Wind size={18}/></span>
               </div>
            </div>
            <div className="aspect-square md:aspect-video bg-earth-50 dark:bg-earth-800 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden border border-earth-100 dark:border-earth-800">
               <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800" className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000" alt="Map" />
               <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 via-transparent to-blue-500/20 backdrop-blur-[1px]"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-32 h-32 bg-rose-500/10 border-2 border-rose-500/50 rounded-full animate-ping"></div>
               </div>
               <span className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-[10px] font-black uppercase tracking-widest text-white bg-rose-600/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-rose-400/50">
                  Critical Zone Detected: Sector-G9
               </span>
            </div>
          </div>

          <div className="space-y-8">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-earth-900 dark:text-white flex items-center gap-3">
                   <Activity className="text-rose-600" /> Wellness Telemetry
                </h3>
                <span className="text-[9px] font-black text-earth-400 uppercase tracking-widest">LIVE_UPLINK</span>
             </div>
             {[
                { title: 'Vitamin C in Heirloom Tomatoes', val: '+42%', desc: 'Comparative study with conventional varieties.', color: 'text-rose-600' },
                { title: 'Selenium Bio-availability', val: '+18%', desc: 'Impact of regenerative microbial inoculation.', color: 'text-blue-600' },
                { title: 'Omega-3 Ratio in Pasture Dairy', val: '98%', desc: 'Direct result of multispecies forage systems.', color: 'text-emerald-600' }
             ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-8 rounded-[2.5rem] flex items-center justify-between group hover:border-rose-500/30 transition-all shadow-sm">
                   <div>
                      <h4 className="font-bold text-earth-900 dark:text-white mb-1 group-hover:text-rose-600 transition-colors">{item.title}</h4>
                      <p className="text-xs text-earth-500 dark:text-earth-400 italic">{item.desc}</p>
                   </div>
                   <div className="text-right">
                      <span className={`text-3xl font-black ${item.color} group-hover:scale-110 transition-transform block`}>{item.val}</span>
                      <span className="text-[8px] font-black text-earth-300 uppercase tracking-tighter">Verified</span>
                   </div>
                </div>
             ))}
             
             <div className="bg-rose-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden group shadow-2xl mt-4">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Sparkles size={120} /></div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-rose-300">Intelligent Recommendation</h4>
                <p className="text-sm font-medium leading-relaxed relative z-10 italic">
                  &quot;Switching to Alpha-Cluster micro-greens could bridge your current zinc deficiency within 14 days of integration.&quot;
                </p>
             </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-24">
           <div className="lg:col-span-2">
              <NutrientTracker />
           </div>
           <div>
              <WellnessBlog />
           </div>
        </div>

        <div className="bg-earth-50 dark:bg-earth-900/40 p-16 rounded-[4rem] text-center border border-earth-100 dark:border-earth-800 relative overflow-hidden">
           <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-rose-500/5 blur-3xl rounded-full"></div>
           <div className="absolute bottom-[-10%] right-[-5%] w-64 h-64 bg-blue-500/5 blur-3xl rounded-full"></div>
           <h3 className="text-3xl font-serif font-black text-earth-900 dark:text-white mb-6 relative z-10 italic">
              &quot;Health is the first wealth, and soil is the first foundation.&quot;
           </h3>
           <p className="text-earth-500 dark:text-earth-400 font-bold uppercase tracking-[0.5em] text-[10px] relative z-10">EnvirosAgro Bio-Security Protocol</p>
        </div>
      </div>
    </div>
  );
};
