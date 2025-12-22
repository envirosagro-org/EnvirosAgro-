import React from 'react';
import { Users } from 'lucide-react';

export const RegisterGroup: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-earth-900 p-8 rounded-[2rem] shadow-sm border border-earth-100 dark:border-earth-800">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-rose-50 dark:bg-rose-900/30 rounded-xl text-rose-600">
            <Users size={24} />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">Register Group</h3>
            <p className="text-xs text-earth-500 dark:text-earth-400">Formalize your production node.</p>
          </div>
        </div>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Registry request transmitted."); }}>
          <div className="space-y-1">
            <label className="text-[9px] font-black text-earth-400 uppercase tracking-widest px-1">Group Legal Name</label>
            <input required className="w-full bg-earth-50 dark:bg-earth-800 border border-earth-100 dark:border-earth-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-500 dark:text-white" placeholder="e.g. Kiriaini Smallholders" />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black text-earth-400 uppercase tracking-widest px-1">Coordinator ESIN</label>
            <input required className="w-full bg-earth-50 dark:bg-earth-800 border border-earth-100 dark:border-earth-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-500 dark:text-white" placeholder="EA-FAR-2024-XXXX" />
          </div>
          <button type="submit" className="w-full bg-agro-600 hover:bg-agro-700 text-white font-black py-3 rounded-xl text-[9px] uppercase tracking-widest shadow-lg transition-all">Submit Registry Application</button>
        </form>
      </div>
    </div>
  );
};
