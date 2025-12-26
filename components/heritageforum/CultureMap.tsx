import React from 'react';
import { Map } from 'lucide-react';

export const CultureMap = () => {
  return (
    <div className="bg-gray-200 dark:bg-gray-800/50 rounded-xl p-8 flex flex-col items-center justify-center h-[500px]">
      <Map size={64} className="text-gray-400 mb-4" />
      <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Interactive Culture Map</h3>
      <p className="text-gray-500 dark:text-gray-400 mt-2">Coming soon: Explore traditional knowledge by region.</p>
    </div>
  );
};