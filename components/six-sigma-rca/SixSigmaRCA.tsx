import React, { useState } from 'react';
import { Target, CheckCircle, Activity, Globe } from 'lucide-react';
import { renderPhaseContent } from './helpers.tsx';
import { Sidebar } from './Sidebar';

type Phase = 'DEFINE' | 'MEASURE' | 'ANALYZE' | 'IMPROVE' | 'CONTROL';

export const SixSigmaRCA: React.FC = () => {
  const [activePhase, setActivePhase] = useState<Phase>('ANALYZE');

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-6 min-h-screen animate-in fade-in duration-700">
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
              }`}>
              {phase}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <main className="lg:col-span-8 space-y-8">
          {renderPhaseContent(activePhase)}
        </main>
        <Sidebar />
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