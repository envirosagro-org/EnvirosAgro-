
import React, { useState, useMemo } from 'react';
import { View } from '../types';
import { 
  ArrowRight, Globe, Sprout, Database, Zap, 
  ShieldCheck, Search, Layers, 
  Droplets, Sun, ChevronDown, 
  Leaf, Users, Cpu, Wallet, Microscope, Signal, ChevronRight, Activity,
  Handshake, Target, Terminal, Satellite, Wifi,
  // Added comment above fix: Add missing Fingerprint icon to imports
  Fingerprint
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

  const thrusts = [
    { 
      id: 'SA', 
      label: "Social", 
      icon: <Users size={24} />, 
      title: "Social Immunity",
      desc: "Diagnosing fractures like SI-D to build durable communal bonds.",
      color: "text-rose-500", 
      bg: "bg-rose-500/5", 
      border: "border-rose-500/20"
    },
    { 
      id: 'EA', 
      label: "Environmental", 
      icon: <Leaf size={24} />, 
      title: "Resource Integrity",
      desc: "Regenerating soil health and localized biomass reserves.",
      color: "text-green-500", 
      bg: "bg-green-500/5", 
      border: "border-green-500/20"
    },
    { 
      id: 'HA', 
      label: "Health", 
      icon: <ShieldCheck size={24} />, 
      title: "Biological Safety",
      desc: "Standardizing safety protocols for human and plant health.",
      color: "text-red-500", 
      bg: "bg-red-500/5", 
      border: "border-red-500/20"
    },
    { 
      id: 'TA', 
      label: "Technical", 
      icon: <Cpu size={24} />, 
      title: "AI Precision",
      desc: "Optimizing efficiency through diagnostic neural networks.",
      color: "text-blue-500", 
      bg: "bg-blue-500/5", 
      border: "border-blue-500/20"
    },
    { 
      id: 'IA', 
      label: "Industrial", 
      icon: <Layers size={24} />, 
      title: "Value Maturity",
      desc: "Scaling supply chains to global industrial standards.",
      color: "text-slate-400", 
      bg: "bg-slate-500/5", 
      border: "border-slate-500/20"
    }
  ];

  return (
    <div className="flex flex-col w-full bg-[#fafaf9] dark:bg-[#020617] transition-colors duration-700 overflow-hidden">
      
      {/* 1. STRATEGIC CINEMATIC HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        
        {/* Ops Center Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-[100%] h-[100%] bg-agro-900/10 blur-[200px] rounded-full animate-pulse-gentle"></div>
           <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-blue-900/10 blur-[180px] rounded-full animate-float" style={{animationDelay: '-4s'}}></div>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-[0.03]"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#020617]"></div>
        </div>

        <div className="relative z-10 w-full grid lg:grid-cols-12 gap-24 items-center pt-32 pb-40">
          
          {/* Main Hero Message */}
          <div className="lg:col-span-7 text-left animate-in fade-in slide-in-from-left-20 duration-1000">
            <div className="ea-header-block bg-white/5 backdrop-blur-3xl border-white/10 p-10 md:p-14 mb-8 shadow-cinematic-xl ring-1 ring-white/10">
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-agro-500/10 border border-agro-500/20 text-agro-500 text-[10px] font-black uppercase tracking-[0.5em] mb-10 shadow-sm">
                  <div className="w-2 h-2 bg-agro-500 rounded-full animate-ping"></div>
                  QUANTIFYING GLOBAL RESILIENCE
                </div>
                
                <h1 className="text-[clamp(3rem,10vw,9rem)] font-serif font-black text-slate-900 dark:text-white mb-10 tracking-tighter leading-[0.82] md:leading-[0.8]">
                  Predictive <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-agro-400 via-blue-400 to-emerald-400 italic pr-6 pb-2 inline-block">Stability</span>
                </h1>
                
                <p className="text-xl md:text-3xl text-slate-500 dark:text-slate-300 max-w-2xl mb-14 leading-relaxed font-medium text-balance">
                  The first interdisciplinary network standardizing agricultural resilience through the <span className="text-agro-500 font-black">Five Thrusts</span> and the <span className="text-blue-500 font-mono">m(t)</span> constant.
                </p>

                <div className="flex flex-wrap gap-6 mb-16">
                  <button 
                      onClick={() => onNavigate(View.SUSTAINABILITY_FRAMEWORK)}
                      className="nature-impact-gradient text-white font-black py-6 px-14 rounded-3xl shadow-cinematic-xl hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-[0.3em] flex items-center gap-4 group"
                  >
                      Explore The Model <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                  </button>
                  <button 
                      onClick={() => onNavigate(View.SIGN_UP)}
                      className="bg-white/5 hover:bg-white/10 dark:bg-white/5 backdrop-blur-xl text-slate-900 dark:text-white px-14 py-6 rounded-3xl font-black uppercase text-xs tracking-[0.3em] border border-white/10 transition-all flex items-center gap-4 shadow-xl active:scale-95"
                  >
                      Sync ID <Fingerprint size={20} className="text-blue-500" />
                  </button>
                </div>

                <form onSubmit={handleSearchSubmit} className="relative group max-w-xl">
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-agro-500 transition-colors">
                      <Terminal size={24} />
                    </div>
                    <input 
                        type="text" 
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Query Global Intelligence Ledger..." 
                        className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] py-8 pl-20 pr-10 text-slate-900 dark:text-white placeholder-slate-600 focus:outline-none focus:ring-8 focus:ring-agro-500/10 transition-all font-bold text-xl shadow-inner backdrop-blur-md"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 p-2 bg-agro-600 text-white rounded-xl shadow-lg opacity-0 group-focus-within:opacity-100 transition-opacity">
                      <Search size={20} />
                    </div>
                </form>
            </div>
          </div>

          {/* 2. THE RESILIENCE COMMAND ENGINE */}
          <div className="lg:col-span-5 hidden lg:block animate-in fade-in zoom-in-95 duration-1000 delay-300">
             <div className="bg-slate-900/60 dark:bg-black/60 backdrop-blur-[100px] rounded-[5rem] p-16 shadow-[0_80px_150px_rgba(0,0,0,0.8)] relative overflow-hidden group border-4 border-white/5 ring-1 ring-white/10">
                <div className="absolute top-0 right-0 p-12 opacity-[0.04] text-agro-500 pointer-events-none group-hover:scale-110 transition-transform duration-[20s]"><Satellite size={450} /></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                   <div className="w-28 h-28 bg-agro-500/10 rounded-[2.5rem] flex items-center justify-center mb-14 shadow-inner border border-agro-500/20 ring-4 ring-agro-500/5">
                      <Activity size={48} className="text-agro-500 animate-pulse" />
                   </div>
                   
                   <div className="mb-16">
                       <div className="text-[10rem] xl:text-[13rem] font-serif font-black text-white tracking-tighter leading-none transition-all duration-700 select-none group-hover:scale-[1.02] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                          {currentM}
                       </div>
                       <div className="text-[10px] font-black text-agro-500 uppercase tracking-[0.8em] mt-8 flex items-center justify-center gap-6">
                          <span className="w-16 h-px bg-white/10"></span>
                          m(t) RESILIENCE
                          <span className="w-16 h-px bg-white/10"></span>
                       </div>
                   </div>

                   <div className="w-full space-y-12 bg-black/40 p-12 rounded-[3.5rem] border border-white/5 shadow-inner backdrop-blur-2xl">
                      <div className="space-y-6">
                         <div className="flex justify-between items-center px-4">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-3">
                               <Sun size={14} className="text-amber-500" /> Rainfall (Dn)
                            </span>
                            <span className="font-mono font-bold text-white text-xl">{simParams.dn} mo</span>
                         </div>
                         <input 
                            type="range" min="2" max="12" step="0.1"
                            value={simParams.dn}
                            onChange={(e) => setSimParams({...simParams, dn: parseFloat(e.target.value)})}
                            className="w-full accent-agro-500 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer"
                         />
                      </div>
                      <div className="space-y-6">
                         <div className="flex justify-between items-center px-4">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-3">
                               <Droplets size={14} className="text-blue-500" /> Integrity (In)
                            </span>
                            <span className="font-mono font-bold text-white text-xl">{simParams.inVal}</span>
                         </div>
                         <input 
                            type="range" min="1" max="10" step="0.1"
                            value={simParams.inVal}
                            onChange={(e) => setSimParams({...simParams, inVal: parseFloat(e.target.value)})}
                            className="w-full accent-blue-500 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer"
                         />
                      </div>
                   </div>
                   
                   <div className="mt-12 flex items-center gap-3 text-[9px] font-black text-slate-600 uppercase tracking-[0.5em]">
                      <Wifi size={12} className="text-agro-500" /> LOCALIZED_CALCULATION_SYNCED
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. GLOBAL IMPACT RIBBON */}
      <div className="relative z-20 -mt-24 mb-32 px-12">
        <div className="w-full bg-white dark:bg-slate-900 rounded-[3rem] border border-white/10 shadow-cinematic-xl py-12 px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 items-center backdrop-blur-3xl">
            {[
                { label: "Network Nodes", value: "12,482", icon: <Globe className="text-blue-500" />, trend: "+2.4%" },
                { label: "Biomass Vol", value: "2.4M Tons", icon: <Layers className="text-agro-500" />, trend: "+12.1%" },
                { label: "Community Hubs", value: "840+", icon: <Users size={24} className="text-rose-500" />, trend: "+5.8%" },
                { label: "Impact Assets", value: "$420M+", icon: <Wallet className="text-amber-500" />, trend: "+18.2%" }
            ].map((stat, i) => (
                <div key={i} className="flex items-center gap-8 group cursor-default">
                    <div className="p-5 bg-black/5 dark:bg-white/5 rounded-3xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 shadow-inner ring-1 ring-white/10">{stat.icon}</div>
                    <div>
                        <div className="flex items-baseline gap-3">
                           <div className="text-3xl font-serif font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</div>
                           <span className="text-[10px] font-black text-agro-500">{stat.trend}</span>
                        </div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 opacity-80">{stat.label}</div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* 4. THE INTEGRATED FIVE THRUSTS */}
      <section className="w-full mb-48 px-12">
          <div className="text-center mb-24 max-w-4xl mx-auto">
              <div className="ea-label-meta justify-center">Framework Architecture</div>
              <h3 className="text-6xl md:text-8xl font-serif font-bold text-slate-900 dark:text-white tracking-tighter leading-none mb-10">The Ecosystem Matrix</h3>
              <p className="text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  Sustainable Integrated Development is measured through five specialized domains, each ensuring growth is both socially equitable and environmentally secure.
              </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {thrusts.map((thrust) => (
                  <div 
                    key={thrust.id}
                    onMouseEnter={() => setActiveThrust(thrust.id)}
                    className={`p-10 rounded-[3.5rem] flex flex-col items-center text-center group h-full transition-all duration-1000 border-2 ${
                        activeThrust === thrust.id 
                        ? `${thrust.bg} ${thrust.border} scale-[1.05] z-10 shadow-cinematic-xl ring-1 ring-white/10` 
                        : 'bg-white/50 dark:bg-white/5 border-transparent opacity-60 grayscale hover:grayscale-0 hover:opacity-100'
                    }`}
                  >
                      <div className={`w-20 h-20 rounded-[2.2rem] flex items-center justify-center mb-10 shadow-2xl transition-all duration-1000 group-hover:rotate-[360deg] ${
                          activeThrust === thrust.id ? 'bg-white dark:bg-slate-800 scale-110 shadow-strategic' : 'bg-white dark:bg-white/10'
                      } ${thrust.color}`}>
                          {thrust.icon}
                      </div>
                      <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-widest leading-none mb-6">{thrust.label}</h4>
                      <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed mb-12 flex-1">{thrust.desc}</p>
                      
                      <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 ${
                          activeThrust === thrust.id ? `${thrust.color} border-agro-500/30 rotate-45 bg-agro-500/10` : 'border-slate-200 dark:border-white/5 text-slate-300'
                      }`}>
                          <ChevronRight size={24} />
                      </div>
                  </div>
              ))}
          </div>
      </section>
      
      {/* 5. STRATEGIC ENTRY TERMINALS */}
      <section className="bg-slate-100 dark:bg-white/5 py-48 px-12 relative overflow-hidden mb-32 border-y border-white/5">
          <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
          
          <div className="w-full relative z-10 max-w-[1600px] mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
                  <div className="max-w-3xl">
                      <div className="ea-label-meta">Access Infrastructure</div>
                      <h3 className="text-5xl md:text-9xl font-serif font-bold text-slate-900 dark:text-white tracking-tighter leading-none">Global Gateways</h3>
                  </div>
                  <button onClick={() => onNavigate(View.SERVICES)} className="flex items-center gap-4 px-14 py-6 rounded-[2.5rem] bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-white/10 font-black text-xs uppercase tracking-[0.3em] hover:border-agro-600 hover:text-agro-600 transition-all group shadow-strategic whitespace-nowrap">
                      View Regional Nodes <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                  </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {[
                      { id: View.CUSTOMER, title: "Producers & Collectives", sub: "Production Node", desc: "Access verified inputs, diagnostic neural networks, and peer-to-peer markets.", icon: <Sprout size={42} />, color: "rose" },
                      { id: View.KNOWLEDGE, title: "Intelligence & Research", sub: "Data Node", desc: "Contribute to and query the global database of standardized agricultural intelligence.", icon: <Microscope size={42} />, color: "blue" },
                      { id: View.PARTNERSHIPS, title: "Strategic Alliances", sub: "Collaborative Node", desc: "Integration pathways for industrial, governmental, and NGO organizations.", icon: <Handshake size={42} />, color: "emerald" },
                      { id: View.INVESTOR_PORTAL, title: "Institutional Capital", sub: "Financial Node", desc: "Direct investment opportunities in m(t) verified ag-tech infrastructure.", icon: <Wallet size={42} />, color: "amber" }
                  ].map((portal, i) => (
                      <div 
                        key={i}
                        onClick={() => onNavigate(portal.id)}
                        className="ea-card p-12 md:p-16 flex flex-col md:flex-row items-start gap-12 cursor-pointer group bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900"
                      >
                          <div className={`p-10 rounded-[2.5rem] transition-all duration-1000 group-hover:scale-110 group-hover:rotate-6 bg-${portal.color}-500/10 text-${portal.color}-500 shadow-inner border border-white/10 shrink-0`}>
                              {portal.icon}
                          </div>
                          <div className="flex-1 pt-2">
                              <span className={`text-[10px] font-black uppercase tracking-[0.4em] mb-4 block text-${portal.color}-500`}>{portal.sub}</span>
                              <h4 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight group-hover:text-agro-600 transition-colors">{portal.title}</h4>
                              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10 opacity-90">{portal.desc}</p>
                              <div className={`flex items-center gap-4 font-black text-[10px] uppercase tracking-[0.4em] text-${portal.color}-500 opacity-100 md:opacity-0 group-hover:opacity-100 group-hover:gap-8 transition-all duration-1000`}>
                                  Connect Terminal <ArrowRight size={20} />
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 6. CALL TO ACTION - COMMAND CENTER STYLE */}
      <section className="px-12 mb-40">
          <div className="w-full py-40 bg-[#050a14] rounded-[6rem] relative overflow-hidden shadow-cinematic-xl flex flex-col items-center text-center border-4 border-white/5">
              <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]"></div>
              <div className="absolute top-0 right-0 w-[60rem] h-[60rem] bg-blue-600/10 blur-[200px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10 max-w-5xl px-12">
                  <div className="w-28 h-28 bg-agro-600 rounded-[3rem] flex items-center justify-center mx-auto mb-12 shadow-[0_0_60px_rgba(34,197,94,0.4)] border-4 border-white/20 animate-float ring-8 ring-white/5">
                      <Signal size={42} className="text-white" />
                  </div>
                  <h3 className="text-5xl md:text-[8rem] font-serif font-bold text-white mb-12 tracking-tighter leading-[0.85] text-balance">The Pulse of <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-agro-400 via-blue-400 to-agro-400 animate-shimmer" style={{backgroundSize: '200% 100%'}}>Global Progress</span></h3>
                  <p className="text-2xl md:text-3xl text-agro-200/60 mb-20 leading-relaxed font-light max-w-4xl mx-auto px-4 text-balance">
                      Synchronize your operations with the most advanced agricultural infrastructure ever built. Verifiable, standardized, and designed for long-term planetary resilience.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-8 w-full max-w-2xl mx-auto">
                      <button onClick={() => onNavigate(View.SIGN_UP)} className="flex-1 bg-white text-[#050a14] px-16 py-7 rounded-full font-black uppercase text-xs tracking-[0.4em] shadow-2xl hover:scale-105 active:scale-95 transition-all">Identify Node</button>
                      <button onClick={() => onNavigate(View.PARTNERSHIPS)} className="flex-1 bg-white/5 text-white border-2 border-white/20 px-16 py-7 rounded-full font-black uppercase text-xs tracking-[0.4em] hover:bg-white/10 transition-all backdrop-blur-xl">Partner Access</button>
                  </div>
              </div>
          </div>
      </section>

      {/* Strategic Footer Ribbon */}
      <div className="w-full pb-20 border-t border-white/5 pt-20 flex flex-col md:flex-row justify-between items-center gap-12 px-12">
          <div className="flex items-center gap-8 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-[3s]">
             <Globe size={28} className="text-slate-400" />
             <span className="font-serif font-black text-3xl text-slate-400 tracking-tighter">EnvirosAgro Strategic Hub</span>
          </div>
          <div className="flex flex-wrap justify-center gap-16 text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">
             <span className="hover:text-agro-600 cursor-pointer transition-colors">Protocol v4.2.2-STABLE</span>
             <span className="hover:text-agro-600 cursor-pointer transition-colors">m(t) Verified Node</span>
             <span className="hover:text-agro-600 cursor-pointer transition-colors">Digital Sovereignty Layer</span>
          </div>
      </div>
    </div>
  );
};
