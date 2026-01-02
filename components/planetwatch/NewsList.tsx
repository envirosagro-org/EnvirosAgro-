import React from 'react';
import { motion } from 'framer-motion';
import { BRIEFINGS } from '../planet-watch/data';

export const NewsList: React.FC = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full">
      <h3 className="text-lg font-bold text-white mb-4">Latest Briefings</h3>
      <div className="space-y-4">
        {BRIEFINGS.map((briefing, idx) => (
          <motion.div 
            key={briefing.id}
            className="bg-black/20 p-4 rounded-lg cursor-pointer hover:bg-black/40 transition-colors duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
          >
            <p className="text-sm font-semibold text-white">{briefing.headline}</p>
            <p className="text-xs text-white/60 mt-1">{briefing.region} - {briefing.date}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};