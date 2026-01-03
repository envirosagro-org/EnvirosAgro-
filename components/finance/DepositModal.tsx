import React, { useState } from 'react';
import { X, DollarSign, CreditCard, Banknote } from 'lucide-react';

interface DepositModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDeposit: (amount: number) => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose, onDeposit }) => {
    const [amount, setAmount] = useState(100);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-md transform transition-all">
                <div className="p-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold">Buy EAC Tokenz</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6">
                    <div className="mb-4">
                        <label className="text-sm font-bold text-gray-600 dark:text-gray-300 mb-2 block">Amount (USD)</label>
                        <div className="relative">
                            <DollarSign size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg py-3 pl-10 pr-4"
                            />
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <span>= {amount} EAC</span>
                            <span>Rate: 1 USD = 1 EAC</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="text-sm font-bold text-gray-600 dark:text-gray-300 mb-2 block">Payment Method</label>
                        <div className="grid grid-cols-2 gap-4">
                             <button className="flex items-center gap-2 p-4 border rounded-lg bg-blue-500 text-white">
                                <CreditCard size={20} /> Credit Card
                            </button>
                            <button className="flex items-center gap-2 p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <Banknote size={20} /> Bank Transfer
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => onDeposit(amount)}
                        className="w-full bg-amber-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors"
                    >
                        Deposit ${amount}
                    </button>
                </div>
            </div>
        </div>
    );
};