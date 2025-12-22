import React, { useState, useMemo } from 'react';
import { 
  PlayCircle, Calendar, Clock, Users, Video, AlertCircle, CheckCircle2, 
  MonitorPlay, ArrowRight, X, Search, Filter, Play, Volume2, Settings, 
  Maximize, Send, MessageSquare, Loader2, Sparkles, Zap, Award, Activity
} from 'lucide-react';

const UPCOMING_WEBINARS = [
  {
    id: 1,
    title: "Precision Drones: Calibration & Flight Paths",
    instructor: "Eng. Sarah Kimani",
    date: "May 15, 2024",
    time: "14:00 GMT+3",
    attendees: 342,
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=60",
    tags: ["Drones", "IoT"]
  },
  {
    id: 2,
    title: "Soil Sensor Network Setup",
    instructor: "Tech Team Lead",
    date: "May 18, 2024",
    time: "10:00 GMT+3",
    attendees: 128,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=60",
    tags: ["Sensors", "Soil Health"]
  },
  {
    id: 3,
    title: "AI Disease Detection App Training",
    instructor: "Dr. A. Patel",
    date: "May 22, 2024",
    time: "15:30 GMT+3",
    attendees: 560,
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&auto=format&fit=crop&q=60",
    tags: ["AI", "Mobile App"]
  }
];

const ARCHIVED_VIDEOS = [
  {
    id: 101,
    title: "Introduction to Smart Irrigation",
    duration: "45:10",
    views: "1.2k",
    date: "Apr 10, 2024",
    thumbnail: "https://images.unsplash.com/photo-1563514227146-89309e704d3b?w=800&auto=format&fit=crop&q=80",
    category: "Irrigation"
  },
  {
    id: 102,
    title: "Solar Pump Maintenance 101",
    duration: "32:05",
    views: "890",
    date: "Mar 28, 2024",
    thumbnail: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=80",
    category: "Energy"
  },
  {
    id: 103,
    title: "Data Logging for Certification",
    duration: "55:00",
    views: "2.1k",
    date: "Mar 15, 2024",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    category: "Data"
  },
  {
    id: 104,
    title: "Hydroponics: Deep Water Culture",
    duration: "28:30",
    views: "3.4k",
    date: "Feb 22, 2024",
    thumbnail: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&auto=format&fit=crop&q=60",
    category: "Hydroponics"
  }
];

