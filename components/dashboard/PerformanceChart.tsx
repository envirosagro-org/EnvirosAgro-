import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceChartProps {
  dynamicTrend: any[];
  chartMetric: string;
  setChartMetric: (metric: any) => void;
  metricConfig: any;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  dynamicTrend,
  chartMetric,
  setChartMetric,
  metricConfig,
}) => {
  return (
    <div className="ea-card p-10 h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div><h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white tracking-tight">Performance Matrix</h3></div>
        <div className="flex bg-earth-50 dark:bg-earth-900/50 p-1 rounded-2xl border border-earth-100 dark:border-earth-800">
          {['resilience', 'yield', 'carbon'].map(m => (
            <button
              key={m}
              onClick={() => setChartMetric(m as any)}
              className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${chartMetric === m ? 'bg-white dark:bg-earth-700 text-slate-900 dark:text-white shadow-sm' : 'text-earth-400 hover:text-earth-600'}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dynamicTrend}>
            <defs>
              <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={metricConfig.color} stopOpacity={0.2} />
                <stop offset="95%" stopColor={metricConfig.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} dy={15} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} dx={-15} />
            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.98)', fontSize: '11px' }} />
            <Area type="monotone" dataKey={metricConfig.key} name={metricConfig.label} stroke={metricConfig.color} strokeWidth={4} fillOpacity={1} fill="url(#colorMain)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
