import React from 'react';
import { motion } from 'framer-motion';
import { agBizFeatures } from '../../data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export const AgBizHero: React.FC = () => {
  return (
    <div className="relative bg-gray-900 dark:bg-black py-28 sm:py-40">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[url('https://images.unsplash.com/photo-1559868393-24738a9a23b1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900 via-gray-900/80 to-gray-900"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            AgBiz Weekly
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
            Your essential briefing on the business of agriculture. Get the latest market analysis, policy updates, and industry insights, all in one place.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-agro-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-agro-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-agro-600 transition-transform hover:scale-105"
            >
              Get started
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-white/80 hover:text-white">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {agBizFeatures.map((feature) => (
            <motion.div 
              key={feature.name} 
              className="flex flex-col gap-y-4 rounded-xl bg-white/5 p-8 ring-1 ring-inset ring-white/10 backdrop-blur-sm transition-all hover:ring-white/20 hover:bg-white/10"
              variants={itemVariants}
            >
              <feature.icon className={`h-8 w-8 flex-none ${feature.color}`} aria-hidden="true" />
              <div className="flex-auto text-left">
                <h3 className="font-semibold text-white text-lg">{feature.name}</h3>
                <p className="mt-2 text-base leading-7 text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};