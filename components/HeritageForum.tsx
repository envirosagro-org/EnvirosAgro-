import React, { useState } from 'react';
import { Scroll, Feather, Users, MessageCircle, Heart, Share2, BookOpen, Sparkles, MapPin } from 'lucide-react';

const FORUM_TOPICS = [
  {
    id: 1,
    title: "Indigenous Seed Saving",
    desc: "Preserving heirloom varieties and the stories they carry.",
    icon: <SproutIcon />,
    color: "bg-green-50 text-green-800",
    posts: 124
  },
  {
    id: 2,
    title: "Rain & Harvest Rituals",
    desc: "Traditional ceremonies that honor the cycles of nature.",
    icon: <CloudRainIcon />,
    color: "bg-blue-50 text-blue-800",
    posts: 85
  },
  {
    id: 3,
    title: "Medicinal Roots & Herbs",
    desc: "Ancient wisdom on healing plants and natural remedies.",
    icon: <HeartIcon />,
    color: "bg-rose-50 text-rose-800",
    posts: 210
  },
  {
    id: 4,
    title: "Oral History & Folklore",
    desc: "Myths, legends, and lessons passed down through generations.",
    icon: <Scroll size={24} />,
    color: "bg-amber-50 text-amber-800",
    posts: 156
  }
];

const STORIES = [
  {
    id: 1,
    author: "Mama Amani",
    location: "Kiriaini, Kenya",
    title: "The Legend of the Mugumo Tree",
    content: "My grandmother told me that the Mugumo tree is not just a plant, but a shrine. Before the rains came, the elders would gather...",
    likes: 45,
    comments: 12,
    tags: ["Folklore", "Trees"],
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    author: "Elder Juma",
    location: "Tanga, Tanzania",
    title: "Why We Plant by the Moon",
    content: "Modern science calls it gravitational pull, but we know it as the breath of the earth. Planting cassava when the moon is waning ensures...",
    likes: 38,
    comments: 8,
    tags: ["Farming Practices", "Astronomy"],
    image: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=800&auto=format&fit=crop&q=80"
  }
];

