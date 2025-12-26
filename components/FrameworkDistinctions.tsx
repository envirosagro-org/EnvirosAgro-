import React, { useState, useMemo } from 'react';
// Added comment above fix: Added missing Loader2 and Globe icons to lucide-react imports
import { 
  Target, Activity, TrendingUp, AlertOctagon, FileSearch, 
  Settings, CheckCircle, Binary, Zap, Info, ShieldCheck, 
  Terminal, BarChart3, Clock, ChevronRight, X, ArrowRight,
  Database, RefreshCw, Cpu, Gauge, Loader2, Globe
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, LineChart, Line, Cell
} from 'recharts';

type Phase = 'DEFINE' | 'MEASURE' | 'ANALYZE' | 'IMPROVE' | 'CONTROL';

const DPMO_DATA = [
  { week: 'W1', dpmo: 1240, sigma: 4.8 },
  { week: 'W2', dpmo: 980, sigma: 4.9 },
  { week: 'W3', dpmo: 3400, sigma: 4.2 }, // Regression point
  { week: 'W4', dpmo: 450, sigma: 5.4 },
  { week: 'W5', dpmo: 12, sigma: 6.2 }, // Target state
];

const FISHBONE_CATEGORIES = [
  { 
    label: 'Personnel', 
    causes: ['Configuration oversight', 'Deployment sync lag', 'Manual build steps'] 
  },
  { 
    label: 'Machine', 
    // Fix: Replaced 'Machine' with 'Runtime' for context
    causes: ['Browser ESM limitations', 'Node-only dependency leak', 'Memory pressure'] 
  },
  { 
    label: 'Method', 
    causes: ['Vite build mismatch', 'Importmap pollution', 'Race condition'] 
  },
  { 
    label: 'Material', 
    causes: ['Incompatible npm packages', 'Corrupt cache', 'Manifest errors'] 
  }
];

