import React, { useState } from 'react';
import { User } from '../../types';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { Loader2, Send } from 'lucide-react';

interface InputFormProps {
  user: User | null;
}

export const InputForm: React.FC<InputFormProps> = ({ user }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !content.trim()) return;

    setIsLoading(true);
    try {
      await addDoc(collection(db, 'posts'), {
        content,
        authorName: user.name,
        authorId: user.uid, // Using uid for security rules
        createdAt: serverTimestamp(),
        likes: 0,
      });
      setContent('');
      toast.success('Post submitted successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to submit post.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-earth-900 rounded-[3rem] p-10 md:p-12 border border-earth-100 dark:border-earth-800 shadow-sm">
      <h3 className="text-2xl font-serif font-black text-earth-900 dark:text-white uppercase tracking-tight leading-none mb-6">New Transmission</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${user?.name}?`}
            className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-blue-500 rounded-2xl p-6 focus:outline-none transition-all dark:text-white font-medium text-base shadow-inner"
            rows={4}
            required
          />
        </div>
        <button 
          type="submit"
          disabled={isLoading || !content.trim()}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          Post
        </button>
      </form>
    </div>
  );
};
