import React, { useState, useMemo } from 'react';
import { 
  Users, Factory, Leaf, ShieldPlus, Cpu, Activity, TrendingUp,
  BrainCircuit, RefreshCcw, LayoutDashboard, Database, Globe2, Zap, AlertTriangle, 
  BarChart3, HelpCircle, ShieldCheck, Search, Filter, ArrowRight, Layers,
  CloudSun, Droplets, TrendingDown
} from 'lucide-react';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis
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
  { month: 'Jan', resilience: 2.4, yield: 45, carbon: 1.2, predRes: 2.4, predYield: 45, predCarbon: 1.2 },
  { month: 'Feb', resilience: 2.8, yield: 52, carbon: 2.1, predRes: 2.8, predYield: 52, predCarbon: 2.1 },
  { month: 'Mar', resilience: 3.1, yield: 48, carbon: 1.8, predRes: 3.1, predYield: 48, predCarbon: 1.8 },
  { month: 'Apr', resilience: 3.5, yield: 62, carbon: 3.5, predRes: 3.5, predYield: 62, predCarbon: 3.5 },
  { month: 'May', resilience: 4.2, yield: 75, carbon: 4.2, predRes: 4.2, predYield: 75, predCarbon: 4.2 },
  { month: 'Jun', resilience: 4.8, yield: 88, carbon: 5.8, predRes: 4.8, predYield: 88, predCarbon: 5.8 },
  { month: 'Jul', resilience: 5.1, yield: 92, carbon: 6.2, predRes: 5.4, predYield: 95, predCarbon: 6.5 },
  { month: 'Aug', resilience: null, yield: null, carbon: null, predRes: 6.2, predYield: 110, predCarbon: 7.2 },
  { month: 'Sep', resilience: null, yield: null, carbon: null, predRes: 7.1, predYield: 125, predCarbon: 8.4 },
];

