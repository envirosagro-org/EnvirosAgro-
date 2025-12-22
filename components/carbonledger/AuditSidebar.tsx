import React from 'react';
import { History } from 'lucide-react';

export const AuditSidebar: React.FC = () => {
  return (
    <div className="bg-earth-50 dark:bg-earth-800/50 p-6 rounded-3xl border border-earth-100 dark:border-earth-800">
      <h3 className="font-bold text-earth-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Upcoming Audits</h3>
      <div className="flex items-center gap-4 p-3 bg-white dark:bg-earth-900 rounded-xl border border-earth-100 dark:border-earth-800">
        <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 p-2 rounded-lg">
          <History size={16} />
        </div>
        <div>
          <p className="text-xs font-bold text-earth-900 dark:text-white">Annual Verification</p>
          <p className="text-[10px] text-earth-500">Due in 42 days</p>
        </div>
      </div>
    </div>
  );
};
