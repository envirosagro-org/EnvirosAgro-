import React from 'react';
import { TrendingUp, BarChart3, PieChart, ShieldCheck } from 'lucide-react';

export const InvestorHeader: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white mb-10 relative overflow-hidden shadow-xl border-4 border-slate-950/20">
      <div className="absolute top-0 right-0 p-6 opacity-10 transform scale-125 pointer-events-none">
        <TrendingUp size={200} />
      </div>
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-[0.2em] text-[9px] mb-4">
            <span className="w-1.5 h-1.5 bg-agro-500 rounded-full"></span> Institutional Node
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-[1] tracking-tighter">Investor <br/><span className="text-agro-500 italic">Portal</span></h2>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed font-medium opacity-90">
            Strategic impact deployments, transparency logs, and real-time agricultural asset performance.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4">
             <div className="p-2 bg-agro-600 rounded-lg">
                <BarChart3 size={20} />
             </div>
             <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">Total AUM</span>
                <span className="text-xl font-bold">$124.8M</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
