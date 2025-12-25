import React from 'react';
import { HeritageHeader } from './heritageforum/HeritageHeader';
import { MessageCircle, Heart, Share2, Library, Mic, BookOpen, Users, ArrowRight } from 'lucide-react';

export const HeritageForum: React.FC = () => {
  const topics = [
    { title: 'Ancient Grain Preservation', category: 'Seed Wisdom', comments: 42, likes: 124, author: 'Elder Mara' },
    { title: 'Lunar Cycles in Soil Prep', category: 'Oral History', comments: 86, likes: 256, author: 'Kiriaini Collective' },
    { title: 'Community Water Sharing Rituals', category: 'Social Ag', comments: 34, likes: 98, author: 'James O.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <HeritageHeader />

      <div className="grid lg:grid-cols-3 gap-12 mb-20">
         <div className="lg:col-span-2 space-y-12">
            <div>
               <h3 className="text-3xl font-serif font-black text-earth-900 dark:text-white mb-8 border-l-4 border-rose-600 pl-6">Dialogue & Wisdom</h3>
               <div className="space-y-6">
                  {topics.map((topic, i) => (
                     <div key={i} className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group cursor-pointer">
                        <div className="flex justify-between items-start mb-6">
                           <span className="text-[9px] font-black text-rose-600 uppercase tracking-widest px-3 py-1 bg-rose-50 rounded-lg">
                              {topic.category}
                           </span>
                           <div className="flex gap-4 text-earth-300">
                              <Heart size={18} className="hover:text-rose-500 transition-colors" />
                              <Share2 size={18} className="hover:text-rose-500 transition-colors" />
                           </div>
                        </div>
                        <h4 className="text-2xl font-bold text-earth-900 dark:text-white mb-4 group-hover:text-rose-600 transition-colors">{topic.title}</h4>
                        <div className="flex justify-between items-center text-[10px] font-black text-earth-400 uppercase tracking-widest">
                           <span className="flex items-center gap-2"><Users size={14} /> Shared by {topic.author}</span>
                           <div className="flex gap-6">
                              <span className="flex items-center gap-2"><MessageCircle size={14} /> {topic.comments} Reflections</span>
                              <span className="flex items-center gap-2"><Heart size={14} /> {topic.likes} Appreciations</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
               <button className="w-full mt-10 py-5 border-2 border-dashed border-earth-200 dark:border-earth-800 rounded-[2.5rem] text-[10px] font-black text-earth-400 uppercase tracking-[0.3em] hover:border-rose-500 hover:text-rose-600 transition-all">
                  Contribute to the Heritage Archive
               </button>
            </div>
         </div>

         <div className="space-y-8">
            <div className="bg-rose-50 dark:bg-rose-900/10 rounded-[3rem] p-10 border border-rose-100 dark:border-rose-800/50 shadow-sm">
               <h3 className="text-2xl font-bold text-earth-900 dark:text-white mb-8 flex items-center gap-3">
                  <Mic size={24} className="text-rose-600" /> Wisdom Vault
               </h3>
               <div className="space-y-6">
                  {[
                     { title: 'The Song of Rain', duration: '12:45', plays: '1.2k' },
                     { title: 'Soil Memory Logs', duration: '08:30', plays: '842' },
                     { title: 'Seed Keeper Stories', duration: '15:20', plays: '2.4k' }
                  ].map((rec, i) => (
                     <div key={i} className="flex items-center gap-6 p-4 bg-white dark:bg-earth-900 rounded-2xl border border-rose-100 dark:border-rose-800 shadow-sm group hover:border-rose-400 transition-all cursor-pointer">
                        <div className="w-12 h-12 bg-rose-600 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                           <Play size={20} fill="currentColor" className="ml-0.5" />
                        </div>
                        <div className="flex-1">
                           <h4 className="font-bold text-sm text-earth-900 dark:text-white leading-tight mb-1">{rec.title}</h4>
                           <div className="flex justify-between text-[9px] font-black text-earth-400 uppercase tracking-widest">
                              <span>{rec.duration}</span>
                              <span>{rec.plays} listens</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
               <button className="w-full mt-10 py-4 bg-rose-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-700 transition-colors shadow-lg active:scale-95">
                  Browse All Audio Records
               </button>
            </div>

            <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-8 rounded-[2rem] shadow-sm">
               <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-xl">
                     <BookOpen size={24} />
                  </div>
                  <div>
                     <h4 className="font-bold text-earth-900 dark:text-white">Truth Protocol</h4>
                     <p className="text-xs text-earth-400">Oral History Verification</p>
                  </div>
               </div>
               <p className="text-xs text-earth-600 dark:text-earth-300 leading-relaxed font-medium">
                  All shared wisdom is verified through community consensus and historical node cross-referencing to ensure cultural integrity.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};
