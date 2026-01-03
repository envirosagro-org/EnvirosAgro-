import React, { useState } from 'react';
import { RCAHeader } from './RCAHeader';
import { DmaicNavigation } from './DmaicNavigation';
import { DefinePhase } from './DefinePhase';
import { MeasurePhase } from './MeasurePhase';
import { AnalyzePhase } from './AnalyzePhase';
import { ImprovePhase } from './ImprovePhase';
import { ControlPhase } from './ControlPhase';
import { RcaSidebar } from './RcaSidebar';
import { Globe, Activity } from 'lucide-react';

type Phase = 'DEFINE' | 'MEASURE' | 'ANALYZE' | 'IMPROVE' | 'CONTROL';

const SixSigmaRCA: React.FC = () => {
  const [activePhase, setActivePhase] = useState<Phase>('ANALYZE');

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-6 min-h-screen animate-in fade-in duration-700">
      <RCAHeader />

      <DmaicNavigation activePhase={activePhase} setActivePhase={setActivePhase} />

      <div className="grid lg:grid-cols-12 gap-8">
        <main className="lg:col-span-8 space-y-8">
          {activePhase === 'DEFINE' && <DefinePhase />}
          {activePhase === 'MEASURE' && <MeasurePhase />}
          {activePhase === 'ANALYZE' && <AnalyzePhase />}
          {activePhase === 'IMPROVE' && <ImprovePhase />}
          {activePhase === 'CONTROL' && <ControlPhase />}
        </main>

        <RcaSidebar />
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

export default SixSigmaRCA;
