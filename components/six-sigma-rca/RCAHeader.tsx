import React from 'react';
import { Target, CheckCircle } from 'lucide-react';

export const RCAHeader: React.FC = () => (
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
);