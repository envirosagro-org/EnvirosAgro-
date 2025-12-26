import React from 'react';
import { Gauge } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const DPMO_DATA = [
  { week: 'W1', dpmo: 1240, sigma: 4.8 },
  { week: 'W2', dpmo: 980, sigma: 4.9 },
  { week: 'W3', dpmo: 3400, sigma: 4.2 }, // Regression point
  { week: 'W4', dpmo: 450, sigma: 5.4 },
  { week: 'W5', dpmo: 12, sigma: 6.2 }, // Target state
];

export const MeasurePhase: React.FC = () => (
  <div className="ea-card p-12 space-y-10 animate-in slide-in-from-left-4">
    <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white flex items-center gap-3">
      <Gauge className="text-blue-500" /> DPMO Baseline
    </h3>
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={DPMO_DATA}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
          <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
          <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', background: 'rgba(255,255,255,0.98)', fontSize: '11px' }} />
          <Line type="monotone" dataKey="dpmo" stroke="#3b82f6" strokeWidth={4} dot={{ r: 6, fill: '#3b82f6' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className="p-8 bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] border border-blue-100 dark:border-blue-800 flex justify-between items-center">
      <div>
        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Target Sigma Level</p>
        <p className="text-4xl font-serif font-bold text-blue-900 dark:text-white">6.2 σ</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Current Yield</p>
        <p className="text-2xl font-bold text-blue-900 dark:text-white">99.999%</p>
      </div>
    </div>
  </div>
);