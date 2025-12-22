import React from 'react';
import { BookOpen, MapPin, Heart, MessageCircle, ArrowRight } from 'lucide-react';

interface StoriesFeedProps {
  stories: any[];
  setActiveStory: (story: any) => void;
}

export const StoriesFeed: React.FC<StoriesFeedProps> = ({ stories, setActiveStory }) => {
  return (
    <div className="lg:col-span-2">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-earth-900 dark:text-white flex items-center gap-4">
          <BookOpen className="text-rose-600" size={32} /> Recent Stories
        </h2>
        <div className="flex bg-earth-50 dark:bg-earth-900 p-1 rounded-xl border border-earth-100 dark:border-earth-800">
          <button className="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white dark:bg-earth-800 text-rose-600 shadow-sm">Trending</button>
          <button className="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-earth-400">Latest</button>
        </div>
      </div>

      <div className="space-y-10">
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => setActiveStory(story)}
            className="bg-white dark:bg-earth-900 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl border border-earth-100 dark:border-earth-800 transition-all cursor-pointer group hover:-translate-y-1 duration-500"
          >
            <div className="md:flex">
              <div className="md:w-[40%] h-64 md:h-auto relative overflow-hidden">
                <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black text-rose-700 uppercase tracking-widest shadow-lg">
                    {story.tags[0]}
                  </span>
                </div>
              </div>
              <div className="p-10 md:w-[60%] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="font-bold text-2xl text-earth-900 dark:text-white mb-2 leading-tight group-hover:text-rose-700 transition-colors">{story.title}</h3>
                      <div className="flex items-center gap-3 text-[10px] font-black text-earth-400 uppercase tracking-[0.2em]">
                        <span className="text-rose-600">{story.author}</span>
                        <span className="w-1 h-1 bg-earth-200 rounded-full"></span>
                        <span className="flex items-center gap-1"><MapPin size={12} className="text-rose-400" /> {story.location}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-earth-600 dark:text-earth-400 leading-relaxed mb-8 text-sm font-medium line-clamp-3">
                    {story.content}
                  </p>
                </div>

                <div className="flex items-center gap-6 border-t border-earth-50 dark:border-earth-800 pt-6">
                  <button className="flex items-center gap-2 text-[10px] font-black text-earth-400 hover:text-rose-600 transition-colors uppercase tracking-widest">
                    <Heart size={16} className="text-rose-400" /> {story.likes}
                  </button>
                  <button className="flex items-center gap-2 text-[10px] font-black text-earth-400 hover:text-blue-600 transition-colors uppercase tracking-widest">
                    <MessageCircle size={16} className="text-blue-400" /> {story.comments}
                  </button>
                  <button className="flex items-center gap-1.5 text-rose-600 font-black text-[10px] uppercase tracking-widest ml-auto group-hover:gap-3 transition-all">
                    Read Narrative <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
