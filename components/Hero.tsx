import React, { useState, useMemo } from 'react';
import { View } from '../types';
import { 
  ArrowRight, Globe, Sprout, Database, Zap, 
  ShieldCheck, Search, Layers, 
  Droplets, Sun, ChevronDown, ChevronRight,
  Leaf, Users, Cpu, Wallet, Microscope, Signal, Activity,
  Handshake, Target, Terminal, Satellite, Wifi, Fingerprint, Network,
  BarChart3, Box, Sparkles, Send
} from 'lucide-react';

interface HeroProps {
  onNavigate: (view: View, searchQuery?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [searchValue, setSearchValue] = useState('');
  const [activeThrust, setActiveThrust] = useState<string | null>('EA');
  
  const [simParams, setSimParams] = useState({
    dn: 8.5,      // Rainfall Duration
    inVal: 5.2,  // Soil Moisture/Integrity
    ca: 3.8,    // Sustainability Coeff
    s: 12       // Crop Requirement
  });

  const currentM = useMemo(() => {
    const { dn, inVal, ca, s } = simParams;
    return Math.sqrt(((dn * inVal) * ca) / s).toFixed(2);
  }, [simParams]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchValue.trim()) {
      onNavigate(View.KNOWLEDGE, searchValue.trim());
    }
  };

  const trendingTags = ["Soil Resilience", "EA Thrust", "Carbon Ledger", "SI-D Diagnostic"];

  const thrusts = [
    { 
      id: 'SA', label: "Social", icon: <Users size={24} />, title: "Social Immunity", desc: "Diagnosing fractures like SI-D to build durable communal bonds.",
      color: "text-rose-500", bg: "bg-rose-500/5", border: "border-rose-500/20", target: View.COMMUNITY
    },
    { 
      id: 'EA', label: "Environmental", icon: <Leaf size={24} />, title: "Resource Integrity", desc: "Regenerating soil health and localized biomass reserves.",
      color: "text-green-500", bg: "bg-green-500/5", border: "border-green-500/20", target: View.CARBON_LEDGER
    },
    { 
      id: 'HA', label: "Health", icon: <ShieldCheck size={24} />, title: "Biological Safety", desc: "Standardizing safety protocols for human and plant health.",
      color: "text-red-500", bg: "bg-red-500/5", border: "border-red-500/20", target: View.SAFE_HARVEST
    },
    { 
      id: 'TA', label: "Technical", icon: <Cpu size={24} />, title: "AI Precision", desc: "Optimizing efficiency through diagnostic neural networks.",
      color: "text-blue-500", bg: "bg-blue-500/5", border: "border-blue-500/20", target: View.ROADMAP_AI
    },
    { 
      id: 'IA', label: "Industrial", icon: <Layers size={24} />, title: "Value Maturity", desc: "Scaling supply chains to global industrial standards.",
      color: "text-slate-400", bg: "bg-slate-500/5", border: "border-slate-500/20", target: View.SCALEUP_SUMMIT
    }
  ];

  return (
    <div className="flex flex-col w-full bg-[#fafaf9] dark:bg-[#020617] transition-colors duration-700 overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-[100%] h-[100%] bg-agro-900/10 blur-[200px] rounded-full animate-pulse-gentle"></div>
           <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-blue-900/10 blur-[180px] rounded-full animate-float" style={{animationDelay: '-4s'}}></div>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-[0.03]"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#020617]"></div>
        </div>

        <div className="relative z-10 w-full grid lg:grid-cols-12 gap-24 items-center pt-32 pb-40 max-w-[1800px]">
          <div className="lg:col-span-7 text-left animate-in fade-in slide-in-from-left-20 duration-1000">
            <div className="ea-header-block bg-white/5 backdrop-blur-3xl border-white/10 p-10 md:p-14 mb-8 shadow-cinematic-xl ring-1 ring-white/10 rounded-[4rem]">
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-agro-500/10 border border-agro-500/20 text-agro-500 text-[10px] font-black uppercase tracking-[0.5em] mb-12 shadow-sm">
                  <div className="w-2 h-2 bg-agro-500 rounded-full animate-ping"></div>
                  QUANTIFYING GLOBAL RESILIENCE
                </div>
                
                <h1 className="text-[clamp(3.5rem,9vw,9rem)] font-serif font-black text-slate-900 dark:text-white mb-12 tracking-tighter leading-[0.82] md:leading-[0.8]">
                  Predictive <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-agro-400 via-blue-400 to-emerald-400 italic pr-6 pb-2 inline-block">Stability</span>
                </h1>
                
                <p className="text-xl md:text-3xl text-slate-500 dark:text-slate-300 max-w-2xl mb-16 leading-relaxed font-medium text-balance text-wrap">
                  The first interdisciplinary network standardizing agricultural resilience through the <span className="text-agro-500 font-black">Five Thrusts</span> and the <span className="text-blue-500 font-mono">m(t)</span> constant.
                </p>

                <div className="flex flex-wrap gap-6 mb-16">
                  <button 
                      onClick={() => onNavigate(View.FUTURE_VISION)}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-black py-7 px-16 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(147,51,234,0.4)] hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-[0.4em] flex items-center gap-6 group"
                  >
                      Future Vision Lab <Sparkles size={24} fill="currentColor" className="group-hover:rotate-12 transition-transform" />
                  </button>
                  <button 
                      onClick={() => onNavigate(View.NETWORK_INPUT_HUB)}
                      className="bg-white/5 hover:bg-white/10 dark:bg-white/5 backdrop-blur-xl text-slate-900 dark:text-white px-16 py-7 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.4em] border border-white/10 transition-all flex items-center gap-6 shadow-xl active:scale-95"
                  >
                      Node Ingest Hub <Network size={24} className="text-blue-500" />
                  </button>
                </div>

