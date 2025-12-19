import React, { useState, useMemo } from 'react';
import { View } from '../types';
import { 
  ArrowRight, Globe, Sprout, Database, Zap, 
  ShieldCheck, Calculator, TrendingUp, Search, Brain, Layers, 
  Droplets, Sun, ChevronDown, Handshake, Radio, Glasses,
  Leaf, Users, Cpu, Factory, Wallet, BookOpen, ChevronLeft
} from 'lucide-react';

interface HeroProps {
  onNavigate: (view: View, searchQuery?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [searchValue, setSearchValue] = useState('');
  
  // LIVE m(t) SIMULATOR STATE
  const [simParams, setSimParams] = useState({
    dn: 8,  // Rainfall Duration
    inVal: 5, // Soil Moisture/Integrity
    ca: 3.5, // Sustainability Coeff
    s: 12   // Crop Requirement
  });

  // Calculate m(t) using the framework formula
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
      content: "Community, education & SI-D diagnostics",
      color: "text-rose-500", 
      bg: "bg-rose-50 dark:bg-rose-950/20", 
      shadow: "shadow-rose-500/10" 
    },
    { 
      id: 'EA', 
      label: "Environmental", 
      icon: <Leaf size={24} />, 
      content: "Soil health, water & biodiversity",
      color: "text-green-500", 
      bg: "bg-green-50 dark:bg-green-950/20", 
      shadow: "shadow-green-500/10" 
    },
    { 
      id: 'HA', 
      label: "Health", 
      icon: <ShieldCheck size={24} />, 
      content: "Safety, nutrition & disease prevention",
      color: "text-red-500", 
      bg: "bg-red-50 dark:bg-red-950/20", 
      shadow: "shadow-red-500/10" 
    },
    { 
      id: 'TA', 
      label: "Technical", 
      icon: <Cpu size={24} />, 
      content: "AI diagnostics, IoT & precision tools",
      color: "text-blue-500", 
      bg: "bg-blue-50 dark:bg-blue-950/20", 
      shadow: "shadow-blue-500/10" 
    },
    { 
      id: 'IA', 
      label: "Industrial", 
      icon: <Layers size={24} />, 
      content: "Scaling, supply chains & processing",
      color: "text-slate-500", 
      bg: "bg-slate-50 dark:bg-slate-950/20", 
      shadow: "shadow-slate-500/10" 
    }
  ];

  const entryPoints = [
    { id: View.CUSTOMER, icon: <Users size={28} />, label: "Farmers & Groups", sub: "Collaborative Management", desc: "Digital onboarding for societies and smallholder collectives.", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/20" },
    { id: View.KNOWLEDGE, icon: <Database size={28} />, label: "Research Hub", sub: "Open Intelligence", desc: "Access the unified knowledge repository and m(t) indices.", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20" },
    { id: View.PARTNERSHIPS, icon: <Handshake size={28} />, label: "Global Alliances", sub: "Strategic Partners", desc: "Integrated development pathways for industry leaders.", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/20" },
    { id: View.INVESTOR_PORTAL, icon: <Wallet size={28} />, label: "Capital Exchange", sub: "Impact Investing", desc: "Sustainable asset tracking and green finance liquidity.", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/20" }
  ];

  return (
    <div className="flex flex-col w-full bg-white dark:bg-earth-950 transition-colors duration-300">
      
      {/* 1. IMMERSIVE HERO WITH FORMULA ENGINE */}
      <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-earth-950">
        
        {/* Background Mathematical Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
           <div className="absolute top-1/4 left-10 font-mono text-[10vw] text-agro-500 font-black leading-none select-none tracking-tighter opacity-10">
              m = √[((Dn × In) × C(a)) / S]
           </div>
           <div className="absolute bottom-1/4 right-10 font-mono text-[8vw] text-blue-500 font-black leading-none select-none tracking-tighter opacity-10">
              C(a) = [x(rⁿ - 1)] / (r - 1) + 1
           </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center pt-20 pb-32">
          
          <div className="text-left animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-agro-500/10 border border-agro-500/20 text-agro-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-agro-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-agro-500"></span>
              </span>
              Standardizing Global Resilience
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-8 tracking-tighter leading-[0.9]">
              Unified <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-agro-400 via-emerald-400 to-blue-400 italic">Agro-Intelligence</span>
            </h1>
            
            <p className="text-xl text-earth-300 max-w-xl mb-14 leading-relaxed font-medium">
              A data-driven network quantifying stability through the <span className="text-agro-400 font-bold">Five Thrusts</span> and our proprietary m(t) Sustainable Time Constant.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
               <button 
                  onClick={() => onNavigate(View.SUSTAINABILITY_FRAMEWORK)}
                  className="nature-gradient text-white px-10 py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-2xl shadow-agro-900/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
               >
                  Explore Framework <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
               </button>
               <button 
                  onClick={() => onNavigate(View.SIGN_UP)}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-10 py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all flex items-center gap-3"
               >
                  Join Network <Zap size={18} className="text-amber-400" />
               </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="relative group max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-500 group-focus-within:text-agro-400 transition-colors" size={20} />
              <input 
                type="text" 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search Knowledge Repository..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-earth-600 focus:outline-none focus:ring-2 focus:ring-agro-500/50 transition-all font-medium"
              />
            </form>
          </div>

          {/* THE RESILIENCE ENGINE */}
          <div className="lg:block animate-in fade-in slide-in-from-right-8 duration-1000">
             <div className="bg-white/5 backdrop-blur-2xl rounded-[4rem] border border-white/10 p-10 md:p-14 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                   <div className="w-20 h-20 bg-agro-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl rotate-3 group-hover:rotate-6 transition-transform shadow-agro-500/20">
                      <Calculator size={40} className="text-white" />
                   </div>
                   <h3 className="text-xs font-black text-agro-400 uppercase tracking-[0.4em] mb-4">Resilience Engine v4.2</h3>
                   <div className="text-8xl md:text-9xl font-serif font-bold text-white tracking-tighter mb-4">
                      {currentM}
                   </div>
                   <div className="text-sm font-black text-earth-400 uppercase tracking-widest mb-12">
                      Sustainable Time Constant m(t)
                   </div>

                   <div className="w-full grid gap-8 bg-black/20 p-8 rounded-[2.5rem] border border-white/5">
                      <div className="space-y-4">
                         <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black text-earth-500 uppercase tracking-widest flex items-center gap-2">
                               <Sun size={12} className="text-amber-500" /> Rainfall (Dn)
                            </span>
                            <span className="text-xs font-mono text-white">{simParams.dn} mo</span>
                         </div>
                         <input 
                            type="range" min="2" max="12" step="0.5"
                            value={simParams.dn}
                            onChange={(e) => setSimParams({...simParams, dn: parseFloat(e.target.value)})}
                            className="w-full accent-agro-500 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                         />
                      </div>
                      <div className="space-y-4">
                         <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black text-earth-500 uppercase tracking-widest flex items-center gap-2">
                               <Droplets size={12} className="text-blue-500" /> Integrity (In)
                            </span>
                            <span className="text-xs font-mono text-white">{simParams.inVal}</span>
                         </div>
                         <input 
                            type="range" min="1" max="10" step="0.1"
                            value={simParams.inVal}
                            onChange={(e) => setSimParams({...simParams, inVal: parseFloat(e.target.value)})}
                            className="w-full accent-blue-500 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                         />
                      </div>
                      <div className="space-y-4">
                         <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black text-earth-500 uppercase tracking-widest flex items-center gap-2">
                               <TrendingUp size={12} className="text-purple-500" /> Adoption (C(a))
                            </span>
                            <span className="text-xs font-mono text-white">{simParams.ca}</span>
                         </div>
                         <input 
                            type="range" min="0.5" max="10" step="0.1"
                            value={simParams.ca}
                            onChange={(e) => setSimParams({...simParams, ca: parseFloat(e.target.value)})}
                            className="w-full accent-purple-500 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                         />
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-earth-50 animate-bounce">
           <span className="text-[10px] font-black uppercase tracking-widest">Network Blueprint</span>
           <ChevronDown size={20} />
        </div>
      </div>

      {/* 2. THE FIVE THRUSTS RIBBON (HORIZONTAL WITH CONTENTS) */}
      <div className="relative z-20 -mt-16 mb-24 px-6 overflow-x-auto no-scrollbar scroll-smooth">
        <div className="max-w-7xl mx-auto flex items-stretch justify-start lg:justify-center gap-4 py-4 px-2 min-w-max md:min-w-0">
           {thrusts.map((thrust) => (
             <div 
               key={thrust.id}
               onClick={() => onNavigate(View.SUSTAINABILITY_FRAMEWORK)}
               className={`bg-white dark:bg-earth-900 p-6 px-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 shadow-xl ${thrust.shadow} transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group flex items-center gap-6 whitespace-nowrap`}
             >
                <div className={`w-14 h-14 rounded-2xl ${thrust.bg} ${thrust.color} flex items-center justify-center shadow-inner transition-transform duration-500 group-hover:scale-110 shrink-0`}>
                   {thrust.icon}
                </div>
                <div className="text-left max-w-[200px]">
                  <h3 className="font-bold text-earth-900 dark:text-white group-hover:text-agro-600 transition-colors leading-none mb-1.5">{thrust.label}</h3>
                  <p className="text-[10px] font-bold text-earth-500 dark:text-earth-400 whitespace-normal leading-relaxed">
                    {thrust.content}
                  </p>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* 3. NAVIGATION PATHWAYS (NETWORK ENTRY POINTS - VERTICAL GRID LAYOUT) */}
      <div className="max-w-7xl mx-auto mb-40 px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
            <div className="flex flex-col">
                <h2 className="text-[10px] font-black text-agro-600 uppercase tracking-[0.4em] mb-2">Ecosystem Access</h2>
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-earth-900 dark:text-white tracking-tight leading-none">Network Entry Points</h3>
            </div>
            <p className="text-earth-500 dark:text-earth-400 max-w-md font-medium text-sm md:text-right">
              Navigate the unified infrastructure through specialized portals designed for every stakeholder.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
           {entryPoints.map((path) => (
             <div 
               key={path.label}
               onClick={() => onNavigate(path.id)}
               className="bg-white dark:bg-earth-900 p-8 md:p-10 rounded-[3rem] md:rounded-[3.5rem] shadow-sm border border-earth-100 dark:border-earth-800 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer group flex flex-col relative overflow-hidden"
             >
                {/* Subtle Background Icon */}
                <div className={`absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity ${path.color}`}>
                  {React.cloneElement(path.icon as React.ReactElement, { size: 180 })}
                </div>

                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[1.8rem] md:rounded-[2rem] ${path.bg} ${path.color} flex items-center justify-center mb-8 shadow-inner ring-4 ring-white dark:ring-earth-800 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6`}>
                  {path.icon}
                </div>
                
                <div className="relative z-10 flex-1 flex flex-col">
                  <span className={`text-[10px] font-black ${path.color} uppercase tracking-[0.3em] mb-2`}>{path.sub}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-earth-900 dark:text-white mb-4 leading-tight">{path.label}</h3>
                  <p className="text-sm text-earth-500 dark:text-earth-400 font-medium leading-relaxed mb-10 line-clamp-3 md:line-clamp-none">{path.desc}</p>
                  
                  <button className={`mt-auto flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-earth-50 dark:bg-earth-800/50 ${path.color} font-black text-[10px] uppercase tracking-widest transition-all group-hover:bg-agro-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-agro-600/20 active:scale-95`}>
                    Enter Portal <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* 4. CORE RESILIENCE EQUATION SECTION */}
      <div className="py-32 px-6 max-w-7xl mx-auto border-t border-earth-100 dark:border-earth-800">
          <div className="flex flex-col lg:flex-row items-center gap-20">
             <div className="lg:w-1/2 space-y-10">
                <div>
                  <span className="text-agro-600 dark:text-agro-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">The Resilience Formula</span>
                  <h2 className="text-5xl font-serif font-bold text-earth-900 dark:text-white leading-tight">Quantifying Global <br/>Agricultural Stability</h2>
                </div>
                <p className="text-xl text-earth-600 dark:text-earth-400 leading-relaxed font-medium">
                  We mathematically model sustainability using the <strong>m(t) Constant</strong>. It accounts for natural independent variables to predict regional capacity for integrated development.
                </p>
                <div className="grid grid-cols-2 gap-8">
                   <div className="flex items-start gap-4">
                      <div className="p-3 bg-agro-50 dark:bg-agro-900/30 text-agro-600 rounded-xl shadow-sm"><ShieldCheck size={24} /></div>
                      <div>
                        <h4 className="font-bold text-earth-900 dark:text-white uppercase text-xs tracking-wider">Verifiable</h4>
                        <p className="text-[10px] text-earth-500 mt-1 uppercase font-bold">Standardized Audit Protocols.</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl shadow-sm"><Zap size={24} /></div>
                      <div>
                        <h4 className="font-bold text-earth-900 dark:text-white uppercase text-xs tracking-wider">Predictive</h4>
                        <p className="text-[10px] text-earth-500 mt-1 uppercase font-bold">AI Time-Series Forecasting.</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="lg:w-1/2 w-full">
                <div className="bg-earth-900 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-12 bg-white/5 rounded-bl-full group-hover:scale-110 transition-transform duration-[3s]"></div>
                   <div className="relative z-10 text-white">
                      <h3 className="text-2xl font-serif font-bold text-agro-400 mb-2">Steady-State Formula</h3>
                      <p className="text-earth-400 text-xs mb-10 font-mono uppercase tracking-widest">Resilience Standard v2.1</p>
                      
                      <div className="bg-black/30 p-10 rounded-[2.5rem] border border-white/10 mb-10 text-center shadow-inner hover:bg-black/40 transition-colors">
                         <div className="text-4xl md:text-5xl font-serif font-bold tracking-widest text-white leading-tight">
                           m = √[((Dn × In) × C(a)) / S]
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                         {[
                           { label: "Dn", sub: "Rainfall Duration" },
                           { label: "In", sub: "Environmental Integrity" },
                           { label: "C(a)", sub: "Maturity Coefficient" },
                           { label: "S", sub: "Standard Consumption" }
                         ].map((v) => (
                           <div key={v.label} className="border-l border-white/20 pl-4 py-1">
                              <span className="text-agro-400 font-black text-xs uppercase tracking-widest">{v.label}</span>
                              <p className="text-[10px] font-bold text-earth-500 uppercase mt-0.5">{v.sub}</p>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>
      </div>

      {/* 5. MEDIA PREVIEWS */}
      <div className="py-32 bg-earth-50 dark:bg-earth-900/20 rounded-[5rem] mb-32 border-y border-earth-100 dark:border-earth-800">
          <div className="max-w-7xl mx-auto px-6 text-center">
              <span className="text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Knowledge Hub</span>
              <h2 className="text-5xl font-serif font-bold text-earth-900 dark:text-white mb-20 leading-tight">Broadcast & Cultural Insights</h2>

              <div className="grid md:grid-cols-3 gap-10">
                  <div onClick={() => onNavigate(View.PLANET_WATCH)} className="group cursor-pointer">
                      <div className="relative h-80 rounded-[3rem] overflow-hidden mb-8 shadow-xl">
                          <img src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt="News" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                          <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-white"><Radio size={24} /></div>
                          <div className="absolute bottom-6 left-6 right-6 text-left text-white">
                              <span className="text-[10px] font-black uppercase tracking-widest text-agro-400">Live Telemetry</span>
                              <h4 className="text-xl font-bold mt-1">Planet Watch Report</h4>
                          </div>
                      </div>
                  </div>

                  <div onClick={() => onNavigate(View.PODCAST)} className="group cursor-pointer">
                      <div className="relative h-80 rounded-[3rem] overflow-hidden mb-8 shadow-xl">
                          <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt="Podcast" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                          <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-white"><Volume2Icon /></div>
                          <div className="absolute bottom-6 left-6 right-6 text-left text-white">
                              <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">Audio Session</span>
                              <h4 className="text-xl font-bold mt-1">Roots of Heritage</h4>
                          </div>
                      </div>
                  </div>

                  <div onClick={() => onNavigate(View.SMART_FARM_VR)} className="group cursor-pointer">
                      <div className="relative h-80 rounded-[3rem] overflow-hidden mb-8 shadow-xl">
                          <img src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt="VR" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                          <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-white"><Glasses size={24} /></div>
                          <div className="absolute bottom-6 left-6 right-6 text-left text-white">
                              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Immersive Academy</span>
                              <h4 className="text-xl font-bold mt-1">Virtual Field Flight</h4>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

// Helper Icons
const Volume2Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
);
