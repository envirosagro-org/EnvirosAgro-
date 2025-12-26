import React from 'react';
import { CheckCircle, Activity } from 'lucide-react';

export const ImprovePhase: React.FC = () => (
  <div className="ea-card p-12 space-y-10 animate-in slide-in-from-left-4">
    <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white">Countermeasure Implementation</h3>
    <div className="space-y-4">
      {[
        { title: "Strip non-browser modules from importmap", status: "VERIFIED", icon: <CheckCircle className="text-agro-600" /> },
        { title: "Automate script-error failover node", status: "DEPLOYED", icon: <CheckCircle className="text-agro-600" /> },
        { title: "Implement synthetic boot verification", status: "ACTIVE", icon: <Activity className="text-blue-500" /> }
      ].map((fix, i) => (
        <div key={i} className="flex items-center justify-between p-6 bg-white dark:bg-earth-900 rounded-3xl border border-earth-100 dark:border-earth-800 shadow-sm">
          <div className="flex items-center gap-5">
            {fix.icon}
            <span className="font-bold text-earth-800 dark:text-earth-200">{fix.title}</span>
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest text-earth-400 bg-earth-50 dark:bg-earth-800 px-3 py-1 rounded-full">{fix.status}</span>
        </div>
      ))}
    </div>
  </div>
);