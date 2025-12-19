import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, Leaf, ShieldPlus, Cpu, Factory, PlayCircle, Newspaper, Radio, Cast, 
  Megaphone, Share2, Link2, Globe, CheckCircle2, MessageCircle, Video, Glasses, 
  Monitor, Film, Bell, Heart, BarChart2, Calendar, TrendingUp, Zap, Clock, 
  ArrowRight, Search, Play, Volume2, Mic2, Info, BookOpen, X, Pause, Settings,
  Activity, Headphones, Music, Loader2
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
      const url = window.location.href.startsWith('http') ? window.location.href : 'https://envirosagro.com';
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
    <div className="bg-earth-50 dark:bg-earth-950 min-h-screen">
      
      {/* Breaking News Ticker */}
      <div className="bg-agro-900 text-white py-3 relative overflow-hidden border-b border-agro-800">
          <div className="absolute left-0 top-0 bottom-0 px-6 bg-red-600 flex items-center gap-2 z-10 font-black italic uppercase text-xs">
              <Zap size={14} className="fill-white" /> Breaking
          </div>
          <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite] pl-40">
              {TICKER_ITEMS.map((item, i) => (
                  <span key={i} className="mx-8 text-sm font-bold flex items-center gap-4">
                      {item} <span className="w-1.5 h-1.5 bg-agro-500 rounded-full"></span>
                  </span>
              ))}
              {TICKER_ITEMS.map((item, i) => (
                  <span key={`dup-${i}`} className="mx-8 text-sm font-bold flex items-center gap-4">
                      {item} <span className="w-1.5 h-1.5 bg-agro-500 rounded-full"></span>
                  </span>
              ))}
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Featured Spotlight */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
            <div className="lg:col-span-2 relative h-[500px] rounded-[2.5rem] overflow-hidden group shadow-2xl border border-earth-200 dark:border-earth-800">
                <img src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1600" className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" alt="Featured Content" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute top-8 left-8 bg-agro-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 bg-white rounded-full animate-ping"></span> Live Broadcast
                </div>
                
                <div className="absolute bottom-10 left-10 right-10 text-white">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight drop-shadow-xl">Scaling Precision Diagnostics: <br/>The 2024 Tech Roadmap</h2>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={() => onNavigate && onNavigate(View.LIVE_HOST)} className="bg-white text-agro-900 px-8 py-3.5 rounded-2xl font-black flex items-center gap-3 hover:bg-agro-50 transition-all shadow-xl hover:-translate-y-1">
                            <Play fill="currentColor" size={20} /> Enter Studio
                        </button>
                        <button onClick={() => onNavigate && onNavigate(View.GREEN_LENS)} className="bg-black/40 backdrop-blur-md text-white border border-white/20 px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-black/60 transition-all">
                            <Info size={20} /> Documentary Details
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="bg-white dark:bg-earth-900 p-8 rounded-[2rem] border border-earth-100 dark:border-earth-800 shadow-sm flex-1">
                    <h3 className="text-xl font-bold text-earth-900 dark:text-white mb-6 flex items-center gap-2"><TrendingUp className="text-agro-600" /> Trending</h3>
                    <div className="space-y-6">
                        {[
                            { title: 'The Soil Microbiome Podcast', meta: 'Audio • 45m', trend: '+124%', target: View.PODCAST },
                            { title: 'Regenerative Tea Manual', meta: 'Document • 12MB', trend: '+85%', target: View.KNOWLEDGE },
                            { title: 'Live: Pest Alert Central', meta: 'Broadcast', trend: 'Live', target: View.PLANET_WATCH }
                        ].map((item, i) => (
                            <div key={i} onClick={() => onNavigate && onNavigate(item.target)} className="flex gap-4 group cursor-pointer">
                                <div className="w-12 h-12 bg-earth-50 dark:bg-earth-800 rounded-xl flex items-center justify-center text-earth-400 group-hover:text-agro-600 transition-colors">
                                    {i === 0 ? <Volume2 size={24} /> : i === 1 ? <BookOpen size={24} /> : <Cast size={24} />}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm text-earth-900 dark:text-white leading-tight mb-1 group-hover:text-agro-600 transition-colors">{item.title}</h4>
                                    <div className="flex justify-between items-center"><span className="text-[10px] text-earth-400 font-bold uppercase">{item.meta}</span><span className={`text-[10px] font-black ${item.trend === 'Live' ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>{item.trend}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-agro-900 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden">
                    <Mic2 size={120} className="absolute top-0 right-0 p-8 opacity-10" />
                    <h3 className="text-2xl font-serif font-bold mb-2">Voice of Earth</h3>
                    <button onClick={handleListenLive} className="w-full mt-4 bg-white text-agro-900 py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-agro-50 transition-colors">Listen Live</button>
                </div>
            </div>
        </div>

        {/* Section Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-20">
          {MEDIA_CHANNELS.map((section) => (
              <div key={section.id} className={`p-8 rounded-[2.5rem] border ${section.color.split(' ')[1]} ${section.color.split(' ')[0]} dark:bg-earth-900 transition-all h-full flex flex-col`}>
                  <div className="flex items-center gap-3 mb-6"><div className="p-3 bg-white dark:bg-earth-800 rounded-2xl shadow-sm">{section.icon}</div><h4 className="font-bold leading-tight dark:text-white">{section.title}</h4></div>
                  <p className="text-xs text-earth-600 dark:text-earth-400 mb-8 flex-1 leading-relaxed">{section.description}</p>
                  <div className="space-y-4">
                      {section.channels.map((channel: any, idx) => (
                          <div key={idx} className="bg-white/70 dark:bg-earth-800/50 p-4 rounded-2xl hover:bg-white transition-all cursor-pointer relative group border border-transparent hover:border-agro-100">
                              <div className="flex justify-between items-center mb-1"><span className="font-bold text-sm text-earth-900 dark:text-white leading-tight pr-4">{channel.name}</span><span className="text-[10px] uppercase font-black text-earth-400 bg-earth-50 px-1.5 py-0.5 rounded border">{channel.type}</span></div>
                              {channel.isPodcast && onNavigate && (<button onClick={() => onNavigate(View.PODCAST)} className="w-full mt-2 py-2 bg-agro-100 text-agro-700 text-[10px] font-black rounded-xl hover:bg-agro-200 transition-colors uppercase flex items-center justify-center gap-2"><PlayCircle size={14} /> Listen</button>)}
                              {channel.isForum && onNavigate && (<button onClick={() => onNavigate(View.HERITAGE_FORUM)} className="w-full mt-2 py-2 bg-rose-100 text-rose-700 text-[10px] font-black rounded-xl hover:bg-rose-200 transition-colors uppercase flex items-center justify-center gap-2"><MessageCircle size={14} /> Discuss</button>)}
                              {channel.isWebinar && onNavigate && (<button onClick={() => onNavigate(View.WEBINAR)} className="w-full mt-2 py-2 bg-blue-100 text-blue-700 text-[10px] font-black rounded-xl hover:bg-blue-200 transition-colors uppercase flex items-center justify-center gap-2"><Video size={14} /> Watch</button>)}
                              {channel.isVR && onNavigate && (<button onClick={() => onNavigate(View.SMART_FARM_VR)} className="w-full mt-2 py-2 bg-purple-100 text-purple-700 text-[10px] font-black rounded-xl hover:bg-purple-200 transition-colors uppercase flex items-center justify-center gap-2"><Glasses size={14} /> VR</button>)}
                              {channel.isNews && onNavigate && (<button onClick={() => onNavigate(View.PLANET_WATCH)} className="w-full mt-2 py-2 bg-green-100 text-green-700 text-[10px] font-black rounded-xl hover:bg-green-200 transition-colors uppercase flex items-center justify-center gap-2"><Monitor size={14} /> Report</button>)}
                              {channel.isDoc && onNavigate && (<button onClick={() => onNavigate(View.GREEN_LENS)} className="w-full mt-2 py-2 bg-green-100 text-green-700 text-[10px] font-black rounded-xl hover:bg-green-200 transition-colors uppercase flex items-center justify-center gap-2"><Film size={14} /> Stream</button>)}
                              {channel.isAlert && onNavigate && (<button onClick={() => onNavigate(View.SAFE_HARVEST)} className="w-full mt-2 py-2 bg-red-100 text-red-700 text-[10px] font-black rounded-xl hover:bg-red-200 transition-colors uppercase flex items-center justify-center gap-2"><Bell size={14} /> Alerts</button>)}
                              {channel.isBlog && onNavigate && (<button onClick={() => onNavigate(View.NUTRILIFE)} className="w-full mt-2 py-2 bg-red-100 text-red-700 text-[10px] font-black rounded-xl hover:bg-red-200 transition-colors uppercase flex items-center justify-center gap-2"><Heart size={14} /> Read</button>)}
                              {channel.isNewsletter && onNavigate && (<button onClick={() => onNavigate(View.AGBIZ_WEEKLY)} className="w-full mt-2 py-2 bg-slate-100 text-slate-700 text-[10px] font-black rounded-xl hover:bg-slate-200 transition-colors uppercase flex items-center justify-center gap-2"><BarChart2 size={14} /> Analysis</button>)}
                              {channel.isEvent && onNavigate && (<button onClick={() => onNavigate(View.SCALEUP_SUMMIT)} className="w-full mt-2 py-2 bg-slate-100 text-slate-700 text-[10px] font-black rounded-xl hover:bg-slate-200 transition-colors uppercase flex items-center justify-center gap-2"><Calendar size={14} /> Join</button>)}
                              <button onClick={(e) => { e.stopPropagation(); handleShare(channel.name, channel.desc); }} className="absolute top-3 right-3 text-earth-400 hover:text-agro-600 transition-colors p-1"><Share2 size={14} /></button>
                          </div>
                      ))}
                  </div>
              </div>
          ))}
        </div>

        {/* Global Radio Widget */}
        <div className="bg-white dark:bg-earth-900 rounded-[3rem] p-10 border border-earth-100 shadow-sm mb-20 overflow-hidden relative">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                <div className="lg:w-1/2">
                    <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-agro-600 mb-4"><Radio size={16} className="animate-pulse" /> Live Radio</div>
                    <h3 className="text-4xl font-serif font-bold text-earth-900 dark:text-white mb-6">Agricultural Airwaves</h3>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={handleListenLive} className="bg-agro-600 hover:bg-agro-700 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-3 transition-all shadow-xl shadow-agro-600/30 active:scale-95"><Volume2 size={24} /> Listen Live</button>
                        <button onClick={() => onNavigate && onNavigate(View.WEBINAR)} className="bg-earth-50 dark:bg-earth-800 text-earth-700 dark:text-earth-300 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all"><Clock size={20} /> Schedule</button>
                    </div>
                </div>
                <div className="lg:w-1/2 w-full">
                    <div className="bg-earth-50 dark:bg-earth-800/50 p-8 rounded-[2rem] border border-earth-100 group cursor-pointer" onClick={handleListenLive}>
                        <div className="flex gap-6 items-center mb-8">
                            <div className="w-20 h-20 bg-agro-600 rounded-3xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform"><Mic2 size={40} /></div>
                            <div>
                                <h4 className="text-xl font-bold text-earth-900 dark:text-white">Regen-Ag 101</h4>
                                <p className="text-earth-500 dark:text-earth-400">with Host Samuel O.</p>
                            </div>
                        </div>
                        <div className="flex gap-1 items-end h-6 w-full px-2">
                             {visualizerData.slice(0, 15).map((h, i) => (
                                <div key={i} className="flex-1 bg-agro-200 dark:bg-agro-900 rounded-t-sm" style={{ height: `${h}%` }}></div>
                             ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* LIVE RADIO PLAYER MODAL */}
      {showLiveRadio && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-300">
              <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[4rem] shadow-2xl border border-white/10 overflow-hidden animate-in zoom-in-95 flex flex-col">
                  {/* Studio Header */}
                  <div className="bg-agro-900 p-8 text-white relative overflow-hidden flex justify-between items-center">
                      <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Music size={150} /></div>
                      <div className="relative z-10 flex items-center gap-5">
                          <div className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 animate-pulse shadow-lg shadow-red-600/30">
                              <span className="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE STUDIO
                          </div>
                          <div>
                            <h3 className="text-2xl font-serif font-bold tracking-tight">{radioStation}</h3>
                            <p className="text-agro-300 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Unified Frequency 99.8 MHz</p>
                          </div>
                      </div>
                      <button 
                        onClick={() => setShowLiveRadio(false)} 
                        className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-all group"
                      >
                          <X size={28} className="group-hover:rotate-90 transition-transform" />
                      </button>
                  </div>

                  <div className="p-12 flex flex-col items-center">
                      {/* Visualizer Area */}
                      <div className="w-full h-48 bg-slate-50 dark:bg-black/40 rounded-[2.5rem] border border-earth-100 dark:border-white/5 p-8 mb-12 flex items-center justify-center gap-1.5 relative overflow-hidden">
                          {isRadioPlaying ? (
                            <>
                                {visualizerData.map((h, i) => (
                                    <div 
                                        key={i} 
                                        className="w-2 bg-agro-500 rounded-full transition-all duration-100 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                                        style={{ height: `${h * 4}%`, opacity: 0.3 + (h/25) }}
                                    ></div>
                                ))}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-900 via-transparent to-transparent pointer-events-none"></div>
                            </>
                          ) : (
                              <div className="flex flex-col items-center gap-4 animate-in fade-in">
                                  <Loader2 size={32} className="text-agro-600 animate-spin" />
                                  <p className="text-[10px] font-black text-earth-400 uppercase tracking-widest">Buffering Global Feed...</p>
                              </div>
                          )}
                      </div>

                      {/* Metadata */}
                      <div className="text-center mb-12">
                          <h4 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Sustainable Integrated Development</h4>
                          <p className="text-agro-600 dark:text-agro-400 font-black text-xs uppercase tracking-widest mb-6">Current Talk: Soil Resilience Engine v4.0</p>
                          <div className="flex items-center justify-center gap-10">
                              <div className="flex flex-col items-center">
                                  <span className="text-[9px] font-black text-earth-400 uppercase tracking-widest mb-1">Host</span>
                                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Samuel Omondi</span>
                              </div>
                              <div className="h-6 w-px bg-earth-200 dark:bg-white/10"></div>
                              <div className="flex flex-col items-center">
                                  <span className="text-[9px] font-black text-earth-400 uppercase tracking-widest mb-1">Location</span>
                                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Kiriaini, Kenya</span>
                              </div>
                              <div className="h-6 w-px bg-earth-200 dark:bg-white/10"></div>
                              <div className="flex flex-col items-center">
                                  <span className="text-[9px] font-black text-earth-400 uppercase tracking-widest mb-1">Listeners</span>
                                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">1,242 Live</span>
                              </div>
                          </div>
                      </div>

                      {/* Main Controls */}
                      <div className="flex flex-col items-center gap-10 w-full">
                          <div className="flex items-center gap-12">
                              <button className="text-earth-300 hover:text-agro-600 transition-colors"><SkipBack size={32} /></button>
                              <button 
                                  onClick={() => setIsRadioPlaying(!isRadioPlaying)}
                                  className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-105 active:scale-95 ${isRadioPlaying ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-agro-600 text-white shadow-agro-600/30'}`}
                              >
                                  {isRadioPlaying ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-2" />}
                              </button>
                              <button className="text-earth-300 hover:text-agro-600 transition-colors"><SkipForward size={32} /></button>
                          </div>

                          <div className="w-full max-w-xs flex items-center gap-4">
                              <Volume2 size={20} className="text-earth-400" />
                              <div className="flex-1 h-1.5 bg-earth-100 dark:bg-white/10 rounded-full overflow-hidden group cursor-pointer">
                                  <div className="h-full bg-agro-500 shadow-[0_0_10px_#22c55e]" style={{ width: `${volume}%` }}></div>
                              </div>
                              <span className="text-[10px] font-black text-earth-400 font-mono">{volume}%</span>
                          </div>
                      </div>
                  </div>

                  {/* Footer Stats */}
                  <div className="p-8 bg-earth-50 dark:bg-earth-950/50 border-t border-earth-100 dark:border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                          <Headphones size={20} className="text-blue-500" />
                          <p className="text-[9px] text-earth-400 dark:text-earth-500 font-black uppercase tracking-[0.4em]">High Fidelity Neural Stream Optimized</p>
                      </div>
                      <div className="flex gap-4">
                          <button className="text-[9px] font-black text-agro-600 uppercase tracking-widest hover:underline">Stream History</button>
                          <button className="text-[9px] font-black text-agro-600 uppercase tracking-widest hover:underline">Full Schedule</button>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

// Helper Icons
const Volume2Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
);

const SkipBack = ({ size, className }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg>
);

const SkipForward = ({ size, className }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
);
