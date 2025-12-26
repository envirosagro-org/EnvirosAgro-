import React from 'react';
import { USERS } from './data';
import { MessageSquare } from 'lucide-react';

export const ThreadList = ({ threads, selectedThreadId, onSelectThread }: any) => {
  return (
    <div className="space-y-4">
      {threads.map((thread: any) => {
        const author = USERS[thread.author as keyof typeof USERS];
        const isSelected = thread.id === selectedThreadId;
        const postCount = thread.posts.length;

        return (
          <div
            key={thread.id}
            onClick={() => onSelectThread(thread.id)}
            className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
              isSelected
                ? 'bg-white dark:bg-gray-800 shadow-md'
                : 'bg-gray-200/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-700/70'
            }`}
          >
            <h4 className={`font-bold mb-2 ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
              {thread.title}
            </h4>
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <img src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full" />
                <span>{author.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageSquare size={14} />
                <span>{postCount}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};