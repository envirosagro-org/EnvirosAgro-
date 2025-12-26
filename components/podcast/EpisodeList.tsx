import React from 'react';
import { Play, Pause, Headphones } from 'lucide-react';

export const EpisodeList = ({ episodes, currentEpisode, onSelectEpisode }:any) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg h-full">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">All Episodes</h3>
      <div className="space-y-4">
        {episodes.map((episode:any) => {
          const isActive = currentEpisode.id === episode.id;
          return (
            <button 
              key={episode.id} 
              onClick={() => onSelectEpisode(episode)}
              className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${isActive ? 'bg-green-100 dark:bg-green-900/50 ring-2 ring-green-500' : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}>
              <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                      {isActive ? 
                          <Pause className="h-5 w-5 text-green-600" /> : 
                          <Play className="h-5 w-5 text-gray-500" />
                      }
                  </div>
                  <div className="flex-grow">
                      <p className={`font-semibold ${isActive ? 'text-green-800 dark:text-green-300' : 'text-gray-800 dark:text-gray-200'}`}>{episode.title}</p>
                      <p className={`text-sm ${isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>{episode.duration} &bull; {episode.guest}</p>
                  </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};