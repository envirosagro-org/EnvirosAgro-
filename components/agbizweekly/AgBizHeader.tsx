import React from 'react';
import { Factory, TrendingUp, BarChart3, Globe2 } from 'lucide-react';

export const AgBizHeader: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 border-b border-earth-100 dark:border-earth-800 pb-12">
      <div className="flex items-center gap-8">
        <div className="bg-slate-900 dark:bg-earth-800 p-6 rounded-[2.5rem] text-white shadow-2xl flex items-center justify-center">
          <Factory size={48} />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-3">
             <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-blue-100 dark:border-blue-800">
               Industrial Intelligence
             </span>
             <span className="text-[9px] font-bold text-earth-400 uppercase tracking-widest">Issue #142 • Oct 2024</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-black text-earth-900 dark:text-white leading-none tracking-tight">AgBiz Weekly</h1>
          <p className="text-earth-500 dark:text-earth-400 text-sm md:text-base mt-4 font-medium max-w-lg leading-relaxed">
            Strategic market analysis, industrial supply chain forensics, and large-scale agricultural economics.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center lg:justify-end">
         {[
            { label: 'Global Index', val: '+2.4%', icon: <TrendingUp size={16}/>, color: 'text-green-600' },
            { label: 'Market Cap', val: '$4.2T', icon: <BarChart3 size={16}/>, color: 'text-blue-600' },
            { label: 'Trade Volume', val: '8.5M t', icon: <Globe2 size={16}/>, color: 'text-amber-600' }
         ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-5 rounded-3xl shadow-sm flex items-center gap-4 transition-all hover:border-agro-500/20 group">
               <div className={`p-3 bg-earth-50 dark:bg-earth-800 rounded-xl ${stat.color} group-hover:scale-110 transition-transform`}>
                  {stat.icon}
               </div>
               <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-earth-400 block mb-0.5">{stat.label}</span>
                  <span className={`text-lg font-mono font-bold ${stat.color}`}>{stat.val}</span>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};
