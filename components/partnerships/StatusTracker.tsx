import React from 'react';
import { ShieldCheck, Activity, ArrowUpRight } from 'lucide-react';

interface StatusTrackerProps {
  autoStep: number;
  paymentVerified: boolean;
  issuedId: string | null;
  onNavigateToHub: () => void;
}

export const StatusTracker: React.FC<StatusTrackerProps> = ({
  autoStep,
  paymentVerified,
  issuedId,
  onNavigateToHub,
}) => {
  const steps = [
    { label: 'Uplink Initiated', status: autoStep >= 1 ? 'COMPLETED' : 'PENDING', time: '12m ago', desc: 'Secure node established with central repository.' },
    { label: 'Evaluation Engine', status: autoStep >= 2 ? 'COMPLETED' : 'PENDING', time: '8m ago', desc: 'AI-driven alignment check against Five Thrusts.' },
    { label: 'Bid Selection', status: autoStep >= 3 ? 'COMPLETED' : 'PENDING', time: '4m ago', desc: 'Matching organizational offer with network needs.' },
    { label: 'Payment Verification', status: paymentVerified ? 'COMPLETED' : 'PENDING', time: 'Ongoing', desc: 'Integration fee settlement via Tokenz™ Gateway.' },
    { label: 'Hub Integration', status: issuedId ? 'COMPLETED' : 'PENDING', time: 'Expected', desc: 'Final issuance of Sync-Key for Network Input Hub.' }
  ];

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <div className="bg-white dark:bg-earth-900 rounded-[3.5rem] border border-earth-100 dark:border-white/5 shadow-cinematic p-12 lg:p-16">
        <div className="flex justify-between items-start mb-16">
          <div>
            <h3 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-2">Application Tracker</h3>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
              {issuedId ? `SYNCED: ${issuedId}` : 'ID: EA-PART-2024-PENDING-X'}
            </p>
          </div>
          <div className="bg-agro-50 dark:bg-agro-900/30 px-6 py-2 rounded-2xl border border-agro-100 dark:border-agro-800 text-agro-700 dark:text-agro-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-3">
            <Activity size={16} className="animate-pulse" /> LIVE_AUDIT_ACTIVE
          </div>
        </div>

        <div className="relative space-y-12">
          <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-earth-100 dark:bg-white/5"></div>

          {steps.map((step, i) => (
            <div key={i} className="relative flex gap-10 items-start group">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-white dark:border-earth-900 shadow-xl transition-all duration-700 ${
                step.status === 'COMPLETED' ? 'bg-agro-600 text-white' :
                  'bg-earth-100 dark:bg-earth-800 text-earth-300'
                }`}>
                {step.status === 'COMPLETED' ? <ShieldCheck size={24} /> :
                  <div className="w-2.5 h-2.5 rounded-full bg-current"></div>}
              </div>
              <div className={`flex-1 transition-all duration-500 ${step.status === 'PENDING' ? 'opacity-40 grayscale' : 'opacity-100'}`}>
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-lg text-earth-900 dark:text-white">{step.label}</h4>
                  <span className="text-[9px] font-black text-earth-400 uppercase tracking-widest">{step.time}</span>
                </div>
                <p className="text-xs text-earth-500 dark:text-earth-400 leading-relaxed font-medium">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {issuedId && (
          <button
            onClick={onNavigateToHub}
            className="w-full mt-16 bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[2rem] text-xs uppercase tracking-[0.4em] shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-4"
          >
            Access Network Input Hub <ArrowUpRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};
