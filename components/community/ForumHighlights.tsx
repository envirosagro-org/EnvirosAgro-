import React from 'react';
import { FORUM_HIGHLIGHTS } from './communityData';
import { MessageSquare, Flame } from 'lucide-react';

export const ForumHighlights = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Hot Topics in the Forum</h2>
      <div className="space-y-4">
        {FORUM_HIGHLIGHTS.map(post => (
          <div key={post.id} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-start">
              <img src={post.authorAvatar} alt={post.author} className="h-10 w-10 rounded-full mr-4" />
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400">{post.category}</p>
                  {post.isTrending && <span className="flex items-center text-sm font-semibold text-orange-500 bg-orange-100 dark:bg-orange-900/50 px-2 py-1 rounded-full"><Flame size={14} className="mr-1"/> Trending</span>}
                </div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mt-1 cursor-pointer hover:text-green-600">{post.topic}</h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <p>by <span className="font-semibold">{post.author}</span></p>
                  <span className="mx-2">&bull;</span>
                  <div className="flex items-center">
                    <MessageSquare size={14} className="mr-1.5" />
                    <span>{post.replies} replies</span>
                  </div>
                  <span className="mx-2">&bull;</span>
                  <p>Last reply {post.lastReply}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition">
          View All Discussions
      </button>
    </div>
  );
};