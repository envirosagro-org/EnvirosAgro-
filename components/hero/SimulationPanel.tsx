import React from 'react';
import { Satellite, Activity, Sun, Droplets } from 'lucide-react';

interface SimParams {
  dn: number;
  inVal: number;
  ca: number;
  s: number;
}

interface SimulationPanelProps {
  currentM: string;
  simParams: SimParams;
  setSimParams: (params: SimParams) => void;
}

export const SimulationPanel: React.FC<SimulationPanelProps> = ({ currentM, simParams, setSimParams }) => {
  return (
    <div className="lg:col-span-5 hidden lg:block animate-in fade-in zoom-in-95 duration-1000 delay-300">
      <div className="bg-slate-900/60 dark:bg-black/60 backdrop-blur-[100px] rounded-[6rem] p-20 shadow-[0_80px_150px_rgba(0,0,0,0.8)] relative overflow-hidden group border-4 border-white/5 ring-1 ring-white/10">
        <div className="absolute top-0 right-0 p-12 opacity-[0.04] text-agro-500 pointer-events-none group-hover:scale-110 transition-transform duration-[20s]">
          <Satellite size={450} />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-28 h-28 bg-agro-500/10 rounded-[3rem] flex items-center justify-center mb-16 shadow-inner border border-agro-500/20 ring-8 ring-agro-500/5 transition-all group-hover:scale-110 group-hover:rotate-6">
            <Activity size={56} className="text-agro-500 animate-pulse" />
          </div>
          
          <div className="mb-20">
            <div className="text-[12rem] xl:text-[15rem] font-serif font-black text-white tracking-tighter leading-none transition-all duration-700 select-none group-hover:scale-[1.02] drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              {currentM}
            </div>
            <div className="text-[11px] font-black text-agro-500 uppercase tracking-[0.8em] mt-10 flex items-center justify-center gap-8">
              <span className="w-20 h-px bg-white/10"></span>
              GLOBAL_CALCULATION_SYNCED
              <span className="w-20 h-px bg-white/10"></span>
            </div>
          </div>

          <div className="w-full space-y-12 bg-black/40 p-12 rounded-[4rem] border border-white/5 shadow-inner backdrop-blur-2xl">
            <div className="space-y-6">
              <div className="flex justify-between items-center px-4">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] flex items-center gap-3">
                  <Sun size={14} className="text-amber-500" /> Rainfall (Dn)
                </span>
                <span className="font-mono font-bold text-white text-2xl">{simParams.dn.toFixed(1)} mo</span>
              </div>
              <input 
                type="range" min="2" max="12" step="0.1"
                value={simParams.dn}
                onChange={(e) => setSimParams({...simParams, dn: parseFloat(e.target.value)})}
                className="w-full accent-agro-500 h-2 bg-white/10 rounded-full appearance-none cursor-pointer border border-white/5"
              />
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-center px-4">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] flex items-center gap-3">
                  <Droplets size={14} className="text-blue-500" /> Integrity (In)
                </span>
                <span className="font-mono font-bold text-white text-2xl">{simParams.inVal.toFixed(1)}</span>
              </div>
              <input 
                type="range" min="1" max="10" step="0.1"
                value={simParams.inVal}
                onChange={(e) => setSimParams({...simParams, inVal: parseFloat(e.target.value)})}
                className="w-full accent-blue-500 h-2 bg-white/10 rounded-full appearance-none cursor-pointer border border-white/5"
              />
            </div>
          </div>
          
          <div className="mt-14 flex items-center gap-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.6em]">
            <div className="w-2 h-2 bg-agro-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
            GLOBAL_CALCULATION_SYNCED
          </div>
        </div>
      </div>
    </div>
  );
};