import React from 'react';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';

interface SubscriptionBoxProps {
  email: string;
  setEmail: (email: string) => void;
  subStatus: 'IDLE' | 'LOADING' | 'SUCCESS';
  handleSubscribe: (e: React.FormEvent) => void;
}

export const SubscriptionBox: React.FC<SubscriptionBoxProps> = ({
  email,
  setEmail,
  subStatus,
  handleSubscribe,
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Mail size={150} /></div>
      <div className="relative z-10">
        <Mail size={32} className="mb-4 text-blue-400" />
        <h3 className="text-xl font-bold mb-2">Get the Weekly Brief</h3>
        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
          Essential market data, m(t) indices, and industrial policy updates delivered directly.
        </p>

        {subStatus === 'SUCCESS' ? (
          <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 flex items-center gap-3 animate-in zoom-in">
            <CheckCircle2 size={24} className="text-green-400 shrink-0" />
            <p className="text-xs font-bold text-green-100">Subscription Active. Welcome to the industrial network.</p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Corporate Email"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 text-white transition-all"
            />
            <button
              type="submit"
              disabled={subStatus === 'LOADING'}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-3.5 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 text-xs uppercase tracking-widest disabled:opacity-50"
            >
              {subStatus === 'LOADING' ? <><Loader2 size={16} className="animate-spin" /> Syncing Gateway...</> : 'Subscribe Free'}
            </button>
          </form>
        )}

        <p className="text-center text-[10px] text-slate-500 mt-6 font-black uppercase tracking-widest opacity-60">
          Join 15k+ Global Stakeholders
        </p>
      </div>
    </div>
  );
};
