import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, Leaf, ShieldPlus, Cpu, Factory, PlayCircle, Newspaper, Radio, Cast, 
  Megaphone, Share2, Link2, Globe, CheckCircle2, MessageCircle, Video, Glasses, 
  Monitor, Film, Bell, Heart, BarChart2, Calendar, TrendingUp, Zap, Clock, 
  ArrowRight, Search, Play, Volume2, Mic2, Info, BookOpen, X, Pause, Settings,
  Activity, Headphones, Music, Loader2, Maximize, ChevronRight, ShieldCheck
} from 'lucide-react';
import { View } from '../types';

const MEDIA_CHANNELS = [
  {
    id: 'SA',
    thrust: 'Social Agriculture',
    title: 'Community Voices & Heritage',
    icon: <Users size={24} />,
    color: 'bg-rose-50 border-rose-100 text-rose-800',
    description: 'Forums for storytelling, cultural preservation, and community dialogue.',
    channels: [
      { name: 'AgroCulture Podcast', type: 'Audio', desc: 'Stories from indigenous farmers.', isPodcast: true },
      { name: 'Heritage Forums', type: 'Community', desc: 'Peer-to-peer knowledge exchange.', isForum: true }
    ]
  },
  {
    id: 'EA',
    thrust: 'Environmental Agriculture',
    title: 'Eco-Reporting & Impact',
    icon: <Leaf size={24} />,
    color: 'bg-green-50 border-green-100 text-green-800',
    description: 'Documentaries and real-time reporting on climate and conservation.',
    channels: [
      { name: 'Planet Watch News', type: 'Video', desc: 'Daily climate impact updates.', isNews: true },
      { name: 'Green Lens Docs', type: 'Documentary', desc: 'Films on biodiversity restoration.', isDoc: true }
    ]
  },
  {
    id: 'HA',
    thrust: 'Health Agriculture',
    title: 'Wellness & Safety Alerts',
    icon: <ShieldPlus size={24} />,
    color: 'bg-red-50 border-red-100 text-red-800',
    description: 'Health advisories, nutritional education, and safety broadcasts.',
    channels: [
      { name: 'SafeHarvest Alerts', type: 'Mobile Push', desc: 'Real-time pathogen warnings.', isAlert: true },
      { name: 'NutriLife Blog', type: 'Article', desc: 'Connecting soil health to human health.', isBlog: true }
    ]
  },
  {
    id: 'TA',
    thrust: 'Technical Agriculture',
    title: 'Digital Tech & Tutorials',
    icon: <Cpu size={24} />,
    color: 'bg-blue-50 border-blue-100 text-blue-800',
    description: 'Webinars, software demos, and technical training modules.',
    channels: [
      { name: 'TechAg Webinars', type: 'Live Stream', desc: 'Deep dives into precision farming tools.', isWebinar: true },
      { name: 'SmartFarm VR', type: 'Interactive', desc: 'Virtual reality machinery training.', isVR: true }
    ]
  },
  {
    id: 'IA',
    thrust: 'Industrial Agriculture',
    title: 'Industry Insights',
    icon: <Factory size={24} />,
    color: 'bg-slate-50 border-slate-100 text-slate-800',
    description: 'Market analysis, supply chain news, and large-scale operational reports.',
    channels: [
      { name: 'AgBiz Weekly', type: 'Newsletter', desc: 'Global market trends and analysis.', isNewsletter: true },
      { name: 'ScaleUp Summit', type: 'Event', desc: 'Coverage of industrial ag conferences.', isEvent: true }
    ]
  }
];

const TICKER_ITEMS = [
  "LIVE: Kiriaini Farmers Collective reporting 15% yield increase using EA Thrust methodologies.",
  "MARKET: Arabica Coffee prices up 2.4% in East African exchange.",
  "TECH: New AI Crop Doctor update released with enhanced drought stress detection.",
  "EVENT: ScaleUp Summit 2024 tickets now available for early-bird registration.",
  "IMPACT: EnvirosAgro network surpasses 2.5 million reach milestone."
];

interface MediaProps {
  onNavigate?: (view: View) => void;
}

