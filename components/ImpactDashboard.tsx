
import React from 'react';

const metrics = [
  { title: 'Active Projects', value: '12', change: '+5.4%' },
  { title: 'Data Points', value: '3.2M', change: '+12.1%' },
  { title: 'System Health', value: '99.8%', change: '-0.2%' },
  { title: 'User Engagement', value: '78%', change: '+3.7%' },
];

const futureItems = [
  { title: 'AI-Powered Insights', description: 'Automated recommendations based on your data.' },
  { title: 'Advanced Reporting', description: 'Generate custom reports with deeper analytics.' },
  { title: 'Mobile App', description: 'Access your dashboard on the go.' },
];


const DashboardHeader: React.FC = () => {
  return (
    <header className="max-w-[1700px] mx-auto">
      <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-widest">Impact Dashboard</h1>
      <p className="text-slate-400 mt-2 text-sm sm:text-base">Central hub for EnviroAgro's impact metrics and project performance.</p>
    </header>
  );
};

const MetricCards: React.FC = () => {
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

const PerformanceChart: React.FC = () => {
  return (
    <div className="bg-white/5 rounded-lg p-6 h-96">
      <h3 className="text-lg font-semibold text-white mb-4">Performance Overview</h3>
      {/* Placeholder for a chart library component */}
      <div className="h-full flex items-center justify-center text-slate-500">
        <p>Chart will be displayed here</p>
      </div>
    </div>
  );
};

const FutureVisionWidget: React.FC = () => {
  return (
    <div className="bg-white/5 rounded-lg p-6 h-96">
      <h3 className="text-lg font-semibold text-white mb-4">Future Vision</h3>
      <ul>
        {futureItems.map((item, index) => (
          <li key={index} className="mb-4">
            <p className="text-md font-semibold text-white">{item.title}</p>
            <p className="text-sm text-slate-400">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ImpactDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050a14] pt-24 px-4 sm:px-6 lg:px-8">
      <DashboardHeader />
      <main className="max-w-[1700px] mx-auto mt-8">
        <MetricCards />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PerformanceChart />
          </div>
          <div>
            <FutureVisionWidget />
          </div>
        </div>
      </main>
    </div>
  );
};
