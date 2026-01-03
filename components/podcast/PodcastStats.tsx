import React from 'react';
import { PODCAST_STATS } from './data';

export const PodcastStats: React.FC = () => {
  return (
    <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-8 rounded-[2rem] shadow-sm">
      <h3 className="text-xl font-bold text-earth-900 dark:text-white mb-6">Podcast Statistics</h3>
      <div className="grid grid-cols-2 gap-6">
        {PODCAST_STATS.map((item) => (
          <div key={item.name} className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-lg">
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-earth-500 truncate">{item.name}</p>
              <p className="text-lg font-semibold text-earth-900 dark:text-white">{item.stat}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
