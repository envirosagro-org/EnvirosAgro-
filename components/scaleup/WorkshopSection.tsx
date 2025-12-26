
import React from 'react';
import { BrainCircuit, Factory, Leaf, TestTube2 } from 'lucide-react';

const workshops = [
  {
    title: "Decentralized AI for Climate Resilience",
    description: "Exploring the role of decentralized AI in building climate-resilient food systems.",
    icon: <BrainCircuit className="text-blue-500" />,
  },
  {
    title: "Industrial-Scale Carbon Sequestration",
    description: "A deep dive into the latest technologies for large-scale carbon sequestration in agriculture.",
    icon: <Factory className="text-green-500" />,
  },
  {
    title: "Advanced Soil Metagenomics",
    description: "Analyzing the soil microbiome to enhance crop health and productivity.",
    icon: <TestTube2 className="text-yellow-500" />,
  },
  {
    title: "Circular Economy in Agri-Food",
    description: "Implementing circular economy principles for a more sustainable and profitable agri-food sector.",
    icon: <Leaf className="text-red-500" />,
  },
];

export const WorkshopSection: React.FC = () => {
  return (
    <div className="py-20">
      <h3 className="text-3xl font-serif font-black text-earth-900 dark:text-white mb-12 border-l-4 border-blue-600 pl-6">
        Breakout Workshops
      </h3>
      <div className="grid md:grid-cols-2 gap-8">
        {workshops.map((workshop, index) => (
          <div
            key={index}
            className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-8 rounded-[2rem] flex items-start gap-6 group hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 bg-earth-50 dark:bg-earth-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              {React.cloneElement(workshop.icon as React.ReactElement, { size: 28 })}
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-earth-900 dark:text-white group-hover:text-blue-600 transition-colors mb-2">
                {workshop.title}
              </h4>
              <p className="text-sm text-earth-500 font-medium leading-relaxed">
                {workshop.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
