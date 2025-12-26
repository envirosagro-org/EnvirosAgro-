import React from 'react';
import { TOPICS } from './data';

export const TopicGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {TOPICS.map((topic) => (
        <div key={topic.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-4xl mb-4">{topic.icon}</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{topic.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{topic.description}</p>
        </div>
      ))}
    </div>
  );
};