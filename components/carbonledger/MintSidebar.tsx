import React from 'react';
import { Award, Zap, Leaf } from 'lucide-react';

interface MintSidebarProps {
  setShowMintModal: (show: boolean) => void;
}

export const MintSidebar: React.FC<MintSidebarProps> = ({ setShowMintModal }) => {
  return (
    <div className="bg-agro-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
      <div className="relative z-10">
        <Award size={48} className="text-agro-300 mb-6" />
        <h3 className="text-2xl font-bold mb-2">Mint EAC Credits</h3>
        <p className="text-agro-100 text-sm mb-6 leading-relaxed">
          Convert your verified carbon offsets into EnvirosAgro Coins (EAC) to spend in the marketplace or trade in the capital exchange.
        </p>
        <button
          onClick={() => setShowMintModal(true)}
          className="w-full bg-agro-500 hover:bg-agro-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <Zap size={20} fill="currentColor" /> Initialize Minting
        </button>
      </div>
      <div className="absolute -bottom-10 -right-10 text-white/5">
        <Leaf size={200} />
      </div>
    </div>
  );
};
