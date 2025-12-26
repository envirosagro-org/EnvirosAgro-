import React from 'react';

export const AccountStatement: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Account Statement</h2>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600 dark:text-gray-400">Account Summary</p>
        <button className="text-blue-500 hover:underline">Download PDF</button>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <p className="text-gray-600 dark:text-gray-400">Transaction details will be displayed here.</p>
      </div>
    </div>
  );
};