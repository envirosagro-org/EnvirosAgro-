import React, { useState } from 'react';
import { REPORTS } from './agbiz/data';
import { ReportCard } from './agbiz/ReportCard';
import { ReportView } from './agbiz/ReportView';

export const AgBizWeekly = () => {
  const [selectedReport, setSelectedReport] = useState(REPORTS[0]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
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