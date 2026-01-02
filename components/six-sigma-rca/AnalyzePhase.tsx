import React, { useState } from 'react';
import { BarChart3, Binary, FileSearch } from 'lucide-react';
import { ParetoChart } from './ParetoChart';
import { FishboneDiagram } from './FishboneDiagram';
import { FiveWhys } from './FiveWhys';

type AnalysisTool = 'PARETO' | 'FISHBONE' | '5WHYS';

const TABS: { id: AnalysisTool; label: string; icon: React.ReactNode }[] = [
    { id: 'PARETO', label: 'Pareto Chart', icon: <BarChart3 size={16} /> },
    { id: 'FISHBONE', label: 'Fishbone Diagram', icon: <Binary size={16} /> },
    { id: '5WHYS', label: '5 Whys', icon: <FileSearch size={16} /> },
];

export const AnalyzePhase: React.FC = () => {
  const [activeTool, setActiveTool] = useState<AnalysisTool>('PARETO');

  const renderContent = () => {
    switch (activeTool) {
      case 'PARETO':
        return <ParetoChart />;
      case 'FISHBONE':
        return <FishboneDiagram />;
      case '5WHYS':
        return <FiveWhys />;
      default:
        return null;
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
        <div className="flex items-center justify-center mb-8">
            <div className="bg-earth-50 dark:bg-earth-800/40 p-1.5 rounded-full flex items-center gap-2 border border-earth-100 dark:border-earth-800">
                {TABS.map(tab => (
                    <button 
                        key={tab.id} 
                        onClick={() => setActiveTool(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeTool === tab.id ? 'bg-purple-600 text-white shadow-md' : 'text-earth-600 dark:text-earth-300 hover:bg-earth-100 dark:hover:bg-earth-700/50'}`}>
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>

        <div className="p-6 bg-white dark:bg-earth-900 rounded-2xl min-h-[400px]">
            {renderContent()}
        </div>
    </div>
  );
};