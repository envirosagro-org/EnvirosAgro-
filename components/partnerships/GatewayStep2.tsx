import React from 'react';
import { BarChart3, Terminal, Loader2, Sparkles, ArrowRight } from 'lucide-react';

interface GatewayStep2Props {
  isVerifying: boolean;
  verificationLogs: string[];
  evaluationFeedback: string | null;
  onNext: () => void;
}

export const GatewayStep2: React.FC<GatewayStep2Props> = ({
  isVerifying,
  verificationLogs,
  evaluationFeedback,
  onNext,
}) => {
  return (
    <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-10">
          <div className="w-32 h-32 rounded-full border-4 border-blue-500/10 border-t-blue-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <BarChart3 size={40} className="text-blue-500 animate-pulse" />
          </div>
        </div>
        <h4 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-2">02. Evaluation Engine</h4>
        <p className="text-earth-500 dark:text-earth-400 font-medium">System is analyzing your organizational profile against network resilience standards.</p>
      </div>

      <div className="bg-slate-950 p-8 rounded-[3rem] border border-white/5 shadow-inner min-h-[300px] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Terminal size={14} className="text-blue-400" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Audit_Log_Stream</span>
          </div>
          <div className="bg-white/5 px-3 py-1 rounded-lg">
            <span className="text-[10px] font-mono text-white/40">{isVerifying ? 'PROCESS_ACTIVE' : 'AUDIT_COMPLETE'}</span>
          </div>
        </div>
        <div className="space-y-2 flex-1 font-mono text-xs overflow-y-auto max-h-48 ea-scroll-area">
          {verificationLogs.map((log, i) => (
            <div key={i} className="flex gap-4 text-slate-400 animate-in slide-in-from-left-2">
              <span className="text-blue-500 opacity-60">[{new Date().toLocaleTimeString()}]</span>
              <span className="uppercase">{log}</span>
            </div>
          ))}
          {isVerifying && <div className="flex gap-2 items-center text-blue-400"><Loader2 size={12} className="animate-spin" /> <span>ANALYZING_PAYLOAD...</span></div>}
        </div>

        {!isVerifying && evaluationFeedback && (
          <div className="mt-8 p-6 bg-blue-600/10 border border-blue-500/30 rounded-2xl animate-in zoom-in">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles size={16} className="text-blue-400" />
              <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">System Decision Breakdown</span>
            </div>
            <p className="text-sm text-blue-100 italic leading-relaxed">{evaluationFeedback}</p>
          </div>
        )}
      </div>

      {!isVerifying && (
        <button
          onClick={onNext}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[2rem] text-xs uppercase tracking-[0.4em] shadow-xl shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-4"
        >
          Proceed to Selection <ArrowRight size={20} />
        </button>
      )}
    </div>
  );
};
