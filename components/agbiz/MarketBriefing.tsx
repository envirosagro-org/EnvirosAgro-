import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Briefcase, BarChart2 } from 'lucide-react';
import { marketBriefingStats } from '../../data';

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

export const MarketBriefing: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12 items-center">
            <div className="lg:col-span-1">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Daily Market Briefing</h2>
                <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                    A snapshot of the latest commodity prices and market movements.
                </p>
                <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <BarChart2 size={14} className="mr-2"/>
                    <span>Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
            </div>
            <dl className="lg:col-span-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
              {marketBriefingStats.map((stat, index) => (
                <motion.div
                  key={stat.name}
                  className="relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={cardVariants}
                >
                  <dt>
                    <div className="absolute rounded-md bg-agro-500 p-3">
                      <Briefcase className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                  </dt>
                  <dd className="ml-16 flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                    <p
                      className={[
                        stat.changeType === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400',
                        'ml-2 flex items-baseline text-sm font-semibold'
                      ].join(' ')}
                    >
                      {stat.changeType === 'increase' ? (
                        <ArrowUp className="h-5 w-5 flex-shrink-0 self-center" aria-hidden="true" />
                      ) : (
                        <ArrowDown className="h-5 w-5 flex-shrink-0 self-center" aria-hidden="true" />
                      )}
                      <span className="sr-only"> {stat.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                      {stat.change}
                    </p>
                  </dd>
                </motion.div>
              ))}
            </dl>
        </div>
      </div>
    </div>
  );
};