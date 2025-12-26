import React, { useState } from 'react';
import { THREADS } from './community/data';
import { ThreadList } from './community/ThreadList';
import { ThreadView } from './community/ThreadView';

export const CommunityGarden = () => {
  const [selectedThreadId, setSelectedThreadId] = useState(THREADS[0].id);

  const selectedThread = THREADS.find(t => t.id === selectedThreadId);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">The Community Garden</h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">A place to grow ideas and cultivate connections.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Topics</h2>
            <ThreadList 
              threads={THREADS} 
              selectedThreadId={selectedThreadId} 
              onSelectThread={setSelectedThreadId} 
            />
          </div>
          <div className="md:col-span-2">
            {selectedThread && <ThreadView thread={selectedThread} />}
          </div>
        </div>
      </div>
    </div>
  );
};