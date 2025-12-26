import React from 'react';

export const FeaturedArticle: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          <div className="flex flex-col justify-center">
            <div className="text-base font-semibold leading-7 text-sky-500 dark:text-sky-400">Featured Article</div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Navigating the Carbon Market: A Guide for Farmers
            </h2>
            <p className="mt-6 text-xl leading-8 text-gray-700 dark:text-gray-300">
              Carbon credits present a new revenue stream for farmers, but the market is complex. This guide breaks down the opportunities and challenges of participating in agricultural carbon programs.
            </p>
            <div className="mt-8">
              <a
                href="#"
                className="text-base font-medium text-sky-600 dark:text-sky-400 hover:text-sky-500"
              >
                Read the full article <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div>
            <img 
              className="w-full h-auto object-cover rounded-xl shadow-xl"
              src="https://images.unsplash.com/photo-1563514227-925955360679?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"
              alt="Farmer in a field"
            />
          </div>
        </div>
      </div>
    </div>
  );
};