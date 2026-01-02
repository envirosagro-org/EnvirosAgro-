import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Wind, Droplets, Sun, Leaf, Globe } from 'lucide-react';

const stats = [
    { 
        name: 'Global Temperature Anomaly', 
        value: '+1.41°C', 
        icon: <Thermometer className="w-6 h-6 text-red-400"/>, 
        description: 'Above 1991-2020 average', 
        color: 'red'
    },
    { 
        name: 'Atmospheric CO2', 
        value: '425.1 ppm', 
        icon: <Wind className="w-6 h-6 text-sky-400"/>, 
        description: 'Mauna Loa Observatory', 
        color: 'sky'
    },
    { 
        name: 'Arctic Sea Ice Extent', 
        value: '-12.6%', 
        icon: <Droplets className="w-6 h-6 text-blue-400"/>, 
        description: 'Per decade vs 1981-2010 avg', 
        color: 'blue'
    },
    { 
        name: 'Solar Irradiance', 
        value: '1361 W/m²', 
        icon: <Sun className="w-6 h-6 text-yellow-400"/>, 
        description: 'Total Solar Irradiance (TSI)', 
        color: 'yellow'
    },
    { 
        name: 'Global Vegetation Index', 
        value: '+0.18', 
        icon: <Leaf className="w-6 h-6 text-green-400"/>, 
        description: 'Normalized Difference (NDVI)', 
        color: 'green'
    },
    { 
        name: 'Sea Level Rise', 
        value: '+3.8mm/yr', 
        icon: <Globe className="w-6 h-6 text-teal-400"/>, 
        description: 'Satellite Altimetry Data', 
        color: 'teal'
    },
];

export const PlanetWatchStats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
      {stats.map((stat, idx) => (
        <motion.div 
            key={idx} 
            className={`bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10 shadow-lg`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
        >
            <div className="flex items-center gap-4 mb-3">
                <div className={`p-3 rounded-full bg-${stat.color}-500/10`}>
                    {stat.icon}
                </div>
            </div>
            <div>
                <p className="text-xs text-white/60 font-medium">{stat.name}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                <p className="text-xs text-white/40 mt-2">{stat.description}</p>
            </div>
        </motion.div>
      ))}
    </div>
  );
};
