import React from 'react';
import { Presentation } from 'lucide-react';

export const WebinarHeader = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Presentation className="mx-auto h-16 w-16 text-green-600" />
        <h1 className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">AgriInnovate Webinars</h1>
        <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          Live and on-demand events featuring pioneers in agricultural technology, research, and practice. Learn from the best, right from your farm.
        </p>
      </div>
    </div>
  );
};