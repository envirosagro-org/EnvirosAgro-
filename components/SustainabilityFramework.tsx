import React, { useState, useMemo } from 'react';
import { 
  Users, Leaf, ShieldPlus, Cpu, Factory, 
  Calculator, BookOpen, Activity, Sprout, 
  Globe, BarChart3, Droplets, TrendingUp, Settings, Scale,
  Share2, X, Copy, AlertCircle, Info, Zap, AlertTriangle,
  Database, Network, ArrowRight, RefreshCw, Layers, 
  Search, Server, Smartphone, Microscope, BrainCircuit,
  ArrowUpRight, Recycle, Box, ChevronRight, ExternalLink
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { View } from '../types';

const THRUSTS = [
  {
    id: 'SA',
    title: 'Social Agriculture',
    icon: <Users size={28} />,
    color: 'bg-rose-100 text-rose-700',
    description: 'The prerequisite for development. Diagnoses fractures like Social Influenza Disease (SI-D) to build social immunity.'
  },
  {
    id: 'EA',
    title: 'Environmental Agriculture',
    icon: <Leaf size={28} />,
    color: 'bg-green-100 text-green-700',
    description: 'A proactive strategy ensuring soil regeneration, water conservation, and biodiversity preservation.'
  },
  {
    id: 'HA',
    title: 'Health Agriculture',
    icon: <ShieldPlus size={28} />,
    color: 'bg-red-100 text-red-700',
    description: 'Standardizing biological safety across crops, livestock, and communities.'
  },
  {
    id: 'TA',
    title: 'Technical Agriculture',
    icon: <Cpu size={28} />,
    color: 'bg-blue-100 text-blue-700',
    description: 'Adopting AI diagnostics and precision tools to optimize production efficiency.'
  },
  {
    id: 'IA',
    title: 'Industrial Agriculture',
    icon: <Factory size={28} />,
    color: 'bg-slate-100 text-slate-700',
    description: 'The maturity phase: achieving scale through processing, value chain development, and logistics.'
  }
];

const NETWORK_PROCESSES = [
  {
    step: "01",
    id: "input",
    title: "Network Input",
    icon: <Globe className="text-blue-500" />,
    desc: "Acquiring raw data from Agricultural Systems via collective sourcing.",
    sources: ["Clouds", "Intranets", "Extranets", "IOT Servers", "Internet"],
    details: "The network ingests Information, Products, Services, and Finance as main commodities from diverse global and internal organizational sources.",
    target: View.NETWORK_INPUT_HUB
  },
  {
    step: "02",
    id: "dissemination",
    title: "Data Dissemination",
    icon: <Zap className="text-agro-600" />,
    desc: "Cleansing and manufacturing quality data via Five Thrusts logic.",
    sources: ["Sustainability Models", "Resilience Equations", "Standardization"],
    details: "Raw input is processed through EnvirosAgro equations to manufacture high-fidelity information, ensuring only qualified intelligence moves forward."
  },
  {
    step: "03",
    id: "database",
    title: "Resilience Registry",
    icon: <Database className="text-purple-600" />,
    desc: "Engineered storage of qualified and quantified resilience data.",
    sources: ["Master Registry", "Node Ledger", "Strategic Archives"],
    details: "Qualified data is stored in the engineered Data Base, designed to feed the organizational value chain with high-integrity telemetry."
  },
  {
    step: "04",
    id: "feeding",
    title: "Feature Feeding",
    icon: <Smartphone className="text-amber-500" />,
    desc: "Distributing manufactured intelligence to app nodes and features.",
    sources: ["Crop Doctor", "Farm Scout", "Dashboard", "AI Advisor"],
    details: "Outputs from the Database are fed directly into specific features and value-chain nodes for consumption by stakeholders."
  },
  {
    step: "05",
    id: "outcome",
    title: "Value Outcome",
    icon: <Recycle className="text-green-600" />,
    desc: "Kaizen feedback loop for continuous network improvement.",
    sources: ["Data Capture", "Value Conversion", "Feedback Loop"],
    details: "Data captured from value-chain consumption is converted back into value, feeding into Process 02 for continuous iterative improvement."
  }
];

interface SustainabilityFrameworkProps {
  onNavigate?: (view: View) => void;
}

export const SustainabilityFramework: React.FC<SustainabilityFrameworkProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'model' | 'simulation' | 'network'>('network');
  
  // Simulation State
  const [params, setParams] = useState({
    x: 2.0, // Base Agricultural Factor
    r: 1.12, // Growth/Adoption Ratio
    dn: 8,  // Average Rainfall Duration
    years: 12
  });

  // Calculate Time Series Data
  const simulationData = useMemo(() => {
    const data = [];
    const f = 0.5; // Soil retention
    const S = 12; // Crop requirement
    let currentX = params.x;

    for (let t = 1; t <= params.years; t++) {
      // Rainfall fluctuation
      const fluctuation = (Math.sin(t * 2.5) * 0.1) * params.dn;
      const currentDn = Math.max(0, params.dn + fluctuation);
      const currentIn = f * currentDn;
      const n = 1 * currentIn; 

      // Geometric C(a) = [x * (r^n - 1)] / (r - 1) + 1
      let ca = (currentX * (Math.pow(params.r, n) - 1)) / (params.r - 1) + 1;
      
      // Resilience m = sqrt[ (In * Dn * ca) / S ]
      const m = Math.sqrt((currentIn * currentDn * ca) / S);

      data.push({
        year: `Y${t}`,
        m: parseFloat(m.toFixed(2)),
        ca: parseFloat(ca.toFixed(1)),
        resilience: parseFloat((m * 10).toFixed(0))
      });

      // Compound growth
      currentX = currentX * params.r;
    }
    return data;
  }, [params]);

  const finalM = simulationData[simulationData.length - 1]?.m;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <div className="ea-label-meta justify-center mb-4">Strategic Architecture</div>
        <h1 className="text-5xl md:text-7xl font-serif font-black text-agro-900 dark:text-white tracking-tighter mb-6">Sustainability <span className="text-blue-600 italic">Operating System</span></h1>
        <p className="text-xl text-earth-600 dark:text-earth-400 leading-relaxed font-medium">
          Standardizing agricultural progress through mathematical modeling and the EnvirosAgro Network Framework.
        </p>
      </div>

      {/* Primary Tab Switcher - Refined Style */}
      <div className="flex justify-center mb-20 overflow-x-auto no-scrollbar pb-2">
        <div className="agro-glass p-1.5 rounded-[2rem] flex gap-1 border border-earth-200 dark:border-white/5 backdrop-blur-xl">
           <button 
             onClick={() => setActiveTab('network')} 
             className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'network' ? 'bg-agro-600 text-white shadow-lg' : 'text-earth-400 hover:text-earth-900 dark:hover:text-white'}`}
           >
              <Network size={16} /> Network Process
           </button>
           <button 
             onClick={() => setActiveTab('model')} 
             className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'model' ? 'bg-agro-600 text-white shadow-lg' : 'text-earth-400 hover:text-earth-900 dark:hover:text-white'}`}
           >
              Five Thrusts
           </button>
           <button 
             onClick={() => setActiveTab('simulation')} 
             className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'simulation' ? 'bg-agro-600 text-white shadow-lg' : 'text-earth-400 hover:text-earth-900 dark:hover:text-white'}`}
           >
              <Activity size={16} /> M(t) Simulator
           </button>
        </div>
      </div>

      {activeTab === 'network' && (
        <div className="space-y-24 animate-in fade-in slide-in-from-bottom-6 duration-700">
           {/* Immersive Flow Visualization */}
           <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-agro-500 to-green-500 opacity-20 hidden lg:block -translate-y-1/2"></div>
              
              <div className="grid lg:grid-cols-5 gap-8 relative z-10">
                 {NETWORK_PROCESSES.map((proc, i) => (
                    <div 
                      key={proc.id} 
                      onClick={() => proc.target && onNavigate?.(proc.target)}
                      className={`ea-card group p-8 flex flex-col items-center text-center transition-all ${proc.target ? 'cursor-pointer hover:scale-[1.05] hover:border-blue-500/50' : 'hover:scale-[1.03]'}`}
                    >
                       <div className="absolute -top-3 -left-3 w-10 h-10 bg-agro-900 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-xl ring-4 ring-white dark:ring-earth-950">
                          {proc.step}
                       </div>
                       <div className="w-16 h-16 rounded-2xl bg-earth-50 dark:bg-earth-900 flex items-center justify-center mb-8 shadow-inner border border-black/5 group-hover:rotate-12 transition-transform duration-700">
                          {proc.icon}
                       </div>
                       <h3 className="text-xl font-bold text-earth-900 dark:text-white mb-3">{proc.title}</h3>
                       <p className="text-xs text-earth-500 dark:text-earth-400 font-medium leading-relaxed mb-4">{proc.desc}</p>
                       
                       {proc.target && (
                         <div className="flex items-center gap-2 text-[8px] font-black text-blue-600 uppercase tracking-widest mt-2 group-hover:underline">
                            Access Module <ExternalLink size={10} />
                         </div>
                       )}

                       <div className="mt-8 pt-6 border-t border-earth-100 dark:border-earth-800 w-full">
                          <div className="flex flex-wrap justify-center gap-2">
                             {proc.sources.map(s => (
                               <span key={s} className="px-2 py-0.5 bg-earth-50 dark:bg-earth-900 text-[8px] font-black text-earth-400 uppercase tracking-widest rounded border border-earth-100 dark:border-earth-800">
                                  {s}
                               </span>
                             ))}
                          </div>
                       </div>
                    </div>
                 ))}
              </div>

              {/* Looping Connector */}
              <div className="hidden lg:block absolute -bottom-16 left-[10%] right-[10%] h-32 border-x-4 border-b-4 border-dashed border-agro-500/20 rounded-b-[5rem] pointer-events-none">
                 <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-agro-50 dark:bg-agro-900/40 px-6 py-2 rounded-full border border-agro-100 dark:border-agro-800">
                    <span className="text-[10px] font-black text-agro-600 uppercase tracking-[0.4em] flex items-center gap-3">
                       <RefreshCw size={14} className="animate-spin-slow" /> {"Continuous Improvement Loop (Process 05 -> 02)"}
                    </span>
                 </div>
              </div>
           </div>

           {/* Deep Process Breakdown */}
           <div className="grid md:grid-cols-2 gap-12 pt-20">
              <div className="space-y-12">
                 <div className="ea-header-block p-10 bg-slate-900/5 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-inner backdrop-blur-3xl m-0">
                    <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white mb-6">Framework Implementation</h3>
                    <div className="space-y-8">
                       {NETWORK_PROCESSES.slice(0, 3).map(p => (
                         <div key={p.id} className="flex gap-6 items-start">
                            <div className="w-10 h-10 rounded-full bg-agro-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-lg">{p.step}</div>
                            <div>
                               <h4 className="font-bold text-lg text-earth-900 dark:text-white mb-2">{p.title}</h4>
                               <p className="text-sm text-earth-500 dark:text-earth-400 leading-relaxed font-medium">{p.details}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="space-y-12">
                 <div className="ea-header-block p-10 bg-slate-900/5 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-inner backdrop-blur-3xl m-0">
                    <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white mb-6">Outcome & Feedback</h3>
                    <div className="space-y-8">
                       {NETWORK_PROCESSES.slice(3).map(p => (
                         <div key={p.id} className="flex gap-6 items-start">
                            <div className="w-10 h-10 rounded-full bg-agro-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-lg">{p.step}</div>
                            <div>
                               <h4 className="font-bold text-lg text-earth-900 dark:text-white mb-2">{p.title}</h4>
                               <p className="text-sm text-earth-500 dark:text-earth-400 leading-relaxed font-medium">{p.details}</p>
                            </div>
                         </div>
                       ))}
                       <div className="p-8 bg-agro-900 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp size={120} /></div>
                          <p className="text-sm font-medium leading-relaxed italic relative z-10">
                            "The outcome is not just information, but the conversion of data capture back into structural value for the next generation of resilient farming."
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'model' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-16">
           {/* Thrust Grid */}
           <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {THRUSTS.map((thrust) => (
                <div key={thrust.id} className="bg-white dark:bg-earth-900 p-8 rounded-[2.5rem] shadow-sm border border-earth-100 dark:border-earth-800 hover:shadow-xl hover:-translate-y-1 transition-all group">
                   <div className={`w-14 h-14 rounded-2xl ${thrust.color} mb-6 flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner`}>
                      {thrust.icon}
                   </div>
                   <h3 className="font-bold text-earth-900 dark:text-white mb-3">{thrust.title}</h3>
                   <p className="text-xs text-earth-500 leading-relaxed font-medium">{thrust.description}</p>
                </div>
              ))}
           </div>

           {/* Variable Rationale */}
           <div className="bg-earth-50 dark:bg-earth-900/50 p-10 rounded-[3rem] border border-earth-100 dark:border-earth-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5"><Zap size={200} /></div>
              <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                 <div>
                    <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white mb-6">Actionable vs. Fundamental</h3>
                    <p className="text-earth-600 dark:text-earth-400 leading-relaxed mb-8 font-medium">
                       Our research distinguishes between **Dependent Variables** (Technology, Know-How) and **Independent Variables** (Climate, Population). Sustainability is achieved when the system stabilizes in the face of fundamental constraints.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-white dark:bg-earth-800 p-6 rounded-[1.8rem] shadow-sm border border-black/5">
                          <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest block mb-2">Optimizable</span>
                          <p className="text-sm font-bold text-earth-900 dark:text-white">Technical Agriculture</p>
                       </div>
                       <div className="bg-white dark:bg-earth-800 p-6 rounded-[1.8rem] shadow-sm border border-black/5">
                          <span className="text-[9px] font-black text-red-600 uppercase tracking-widest block mb-2">Fundamental</span>
                          <p className="text-sm font-bold text-earth-900 dark:text-white">Climate & Resilience</p>
                       </div>
                    </div>
                 </div>
                 <div className="bg-agro-950 p-10 rounded-[3rem] text-white shadow-2xl relative group overflow-hidden border-4 border-white/5 ring-1 ring-white/10">
                    <div className="font-mono text-xl md:text-3xl font-bold tracking-widest leading-loose text-center py-10 border-2 border-white/10 rounded-2xl bg-black/20 text-agro-400">
                       m = √[((Dn × In) × C(a)) / S]
                    </div>
                    <div className="mt-8 grid grid-cols-2 gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-agro-400/60">
                       <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-agro-500 rounded-full animate-pulse"></div> Dn: Rain Dur</div>
                       <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-agro-500 rounded-full animate-pulse"></div> In: Integrity</div>
                       <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-agro-500 rounded-full animate-pulse"></div> Ca: Maturity</div>
                       <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-agro-500 rounded-full animate-pulse"></div> S: Need</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'simulation' && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
           <div className="grid lg:grid-cols-3 gap-12">
              {/* Controls */}
              <div className="lg:col-span-1 bg-white dark:bg-earth-900 p-10 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-xl h-fit">
                 <h3 className="font-bold text-xl text-earth-900 dark:text-white mb-10 flex items-center gap-3">
                    <Settings className="text-earth-400" size={24} /> Model Parameters
                 </h3>
                 <div className="space-y-10">
                    <div className="space-y-4">
                       <div className="flex justify-between items-end px-1">
                          <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest">Base Factor (x)</label>
                          <span className="text-sm font-black text-agro-600 font-mono">{params.x}</span>
                       </div>
                       <input type="range" min="1" max="5" step="0.1" value={params.x} onChange={e => setParams({...params, x: parseFloat(e.target.value)})} className="w-full accent-agro-600 h-1.5 bg-earth-100 dark:bg-earth-800 rounded-full appearance-none cursor-pointer" />
                    </div>
                    <div className="space-y-4">
                       <div className="flex justify-between items-end px-1">
                          <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest">Adoption Rate (r)</label>
                          <span className="text-sm font-black text-agro-600 font-mono">{params.r}</span>
                       </div>
                       <input type="range" min="1" max="1.3" step="0.01" value={params.r} onChange={e => setParams({...params, r: parseFloat(e.target.value)})} className="w-full accent-agro-600 h-1.5 bg-earth-100 dark:bg-earth-800 rounded-full appearance-none cursor-pointer" />
                    </div>
                    <div className="space-y-4">
                       <div className="flex justify-between items-end px-1">
                          <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest">Rainfall Duration (Dn)</label>
                          <span className="text-sm font-black text-agro-600 font-mono">{params.dn} mo</span>
                       </div>
                       <input type="range" min="4" max="12" step="0.5" value={params.dn} onChange={e => setParams({...params, dn: parseFloat(e.target.value)})} className="w-full accent-agro-600 h-1.5 bg-earth-100 dark:bg-earth-800 rounded-full appearance-none cursor-pointer" />
                    </div>
                 </div>
                 <div className="mt-12 p-8 bg-earth-50 dark:bg-earth-800 rounded-[1.8rem] border border-earth-100 dark:border-earth-700">
                    <p className="text-[10px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.2em] leading-relaxed">
                       *Simulating 12 iterative cycles of geometric maturity compounding within a closed-loop system.
                    </p>
                 </div>
              </div>

              {/* Data Display */}
              <div className="lg:col-span-2 space-y-8">
                 <div className="bg-white dark:bg-earth-900 p-8 rounded-[3.5rem] border border-earth-100 dark:border-earth-800 shadow-sm h-[450px]">
                    <div className="flex justify-between items-center mb-10">
                       <h4 className="font-bold text-lg text-earth-900 dark:text-white uppercase tracking-tight">Predictive Resilience Trend</h4>
                       <div className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 rounded-full bg-agro-600 shadow-[0_0_10px_#16a34a]"></div>
                          <span className="text-[10px] font-black text-agro-600 uppercase tracking-widest">m(t) Index</span>
                       </div>
                    </div>
                    <div className="h-[300px] w-full">
                       <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={simulationData}>
                             <defs>
                                <linearGradient id="gradM" x1="0" y1="0" x2="0" y2="1">
                                   <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2}/>
                                   <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                                </linearGradient>
                             </defs>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
                             <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} dy={10} />
                             <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dx={-10} />
                             <Tooltip 
                               contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.95)', fontSize: '12px' }}
                               itemStyle={{ fontWeight: 900, textTransform: 'uppercase' }}
                             />
                             <Area type="monotone" dataKey="m" stroke="#16a34a" strokeWidth={5} fill="url(#gradM)" />
                          </AreaChart>
                       </ResponsiveContainer>
                    </div>
                 </div>

                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-agro-900 p-10 rounded-[3rem] text-white flex flex-col justify-center shadow-2xl relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-[5s]"><Zap size={140} /></div>
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-agro-400 mb-4 relative z-10">Cycle Final m(t)</span>
                       <div className="text-6xl font-serif font-bold tracking-tighter relative z-10">{finalM}</div>
                       <p className="text-xs text-agro-200 mt-6 leading-relaxed font-medium relative z-10">System can sustain {finalM}x the baseline requirement.</p>
                    </div>
                    <div className="bg-white dark:bg-earth-900 p-10 rounded-[3rem] border border-earth-100 dark:border-earth-800 flex flex-col justify-center shadow-sm relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-[5s]"><TrendingUp size={140} /></div>
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-400 mb-4 relative z-10">Terminal Maturity C(a)</span>
                       <div className="text-6xl font-serif font-bold text-earth-900 dark:text-white tracking-tighter relative z-10">{simulationData[params.years-1]?.ca}</div>
                       <p className="text-xs text-earth-500 mt-6 leading-relaxed font-medium relative z-10">C(a) index representing standardized network synergy.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Footer Meta Ribbon */}
      <div className="mt-32 pt-16 border-t border-earth-100 dark:border-earth-800 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-earth-400">
         <div className="flex items-center gap-10">
            <span className="hover:text-agro-600 transition-colors cursor-pointer flex items-center gap-3"><Globe size={14} /> Certified Network Protocol</span>
            <span className="hover:text-agro-600 transition-colors cursor-pointer flex items-center gap-3"><Scale size={14} /> Peer-Validated Standards</span>
         </div>
         <p className="opacity-40">ENVIROSAGRO ARCHITECTURE v4.2.2-STABLE</p>
      </div>

    </div>
  );
};