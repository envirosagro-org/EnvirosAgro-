import React from 'react';

const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
    <div className="h-12 w-12 bg-gray-200 rounded-full mb-4 mx-auto"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-full mx-auto"></div>
    <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto mt-1"></div>
  </div>
);

const SkeletonThrustCard = () => (
    <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-4/5 mb-6"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
    </div>
);

export const NetworkInputHubSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md animate-pulse">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-32 bg-gray-200 rounded ml-4"></div>
          </div>
          <div className="flex items-center">
            <div className="h-6 w-24 bg-gray-200 rounded mr-4"></div>
            <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mt-4"></div>
        </div>
        
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>

        <div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => <SkeletonThrustCard key={i} />)}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NetworkInputHubSkeleton;