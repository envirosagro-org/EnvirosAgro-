import React from 'react';
import { BarChart2, ArrowRight } from 'lucide-react';
import { AgBizWeeklyReport } from '../../types';

interface ReportListProps {
  reports: AgBizWeeklyReport[];
  onSelectReport: (report: AgBizWeeklyReport) => void;
}

export const ReportList: React.FC<ReportListProps> = ({ reports, onSelectReport }) => {
  return (
    <div className="lg:col-span-2">
      <h3 className="font-bold text-xl text-earth-900 mb-6 flex items-center gap-2">
        <BarChart2 className="text-agro-600" /> Featured Insights
      </h3>

      <div className="space-y-8">
        {reports.map((report) => (
          <div key={report.id} className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-2xl shadow-sm border border-earth-100 hover:shadow-md transition-all group">
            <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0">
              <img src={report.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={report.title} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{report.type}</span>
                <span className="text-xs text-earth-400">{report.date}</span>
              </div>
              <h4 className="text-lg font-bold text-earth-900 mb-2 leading-tight">
                {report.title}
              </h4>
              <p className="text-earth-600 text-sm leading-relaxed mb-4 line-clamp-2">
                {report.desc}
              </p>
              <button
                onClick={() => onSelectReport(report)}
                className="text-sm font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all uppercase tracking-widest"
              >
                Read Brief <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
