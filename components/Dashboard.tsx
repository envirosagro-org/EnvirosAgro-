import React, { useState, useMemo } from 'react';
import { 
  Users, Factory, Leaf, ShieldPlus, Cpu, ArrowUpRight, Signal, CloudSun, Wind, Droplets, Activity, TrendingUp,
  BrainCircuit, Sparkles, RefreshCcw, Info, LayoutDashboard, Database, Globe2, Zap, AlertTriangle, 
  BarChart3, HelpCircle, ShieldCheck, Gauge, Search, Filter, ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, Scatter, ZAxis,
  PieChart, Pie, Cell
} from 'recharts';
import { View } from '../types';

interface DashboardProps {
    onNavigate: (view: View) => void;
}

// Data Synthesized from the Five Thrusts Framework
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

const CONSTRAINT_MATRIX = [
    { name: 'Technology', impact: 45, independence: 20, z: 45, color: '#3b82f6', label: 'Actionable' },
    { name: 'Know-How', impact: 50, independence: 35, z: 50, color: '#ec4899', label: 'Actionable' },
    { name: 'Policy', impact: 35, independence: 25, z: 35, color: '#64748b', label: 'Actionable' },
    { name: 'Climate', impact: 98, independence: 95, z: 120, color: '#ef4444', label: 'Fundamental' },
    { name: 'Demographics', impact: 85, independence: 82, z: 90, color: '#f59e0b', label: 'Fundamental' },
];

