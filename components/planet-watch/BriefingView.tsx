import React from 'react';
import { Calendar, BookOpen } from 'lucide-react';

export const BriefingView = ({ briefing }: any) => {
  if (!briefing) {
    return (
      <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex justify-center items-center h-full">
        <p className="text-gray-500">Select a briefing to view its content.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <span className="text-blue-500 font-semibold bg-blue-500/10 py-1 px-3 rounded-full text-sm">{briefing.region}</span>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-3">{briefing.headline}</h1>

      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6 space-x-4">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{briefing.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <BookOpen size={16} />
          <span>Source: {briefing.source}</span>
        </div>
      </div>

      <div 
        className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
        dangerouslySetInnerHTML={{ __html: briefing.content }} 
      />
    </div>
  );
};