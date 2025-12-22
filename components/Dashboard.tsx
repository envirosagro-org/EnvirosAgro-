import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, Factory, Leaf, ShieldPlus, Cpu, Activity, TrendingUp,
  BrainCircuit, RefreshCcw, LayoutDashboard, Database, Globe2, Zap, AlertTriangle, 
  BarChart3, HelpCircle, ShieldCheck, Search, Filter, ArrowRight, Layers,
  CloudSun, Droplets, TrendingDown, Cloud, Fingerprint, Award, Binary,
  Network, Server, ShieldAlert, Sparkles, Loader2
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';
import { View } from '../types';

interface DashboardProps {
    onNavigate: (view: View) => void;
}

const INITIAL_TREND_DATA = [
  { month: 'Jan', resilience: 2.4, yield: 45, carbon: 1.2, workers: 850 },
  { month: 'Feb', resilience: 2.8, yield: 52, carbon: 2.1, workers: 1200 },
  { month: 'Mar', resilience: 3.1, yield: 48, carbon: 1.8, workers: 1800 },
  { month: 'Apr', resilience: 3.5, yield: 62, carbon: 3.5, workers: 2400 },
  { month: 'May', resilience: 4.2, yield: 75, carbon: 4.2, workers: 3800 },
  { month: 'Jun', resilience: 4.8, yield: 88, carbon: 5.8, workers: 5200 },
];

const PROFESSIONAL_TIERS = [
  { name: 'Technical Specialist', value: 45, fill: '#3b82f6' },
  { name: 'Core Practitioner', value: 35, fill: '#16a34a' },
  { name: 'Scientific Researcher', value: 20, fill: '#9333ea' },
];

