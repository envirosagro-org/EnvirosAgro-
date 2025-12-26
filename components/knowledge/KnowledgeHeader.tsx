import React from 'react';

export const KnowledgeHeader: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Knowledge Hub</h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Your central resource for agricultural knowledge and innovation.</p>
    </div>
  );
};