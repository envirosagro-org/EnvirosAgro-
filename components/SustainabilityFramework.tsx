
import React, { useState, useMemo } from 'react';
import { 
  Users, Leaf, ShieldPlus, Cpu, Factory, 
  Calculator, BookOpen, Activity, Sprout, 
  Globe, BarChart3, Droplets, TrendingUp, Settings, Scale,
  Share2, X, Copy, AlertCircle, Info, Zap, AlertTriangle
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar 
} from 'recharts';

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

export const SustainabilityFramework: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'model' | 'simulation'>('model');
  
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
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-[10px] font-black text-agro-600 uppercase tracking-[0.4em] mb-4">Official Documentation v4.2</h2>
        <h1 className="text-5xl font-serif font-bold text-agro-900 mb-6">The Five Thrusts Framework</h1>
        <p className="text-lg text-earth-600 leading-relaxed font-medium">
          A mathematical standard for **Sustainable Integrated Development**, measuring resilience through time-series variables.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex justify-center mb-16">
        <div className="bg-earth-100 dark:bg-earth-900 p-1 rounded-2xl flex gap-1 border border-earth-200 dark:border-earth-800">
           <button onClick={() => setActiveTab('model')} className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'model' ? 'bg-white dark:bg-earth-800 text-agro-900 dark:text-white shadow-sm' : 'text-earth-500 hover:text-earth-900'}`}>Theory & Logic</button>
           <button onClick={() => setActiveTab('simulation')} className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'simulation' ? 'bg-white dark:bg-earth-800 text-agro-900 dark:text-white shadow-sm' : 'text-earth-500 hover:text-earth-900'}`}><Activity size={16} /> Interactive Model</button>
        </div>
      </div>

      {activeTab === 'model' ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-16">
           {/* Thrust Grid */}
           <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {THRUSTS.map((thrust) => (
                <div key={thrust.id} className="bg-white dark:bg-earth-900 p-8 rounded-[2.5rem] shadow-sm border border-earth-100 dark:border-earth-800 hover:shadow-xl hover:-translate-y-1 transition-all group">
                   <div className={`w-14 h-14 rounded-2xl ${thrust.color} mb-6 flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner`}>
                      {thrust.icon}
                   </div>
                   <h3 className="font-bold text-earth-900 dark:text-white mb-3">{thrust.title}</h3>
                   <p className="text-xs text-earth-500 leading-relaxed">{thrust.description}</p>
                </div>
              ))}
           </div>

           {/* Variable Rationale */}
           <div className="bg-earth-50 dark:bg-earth-900/50 p-10 rounded-[3rem] border border-earth-100 dark:border-earth-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5"><Zap size={200} /></div>
              <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                 <div>
                    <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white mb-6">Actionable vs. Fundamental</h3>
                    <p className="text-earth-600 dark:text-earth-400 leading-relaxed mb-8">
                       Our research distinguishes between **Dependent Variables** (Technology, Know-How) and **Independent Variables** (Climate, Population). Sustainability is achieved when the system stabilizes in the face of fundamental constraints.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-white dark:bg-earth-800 p-4 rounded-2xl shadow-sm border border-black/5">
                          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-2">Optimizable</span>
                          <p className="text-sm font-bold text-earth-900 dark:text-white">Technical Agriculture</p>
                       </div>
                       <div className="bg-white dark:bg-earth-800 p-4 rounded-2xl shadow-sm border border-black/5">
                          <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block mb-2">Fundamental</span>
                          <p className="text-sm font-bold text-earth-900 dark:text-white">Climate & Resilience</p>
                       </div>
                    </div>
                 </div>
                 <div className="bg-agro-950 p-8 rounded-[2.5rem] text-white shadow-2xl relative group overflow-hidden">
                    <div className="font-mono text-xl md:text-2xl font-bold tracking-widest leading-loose text-center py-6 border-2 border-white/10 rounded-2xl bg-black/20">
                       m = √[((Dn × In) × C(a)) / S]
                    </div>
                    <div className="mt-8 grid grid-cols-2 gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-agro-400">
                       <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-agro-400 rounded-full"></div> Dn: Rain Dur</div>
                       <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-agro-400 rounded-full"></div> In: Integrity</div>
                       <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-agro-400 rounded-full"></div> Ca: Maturity</div>
                       <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-agro-400 rounded-full"></div> S: Need</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
           <div className="grid lg:grid-cols-3 gap-12">
              {/* Controls */}
              <div className="lg:col-span-1 bg-white dark:bg-earth-900 p-10 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-xl h-fit">
                 <h3 className="font-bold text-xl text-earth-900 dark:text-white mb-10 flex items-center gap-2">
                    <Settings className="text-earth-400" /> Model Control
                 </h3>
                 <div className="space-y-10">
                    <div className="space-y-4">
                       <label className="text-xs font-black text-earth-400 uppercase tracking-widest flex justify-between">
                          <span>Base Factor (x)</span>
                          <span className="text-agro-600">{params.x}</span>
                       </label>
                       <input type="range" min="1" max="5" step="0.1" value={params.x} onChange={e => setParams({...params, x: parseFloat(e.target.value)})} className="w-full accent-agro-600 h-1 bg-earth-100 rounded-full appearance-none cursor-pointer" />
                    </div>
                    <div className="space-y-4">
                       <label className="text-xs font-black text-earth-400 uppercase tracking-widest flex justify-between">
                          <span>Adoption Rate (r)</span>
                          <span className="text-agro-600">{params.r}</span>
                       </label>
                       <input type="range" min="1" max="1.3" step="0.01" value={params.r} onChange={e => setParams({...params, r: parseFloat(e.target.value)})} className="w-full accent-agro-600 h-1 bg-earth-100 rounded-full appearance-none cursor-pointer" />
                    </div>
                    <div className="space-y-4">
                       <label className="text-xs font-black text-earth-400 uppercase tracking-widest flex justify-between">
                          <span>Rainfall Index (Dn)</span>
                          <span className="text-agro-600">{params.dn} mo</span>
                       </label>
                       <input type="range" min="4" max="12" step="0.5" value={params.dn} onChange={e => setParams({...params, dn: parseFloat(e.target.value)})} className="w-full accent-agro-600 h-1 bg-earth-100 rounded-full appearance-none cursor-pointer" />
                    </div>
                 </div>
                 <div className="mt-12 p-6 bg-earth-50 dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-700">
                    <p className="text-[10px] text-earth-500 font-bold uppercase leading-relaxed">
                       Simulating 12 cycles of geometric maturity compounding.
                    </p>
                 </div>
              </div>

              {/* Data Display */}
              <div className="lg:col-span-2 space-y-8">
                 <div className="bg-white dark:bg-earth-900 p-8 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm h-[400px]">
                    <div className="flex justify-between items-center mb-8">
                       <h4 className="font-bold text-earth-900 dark:text-white">Compounding Resilience Trend</h4>
                       <span className="text-xs font-black text-agro-600 uppercase bg-agro-50 dark:bg-agro-900/30 px-3 py-1 rounded-full">m(t) Score</span>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={simulationData}>
                          <defs>
                             <linearGradient id="gradM" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                          <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                          <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                          <Area type="monotone" dataKey="m" stroke="#16a34a" strokeWidth={4} fill="url(#gradM)" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>

                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-agro-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-center shadow-xl">
                       <span className="text-[10px] font-black uppercase tracking-widest text-agro-400 mb-2">Cycle End Resilience</span>
                       <div className="text-5xl font-serif font-bold">{finalM} m(t)</div>
                       <p className="text-xs text-agro-200 mt-4 leading-relaxed font-medium">The system can sustain {finalM} times the baseline crop requirement.</p>
                    </div>
                    <div className="bg-white dark:bg-earth-900 p-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 flex flex-col justify-center shadow-sm">
                       <span className="text-[10px] font-black uppercase tracking-widest text-earth-400 mb-2">Final Maturity Coefficient</span>
                       <div className="text-5xl font-serif font-bold text-earth-900 dark:text-white">{simulationData[params.years-1]?.ca}</div>
                       <p className="text-xs text-earth-500 mt-4 leading-relaxed font-medium">C(a) represents standardized technical and social adoption.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};
