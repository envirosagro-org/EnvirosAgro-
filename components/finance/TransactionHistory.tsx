import React from 'react';

export const TransactionHistory: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Transaction History</h2>
      <div className="flex justify-between items-center mb-4">
        <input type="date" className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg" />
        <select className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
          <option>All Types</option>
          <option>Deposit</option>
          <option>Withdrawal</option>
        </select>
        <input type="number" placeholder="Amount" className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg" />
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <p className="text-gray-600 dark:text-gray-400">A list of transactions will be displayed here.</p>
      </div>
    </div>
  );
};