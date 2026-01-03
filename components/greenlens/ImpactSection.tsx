import React from 'react';
import { Leaf, Wind, Droplet } from 'lucide-react';

const impactStats = [
  {
    icon: Leaf,
    value: '3,200+',
    label: 'Acres of forests restored',
    description: 'Our documentaries have directly contributed to the reforestation of over 3,200 acres of land, helping to combat climate change and restore biodiversity.',
  },
  {
    icon: Wind,
    value: '1.2M',
    label: 'Tonnes of CO2 sequestered',
    description: 'The projects featured in our films have collectively sequestered over 1.2 million tonnes of CO2, equivalent to taking 260,000 cars off the road for a year.',
  },
  {
    icon: Droplet,
    value: '8.5B',
    label: 'Gallons of water saved',
    description: 'By showcasing innovative water conservation techniques, our films have inspired changes that have led to saving over 8.5 billion gallons of water.',
  },
];

export const ImpactSection: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Tangible Impact</h2>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            The stories we tell are more than just films; they are catalysts for change. See the real-world impact our projects have generated.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {impactStats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-y-3 rounded-2xl bg-white/5 p-8">
              <stat.icon className="h-8 w-8 text-green-400" />
              <div className="text-3xl font-semibold tracking-tight">{stat.value}</div>
              <p className="text-base leading-7 text-gray-300">{stat.label}</p>
              <p className="text-sm leading-6 text-gray-400">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};