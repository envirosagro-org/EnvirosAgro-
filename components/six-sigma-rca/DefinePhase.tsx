import React from 'react';

export const DefinePhase: React.FC = () => (
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
);