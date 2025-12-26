import React from 'react';

const stats = [
  { name: 'Corn Futures (Dec)', value: '$5.48', change: '+0.02', changeType: 'increase' },
  { name: 'Soybean Futures (Nov)', value: '$13.21', change: '-0.05', changeType: 'decrease' },
  { name: 'Wheat Futures (Dec)', value: '$7.60', change: '+0.08', changeType: 'increase' },
  { name: 'Live Cattle (Dec)', value: '$1.85/lb', change: '-0.01', changeType: 'decrease' },
]

export const MarketBriefing: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Market Briefing</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                A snapshot of the latest commodity prices and market movements.
            </p>
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="flex flex-col-reverse">
              <dt className="text-base leading-7 text-gray-600 dark:text-gray-400">{stat.name}</dt>
              <dd className="text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                {stat.value}
                <span className={`ml-2 text-base font-medium ${stat.changeType === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {stat.change}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};