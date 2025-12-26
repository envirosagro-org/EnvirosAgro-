import React from 'react';

export const ThrustsHero: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Our Five Strategic Thrusts
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300">
            We focus our efforts on five key areas to maximize our impact and drive the future of agriculture forward. These thrusts guide our research, partnerships, and educational programs.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Learn More
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
              Our Impact <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <img 
                className="rounded-2xl w-full h-auto object-cover"
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"
                alt="Team working together"
            />
        </div>
      </div>
    </div>
  );
};