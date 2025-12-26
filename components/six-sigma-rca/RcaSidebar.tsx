import React from 'react';
import { Zap, Terminal, Loader2 } from 'lucide-react';

export const RcaSidebar: React.FC = () => (
  <aside className="lg:col-span-4 space-y-8">
    <div className="ea-card p-10 bg-blue-600 text-white shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-1000"><Zap size={180} /></div>
      <div className="relative z-10">
        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-blue-200">Critical Quality Stat</h4>
        <div className="text-6xl font-serif font-bold mb-4 tracking-tighter">6.2 σ</div>
        <p className="text-sm font-medium leading-relaxed mb-10 opacity-80">The EnvirosAgro network is operating at Six Sigma reliability. This equates to fewer than 3.4 defects per million boot opportunities.</p>
        <button className="w-full bg-white text-blue-700 font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Download Audit PDF</button>
      </div>
    </div>

    <div className="ea-card p-8 bg-slate-900 border-white/5 relative overflow-hidden flex flex-col h-[400px]">
      <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.6em] mb-8 flex items-center gap-4">
        <Terminal size={18} className="text-blue-500" /> Error Log Sink
      </h3>
      <div className="flex-1 font-mono text-[10px] text-slate-400 space-y-2 ea-scroll-area overflow-y-auto pr-2">
        <p className="text-green-500">[08:42:01] Edge connection established.</p>
        <p className="text-green-500">[08:42:02] Manifest validation: PASSED.</p>
        <p className="text-blue-400">[08:42:04] Stripping Node dependency: 'vite'...</p>
        <p className="text-blue-400">[08:42:05] Stripping Node dependency: '@vitejs/plugin-react'...</p>
        <p className="text-green-500">[08:42:08] Boot environment: NATIVE_BROWSER_ESM.</p>
        <p className="text-agro-400">[08:42:12] Synchronization complete. m(t) node initialized.</p>
        <div className="flex items-center gap-2 text-blue-500 pt-4 animate-pulse">
          <Loader2 size={12} className="animate-spin" />
          <span>LISTENING_FOR_DEFECTS...</span>
        </div>
      </div>
    </div>
  </aside>
);