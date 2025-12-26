import React, { useState } from 'react';
import { Binary, FileSearch, BarChart3, ChevronRight } from 'lucide-react';

const FISHBONE_CATEGORIES = [
  { 
    label: 'Personnel', 
    causes: ['Configuration oversight', 'Deployment sync lag', 'Manual build steps'] 
  },
  { 
    label: 'Machine', 
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

const whys = [
  { q: "Problem: The app fails to load with a script error.", a: "The browser encountered an 'Uncaught TypeError' on entry." },
  { q: "Why did the TypeError occur?", a: "The module loader couldn't resolve 'vite' and '@vitejs/plugin-react' exports." },
  { q: "Why were these modules being requested?", a: "They were erroneously included in the index.html <script type='importmap'>." },
  { q: "Why were development tools in the production importmap?", a: "The build configuration didn't strictly separate Node-only dev dependencies from browser-native ESM." },
  { q: "Root Cause: Why was there no separation?", a: "Missing automated validation node in the transmission gateway to strip non-standard browser modules." }
];

export const AnalyzePhase: React.FC = () => {
  const [whyStep, setWhyStep] = useState(0);

  return (
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
                0{i + 1}
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
  );
};