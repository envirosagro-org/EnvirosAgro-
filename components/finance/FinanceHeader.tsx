import React from 'react';
import { Coins, Gem, Wallet } from 'lucide-react';
import { User } from '../../types';

interface FinanceHeaderProps {
  user: User | null;
  portfolioValue: number;
}

export const FinanceHeader: React.FC<FinanceHeaderProps> = ({ user, portfolioValue }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100">
            <Coins className="text-amber-600" size={32} />
          </div>
          <h2 className="text-4xl font-serif font-bold text-agro-900">Agro Finance</h2>
        </div>
        <p className="text-xl text-earth-600 max-w-2xl">
          Powered by <strong>Tokenz™</strong> — Innovative financial solutions to fuel sustainable growth.
        </p>
      </div>
      <div className="flex gap-4">
        <div className="bg-amber-50 px-6 py-4 rounded-2xl border border-amber-100">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1 flex items-center gap-2">
            <Gem size={14} /> My EAC Balance
          </p>
          <p className="text-3xl font-serif font-bold text-agro-900">{user?.eacBalance || 0}</p>
        </div>
        <div className="bg-blue-50 px-6 py-4 rounded-2xl border border-blue-100">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1 flex items-center gap-2">
            <Wallet size={14} /> Portfolio
          </p>
          <p className="text-3xl font-serif font-bold text-agro-900">${portfolioValue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};
