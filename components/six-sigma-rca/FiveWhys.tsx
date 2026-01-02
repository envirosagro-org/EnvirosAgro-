import React, { useState } from 'react';
import { FileSearch, ChevronRight, RotateCcw } from 'lucide-react';
import { whys } from './constants';

export const FiveWhys = () => {
  const [whyStep, setWhyStep] = useState(0);

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-8 -m-4">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <div>
          <h4 className="font-bold text-lg text-white">5 Whys Root Cause Drilldown</h4>
          <p className="text-sm text-slate-400">Sequentially asking 'Why?' to uncover the core issue.</p>
        </div>
        {whyStep > 0 && (
            <button 
              onClick={() => setWhyStep(0)}
              className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
                <RotateCcw size={14} /> Reset
            </button>
        )}
      </div>
      
      <div className="space-y-6">
        {whys.slice(0, whyStep + 1).map((step, i) => (
          <div key={i} className="flex gap-4 animate-in slide-in-from-bottom-2 duration-500">
            <div className="w-10 h-10 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center font-bold text-blue-300 shrink-0 text-sm">
              #{i + 1}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold uppercase text-blue-400 tracking-wider mb-1">{step.q}</p>
              <p className="text-base text-slate-300 leading-relaxed font-light">{step.a}</p>
            </div>
          </div>
        ))}
        {whyStep < whys.length - 1 && (
          <button
            onClick={() => setWhyStep(prev => prev + 1)}
            className="w-full text-center py-3 mt-4 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/40 rounded-lg text-sm font-bold text-blue-300 transition-all flex items-center justify-center gap-2"
          >
            Drill Down <ChevronRight size={16} />
          </button>
        )}
        {whyStep === whys.length - 1 && (
            <div className="p-4 mt-4 bg-green-900/50 border border-green-500/30 rounded-lg text-center">
                <p className="text-sm font-bold text-green-300">Root Cause Identified</p>
            </div>
        )}
      </div>
    </div>
  );
}