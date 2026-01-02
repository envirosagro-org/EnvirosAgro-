import React from 'react';
import { View } from '../types';
import { ArrowLeft, LayoutGrid } from 'lucide-react';

interface ImpactDashboardProps {
  onNavigate: (view: View) => void;
}

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
        <div key={index} className="bg-white/5 rounded-lg p-5 border border-white/5 hover:border-agro-500/30 transition-all">
          <p className="text-sm text-slate-400 uppercase tracking-widest font-bold">{metric.title}</p>
          <p className="text-3xl font-black text-white mt-2">{metric.value}</p>
          <p className={`text-xs mt-2 font-bold ${metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {metric.change} <span className="text-slate-500">vs last month</span>
          </p>
        </div>
      ))}
    </div>
  );
};

const PerformanceChart: React.FC = () => {
  return (
    <div className="bg-white/5 rounded-lg p-8 h-96 border border-white/5">
      <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-3">
         <LayoutGrid size={20} className="text-agro-500" /> Performance Overview
      </h3>
      <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-4">
        <div className="w-16 h-16 border-4 border-slate-800 border-t-agro-500 rounded-full animate-spin"></div>
        <p className="font-bold text-xs uppercase tracking-[0.2em]">Synchronizing Impact Data...</p>
      </div>
    </div>
  );
};

const FutureVisionWidget: React.FC = () => {
  return (
    <div className="bg-white/5 rounded-lg p-8 h-96 border border-white/5">
      <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest">Future Roadmap</h3>
      <ul className="space-y-6">
        {futureItems.map((item, index) => (
          <li key={index} className="group cursor-default">
            <p className="text-sm font-black text-agro-400 uppercase tracking-widest mb-1 group-hover:text-white transition-colors">{item.title}</p>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ImpactDashboard: React.FC<ImpactDashboardProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#050a14] pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1700px] mx-auto mb-8 flex justify-between items-center">
        <button 
          onClick={() => onNavigate(View.HOME)}
          className="flex items-center gap-2 text-slate-500 hover:text-agro-400 transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
        <button 
            onClick={() => onNavigate(View.DASHBOARD)} 
            className="bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] py-3 px-6 rounded-xl border border-white/10 transition-all"
        >
            Switch to Professional View
        </button>
      </div>
      
      <DashboardHeader />
      
      <main className="max-w-[1700px] mx-auto mt-12">
        <MetricCards />
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
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

export default ImpactDashboard;