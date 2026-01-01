import React, { useState } from 'react';
import { REPORTS } from './agbiz/data';
import { ReportCard } from './agbiz/ReportCard';
import { ReportView } from './agbiz/ReportView';
import { ArrowLeft } from 'lucide-react';
import { View } from '../types';

interface AgBizWeeklyProps {
  onNavigate: (view: View) => void;
}

export const AgBizWeekly: React.FC<AgBizWeeklyProps> = ({ onNavigate }) => {
  const [selectedReport, setSelectedReport] = useState(REPORTS[0]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button 
          onClick={() => onNavigate(View.HOME)}
          className="flex items-center gap-2 text-gray-500 hover:text-agro-600 transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">AgBiz Weekly</h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">Your weekly briefing on the business of agriculture.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {selectedReport && <ReportView report={selectedReport} />}
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">This Month's Reports</h2>
            {REPORTS.map((report) => (
              <ReportCard 
                key={report.id} 
                report={report} 
                isSelected={selectedReport.id === report.id}
                onSelect={() => setSelectedReport(report)} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};