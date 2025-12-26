import React from 'react';
import { Newspaper } from 'lucide-react';

export const ReportCard = ({ report, isSelected, onSelect }: any) => {
  return (
    <div
      onClick={onSelect}
      className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'bg-white dark:bg-gray-800 shadow-lg scale-105'
          : 'bg-gray-200/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-700/70'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`mt-1 flex-shrink-0 p-2 rounded-lg ${isSelected ? 'bg-green-500/10 text-green-500' : 'bg-gray-300/50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
            <Newspaper size={20} />
        </div>
        <div>
            <h3 className={`font-bold ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                {report.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{report.author} &middot; {report.date}</p>
            <div className="mt-3 flex flex-wrap gap-2">
                {report.tags.map((tag: string) => (
                <span key={tag} className={`text-xs font-semibold px-2 py-1 rounded-full ${isSelected ? 'bg-green-100 text-green-800' : 'bg-gray-300/70 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                    {tag}
                </span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};