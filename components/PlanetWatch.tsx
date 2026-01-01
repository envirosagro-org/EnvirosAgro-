import React, { useState } from 'react';
import { BRIEFINGS } from './planet-watch/data';
import { BriefingList } from './planet-watch/BriefingList';
import { BriefingView } from './planet-watch/BriefingView';
import { ArrowLeft } from 'lucide-react';
import { View } from '../types';

interface PlanetWatchProps {
  onNavigate?: (view: View) => void;
}

export const PlanetWatch: React.FC<PlanetWatchProps> = ({ onNavigate }) => {
  const [selectedBriefing, setSelectedBriefing] = useState(BRIEFINGS[0]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <button 
                onClick={() => onNavigate?.(View.HOME)}
                className="flex items-center gap-2 text-gray-500 hover:text-agro-600 transition-colors text-sm font-bold uppercase tracking-widest"
            >
                <ArrowLeft size={16} /> Back to Home
            </button>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">Planet Watch</h1>
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">Your global briefing on environmental news and policy.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Latest Briefings</h2>
                    <BriefingList
                        briefings={BRIEFINGS}
                        selectedBriefing={selectedBriefing}
                        onSelect={setSelectedBriefing}
                    />
                </div>
                <div className="lg:col-span-3">
                    <BriefingView briefing={selectedBriefing} />
                </div>
            </div>
        </div>
    </div>
  );
};