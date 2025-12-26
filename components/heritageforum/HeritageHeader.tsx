import React from 'react';
import { Landmark, Users, Mic } from 'lucide-react';

export const HeritageHeader = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-sm font-semibold text-green-600 uppercase tracking-wider">Wisdom of the Ages</p>
          <h1 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">The Heritage Forum</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            A living archive of traditional knowledge, oral histories, and cultural farming practices from around the world.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-100 dark:bg-gray-700/50 rounded-xl">
            <Landmark className="mx-auto h-12 w-12 text-green-600" />
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">2,000+ Practices</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Documented and preserved.</p>
          </div>
          <div className="text-center p-6 bg-gray-100 dark:bg-gray-700/50 rounded-xl">
            <Users className="mx-auto h-12 w-12 text-green-600" />
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">150+ Communities</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Sharing their heritage.</p>
          </div>
          <div className="text-center p-6 bg-gray-100 dark:bg-gray-700/50 rounded-xl">
            <Mic className="mx-auto h-12 w-12 text-green-600" />
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">500+ Hours</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Of oral history recorded.</p>
          </div>
        </div>
      </div>
    </div>
  );
};