
import React, { useState } from 'react';
import { User } from '../../types';
import { db, storage } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Loader2, X, Paperclip, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

interface CreatePostProps {
  user?: User;
  onClose: () => void;
  onPostCreated: () => void;
}

type PostType = 'text' | 'image' | 'link';

export const CreatePost: React.FC<CreatePostProps> = ({ user, onClose, onPostCreated }) => {
  const [postText, setPostText] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [postType, setPostType] = useState<PostType>('text');
  const [linkUrl, setLinkUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachment(file);
      if (file.type.startsWith('image/')) {
        setPostType('image');
      } else {
        setPostType('text'); // Default back to text for other file types
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        setError('User not found. Please log in again.');
        return;
    }
    if (!postText.trim()) {
      setError('Post content cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      let attachmentUrl = '';
      if (attachment) {
        const storageRef = ref(storage, `posts/${user.email}/${Date.now()}_${attachment.name}`);
        const snapshot = await uploadBytes(storageRef, attachment);
        attachmentUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, 'posts'), {
        authorName: user.name,
        authorEmail: user.email,
        authorAvatar: user.avatar || null,
        text: postText,
        type: postType,
        attachmentUrl: attachmentUrl,
        linkUrl: postType === 'link' ? linkUrl : '',
        timestamp: serverTimestamp(),
        likes: 0,
        comments: [],
      });

      onPostCreated();
      onClose();
    } catch (err) {
      setError('Failed to create post. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
        <div className="bg-white dark:bg-earth-900 rounded-3xl shadow-2xl w-full max-w-2xl p-8 relative flex items-center justify-center h-96">
            <Loader2 className="animate-spin text-agro-500" size={48} />
        </div>
    );
  }

  return (
    <div className="bg-white dark:bg-earth-900 rounded-3xl shadow-2xl w-full max-w-2xl p-8 relative">
      <button onClick={onClose} className="absolute top-6 right-6 text-earth-400 hover:text-red-500 transition-colors">
        <X size={24} />
      </button>
      <h2 className="text-2xl font-bold text-agro-900 dark:text-white mb-6">Create a New Post</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder={`What's on your mind, ${user.name}?`}
          className="w-full h-32 bg-earth-50 dark:bg-earth-800 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-agro-500 dark:text-white transition"
          required
        />

        {postType === 'link' && (
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Enter URL..."
            className="w-full bg-earth-100 dark:bg-earth-800 rounded-xl p-3 px-4 focus:outline-none focus:ring-2 focus:ring-agro-500 dark:text-white"
          />
        )}
        
        {attachment && (
            <div className="text-sm text-earth-500 dark:text-earth-400">
                Attached: {attachment.name}
            </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <label htmlFor="file-upload" className="cursor-pointer p-3 rounded-full hover:bg-earth-100 dark:hover:bg-earth-800 text-earth-500 dark:text-earth-400 transition-colors">
              <Paperclip size={20} />
              <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
            </label>
             <button type="button" onClick={() => setPostType('image')} className={`p-3 rounded-full hover:bg-earth-100 dark:hover:bg-earth-800 ${postType === 'image' ? 'text-agro-600' : 'text-earth-500 dark:text-earth-400'}`}>
                <ImageIcon size={20} />
            </button>
             <button type="button" onClick={() => setPostType('link')} className={`p-3 rounded-full hover:bg-earth-100 dark:hover:bg-earth-800 ${postType === 'link' ? 'text-agro-600' : 'text-earth-500 dark:text-earth-400'}`}>
                <LinkIcon size={20} />
            </button>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="bg-agro-600 hover:bg-agro-700 text-white font-bold py-3 px-8 rounded-full shadow-lg flex items-center justify-center gap-2 transition-all disabled:bg-earth-300"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
};
