import React from 'react';
import { LayoutGrid, Layers, Zap, Activity, ArrowRight } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex items-center justify-between bg-white dark:bg-earth-900 border-b border-earth-100 dark:border-white/5 mb-16 overflow-x-auto no-scrollbar">
      <div className="flex items-center">
        {[
          { id: 'DIRECTORY', label: 'ECOSYSTEM DIRECTORY', icon: <LayoutGrid size={14} /> },
          { id: 'TIERS', label: 'PARTNERSHIP TIERS', icon: <Layers size={14} /> },
          { id: 'AUTOMATED_GATEWAY', label: 'AUTOMATED GATEWAY', icon: <Zap size={14} /> },
          { id: 'STATUS', label: 'TRACK APPLICATION', icon: <Activity size={14} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.id === 'TIERS') return;
              setActiveTab(tab.id as any);
            }}
            className={`px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 whitespace-nowrap border-b-2 ${
              activeTab === tab.id
                ? 'bg-agro-600 text-white border-agro-600 rounded-t-2xl'
                : 'text-earth-400 hover:text-earth-900 dark:hover:text-white border-transparent'
            }`}
          >
            {activeTab !== tab.id && <span className="opacity-40">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="px-6 text-blue-500 animate-pulse hidden md:block">
        <ArrowRight size={32} />
      </div>
    </div>
  );
};