const NETWORK_HEALTH = [
  { name: 'Optimal', value: 85, fill: '#16a34a' },
  { name: 'Critical', value: 15, fill: '#f1f5f9' },
];

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [isPredictive, setIsPredictive] = useState(true);
  const [activeThrust, setActiveThrust] = useState('ALL');
  const [chartMetric, setChartMetric] = useState<'resilience' | 'yield' | 'carbon'>('resilience');

  const thrustCards = [
      { id: 'SA', icon: <Users size={18} />, title: "Social", color: "rose", score: "82%", m: "3.4" },
      { id: 'EA', icon: <Leaf size={18} />, title: "Environment", color: "green", score: "88%", m: "4.1" },
      { id: 'HA', icon: <ShieldPlus size={18} />, title: "Health", color: "red", score: "65%", m: "2.8" },
      { id: 'TA', icon: <Cpu size={18} />, title: "Technical", color: "blue", score: "78%", m: "3.9" },
      { id: 'IA', icon: <Factory size={18} />, title: "Industrial", color: "slate", score: "54%", m: "2.1" }
  ];

  const liveLogs = [
      { id: 1, node: "Nairobi-04", event: "Soil Calibration", time: "2m ago", status: "Success", thrust: "TA" },
      { id: 2, node: "Lagos-Hub", event: "Carbon Audit", time: "12m ago", status: "Pending", thrust: "EA" },
      { id: 3, node: "Kiriaini-Primary", event: "Grant Disbursement", time: "45m ago", status: "Success", thrust: "SA" },
      { id: 4, node: "Delta-Logistics", event: "Fleet Optimization", time: "1h ago", status: "Warning", thrust: "IA" }
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
    <div className="max-w-[1600px] mx-auto px-6 py-10 min-h-screen">
       
       {/* Top Utility Bar */}
       <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-12 animate-in fade-in duration-700">
          <div className="flex-1">
            <div className="flex items-center gap-3 text-agro-600 dark:text-agro-400 font-black uppercase tracking-[0.3em] text-[10px] mb-3">
                <LayoutDashboard size={14} /> Global Resilience Monitor
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
               Impact Dashboard <span className="text-slate-300 dark:text-slate-700 font-light ml-2">v4.0</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">Real-time telemetry from across the EnvirosAgro network.</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
             <div className="relative group flex-1 md:flex-none">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-agro-600 transition-colors" size={18} />
                <input 
                    type="text" 
                    placeholder="Search node or region..."
                    className="pl-12 pr-6 py-3.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl w-full md:w-80 shadow-sm focus:ring-4 focus:ring-agro-500/10 transition-all outline-none"
                />
             </div>
             
             <button 
                onClick={() => setIsPredictive(!isPredictive)}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${
                    isPredictive 
                    ? 'bg-purple-600 text-white border-purple-500 shadow-xl shadow-purple-600/20' 
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-800 hover:border-purple-200'
                }`}
             >
                <BrainCircuit size={18} className={isPredictive ? 'animate-pulse' : ''} />
                {isPredictive ? 'AI Forecast Active' : 'Enable AI Predictions'}
             </button>
             
             <button className="p-3.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-agro-600 hover:border-agro-100 transition-all shadow-sm">
                <RefreshCcw size={20} />
             </button>
          </div>
       </div>

       {/* Key Performance Indicators */}
       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Aggregate Resilience */}
          <div className="bg-gradient-to-br from-agro-600 to-agro-800 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Globe2 size={120} />
              </div>
              <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-agro-200">Global Resilience m(t)</span>
                    <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/20">
                        <TrendingUp size={18} />
                    </div>
                  </div>
                  <div className="text-5xl font-serif font-bold mb-2">8.54</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-agro-100">
                     <span className="bg-white/20 px-2 py-0.5 rounded-full">+12.4%</span>
                     <span>vs Last Harvest</span>
                  </div>
              </div>
          </div>

          {/* Sustainability Coefficient */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700 text-blue-600">
                  <Database size={120} />
              </div>
              <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-8">Network Maturity C(a)</span>
                  <div className="text-5xl font-serif font-bold text-slate-900 dark:text-white mb-2">4.28</div>
                  <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                      <Zap size={14} className="text-amber-500" /> Optimal Resource Flow
                  </p>
              </div>
          </div>

          {/* Network Health Gauge */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-6 relative group overflow-hidden">
             <div className="w-24 h-24 relative shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={NETWORK_HEALTH}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={40}
                            startAngle={180}
                            endAngle={0}
                            dataKey="value"
                        >
                            {NETWORK_HEALTH.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pt-4">
                    <span className="text-lg font-bold text-slate-900 dark:text-white">92%</span>
                </div>
             </div>
             <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1">Sync Health</span>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">EXCELLENT</div>
                <p className="text-xs text-agro-600 font-bold mt-1 uppercase tracking-tighter">15k Active Nodes</p>
             </div>
          </div>

          {/* Regional Efficiency */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <CloudSun size={120} />
              </div>
              <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-8">Avg Water Retention (In)</span>
                  <div className="text-4xl font-serif font-bold text-white mb-2">72.4%</div>
                  <p className="text-xs text-blue-400 font-bold flex items-center gap-1 uppercase tracking-widest">
                      <Droplets size={14} /> Season Peak
                  </p>
              </div>
          </div>
       </div>

       {/* Middle Section: Trends & Strategy */}
       <div className="grid lg:grid-cols-12 gap-8 mb-12">
          {/* Main Chart Area */}
          <div className="lg:col-span-8 space-y-8">
              {/* Resilience Trend */}
              <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                      <div>
                          <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">Impact Performance</h3>
                          <p className="text-slate-500 text-sm mt-1">Cross-referencing verified {chartMetric} history with AI projections.</p>
                      </div>
                      <div className="flex bg-slate-50 dark:bg-slate-800 p-1 rounded-xl border border-slate-100 dark:border-slate-700">
                          <button 
                            onClick={() => setChartMetric('resilience')}
                            className={`px-4 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${chartMetric === 'resilience' ? 'bg-white dark:bg-slate-900 text-agro-600 shadow-sm border border-slate-100 dark:border-slate-800' : 'text-slate-400'}`}>
                            History
                          </button>
                          <button 
                            onClick={() => setChartMetric('yield')}
                            className={`px-4 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${chartMetric === 'yield' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm border border-slate-100 dark:border-slate-800' : 'text-slate-400'}`}>
                            Yield
                          </button>
                          <button 
                            onClick={() => setChartMetric('carbon')}
                            className={`px-4 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${chartMetric === 'carbon' ? 'bg-white dark:bg-slate-900 text-sky-600 shadow-sm border border-slate-100 dark:border-slate-800' : 'text-slate-400'}`}>
                            Carbon
                          </button>
                      </div>
                  </div>
                  
                  <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={TREND_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                              <defs>
                                  <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor={metricConfig.color} stopOpacity={0.2}/>
                                      <stop offset="95%" stopColor={metricConfig.color} stopOpacity={0}/>
                                  </linearGradient>
                                  <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#9333ea" stopOpacity={0.2}/>
                                      <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                                  </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:opacity-5" />
                              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={15} />
                              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-15} />
                              <Tooltip 
                                contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.95)', padding: '20px' }} 
                                itemStyle={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '10px' }}
                              />
                              <Area 
                                type="monotone" 
                                dataKey={metricConfig.mainKey} 
                                name={metricConfig.label} 
                                stroke={metricConfig.color} 
                                strokeWidth={4} 
                                fillOpacity={1} 
                                fill="url(#colorMain)" 
                              />
                              {isPredictive && (
                                  <Area 
                                    type="monotone" 
                                    dataKey={metricConfig.predKey} 
                                    name={metricConfig.predLabel} 
                                    stroke="#9333ea" 
                                    strokeWidth={4} 
                                    strokeDasharray="10 10" 
                                    fillOpacity={1} 
                                    fill="url(#colorPred)" 
                                  />
                              )}
                          </AreaChart>
                      </ResponsiveContainer>
                  </div>
              </div>

              {/* Constraint Matrix - Enhanced */}
              <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                      <Zap size={200} />
                  </div>
                  <div className="flex justify-between items-start mb-10 relative z-10">
                      <div>
                          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-2">
                             <AlertTriangle size={14} /> Fundamental Constraints Analysis
                          </div>
                          <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">Independence vs. Impact Correlation</h3>
                      </div>
                      <button className="p-3 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-agro-600 transition-all shadow-inner">
                          <HelpCircle size={20} />
                      </button>
                  </div>

                  <div className="h-[450px] w-full bg-slate-50/50 dark:bg-slate-950/50 rounded-[3rem] p-10 relative">
                      {/* Quadrant Markers */}
                      <div className="absolute top-10 right-10 text-[9px] font-black text-red-400 uppercase tracking-widest text-right">Fundamental<br/>Constraints</div>
                      <div className="absolute bottom-10 left-10 text-[9px] font-black text-blue-400 uppercase tracking-widest">Optimizable<br/>Variables</div>
                      
                      <ResponsiveContainer width="100%" height="100%">
                          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                              <XAxis type="number" dataKey="independence" hide />
                              <YAxis type="number" dataKey="impact" hide />
                              <ZAxis type="number" dataKey="z" range={[500, 3000]} />
                              <Tooltip 
                                  cursor={{ strokeDasharray: '3 3' }}
                                  content={({ active, payload }) => {
                                      if (active && payload && payload.length) {
                                          const data = payload[0].payload;
                                          return (
                                              <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 min-w-[200px] animate-in zoom-in-95">
                                                  <h5 className="font-black text-slate-900 dark:text-white text-lg mb-1">{data.name}</h5>
                                                  <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-4">{data.label} Priority</p>
                                                  <div className="space-y-2">
                                                      <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                                          <span className="text-slate-400">Impact:</span>
                                                          <span className="text-red-500">{data.impact}%</span>
                                                      </div>
                                                      <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                                          <span className="text-slate-400">Independence:</span>
                                                          <span className="text-blue-500">{data.independence}%</span>
                                                      </div>
                                                  </div>
                                              </div>
                                          );
                                      }
                                      return null;
                                  }}
                              />
                              {CONSTRAINT_MATRIX.map((entry, index) => (
                                  <Scatter 
                                      key={`scatter-${index}`} 
                                      name={entry.name} 
                                      data={[entry]} 
                                      fill={entry.color} 
                                      className="hover:opacity-80 transition-opacity animate-in zoom-in duration-700"
                                  />
                              ))}
                          </ScatterChart>
                      </ResponsiveContainer>
                  </div>
              </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-8">
              {/* Equilibrium Radar */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col h-fit">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                      <Signal size={20} className="text-agro-600" /> Thrust Equilibrium
                  </h3>
                  <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
                              <PolarGrid stroke="#e2e8f0" strokeOpacity={0.4} />
                              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} />
                              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                              <Radar
                                  name="Thrust Balance"
                                  dataKey="A"
                                  stroke="#16a34a"
                                  strokeWidth={4}
                                  fill="#16a34a"
                                  fillOpacity={0.1}
                              />
                              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                          </RadarChart>
                      </ResponsiveContainer>
                  </div>
                  <div className="mt-8 bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700">
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                          Equilibrium Analysis: <strong>Industrial Scaling</strong> and <strong>Health Safety</strong> are identified as high-priority growth vectors for the next fiscal cycle.
                      </p>
                  </div>
              </div>

              {/* Live Activity Log */}
              <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
                  <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                      <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <Activity size={20} className="text-blue-500 animate-pulse" /> Live Telemetry
                      </h3>
                      <span className="text-[10px] font-black text-agro-600 tracking-widest uppercase">Nodes Sync</span>
                  </div>
                  <div className="p-4 space-y-3">
                      {liveLogs.map((log) => (
                          <div key={log.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all group flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm ${
                                  log.thrust === 'SA' ? 'bg-rose-100 text-rose-600' :
                                  log.thrust === 'EA' ? 'bg-green-100 text-green-600' :
                                  log.thrust === 'TA' ? 'bg-blue-100 text-blue-600' :
                                  'bg-slate-100 text-slate-600'
                              }`}>
                                  {log.thrust}
                              </div>
                              <div className="flex-1 min-w-0">
                                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{log.event}</h4>
                                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">{log.node} • {log.time}</p>
                              </div>
                              <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                                  log.status === 'Success' ? 'bg-agro-100 text-agro-700' :
                                  log.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                  'bg-red-100 text-red-700'
                              }`}>
                                  {log.status}
                              </div>
                          </div>
                      ))}
                  </div>
                  <button className="p-6 text-center text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 hover:text-agro-600 transition-colors border-t border-slate-100 dark:border-slate-800">
                      Access Admin Ledger
                  </button>
              </div>
          </div>
       </div>

       {/* Bottom Section: Interactive Thrust Grid */}
       <div className="mb-20">
            <div className="flex justify-between items-end mb-8 px-2">
                <div>
                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">Five Thrusts Telemetry</h3>
                    <p className="text-slate-500 mt-1">Select a thrust to drill down into specific regional datasets.</p>
                </div>
                <button className="text-agro-600 dark:text-agro-400 font-bold text-sm hover:underline flex items-center gap-2">
                    View Strategic Roadmap <ArrowRight size={16} />
                </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {thrustCards.map((card) => (
                    <button 
                        key={card.id}
                        onClick={() => setActiveThrust(card.id)}
                        className={`group relative p-8 rounded-[3rem] border-2 transition-all flex flex-col items-center text-center justify-center min-h-[220px] ${
                            activeThrust === card.id 
                            ? 'bg-white dark:bg-slate-900 border-agro-500 shadow-2xl scale-105 z-10' 
                            : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-agro-100 shadow-sm'
                        }`}
                    >
                        <div className={`mb-6 p-5 rounded-[1.5rem] shadow-sm transition-transform duration-500 group-hover:scale-110 ${
                            card.color === 'rose' ? 'bg-rose-50 text-rose-600' :
                            card.color === 'green' ? 'bg-green-50 text-green-600' :
                            card.color === 'red' ? 'bg-red-50 text-red-600' :
                            card.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                            'bg-slate-100 text-slate-600'
                        }`}>
                            {card.icon}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">{card.title}</div>
                        <div className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-4">{card.score}</div>
                        
                        <div className="mt-auto flex items-center gap-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase">m(t):</span>
                            <span className="text-xs font-bold text-agro-600">{card.m}</span>
                        </div>
                    </button>
                ))}
            </div>
       </div>

       {/* Footer Insight Banner */}
       <div className="bg-slate-900 rounded-[4rem] p-16 text-center text-white relative overflow-hidden shadow-2xl border border-white/5">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
           <div className="relative z-10 max-w-4xl mx-auto">
               <div className="w-20 h-20 bg-agro-600 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl animate-float">
                   <ShieldCheck size={40} className="text-white" />
               </div>
               <h3 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">Advanced Resilience Analytics</h3>
               <p className="text-slate-300 text-xl leading-relaxed mb-12 font-medium">
                   Leverage EnvirosAgro's diagnostic neural network to identify untapped potential within your regional supply chains. Standardize your data injection to increase collective C(a) intelligence.
               </p>
               <div className="flex flex-wrap justify-center gap-6">
                   <button onClick={() => onNavigate(View.SUSTAINABILITY_FRAMEWORK)} className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl">
                       Explore Framework
                   </button>
                   <button onClick={() => onNavigate(View.DATABASE)} className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all">
                       Inject New Data
                   </button>
               </div>
           </div>
       </div>
    </div>
  );
};