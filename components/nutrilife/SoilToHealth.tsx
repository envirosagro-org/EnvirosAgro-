import React from 'react';
import { Leaf, Droplets, Microscope, Heart } from 'lucide-react';

export const SoilToHealth: React.FC = () => {
  const pathways = [
    { title: 'Microbial Diversity', desc: 'Active soil life increases mineral bioavailability.', icon: <Leaf className="text-green-500" /> },
    { title: 'Water Retention', desc: 'Hydrated soil preserves heat-sensitive vitamins.', icon: <Droplets className="text-blue-500" /> },
    { title: 'Nutrient Density', desc: 'Regenerative crops show 40% higher antioxidant levels.', icon: <Microscope className="text-purple-500" /> },
    { title: 'Human Vitality', desc: 'Direct link between soil health and immune response.', icon: <Heart className="text-rose-500" /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
      {pathways.map((path, i) => (
        <div key={i} className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
          <div className="w-16 h-16 bg-earth-50 dark:bg-earth-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            {React.cloneElement(path.icon as React.ReactElement, { size: 32 })}
          </div>
          <h4 className="text-xl font-bold text-earth-900 dark:text-white mb-3">{path.title}</h4>
          <p className="text-sm text-earth-500 dark:text-earth-400 font-medium leading-relaxed">{path.desc}</p>
        </div>
      ))}
    </div>
  );
};