                <div className="max-w-2xl">
                  <form onSubmit={handleSearchSubmit} className="relative group mb-6">
                      <div className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-agro-500 transition-colors">
                        <Terminal size={28} />
                      </div>
                      <input 
                          type="text" 
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                          placeholder="Query Global Intelligence Ledger..." 
                          className="w-full bg-white/5 border border-white/10 rounded-[3rem] py-9 pl-24 pr-40 text-slate-900 dark:text-white placeholder-slate-600 focus:outline-none focus:ring-[12px] focus:ring-agro-500/5 transition-all font-bold text-2xl shadow-inner backdrop-blur-md"
                      />
                      <button 
                        type="submit"
                        disabled={!searchValue.trim()}
                        className="absolute right-6 top-1/2 -translate-y-1/2 bg-agro-600 hover:bg-agro-500 disabled:bg-slate-800 text-white p-5 rounded-full shadow-2xl transition-all active:scale-90"
                      >
                        <Send size={24} />
                      </button>
                  </form>
                  <div className="flex flex-wrap items-center gap-4 px-10">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Trending:</span>
                    {trendingTags.map((tag) => (
                      <button 
                        key={tag}
                        onClick={() => onNavigate(View.KNOWLEDGE, tag)}
                        className="text-[10px] font-black text-agro-500 hover:text-agro-400 uppercase tracking-widest transition-colors"
                      >
                        #{tag.replace(/\s/g, '_').toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:block animate-in fade-in zoom-in-95 duration-1000 delay-300">
             <div className="bg-slate-900/60 dark:bg-black/60 backdrop-blur-[100px] rounded-[6rem] p-20 shadow-[0_80px_150px_rgba(0,0,0,0.8)] relative overflow-hidden group border-4 border-white/5 ring-1 ring-white/10">
                <div className="absolute top-0 right-0 p-12 opacity-[0.04] text-agro-500 pointer-events-none group-hover:scale-110 transition-transform duration-[20s]"><Satellite size={450} /></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                   <div className="w-28 h-28 bg-agro-500/10 rounded-[3rem] flex items-center justify-center mb-16 shadow-inner border border-agro-500/20 ring-8 ring-agro-500/5 transition-all group-hover:scale-110 group-hover:rotate-6">
                      <Activity size={56} className="text-agro-500 animate-pulse" />
                   </div>
                   
                   <div className="mb-20">
                       <div className="text-[12rem] xl:text-[15rem] font-serif font-black text-white tracking-tighter leading-none transition-all duration-700 select-none group-hover:scale-[1.02] drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                          {currentM}
                       </div>
                       <div className="text-[11px] font-black text-agro-500 uppercase tracking-[0.8em] mt-10 flex items-center justify-center gap-8">
                          <span className="w-20 h-px bg-white/10"></span>
                          GLOBAL_CALCULATION_SYNCED
                          <span className="w-20 h-px bg-white/10"></span>
                       </div>
                   </div>

                   <div className="w-full space-y-12 bg-black/40 p-12 rounded-[4rem] border border-white/5 shadow-inner backdrop-blur-2xl">
                      <div className="space-y-6">
                         <div className="flex justify-between items-center px-4">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] flex items-center gap-3">
                               <Sun size={14} className="text-amber-500" /> Rainfall (Dn)
                            </span>
                            <span className="font-mono font-bold text-white text-2xl">{simParams.dn} mo</span>
                         </div>
                         <input 
                            type="range" min="2" max="12" step="0.1"
                            value={simParams.dn}
                            onChange={(e) => setSimParams({...simParams, dn: parseFloat(e.target.value)})}
                            className="w-full accent-agro-500 h-2 bg-white/10 rounded-full appearance-none cursor-pointer border border-white/5"
                         />
                      </div>
                      <div className="space-y-6">
                         <div className="flex justify-between items-center px-4">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] flex items-center gap-3">
                               <Droplets size={14} className="text-blue-500" /> Integrity (In)
                            </span>
                            <span className="font-mono font-bold text-white text-2xl">{simParams.inVal}</span>
                         </div>
                         <input 
                            type="range" min="1" max="10" step="0.1"
                            value={simParams.inVal}
                            onChange={(e) => setSimParams({...simParams, inVal: parseFloat(e.target.value)})}
                            className="w-full accent-blue-500 h-2 bg-white/10 rounded-full appearance-none cursor-pointer border border-white/5"
                         />
                      </div>
                   </div>
                   
                   <div className="mt-14 flex items-center gap-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.6em]">
                      <div className="w-2 h-2 bg-agro-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                      GLOBAL_CALCULATION_SYNCED
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Global Impact Ribbon */}
      <div className="relative z-20 -mt-32 mb-40 px-12">
        <div className="w-full bg-white dark:bg-slate-900 rounded-[4rem] border border-white/10 shadow-cinematic-xl py-14 px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 items-center backdrop-blur-3xl relative overflow-hidden">
            {[
                { label: "Network Nodes", value: "12,482", icon: <Globe className="text-blue-500" />, trend: "+2.4%" },
                { label: "Biomass Vol", value: "2.4M Tons", icon: <Layers className="text-agro-500" />, trend: "+12.1%" },
                { label: "Community Hubs", value: "840+", icon: <Users size={24} className="text-rose-500" />, trend: "+5.8%" },
                { label: "Impact Assets", value: "$420M+", icon: <Wallet className="text-amber-500" />, trend: "+18.2%" }
            ].map((stat, i) => (
                <div key={i} className="flex items-center gap-10 group cursor-default relative z-10">
                    <div className="p-6 bg-black/5 dark:bg-white/5 rounded-[2.2rem] group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 shadow-inner ring-1 ring-white/10">{stat.icon}</div>
                    <div>
                        <div className="flex items-baseline gap-4">
                           <div className="text-4xl font-serif font-black text-slate-900 dark:text-white tracking-tight leading-none">{stat.value}</div>
                           <span className="text-[10px] font-black text-agro-500">{stat.trend}</span>
                        </div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2 opacity-80">{stat.label}</div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <section className="w-full mb-56 px-12 max-w-[1700px] mx-auto">
          <div className="text-center mb-32 max-w-5xl mx-auto">
              <div className="ea-label-meta justify-center mb-6">Framework Architecture</div>
              <h3 className="text-6xl md:text-9xl font-serif font-bold text-slate-900 dark:text-white tracking-tighter leading-[0.8] mb-12">The Ecosystem <br/><span className="text-agro-600 italic">Matrix</span></h3>
              <p className="text-2xl md:text-3xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-balance max-w-4xl mx-auto">
                  Sustainable Integrated Development is measured through five specialized domains, each ensuring growth is socially equitable and environmentally secure.
              </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
              {thrusts.map((thrust) => (
                  <div 
                    key={thrust.id}
                    onMouseEnter={() => setActiveThrust(thrust.id)}
                    onClick={() => onNavigate(thrust.target)}
                    className={`p-12 rounded-[4rem] flex flex-col items-center text-center group h-full transition-all duration-1000 border-4 cursor-pointer ${
                        activeThrust === thrust.id 
                        ? `${thrust.bg} ${thrust.border} scale-[1.05] z-10 shadow-cinematic-xl ring-1 ring-white/10` 
                        : 'bg-white/50 dark:bg-white/5 border-transparent opacity-60 grayscale hover:grayscale-0 hover:opacity-100'
                    }`}
                  >
                      <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center mb-12 shadow-2xl transition-all duration-1000 group-hover:rotate-[360deg] ${
                          activeThrust === thrust.id ? 'bg-white dark:bg-slate-800 scale-110 shadow-strategic' : 'bg-white dark:bg-white/10'
                      } ${thrust.color}`}>
                          {React.cloneElement(thrust.icon as React.ReactElement<any>, { size: 38 })}
                      </div>
                      <h4 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] leading-none mb-8">{thrust.label}</h4>
                      <p className="text-base font-bold text-slate-500 dark:text-slate-400 leading-relaxed mb-16 flex-1">{thrust.desc}</p>
                      
                      <div className={`w-16 h-16 rounded-1.8rem border-2 flex items-center justify-center transition-all duration-500 ${
                          activeThrust === thrust.id ? `${thrust.color} border-agro-500/30 rotate-45 bg-agro-500/10` : 'border-slate-200 dark:border-white/5 text-slate-300'
                      }`}>
                          <ChevronRight size={28} />
                      </div>
                  </div>
              ))}
          </div>
      </section>
    </div>
  );
};