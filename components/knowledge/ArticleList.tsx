import React from 'react';

export const ArticleList: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Articles</h2>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <p className="text-gray-600 dark:text-gray-400">A list of articles will be displayed here.</p>
      </div>
    </div>
  );
};