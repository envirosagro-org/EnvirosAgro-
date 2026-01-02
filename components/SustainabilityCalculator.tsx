import React, { useState, useMemo } from 'react';
import { 
  Calculator, TrendingUp, Zap, Info, ArrowLeft, 
  Settings, Layers, RefreshCw, Activity, ShieldCheck,
  ArrowRight, Database, Globe, Sliders
} from 'lucide-react';
import { View } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SustainabilityCalculatorProps {
    onNavigate?: (view: View) => void;
}

export const SustainabilityCalculator: React.FC<SustainabilityCalculatorProps> = ({ onNavigate }) => {
  const [params, setParams] = useState({ 
    dn: 8,    // Average Rainfall Duration (months)
    f: 0.5,   // Soil Integrity / Retention Factor
    x: 2.5,   // Base Agricultural Maturity
    r: 1.12,  // Adoption/Growth Ratio
    s: 12     // Social/Community Requirement
  });

  const [activeVariable, setActiveVariable] = useState<string | null>('dn');

  const results = useMemo(() => {
    // Guard clauses for invalid parameters
    if (params.r === 1 || params.s === 0) {
      return { in_val: 'N/A', ca: 'N/A', m: 'Error', score: 'N/A' };
    }

    // In(val) = f * Dn
    const in_val = params.f * params.dn;
    // Geometric Maturity: C(a) = [x * (r^n - 1)] / (r - 1) + 1 where n = In(val)
    const ca = (params.x * (Math.pow(params.r, in_val) - 1)) / (params.r - 1) + 1;
    
    const expression = (in_val * params.dn * ca) / params.s;
    
    // Guard against square root of a negative number
    if (expression < 0) {
      return { in_val: in_val.toFixed(2), ca: ca.toFixed(2), m: 'Invalid', score: 'N/A' };
    }

    // Resilience: m(t) = sqrt[ (In * Dn * ca) / S ]
    const m = Math.sqrt(expression);
    
    return { 
        in_val: in_val.toFixed(2),
        ca: ca.toFixed(2), 
        m: m.toFixed(2),
        score: (m * 20).toFixed(0) // Scaled score for visualization
    };
  }, [params]);

  // Generate trend data based on changing Rainfall Duration (dn)
  const trendData = useMemo(() => {
    // Guard clauses for invalid parameters
    if (params.r === 1 || params.s === 0) {
        return []; // Return empty array if params are invalid for the chart
    }

    const data = [];
    for (let i = 4; i <= 12; i += 0.5) {
        const in_v = params.f * i;
        const c_a = (params.x * (Math.pow(params.r, in_v) - 1)) / (params.r - 1) + 1;
        
        const expression = (in_v * i * c_a) / params.s;
        
        // Handle negative results gracefully for the chart
        if (expression < 0) {
            data.push({ dn: i, m: 0 });
        } else {
            const m_val = Math.sqrt(expression);
            data.push({ dn: i, m: parseFloat(m_val.toFixed(2)) });
        }
    }
    return data;
  }, [params.f, params.x, params.r, params.s]);

  const VARIABLE_DETAILS: any = {
    dn: { title: 'Rainfall Duration (Dn)', desc: 'Months of sustained precipitation per cycle. High variability impacts m(t) stability.' },
    f: { title: 'Soil Integrity (f)', desc: 'Ability of the soil to retain nutrients and moisture. Optimized via EA Thrust practices.' },
    x: { title: 'Ag Maturity (x)', desc: 'Baseline industrial and technical expertise in the regional cluster.' },
    r: { title: 'Adoption Ratio (r)', desc: 'Rate of horizontal technology transfer across community nodes.' },
    s: { title: 'System Need (S)', desc: 'Social and economic resource requirement to maintain community homeostasis.' }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12 bg-white dark:bg-earth-950 transition-colors duration-500 min-h-screen">
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-10">
        <button 
          onClick={() => onNavigate?.(View.HOME)}
          className="flex items-center gap-2 text-earth-400 hover:text-agro-600 font-black text-[10px] uppercase tracking-widest transition-all group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Home
        </button>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-2xl">
            <div className="ea-label-meta mb-4 text-agro-600">Mathematical Modeling</div>
            <h2 className="text-5xl lg:text-7xl font-serif font-black text-earth-900 dark:text-white leading-none tracking-tighter">
                Resilience <span className="text-agro-600 italic">Simulator</span>
            </h2>
            <p className="text-xl text-earth-500 dark:text-earth-400 mt-6 font-medium leading-relaxed">
                Quantifying sustainable development through the EnvirosAgro $m(t)$ constant and geometric maturity equations.
            </p>
        </div>
        
        <div className="flex gap-4">
            <div className="bg-earth-50 dark:bg-earth-900 px-6 py-4 rounded-2xl border border-earth-100 dark:border-earth-800 flex items-center gap-4 shadow-sm">
                <div className="p-3 bg-agro-50 dark:bg-agro-900/30 text-agro-600 rounded-xl">
                    <ShieldCheck size={24} />
                </div>
                <div>
                    <span className="text-[10px] font-black uppercase text-earth-400 block">Model Integrity</span>
                    <span className="text-sm font-bold text-earth-900 dark:text-white uppercase">v4.2.2 Verified</span>
                </div>
            </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left: Parameter Controls */}
        <div className="lg:col-span-5 space-y-8">
           <div className="bg-white dark:bg-earth-900 p-10 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12"><Sliders size={200} /></div>
                <h3 className="text-xl font-bold text-earth-900 dark:text-white mb-10 flex items-center gap-3">
                    <Settings className="text-agro-600" /> Control Parameters
                </h3>
                
                <div className="space-y-10 relative z-10">
                    {[
                        { id: 'dn', label: 'Rainfall (Dn)', min: 4, max: 12, step: 0.1, unit: 'mo' },
                        { id: 'f', label: 'Soil Retention (f)', min: 0.1, max: 1, step: 0.01, unit: '' },
                        { id: 'x', label: 'Ag Maturity (x)', min: 1, max: 5, step: 0.1, unit: '' },
                        { id: 'r', label: 'Growth Ratio (r)', min: 1.01, max: 1.5, step: 0.01, unit: '' },
                        { id: 's', label: 'Social Need (S)', min: 1, max: 25, step: 1, unit: '' }
                    ].map((v) => (
                        <div key={v.id} className="space-y-4 group" onMouseEnter={() => setActiveVariable(v.id)}>
                            <div className="flex justify-between items-end px-1">
                                <label className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activeVariable === v.id ? 'text-agro-600' : 'text-earth-400'}`}>{v.label}</label>
                                <span className="text-sm font-black text-agro-600 font-mono">{(params as any)[v.id]}{v.unit}</span>
                            </div>
                            <input 
                                type="range" 
                                min={v.min} max={v.max} step={v.step} 
                                value={(params as any)[v.id]} 
                                onChange={e => setParams({...params, [v.id]: parseFloat(e.target.value)})} 
                                className="w-full accent-agro-600 h-1.5 bg-earth-100 dark:bg-earth-800 rounded-full appearance-none cursor-pointer" 
                            />
                        </div>
                    ))}
                </div>
           </div>

           <div className="bg-earth-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Zap size={140} /></div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-agro-400 mb-4">Equation Context</h4>
                <div className="font-mono text-lg font-bold tracking-widest leading-loose mb-6">
                    m = √[((Dn × In) × C(a)) / S]
                </div>
                <AnimatePresence mode="wait">
                    <motion.p 
                        key={activeVariable}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xs text-earth-300 font-medium leading-relaxed italic"
                    >
                        {activeVariable ? VARIABLE_DETAILS[activeVariable].desc : "Adjust variables to simulate different regional scenarios."}
                    </motion.p>
                </AnimatePresence>
           </div>
        </div>

        {/* Right: Results & Visualization */}
        <div className="lg:col-span-7 space-y-8 flex flex-col">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-agro-900 p-10 rounded-[3rem] text-white flex flex-col justify-center shadow-2xl relative overflow-hidden group border border-white/5">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-[5s]"><TrendingUp size={140} /></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-agro-400 mb-4 relative z-10">Resilience Constant m(t)</span>
                    <div className="text-7xl font-serif font-black tracking-tighter relative z-10">{results.m}</div>
                    <p className="text-xs text-agro-200 mt-8 leading-relaxed font-medium relative z-10">
                        {results.m === 'Error' || results.m === 'Invalid' 
                            ? "Calculation error due to invalid parameters."
                            : parseFloat(results.m) > 2.5 
                                ? "Steady-state sustainability achieved."
                                : "System requires further TA Thrust optimization."}
                    </p>
                </div>
                <div className="bg-white dark:bg-earth-900 p-10 rounded-[3rem] border border-earth-100 dark:border-earth-800 flex flex-col justify-center shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-[5s]"><Layers size={140} /></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-400 mb-4 relative z-10">Maturity C(a)</span>
                    <div className="text-7xl font-serif font-black text-earth-900 dark:text-white tracking-tighter relative z-10">{results.ca}</div>
                    <p className="text-xs text-earth-500 mt-8 leading-relaxed font-medium relative z-10">Geometric industrial maturity index for this node.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-earth-900 p-8 rounded-[3.5rem] border border-earth-100 dark:border-earth-800 shadow-sm flex-1 min-h-[400px]">
                <div className="flex justify-between items-center mb-10 px-4">
                    <div>
                        <h4 className="font-bold text-lg text-earth-900 dark:text-white uppercase tracking-tight">Predictive Sensitivity Analysis</h4>
                        <p className="text-xs text-earth-400 mt-1">Impact of Dn variation on regional m(t) constant.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-agro-600 shadow-[0_0_10px_#16a34a]"></div>
                        <span className="text-[10px] font-black text-agro-600 uppercase tracking-widest">m(t) Trend</span>
                    </div>
                </div>
                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData}>
                            <defs>
                                <linearGradient id="gradCalcM" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
                            <XAxis dataKey="dn" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dx={-10} />
                            <Tooltip 
                                cursor={{ stroke: '#16a34a', strokeWidth: 1, strokeDasharray: '4 4' }}
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.95)', fontSize: '12px' }}
                                itemStyle={{ fontWeight: 900, textTransform: 'uppercase', color: '#16a34a' }}
                            />
                            <Area type="monotone" dataKey="m" stroke="#16a34a" strokeWidth={5} fill="url(#gradCalcM)" animationDuration={1000} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="p-8 bg-earth-50 dark:bg-earth-900/50 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white dark:bg-earth-800 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm"><Database size={24}/></div>
                    <div>
                        <p className="text-[10px] font-black uppercase text-earth-400 mb-1">Global Registry Sync</p>
                        <p className="text-sm font-bold text-earth-900 dark:text-white">Push simulated scenario to Node Registry?</p>
                    </div>
                </div>
                <button className="flex items-center gap-3 bg-earth-900 dark:bg-white text-white dark:text-earth-900 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                    Deploy Scenario <ArrowRight size={16} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
