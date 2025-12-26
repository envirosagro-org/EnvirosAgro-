
import React from 'react';
import { IMPACT_STORIES } from './data';
import { Leaf, Mountain, Users, BarChart } from 'lucide-react';

export const ImpactStories: React.FC = () => {
  return (
    <div className="bg-white dark:bg-earth-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold font-serif tracking-tight text-earth-900 dark:text-white sm:text-4xl">Our Impact in Action</h2>
          <p className="mt-6 text-lg leading-8 text-earth-600 dark:text-earth-300">
            From revitalized ecosystems to empowered communities, discover the tangible difference our projects are making on the ground.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {IMPACT_STORIES.map((story) => (
            <article key={story.id} className="flex flex-col items-start justify-between">
              <div className="relative w-full">
                <img
                  src={story.imageUrl}
                  alt=""
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <span
                    className="relative z-10 rounded-full bg-indigo-50 px-3 py-1.5 font-medium text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-300"
                  >
                    {story.category}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold font-serif leading-6 text-earth-900 dark:text-white group-hover:text-earth-600">
                      <span className="absolute inset-0" />
                      {story.title}
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-earth-600 dark:text-earth-400">{story.summary}</p>
                </div>
                <div className="mt-6 border-t border-gray-900/10 dark:border-white/10 pt-6">
                  <p className="text-sm font-semibold text-earth-800 dark:text-earth-200 mb-3">Key Metrics</p>
                  <dl className="space-y-3">
                    {story.keyMetrics.map((metric) => (
                       <div key={metric.label} className="flex items-center gap-x-3">
                         <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-800/20 dark:text-indigo-400">
                           {metric.label.includes('Hectares') ? <Mountain size={16} /> : metric.label.includes('Carbon') ? <Leaf size={16} /> : <Users size={16} /> }
                         </div>
                         <dt className="text-sm text-earth-600 dark:text-earth-400">{metric.label}</dt>
                         <dd className="ml-auto text-sm font-semibold text-earth-900 dark:text-white">{metric.value}</dd>
                       </div>
                    ))}
                  </dl>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
