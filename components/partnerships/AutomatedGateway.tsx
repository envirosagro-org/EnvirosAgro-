import React from 'react';
import { ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';

interface AutomatedGatewayProps {
  autoStep: number;
  children: React.ReactNode;
}

export const AutomatedGateway: React.FC<AutomatedGatewayProps> = ({ autoStep, children }) => {
  return (
    <div className="max-w-5xl mx-auto animate-in zoom-in-95 duration-500 pb-20">
      <div className="bg-white dark:bg-earth-900 rounded-[4rem] shadow-cinematic border border-earth-100 dark:border-white/5 overflow-hidden flex flex-col">
        {/* Gateway Header */}
        <div className="bg-slate-900 p-12 text-white flex flex-col md:flex-row justify-between items-center relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Zap size={300} /></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-blue-400 font-black uppercase tracking-[0.4em] text-[10px] mb-4">
              <ShieldCheck size={14} /> Automated Partnership Gateway
            </div>
            <h3 className="text-4xl font-serif font-bold">Network Entry Protocol</h3>
            <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em] mt-2">Verified Integration Sequence v4.2</p>
          </div>

          {/* Progress Stepper */}
          <div className="relative z-10 flex gap-4 mt-8 md:mt-0">
            {[1, 2, 3, 4, 5].map(s => (
              <div key={s} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs border-2 transition-all duration-500 ${
                  autoStep === s ? 'bg-blue-600 border-blue-500 text-white shadow-glow-blue' :
                  autoStep > s ? 'bg-green-600 border-green-500 text-white' :
                  'border-white/10 text-white/30'
                }`}>
                  {autoStep > s ? <CheckCircle2 size={20} /> : `0${s}`}
                </div>
                <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${autoStep >= s ? 'bg-blue-500' : 'bg-white/10'}`}></div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-12 lg:p-20 flex-1">
          {children}
        </div>

        {/* Gateway Footer */}
        <div className="p-8 bg-earth-50 dark:bg-earth-950/50 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-center gap-3 shrink-0">
          <ShieldCheck size={18} className="text-blue-500" />
          <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Audit Trail Hashed via Global Resilience Ledger • ISO-27001 Standard Compliance</p>
        </div>
      </div>
    </div>
  );
};
