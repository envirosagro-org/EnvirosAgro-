import React, { useState } from 'react';
import { MAP_DATA } from './mapdata';
import { 
  MapPin, X, Globe, ArrowRight, 
  Zap, Sprout, ShieldCheck, Activity,
  Maximize2, ExternalLink, Database,
  Cpu, LayoutGrid, Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Refined projection for better global positioning
const project = (lat: number, lng: number) => {
    // Basic Mercator but adjusted for our specific world map image bounds
    const x = (lng + 180) * (100 / 360);
    const y = (90 - lat) * (100 / 180);
    return { x, y };
}

export const ImpactMap: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof MAP_DATA[0] | null>(null);

  return (
    <div className="bg-white dark:bg-earth-950 py-32 transition-colors duration-500 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-agro-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        
        {/* Cinematic Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="ea-label-meta text-blue-600">Global Node Infrastructure</div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-earth-50 dark:bg-earth-900 px-3 py-1 rounded-full border border-earth-100 dark:border-earth-800">Uplink: Core-Alpha</span>
                </div>
                <h2 className="text-6xl lg:text-8xl font-serif font-black text-earth-900 dark:text-white leading-none tracking-tighter mb-8">
                  The <span className="text-blue-600 italic">Impact</span> Network
                </h2>
                <p className="text-2xl text-earth-500 dark:text-earth-400 font-medium leading-relaxed italic max-w-2xl">
                  "Horizontal integration of technology, society, and nature across synchronized regional clusters."
                </p>
            </div>
            
            <div className="flex gap-8">
                {[
                    { label: 'Network Nodes', val: '14 Active', icon: <Globe size={22} className="text-blue-500" /> },
                    { label: 'Resilience Cap', val: '420k Ha', icon: <ShieldCheck size={22} className="text-agro-600" /> }
                ].map((s, i) => (
                    <div key={i} className="bg-white dark:bg-earth-900 px-10 py-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 flex items-center gap-8 shadow-strategic group hover:shadow-xl transition-all">
                        <div className="p-4 bg-earth-50 dark:bg-earth-800 rounded-2xl group-hover:scale-110 transition-transform shadow-inner">{s.icon}</div>
                        <div>
                            <span className="text-[10px] font-black uppercase text-earth-400 block tracking-[0.2em] mb-1">{s.label}</span>
                            <span className="text-3xl font-black text-earth-900 dark:text-white leading-none">{s.val}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Map Container */}
        <div className="relative aspect-[21/9] w-full bg-slate-950 rounded-[5rem] shadow-cinematic-2xl border-[12px] border-white dark:border-earth-900 overflow-hidden group">
          
          {/* Animated Background Gradients */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2400')] bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-[15s]"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-transparent to-agro-900/60 pointer-events-none"></div>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
          
          {/* Legend Overlay */}
          <div className="absolute top-12 left-12 z-20 space-y-4">
             <div className="flex items-center gap-4 bg-black/60 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]"></div>
                <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Telemetry Stream: Nominal</span>
             </div>
             <div className="flex items-center gap-4 bg-black/60 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
                <Terminal size={14} className="text-agro-500" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Registry Sync: v4.2.2-STABLE</span>
             </div>
          </div>

          {/* Registry Status Badge */}
          <div className="absolute bottom-12 left-12 z-20">
             <div className="flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                <LayoutGrid size={18} className="text-blue-400" />
                <div className="flex flex-col">
                    <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">Active Cluster</span>
                    <span className="text-xs font-mono font-bold text-white uppercase">Sector-Alpha-9-Link</span>
                </div>
             </div>
          </div>

          <div className="absolute inset-0 z-10">
            {MAP_DATA.map((projectData) => {
              const { x, y } = project(projectData.position.lat, projectData.position.lng);
              const isActive = selectedProject?.id === projectData.id;

              return (
                <button
                  key={projectData.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group/pin"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onClick={() => setSelectedProject(projectData)}
                >
                  <div className="relative">
                    {/* Immersive Ripple Effect */}
                    <div className={`absolute -inset-6 bg-blue-500/30 rounded-full animate-ping ${isActive ? 'opacity-100 duration-500' : 'opacity-0 group-hover/pin:opacity-100'}`}></div>
                    <div className={`absolute -inset-10 bg-agro-500/10 rounded-full animate-pulse ${isActive ? 'opacity-100' : 'opacity-0 group-hover/pin:opacity-100'}`}></div>
                    
                    <div className={`relative w-8 h-8 rounded-full border-4 transition-all duration-700 flex items-center justify-center ${isActive ? 'bg-white border-blue-600 scale-150 shadow-glow-blue' : 'bg-blue-600 border-white/50 group-hover/pin:scale-125'}`}>
                        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-blue-600 animate-pulse' : 'bg-white'}`}></div>
                    </div>

                    {/* Tooltip on Hover */}
                    <div className="absolute left-full ml-6 opacity-0 group-hover/pin:opacity-100 transition-all translate-x-4 group-hover/pin:translate-x-0 pointer-events-none">
                        <div className="bg-black/90 backdrop-blur-2xl text-white p-4 rounded-2xl border border-white/10 shadow-cinematic">
                           <span className="text-[8px] font-black uppercase text-blue-400 block mb-1">Impact Node</span>
                           <span className="text-sm font-black uppercase tracking-tight whitespace-nowrap">{projectData.name}</span>
                        </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Refined Node Sidebar Overlay */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="absolute top-10 right-10 bottom-10 w-[420px] bg-white/95 dark:bg-earth-900/95 backdrop-blur-3xl rounded-[4rem] shadow-cinematic-2xl border border-white/20 p-12 flex flex-col z-30 overflow-hidden group/modal"
              >
                 {/* Decorative background for the modal */}
                 <div className="absolute top-0 right-0 w-full h-40 bg-gradient-to-b from-blue-600/10 to-transparent opacity-0 group-hover/modal:opacity-100 transition-opacity duration-1000"></div>
                 
                 <button 
                   onClick={() => setSelectedProject(null)} 
                   className="absolute top-10 right-10 p-4 bg-earth-50 dark:bg-earth-800 rounded-2xl hover:bg-earth-100 dark:hover:bg-earth-700 transition-all text-earth-400 hover:text-earth-900 dark:hover:text-white z-40 group"
                 >
                    <X size={24} className="group-hover:rotate-90 transition-transform" />
                 </button>

                 <div className="mb-10 relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-blue-600/20">
                           {selectedProject.focus}
                        </span>
                        <span className="text-[10px] font-black text-earth-400 uppercase tracking-widest bg-earth-50 dark:bg-earth-800/50 px-3 py-1 rounded-lg border border-earth-100 dark:border-earth-800">
                            {selectedProject.region}
                        </span>
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-serif font-black text-earth-900 dark:text-white leading-tight tracking-tighter">
                        {selectedProject.name}
                    </h3>
                 </div>

                 <div className="space-y-8 flex-1 relative z-10">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 bg-white dark:bg-earth-800 rounded-[2rem] border border-earth-100 dark:border-earth-700 shadow-inner flex flex-col justify-between">
                            <span className="text-[10px] font-black uppercase text-earth-400 tracking-widest block mb-2">Thrust Integrity</span>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-black text-agro-600">8.42</span>
                                <span className="text-[10px] font-bold text-earth-400 mb-1">/ 10</span>
                            </div>
                        </div>
                        <div className="p-6 bg-white dark:bg-earth-800 rounded-[2rem] border border-earth-100 dark:border-earth-700 shadow-inner flex flex-col justify-between">
                            <span className="text-[10px] font-black uppercase text-earth-400 tracking-widest block mb-2">Node Sync</span>
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                                <span className="text-lg font-black text-earth-900 dark:text-white uppercase tracking-tight">NOMINAL</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-blue-600 text-white rounded-[2.5rem] shadow-xl relative overflow-hidden group/intel">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover/intel:scale-125 group-hover/intel:rotate-12 transition-transform duration-1000"><Activity size={120} /></div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-200 mb-6 flex items-center gap-3">
                            <Zap size={18} fill="currentColor" /> Strategic Intelligence
                        </h4>
                        <p className="text-sm text-blue-50 font-bold leading-relaxed italic">
                           "Implementation of TA Thrust diagnostics has reduced resource waste by 22% in the {selectedProject.region} sector over 12 months, stabilizing the regional m(t) score."
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-earth-400 ml-1">Recent Telemetry</h4>
                        <div className="space-y-2">
                            {[
                                { label: 'Biomass Delta', val: '+4.2%', icon: <Sprout size={14}/> },
                                { label: 'In(val) Stability', val: '98.4%', icon: <ShieldCheck size={14}/> }
                            ].map((met, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-earth-50 dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-800">
                                    <div className="flex items-center gap-3 text-xs font-bold text-earth-600 dark:text-earth-300">
                                        {met.icon} {met.label}
                                    </div>
                                    <span className="text-xs font-black text-earth-900 dark:text-white">{met.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                 </div>

                 <div className="mt-auto pt-10 border-t border-earth-100 dark:border-earth-800 space-y-4 relative z-10">
                    <button className="w-full bg-earth-900 dark:bg-white text-white dark:text-earth-900 py-6 rounded-[1.8rem] font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-4">
                        <ExternalLink size={20} /> View Node Dossier
                    </button>
                    <button className="w-full text-earth-400 hover:text-blue-600 py-2 rounded-xl font-black text-[10px] uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3 group/btn">
                        Download Regional Dataset <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global Node Ticker */}
        <div className="mt-20 border-t border-earth-100 dark:border-earth-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-black uppercase tracking-[0.6em] text-earth-400">
            <div className="flex items-center gap-12">
               <span className="flex items-center gap-3"><Globe size={14} /> Global Sync: Nominal</span>
               <span className="flex items-center gap-3"><Cpu size={14} /> Neural Backbone Active</span>
            </div>
            <p className="opacity-40">ENVIROSAGRO IMPACT INFRASTRUCTURE v4.2</p>
        </div>
      </div>
    </div>
  );
};
