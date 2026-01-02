import React from 'react';
import { FEATURED_FILM } from './data';

export const FeaturedDoc: React.FC = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative h-0 pb-[56.25%] lg:pb-0 lg:h-auto lg:w-full">
            <iframe 
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
              src={`https://www.youtube.com/embed/${FEATURED_FILM.youtubeId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
          <div className="mt-12 lg:mt-0">
            <p className="text-sm font-semibold leading-6 text-green-400">Featured Documentary</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">{FEATURED_FILM.title}</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              {FEATURED_FILM.description}
            </p>
            <div className="mt-8 flex gap-x-4">
              <button className="inline-block rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">
                Play Now
              </button>
              <button className="inline-block rounded-md px-3.5 py-2.5 text-sm font-semibold text-white ring-1 ring-inset ring-slate-700 hover:bg-slate-800">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};