import React from 'react';
import { ThumbsUp, Share2, Sparkles } from 'lucide-react';

interface PostCardProps {
  post: any;
  handleSharePost: (post: any) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, handleSharePost }) => {
  return (
    <div className="bg-white dark:bg-earth-900 rounded-[2.5rem] p-8 border border-earth-100 dark:border-earth-800 shadow-sm group">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-earth-50 dark:bg-earth-800 rounded-full flex items-center justify-center font-bold text-earth-400 text-base shadow-inner">
            {post.author.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base leading-none mb-1.5">{post.author}</h4>
            <p className="text-[10px] text-earth-400 font-bold uppercase tracking-widest">{post.role} • {post.time}</p>
          </div>
        </div>
        <span className="text-[9px] font-black uppercase text-agro-600 bg-agro-50 dark:bg-agro-900/40 px-3 py-1 rounded-lg border border-agro-100 dark:border-agro-800">
          {post.thrust}
        </span>
      </div>
      <p className="text-earth-700 dark:text-earth-200 text-sm leading-relaxed mb-6 font-medium">{post.content}</p>
      <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100/50 dark:border-blue-900/30 rounded-2xl p-5 mb-6 flex gap-3 items-start">
        <Sparkles size={18} className="text-blue-600 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800 dark:text-blue-300 italic font-medium leading-relaxed">{post.aiAnalysis}</p>
      </div>
      <div className="flex items-center justify-between pt-5 border-t border-earth-50 dark:border-earth-800">
        <button className="flex items-center gap-2 text-rose-500 text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
          <ThumbsUp size={16} /> {post.likes} Appreciation
        </button>
        <button onClick={() => handleSharePost(post)} className="flex items-center gap-2 text-earth-400 hover:text-blue-600 transition-colors text-[10px] font-black uppercase tracking-widest">
          <Share2 size={16} /> Propagate
        </button>
      </div>
    </div>
  );
};
