
import React from 'react';
import { EPISODES } from './data';
import { Play, Mic } from 'lucide-react';

export const FeaturedEpisode: React.FC = () => {
  const featuredEpisode = EPISODES[0];

  return (
    <div className="bg-earth-50 dark:bg-earth-900/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="relative h-96 lg:h-auto lg:mt-0">
            <img 
              className="h-full w-full object-cover rounded-3xl shadow-2xl" 
              src={featuredEpisode.coverArt} 
              alt={`Cover art for ${featuredEpisode.title}`}
            />
          </div>
          <div className="mt-10 lg:mt-0">
            <p className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">Featured Episode</p>
            <h2 className="mt-2 text-3xl font-bold font-serif tracking-tight text-earth-900 dark:text-white sm:text-4xl">
              {featuredEpisode.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-earth-600 dark:text-earth-400">
              {featuredEpisode.description}
            </p>
            <div className="mt-8 flex items-center gap-x-6">
              <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full text-lg font-semibold hover:bg-indigo-700 transition-all active:scale-95 shadow-lg">
                <Play size={20} />
                <span>Listen Now</span>
              </button>
              <div className="flex items-center gap-2 text-earth-600 dark:text-earth-300">
                  <Mic size={20} />
                  <span className="font-medium">With {featuredEpisode.guest}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
