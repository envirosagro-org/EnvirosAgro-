import React from 'react';
import { X, Heart, Share2, Quote, User, MapPin } from 'lucide-react';

interface StoryReadingModalProps {
  activeStory: any;
  setActiveStory: (story: any) => void;
}

export const StoryReadingModal: React.FC<StoryReadingModalProps> = ({ activeStory, setActiveStory }) => {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-earth-950/95 backdrop-blur-2xl animate-in fade-in duration-500 overflow-y-auto">
      <div
        className="bg-[#fdfbf7] dark:bg-earth-950 w-full max-w-4xl rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border-4 border-rose-900/20 flex flex-col my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[450px] shrink-0">
          <img src={activeStory.image} className="w-full h-full object-cover" alt={activeStory.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] dark:from-earth-950 via-[#fdfbf7]/20 to-transparent"></div>
          <button
            onClick={() => setActiveStory(null)}
            className="absolute top-10 right-10 bg-black/30 hover:bg-black/50 p-3 rounded-full text-white backdrop-blur-md transition-all hover:rotate-90 active:scale-90"
          >
            <X size={28} />
          </button>
          <div className="absolute bottom-10 left-10 right-10">
            <div className="flex flex-wrap gap-3 mb-6">
              {activeStory.tags.map((t: string) => <span key={t} className="bg-rose-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-700 shadow-xl">{t}</span>)}
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-earth-900 dark:text-white leading-[0.9] tracking-tighter mb-6">{activeStory.title}</h2>
            <div className="flex items-center gap-6 text-[11px] font-black text-rose-700 dark:text-rose-400 uppercase tracking-[0.3em]">
              <span className="flex items-center gap-2"><User size={16} /> Narrated by {activeStory.author}</span>
              <span className="flex items-center gap-2"><MapPin size={16} /> {activeStory.location}</span>
            </div>
          </div>
        </div>

        <div className="p-12 md:p-20 relative">
          <div className="absolute -top-10 right-20 w-24 h-24 bg-rose-900 rounded-full flex items-center justify-center text-white shadow-2xl animate-float border-4 border-[#fdfbf7] dark:border-earth-950">
            <Quote size={40} fill="currentColor" />
          </div>
          <div className="prose prose-lg prose-rose dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-2xl md:text-3xl font-serif italic text-earth-800 dark:text-earth-200 leading-[1.6] opacity-90 drop-shadow-sm">
              {activeStory.content}
            </div>
          </div>

          <div className="mt-24 pt-10 border-t-2 border-rose-100 dark:border-rose-900/30 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-8">
              <button className="flex items-center gap-3 text-sm font-black uppercase text-earth-400 hover:text-rose-600 transition-all group">
                <Heart size={24} className="group-hover:scale-110" /> Appreciation
              </button>
              <button className="flex items-center gap-3 text-sm font-black uppercase text-earth-400 hover:text-blue-600 transition-all group">
                <Share2 size={24} className="group-hover:scale-110" /> Propagate
              </button>
            </div>
            <button
              onClick={() => setActiveStory(null)}
              className="bg-rose-900 text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Return to Feed
            </button>
          </div>
        </div>

        <div className="p-10 bg-rose-50 dark:bg-rose-900/20 text-center border-t border-rose-100 dark:border-rose-900/50">
          <p className="text-[10px] text-rose-800 dark:text-rose-300 font-black uppercase tracking-[0.4em]">Verified Archive Entry • ID: HER-{activeStory.id}-X</p>
        </div>
      </div>
    </div>
  );
};
