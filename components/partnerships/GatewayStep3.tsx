import React from 'react';
import { CheckCircle2, Stamp, ArrowRight } from 'lucide-react';

interface GatewayStep3Props {
  onNext: () => void;
}

export const GatewayStep3: React.FC<GatewayStep3Props> = ({ onNext }) => {
  return (
    <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-2">03. Selection & Tendering</h4>
          <p className="text-earth-500 dark:text-earth-400 font-medium">Automatic matching of your offer with network-wide industrial requirements.</p>
        </div>
        <div className="bg-agro-500/20 text-agro-600 p-4 rounded-3xl border border-agro-500/30 shadow-inner">
          <CheckCircle2 size={32} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-earth-800 p-10 rounded-[3.5rem] border border-earth-100 dark:border-earth-700 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000"><Stamp size={150} /></div>
          <h5 className="font-black text-[10px] text-blue-600 uppercase tracking-[0.4em] mb-6">Tender Status</h5>
          <p className="text-4xl font-serif font-bold text-earth-900 dark:text-white mb-4 tracking-tighter">Approved</p>
          <p className="text-sm text-earth-500 dark:text-earth-400 leading-relaxed font-medium mb-10">Your organization has been selected for direct integration into the <strong className="text-blue-500">Technical Agriculture (TA)</strong> Node Cluster.</p>
          <div className="flex items-center gap-2 text-[9px] font-black text-agro-600 uppercase tracking-widest">
            <CheckCircle2 size={14} /> Bid Verified by IA Hub
          </div>
        </div>

        <div className="bg-earth-50 dark:bg-earth-950/40 p-10 rounded-[3.5rem] border-2 border-dashed border-earth-200 dark:border-earth-800 flex flex-col justify-center">
          <h5 className="font-black text-[10px] text-earth-400 uppercase tracking-[0.4em] mb-4">Next Action</h5>
          <p className="text-sm text-earth-600 dark:text-earth-400 leading-relaxed font-medium">
            To unlock the <strong>Transmission Gateways</strong> and <strong>Hub Ingest Keys</strong>, a network integration fee is required. This fuels the decentralized m(t) ledger maintenance.
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-agro-600 hover:bg-agro-700 text-white font-black py-6 rounded-[2rem] text-xs uppercase tracking-[0.4em] shadow-xl shadow-agro-600/20 active:scale-95 transition-all flex items-center justify-center gap-4"
      >
        Authorize Integration Payment <ArrowRight size={20} />
      </button>
    </div>
  );
};