export const HeritageForum: React.FC = () => {
  const [activeStory, setActiveStory] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Hero Section */}
      <div className="bg-rose-900 rounded-3xl p-10 text-white mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-rose-300 font-bold uppercase tracking-wider text-xs mb-3">
                 <Feather size={16} /> Heritage Forums
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">Preserving the Soul <br/>of Agriculture</h1>
              <p className="text-rose-100 text-lg leading-relaxed mb-8">
                 A sanctuary for indigenous knowledge, cultural storytelling, and the timeless wisdom that connects us to the land.
              </p>
              <button className="bg-white text-rose-900 font-bold py-3 px-8 rounded-full hover:bg-rose-50 transition-colors flex items-center gap-2">
                 <Scroll size={18} /> Share Your Story
              </button>
           </div>
           
           <div className="bg-white/10 p-6 rounded-2xl border border-white/10 max-w-sm">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><Sparkles size={18} className="text-yellow-400" /> Daily Wisdom</h3>
              <p className="text-rose-100 italic text-sm leading-relaxed">
                 "The earth does not belong to us; we belong to the earth. Treat the soil as a living ancestor, and it will feed your children's children."
              </p>
              <p className="text-right text-xs font-bold mt-2 text-rose-300">- Maasai Proverb</p>
           </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="mb-16">
         <h2 className="text-2xl font-bold text-earth-900 mb-6">Explore Topics</h2>
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FORUM_TOPICS.map((topic) => (
               <div key={topic.id} className="bg-white p-6 rounded-2xl shadow-sm border border-earth-100 hover:shadow-lg transition-all cursor-pointer group">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${topic.color}`}>
                     {topic.icon}
                  </div>
                  <h3 className="font-bold text-lg text-earth-900 mb-2 group-hover:text-agro-700 transition-colors">{topic.title}</h3>
                  <p className="text-sm text-earth-600 mb-4 h-10">{topic.desc}</p>
                  <div className="flex items-center text-xs font-bold text-earth-400 gap-1">
                     <MessageCircle size={14} /> {topic.posts} Discussions
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Stories Feed */}
      <div className="grid lg:grid-cols-3 gap-12">
         <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-earth-900 mb-6 flex items-center gap-2">
               <BookOpen className="text-agro-600" /> Recent Stories
            </h2>
            
            <div className="space-y-8">
               {STORIES.map((story) => (
                  <div key={story.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-earth-100">
                     <div className="md:flex">
                        <div className="md:w-1/3 h-48 md:h-auto relative">
                           <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                           <div className="absolute top-4 left-4 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-full">
                              {story.tags[0]}
                           </div>
                        </div>
                        <div className="p-6 md:w-2/3 flex flex-col justify-between">
                           <div>
                              <div className="flex justify-between items-start mb-2">
                                 <div>
                                    <h3 className="font-bold text-xl text-earth-900 mb-1">{story.title}</h3>
                                    <div className="flex items-center gap-2 text-xs text-earth-50">
                                       <span className="font-bold text-earth-700">{story.author}</span>
                                       <span>•</span>
                                       <span className="flex items-center gap-1"><MapPin size={10} /> {story.location}</span>
                                    </div>
                                 </div>
                              </div>
                              <p className="text-earth-600 leading-relaxed mb-4 text-sm">
                                 {story.content}
                              </p>
                           </div>
                           
                           <div className="flex items-center gap-6 border-t border-earth-100 pt-4 mt-2">
                              <button className="flex items-center gap-2 text-sm text-earth-500 hover:text-rose-600 transition-colors font-medium">
                                 <Heart size={18} /> {story.likes}
                              </button>
                              <button className="flex items-center gap-2 text-sm text-earth-500 hover:text-blue-600 transition-colors font-medium">
                                 <MessageCircle size={18} /> {story.comments} Comments
                              </button>
                              <button className="flex items-center gap-2 text-sm text-earth-500 hover:text-agro-600 transition-colors font-medium ml-auto">
                                 <Share2 size={18} /> Share
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Sidebar */}
         <div>
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 mb-8">
               <h3 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <Users size={20} /> Community Elders
               </h3>
               <p className="text-sm text-amber-800 mb-4">
                  Connect with keepers of tradition who can guide you on sustainable, time-tested practices.
               </p>
               <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
                     <div className="w-10 h-10 rounded-full bg-earth-200 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=60" className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <p className="text-sm font-bold text-earth-900">Gogo Nyota</p>
                        <p className="text-[10px] text-earth-500 uppercase font-bold">Herbalist • 40y Exp</p>
                     </div>
                     <button className="ml-auto text-xs font-bold text-amber-600 border border-amber-200 px-2 py-1 rounded hover:bg-amber-50">Follow</button>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
                     <div className="w-10 h-10 rounded-full bg-earth-200 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=100&auto=format&fit=crop&q=100" className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <p className="text-sm font-bold text-earth-900">Mzee Kiptoo</p>
                        <p className="text-[10px] text-earth-500 uppercase font-bold">Soil Guardian • 50y Exp</p>
                     </div>
                     <button className="ml-auto text-xs font-bold text-amber-600 border border-amber-200 px-2 py-1 rounded hover:bg-amber-50">Follow</button>
                  </div>
               </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-earth-200 shadow-sm text-center">
               <h3 className="font-bold text-earth-900 mb-2">Upcoming Gathering</h3>
               <div className="text-4xl font-serif font-bold text-rose-600 mb-1">14</div>
               <div className="text-sm font-bold text-earth-500 uppercase tracking-wider mb-4">May 2024</div>
               <p className="text-sm text-earth-600 mb-4">
                  <strong>Global Storytelling Night</strong><br/>
                  Theme: "Seeds of Our Ancestors"
               </p>
               <button className="w-full bg-earth-900 text-white font-bold py-2 rounded-xl text-sm hover:bg-agro-600 transition-colors">
                  RSVP Now
               </button>
            </div>
         </div>
      </div>

    </div>
  );
};

// Helper Icons
/* Removed redundant definitions from earlier in the file to resolve duplication errors */
function SproutIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.2.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1.7-1.3 2.9-3.3 3-5.5a7 7 0 0 0-6.2 2.9z"/></svg>; }
function CloudRainIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>; }
function HeartIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>; }
