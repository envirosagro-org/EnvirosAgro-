import React, { useState } from 'react';
import { VRHeader } from './smartfarmvr/VRHeader';
import { 
  Glasses, Play, Cpu, Box, Activity, ArrowRight, 
  ShieldCheck, Zap, ArrowLeft, Maximize2, Monitor, 
  Settings, Radio, User, Loader2, X, Download, Share2, Clock, Info
} from 'lucide-react';
import { View } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const SmartFarmVR: React.FC<{ onNavigate?: (view: View) => void }> = ({ onNavigate }) => {
  const [selectedSimulation, setSelectedSimulation] = useState<any>(null);
  const [isLaunching, setIsLaunching] = useState(false);

  const simulations = [
    { 
        id: 'sim1', 
        title: 'Autonomous Tractor Ops', 
        level: 'Beginner', 
        duration: '15m', 
        image: 'https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?w=800',
        desc: 'Master the telemetry and navigation systems of Class-5 autonomous field units.',
        objectives: ['Path Correction', 'Sensor Calibration', 'Emergency Halt']
    },
    { 
        id: 'sim2', 
        title: 'Precision Drone Calibration', 
        level: 'Intermediate', 
        duration: '20m', 
        image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800',
        desc: 'High-fidelity flight simulation for multispectral crop analysis drones.',
        objectives: ['Grid Mapping', 'Spectral Overlay', 'Payload Balance']
    },
    { 
        id: 'sim3', 
        title: 'Multi-Trophic System Flow', 
        level: 'Advanced', 
        duration: '45m', 
        image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800',
        desc: 'Simulate the horizontal integration of technology, energy, and biological cycles.',
        objectives: ['Waste-to-Energy Loop', 'Nutrient Siphoning', 'Resilience m(t) Optimization']
    },
    { 
        id: 'sim4', 
        title: 'Soil Microbiome Visualization', 
        level: 'Intermediate', 
        duration: '30m', 
        image: 'https://images.unsplash.com/photo-1625246333195-551e51245128?w=800',
        desc: 'A cellular-level immersive journey into the mycorrhizal networks of Sector Alpha.',
        objectives: ['Fungal Identification', 'Nutrient Exchange Logic', 'Integrity In(val) Scoring']
    },
  ];

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
        setIsLaunching(false);
        // In a real app, this would redirect to a VR route or launch a player
        toast.success("VR Environment Synchronized.");
    }, 3000);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12 animate-in fade-in duration-700 bg-white dark:bg-earth-950 transition-colors duration-500 min-h-screen">
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-10">
        <button 
          onClick={() => onNavigate?.(View.HOME)}
          className="flex items-center gap-2 text-earth-400 hover:text-blue-600 font-black text-[10px] uppercase tracking-widest transition-all group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Back to command
        </button>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-2xl">
            <div className="ea-label-meta mb-4 text-blue-600">Immersive Training Portal</div>
            <h2 className="text-5xl lg:text-7xl font-serif font-black text-earth-900 dark:text-white leading-none tracking-tighter">
                SmartFarm <span className="text-blue-600 italic">VR</span> Hub
            </h2>
            <p className="text-xl text-earth-500 dark:text-earth-400 mt-6 font-medium leading-relaxed">
                Enterprise-grade technical agricultural training via standardized virtual reality simulations. Mastering Thrust TA efficiency.
            </p>
        </div>
        
        <div className="flex gap-4">
            <div className="bg-earth-50 dark:bg-earth-900 px-8 py-5 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 flex items-center gap-6 shadow-sm">
                <div className="p-3 bg-white dark:bg-earth-800 rounded-2xl text-blue-600 shadow-inner"><Activity size={24}/></div>
                <div>
                    <span className="text-[10px] font-black uppercase text-earth-400 block tracking-widest mb-1">Compute Load</span>
                    <span className="text-2xl font-black text-earth-900 dark:text-white leading-none">4.2 TFLOPS</span>
                </div>
            </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
         <div className="lg:col-span-8 space-y-12">
            <div>
               <h3 className="text-3xl font-serif font-black text-earth-900 dark:text-white mb-8 border-l-4 border-blue-600 pl-6 uppercase tracking-tight">Active Training Simulations</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {simulations.map((sim, i) => (
                     <div 
                        key={i} 
                        onClick={() => setSelectedSimulation(sim)}
                        className={`group bg-white dark:bg-earth-900 rounded-[3rem] overflow-hidden border transition-all duration-700 hover:shadow-cinematic-xl cursor-pointer ${selectedSimulation?.id === sim.id ? 'border-blue-500 ring-4 ring-blue-500/10 scale-[1.02]' : 'border-earth-100 dark:border-earth-800'}`}
                     >
                        <div className="relative h-64 overflow-hidden">
                           <img src={sim.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt={sim.title} />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                           <div className="absolute top-6 left-6 flex gap-2">
                                <span className="bg-white/90 dark:bg-earth-950/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-blue-600 shadow-xl">
                                    {sim.level}
                                </span>
                           </div>
                           <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white">
                              <div>
                                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-1 block">Est. Duration</span>
                                 <span className="text-lg font-bold flex items-center gap-2 leading-none"><Clock size={16} className="text-blue-400"/> {sim.duration}</span>
                              </div>
                              <div className="p-4 bg-blue-600 rounded-2xl shadow-glow-blue opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                 <Play size={20} fill="currentColor" />
                              </div>
                           </div>
                        </div>
                        <div className="p-10">
                           <h4 className="text-2xl font-serif font-bold text-earth-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">{sim.title}</h4>
                           <p className="text-sm text-earth-500 dark:text-earth-400 font-medium leading-relaxed mb-6 line-clamp-2 italic">"{sim.desc}"</p>
                           <div className="flex flex-wrap gap-2">
                               {sim.objectives.slice(0, 2).map(obj => (
                                   <span key={obj} className="px-3 py-1 bg-earth-50 dark:bg-earth-800 text-[8px] font-black uppercase tracking-widest text-earth-400 rounded-lg border border-earth-100 dark:border-earth-700">{obj}</span>
                               ))}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-earth-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl group border-8 border-white/5">
               <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-125 transition-transform duration-1000 rotate-12"><Cpu size={350} /></div>
               <div className="max-w-2xl relative z-10">
                  <div className="ea-label-meta mb-8 text-blue-400">Enterprise Logistics</div>
                  <h3 className="text-4xl lg:text-6xl font-serif font-black mb-8 leading-none tracking-tighter">Hardware <br/>Integration Hub</h3>
                  <p className="text-slate-400 text-xl mb-12 leading-relaxed font-medium italic">
                     "The SmartFarm VR system is engineered for full bilateral integration with Class-A technical agriculture headsets and low-latency haptic feedback arrays."
                  </p>
                  <div className="flex flex-wrap gap-6">
                     <button className="bg-white text-earth-900 px-10 py-5 rounded-[1.8rem] font-black text-xs uppercase tracking-widest hover:bg-agro-50 transition-all shadow-xl active:scale-95">
                        Setup Protocol
                     </button>
                     <button className="bg-white/5 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-[1.8rem] font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                        Request Haptic Unit
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <aside className="lg:col-span-4 space-y-10">
            <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-12 rounded-[3.5rem] shadow-sm text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
               <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/30 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 text-blue-600 shadow-inner group hover:scale-110 transition-transform">
                  <Glasses size={48} />
               </div>
               <h3 className="text-3xl font-serif font-black text-earth-900 dark:text-white mb-4 tracking-tight">Node Launch</h3>
               <p className="text-sm text-earth-500 dark:text-earth-400 mb-12 leading-relaxed font-medium px-4 italic">
                  Initialize collaborative training link with regional ecosystem experts.
               </p>
               <button 
                  onClick={handleLaunch}
                  disabled={isLaunching || !selectedSimulation}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] shadow-xl shadow-blue-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-4 disabled:opacity-30 disabled:cursor-not-allowed"
               >
                  {isLaunching ? <><Loader2 size={20} className="animate-spin" /> SYNCING ENV...</> : <><Monitor size={22} /> Launch Simulation</>}
               </button>
               <p className="text-[8px] font-black text-earth-300 uppercase tracking-widest mt-6">Awaiting selection of active dossier</p>
            </div>

            <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-10 rounded-[3rem] shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12"><Activity size={140} /></div>
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-earth-400 mb-8 flex items-center gap-3">
                  <ShieldCheck size={18} className="text-agro-600" /> Training Metrics
               </h4>
               <div className="space-y-8">
                  {[
                     { label: 'Precision Delta', val: '94.2%', color: 'text-agro-600', trend: '+1.2%' },
                     { label: 'Safety Integrity', val: '100.0%', color: 'text-blue-600', trend: 'Stable' },
                     { label: 'Latency Node-to-VR', val: '1.2ms', color: 'text-amber-500', trend: 'Low' }
                  ].map((stat, i) => (
                    <div key={i} className="group">
                        <div className="flex justify-between items-end mb-2">
                           <span className="text-[10px] font-black text-earth-500 uppercase tracking-widest group-hover:text-earth-900 dark:group-hover:text-white transition-colors">{stat.label}</span>
                           <span className={`font-mono text-lg font-black ${stat.color}`}>{stat.val}</span>
                        </div>
                        <div className="h-1 w-full bg-earth-50 dark:bg-earth-800 rounded-full overflow-hidden">
                           <div className={`h-full ${stat.color.replace('text-', 'bg-')} opacity-60`} style={{ width: stat.val.includes('%') ? stat.val : '100%' }}></div>
                        </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="p-8 bg-blue-50 dark:bg-blue-900/10 rounded-[2.5rem] border border-blue-100 dark:border-blue-900/30">
               <div className="flex items-start gap-4">
                  <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">Technical Note</h5>
                    <p className="text-[10px] font-medium text-earth-500 dark:text-blue-200 leading-relaxed italic">
                        Simulation accuracy is verified against the m(t) constant baseline established in May 2024 regional audit.
                    </p>
                  </div>
               </div>
            </div>
         </aside>
      </div>
    </div>
  );
};

export default SmartFarmVR;