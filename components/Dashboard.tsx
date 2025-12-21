import React, { useState, useMemo } from 'react';
import { 
  Users, Factory, Leaf, ShieldPlus, Cpu, Activity, TrendingUp,
  BrainCircuit, RefreshCcw, LayoutDashboard, Database, Globe2, Zap, AlertTriangle, 
  BarChart3, HelpCircle, ShieldCheck, Search, Filter, ArrowRight, Layers,
  CloudSun, Droplets, TrendingDown, Cloud, Fingerprint, Award, Binary,
  Network, Server, ShieldAlert
} from 'lucide-react';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis,
  BarChart, Bar
} from 'recharts';
import { View } from '../types';

interface DashboardProps {
    onNavigate: (view: View) => void;
}

const RADAR_DATA = [
  { subject: 'Social', A: 82, fullMark: 100 },
  { subject: 'Environment', A: 88, fullMark: 100 },
  { subject: 'Health', A: 65, fullMark: 100 },
  { subject: 'Technical', A: 78, fullMark: 100 },
  { subject: 'Industrial', A: 54, fullMark: 100 },
];

const TREND_DATA = [
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
  const [isPredictive, setIsPredictive] = useState(true);
  const [chartMetric, setChartMetric] = useState<'resilience' | 'yield' | 'carbon' | 'workers'>('resilience');

  const liveLogs = [
      { id: 1, node: "Nairobi-04", event: "Cloud Registry Sync", time: "2m ago", status: "Success", thrust: "SA" },
      { id: 2, node: "Lagos-Hub", event: "Professional Audit", time: "12m ago", status: "Pending", thrust: "IA" },
      { id: 3, node: "Kiriaini-Primary", event: "m(t) Validation", time: "45m ago", status: "Success", thrust: "TA" },
      { id: 4, node: "Delta-Logistics", event: "Batch Verification", time: "1h ago", status: "Warning", thrust: "IA" },
  ];

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
                        <Activity size={12} className="text-agro-600" /> Organizational Resilience Engine
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                        Analytics <span className="text-blue-600 italic">Terminal</span>
                    </h1>
                </div>

                <div className="flex flex-wrap items-center gap-3">
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
                    <div className="nature-gradient rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden group">
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
                                    <AreaChart data={TREND_DATA}>
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
                        <div className="ea-card p-10 flex-1">
                            <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3"><Activity size={22} className="text-agro-600" /> Operational Feed</h3>
                            <div className="space-y-6">
                                {liveLogs.map((log) => (
                                    <div key={log.id} className="flex items-center gap-5 p-4 bg-earth-50 dark:bg-earth-800/40 rounded-2xl border border-transparent hover:border-earth-100 transition-all group">
                                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-earth-700 flex items-center justify-center font-black text-[9px] shadow-sm shrink-0">{log.thrust}</div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{log.event}</h4>
                                            <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-widest">{log.node} • {log.time}</p>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-agro-500 shadow-[0_0_8px_#22c55e]"></div>
                                    </div>
                                ))}
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

                <div className="grid lg:grid-cols-12 gap-8 mb-12">
                    <div className="lg:col-span-8">
                        <div className="ea-card p-10">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">Cloud Registration Velocity</h3>
                                    <p className="text-xs text-earth-400 font-medium mt-1">Industrial talent growth over Q1-Q2 cycle</p>
                                </div>
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600">
                                    <TrendingUp size={24} />
                                </div>
                            </div>
                            <div className="h-[350px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={TREND_DATA}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                                        <Tooltip cursor={{fill: 'rgba(59, 130, 246, 0.05)'}} contentStyle={{ borderRadius: '16px', border: 'none', background: 'rgba(255,255,255,0.98)' }} />
                                        <Bar dataKey="workers" name="Verified Professionals" radius={[8, 8, 0, 0]}>
                                            {TREND_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={index === TREND_DATA.length - 1 ? '#3b82f6' : '#93c5fd'} />)}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-4 flex flex-col gap-8">
                        <div className="ea-card p-10 flex-1">
                            <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-8">Professional Mix</h3>
                            <div className="h-[250px] w-full mb-8">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={PROFESSIONAL_TIERS} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={8} dataKey="value" stroke="none">
                                            {PROFESSIONAL_TIERS.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-4">
                                {PROFESSIONAL_TIERS.map((tier) => (
                                    <div key={tier.name} className="flex items-center justify-between p-3 bg-earth-50 dark:bg-earth-800/50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: tier.fill}}></div>
                                            <span className="text-[10px] font-black uppercase text-earth-600 dark:text-earth-400">{tier.name}</span>
                                        </div>
                                        <span className="text-xs font-black text-slate-900 dark:text-white">{tier.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden border border-white/10 shadow-2xl">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-blue-400 pointer-events-none"><Server size={300} /></div>
                    <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
                        <div className="lg:col-span-8">
                            <div className="flex items-center gap-3 text-blue-400 font-black uppercase tracking-[0.4em] text-[9px] mb-6">
                                <Binary size={14} /> CLOUD_ANALYTICS_PAYLOAD
                            </div>
                            <h3 className="text-4xl font-serif font-bold mb-6 tracking-tight">The Value Chain Linkage</h3>
                            <p className="text-slate-400 text-lg leading-relaxed font-medium mb-10 max-w-2xl">
                                Registrations in the Agro Workers Cloud directly boost the <span className="text-agro-400 font-black">Industrial C(a) score</span> by providing verified professional oversight for industrial processing batches.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-4 group hover:bg-white/10 transition-all cursor-default">
                                    <ShieldCheck className="text-agro-500" size={20} />
                                    <div>
                                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Audit Chain</p>
                                        <p className="text-xs font-bold">100% TRACEABLE</p>
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-4 group hover:bg-white/10 transition-all cursor-default">
                                    <Network className="text-blue-500" size={20} />
                                    <div>
                                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Node Synergy</p>
                                        <p className="text-xs font-bold">HIGH_FIDELITY</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-4 flex flex-col items-center">
                            <button onClick={() => onNavigate(View.AGRO_WORKERS_CLOUD)} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-[2rem] text-xs uppercase tracking-[0.3em] shadow-xl shadow-blue-600/30 flex items-center justify-center gap-4 active:scale-95 transition-all">
                                <Cloud size={24} /> Enter Worker Hub
                            </button>
                        </div>
                    </div>
                </div>
           </div>
       )}
       
       <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-earth-300 dark:text-earth-700">
           <div className="flex items-center gap-10">
               <span className="flex items-center gap-3"><ShieldAlert size={14} className="text-blue-600" /> Data sovereignty verified</span>
               <span className="flex items-center gap-3"><Database size={14} className="text-agro-600" /> node sync stable</span>
           </div>
           <p>SYSTEM REVISION v4.2.2-ANALYTICS</p>
       </div>
    </div>
  );
};
