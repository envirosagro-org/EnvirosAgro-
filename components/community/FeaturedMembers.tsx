import React from 'react';
import { FEATURED_MEMBERS } from './communityData';
import { Award, Zap } from 'lucide-react';

export const FeaturedMembers = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Top Contributors</h2>
      <div className="space-y-5">
        {FEATURED_MEMBERS.map(member => (
          <div key={member.id} className="flex items-center space-x-4">
            <img src={member.avatar} alt={member.name} className="h-14 w-14 rounded-full" />
            <div className="flex-grow">
              <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200">{member.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{member.title}</p>
              <div className="flex items-center text-sm mt-1 text-green-600 dark:text-green-400">
                <Award size={14} className="mr-1.5" /> 
                <span className="font-semibold">{member.specialty}</span>
              </div>
            </div>
            <div className="text-right">
                <div className="font-bold text-xl text-gray-800 dark:text-white">{member.contributions}</div>
                <p className="text-xs text-gray-500">posts</p>
            </div>
          </div>
        ))}
      </div>
       <button className="w-full mt-6 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          Become a Contributor
      </button>
    </div>
  );
};