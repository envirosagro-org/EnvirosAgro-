import React from 'react';

const stats = [
  { value: '100+', label: 'Documentaries' },
  { value: '5M+', label: 'Viewers' },
  { value: '50+', label: 'Countries' },
  { value: '20+', label: 'Awards Won' },
];

export const GreenLensStats: React.FC = () => {
  return (
    <div className="bg-white/5 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-slate-400">{stat.label}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">{stat.value}</dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};