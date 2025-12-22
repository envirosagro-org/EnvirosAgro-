import React from 'react';
import { Fingerprint, CheckCircle2 } from 'lucide-react';

interface GetESINProps {
  esinStep: number;
  setEsinStep: (step: number) => void;
  setActiveTab: (tab: any) => void;
}

export const GetESIN: React.FC<GetESINProps> = ({ esinStep, setEsinStep, setActiveTab }) => {
  return (
    <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-earth-900 rounded-[2rem] shadow-sm border border-earth-100 dark:border-earth-800 overflow-hidden">
        <div className="bg-agro-900 p-6 text-white text-center">
          <h3 className="text-xl font-serif font-bold flex items-center justify-center gap-3">
            <Fingerprint size={20} /> Issuance Terminal
          </h3>
        </div>
        <div className="p-8 space-y-6">
          <div className="flex justify-between relative mb-8 px-4">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-earth-100 dark:bg-earth-800 -z-10 -translate-y-1/2"></div>
            {[1, 2, 3].map(step => (
              <div key={step} className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-[10px] border-2 z-10 transition-all ${esinStep >= step ? 'bg-agro-600 border-agro-600 text-white' : 'bg-white dark:bg-earth-800 border-earth-100 dark:border-earth-800 text-earth-300'}`}>
                {step}
              </div>
            ))}
          </div>

          {esinStep === 1 && (
            <div className="space-y-4 animate-in slide-in-from-right-2 text-center">
              <h4 className="font-bold text-base text-slate-900 dark:text-white">Identity Verification</h4>
              <p className="text-xs text-earth-500 dark:text-earth-400">Linking sustainability efforts across Five Thrusts.</p>
              <button onClick={() => setEsinStep(2)} className="w-full bg-agro-600 text-white font-black py-3 rounded-xl text-[9px] uppercase tracking-widest">Start Verification</button>
            </div>
          )}
          {esinStep === 2 && (
            <div className="space-y-4 animate-in slide-in-from-right-2 text-center">
              <h4 className="font-bold text-base text-slate-900 dark:text-white">Geolocation Sync</h4>
              <p className="text-xs text-earth-500 dark:text-earth-400">Connect to regional network node.</p>
              <button onClick={() => setEsinStep(3)} className="w-full bg-agro-600 text-white font-black py-3 rounded-xl text-[9px] uppercase tracking-widest">Sync Coordinates</button>
            </div>
          )}
          {esinStep === 3 && (
            <div className="text-center py-4 animate-in zoom-in">
              <CheckCircle2 size={40} className="text-green-500 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">ESIN Issued</h4>
              <p className="font-mono text-base text-agro-600 font-bold mb-6">EA-FAR-2024-8842</p>
              <button onClick={() => { setEsinStep(1); setActiveTab('ID_CARD'); }} className="w-full bg-agro-900 text-white font-black py-3 rounded-xl text-[9px] uppercase tracking-widest">View Digital ID</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
