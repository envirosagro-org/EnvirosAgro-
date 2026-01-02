import React from 'react';
import { Leaf, Zap, Plus } from 'lucide-react';

export const LedgerHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
      <div>
        <div className="flex items-center gap-2 text-green-600 font-bold uppercase tracking-wider text-xs mb-2">
          <Leaf size={16} /> Impact Accounting
        </div>
        <h2 className="text-4xl font-serif font-bold text-agro-900 dark:text-white">Carbon Ledger</h2>
        <p className="text-xl text-earth-600 dark:text-earth-400 max-w-2xl">
          Quantify your farm's environmental contributions and manage your carbon credit assets.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="bg-white dark:bg-earth-900 px-6 py-4 rounded-2xl border border-earth-100 dark:border-earth-800 shadow-sm flex items-center gap-6">
          <div>
            <p className="text-xs font-bold text-earth-400 uppercase">Total Sequestration</p>
            <p className="text-3xl font-serif font-bold text-agro-700 dark:text-agro-400">18.6 <span className="text-sm font-sans text-earth-500">Tons</span></p>
          </div>
          <div className="w-12 h-12 bg-agro-50 dark:bg-agro-900/30 rounded-xl flex items-center justify-center text-agro-600">
            <Zap size={24} />
          </div>
        </div>
        <button className="bg-agro-600 hover:bg-agro-700 text-white font-bold p-4 rounded-2xl shadow-xl shadow-agro-600/20 transition-all hover:-translate-y-1 active:scale-95">
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};
