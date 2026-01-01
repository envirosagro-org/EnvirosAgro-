
import React from 'react';
import { 
  Cloud, Sun, Droplets, Wind, Zap, TrendingUp, TrendingDown, 
  BarChart3, Package, ShoppingCart, CloudRain, AlertTriangle
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const marketData = [
  { name: 'Jan', corn: 4000, wheat: 2400, soy: 2400 },
  { name: 'Feb', corn: 3000, wheat: 1398, soy: 2210 },
  { name: 'Mar', corn: 2000, wheat: 9800, soy: 2290 },
  { name: 'Apr', corn: 2780, wheat: 3908, soy: 2000 },
  { name: 'May', corn: 1890, wheat: 4800, soy: 2181 },
  { name: 'Jun', corn: 2390, wheat: 3800, soy: 2500 },
];

const supplyDemandData = [
  { name: 'Week 1', supply: 65, demand: 40 },
  { name: 'Week 2', supply: 59, demand: 48 },
  { name: 'Week 3', supply: 80, demand: 52 },
  { name: 'Week 4', supply: 81, demand: 61 },
  { name: 'Week 5', supply: 56, demand: 75 },
  { name: 'Week 6', supply: 55, demand: 85 },
];

export const ForecastSection: React.FC = () => {
  const days = [
    { day: 'Mon', temp: '28°C', icon: <Sun className="text-yellow-500" />, status: 'Sunny' },
    { day: 'Tue', temp: '26°C', icon: <Cloud className="text-slate-400" />, status: 'Cloudy' },
    { day: 'Wed', temp: '22°C', icon: <Droplets className="text-blue-500" />, status: 'Rain' },
    { day: 'Thu', temp: '24°C', icon: <Sun className="text-yellow-500" />, status: 'Partly' },
    { day: 'Fri', temp: '29°C', icon: <Zap className="text-amber-500" />, status: 'Storm' },
  ];

  return (
    <div className="space-y-12">
      {/* Weather Forecast */}
      <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-[3rem] p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-earth-900 dark:text-white">Regional Climate Forecast</h3>
            <p className="text-earth-500 dark:text-earth-400 text-sm">72-hour predictive modeling for agricultural planning.</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Sun size={12} /> Optimal Window
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {days.map((d, i) => (
            <div key={i} className="bg-earth-50 dark:bg-earth-800/50 p-6 rounded-[2rem] border border-transparent hover:border-agro-500/20 transition-all text-center group">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-earth-400 mb-4 block group-hover:text-agro-600 transition-colors">{d.day}</span>
              <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform">
                {React.cloneElement(d.icon as React.ReactElement, { size: 32 })}
              </div>
              <span className="text-xl font-bold text-earth-900 dark:text-white block mb-1">{d.temp}</span>
              <span className="text-[9px] font-bold text-earth-500 uppercase tracking-widest">{d.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Market Pricing Forecast */}
        <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-[3rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold text-earth-900 dark:text-white flex items-center gap-2">
                        <TrendingUp className="text-agro-600" size={20} /> Market Pricing Forecast
                    </h3>
                    <p className="text-earth-500 dark:text-earth-400 text-xs">Commodity price projections for next quarter.</p>
                </div>
                <div className="text-right">
                    <span className="text-xs font-bold text-agro-600 flex items-center gap-1">
                        +12.4% <TrendingUp size={14} />
                    </span>
                    <span className="text-[10px] text-earth-400 block font-bold">AVG TREND</span>
                </div>
            </div>
            
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={marketData}>
                        <defs>
                            <linearGradient id="colorCorn" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 600}} />
                        <YAxis hide />
                        <Tooltip />
                        <Area type="monotone" dataKey="corn" stroke="#16a34a" fillOpacity={1} fill="url(#colorCorn)" strokeWidth={3} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                    { label: 'Corn', val: '$4.20', trend: '+2.1%', up: true },
                    { label: 'Wheat', val: '$6.15', trend: '-0.8%', up: false },
                    { label: 'Soy', val: '$13.40', trend: '+1.5%', up: true }
                ].map((item, i) => (
                    <div key={i} className="p-3 bg-earth-50 dark:bg-earth-800/50 rounded-2xl border border-earth-100 dark:border-earth-800">
                        <span className="text-[9px] font-black uppercase text-earth-400 block mb-1">{item.label}</span>
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-sm">{item.val}</span>
                            <span className={`text-[9px] font-bold ${item.up ? 'text-green-600' : 'text-red-600'}`}>{item.trend}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Supply & Demand Equilibrium */}
        <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-[3rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold text-earth-900 dark:text-white flex items-center gap-2">
                        <BarChart3 className="text-blue-600" size={20} /> Supply & Demand
                    </h3>
                    <p className="text-earth-500 dark:text-earth-400 text-xs">Projected equilibrium for local distribution.</p>
                </div>
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl">
                    <Package size={20} />
                </div>
            </div>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={supplyDemandData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 600}} />
                        <YAxis hide />
                        <Tooltip />
                        <Line type="monotone" dataKey="supply" stroke="#3b82f6" strokeWidth={3} dot={false} />
                        <Line type="monotone" dataKey="demand" stroke="#ef4444" strokeWidth={3} dot={false} strokeDasharray="5 5" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800 flex items-center gap-4">
                <div className="p-2 bg-amber-500 text-white rounded-lg">
                    <AlertTriangle size={18} />
                </div>
                <div>
                    <h5 className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-400 tracking-wider">Demand Surge Warning</h5>
                    <p className="text-xs text-amber-600 dark:text-amber-500 font-medium">Demand expected to exceed local supply by Week 5.</p>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-agro-50/50 dark:bg-agro-900/10 p-8 rounded-[2rem] border border-agro-100 dark:border-agro-800/50">
          <div className="flex items-center gap-4 mb-6">
             <div className="p-3 bg-white dark:bg-earth-900 rounded-xl shadow-sm text-agro-600">
               <Wind size={20} />
             </div>
             <div>
               <h4 className="font-bold text-earth-900 dark:text-white">Wind Patterns</h4>
               <p className="text-xs text-earth-500">Predicted velocity shifts in Northern quadrants.</p>
             </div>
          </div>
          <div className="h-2 bg-earth-200 dark:bg-earth-800 rounded-full overflow-hidden">
            <div className="h-full bg-agro-600 w-3/4 rounded-full"></div>
          </div>
          <div className="flex justify-between mt-3">
             <span className="text-[10px] font-bold text-earth-400">Current: 12km/h</span>
             <span className="text-[10px] font-bold text-agro-600">Peak: 24km/h</span>
          </div>
        </div>

        <div className="bg-blue-50/50 dark:bg-blue-900/10 p-8 rounded-[2rem] border border-blue-100 dark:border-blue-800/50">
          <div className="flex items-center gap-4 mb-6">
             <div className="p-3 bg-white dark:bg-earth-900 rounded-xl shadow-sm text-blue-600">
               <CloudRain size={20} />
             </div>
             <div>
               <h4 className="font-bold text-earth-900 dark:text-white">Rain Probability</h4>
               <p className="text-xs text-earth-500">Projected accumulation for the next 48 hours.</p>
             </div>
          </div>
          <div className="h-2 bg-earth-200 dark:bg-earth-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 w-1/2 rounded-full"></div>
          </div>
          <div className="flex justify-between mt-3">
             <span className="text-[10px] font-bold text-earth-400">Current: 2mm</span>
             <span className="text-[10px] font-bold text-blue-600">Target: 15mm</span>
          </div>
        </div>
      </div>
    </div>
  );
};
