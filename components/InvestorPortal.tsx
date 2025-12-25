import React from 'react';
import { InvestorHeader } from './investorportal/InvestorHeader';
import { ArrowUpRight, ShieldCheck, Globe, Zap, BarChart3, PieChart, Activity } from 'lucide-react';

export const InvestorPortal: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <InvestorHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
         {[
            { label: 'IRR Projection', val: '14.2%', icon: <ArrowUpRight className="text-agro-500" /> },
            { label: 'Asset Utilization', val: '92%', icon: <Activity className="text-blue-500" /> },
            { label: 'Risk Rating', val: 'A+', icon: <ShieldCheck className="text-green-500" /> },
            { label: 'Regional Spread', val: '12 Nodes', icon: <Globe className="text-purple-500" /> }
         ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-8 rounded-[2rem] shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
               <div className="w-16 h-16 bg-earth-50 dark:bg-earth-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  {React.cloneElement(stat.icon as React.ReactElement, { size: 32 })}
               </div>
               <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-earth-400 block mb-1">{stat.label}</span>
                  <span className="text-2xl font-black text-earth-900 dark:text-white leading-none">{stat.val}</span>
               </div>
            </div>
         ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12 mb-20">
         <div className="lg:col-span-2 space-y-12">
            <div>
               <h3 className="text-3xl font-serif font-black text-earth-900 dark:text-white mb-8 border-l-4 border-agro-600 pl-6">Strategic Deployments</h3>
               <div className="space-y-6">
                  {[
                     { title: 'Kiriaini Irrigation Expansion', type: 'Infrastructure', amt: '$1.2M', status: 'In-Progress', cap: '65%' },
                     { title: 'Regional Cold-Chain Node #4', type: 'Logistics', amt: '$850k', status: 'Active', cap: '100%' },
                     { title: 'Precision Ag UAV Fleet Upgrade', type: 'Technology', amt: '$420k', status: 'Acquisition', cap: '12%' }
                  ].map((dep, i) => (
                     <div key={i} className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group">
                        <div className="flex justify-between items-start mb-8">
                           <div>
                              <span className="text-[10px] font-black text-agro-600 uppercase tracking-widest mb-2 block">{dep.type}</span>
                              <h4 className="text-2xl font-bold text-earth-900 dark:text-white">{dep.title}</h4>
                           </div>
                           <div className="text-right">
                              <span className="text-2xl font-black text-earth-900 dark:text-white block">{dep.amt}</span>
                              <span className="text-[10px] font-bold text-earth-400 uppercase tracking-widest">{dep.status}</span>
                           </div>
                        </div>
                        <div className="space-y-3">
                           <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-earth-400">
                              <span>Capital Deployment</span>
                              <span className="text-agro-600">{dep.cap}</span>
                           </div>
                           <div className="h-2.5 bg-earth-50 dark:bg-earth-800 rounded-full overflow-hidden border border-earth-100 dark:border-earth-700">
                              <div className="h-full bg-agro-600 rounded-full transition-all duration-1000" style={{ width: dep.cap }}></div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="bg-earth-900 dark:bg-earth-800 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-[10s]"><PieChart size={160} /></div>
               <h3 className="text-2xl font-bold mb-8 relative z-10">Portfolio Allocation</h3>
               <div className="space-y-6 relative z-10">
                  {[
                     { label: 'Regenerative Ag', val: '45%', color: 'bg-agro-500' },
                     { title: 'Clean Tech', val: '25%', color: 'bg-blue-500' },
                     { title: 'Infrastructure', val: '20%', color: 'bg-purple-500' },
                     { title: 'R&D', val: '10%', color: 'bg-amber-500' }
                  ].map((item: any, i) => (
                     <div key={i} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                           <span>{item.label || item.title}</span>
                           <span className="text-white">{item.val}</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full">
                           <div className={`h-full ${item.color} rounded-full`} style={{ width: item.val }}></div>
                        </div>
                     </div>
                  ))}
               </div>
               <button className="w-full mt-10 py-4 bg-white text-earth-900 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-agro-50 transition-colors shadow-lg active:scale-95">
                  Request Full Audit
               </button>
            </div>

            <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-8 rounded-[2rem] shadow-sm">
               <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl">
                     <ShieldCheck size={24} />
                  </div>
                  <div>
                     <h4 className="font-bold text-earth-900 dark:text-white">Governance Log</h4>
                     <p className="text-xs text-earth-400">Compliance & Truth Verification</p>
                  </div>
               </div>
               <div className="space-y-4">
                  {[
                     { date: 'Oct 14', event: 'Quarterly ESG Audit Completed' },
                     { date: 'Oct 02', event: 'Dividend Distribution (EAC)' },
                     { date: 'Sep 24', event: 'Multi-Thrust Transparency Update' }
                  ].map((log, i) => (
                     <div key={i} className="flex gap-4 items-start border-l border-earth-100 dark:border-earth-800 pl-4 py-1">
                        <span className="text-[10px] font-mono text-earth-400 pt-0.5">{log.date}</span>
                        <p className="text-xs font-medium text-earth-600 dark:text-earth-300">{log.event}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