export const Webinar: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState<number[]>([]);
  const [registeringId, setRegisteringId] = useState<number | null>(null);
  const [showFullLibrary, setShowFullLibrary] = useState(false);
  const [showLiveSession, setShowLiveSession] = useState(false);
  const [librarySearch, setLibrarySearch] = useState('');
  
  const handleRegister = (id: number) => {
    if (isRegistered.includes(id)) return;
    setRegisteringId(id);
    
    // Simulate API registration call
    setTimeout(() => {
        setIsRegistered([...isRegistered, id]);
        setRegisteringId(null);
    }, 1200);
  };

  const filteredLibrary = useMemo(() => {
    return ARCHIVED_VIDEOS.filter(v => 
        v.title.toLowerCase().includes(librarySearch.toLowerCase()) ||
        v.category.toLowerCase().includes(librarySearch.toLowerCase())
    );
  }, [librarySearch]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100 dark:border-blue-800">
            <MonitorPlay size={16} /> Technical Agriculture
        </div>
        <h2 className="text-4xl font-serif font-bold text-agro-900 dark:text-white mb-4 tracking-tight">TechAg Webinars</h2>
        <p className="text-xl text-earth-600 dark:text-earth-400 max-w-2xl mx-auto font-medium leading-relaxed">
          Master the tools of modern farming. From drone piloting to AI diagnostics, learn directly from industry engineers and agronomists.
        </p>
      </div>

      {/* Featured Live Stream Area */}
      <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl mb-16 border-4 border-slate-800 relative group">
         <div className="grid lg:grid-cols-3">
            <div className="lg:col-span-2 relative aspect-video bg-black flex items-center justify-center group cursor-pointer overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1600&auto=format&fit=crop&q=80" 
                 className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-[3s] group-hover:scale-105"
               />
               <div className="relative z-10 text-center scale-90 group-hover:scale-100 transition-transform duration-500">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4 mx-auto border-2 border-white/30 shadow-2xl">
                     <PlayCircle size={64} className="text-white fill-white animate-pulse" />
                  </div>
                  <p className="text-white font-black uppercase tracking-[0.3em] text-xs">Watch Active Replay</p>
               </div>
               <div className="absolute top-8 left-8 bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl animate-pulse">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE BROADCAST
               </div>
            </div>
            
            <div className="p-10 flex flex-col justify-between bg-slate-900 text-white relative">
               {/* Added missing Zap from lucide-react */}
               <div className="absolute top-0 right-0 p-8 opacity-5"><Zap size={200} /></div>
               <div className="relative z-10">
                  <h3 className="text-3xl font-serif font-bold mb-4 leading-tight">Automated Hydroponics Systems</h3>
                  <p className="text-slate-400 text-sm mb-10 leading-relaxed font-medium">
                     Learn how to set up and calibrate pH sensors for optimal nutrient delivery in vertical urban farms.
                  </p>
                  <div className="space-y-5">
                     <div className="flex items-center gap-4 text-sm text-slate-300 font-bold uppercase tracking-wider">
                        <div className="bg-blue-500/20 p-2 rounded-xl text-blue-400"><Users size={20} /></div>
                        1,204 Professionals watching
                     </div>
                     <div className="flex items-center gap-4 text-sm text-slate-300 font-bold uppercase tracking-wider">
                        <div className="bg-blue-500/20 p-2 rounded-xl text-blue-400"><Clock size={20} /></div>
                        Started 15m ago
                     </div>
                  </div>
               </div>
               
               <button 
                onClick={() => setShowLiveSession(true)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all mt-10 flex items-center justify-center gap-3 shadow-xl shadow-blue-600/30 group relative overflow-hidden"
               >
                  <span className="relative z-10 uppercase tracking-widest text-xs">Join Live Session</span>
                  <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[progress_2s_linear_infinite]"></div>
               </button>
            </div>
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
         
         {/* Upcoming Schedule */}
         <div className="lg:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white mb-8 flex items-center gap-4">
               <Calendar className="text-agro-600" /> Upcoming Schedule
            </h3>
            <div className="space-y-6">
               {UPCOMING_WEBINARS.map((webinar) => (
                  <div key={webinar.id} className="bg-white dark:bg-earth-900 p-6 rounded-[2.5rem] shadow-sm border border-earth-100 dark:border-earth-800 hover:shadow-xl transition-all flex flex-col md:flex-row gap-8 group">
                     <div className="w-full md:w-56 h-40 rounded-3xl overflow-hidden shrink-0 border border-earth-50 dark:border-earth-800 shadow-inner">
                        <img src={webinar.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={webinar.title} />
                     </div>
                     <div className="flex-1 flex flex-col justify-center">
                        <div className="flex flex-wrap gap-2 mb-3">
                           {webinar.tags.map(tag => (
                              <span key={tag} className="text-[9px] font-black uppercase tracking-[0.2em] bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">
                                 {tag}
                              </span>
                           ))}
                        </div>
                        <h4 className="text-2xl font-bold text-earth-900 dark:text-white mb-3 leading-tight group-hover:text-agro-600 transition-colors">{webinar.title}</h4>
                        <div className="flex flex-wrap items-center gap-6 text-xs text-earth-500 dark:text-earth-400 font-bold uppercase tracking-widest mb-6">
                           <span className="flex items-center gap-2 text-agro-600"><Users size={14} /> {webinar.instructor}</span>
                           <span className="flex items-center gap-2"><Calendar size={14} /> {webinar.date}</span>
                           <span className="flex items-center gap-2"><Clock size={14} /> {webinar.time}</span>
                        </div>
                        
                        {isRegistered.includes(webinar.id) ? (
                           <div className="bg-agro-50 dark:bg-agro-900/20 text-agro-700 dark:text-agro-400 font-black px-8 py-3 rounded-2xl text-xs flex items-center gap-3 border border-agro-100 dark:border-agro-800 w-fit animate-in zoom-in">
                              <CheckCircle2 size={20} className="text-agro-600" /> SECURED
                           </div>
                        ) : (
                           <button 
                              onClick={() => handleRegister(webinar.id)}
                              disabled={registeringId === webinar.id}
                              className="w-fit bg-earth-900 dark:bg-earth-800 hover:bg-agro-600 text-white font-black px-10 py-4 rounded-2xl text-[10px] uppercase tracking-[0.3em] transition-all shadow-lg active:scale-95 disabled:opacity-50"
                           >
                              {registeringId === webinar.id ? (
                                  <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> SYNCING...</span>
                              ) : (
                                  'Register for Free'
                              )}
                           </button>
                        )}
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Archive Sidebar */}
         <div>
            <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white mb-8 flex items-center gap-4">
               <Video className="text-earth-400" /> Archive
            </h3>
            <div className="bg-earth-50 dark:bg-earth-900/50 p-8 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-inner">
               <div className="space-y-8">
                  {ARCHIVED_VIDEOS.slice(0, 3).map((video) => (
                     <div key={video.id} className="group cursor-pointer">
                        <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video border border-white/50 dark:border-earth-800 shadow-md">
                           <img src={video.thumbnail} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={video.title} />
                           <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                              <PlayCircle size={40} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-2xl" />
                           </div>
                           <span className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white text-[9px] font-black px-2 py-1 rounded-lg border border-white/10 uppercase tracking-widest">
                              {video.duration}
                           </span>
                        </div>
                        <h5 className="font-bold text-earth-900 dark:text-white leading-tight mb-2 group-hover:text-blue-600 transition-colors">{video.title}</h5>
                        <div className="flex justify-between items-center text-[10px] text-earth-400 font-bold uppercase tracking-widest">
                            <span>{video.views} views</span>
                            <span>{video.date}</span>
                        </div>
                     </div>
                  ))}
               </div>
               <button 
                onClick={() => setShowFullLibrary(true)}
                className="w-full mt-10 border-2 border-earth-200 dark:border-earth-800 bg-white dark:bg-earth-800 text-earth-600 dark:text-earth-300 font-black py-4 rounded-2xl hover:bg-earth-100 dark:hover:bg-earth-700 transition-all text-[10px] uppercase tracking-[0.2em] shadow-sm active:scale-95"
               >
                  View Full Library
               </button>
            </div>

            {/* Added missing Award from lucide-react */}
            <div className="mt-8 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-100 dark:border-amber-900/50 p-8 rounded-[2.5rem] relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-1000"><Award size={100} /></div>
               <div className="relative z-10 flex items-start gap-4">
                  <div className="bg-white dark:bg-amber-800 p-3 rounded-2xl shadow-xl border border-amber-100 dark:border-amber-700 text-amber-600 dark:text-amber-300"><Award size={24} /></div>
                  <div>
                     <h4 className="font-black text-amber-900 dark:text-amber-200 text-xs uppercase tracking-widest mb-2">Certification Credits</h4>
                     <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed font-medium">
                        Attending live webinars earns you Continuing Education Units (CEUs) towards your EnvirosAgro Tech Certification.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* FULL LIBRARY MODAL */}
      {showFullLibrary && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-earth-950/90 backdrop-blur-xl animate-in fade-in duration-300">
              <div className="bg-white dark:bg-earth-900 w-full max-w-5xl rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10 flex flex-col max-h-[90vh]">
                  <div className="bg-blue-900 p-10 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shrink-0 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10"><PlayCircle size={200} /></div>
                      <div className="relative z-10">
                          <h3 className="text-3xl font-serif font-bold">TechAg Archive</h3>
                          <p className="text-xs text-blue-200 font-bold uppercase tracking-[0.3em] mt-1">Unified Knowledge Repository</p>
                      </div>
                      <div className="relative z-10 flex flex-1 max-w-md w-full gap-4">
                          <div className="relative flex-1">
                              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
                              <input 
                                type="text"
                                value={librarySearch}
                                onChange={(e) => setLibrarySearch(e.target.value)}
                                placeholder="Search by topic, category..."
                                className="w-full bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                              />
                          </div>
                          <button onClick={() => setShowFullLibrary(false)} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/10"><X size={24} /></button>
                      </div>
                  </div>

                  <div className="p-10 overflow-y-auto flex-1 custom-scrollbar">
                      {filteredLibrary.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredLibrary.map((video) => (
                                <div key={video.id} className="group cursor-pointer flex flex-col h-full bg-earth-50/50 dark:bg-earth-800/30 p-4 rounded-[2rem] border border-transparent hover:border-blue-100 dark:hover:border-blue-900 transition-all hover:shadow-xl">
                                    <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video shadow-md">
                                        <img src={video.thumbnail} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={video.title} />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                            <PlayCircle size={48} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                                        </div>
                                        <div className="absolute top-3 left-3 bg-blue-600 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                            {video.category}
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-earth-900 dark:text-white leading-snug mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">{video.title}</h4>
                                    <div className="mt-auto flex justify-between items-center text-[10px] font-black text-earth-400 uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5"><Play size={10} /> {video.views}</span>
                                        <span className="flex items-center gap-1.5"><Clock size={10} /> {video.duration}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                      ) : (
                          <div className="py-20 text-center text-earth-300">
                              <Search size={48} className="mx-auto mb-4 opacity-20" />
                              <p className="font-bold uppercase tracking-widest text-sm">No archived sessions found</p>
                          </div>
                      )}
                  </div>

                  <div className="p-6 bg-earth-50 dark:bg-earth-950/50 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-center gap-3">
                      <Sparkles size={16} className="text-blue-600" />
                      <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Continuous Learning Environment • TechAg Access</p>
                  </div>
              </div>
          </div>
      )}

      {/* LIVE SESSION MODAL */}
      {showLiveSession && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-500">
              <div className="w-full h-full max-w-7xl flex flex-col gap-6">
                  {/* Studio Header */}
                  <div className="flex justify-between items-center bg-white/5 p-6 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
                      <div className="flex items-center gap-6">
                          <div className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 animate-pulse shadow-lg shadow-red-600/20">
                             <span className="w-1.5 h-1.5 bg-white rounded-full"></span> ON AIR
                          </div>
                          <div>
                              <h3 className="text-white font-bold text-xl leading-none mb-1">Automated Hydroponics Setup</h3>
                              <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Host: Eng. Kimani • Production ID: TA-LIV-084</p>
                          </div>
                      </div>
                      <div className="flex items-center gap-4">
                          <div className="bg-white/10 px-4 py-2 rounded-xl text-white text-[10px] font-black flex items-center gap-2 border border-white/10">
                              <Users size={14} className="text-agro-400" /> 1,204 JOINED
                          </div>
                          <button 
                            onClick={() => setShowLiveSession(false)}
                            className="p-3 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white rounded-2xl transition-all border border-red-500/30 group"
                          >
                            <X size={24} className="group-hover:rotate-90 transition-transform" />
                          </button>
                      </div>
                  </div>

                  <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
                      {/* Video Player */}
                      <div className="flex-1 bg-black rounded-[3rem] border-4 border-white/5 relative overflow-hidden shadow-2xl group shadow-blue-500/10">
                          <img 
                            src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=1600" 
                            className="w-full h-full object-cover opacity-80"
                            alt="Live Stream"
                          />
                          
                          {/* Live Overlays */}
                          <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                              <div className="flex justify-end">
                                  {/* Added missing Activity from lucide-react */}
                                  <div className="bg-black/40 backdrop-blur-md p-4 rounded-3xl border border-white/10 text-white flex flex-col items-center gap-1 animate-in slide-in-from-right-10">
                                      <Activity size={24} className="text-agro-500 animate-pulse" />
                                      <span className="text-[8px] font-black uppercase tracking-widest text-agro-400">Sync Status</span>
                                  </div>
                              </div>

                              <div className="flex items-end justify-between pointer-events-auto">
                                  <div className="bg-black/60 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 w-full max-w-2xl flex items-center gap-8 shadow-2xl">
                                      <div className="flex items-center gap-4 border-r border-white/10 pr-8">
                                          <button className="text-white hover:text-blue-400 transition-colors"><Volume2 size={24} /></button>
                                          <button className="text-white hover:text-blue-400 transition-colors"><Settings size={20} /></button>
                                      </div>
                                      <div className="flex-1">
                                          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                              <div className="h-full bg-red-600 w-full animate-pulse"></div>
                                          </div>
                                          <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em] mt-3 text-center">ENVIROSAGRO LIVE STREAM PROTOCOL</p>
                                      </div>
                                      <button className="text-white hover:text-blue-400 transition-colors"><Maximize size={24} /></button>
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Chat Panel */}
                      <div className="w-full lg:w-96 bg-white dark:bg-earth-900 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-xl flex flex-col overflow-hidden">
                          <div className="p-6 border-b border-earth-100 dark:border-earth-800 bg-earth-50/50 dark:bg-earth-800/50 flex justify-between items-center">
                              <h4 className="font-black text-xs text-earth-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                                  <MessageSquare size={16} className="text-blue-600" /> Session Chat
                              </h4>
                              <span className="bg-agro-100 dark:bg-agro-900/30 text-agro-700 dark:text-agro-400 text-[8px] font-black px-2 py-0.5 rounded uppercase">Connected</span>
                          </div>
                          
                          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                              {[
                                  { user: "Sarah J.", msg: "The nutrient flow looks stable. What's the target pH?", time: "10:24" },
                                  { user: "Kiptoo M.", msg: "Eng. Kimani, are we using solar for the main pumps?", time: "10:25" },
                                  { user: "System", msg: "Welcome to the TechAg Live Stream. Please maintain professionalism.", time: "System", isSys: true }
                              ].map((chat, i) => (
                                  <div key={i} className={`flex flex-col ${chat.isSys ? 'items-center' : 'items-start'}`}>
                                      {chat.isSys ? (
                                          <p className="text-[8px] font-black text-earth-300 uppercase tracking-[0.2em] bg-earth-50 dark:bg-earth-800 px-4 py-1 rounded-full">{chat.msg}</p>
                                      ) : (
                                          <>
                                              <div className="flex justify-between w-full mb-1">
                                                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{chat.user}</span>
                                                  <span className="text-[8px] font-bold text-earth-400 uppercase">{chat.time}</span>
                                              </div>
                                              <p className="text-xs text-earth-700 dark:text-earth-300 leading-relaxed bg-earth-50 dark:bg-earth-800 p-3 rounded-2xl rounded-tl-none border border-earth-100 dark:border-earth-700">{chat.msg}</p>
                                          </>
                                      )}
                                  </div>
                              ))}
                          </div>

                          <div className="p-6 border-t border-earth-100 dark:border-earth-800 bg-earth-50/30 dark:bg-earth-900/30">
                              <div className="relative">
                                  <input 
                                    type="text" 
                                    placeholder="Message participants..." 
                                    className="w-full bg-white dark:bg-earth-800 border-2 border-earth-100 dark:border-earth-700 rounded-2xl pl-5 pr-12 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all dark:text-white"
                                  />
                                  <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20 active:scale-90 transition-all">
                                      <Send size={16} />
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};
