import React from 'react';

type Phase = 'DEFINE' | 'MEASURE' | 'ANALYZE' | 'IMPROVE' | 'CONTROL';

interface DmaicNavigationProps {
  activePhase: Phase;
  setActivePhase: (phase: Phase) => void;
}

export const DmaicNavigation: React.FC<DmaicNavigationProps> = ({ activePhase, setActivePhase }) => (
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
);