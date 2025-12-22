import React from 'react';
import { Wallet, X, CheckCircle2, Loader2 } from 'lucide-react';

interface DepositModalProps {
  setShowDepositModal: (show: boolean) => void;
  depositStatus: 'IDLE' | 'PROCESSING' | 'SUCCESS';
  amount: string;
  setAmount: (amount: string) => void;
  handleDeposit: () => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({
  setShowDepositModal,
  depositStatus,
  amount,
  setAmount,
  handleDeposit,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-earth-100 flex justify-between items-center bg-blue-50">
          <h3 className="font-bold text-xl text-blue-900 flex items-center gap-2"><Wallet className="text-blue-600" /> Fund Wallet</h3>
          <button onClick={() => setShowDepositModal(false)} className="text-blue-400 hover:text-blue-700 transition-colors"><X size={24} /></button>
        </div>
        <div className="p-6">
          {depositStatus === 'SUCCESS' ? (
            <div className="text-center py-8">
              <CheckCircle2 size={48} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-earth-900">Success!</h3>
              <button onClick={() => setShowDepositModal(false)} className="mt-6 bg-blue-600 text-white font-bold py-2 px-8 rounded-lg">Close</button>
            </div>
          ) : (
            <div className="space-y-4">
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border border-earth-200 rounded-xl px-4 py-3 font-mono text-lg" placeholder="Enter Amount" />
              <button onClick={handleDeposit} disabled={depositStatus === 'PROCESSING'} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2">
                {depositStatus === 'PROCESSING' ? <Loader2 className="animate-spin" /> : 'Confirm Deposit'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