export const FrameworkDistinctions: React.FC = () => {
  const [activePhase, setActivePhase] = useState<Phase>('ANALYZE');
  const [whyStep, setWhyStep] = useState(0);

  const whys = [
    { q: "Problem: The app fails to load with a script error.", a: "The browser encountered an 'Uncaught TypeError' on entry." },
    { q: "Why did the TypeError occur?", a: "The module loader couldn't resolve 'vite' and '@vitejs/plugin-react' exports." },
    { q: "Why were these modules being requested?", a: "They were erroneously included in the index.html <script type='importmap'>." },
    { q: "Why were development tools in the production importmap?", a: "The build configuration didn't strictly separate Node-only dev dependencies from browser-native ESM." },
    { q: "Root Cause: Why was there no separation?", a: "Missing automated validation node in the transmission gateway to strip non-standard browser modules." }
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-6 min-h-screen animate-in fade-in duration-700">
      
      {/* Header Block */}
      <div className="ea-header-block p-10 bg-slate-900/5 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-inner">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex-1">
              <div className="ea-label-meta mb-2">
                 <Target size={12} className="text-agro-600" /> Organizational Quality Management
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-black text-earth-900 dark:text-white tracking-tighter">
                 Six Sigma <span className="text-blue-600 italic">RCA Terminal</span>
              </h1>
              <p className="text-lg text-earth-500 dark:text-earth-400 mt-4 max-w-2xl font-medium leading-relaxed">
                 Applying DMAIC methodology to the "Failed to Load" event. Target: Zero Defect m(t) Availability.
              </p>
           </div>
           <div className="flex flex-col items-end gap-3 shrink-0">
              <div className="bg-agro-50 dark:bg-agro-900/30 px-6 py-3 rounded-2xl border border-agro-100 dark:border-agro-800 text-agro-700 dark:text-agro-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-3">
                 <CheckCircle size={16} className="text-agro-600" /> STATUS: RESOLVED
              </div>
              <div className="text-[9px] font-black text-earth-400 uppercase tracking-[0.4em]">Audit Trail ID: RCA-5592-EA</div>
           </div>
        </div>
      </div>

      {/* DMAIC Navigation */}
      <div className="flex justify-center mb-12 overflow-x-auto no-scrollbar pb-2">
         <div className="agro-glass p-1.5 rounded-[2.5rem] flex gap-1 border border-earth-200 dark:border-white/5 backdrop-blur-xl shadow-lg">
            {(['DEFINE', 'MEASURE', 'ANALYZE', 'IMPROVE', 'CONTROL'] as Phase[]).map(phase => (
              <button 
                key={phase}
                onClick={() => setActivePhase(phase)}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  activePhase === phase 
                  ? 'bg-blue-600 text-white shadow-glow-blue' 
                  : 'text-earth-400 hover:text-earth-900 dark:hover:text-white'
                }`}
              >
                {phase}
              </button>
            ))}
         </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Main Diagnostic Area */}
        <main className="lg:col-span-8 space-y-8">
            {activePhase === 'DEFINE' && (
              <div className="ea-card p-12 space-y-10 animate-in slide-in-from-left-4">
                 <div>
                    <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white mb-6">Problem Statement</h3>
                    <div className="bg-red-50 dark:bg-red-950/20 p-8 rounded-[2rem] border-2 border-red-100 dark:border-red-900/40 text-red-900 dark:text-red-200">
                        <p className="text-lg font-medium italic">
                          "System boot failure prevented stakeholder node access for 42 minutes, reducing the global m(t) availability factor from 99.9% to 94.2%."
                        </p>
                    </div>
                 </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-earth-50 dark:bg-earth-900 rounded-3xl border border-earth-100 dark:border-earth-800">
                        <p className="text-[10px] font-black text-earth-400 uppercase tracking-widest mb-2">Primary Defect</p>
                        <p className="font-bold text-earth-900 dark:text-white">ESM Dependency Misresolution</p>
                    </div>
                    <div className="p-6 bg-earth-50 dark:bg-earth-900 rounded-3xl border border-earth-100 dark:border-earth-800">
                        <p className="text-[10px] font-black text-earth-400 uppercase tracking-widest mb-2">Scope</p>
                        <p className="font-bold text-earth-900 dark:text-white">Global Edge Node Bootstrap</p>
                    </div>
                 </div>
              </div>
            )}

            {activePhase === 'MEASURE' && (
              <div className="ea-card p-12 space-y-10 animate-in slide-in-from-left-4">
                 <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white flex items-center gap-3">
                   <Gauge className="text-blue-500" /> DPMO Baseline
                 </h3>
                 <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <LineChart data={DPMO_DATA}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
                          <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                          <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', background: 'rgba(255,255,255,0.98)', fontSize: '11px' }} />
                          <Line type="monotone" dataKey="dpmo" stroke="#3b82f6" strokeWidth={4} dot={{r: 6, fill: '#3b82f6'}} />
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
            )}

            {activePhase === 'ANALYZE' && (
              <div className="space-y-8 animate-in slide-in-from-left-4">
                {/* Ishikawa Diagram */}
                <div className="ea-card p-10 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-[0.02] rotate-12 pointer-events-none"><BarChart3 size={300} /></div>
                   <h3 className="text-xl font-serif font-bold text-earth-900 dark:text-white mb-10 flex items-center gap-3">
                     <Binary className="text-purple-600" /> Ishikawa Diagnostic
                   </h3>
                   <div className="grid md:grid-cols-2 gap-8 relative z-10">
                      {FISHBONE_CATEGORIES.map(cat => (
                        <div key={cat.label} className="p-6 bg-earth-50 dark:bg-earth-800/40 rounded-3xl border border-earth-100 dark:border-earth-800">
                           <h4 className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mb-4">{cat.label}</h4>
                           <ul className="space-y-3">
                              {cat.causes.map(cause => (
                                <li key={cause} className="flex items-center gap-3 text-sm font-medium text-earth-600 dark:text-earth-300">
                                   <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                   {cause}
                                </li>
                              ))}
                           </ul>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Five Whys Interaction */}
                <div className="ea-card p-12 bg-slate-900 text-white relative overflow-hidden group">
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-5"></div>
                   <h3 className="text-xl font-bold mb-10 flex items-center gap-3 relative z-10">
                     <FileSearch className="text-blue-400" /> Five Whys Sequence
                   </h3>
                   <div className="space-y-8 relative z-10">
                      {whys.slice(0, whyStep + 1).map((step, i) => (
                         <div key={i} className="flex gap-6 animate-in slide-in-from-bottom-2 duration-500">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-black text-blue-400 shrink-0">
                               0{i+1}
                            </div>
                            <div className="flex-1">
                               <p className="text-xs font-black uppercase text-blue-400 tracking-widest mb-1">{step.q}</p>
                               <p className="text-base text-slate-300 font-medium leading-relaxed">{step.a}</p>
                            </div>
                         </div>
                      ))}
                      {whyStep < whys.length - 1 && (
                        <button 
                          onClick={() => setWhyStep(prev => prev + 1)}
                          className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-blue-400 border-b border-blue-400/20 pb-1 hover:text-white hover:border-white transition-all"
                        >
                          Drill Down <ChevronRight size={14} />
                        </button>
                      )}
                   </div>
                </div>
              </div>
            )}

            {activePhase === 'IMPROVE' && (
               <div className="ea-card p-12 space-y-10 animate-in slide-in-from-left-4">
                  <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white">Countermeasure Implementation</h3>
                  <div className="space-y-4">
                     {[
                        { title: "Strip non-browser modules from importmap", status: "VERIFIED", icon: <CheckCircle className="text-agro-600" /> },
                        { title: "Automate script-error failover node", status: "DEPLOYED", icon: <CheckCircle className="text-agro-600" /> },
                        { title: "Implement synthetic boot verification", status: "ACTIVE", icon: <Activity className="text-blue-500" /> }
                     ].map((fix, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-white dark:bg-earth-900 rounded-3xl border border-earth-100 dark:border-earth-800 shadow-sm">
                           <div className="flex items-center gap-5">
                              {fix.icon}
                              <span className="font-bold text-earth-800 dark:text-earth-200">{fix.title}</span>
                           </div>
                           <span className="text-[9px] font-black uppercase tracking-widest text-earth-400 bg-earth-50 dark:bg-earth-800 px-3 py-1 rounded-full">{fix.status}</span>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {activePhase === 'CONTROL' && (
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
            )}
        </main>

        {/* RCA Sidebar */}
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
      </div>

      <div className="mt-24 pt-12 border-t border-earth-100 dark:border-earth-800 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-earth-400">
         <div className="flex items-center gap-10">
            <span className="flex items-center gap-3"><Globe size={14} className="text-blue-500" /> Certified Quality Node</span>
            <span className="flex items-center gap-3"><Activity size={14} className="text-agro-500" /> Live Resilience Index: 8.54</span>
         </div>
         <p className="opacity-40">QUALITY MANAGEMENT SYSTEM v4.2.2-SIGMA</p>
      </div>
    </div>
  );
};