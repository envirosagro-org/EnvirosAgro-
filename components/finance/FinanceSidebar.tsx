import React from 'react';
import { Coins, Fingerprint, PiggyBank, Wallet, ArrowUpRight } from 'lucide-react';
import { View } from '../../types';

interface FinanceSidebarProps {
  onShowDeposit: () => void;
  onNavigate: (view: View) => void;
}

export const FinanceSidebar: React.FC<FinanceSidebarProps> = ({ onShowDeposit, onNavigate }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-amber-500 to-amber-700 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <Coins size={120} className="absolute -bottom-10 -right-10 opacity-20" />
        <h3 className="text-2xl font-bold mb-2">Tokenz Exchange</h3>
        <p className="text-amber-100 mb-6 text-sm">The digital asset powering the agricultural economy.</p>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={onShowDeposit} className="bg-white text-amber-700 font-bold py-2 rounded-xl hover:bg-amber-50 transition-colors text-sm shadow-sm">Buy Tokenz</button>
          <button onClick={() => onNavigate(View.CARBON_LEDGER)} className="bg-amber-800/50 text-white border border-amber-400/30 font-bold py-2 rounded-xl hover:bg-amber-800 transition-colors text-sm">Swap EAC</button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-earth-200 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
            <Fingerprint size={24} />
          </div>
          <h3 className="font-bold text-lg text-earth-900">Digital ID</h3>
        </div>
        <p className="text-earth-600 text-sm mb-6">Your <strong>ESIN</strong> acts as your secure wallet address.</p>
        <button onClick={() => onNavigate(View.COMMUNITY)} className="w-full border border-blue-200 text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors">View My Digital ID</button>
      </div>

      <div className="bg-agro-900 text-white p-8 rounded-3xl">
        <PiggyBank size={48} className="mb-4 text-agro-300" />
        <h3 className="text-2xl font-bold mb-2">Eligibility Checker</h3>
        <div className="space-y-3">
          <button onClick={() => onNavigate(View.SUSTAINABILITY_FRAMEWORK)} className="w-full bg-agro-500 hover:bg-agro-400 text-white font-bold py-3 rounded-xl transition-colors">Check My m-score</button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-earth-200 shadow-sm">
        <button onClick={() => onNavigate(View.INVESTOR_PORTAL)} className="w-full border border-earth-200 text-earth-700 font-bold py-3 rounded-xl hover:bg-earth-50 transition-colors flex items-center justify-center gap-2">
          <Wallet size={18} /> Investor Portal <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
};
