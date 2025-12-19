import React, { useState } from 'react';
import { 
  Users, Factory, Leaf, ShieldPlus, Cpu, ArrowUpRight, Signal, CloudSun, Wind, Droplets, Activity, TrendingUp,
  BrainCircuit, Sparkles, RefreshCcw, Info, LayoutDashboard, Database
} from 'lucide-react';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { View } from '../types';

interface DashboardProps {
    onNavigate: (view: View) => void;
}

const RADAR_DATA = [
  { subject: 'Social', A: 80, fullMark: 100 },
  { subject: 'Environment', A: 90, fullMark: 100 },
  { subject: 'Health', A: 65, fullMark: 100 },
  { subject: 'Technical', A: 75, fullMark: 100 },
  { subject: 'Industrial', A: 60, fullMark: 100 },
];

const TREND_DATA = [
  { month: 'Jan', resilience: 2.4, predicted: 2.4 },
  { month: 'Feb', resilience: 2.8, predicted: 2.8 },
  { month: 'Mar', resilience: 3.1, predicted: 3.1 },
  { month: 'Apr', resilience: 3.5, predicted: 3.5 },
  { month: 'May', resilience: 4.2, predicted: 4.2 },
  { month: 'Jun', resilience: 4.8, predicted: 4.8 },
  { month: 'Jul', predicted: 5.4 },
  { month: 'Aug', predicted: 6.2 },
  { month: 'Sep', predicted: 7.1 },
];

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [isPredictive, setIsPredictive] = useState(false);
  const [activeThrust, setActiveThrust] = useState('ALL');

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
       {/* Header with Status */}
       <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
            <div>
                <div className="flex items-center gap-2 text-agro-600 font-black uppercase tracking-widest text-[10px] mb-2">
                    <LayoutDashboard size={14} /> Network Telemetry
                </div>
                <h2 className="text-4xl font-serif font-bold text-agro-900 dark:text-white mb-2">Impact Dashboard</h2>
                <p className="text-earth-600 dark:text-earth-400">Real-time monitoring of collective sustainability m(t) scores.</p>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white dark:bg-earth-900 px-5 py-3 rounded-2xl border border-earth-100 dark:border-earth-800 shadow-sm">
                    <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="font-bold text-earth-700 dark:text-earth-200 text-sm uppercase tracking-wider">Nodes Sync: 98%</span>
                </div>
                <button 
                    onClick={() => setIsPredictive(!isPredictive)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all border-2 ${isPredictive ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/20' : 'bg-white dark:bg-earth-900 text-earth-600 dark:text-earth-300 border-earth-100 dark:border-earth-800 hover:border-purple-200'}`}
                >
                    <BrainCircuit size={18} className={isPredictive ? 'animate-pulse' : ''} />
                    {isPredictive ? 'Prediction Active' : 'Enable AI Forecast'}
                </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {/* Weather Widget - Removed blur classes */}
             <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000"></div>
                <div className="relative z-10 flex justify-between items-start mb-8">
                    <div>
                        <h4 className="font-black text-blue-100 text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 mb-2"><CloudSun size={14} /> Regional Weather</h4>
                        <p className="text-4xl font-bold font-serif">24.2°C</p>
                        <p className="text-xs text-blue-200 mt-1 font-medium">Kiriaini, Murang'a Node</p>
                    </div>
                    <div className="bg-white/20 p-4 rounded-3xl">
                        <CloudSun size={32} className="text-white" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs relative z-10">
                    <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
                        <span className="block opacity-70 mb-1 flex items-center gap-1 uppercase font-black text-[9px] tracking-widest"><Droplets size={12} /> Humidity</span>
                        <span className="text-lg font-bold">65%</span>
                    </div>
                    <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
                        <span className="block opacity-70 mb-1 flex items-center gap-1 uppercase font-black text-[9px] tracking-widest"><Wind size={12} /> Wind</span>
                        <span className="text-lg font-bold">12 km/h</span>
                    </div>
                </div>
             </div>

             <div className="bg-white dark:bg-earth-900 px-8 py-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 shadow-sm flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Database size={100} /></div>
                <div>
                    <span className="text-[10px] text-earth-400 dark:text-earth-500 uppercase font-black tracking-[0.2em] block mb-2">Aggregate Network C(a)</span>
                    <div className="text-5xl font-serif font-bold text-agro-600 dark:text-agro-400 flex items-center gap-3">
                        4.24 
                        <span className="text-[10px] font-sans text-green-500 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full flex items-center border border-green-100 dark:border-green-800">
                            <TrendingUp size={12} className="mr-1" /> +0.42
                        </span>
                    </div>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs text-earth-400 font-medium">
                    <Info size={14} /> Sustainability Coefficient Delta (30d)
                </div>
             </div>
             
             <div className="bg-white dark:bg-earth-900 px-8 py-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 shadow-sm flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Sparkles size={100} /></div>
                <div>
                    <span className="text-[10px] text-earth-400 dark:text-earth-500 uppercase font-black tracking-[0.2em] block mb-2">Global Resilience m(t)</span>
                    <div className="text-5xl font-serif font-bold text-blue-600 dark:text-blue-400 flex items-center gap-3">
                        8.52
                        <span className="text-[10px] font-sans text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full flex items-center border border-blue-100 dark:border-green-800">
                            <Activity size={12} className="mr-1" /> OPTIMAL
                        </span>
                    </div>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs text-earth-400 font-medium">
                    <Info size={14} /> Predictive Time Constant (Months)
                </div>
             </div>
          </div>
        </div>

      {/* Five Thrusts Filter Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        {[
            { id: 'SA', icon: <Users size={18} />, title: "Social", color: "rose", score: "80%" },
            { id: 'EA', icon: <Leaf size={18} />, title: "Environment", color: "green", score: "90%" },
            { id: 'HA', icon: <ShieldPlus size={18} />, title: "Health", color: "red", score: "65%" },
            { id: 'TA', icon: <Cpu size={18} />, title: "Technical", color: "blue", score: "75%" },
            { id: 'IA', icon: <Factory size={18} />, title: "Industrial", color: "slate", score: "60%" }
        ].map((item, idx) => (
            <button 
                key={idx} 
                onClick={() => setActiveThrust(item.id)}
                className={`p-6 rounded-[2rem] shadow-sm flex flex-col items-center text-center justify-center min-h-[140px] transition-all hover:-translate-y-1 border-2 ${activeThrust === item.id ? 'bg-white dark:bg-earth-900 border-agro-500 scale-105' : 'bg-white dark:bg-earth-900 border-transparent hover:border-earth-100 dark:hover:border-earth-800'}`}
            >
               <div className={`mb-3 text-${item.color}-600 bg-${item.color}-50 dark:bg-${item.color}-950/30 p-3 rounded-2xl`}>
                 {item.icon}
               </div>
               <p className={`text-xs font-black uppercase tracking-widest text-earth-500 mb-1`}>{item.title}</p>
               <span className={`text-2xl font-bold text-earth-900 dark:text-white`}>
                   {item.score}
               </span>
            </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Radar Chart */}
        <div className="bg-white dark:bg-earth-900 p-8 rounded-[3rem] shadow-sm border border-earth-100 dark:border-earth-800 lg:col-span-1 flex flex-col">
          <h3 className="text-xl font-bold text-earth-900 dark:text-white mb-8 flex items-center gap-3">
              <Signal size={20} className="text-agro-600" /> Thrust Equilibrium
          </h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
                    <PolarGrid stroke="#e5e7eb" className="dark:opacity-10" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 'bold' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Thrust Score"
                        dataKey="A"
                        stroke="#16a34a"
                        strokeWidth={3}
                        fill="#16a34a"
                        fillOpacity={0.2}
                    />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', background: '#fff' }} />
                </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-earth-400 mt-4 text-center leading-relaxed">
              Target C(a) balance: <strong>Industrial Scaling</strong> needs expansion in the next harvest cycle.
          </p>
        </div>

        {/* Resilience Trend */}
        <div className="bg-white dark:bg-earth-900 p-8 rounded-[3rem] shadow-sm border border-earth-100 dark:border-earth-800 lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-earth-900 dark:text-white flex items-center gap-3">
                  <TrendingUp size={20} className="text-blue-600" /> 
                  {isPredictive ? 'AI-Augmented m(t) Projection' : 'Historical Resilience Growth'}
              </h3>
              <div className="flex gap-2">
                <button className="bg-earth-50 dark:bg-earth-800 p-2 rounded-xl text-earth-400 hover:text-agro-600 transition-colors">
                    <RefreshCcw size={16} />
                </button>
              </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TREND_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorResilience" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9333ea" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:opacity-10" />
                    <XAxis dataKey="month" tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                    <YAxis tick={{fill: '#9ca3af', fontSize: 12}} axisLine={false} tickLine={false} domain={[0, 10]} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Legend verticalAlign="top" height={36}/>
                    <Area 
                        type="monotone" 
                        dataKey="resilience" 
                        name="Verified History"
                        stroke="#3b82f6" 
                        strokeWidth={4}
                        fillOpacity={1} 
                        fill="url(#colorResilience)" 
                    />
                    {isPredictive && (
                        <Area 
                            type="monotone" 
                            dataKey="predicted" 
                            name="AI Forecast"
                            stroke="#9333ea" 
                            strokeWidth={4}
                            strokeDasharray="5 5"
                            fillOpacity={1} 
                            fill="url(#colorPredicted)" 
                            className="animate-in fade-in duration-1000"
                        />
                    )}
                </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

       {/* Detailed Metrics Row */}
       <div className="grid lg:grid-cols-4 gap-6">
         <div className="bg-agro-900 text-white p-8 rounded-[2.5rem] shadow-xl flex flex-col justify-center text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full nature-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] mb-3 text-agro-300">Input Reduction</h3>
                <div className="text-5xl font-serif font-bold mb-2">-15.4%</div>
                <p className="text-xs text-agro-200">Fertilizer optimized via IA</p>
            </div>
        </div>
        
        <div className="bg-white dark:bg-earth-900 p-8 rounded-[2.5rem] shadow-sm border border-earth-100 dark:border-earth-800 lg:col-span-3">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-earth-900 dark:text-white flex items-center gap-3">
                    <Signal size={20} className="text-blue-500 animate-pulse" /> Live Network Activity Log
                </h3>
                <button className="text-xs font-bold text-earth-400 hover:text-agro-600 transition-colors">Clear Logs</button>
            </div>
            <div className="space-y-4">
               {[
                   { name: "John K.", action: "uploaded soil data for Plot B", time: "2 mins ago", thrust: "Environmental", color: "green", bonus: "+10 EAC" },
                   { name: "Maria S.", action: "registered a new cooperative group", time: "15 mins ago", thrust: "Social", color: "rose", bonus: "+50 EAC" },
                   { name: "TechNode 42", action: "auto-calibrated moisture sensors", time: "1h ago", thrust: "Technical", color: "blue", bonus: "System Log" }
               ].map((log, i) => (
                   <div key={i} className="flex items-center gap-4 p-5 bg-earth-50 dark:bg-earth-800/50 rounded-[1.5rem] border border-earth-100 dark:border-earth-800 transition-all hover:bg-white dark:hover:bg-earth-800 hover:shadow-md group">
                       <div className={`w-12 h-12 bg-${log.color}-100 dark:bg-${log.color}-950/40 rounded-2xl flex items-center justify-center text-${log.color}-600 font-black text-lg shadow-inner group-hover:scale-110 transition-transform`}>
                           {log.name.charAt(0)}
                       </div>
                       <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-earth-900 dark:text-white truncate">{log.name} <span className="font-normal text-earth-600 dark:text-earth-400">{log.action}</span></p>
                          <p className="text-[10px] text-earth-500 font-bold uppercase tracking-wider mt-1">{log.time} • {log.thrust} Thrust</p>
                       </div>
                       <span className={`text-[10px] font-black px-3 py-1 rounded-full ${log.bonus.includes('+') ? 'bg-agro-100 text-agro-700' : 'bg-earth-200 text-earth-600 dark:bg-earth-900 dark:text-earth-400'}`}>
                           {log.bonus}
                       </span>
                   </div>
               ))}
            </div>
        </div>
       </div>
    </div>
  );
};