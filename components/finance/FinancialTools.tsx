import React from 'react';

export const FinancialTools: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Financial Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">Loan Calculator</h3>
          <p className="text-gray-600 dark:text-gray-400">Estimate your loan payments.</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">Budget Planner</h3>
          <p className="text-gray-600 dark:text-gray-400">Create and manage your budget.</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">Savings Goal Tracker</h3>
          <p className="text-gray-600 dark:text-gray-400">Track your progress towards your savings goals.</p>
        </div>
      </div>
    </div>
  );
};