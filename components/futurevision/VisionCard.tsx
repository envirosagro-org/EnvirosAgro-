import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Zap, Clock, TrendingUp, Shield, Sprout, Wind, Droplets, Sun, Bee, FlaskConical, Cloudy } from 'lucide-react';

const StatCard = ({ icon, label, value, description, color }: any) => {
  return (
    <motion.div 
        className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <div className={`p-2 bg-${color}-500/10 rounded-md`}>{icon}</div>
        <p className="ml-3 text-sm font-medium text-white/70">{label}</p>
      </div>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      <p className="text-xs text-white/50 mt-1">{description}</p>
    </motion.div>
  );
};

export const VisionCard = ({ vision, year }: any) => {
  if (!vision) return null;

  const icons:any = {
    'Pollination Efficiency': <TrendingUp className="h-5 w-5 text-green-400" />,
    'Operating Cost': <Zap className="h-5 w-5 text-red-400" />,
    'Projected Adoption': <Clock className="h-5 w-5 text-blue-400" />,
    'Fertilizer Reduction': <Sprout className="h-5 w-5 text-green-400" />,
    'GHG Emission Cut': <Shield className="h-5 w-5 text-cyan-400" />,
    'Soil Health': <BarChart className="h-5 w-5 text-amber-400" />,
    'Water Generation': <Droplets className="h-5 w-g5 text-blue-400" />,
    'Energy Source': <Sun className="h-5 w-5 text-yellow-400" />,
    'Arid Viability': <Wind className="h-5 w-5 text-gray-400" />,
  };
  
  const colors:any = {
    'Pollination Efficiency': vision.themeColor,
    'Operating Cost': 'red',
    'Projected Adoption': 'blue',
    'Fertilizer Reduction': vision.themeColor,
    'GHG Emission Cut': 'cyan',
    'Soil Health': 'amber',
    'Water Generation': vision.themeColor,
    'Energy Source': 'yellow',
    'Arid Viability': 'gray',
  };

  const currentImpact = vision.impact[year];
  const themeColor = vision.themeColor || 'yellow';

  return (
    <motion.div 
        key={vision.id}
        className="rounded-2xl overflow-hidden shadow-2xl bg-cover bg-center relative isolate"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
        <div className="absolute inset-0 bg-black/50 -z-10" />
        <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent -z-10"
            initial={{ opacity: 0}} 
            animate={{ opacity: 1}} 
            transition={{duration: 1}}
        />
        <div 
            className="absolute top-0 left-0 h-1 w-full"
            style={{ backgroundColor: `var(--color-${themeColor})` }}
        />

        <div className="p-8">
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
                 <img src={vision.imageUrl} alt={vision.title} className="w-full h-full object-cover"/>
            </div>
            <div className="p-8 text-white relative">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <p className={`text-sm font-semibold uppercase tracking-wider`} style={{ color: `var(--color-${themeColor})` }}>{vision.category}</p>
                    <h2 className="mt-1 text-4xl font-bold tracking-tighter">{vision.title}</h2>
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.p 
                        key={year} 
                        className="mt-4 max-w-3xl text-white/80"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentImpact.description}
                    </motion.p>
                </AnimatePresence>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
                    {vision.stats.map((stat:any) => (
                        <StatCard 
                            key={stat.label}
                            icon={icons[stat.label]}
                            label={stat.label}
                            value={currentImpact.stats[stat.label] || stat.value}
                            description={stat.description}
                            color={colors[stat.label]}
                        />
                    ))}
                </div>
            </div>
        </div>
    </motion.div>
  );
};