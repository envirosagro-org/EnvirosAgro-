import React from 'react';
import { Briefcase, Activity, CheckCircle, BarChart, ArrowRight } from 'lucide-react';
import { View } from '../../types';

interface ProfessionalViewProps {
  onNavigate?: (view: View) => void;
}

export const ProfessionalView: React.FC<ProfessionalViewProps> = ({ onNavigate }) => {
  const features = [
    { title: 'Market Analysis & Forecasting', description: 'Access granular market data.', icon: <BarChart size={24} /> },
    { title: 'Supply Chain Optimization', description: 'Streamline logistics and reduce waste.', icon: <CheckCircle size={24} /> },
    { title: 'Regulatory Compliance Suite', description: 'Navigate complex legal frameworks.', icon: <Briefcase size={24} /> },
    { title: 'Advanced Agronomic Research', description: 'Leverage cutting-edge research.', icon: <Activity size={24} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">For Professionals</h2>
        <p className="text-lg text-gray-600">Tools and insights for agricultural businesses and researchers.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-4">
            <div className="bg-blue-500 text-white rounded-full p-3">{feature.icon}</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <button
          onClick={() => onNavigate?.(View.RESILIENCE)}
          className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 mx-auto"
        >
          Explore Resilience View <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};