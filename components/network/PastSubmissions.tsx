import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { db } from '../../lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore'; // Removed orderBy
import { Loader2, MessageSquare } from 'lucide-react';

interface PastSubmissionsProps {
  user: User | null;
}

interface Post {
  id: string;
  content: string;
  authorName: string;
  createdAt: any;
}

export const PastSubmissions: React.FC<PastSubmissionsProps> = ({ user }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    // The orderBy clause has been removed to prevent indexing-related permission errors.
    const q = query(collection(db, 'posts'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData: Post[] = [];
      querySnapshot.forEach((doc) => {
        // Manually sort by createdAt on the client-side
        postsData.push({ ...doc.data(), id: doc.id } as Post);
      });
      
      // Sort posts by date on the client side
      postsData.sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate());

      setPosts(postsData);
      setIsLoading(false);
    }, (error) => {
      console.error('Error fetching posts:', error);
      // This is where the permission-denied error was occurring.
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-earth-900 rounded-[3rem] p-10 text-center">
        <Loader2 className='mx-auto h-12 w-12 animate-spin text-blue-600' />
        <p className='mt-4 text-sm font-medium text-earth-500'>Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-earth-900 rounded-[3rem] p-10 border border-earth-100 dark:border-earth-800 shadow-sm">
      <h3 className="text-2xl font-serif font-black text-earth-900 dark:text-white uppercase tracking-tight leading-none mb-8">Live Feed</h3>
      {posts.length > 0 ? (
        <ul className="space-y-6">
          {posts.map(post => (
            <li key={post.id} className="p-6 bg-earth-50 dark:bg-earth-800 rounded-2xl shadow-inner">
              <div className='flex items-start gap-4'>
                <div className='w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex-shrink-0 flex items-center justify-center'>
                    <MessageSquare className='h-5 w-5 text-blue-600'/>
                </div>
                <div>
                    <p className="font-bold text-earth-800 dark:text-earth-100">{post.authorName}</p>
                    <p className="text-sm text-earth-600 dark:text-earth-300 mt-1">{post.content}</p>
                    <p className="text-xs text-earth-400 dark:text-earth-500 mt-3">
                    {post.createdAt?.toDate().toLocaleString()}
                    </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-earth-500 font-medium">No posts yet. Be the first to share something!</p>
      )}
    </div>
  );
};
