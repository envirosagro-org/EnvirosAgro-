import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Clock, Calendar, Mic, Volume2, Share2, Download } from 'lucide-react';

const EPISODES = [
  {
    id: 1,
    title: "The Roots of Indigenous Farming",
    host: "Dr. Amani",
    date: "April 15, 2024",
    duration: "45:20",
    description: "Exploring traditional methods that have sustained communities for centuries. We discuss soil sovereignty, seed saving, and the spiritual connection to the land.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "Soil Health: The Invisible Ecosystem",
    host: "Sarah Jenkins",
    date: "April 08, 2024",
    duration: "32:15",
    description: "A deep dive into the microbial world beneath our feet. How nematodes, fungi, and bacteria work together to feed your crops.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "Market Trends: From Farm to Fork",
    host: "James Mwangi",
    date: "April 01, 2024",
    duration: "28:45",
    description: "Analyzing the latest shifts in global supply chains. Why local value addition is the key to profitability for smallholder farmers.",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    title: "Water Wisdom for Arid Zones",
    host: "Dr. Amani",
    date: "March 25, 2024",
    duration: "51:10",
    description: "Strategies for harvesting every drop. Sand dams, zai pits, and the ancient art of water retention in dryland agriculture.",
    image: "https://images.unsplash.com/photo-1589923158776-0d53f2e030e2?w=800&auto=format&fit=crop&q=60"
  }
];

export const Podcast: React.FC = () => {
  const [currentEpisode, setCurrentEpisode] = useState(EPISODES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // Mock progress

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-3 gap-12">
        
        {/* Left Column: Player */}
        <div className="lg:col-span-2">
           <div className="bg-agro-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden mb-8">
              {/* Background Cover */}
              <div className="absolute inset-0 opacity-20">
                  <img src={currentEpisode.image} alt="Cover" className="w-full h-full object-cover" />
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg border-2 border-white/20 shrink-0">
                      <img src={currentEpisode.image} alt={currentEpisode.title} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-2 text-agro-300 text-xs font-bold uppercase tracking-wider mb-2">
                          <Mic size={14} /> AgroCulture Podcast
                      </div>
                      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 leading-tight">{currentEpisode.title}</h2>
                      <p className="text-agro-200 text-sm mb-6">Hosted by {currentEpisode.host}</p>
                      
                      {/* Controls */}
                      <div className="flex flex-col gap-4">
                          <div className="flex items-center justify-center md:justify-start gap-6">
                              <button className="text-agro-300 hover:text-white transition-colors"><SkipBack size={24} /></button>
                              <button 
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-14 h-14 bg-white text-agro-900 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-white/10"
                              >
                                  {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                              </button>
                              <button className="text-agro-300 hover:text-white transition-colors"><SkipForward size={24} /></button>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="w-full">
                              <div className="flex justify-between text-xs text-agro-300 mb-1">
                                  <span>12:45</span>
                                  <span>{currentEpisode.duration}</span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-1.5 cursor-pointer">
                                  <div className="bg-agro-400 h-1.5 rounded-full relative" style={{width: `${progress}%`}}>
                                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm transform scale-0 hover:scale-100 transition-transform"></div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
           </div>

           <div className="bg-white rounded-3xl p-8 shadow-sm border border-earth-100">
               <h3 className="text-xl font-bold text-earth-900 mb-4">Episode Notes</h3>
               <p className="text-earth-600 leading-relaxed mb-6">
                   {currentEpisode.description}
               </p>
               <div className="flex gap-4 border-t border-earth-100 pt-6">
                   <button className="flex items-center gap-2 text-earth-500 hover:text-agro-600 text-sm font-bold transition-colors">
                       <Share2 size={18} /> Share Episode
                   </button>
                   <button className="flex items-center gap-2 text-earth-500 hover:text-agro-600 text-sm font-bold transition-colors">
                       <Download size={18} /> Download MP3
                   </button>
               </div>
           </div>
        </div>

        {/* Right Column: Playlist */}
        <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm border border-earth-100 overflow-hidden">
                <div className="p-6 border-b border-earth-100 bg-earth-50">
                    <h3 className="font-bold text-lg text-earth-900">Recent Episodes</h3>
                    <p className="text-xs text-earth-500">Updated weekly</p>
                </div>
                <div className="divide-y divide-earth-100">
                    {EPISODES.map((ep) => (
                        <div 
                            key={ep.id} 
                            onClick={() => { setCurrentEpisode(ep); setIsPlaying(true); }}
                            className={`p-4 hover:bg-agro-50 cursor-pointer transition-colors group ${currentEpisode.id === ep.id ? 'bg-agro-50' : ''}`}
                        >
                            <div className="flex gap-3">
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                    <img src={ep.image} className="w-full h-full object-cover" />
                                    {currentEpisode.id === ep.id && isPlaying && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <Volume2 size={16} className="text-white animate-pulse" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className={`text-sm font-bold mb-1 line-clamp-2 ${currentEpisode.id === ep.id ? 'text-agro-700' : 'text-earth-900 group-hover:text-agro-700'}`}>
                                        {ep.title}
                                    </h4>
                                    <div className="flex items-center gap-3 text-xs text-earth-400">
                                        <span className="flex items-center gap-1"><Calendar size={10} /> {ep.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={10} /> {ep.duration}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 text-center border-t border-earth-100">
                    <button className="text-sm font-bold text-agro-600 hover:text-agro-700">View All Episodes</button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};