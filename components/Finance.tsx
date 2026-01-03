import React, { useState } from 'react';
import { FinanceHeader } from './finance/FinanceHeader';
import { FinanceSidebar } from './finance/FinanceSidebar';
import { ProductGrid } from './finance/ProductGrid';
import { TransactionHistory } from './finance/TransactionHistory';
import { DepositModal } from './finance/DepositModal';
import { FINANCIAL_PRODUCTS, TRANSACTIONS } from './finance/data.tsx';
import { User, View } from '../../types';

interface FinanceProps {
    user: User | null;
    onNavigate: (view: View) => void;
}

const Finance: React.FC<FinanceProps> = ({ user, onNavigate }) => {
    const [isDepositOpen, setDepositOpen] = useState(false);
    const [transactions, setTransactions] = useState(TRANSACTIONS);

    // Dummy portfolio value calculation
    const portfolioValue = transactions
        .filter(t => t.type === 'PURCHASE')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const handleDeposit = (amount: number) => {
        const newTransaction = {
            id: (transactions.length + 1).toString(),
            date: new Date().toISOString().split('T')[0],
            description: `EAC Deposit`,
            amount: amount,
            type: 'DEPOSIT' as const,
            status: 'COMPLETED' as const
        };
        setTransactions([newTransaction, ...transactions]);
        // In a real app, you'd also update the user's balance
        setDepositOpen(false);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
            <div className="max-w-7xl mx-auto p-8">
                <FinanceHeader user={user} portfolioValue={portfolioValue} />
                <div className="grid lg:grid-cols-3 gap-8 mt-8">
                    <FinanceSidebar onShowDeposit={() => setDepositOpen(true)} onNavigate={onNavigate} />
                    <div className="lg:col-span-2 space-y-8">
                        <ProductGrid financialProducts={FINANCIAL_PRODUCTS} onProductClick={() => {}} />
                        <TransactionHistory transactions={transactions} />
                    </div>
                </div>
            </div>
            <DepositModal 
                isOpen={isDepositOpen} 
                onClose={() => setDepositOpen(false)} 
                onDeposit={handleDeposit} 
            />
        </div>
    );
};

export default Finance;