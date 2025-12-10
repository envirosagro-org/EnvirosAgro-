
import React from 'react';
import { 
  Users, Factory, Leaf, ShieldPlus, Cpu, ArrowUpRight, Signal, CloudSun, Wind, Droplets, Activity, TrendingUp
} from 'lucide-react';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip 
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
  { month: 'Jan', resilience: 2.4 },
  { month: 'Feb', resilience: 2.8 },
  { month: 'Mar', resilience: 3.1 },
  { month: 'Apr', resilience: 3.5 },
  { month: 'May', resilience: 4.2 },
  { month: 'Jun', resilience: 4.8 },
];

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-earth-50">
       {/* Header with Status */}
       <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
            <div>
                <h2 className="text-3xl font-bold text-agro-900 mb-2">Impact Dashboard</h2>
                <p className="text-earth-600">Real-time monitoring of network sustainability metrics.</p>
            </div>
            
            <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-earth-200 shadow-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="font-bold text-earth-700 text-sm">System Optimal</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
             {/* Weather Widget */}
             <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex justify-between items-start mb-6">
                    <div>
                        <h4 className="font-bold text-blue-100 text-sm flex items-center gap-2"><CloudSun size={16} /> Local Weather</h4>
                        <p className="text-2xl font-bold">24°C</p>
                        <p className="text-xs text-blue-100">Kiriaini, Kenya</p>
                    </div>
                    <CloudSun size={48} className="text-blue-100 opacity-80" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs relative z-10">
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        <span className="block opacity-70 mb-1 flex items-center gap-1"><Droplets size={10} /> Humidity</span>
                        <span className="font-bold">65%</span>
                    </div>
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        <span className="block opacity-70 mb-1 flex items-center gap-1"><Wind size={10} /> Wind</span>
                        <span className="font-bold">12 km/h</span>
                    </div>
                </div>
             </div>

             <div className="bg-white px-6 py-4 rounded-2xl border border-earth-200 shadow-sm flex flex-col justify-center">
                <div>
                    <span className="text-xs text-earth-500 uppercase font-bold block mb-1">Network C(a)</span>
                    <span className="text-3xl font-serif font-bold text-agro-600 flex items-center gap-2">
                        4.2 <span className="text-sm font-sans text-green-500 bg-green-50 px-2 py-0.5 rounded-full flex items-center">
                            <TrendingUp size={12} className="mr-1" /> +0.4
                        </span>
                    </span>
                </div>
                <div className="text-right mt-2">
                    <span className="text-xs text-earth-400">Sustainability Coefficient</span>
                </div>
             </div>
             
             <div className="bg-white px-6 py-4 rounded-2xl border border-earth-200 shadow-sm flex flex-col justify-center">
                <div>
                    <span className="text-xs text-earth-500 uppercase font-bold block mb-1">Resilience m(t)</span>
                    <span className="text-3xl font-serif font-bold text-blue-600 flex items-center gap-2">
                        8.5 <span className="text-sm font-sans text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full flex items-center">
                            <Activity size={12} className="mr-1" /> Stable
                        </span>
                    </span>
                </div>
                <div className="text-right mt-2">
                    <span className="text-xs text-earth-400">Time Constant (Months)</span>
                </div>
             </div>
          </div>
        </div>

      {/* Five Thrusts Grid */}
      <div className="grid md:grid-cols-5 gap-4 mb-8">
        {[
            { icon: <Users size={18} />, title: "Social", color: "rose", score: "80%" },
            { icon: <Leaf size={18} />, title: "Environment", color: "green", score: "90%" },
            { icon: <ShieldPlus size={18} />, title: "Health", color: "red", score: "65%" },
            { icon: <Cpu size={18} />, title: "Technical", color: "blue", score: "75%" },
            { icon: <Factory size={18} />, title: "Industrial", color: "slate", score: "60%" }
        ].map((item, idx) => (
            <div key={idx} className={`bg-white border-b-4 border-${item.color}-500 p-4 rounded-xl shadow-sm flex flex-col items-center text-center justify-center min-h-[120px] transition-transform hover:-translate-y-1`}>
               <div className={`mb-2 text-${item.color}-600 bg-${item.color}-50 p-2 rounded-full`}>
                 {item.icon}
               </div>
               <p className={`text-sm font-bold text-earth-700 mb-1`}>{item.title}</p>
               <span className={`text-lg font-bold text-${item.color}-600`}>
                   {item.score}
               </span>
            </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Radar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-earth-100 lg:col-span-1 flex flex-col">
          <h3 className="text-lg font-bold text-earth-900 mb-4 flex items-center gap-2">
              <Signal size={18} className="text-agro-600" /> Thrust Balance
          </h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 'bold' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Thrust Score"
                        dataKey="A"
                        stroke="#16a34a"
                        strokeWidth={2}
                        fill="#16a34a"
                        fillOpacity={0.2}
                    />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resilience Trend */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-earth-100 lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-earth-900 flex items-center gap-2">
                  <TrendingUp size={18} className="text-blue-600" /> Resilience Growth Stream
              </h3>
              <button 
                    onClick={() => onNavigate(View.COMMUNITY)}
                    className="text-agro-600 font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all border border-agro-100 px-3 py-1.5 rounded-lg hover:bg-agro-50"
                >
                    Add Data Source <ArrowUpRight size={14} />
                </button>
          </div>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TREND_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorResilience" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="month" tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
                    <YAxis tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} domain={[0, 6]} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Area 
                        type="monotone" 
                        dataKey="resilience" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorResilience)" 
                    />
                </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

       {/* Detailed Metrics Row */}
       <div className="grid lg:grid-cols-3 gap-8">
         <div className="bg-white p-8 rounded-2xl shadow-sm border border-earth-100 flex flex-col justify-center text-center">
            <h3 className="text-lg font-bold text-earth-900 mb-2">Input Reduction</h3>
            <div className="text-4xl font-bold text-green-600 mb-1">-15%</div>
            <p className="text-xs text-earth-500">Fertilizer usage vs last season</p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-earth-100 lg:col-span-2">
            <h3 className="text-lg font-bold text-earth-900 mb-6 flex items-center gap-2">
                <Signal size={18} className="text-blue-500 animate-pulse" /> Live Network Activity
            </h3>
            <div className="space-y-4">
               <div className="flex items-center gap-4 p-4 bg-earth-50 rounded-xl border border-earth-100 transition-colors hover:bg-white hover:shadow-sm">
                   <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">J</div>
                   <div className="flex-1">
                      <p className="text-sm font-bold text-earth-900">John K. uploaded soil data for Plot B</p>
                      <p className="text-xs text-earth-500">2 mins ago • Environmental Thrust</p>
                   </div>
                   <span className="text-xs font-bold text-agro-600">+10 EAC</span>
               </div>
               <div className="flex items-center gap-4 p-4 bg-earth-50 rounded-xl border border-earth-100 transition-colors hover:bg-white hover:shadow-sm">
                   <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">M</div>
                   <div className="flex-1">
                      <p className="text-sm font-bold text-earth-900">Maria S. registered a new cooperative group</p>
                      <p className="text-xs text-earth-500">15 mins ago • Social Thrust</p>
                   </div>
                   <span className="text-xs font-bold text-agro-600">+50 EAC</span>
               </div>
            </div>
        </div>
       </div>
    </div>
  );
};
