import React from 'react';
import { BarChart, Zap, Clock } from 'lucide-react';

const StatCard = ({ icon, label, value, description }: any) => {
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg">
      <div className="flex items-center">
        <div className="p-2 bg-green-500/10 rounded-md">{icon}</div>
        <p className="ml-3 text-sm font-medium text-gray-400">{label}</p>
      </div>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
};

export const VisionDisplay = ({ vision }: any) => {
  if (!vision) return null;

  const icons:any = {
    'Pollination Efficiency': <BarChart className="h-5 w-5 text-green-400" />,
    'Operating Cost': <Zap className="h-5 w-5 text-green-400" />,
    'Projected Adoption': <Clock className="h-5 w-5 text-green-400" />,
    'Fertilizer Reduction': <BarChart className="h-5 w-5 text-green-400" />,
    'GHG Emission Cut': <Zap className="h-5 w-5 text-green-400" />,
    'Soil Health': <Clock className="h-5 w-5 text-green-400" />,
    'Water Generation': <BarChart className="h-5 w-5 text-green-400" />,
    'Energy Source': <Zap className="h-5 w-5 text-green-400" />,
    'Arid Viability': <Clock className="h-5 w-5 text-green-400" />,
  };

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
      <div className="aspect-w-16 aspect-h-9">
        <iframe 
          src={vision.videoUrl}
          title={vision.title}
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      <div className="p-8">
        <p className="text-sm font-semibold text-green-400 uppercase tracking-wider">{vision.category}</p>
        <h2 className="mt-2 text-3xl font-bold text-white">{vision.title}</h2>
        <p className="mt-4 text-gray-300">{vision.description}</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {vision.stats.map((stat:any) => (
                <StatCard 
                    key={stat.label}
                    icon={icons[stat.label]}
                    label={stat.label}
                    value={stat.value}
                    description={stat.description}
                />
            ))}
        </div>
      </div>
    </div>
  );
};