const NETWORK_HEALTH = [
  { name: 'Optimal', value: 85, fill: '#16a34a' },
  { name: 'Critical', value: 15, fill: '#f1f5f9' },
];

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [isPredictive, setIsPredictive] = useState(true);
  const [chartMetric, setChartMetric] = useState<'resilience' | 'yield' | 'carbon'>('resilience');

  const liveLogs = [
      { id: 1, node: "Nairobi-04", event: "Soil Calibration", time: "2m ago", status: "Success", thrust: "TA" },
      { id: 2, node: "Lagos-Hub", event: "Carbon Audit", time: "12m ago", status: "Pending", thrust: "EA" },
      { id: 3, node: "Kiriaini-Primary", event: "Grant Disbursement", time: "45m ago", status: "Success", thrust: "SA" },
      { id: 4, node: "Delta-Logistics", event: "Fleet Optimization", time: "1h ago", status: "Warning", thrust: "IA" },
      { id: 5, node: "Arid-Sector-B", event: "Water Sink Sync", time: "2h ago", status: "Success", thrust: "EA" },
      { id: 6, node: "Urban-Farm-Node", event: "Yield Audit", time: "3h ago", status: "Success", thrust: "TA" }
  ];

  const metricConfig = useMemo(() => {
    switch(chartMetric) {
        case 'yield': return { 
            mainKey: 'yield', 
            predKey: 'predYield', 
            color: '#3b82f6', 
            label: 'Verified Yield (Tons)', 
            predLabel: 'AI Yield Forecast' 
        };
        case 'carbon': return { 
            mainKey: 'carbon', 
            predKey: 'predCarbon', 
            color: '#0ea5e9', 
            label: 'Carbon Seq (Tons)', 
            predLabel: 'AI Carbon Forecast' 
        };
        default: return { 
            mainKey: 'resilience', 
            predKey: 'predRes', 
            color: '#16a34a', 
            label: 'Verified Resilience', 
            predLabel: 'AI Resilience Forecast' 
        };
    }
  }, [chartMetric]);

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-6 min-h-screen animate-in fade-in duration-700">
       
       <div className="ea-header-block p-4 md:p-6 mb-6">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
                <div className="flex-1">
                    <div className="ea-label mb-1">
                        <LayoutDashboard size={12} /> Global Resilience Monitor
                    </div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                    Impact Dashboard
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium max-w-2xl">Real-time telemetry synchronized with m(t) benchmarks.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto relative z-10">
                    <div className="relative group flex-1 md:flex-none">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-agro-600 transition-colors" size={14} />
                        <input 
                            type="text" 
                            placeholder="Search node..."
                            className="pl-9 pr-4 py-2 bg-white/60 dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-xl w-full md:w-56 shadow-sm focus:ring-4 focus:ring-agro-500/10 focus:border-agro-500 transition-all outline-none text-xs"
                        />
                    </div>
                    
                    <button 
                        onClick={() => setIsPredictive(!isPredictive)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all border ${
                            isPredictive 
                            ? 'bg-purple-600 text-white border-purple-500' 
                            : 'bg-white/80 dark:bg-earth-900 text-slate-600 dark:text-slate-300 border-earth-100 dark:border-earth-800'
                        }`}
                    >
                        <BrainCircuit size={14} className={isPredictive ? 'animate-pulse' : ''} />
                        {isPredictive ? 'AI Active' : 'AI Forecast'}
                    </button>
                </div>
            </div>
       </div>

       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="nature-gradient rounded-[1.5rem] p-5 text-white shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <Globe2 size={60} />
              </div>
              <div className="relative z-10">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-agro-200">Resilience m(t)</span>
                  <div className="text-3xl font-serif font-bold my-1 tracking-tighter">8.54</div>
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-[8px] font-black">+12.4%</span>
              </div>
          </div>

          <div className="ea-card p-5 relative group overflow-hidden">
              <div className="relative z-10">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-2">Maturity C(a)</span>
                  <div className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-1 tracking-tighter">4.28</div>
                  <p className="text-[8px] text-agro-600 dark:text-agro-400 flex items-center gap-1 font-black uppercase">
                      <Zap size={12} fill="currentColor" className="text-amber-500" /> Optimal Flow
                  </p>
              </div>
          </div>

          <div className="ea-card p-5 flex items-center gap-4 relative group overflow-hidden">
             <div className="w-14 h-14 relative shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={NETWORK_HEALTH} cx="50%" cy="50%" innerRadius={20} outerRadius={26} startAngle={180} endAngle={0} dataKey="value" stroke="none">
                            {NETWORK_HEALTH.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pt-2">
                    <span className="text-xs font-black text-slate-900 dark:text-white">92%</span>
                </div>
             </div>
             <div>
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 block">Sync Health</span>
                <div className="text-sm font-black text-slate-900 dark:text-white tracking-tight uppercase">EXCELLENT</div>
             </div>
          </div>

          <div className="bg-slate-950 rounded-[1.5rem] p-5 text-white relative overflow-hidden group">
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 block mb-2">Avg Water index</span>
              <div className="text-3xl font-serif font-bold text-white mb-1 tracking-tighter">72.4%</div>
              <p className="text-[8px] text-blue-400 font-black flex items-center gap-1 uppercase">
                  <Droplets size={12} fill="currentColor" /> Season Peak
              </p>
          </div>
       </div>

       <div className="grid lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-8">
              <div className="ea-card p-6 h-full">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
                      <div>
                          <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white tracking-tight">Impact Performance</h3>
                      </div>
                      <div className="flex agro-glass p-1 rounded-xl border border-earth-100 dark:border-white/10 backdrop-blur-xl">
                          {['resilience', 'yield', 'carbon'].map(m => (
                            <button 
                                key={m}
                                onClick={() => setChartMetric(m as any)}
                                className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${chartMetric === m ? 'bg-white dark:bg-earth-700 text-slate-900 dark:text-white shadow-sm' : 'text-earth-400'}`}>
                                {m}
                            </button>
                          ))}
                      </div>
                  </div>
                  
                  <div className="h-[280px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={TREND_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                              <defs>
                                  <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor={metricConfig.color} stopOpacity={0.2}/>
                                      <stop offset="95%" stopColor={metricConfig.color} stopOpacity={0}/>
                                  </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
                              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9, fontWeight: 800}} dy={10} />
                              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9}} dx={-10} />
                              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.98)', fontSize: '10px' }} itemStyle={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '8px' }} />
                              <Area type="monotone" dataKey={metricConfig.mainKey} name={metricConfig.label} stroke={metricConfig.color} strokeWidth={3} fillOpacity={1} fill="url(#colorMain)" />
                              {isPredictive && <Area type="monotone" dataKey={metricConfig.predKey} name={metricConfig.predLabel} stroke="#9333ea" strokeWidth={3} strokeDasharray="6 6" fill="none" />}
                          </AreaChart>
                      </ResponsiveContainer>
                  </div>
              </div>
          </div>

          <div className="lg:col-span-4 flex flex-col">
              <div className="ea-card flex-1 flex flex-col min-h-0">
                  <div className="p-5 border-b border-earth-50 dark:border-earth-800 flex justify-between items-center bg-earth-50/20 dark:bg-earth-900/20 shrink-0">
                      <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <Activity size={18} className="text-agro-600" /> Live Feed
                      </h3>
                      <span className="text-[8px] font-black text-agro-600 bg-agro-50 dark:bg-agro-900/30 px-2 py-0.5 rounded-full border border-agro-100 uppercase">Synced</span>
                  </div>
                  
                  <div className="flex-1 ea-scroll-container p-4 space-y-3 max-h-[300px]">
                      {liveLogs.map((log) => (
                          <div key={log.id} className="p-3 bg-earth-50 dark:bg-earth-800/40 rounded-xl border border-transparent hover:border-earth-100 dark:hover:border-earth-700 transition-all group flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-[8px] shadow-inner shrink-0 ${
                                  log.thrust === 'SA' ? 'bg-rose-100 text-rose-600' :
                                  log.thrust === 'EA' ? 'bg-green-100 text-green-600' :
                                  log.thrust === 'TA' ? 'bg-blue-100 text-blue-600' :
                                  'bg-slate-200 text-slate-600'
                              }`}>
                                  {log.thrust}
                              </div>
                              <div className="flex-1 min-w-0">
                                  <h4 className="text-[11px] font-bold text-slate-900 dark:text-white truncate tracking-tight">{log.event}</h4>
                                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{log.node} • {log.time}</p>
                              </div>
                              <div className="w-1 h-1 rounded-full bg-agro-500"></div>
                          </div>
                      ))}
                      <button className="w-full py-2 text-[8px] font-black text-earth-400 hover:text-agro-600 transition-colors uppercase tracking-widest border-t border-earth-100 dark:border-earth-800 pt-3 mt-1">
                        View More history
                      </button>
                  </div>
              </div>
          </div>
       </div>
    </div>
  );
};