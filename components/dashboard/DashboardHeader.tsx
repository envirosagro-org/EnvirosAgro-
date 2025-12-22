import React from 'react';
import { Activity, ActivityIcon, Cloud, Sparkles, Zap, Loader2 } from 'lucide-react';
import { View } from '../../types';

interface DashboardHeaderProps {
  isLivePulse: boolean;
  setIsLivePulse: (active: boolean) => void;
  activeTab: 'RESILIENCE' | 'PROFESSIONAL';
  setActiveTab: (tab: 'RESILIENCE' | 'PROFESSIONAL') => void;
  setChartMetric: (metric: any) => void;
  onNavigate: (view: View) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  isLivePulse,
  setIsLivePulse,
  activeTab,
  setActiveTab,
  setChartMetric,
  onNavigate,
}) => {
  return (
    <div className="ea-header-block p-4 md:p-8 mb-6 bg-slate-900/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 relative z-10">
        <div className="flex-1">
          <div className="ea-label-meta mb-2">
            <Activity size={12} className="text-agro-600" /> Integrated Resilience Engine
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-earth-900 dark:text-white leading-tight tracking-tight">
            Analytics <span className="text-blue-600 italic">Terminal</span>
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsLivePulse(!isLivePulse)}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${isLivePulse ? 'bg-red-600 text-white shadow-glow-red animate-pulse' : 'bg-slate-900 text-slate-400'}`}
          >
            {isLivePulse ? <Loader2 size={14} className="animate-spin" /> : <ActivityIcon size={14} />}
            {isLivePulse ? 'Live Pulse Active' : 'Enable Live Pulse'}
          </button>
          <button
            onClick={() => onNavigate(View.FUTURE_VISION)}
            className="bg-purple-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-purple-600/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles size={14} fill="currentColor" /> Future Vision Lab
          </button>
          <div className="agro-glass p-1.5 rounded-2xl flex gap-1 border border-earth-200 dark:border-white/5 backdrop-blur-xl shadow-sm">
            <button
              onClick={() => { setActiveTab('RESILIENCE'); setChartMetric('resilience'); }}
              className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'RESILIENCE' ? 'bg-white dark:bg-earth-700 shadow-sm text-agro-700 dark:text-white' : 'text-earth-400 hover:text-earth-800'}`}
            >
              <Zap size={14} /> System Resilience
            </button>
            <button
              onClick={() => { setActiveTab('PROFESSIONAL'); setChartMetric('workers'); }}
              className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'PROFESSIONAL' ? 'bg-white dark:bg-earth-700 shadow-sm text-blue-700 dark:text-white' : 'text-earth-400 hover:text-earth-800'}`}
            >
              <Cloud size={14} /> Workers Cloud
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
