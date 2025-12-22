import React from 'react';
import { Coins } from 'lucide-react';
import { User } from '../../types';

interface WalletWidgetProps {
  user: User | null;
  setShowRedeemModal: (show: boolean) => void;
  setShowHistoryModal: (show: boolean) => void;
}

export const WalletWidget: React.FC<WalletWidgetProps> = ({ user, setShowRedeemModal, setShowHistoryModal }) => {
  return (
    <div className="bg-[#d35400] rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden group">
      <div className="absolute -top-10 -right-10 opacity-10 transform group-hover:scale-110 transition-transform duration-1000">
        <Coins size={160} />
      </div>
      <div className="relative z-10">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80 mb-6 block">My EAC Balance</span>
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shadow-inner">
            <Coins size={36} className="text-white" />
          </div>
          <div className="text-6xl font-serif font-bold tracking-tight">{user?.eacBalance || 0} <span className="text-2xl font-sans font-black opacity-60">EAC</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setShowRedeemModal(true)} className="bg-white text-[#d35400] font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-orange-50 transition-all shadow-lg active:scale-95">Redeem Tools</button>
          <button onClick={() => setShowHistoryModal(true)} className="bg-black/20 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-black/30 border border-white/20 transition-all active:scale-95">Ledger</button>
        </div>
      </div>
    </div>
  );
};
