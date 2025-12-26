import React from 'react';
import { Mic } from 'lucide-react';

export const PodcastHeader = () => {
  return (
    <div className="bg-white dark:bg-gray-800 pt-16 text-center">
      <Mic className="mx-auto h-16 w-16 text-green-600 bg-gray-100 dark:bg-gray-700 p-3 rounded-full" />
      <h1 className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">AgriInnovate Podcast</h1>
      <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-400">
        In-depth conversations with the leaders, innovators, and farmers shaping the future of agriculture.
      </p>
    </div>
  );
};