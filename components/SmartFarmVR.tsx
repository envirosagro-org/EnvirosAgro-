import React from 'react';
import { VRHeader } from './smartfarmvr/VRHeader';
import { Glasses, Play, Cpu, Box, Activity, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const SmartFarmVR: React.FC = () => {
  const simulations = [
    { title: 'Autonomous Tractor Ops', level: 'Beginner', duration: '15m', image: 'https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?w=400' },
    { title: 'Precision Drone Calibration', level: 'Intermediate', duration: '20m', image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=400' },
    { title: 'Multi-Trophic System Flow', level: 'Advanced', duration: '45m', image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=400' },
    { title: 'Soil Microbiome Visualization', level: 'Intermediate', duration: '30m', image: 'https://images.unsplash.com/photo-1625246333195-551e51245128?w=400' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <VRHeader />

      <div className="grid lg:grid-cols-3 gap-12 mb-20">
         <div className="lg:col-span-2 space-y-12">
            <div>
               <h3 className="text-3xl font-serif font-black text-earth-900 dark:text-white mb-8 border-l-4 border-blue-600 pl-6">Active Simulations</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {simulations.map((sim, i) => (
                     <div key={i} className="group bg-white dark:bg-earth-900 rounded-[2.5rem] overflow-hidden border border-earth-100 dark:border-earth-800 hover:border-blue-500/30 transition-all hover:shadow-xl cursor-pointer">
                        <div className="relative h-48 overflow-hidden">
                           <img src={sim.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={sim.title} />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                           <div className="absolute top-4 left-4 bg-white/90 dark:bg-earth-950/90 backdrop-blur-md px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest text-blue-600">
                              {sim.level}
                           </div>
                           <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
                              <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Activity size={14} /> {sim.duration}</span>
                              <div className="p-3 bg-blue-600 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                 <Play size={16} fill="currentColor" />
                              </div>
                           </div>
                        </div>
                        <div className="p-6">
                           <h4 className="text-lg font-bold text-earth-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">{sim.title}</h4>
                           <p className="text-xs text-earth-500 font-medium">Immersive technical training module.</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-earth-900 rounded-[3rem] p-12 text-white relative overflow-hidden group shadow-2xl">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-[10s]"><Cpu size={180} /></div>
               <div className="max-w-xl relative z-10">
                  <h3 className="text-4xl font-serif font-bold mb-6 leading-tight">Hardware Integration</h3>
                  <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
                     The SmartFarm VR system is compatible with all major technical agricultural headsets and haptic controllers for enterprise-grade training.
                  </p>
                  <div className="flex flex-wrap gap-4">
                     <button className="bg-white text-earth-900 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-agro-50 transition-all shadow-xl active:scale-95">
                        Setup Guide
                     </button>
                     <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all">
                        Support Center
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-10 rounded-[2.5rem] shadow-sm text-center">
               <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-3xl flex items-center justify-center mx-auto mb-8 text-blue-600 shadow-inner">
                  <Glasses size={40} />
               </div>
               <h3 className="text-2xl font-bold text-earth-900 dark:text-white mb-4">Remote Training</h3>
               <p className="text-sm text-earth-500 mb-10 leading-relaxed font-medium">
                  Connect with experts globally for real-time collaborative VR sessions.
               </p>
               <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-700 transition-all shadow-xl active:scale-95">
                  Launch Environment
               </button>
            </div>

            <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-8 rounded-[2rem] shadow-sm">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-earth-400 mb-6 flex items-center gap-3">
                  <ShieldCheck size={18} className="text-green-500" /> Training Metrics
               </h4>
               <div className="space-y-6">
                  {[
                     { label: 'Precision Score', val: '94%', color: 'text-green-500' },
                     { label: 'Safety Compliance', val: '100%', color: 'text-blue-500' },
                     { label: 'Response Time', val: '1.2s', color: 'text-amber-500' }
                  ].map((stat, i) => (
                     <div key={i} className="flex justify-between items-center border-b border-earth-50 dark:border-earth-800 pb-4 last:border-0 last:pb-0">
                        <span className="text-xs font-bold text-earth-800 dark:text-earth-200">{stat.label}</span>
                        <span className={`font-mono text-sm font-black ${stat.color}`}>{stat.val}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
