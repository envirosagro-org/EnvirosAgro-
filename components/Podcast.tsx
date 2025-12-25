import React from 'react';
import { PodcastHeader } from './podcast/PodcastHeader';
import { Play, Headphones, Clock, Heart, Share2, Mic, Radio, ListMusic, ArrowRight, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export const Podcast: React.FC = () => {
  const episodes = [
    { title: 'The Silent Language of Roots', guest: 'Dr. Maria Silva', duration: '42:15', category: 'Science' },
    { title: 'Tradition Meets Telemetry', guest: 'Kiriaini Collective', duration: '38:40', category: 'Culture' },
    { title: 'Restoring the Sahel Canopy', guest: 'Amani K.', duration: '54:20', category: 'Impact' },
    { title: 'Soil as a Living Organism', guest: 'Marcus Thorne', duration: '45:10', category: 'Agroecology' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <PodcastHeader />

      <div className="grid lg:grid-cols-3 gap-12 mb-20">
         <div className="lg:col-span-2 space-y-12">
            <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-12 rounded-[3rem] shadow-sm relative overflow-hidden group">
               <div className="flex flex-col md:flex-row gap-10 items-center">
                  <div className="w-56 h-56 bg-orange-100 dark:bg-orange-900/30 rounded-[2.5rem] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-700">
                     <Mic size={80} className="text-orange-600" />
                  </div>
                  <div className="flex-1">
                     <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest px-3 py-1 bg-orange-50 rounded-lg mb-6 inline-block">
                        Featured Episode
                     </span>
                     <h3 className="text-3xl font-serif font-black text-earth-900 dark:text-white mb-4 leading-tight">The Ancient Future of Seed Sovereignty</h3>
                     <p className="text-earth-500 dark:text-earth-400 mb-8 leading-relaxed font-medium">
                        Exploring how traditional seed saving practices are being integrated with modern genetic blockchain records for long-term biodiversity security.
                     </p>
                     <div className="flex flex-wrap gap-4">
                        <button className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-orange-700 hover:scale-105 active:scale-95 transition-all shadow-xl">
                           <Play size={20} fill="currentColor" /> Listen Now
                        </button>
                        <button className="bg-earth-50 dark:bg-earth-800 text-earth-600 dark:text-earth-300 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border border-earth-100 dark:border-earth-700 hover:bg-earth-100 transition-all">
                           Show Notes
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <h3 className="text-2xl font-bold text-earth-900 dark:text-white flex items-center gap-3">
                  <ListMusic size={24} className="text-orange-600" /> Recent Episodes
               </h3>
               <div className="grid gap-4">
                  {episodes.map((ep, i) => (
                     <div key={i} className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-6 rounded-[2rem] flex items-center justify-between group hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 bg-earth-50 dark:bg-earth-800 rounded-xl flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-inner">
                              <Play size={18} fill="currentColor" className="ml-0.5" />
                           </div>
                           <div>
                              <h4 className="font-bold text-earth-900 dark:text-white group-hover:text-orange-600 transition-colors">{ep.title}</h4>
                              <span className="text-[10px] font-bold text-earth-400 uppercase tracking-widest">Guest: {ep.guest}</span>
                           </div>
                        </div>
                        <div className="flex items-center gap-8 text-[10px] font-black text-earth-400 uppercase tracking-widest">
                           <span className="flex items-center gap-2"><Clock size={14} /> {ep.duration}</span>
                           <span className="hidden md:block px-3 py-1 bg-earth-50 dark:bg-earth-800 rounded-lg">{ep.category}</span>
                           <Share2 size={16} className="hover:text-orange-600 transition-colors" />
                        </div>
                     </div>
                  ))}
               </div>
               <button className="w-full py-4 border-2 border-dashed border-earth-100 dark:border-earth-800 rounded-[2rem] text-[10px] font-black text-earth-400 uppercase tracking-widest hover:border-orange-500 hover:text-orange-600 transition-all">
                  Explore Full Audio Archive
               </button>
            </div>
         </div>

         <div className="space-y-8">
            <div className="bg-earth-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-[10s]"><Radio size={160} /></div>
               <h3 className="text-2xl font-bold mb-8 relative z-10">Now Playing</h3>
               <div className="relative z-10 text-center space-y-8">
                  <div className="w-32 h-32 bg-orange-600 rounded-full mx-auto flex items-center justify-center shadow-2xl animate-pulse">
                     <Headphones size={48} />
                  </div>
                  <div>
                     <h4 className="font-bold text-lg mb-1">The Ancient Future...</h4>
                     <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Episode 142 • Active</p>
                  </div>
                  
                  <div className="space-y-4">
                     <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-600 w-1/3 rounded-full"></div>
                     </div>
                     <div className="flex justify-between text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        <span>12:45</span>
                        <span>42:15</span>
                     </div>
                  </div>

                  <div className="flex justify-center items-center gap-8">
                     <SkipBack size={24} className="text-slate-400 hover:text-white transition-colors cursor-pointer" />
                     <button className="w-16 h-16 bg-white text-earth-900 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all">
                        <Play size={24} fill="currentColor" className="ml-1" />
                     </button>
                     <SkipForward size={24} className="text-slate-400 hover:text-white transition-colors cursor-pointer" />
                  </div>

                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                     <Volume2 size={16} className="text-slate-500" />
                     <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-3/4 rounded-full"></div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-8 rounded-[2rem] shadow-sm">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-earth-400 mb-6 flex items-center gap-3">
                  <Mic size={18} className="text-orange-500" /> Host Interaction
               </h4>
               <p className="text-xs text-earth-600 dark:text-earth-300 leading-relaxed font-medium mb-6">
                  Submit your questions for the upcoming AMA with the EA Thrust environmental forensics team.
               </p>
               <button className="w-full py-4 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-100 transition-colors">
                  Submit Question
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};
