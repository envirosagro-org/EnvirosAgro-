import React from 'react';
import { Globe2, Zap, Droplets, Cell, PieChart, Pie, ResponsiveContainer } from 'recharts';

interface MetricCardsProps {
  networkHealth: any[];
}

export const MetricCards: React.FC<MetricCardsProps> = ({ networkHealth }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-agro-900 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden group">
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
              <Pie data={networkHealth} cx="50%" cy="50%" innerRadius={30} outerRadius={38} startAngle={180} endAngle={0} dataKey="value" stroke="none">
                {networkHealth.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
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
  );
};