export const Media: React.FC<MediaProps> = ({ onNavigate }) => {
  const [showLiveRadio, setShowLiveRadio] = useState(false);
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [radioStation, setRadioStation] = useState("Voice of Earth (Global)");
  const [visualizerData, setVisualizerData] = useState<number[]>(new Array(40).fill(2));

  // Visualizer Animation
  useEffect(() => {
    let interval: any;
    if (showLiveRadio && isRadioPlaying) {
      interval = setInterval(() => {
        setVisualizerData(prev => prev.map(() => Math.floor(Math.random() * 20) + 5));
      }, 100);
    } else {
      setVisualizerData(new Array(40).fill(2));
    }
    return () => clearInterval(interval);
  }, [showLiveRadio, isRadioPlaying]);

  const handleShare = (title: string, text: string) => {
    if (navigator.share) {
      const url = window.location.origin;
      navigator.share({ title, text, url }).catch(err => {
          if (err.name !== 'AbortError') console.error('Share failed:', err);
      });
    } else {
      alert(`Copied to clipboard: ${title} - ${text}`);
    }
  };

  const handleListenLive = () => {
    setShowLiveRadio(true);
    // Auto-play simulation
    setTimeout(() => setIsRadioPlaying(true), 1000);
  };

  return (
    <div className="flex flex-col w-full bg-[#fafaf9] dark:bg-earth-950 transition-colors duration-500 pb-32">
      
      <div className="max-w-7xl mx-auto px-6 pt-12">
        
        {/* Featured Spotlight */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 relative h-[500px] rounded-[3.5rem] overflow-hidden group shadow-cinematic border border-earth-200 dark:border-earth-800">
                <img src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1600" className="w-full h-full object-cover transition-transform duration-[15s] group-hover:scale-110" alt="Featured Content" />
                <div className="absolute inset-0 bg-gradient-to-t from-earth-950 via-earth-950/40 to-transparent"></div>
                <div className="absolute top-8 left-8 bg-agro-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span> Live Broadcast
                </div>
                
                <div className="absolute bottom-10 left-10 right-10 text-white">
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight tracking-tight drop-shadow-2xl">Scaling Precision Diagnostics: <br/>The 2024 Tech Roadmap</h2>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={() => onNavigate?.(View.LIVE_HOST)} className="bg-white text-agro-900 px-10 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-agro-50 transition-all shadow-xl hover:-translate-y-1 active:scale-95 text-xs uppercase tracking-widest">
                            <Play fill="currentColor" size={18} /> Enter Studio
                        </button>
                        <button onClick={() => onNavigate?.(View.GREEN_LENS)} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-white/20 transition-all text-xs uppercase tracking-widest">
                            <Info size={18} /> Details
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="bg-white dark:bg-earth-900 p-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 shadow-sm flex-1 flex flex-col">
                    <h3 className="text-xs font-black text-earth-400 dark:text-earth-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                      <TrendingUp size={16} className="text-agro-600" /> Trending Now
                    </h3>
                    <div className="space-y-8 flex-1">
                        {[
                            { title: 'The Soil Microbiome Podcast', meta: 'Audio • 45m', trend: '+124%', target: View.PODCAST, icon: <Volume2 size={22}/> },
                            { title: 'Regenerative Tea Manual', meta: 'Document • 12MB', trend: '+85%', target: View.KNOWLEDGE, icon: <BookOpen size={22}/> },
                            { title: 'Live: Pest Alert Central', meta: 'Broadcast', trend: 'Live', target: View.PLANET_WATCH, icon: <Cast size={22}/> }
                        ].map((item, i) => (
                            <div key={i} onClick={() => onNavigate?.(item.target)} className="flex gap-5 group cursor-pointer">
                                <div className="w-14 h-14 bg-earth-50 dark:bg-earth-800 rounded-2xl flex items-center justify-center text-earth-400 group-hover:text-agro-600 transition-all shadow-inner">
                                    {item.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-sm text-earth-900 dark:text-white leading-tight mb-1 group-hover:text-agro-600 transition-colors truncate">{item.title}</h4>
                                    <div className="flex justify-between items-center">
                                       <span className="text-[10px] text-earth-400 font-bold uppercase tracking-tighter">{item.meta}</span>
                                       <span className="text-[10px] font-black text-agro-600">{item.trend}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => onNavigate?.(View.PODCAST)} className="w-full mt-8 py-4 border-2 border-earth-50 dark:border-earth-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-earth-400 hover:text-agro-600 hover:bg-earth-50 transition-all">
                      View Engagement Metrics
                    </button>
                </div>
            </div>
        </div>

        {/* Breaking News Ticker - RELOCATED HERE to prevent header override */}
        <div className="mb-20">
          <div className="bg-earth-900 dark:bg-agro-950 text-white py-4 px-10 rounded-[2.5rem] overflow-hidden shadow-2xl flex items-center gap-8 border border-white/5 relative group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-[0.03] pointer-events-none"></div>
            <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.4em] text-red-500 shrink-0 border-r border-white/10 pr-8 relative z-10">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping shadow-[0_0_10px_#ef4444]"></div> 
                Breaking News
            </div>
            <div className="flex-1 overflow-hidden relative h-5 z-10">
                <div className="absolute whitespace-nowrap animate-[marquee_35s_linear_infinite] text-sm font-bold text-agro-100 tracking-wide hover:[animation-play-state:paused] cursor-default">
                  {TICKER_ITEMS.concat(TICKER_ITEMS).map((item, i) => (
                    <span key={i} className="mr-32 flex-inline items-center gap-3">
                      {item} <span className="opacity-20 ml-32">•</span>
                    </span>
                  ))}
                </div>
            </div>
          </div>
        </div>

        {/* Content Explorer Sections */}
        <div className="space-y-32">
          {MEDIA_CHANNELS.map((section) => (
            <section key={section.id} className="animate-in fade-in slide-in-from-bottom-6 duration-700">
               <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 border-b border-earth-100 dark:border-earth-800 pb-8 px-2">
                  <div className="max-w-2xl">
                     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-black/5 ${section.color.split(' ')[0]}`}>
                        {section.icon}
                     </div>
                     <h2 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-3 tracking-tight">{section.title}</h2>
                     <p className="text-earth-500 dark:text-earth-400 font-medium leading-relaxed">{section.description}</p>
                  </div>
                  <button onClick={() => onNavigate?.(View.KNOWLEDGE)} className="text-[10px] font-black uppercase tracking-widest text-agro-600 flex items-center gap-3 group">
                    Enter Domain Archive <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                  {section.channels.map((channel, i) => (
                    <div 
                      key={i} 
                      className="bg-white dark:bg-earth-900 p-10 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm hover:shadow-cinematic hover:-translate-y-1 transition-all group cursor-pointer flex items-start gap-8"
                      onClick={() => {
                        if (channel.isPodcast) onNavigate?.(View.PODCAST);
                        else if (channel.isNews) onNavigate?.(View.PLANET_WATCH);
                        else if (channel.isWebinar) onNavigate?.(View.WEBINAR);
                        else if (channel.isVR) onNavigate?.(View.SMART_FARM_VR);
                        else if (channel.isDoc) onNavigate?.(View.GREEN_LENS);
                        else if (channel.isNewsletter) onNavigate?.(View.AGBIZ_WEEKLY);
                        else if (channel.isEvent) onNavigate?.(View.SCALEUP_SUMMIT);
                        else if (channel.isForum) onNavigate?.(View.HERITAGE_FORUM);
                        else if (channel.isAlert) onNavigate?.(View.SAFE_HARVEST);
                        else if (channel.isBlog) onNavigate?.(View.NUTRILIFE);
                      }}
                    >
                       <div className="p-5 bg-earth-50 dark:bg-earth-800 rounded-[1.8rem] text-earth-400 group-hover:bg-agro-50 dark:group-hover:bg-agro-900/40 group-hover:text-agro-600 transition-all shadow-inner">
                          {channel.type === 'Audio' ? <Headphones size={28} /> : channel.type === 'Video' ? <Video size={28} /> : channel.type === 'Article' ? <Newspaper size={28} /> : <Globe size={28} />}
                       </div>
                       <div className="flex-1">
                          <div className="flex justify-between items-start mb-4">
                             <span className="text-[9px] font-black text-agro-600 uppercase tracking-widest bg-agro-50 dark:bg-agro-900/30 px-3 py-1 rounded-full border border-agro-100 dark:border-agro-800">
                                {channel.type}
                             </span>
                             <button onClick={(e) => { e.stopPropagation(); handleShare(channel.name, channel.desc); }} className="p-2 text-earth-300 hover:text-agro-600 transition-colors">
                                <Share2 size={16} />
                             </button>
                          </div>
                          <h4 className="text-2xl font-bold text-earth-900 dark:text-white mb-2 leading-tight group-hover:text-agro-600 transition-colors">
                             {channel.name}
                          </h4>
                          <p className="text-sm text-earth-500 dark:text-earth-400 leading-relaxed font-medium mb-8">
                             {channel.desc}
                          </p>
                          <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-widest text-earth-300 group-hover:text-agro-600 transition-all">
                             {/* Added comment above fix: Added missing ChevronRight from lucide-react */}
                             Connect Stream <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </section>
          ))}
        </div>

        {/* Global Radio Hub (Pinned Experience) */}
        <div className="mt-32">
          <div className={`bg-slate-900 rounded-[4rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-cinematic transition-all duration-700 ${showLiveRadio ? 'border-4 border-blue-500/50' : ''}`}>
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-[10s]"><Radio size={400} /></div>
              
              <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
                 <div>
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                       <Radio size={16} className={isRadioPlaying ? 'animate-pulse' : ''} /> 24/7 Global Audio Node
                    </div>
                    <h3 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight tracking-tighter">Voice of Earth <br/><span className="text-blue-500">Global Stream</span></h3>
                    <p className="text-slate-400 text-xl max-w-xl mb-12 leading-relaxed font-medium">
                       Broadcasting real-time sustainable intelligence, environmental soundscapes, and expert discourse to every node in the network.
                    </p>
                    
                    {!showLiveRadio ? (
                       <button 
                        onClick={handleListenLive}
                        className="bg-white text-slate-950 px-16 py-6 rounded-full font-black uppercase text-xs tracking-[0.4em] hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-6"
                       >
                          Listen Live <Volume2 size={24} />
                       </button>
                    ) : (
                       <div className="space-y-10">
                          <div className="bg-black/40 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/5 shadow-inner">
                             <div className="flex justify-between items-center mb-8">
                                <div>
                                   <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Now Streaming</p>
                                   <p className="text-2xl font-bold">{radioStation}</p>
                                </div>
                                <div className="text-right">
                                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Listener Count</p>
                                   <p className="text-xl font-mono font-bold text-white">12,482</p>
                                </div>
                             </div>
                             
                             <div className="flex items-end gap-1.5 h-16 mb-10 overflow-hidden">
                                {visualizerData.map((h, i) => (
                                   <div 
                                    key={i} 
                                    className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full transition-all duration-300"
                                    style={{ height: `${h * 5}%`, opacity: isRadioPlaying ? 1 : 0.2 }}
                                   ></div>
                                ))}
                             </div>

                             <div className="flex items-center gap-10">
                                <button 
                                  onClick={() => setIsRadioPlaying(!isRadioPlaying)}
                                  className="w-20 h-20 bg-white text-slate-950 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl shrink-0"
                                >
                                   {isRadioPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1.5" />}
                                </button>
                                <div className="flex-1 space-y-4">
                                   <div className="flex justify-between items-center px-1">
                                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Master Gain Control</span>
                                      <span className="font-mono text-xs text-blue-400">{volume}%</span>
                                   </div>
                                   <input 
                                      type="range" min="0" max="100" 
                                      value={volume} 
                                      onChange={(e) => setVolume(parseInt(e.target.value))}
                                      className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500" 
                                   />
                                </div>
                             </div>
                          </div>
                          <button onClick={() => setShowLiveRadio(false)} className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest flex items-center gap-2">
                             <X size={14} /> Terminate Link
                          </button>
                       </div>
                    )}
                 </div>
                 
                 <div className="hidden lg:block relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full animate-pulse"></div>
                    <div className="relative bg-black/40 backdrop-blur-3xl p-10 rounded-[4rem] border border-white/10 shadow-2xl overflow-hidden group">
                       <div className="flex items-center gap-4 mb-10">
                          <Headphones size={32} className="text-blue-500" />
                          <div>
                             <h4 className="font-bold text-xl leading-none mb-1.5">Audio Fidelity Check</h4>
                             <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Encrypted Broadcast v4.2</p>
                          </div>
                       </div>
                       <div className="space-y-6">
                          {[
                            { label: 'Latency (Global)', val: '42ms', color: 'text-green-400' },
                            { label: 'Sample Rate', val: '48kHz / 24bit', color: 'text-white' },
                            { label: 'Encryption', val: 'AES-256-GCM', color: 'text-blue-400' }
                          ].map(stat => (
                            <div key={stat.label} className="flex justify-between items-center p-5 bg-white/5 rounded-2xl border border-white/5 group-hover:border-blue-500/30 transition-all shadow-inner">
                               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                               <span className={`font-mono text-xs font-black ${stat.color}`}>{stat.val}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
          </div>
        </div>

        {/* Footer Ribbon */}
        <div className="mt-32 pt-16 border-t border-earth-100 dark:border-earth-800 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-earth-400">
           <div className="flex items-center gap-8">
              <span className="hover:text-agro-600 transition-colors cursor-pointer flex items-center gap-3"><Globe size={14} /> Global Dissemination Unit</span>
              {/* Added comment above fix: Added missing ShieldCheck from lucide-react */}
              <span className="hover:text-agro-600 transition-colors cursor-pointer flex items-center gap-3"><ShieldCheck size={14} /> Truth Verified Metadata</span>
           </div>
           <p className="opacity-40">ENVIROSAGRO BROADCAST PROTOCOL v4.2.0</p>
        </div>
      </div>
    </div>
  );
};
