import React from 'react';
import { User, Calendar, Tag } from 'lucide-react';
import { Report } from '../../types';

interface ReportViewProps {
  report: Report | null;
}

export const ReportView: React.FC<ReportViewProps> = ({ report }) => {
  if (!report) {
    return (
      <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex justify-center items-center h-full">
        <p className="text-gray-500">Select a report to view its content.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{report.title}</h1>
      
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6 space-x-4">
        <div className="flex items-center gap-2">
          <User size={16} />
          <span>{report.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{report.date}</span>
        </div>
      </div>
      
      <div 
        className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
        dangerouslySetInnerHTML={{ __html: report.content }} 
      />

      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Report Tags</h3>
        <div className="flex flex-wrap gap-2">
          {report.tags.map((tag: string) => (
            <span key={tag} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2">
              <Tag size={14} /> {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};