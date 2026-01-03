
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const esinSteps = (
  generatedEsin: string, 
  handleIssueEsin: () => void, 
  setStep: (step: number) => void
) => [
  {
    title: 'Identity Verification',
    content: (
      <div className="space-y-4 animate-in slide-in-from-right-2 text-center">
        <h4 className="font-bold text-base text-slate-900 dark:text-white">Identity Verification</h4>
        <p className="text-xs text-earth-500 dark:text-earth-400">Linking sustainability efforts across Five Thrusts.</p>
        <button onClick={() => setStep(1)} className="w-full bg-agro-600 text-white font-black py-3 rounded-xl text-[9px] uppercase tracking-widest">Start Verification</button>
      </div>
    ),
  },
  {
    title: 'Geolocation Sync',
    content: (
      <div className="space-y-4 animate-in slide-in-from-right-2 text-center">
        <h4 className="font-bold text-base text-slate-900 dark:text-white">Geolocation Sync</h4>
        <p className="text-xs text-earth-500 dark:text-earth-400">Connect to regional network node.</p>
        <button onClick={() => setStep(2)} className="w-full bg-agro-600 text-white font-black py-3 rounded-xl text-[9px] uppercase tracking-widest">Sync Coordinates</button>
      </div>
    ),
  },
  {
    title: 'ESIN Issued',
    content: (
      <div className="text-center py-4 animate-in zoom-in">
        <CheckCircle2 size={40} className="text-green-500 mx-auto mb-3" />
        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">ESIN Issued</h4>
        <p className="font-mono text-base text-agro-600 font-bold mb-6">{generatedEsin}</p>
        <button onClick={handleIssueEsin} className="w-full bg-agro-900 text-white font-black py-3 rounded-xl text-[9px] uppercase tracking-widest">View Digital ID</button>
      </div>
    ),
  },
];
