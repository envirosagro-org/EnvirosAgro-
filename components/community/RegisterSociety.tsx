import React from 'react';
import { Building2 } from 'lucide-react';

export const RegisterSociety: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-earth-900 p-8 rounded-[2rem] shadow-sm border border-earth-100 dark:border-earth-800">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-600">
            <Building2 size={24} />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">Register Society</h3>
            <p className="text-xs text-earth-500 dark:text-earth-400">Scale collective impact.</p>
          </div>
        </div>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Society onboarding initiated."); }}>
          <div className="space-y-1">
            <label className="text-[9px] font-black text-earth-400 uppercase tracking-widest px-1">Society Name</label>
            <input required className="w-full bg-earth-50 dark:bg-earth-800 border border-earth-100 dark:border-earth-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-500 dark:text-white" placeholder="e.g. Mt. Kenya Organic Society" />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black text-earth-400 uppercase tracking-widest px-1">Certificate ID</label>
            <input required className="w-full bg-earth-50 dark:bg-earth-800 border border-earth-100 dark:border-earth-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-500 dark:text-white" placeholder="REG-XX-XXXX" />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl text-[9px] uppercase tracking-widest shadow-lg transition-all">Onboard Society</button>
        </form>
      </div>
    </div>
  );
};
