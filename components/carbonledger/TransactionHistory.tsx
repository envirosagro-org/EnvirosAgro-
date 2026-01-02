import React from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

const transactions = [
  {
    id: 1,
    type: 'purchase',
    description: 'Purchase of 5 EAC from AgriCo',
    amount: '+ 5.00 EAC',
    date: '2023-10-26',
  },
  {
    id: 2,
    type: 'sale',
    description: 'Sale of 2 EAC to BioFuel Corp',
    amount: '- 2.00 EAC',
    date: '2023-10-24',
  },
  {
    id: 3,
    type: 'purchase',
    description: 'Purchase of 10 EAC from EcoHarvest',
    amount: '+ 10.00 EAC',
    date: '2023-10-22',
  },
  {
    id: 4,
    type: 'sale',
    description: 'Sale of 3 EAC to GreenPower Inc',
    amount: '- 3.00 EAC',
    date: '2023-10-21',
  },
];

export const TransactionHistory: React.FC = () => {
  return (
    <div className="bg-white dark:bg-earth-900 p-8 rounded-3xl shadow-sm border border-earth-100 dark:border-earth-800">
      <h3 className="font-bold text-earth-900 dark:text-white mb-6">Transaction History</h3>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-4 rounded-xl bg-earth-50 dark:bg-earth-800/50">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full ${
                transaction.type === 'purchase'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-600'
              }`}>
                {transaction.type === 'purchase' ? (
                  <ArrowDownLeft size={16} />
                ) : (
                  <ArrowUpRight size={16} />
                )}
              </div>
              <div>
                <p className="font-semibold text-earth-800 dark:text-white">{transaction.description}</p>
                <p className="text-xs text-earth-500">{transaction.date}</p>
              </div>
            </div>
            <p className={`font-mono font-bold ${
              transaction.type === 'purchase' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