const NETWORK_HEALTH = [
  { name: 'Optimal', value: 85, fill: '#16a34a' },
  { name: 'Critical', value: 15, fill: '#f1f5f9' },
];

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'RESILIENCE' | 'PROFESSIONAL'>('RESILIENCE');
  const [chartMetric, setChartMetric] = useState<'resilience' | 'yield' | 'carbon' | 'workers'>('resilience');
  const [isLivePulse, setIsLivePulse] = useState(false);
  const [dynamicTrend, setDynamicTrend] = useState(INITIAL_TREND_DATA);

  useEffect(() => {
    let interval: any;
    if (isLivePulse) {
      interval = setInterval(() => {
        setDynamicTrend(prev => prev.map(item => ({
          ...item,
          [chartMetric]: item[chartMetric as keyof typeof item] as number * (1 + (Math.random() * 0.04 - 0.02))
        })));
      }, 2000);
    } else {
      setDynamicTrend(INITIAL_TREND_DATA);
    }
    return () => clearInterval(interval);
  }, [isLivePulse, chartMetric]);

  const metricConfig = useMemo(() => {
    switch(chartMetric) {
        case 'yield': return { key: 'yield', color: '#3b82f6', label: 'Verified Yield' };
        case 'carbon': return { key: 'carbon', color: '#0ea5e9', label: 'Carbon Seq' };
        case 'workers': return { key: 'workers', color: '#6366f1', label: 'Registered Professionals' };
        default: return { key: 'resilience', color: '#16a34a', label: 'Verified Resilience' };
    }
  }, [chartMetric]);

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-6 min-h-screen animate-in fade-in duration-700">
       
       <div className="ea-header-block p-4 md:p-8 mb-6 bg-slate-900/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 relative z-10">
                <div className="flex-1">
                    <div className="ea-label-meta mb-2">
                        <Activity size={12} className="text-agro-600" /> Integrated Resilience Engine
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                        Analytics <span className="text-blue-600 italic">Terminal</span>
                    </h1>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button 
                      onClick={() => setIsLivePulse(!isLivePulse)}
                      className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${isLivePulse ? 'bg-red-600 text-white shadow-glow-red animate-pulse' : 'bg-slate-900 text-slate-400'}`}
                    >
                       {isLivePulse ? <Loader2 size={14} className="animate-spin" /> : <Activity size={14} />}
                       {isLivePulse ? 'Live Pulse Active' : 'Enable Live Pulse'}
                    </button>
                    <button 
                      onClick={() => onNavigate(View.FUTURE_VISION)}
                      className="bg-purple-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-purple-600/20 hover:scale-105 active:scale-95 transition-all"
                    >
                       <Sparkles size={14} fill="currentColor" /> Future Vision Lab
                    </button>
                    <div className="agro-glass p-1.5 rounded-2xl flex gap-1 border border-earth-200 dark:border-white/5 backdrop-blur-xl shadow-sm">
                        <button 
                            onClick={() => { setActiveTab('RESILIENCE'); setChartMetric('resilience'); }}
                            className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'RESILIENCE' ? 'bg-white dark:bg-earth-700 shadow-sm text-agro-700 dark:text-white' : 'text-earth-400 hover:text-earth-800'}`}
                        >
                           <Zap size={14} /> System Resilience
                        </button>
                        <button 
                            onClick={() => { setActiveTab('PROFESSIONAL'); setChartMetric('workers'); }}
                            className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'PROFESSIONAL' ? 'bg-white dark:bg-earth-700 shadow-sm text-blue-700 dark:text-white' : 'text-earth-400 hover:text-earth-800'}`}
                        >
                           <Cloud size={14} /> Workers Cloud
                        </button>
                    </div>
                </div>
            </div>
       </div>

       {activeTab === 'RESILIENCE' ? (
           <div className="animate-in slide-in-from-left-4 duration-500">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="nature-impact-gradient rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Globe2 size={100} /></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-agro-200">Resilience m(t)</span>
                        <div className="text-5xl font-serif font-bold my-2 tracking-tighter">8.54</div>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-[9px] font-black">+12.4% CALIBRATION</span>
                    </div>
                    <div className="ea-card p-8 group">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-earth-400 block mb-3">Industrial C(a)</span>
                        <div className="text-5xl font-serif font-bold text-slate-900 dark:text-white mb-2 tracking-tighter">4.28</div>
                        <p className="text-[9px] text-agro-600 font-black flex items-center gap-2 uppercase tracking-widest"><Zap size={14} fill="currentColor" className="text-amber-500" /> OPTIMAL FLOW</p>
                    </div>
                    <div className="ea-card p-8 flex items-center gap-6">
                        <div className="w-20 h-20 relative shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={NETWORK_HEALTH} cx="50%" cy="50%" innerRadius={30} outerRadius={38} startAngle={180} endAngle={0} dataKey="value" stroke="none">
                                        {NETWORK_HEALTH.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center pt-3"><span className="text-sm font-black text-slate-900 dark:text-white">92%</span></div>
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-earth-400 block mb-1">Network Sync</span>
                            <div className="text-lg font-black text-slate-900 dark:text-white tracking-tight uppercase">EXCELLENT</div>
                        </div>
                    </div>
                    <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group border border-white/5 shadow-2xl">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 block mb-3">Avg Water index</span>
                        <div className="text-5xl font-serif font-bold text-white mb-2 tracking-tighter">72.4%</div>
                        <p className="text-[9px] text-blue-400 font-black flex items-center gap-2 uppercase tracking-widest"><Droplets size={14} fill="currentColor" /> SEASON PEAK</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-12">
                    <div className="lg:col-span-8">
                        <div className="ea-card p-10 h-full">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                                <div><h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">Performance Matrix</h3></div>
                                <div className="flex bg-earth-50 dark:bg-earth-900/50 p-1 rounded-2xl border border-earth-100 dark:border-earth-800">
                                    {['resilience', 'yield', 'carbon'].map(m => (
                                        <button key={m} onClick={() => setChartMetric(m as any)} className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${chartMetric === m ? 'bg-white dark:bg-earth-700 text-slate-900 dark:text-white shadow-sm' : 'text-earth-400 hover:text-earth-600'}`}>
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="h-[350px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={dynamicTrend}>
                                        <defs>
                                            <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={metricConfig.color} stopOpacity={0.2}/><stop offset="95%" stopColor={metricConfig.color} stopOpacity={0}/></linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} dy={15} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dx={-15} />
                                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.98)', fontSize: '11px' }} />
                                        <Area type="monotone" dataKey={metricConfig.key} name={metricConfig.label} stroke={metricConfig.color} strokeWidth={4} fillOpacity={1} fill="url(#colorMain)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-4 flex flex-col gap-8">
                        <div 
                          onClick={() => onNavigate(View.FUTURE_VISION)}
                          className="bg-purple-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group cursor-pointer border-4 border-purple-800/40 hover:scale-[1.02] transition-all"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Sparkles size={200} /></div>
                            <div className="relative z-10">
                               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-300 mb-6 block">Strategic Prediction</span>
                               <h3 className="text-3xl font-serif font-bold mb-4 leading-tight">AI Future Vision Lab</h3>
                               <p className="text-purple-200 text-sm mb-10 leading-relaxed font-medium">Generate architectural projections of your localized resilience deltas using generative neural networks.</p>
                               <button className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white border-b-2 border-white/20 pb-1 group-hover:gap-6 transition-all">
                                  Access Vision Node <ArrowRight size={18} />
                               </button>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
       ) : (
           <div className="animate-in slide-in-from-right-4 duration-500">
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><Cloud size={120} /></div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-200 mb-4">Total Registered Nodes</p>
                            <div className="text-6xl font-serif font-bold mb-4 tracking-tighter">5,240</div>
                            <div className="flex items-center gap-3">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-[9px] font-black uppercase">Live Registry</span>
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="ea-card p-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-400 mb-4">Verification Throughput</p>
                        <div className="text-6xl font-serif font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">98.2%</div>
                        <p className="text-[9px] text-blue-600 font-black uppercase tracking-widest flex items-center gap-2"><ShieldCheck size={14} /> ESIN_SYNC_SECURED</p>
                    </div>
                    <div className="bg-agro-900 rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10"><Award size={120} /></div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-agro-300 mb-4">Ethical Compliance Index</p>
                        <div className="text-6xl font-serif font-bold mb-4 tracking-tighter">A+</div>
                        <p className="text-[9px] text-agro-400 font-black uppercase tracking-widest">CONDUCT_PROTOCOL_V4.2</p>
                    </div>
                </div>
           </div>
       )}
    </div>
  );
};