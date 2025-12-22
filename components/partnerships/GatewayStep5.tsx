import React from 'react';
import { ShieldCheck, Key, Smartphone, Share2, Database, Link, BarChart3, ArrowUpRight } from 'lucide-react';

interface GatewayStep5Props {
  orgName: string;
  issuedId: string | null;
  onNavigateToHub: () => void;
  onNavigateToDirectory: () => void;
  triggerHaptic: (pattern: number | number[]) => void;
}

export const GatewayStep5: React.FC<GatewayStep5Props> = ({
  orgName,
  issuedId,
  onNavigateToHub,
  onNavigateToDirectory,
  triggerHaptic,
}) => {
  return (
    <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
      <div className="text-center max-w-2xl mx-auto">
        <h4 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-2">05. Hub Integration Key</h4>
        <p className="text-earth-50 dark:text-earth-400 font-medium">Your unique identifier for the Network Input Hub is active.</p>
      </div>

      <div className="bg-slate-900 rounded-[4rem] p-12 text-white relative overflow-hidden shadow-2xl border-4 border-blue-600/30 group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700"><Key size={300} /></div>

        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="w-48 h-48 bg-white/10 rounded-[3rem] border border-white/20 flex items-center justify-center shadow-inner backdrop-blur-xl group-hover:rotate-6 transition-transform duration-700">
            <Smartphone size={80} className="text-blue-400 animate-float" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 bg-blue-600 text-white px-4 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest mb-4 w-fit shadow-xl">
              <ShieldCheck size={14} /> Organization Verified
            </div>
            <h5 className="text-3xl font-serif font-bold mb-4">{orgName}</h5>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8">Official Partner Sync Key</p>

            <div className="bg-black/60 p-6 rounded-2xl border border-white/10 flex items-center justify-between group/key">
              <code className="text-xl font-mono font-black text-blue-400 tracking-[0.2em]">{issuedId}</code>
              <button onClick={() => { navigator.clipboard.writeText(issuedId || ''); triggerHaptic(10); }} className="p-3 bg-white/5 hover:bg-white/20 rounded-xl text-white transition-all opacity-0 group-hover/key:opacity-100">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-10 border-t border-white/5 grid md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white/5 rounded-lg text-blue-500"><Database size={16} /></div>
            <div><p className="text-[9px] font-black text-slate-500 uppercase">Input Node</p><p className="text-xs font-bold">Enabled</p></div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white/5 rounded-lg text-agro-500"><Link size={16} /></div>
            <div><p className="text-[9px] font-black text-slate-500 uppercase">Trade Link</p><p className="text-xs font-bold">Authorized</p></div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white/5 rounded-lg text-amber-500"><BarChart3 size={16} /></div>
            <div><p className="text-[9px] font-black text-slate-500 uppercase">Analytics Access</p><p className="text-xs font-bold">Priority</p></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={onNavigateToHub}
          className="flex-1 bg-agro-600 hover:bg-agro-700 text-white font-black py-6 rounded-[2rem] text-sm uppercase tracking-[0.3em] shadow-xl shadow-agro-600/30 active:scale-95 transition-all flex items-center justify-center gap-4"
        >
          Enter Input Hub <ArrowUpRight size={24} />
        </button>
        <button
          onClick={onNavigateToDirectory}
          className="flex-1 bg-white dark:bg-earth-800 border-2 border-earth-100 dark:border-earth-700 text-earth-500 py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] transition-all"
        >
          Partner Directory
        </button>
      </div>
    </div>
  );
};
