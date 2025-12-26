import React from 'react';
import { Shield, TrendingUp, Sun, Wind, Droplets, ArrowLeft } from 'lucide-react';
import { View } from '../../types';

interface ResilienceViewProps {
  onNavigate?: (view: View) => void;
}

export const ResilienceView: React.FC<ResilienceViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => onNavigate?.(View.PROFESSIONAL)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={20} /> Back to Professional View
        </button>
      </div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Climate Resilience</h2>
        <p className="text-lg text-gray-600">Modeling and adapting to changing environmental conditions.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-green-500 text-white rounded-full p-3">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Risk Mitigation</h3>
          </div>
          <p className="text-gray-600">Identify and mitigate risks from climate change, pests, and market volatility.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-blue-500 text-white rounded-full p-3">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Predictive Analytics</h3>
          </div>
          <p className="text-gray-600">Forecast yields, weather patterns, and market trends with high accuracy.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-yellow-500 text-white rounded-full p-3">
              <Sun size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Environmental Modeling</h3>
          </div>
          <p className="text-gray-600">Simulate the impact of environmental changes on crop health and growth.</p>
        </div>
      </div>
    </div>
  );
};