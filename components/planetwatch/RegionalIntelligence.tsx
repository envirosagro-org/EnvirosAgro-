import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, TrendingDown, Circle } from 'lucide-react';

const regions = [
    {
        name: 'Amazon Basin', 
        status: 'Critical Alert', 
        trend: 'Trending Down', 
        icon: <TrendingDown className="w-5 h-5 text-red-400"/>, 
        color: 'red'
    },
    {
        name: 'Sahel Region', 
        status: 'High Stress', 
        trend: 'Trending Down', 
        icon: <TrendingDown className="w-5 h-5 text-yellow-400"/>, 
        color: 'yellow'
    },
    {
        name: 'Great Barrier Reef', 
        status: 'High Alert', 
        trend: 'Trending Down', 
        icon: <TrendingDown className="w-5 h-5 text-orange-400"/>, 
        color: 'orange'
    },
    {
        name: 'California Central Valley', 
        status: 'Moderate Stress', 
        trend: 'Stable', 
        icon: <Circle className="w-5 h-5 text-gray-400"/>, 
        color: 'gray'
    },
    {
        name: 'European Union Farmlands', 
        status: 'Stable', 
        trend: 'Trending Up', 
        icon: <TrendingUp className="w-5 h-5 text-green-400"/>, 
        color: 'green'
    }
];

export const RegionalIntelligence: React.FC = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full">
      <h3 className="text-lg font-bold text-white mb-4">Regional Intelligence</h3>
      <div className="space-y-3">
        {regions.map((region, idx) => (
          <motion.div 
            key={idx} 
            className="flex items-center justify-between bg-black/20 p-3 rounded-lg"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
          >
            <div className="flex items-center gap-3">
                <MapPin className={`w-5 h-5 text-${region.color}-400`} />
                <div>
                    <p className="text-sm font-semibold text-white">{region.name}</p>
                    <p className={`text-xs text-${region.color}-400`}>{region.status}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <p className="text-xs text-white/60 hidden sm:block">{region.trend}</p>
                {region.icon}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
