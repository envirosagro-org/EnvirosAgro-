import React from 'react';

const metrics = [
  { title: 'Active Projects', value: '12', change: '+5.4%' },
  { title: 'Data Points', value: '3.2M', change: '+12.1%' },
  { title: 'System Health', value: '99.8%', change: '-0.2%' },
  { title: 'User Engagement', value: '78%', change: '+3.7%' },
];

export const MetricCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white/5 rounded-lg p-5">
          <p className="text-sm text-slate-400">{metric.title}</p>
          <p className="text-3xl font-bold text-white mt-1">{metric.value}</p>
          <p className={`text-sm mt-1 ${metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {metric.change} vs last month
          </p>
        </div>
      ))}
    </div>
  );
};