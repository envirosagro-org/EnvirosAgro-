import React from 'react';
import { Gauge } from 'lucide-react';
import { DPMO_DATA } from './constants';

export const MeasurePhase: React.FC = () => (
  <div className="ea-card p-12 space-y-10 animate-in slide-in-from-left-4">
    <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white flex items-center gap-3">
      <Gauge className="text-blue-500" /> DPMO Baseline
    </h3>
    <div className="h-[400px] w-full">
      <div className="h-full flex items-center justify-center text-slate-500">
          <p>Chart will be displayed here</p>
      </div>
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
);
