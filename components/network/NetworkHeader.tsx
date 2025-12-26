import React from 'react';

export const NetworkHeader: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Network Input Hub</h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Contribute to the network by providing your data.</p>
    </div>
  );
};