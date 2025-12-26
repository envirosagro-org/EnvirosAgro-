import React from 'react';
import { Globe } from 'lucide-react';

export const BriefingList = ({ briefings, selectedBriefing, onSelect }: any) => {
  return (
    <div className="space-y-4">
      {briefings.map((briefing: any) => {
        const isSelected = briefing.id === selectedBriefing.id;
        return (
          <div
            key={briefing.id}
            onClick={() => onSelect(briefing)}
            className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
              isSelected
                ? 'bg-white dark:bg-gray-800 shadow-md scale-105'
                : 'bg-gray-200/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-700/70'
            }`}
          >
            <div className="flex items-start gap-3">
                 <div className={`mt-1 flex-shrink-0 p-2 rounded-lg ${isSelected ? 'bg-blue-500/10 text-blue-500' : 'bg-gray-300/50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                    <Globe size={18} />
                </div>
                <div>
                    <h4 className={`font-bold ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{briefing.region}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{briefing.headline}</p>
                </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};