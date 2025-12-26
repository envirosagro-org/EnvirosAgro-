import React from 'react';
import { USERS } from './data';
import { Send } from 'lucide-react';

const Post = ({ post }: any) => {
  const author = USERS[post.author as keyof typeof USERS];
  return (
    <div className="flex items-start gap-4">
      <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full mt-1" />
      <div>
        <div className="flex items-baseline gap-3">
          <span className="font-bold text-gray-800 dark:text-white">{author.name}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{post.timestamp}</span>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mt-1">
          {post.content}
        </p>
      </div>
    </div>
  );
};

export const ThreadView = ({ thread }: any) => {
  if (!thread) {
    return <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center text-gray-500">Select a thread to view the conversation.</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{thread.title}</h2>
      </div>
      <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
        {thread.posts.map((post: any) => <Post key={post.id} post={post} />)}
      </div>
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-start gap-4">
            <img src={USERS.user1.avatar} alt={USERS.user1.name} className="w-10 h-10 rounded-full mt-1" />
            <div className="flex-grow">
                 <textarea 
                    className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-transparent focus:ring-2 focus:ring-green-500 focus:bg-white dark:focus:bg-gray-800 transition-all focus:outline-none" 
                    rows={3}
                    placeholder="Type your reply here..."
                ></textarea>
                <div className="flex justify-end mt-2">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-green-700 transition-colors">
                        <Send size={16} />
                        <span>Post Reply</span>
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};