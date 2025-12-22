import React from 'react';
import { MessageSquare, Fingerprint, Users, Building2, CreditCard } from 'lucide-react';

export type Tab = 'REGISTER_GROUP' | 'REGISTER_SOCIETY' | 'GET_ESIN' | 'ID_CARD' | 'FEED' | 'NOTIFICATIONS';

interface TabNavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'FEED', label: 'Feed', icon: <MessageSquare size={14} /> },
    { id: 'GET_ESIN', label: 'ESIN', icon: <Fingerprint size={14} /> },
    { id: 'REGISTER_GROUP', label: 'Group', icon: <Users size={14} /> },
    { id: 'REGISTER_SOCIETY', label: 'Society', icon: <Building2 size={14} /> },
    { id: 'ID_CARD', label: 'Digital ID', icon: <CreditCard size={14} /> }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {tabs.map(btn => (
        <button
          key={btn.id}
          onClick={() => setActiveTab(btn.id as Tab)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border shadow-sm transition-all ${
            activeTab === btn.id
              ? 'bg-agro-600 text-white border-agro-600'
              : 'bg-white dark:bg-earth-900 border-earth-100 dark:border-earth-800 text-earth-700 dark:text-earth-300'
          }`}
        >
          {btn.icon} <span className="text-[10px] font-black uppercase tracking-widest">{btn.label}</span>
        </button>
      ))}
    </div>
  );
};
