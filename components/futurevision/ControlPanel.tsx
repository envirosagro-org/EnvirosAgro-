import React from 'react';
import { ChevronRight } from 'lucide-react';

export const ControlPanel = ({ visions, activeVision, onSelectVision }: any) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-xl h-full">
      <h3 className="text-xl font-bold text-white mb-4">Tech Previews</h3>
      <ul className="space-y-2">
        {visions.map((vision: any) => (
          <li key={vision.id}>
            <button 
              onClick={() => onSelectVision(vision)}
              className={`w-full text-left p-4 rounded-lg transition-colors duration-200 ${activeVision.id === vision.id ? 'bg-green-500/20 text-green-300' : 'text-gray-400 hover:bg-gray-700/50'}`}>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-semibold">{vision.title}</p>
                        <p className="text-xs opacity-70">{vision.category}</p>
                    </div>
                    {activeVision.id === vision.id && <ChevronRight className="h-5 w-5" />}
                </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};