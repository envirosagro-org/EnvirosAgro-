import React, { useState } from 'react';
import { 
  Target, CheckCircle, Activity, Globe, 
  ArrowLeft, ShieldCheck, Zap, Layers, 
  Search, FileText, ChevronRight, Info
} from 'lucide-react';
import { renderPhaseContent } from './helpers';
import { Sidebar } from './Sidebar';
import { View } from '../../types';

type Phase = 'DEFINE' | 'MEASURE' | 'ANALYZE' | 'IMPROVE' | 'CONTROL';

interface SixSigmaRCAProps {
    onNavigate?: (view: View) => void;
}

export const SixSigmaRCA: React.FC<SixSigmaRCAProps> = ({ onNavigate }) => {
  const [activePhase, setActivePhase] = useState<Phase>('ANALYZE');

  const PHASE_CONTEXT: any = {
    DEFINE: { label: 'Problem Definition', color: 'text-indigo-500', desc: 'Isolating the specific failure mode in the m(t) calculation node.' },
    MEASURE: { label: 'Data Collection', color: 'text-blue-500', desc: 'Quantifying defect frequency and impact across 14 regional nodes.' },
    ANALYZE: { label: 'Root Cause Analysis', color: 'text-purple-500', desc: 'Identifying the high-impact variables causing system deviation.' },
    IMPROVE: { label: 'Solution Deployment', color: 'text-agro-500', desc: 'Standardizing remediation protocols across the global network.' },
    CONTROL: { label: 'Sustained Stability', color: 'text-amber-500', desc: 'Implementing automated truth-check loops for continuous validation.' }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12 bg-white dark:bg-earth-950 transition-colors duration-500 min-h-screen">
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-10">
        <button 
          onClick={() => onNavigate?.(View.HOME)}
          className="flex items-center gap-2 text-earth-400 hover:text-agro-600 font-black text-[10px] uppercase tracking-widest transition-all group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Home
        </button>
      </div>

      <div className="ea-header-block p-10 md:p-14 mb-16 bg-slate-900/5 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-inner backdrop-blur-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000 rotate-12"><ShieldCheck size={300} /></div>
        
        <div className="flex flex-col xl:flex-row justify-between items-center gap-12 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
                <div className="ea-label-meta">
                   <Target size={14} className="text-agro-600" /> Organizational Quality Management
                </div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-slate-800/50 px-3 py-1 rounded-full border border-black/5 dark:border-white/5">QMS-NODE-V4.2</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif font-black text-earth-900 dark:text-white tracking-tighter leading-none mb-6">
              Six Sigma <span className="text-blue-600 italic">RCA Terminal</span>
            </h1>
            <p className="text-xl text-earth-500 dark:text-earth-400 max-w-2xl font-medium leading-relaxed italic">
              "Applying high-fidelity DMAIC methodology to isolate and resolve system-wide technical agriculture failures."
            </p>
          </div>

          <div className="flex flex-col items-center xl:items-end gap-6 shrink-0 w-full xl:w-auto">
            <div className="bg-agro-50 dark:bg-agro-900/30 px-10 py-5 rounded-[2rem] border border-agro-100 dark:border-agro-800 text-agro-700 dark:text-agro-400 font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 shadow-xl shadow-agro-600/10 backdrop-blur-md">
              <CheckCircle size={24} className="text-agro-600 shadow-glow-green" /> STATUS: RESOLVED
            </div>
            <div className="flex items-center gap-6">
               <div className="text-right">
                  <div className="text-[9px] font-black text-earth-400 uppercase tracking-[0.4em] mb-1">Audit Trail ID</div>
                  <div className="text-xs font-mono font-bold text-earth-900 dark:text-white">RCA-5592-EA-91</div>
               </div>
               <div className="w-px h-8 bg-earth-100 dark:bg-earth-800"></div>
               <div className="text-right">
                  <div className="text-[9px] font-black text-earth-400 uppercase tracking-[0.4em] mb-1">Sigma Level</div>
                  <div className="text-xs font-mono font-bold text-blue-600">6.0 σ</div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* DMAIC Navigation Hub */}
      <div className="flex flex-col items-center mb-20 gap-8">
        <div className="agro-glass p-2 rounded-[3.5rem] flex flex-wrap justify-center gap-2 border border-earth-100 dark:border-white/5 backdrop-blur-2xl shadow-cinematic">
          {(['DEFINE', 'MEASURE', 'ANALYZE', 'IMPROVE', 'CONTROL'] as Phase[]).map(phase => (
            <button
              key={phase}
              onClick={() => setActivePhase(phase)}
              className={`px-10 py-5 rounded-[3rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all flex flex-col items-center gap-1 ${
                activePhase === phase
                  ? 'bg-blue-600 text-white shadow-glow-blue scale-[1.02]'
                  : 'text-earth-400 hover:text-earth-900 dark:hover:text-white hover:bg-earth-50 dark:hover:bg-white/5'
              }`}>
              <span>{phase}</span>
              <div className={`w-1 h-1 rounded-full ${activePhase === phase ? 'bg-white' : 'bg-transparent'}`}></div>
            </button>
          ))}
        </div>
        
        <div className="text-center animate-in fade-in duration-1000">
            <h4 className={`text-sm font-black uppercase tracking-[0.4em] mb-2 ${PHASE_CONTEXT[activePhase].color}`}>{PHASE_CONTEXT[activePhase].label}</h4>
            <p className="text-xs text-earth-500 dark:text-earth-400 font-medium italic">"{PHASE_CONTEXT[activePhase].desc}"</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <main className="lg:col-span-8">
          <div className="bg-white dark:bg-earth-900 rounded-[3.5rem] border border-earth-100 dark:border-earth-800 shadow-sm p-10 md:p-14 min-h-[600px] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-[0.02] -rotate-12"><Zap size={400}/></div>
             {renderPhaseContent(activePhase)}
          </div>
        </main>
        <aside className="lg:col-span-4 space-y-8">
            <Sidebar />
            
            <div className="bg-indigo-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-1000 rotate-12"><FileText size={180} /></div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-6">Quality Repository</h4>
                <p className="text-sm text-indigo-100 font-medium leading-relaxed mb-10 italic relative z-10">
                    "Exporting the RCA-5592-EA dossier to the Strategic Database ensures this failure mode is never repeated."
                </p>
                <button className="relative z-10 w-full py-4 bg-white text-indigo-900 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                    Export Resolution Brief
                </button>
            </div>
        </aside>
      </div>

      <div className="mt-32 pt-16 border-t border-earth-100 dark:border-earth-800 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-earth-400">
        <div className="flex items-center gap-10">
          <span className="flex items-center gap-3"><Globe size={14} className="text-blue-500" /> Certified Quality Node</span>
          <span className="flex items-center gap-3"><Activity size={14} className="text-agro-500" /> Live Resilience Index: 8.54</span>
          <span className="flex items-center gap-3"><Layers size={14} className="text-purple-500" /> Thrust TA Compliant</span>
        </div>
        <p className="opacity-40">ENVIROSAGRO QMS v4.2.2-SIGMA-STABLE</p>
      </div>
    </div>
  );
};
