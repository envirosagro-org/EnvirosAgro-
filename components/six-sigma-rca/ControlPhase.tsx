import React from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';

export const ControlPhase: React.FC = () => (
  <div className="ea-card p-12 space-y-10 animate-in slide-in-from-left-4">
    <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white flex items-center gap-4">
      <ShieldCheck size={32} className="text-agro-600" /> Stability Protocol 4.2
    </h3>
    <div className="bg-slate-950 p-8 rounded-[3rem] border border-white/5 shadow-inner">
      <div className="flex justify-between items-center mb-8">
        <span className="text-[10px] font-black text-agro-500 uppercase tracking-[0.4em]">Live Integrity Monitor</span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
          <span className="text-[10px] font-mono text-slate-500">UPLINK_OK</span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { l: 'CPU_LOAD', v: '12%', c: 'text-blue-400' },
          { l: 'LATENCY', v: '14ms', c: 'text-agro-400' },
          { l: 'ERROR_RT', v: '0.00%', c: 'text-green-400' },
          { l: 'BNDL_SZ', v: '842KB', c: 'text-purple-400' }
        ].map(stat => (
          <div key={stat.l} className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">{stat.l}</p>
            <p className={`text-xl font-mono font-black ${stat.c}`}>{stat.v}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);