import React, { useState, useEffect, useMemo } from 'react';
/* Added missing Leaf icon import from lucide-react */
import { 
  Play, Clock, Globe, Thermometer, Wind, AlertTriangle, TrendingUp, 
  Share2, Info, X, Pause, Square, Volume2, Maximize, Settings, 
  Wifi, Activity, Zap, Search, Filter, FileText, CheckCircle2, 
  Loader2, ArrowRight, Bookmark, Copy, Check, MousePointer2, Radio, Leaf
} from 'lucide-react';

const NEWS_SEGMENTS = [
  {
    id: 1,
    title: "Global Drought Impact Report: Horn of Africa",
    category: "Climate Alert",
    time: "2h ago",
    duration: "12:45",
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&auto=format&fit=crop&q=60",
    desc: "Analyzing the severe rainfall deficit affecting crop yields across Kenya, Somalia, and Ethiopia.",
    transcript: "[00:00:05] Reporter: We are standing in the Kiriaini sector where the Dn variable has dropped below 3 months for the first time in a decade.\n[00:00:15] Expert: The impact on soil integrity (In) is cascading. Without immediate intervention via the EA Thrust, we anticipate a 40% loss in local biomass.\n[00:01:22] Reporter: New relief corridors are being established via the IA supply chain network...",
    tags: ["Climate Policy", "East Africa"]
  },
  {
    id: 2,
    title: "Ocean Acidification & Coastal Farming",
    category: "Marine Ecosystems",
    time: "5h ago",
    duration: "08:30",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&auto=format&fit=crop&q=60",
    desc: "How rising CO2 levels are impacting shellfish farming and coastal agricultural zones.",
    transcript: "[00:00:10] Narrator: The pH levels of our coastal waters are shifting at an exponential rate.\n[00:02:45] Scientist: Coastal aquaculture relies on steady mineral cycles. The HA thrust is currently monitoring toxicity levels in regional estuaries.\n[00:05:30] Narrator: Proposed solutions include integrated seaweed filtration systems...",
    tags: ["Biodiversity", "Marine"]
  },
  {
    id: 3,
    title: "Reforestation Success in the Amazon",
    category: "Conservation",
    time: "Yesterday",
    duration: "15:20",
    image: "https://images.unsplash.com/photo-1516214104703-d870798883c5?w=800&auto=format&fit=crop&q=60",
    desc: "Indigenous communities reclaim land using agroforestry techniques, restoring biodiversity.",
    transcript: "[00:00:00] Intro: Indigenous wisdom meets modern satellite telemetry.\n[00:04:15] Elder: We are planting for our grandchildren. The soil is our ancestor.\n[00:10:20] Analyst: NDVI data confirms a 12% increase in canopy density within this quadrant. This is a primary milestone for global EA goals.",
    tags: ["Biodiversity", "Indigenous"]
  },
  {
    id: 4,
    title: "New Pest Resistant Maize Variety Approved",
    category: "Agri-Tech",
    time: "2 days ago",
    duration: "06:15",
    image: "https://images.unsplash.com/photo-1629814682056-2775fa339793?w=800&auto=format&fit=crop&q=60",
    desc: "Scientists unveil a drought-tolerant, pest-resistant strain tailored for semi-arid regions.",
    transcript: "[00:00:15] Lab Lead: This variety, EA-Hybrid-X9, has shown 90% resistance to Fall Armyworm in controlled field trials.\n[00:02:30] Farmer: For us, this means lower costs for chemical inputs and higher m(t) resilience.\n[00:04:45] Lab Lead: Distribution begins next month through the IA cooperative hubs.",
    tags: ["Sustainable Tech", "Market Watch"]
  },
  {
    id: 5,
    title: "The Circular Plastic Economy in Kenya",
    category: "Waste Management",
    time: "3 days ago",
    duration: "10:20",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=60",
    desc: "How agricultural plastic is being repurposed into durable farm infrastructure.",
    transcript: "[00:00:30] Reporter: Recycling irrigation pipes into fencing posts is the latest win for the EA Thrust in Nairobi.\n[00:05:10] Project Lead: We've diverted 50 tons of HDPE from landfills this quarter alone.\n[00:08:45] Reporter: Scalability is high, with new processing plants coming online in Q4.",
    tags: ["Climate Policy", "Sustainable Tech"]
  }
];

const TICKER_ITEMS = [
  "BREAKING: El Niño expected to peak in late 2024, farmers advised to prepare drainage systems.",
  "MARKET: Global wheat prices stabilize after bumper harvest in Northern Hemisphere.",
  "POLICY: EU passes new regenerative agriculture subsidy package for smallholders.",
  "TECH: Drone-based pollination trials show 30% yield increase in almond orchards."
];

const CATEGORIES = [
  { name: 'Climate Policy', desc: 'Updates on global regulations and national subsidies.' },
  { name: 'Sustainable Tech', desc: 'New hardware and AI tools reaching the field.' },
  { name: 'Biodiversity', desc: 'Conservation wins and ecosystem management logs.' },
  { name: 'Market Watch', desc: 'Real-time commodity trends and supply chain shifts.' }
];

export const PlanetWatch: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState(NEWS_SEGMENTS[0]);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // New Functional States
  const [showTranscript, setShowTranscript] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [archiveSearch, setArchiveSearch] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const [isRescanning, setIsRescanning] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isBroadcasting && !isPaused) {
      interval = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) return 100;
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isBroadcasting, isPaused]);

  /* Renamed handleWatchReport to handleWatchNow to fix missing reference error */
  const handleWatchNow = (segment?: typeof NEWS_SEGMENTS[0]) => {
    if (segment) setActiveSegment(segment);
    setIsBroadcasting(true);
    setVideoProgress(0);
    setIsPaused(false);
    setShowArchive(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseBroadcast = () => {
    setIsBroadcasting(false);
    setVideoProgress(0);
  };

  const handleCategoryClick = (cat: string) => {
    setIsRescanning(true);
    setActiveCategoryFilter(cat === activeCategoryFilter ? null : cat);
    setTimeout(() => setIsRescanning(false), 800);
  };

  const handleCopyTranscript = () => {
    if (activeSegment.transcript) {
        navigator.clipboard.writeText(activeSegment.transcript);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  };

  const displayedSegments = useMemo(() => {
    if (!activeCategoryFilter) return NEWS_SEGMENTS;
    return NEWS_SEGMENTS.filter(s => s.tags.includes(activeCategoryFilter));
  }, [activeCategoryFilter]);

  const archiveResults = useMemo(() => {
    return NEWS_SEGMENTS.filter(s => 
        s.title.toLowerCase().includes(archiveSearch.toLowerCase()) ||
        s.desc.toLowerCase().includes(archiveSearch.toLowerCase()) ||
        s.tags.some(t => t.toLowerCase().includes(archiveSearch.toLowerCase()))
    );
  }, [archiveSearch]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
         <div className="bg-green-100 dark:bg-agro-900/30 p-2 rounded-xl text-green-700 dark:text-agro-400">
            <Globe size={32} />
         </div>
         <div>
            <h2 className="text-3xl font-serif font-bold text-agro-900 dark:text-white leading-none">Planet Watch News</h2>
            <p className="text-earth-500 dark:text-earth-400 text-sm mt-1">Daily Intelligence on Climate, Agriculture & Conservation.</p>
         </div>
         <div className="ml-auto flex gap-4 text-xs font-bold text-earth-500 dark:text-earth-400 bg-white dark:bg-earth-900 border border-earth-200 dark:border-earth-800 px-4 py-2 rounded-full shadow-sm hidden md:flex">
             <span className="flex items-center gap-1"><Thermometer size={14} className="text-red-500"/> +1.2°C Global Avg</span>
             <span className="text-earth-300 dark:text-earth-700">|</span>
             <span className="flex items-center gap-1"><Wind size={14} className="text-blue-500"/> CO2 421ppm</span>
         </div>
      </div>

      {/* Main News Player */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
         <div className="lg:col-span-2">
            <div className="relative aspect-video bg-black rounded-[3rem] overflow-hidden shadow-2xl group border border-earth-200 dark:border-earth-800">
               {isBroadcasting ? (
                 <div className="absolute inset-0 bg-slate-900 flex flex-col">
                   <img 
                    src={activeSegment.image} 
                    className={`w-full h-full object-cover transition-all duration-1000 ${isPaused ? 'opacity-40 grayscale blur-sm' : 'opacity-80'}`} 
                    alt="Broadcast Feed" 
                   />
                   
                   <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                      <div className="flex justify-between items-start">
                        <div className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg animate-pulse">
                          <span className="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE BROADCAST
                        </div>
                        <div className="flex gap-2 pointer-events-auto">
                          <div className="bg-black/40 backdrop-blur text-white px-3 py-1 rounded-xl text-[10px] font-mono border border-white/10 flex items-center gap-2">
                             <Wifi size={12} className="text-green-400" /> SYNC_OK
                          </div>
                          <button 
                            onClick={handleCloseBroadcast}
                            className="bg-black/40 hover:bg-red-600 backdrop-blur text-white p-2 rounded-xl border border-white/10 transition-all"
                          >
                             <X size={20} />
                          </button>
                        </div>
                      </div>

                      <div className="bg-black/60 backdrop-blur-md rounded-3xl p-6 border border-white/10 w-full max-w-2xl mx-auto pointer-events-auto shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                           <div className="flex items-center gap-4">
                             <button onClick={() => setIsPaused(!isPaused)} className="text-white hover:text-agro-400 transition-colors">
                               {isPaused ? <Play size={24} fill="currentColor" /> : <Pause size={24} fill="currentColor" />}
                             </button>
                             <div className="flex flex-col">
                                <span className="text-xs font-black text-agro-400 uppercase tracking-widest">{activeSegment.title}</span>
                                <span className="text-[9px] text-slate-400 font-mono tracking-tighter mt-0.5">ENVIROSAGRO_FEED_CH_01_HD</span>
                             </div>
                           </div>
                           <div className="flex items-center gap-4">
                              <Volume2 size={18} className="text-slate-400 cursor-pointer" />
                              <Settings size={18} className="text-slate-400 cursor-pointer" />
                              <Maximize size={18} className="text-slate-400 cursor-pointer" />
                           </div>
                        </div>
                        <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden group/progress cursor-pointer">
                           <div 
                              className="h-full bg-agro-600 relative transition-all duration-300 shadow-[0_0_15px_#16a34a]"
                              style={{ width: `${videoProgress}%` }}
                           >
                              <div className="absolute right-0 top-0 h-full w-2 bg-white shadow-xl opacity-0 group-hover/progress:opacity-100"></div>
                           </div>
                        </div>
                        <div className="flex justify-between mt-3 text-[9px] font-mono text-slate-500 font-bold">
                           <span>{Math.floor((videoProgress / 100) * 12)}:{(Math.floor((videoProgress / 100) * 45) % 60).toString().padStart(2, '0')}</span>
                           <span>{activeSegment.duration}</span>
                        </div>
                      </div>
                   </div>

                   {isPaused && (
                     <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-full border border-white/20 animate-in zoom-in">
                           <Play size={48} className="text-white fill-white ml-2" />
                        </div>
                     </div>
                   )}
                 </div>
               ) : (
                 <>
                  <img src={activeSegment.image} className="w-full h-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105" alt="Main News" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-10 text-white">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 inline-block animate-pulse shadow-lg">
                        {activeSegment.category}
                      </span>
                      <h3 className="text-4xl font-bold mb-4 leading-tight max-w-2xl tracking-tight">{activeSegment.title}</h3>
                      <p className="text-gray-300 text-base mb-8 max-w-xl line-clamp-2 font-medium leading-relaxed">{activeSegment.desc}</p>
                      
                      <div className="flex flex-wrap items-center gap-4">
                        <button 
                          onClick={() => handleWatchNow()}
                          className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 shadow-xl"
                        >
                            <Play size={20} fill="currentColor" className="ml-0.5" /> Watch Report
                        </button>
                        <button 
                            onClick={() => setShowTranscript(true)}
                            className="flex items-center gap-3 text-white hover:text-agro-400 transition-all font-black text-xs uppercase tracking-widest bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/20"
                        >
                            <FileText size={20} /> Read Transcript
                        </button>
                      </div>
                  </div>
                 </>
               )}
            </div>
         </div>

         {/* Up Next List */}
         <div className="bg-white dark:bg-earth-900 border border-earth-200 dark:border-earth-800 rounded-[2.5rem] p-8 shadow-sm flex flex-col h-full relative overflow-hidden">
            {isRescanning && (
                <div className="absolute inset-0 z-10 bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in">
                    <Loader2 className="text-agro-600 animate-spin mb-4" size={48} />
                    <p className="text-[10px] font-black text-agro-600 uppercase tracking-[0.4em]">Rescanning Network...</p>
                </div>
            )}
            
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-earth-900 dark:text-white flex items-center gap-2">
                    <TrendingUp size={20} className="text-agro-600" /> {activeCategoryFilter ? activeCategoryFilter : 'Top Stories'}
                </h3>
                {activeCategoryFilter && (
                    <button onClick={() => setActiveCategoryFilter(null)} className="p-1 hover:bg-earth-100 dark:hover:bg-earth-800 rounded-lg text-earth-400"><X size={16} /></button>
                )}
            </div>
            
            <div className="space-y-4 overflow-y-auto flex-1 pr-2 custom-scrollbar">
               {displayedSegments.length > 0 ? displayedSegments.map((segment) => (
                  <div 
                     key={segment.id} 
                     onClick={() => { setActiveSegment(segment); if(isBroadcasting) setVideoProgress(0); }}
                     className={`flex gap-4 p-4 rounded-2xl cursor-pointer transition-all border-2 ${activeSegment.id === segment.id ? 'bg-agro-50 dark:bg-agro-900/20 border-agro-200 dark:border-agro-800 shadow-sm' : 'hover:bg-earth-50 dark:hover:bg-earth-800/50 border-transparent'}`}
                  >
                     <div className="w-24 h-16 rounded-xl overflow-hidden shrink-0 relative shadow-sm">
                        <img src={segment.image} className="w-full h-full object-cover" alt={segment.title} />
                        <div className="absolute bottom-1 right-1 bg-black/80 backdrop-blur-sm text-white text-[8px] font-black px-1.5 py-0.5 rounded-md border border-white/10">
                           {segment.duration}
                        </div>
                     </div>
                     <div className="min-w-0">
                        <span className="text-[9px] font-black text-agro-600 uppercase tracking-widest mb-1 block">{segment.category}</span>
                        <h4 className={`text-xs font-bold leading-tight line-clamp-2 mb-1 transition-colors ${activeSegment.id === segment.id ? 'text-earth-900 dark:text-agro-400' : 'text-earth-700 dark:text-earth-300'}`}>
                           {segment.title}
                        </h4>
                        <span className="text-[10px] text-earth-400 font-bold flex items-center gap-1 uppercase tracking-tighter">
                           <Clock size={10} /> {segment.time}
                        </span>
                     </div>
                  </div>
               )) : (
                   <div className="py-20 text-center opacity-40">
                       <Search size={40} className="mx-auto mb-4" />
                       <p className="text-xs font-bold uppercase tracking-widest">No segments found in this node.</p>
                   </div>
               )}
            </div>
            <button 
                onClick={() => setShowArchive(true)}
                className="w-full mt-6 text-[10px] font-black text-center text-earth-400 hover:text-agro-600 uppercase tracking-[0.2em] py-4 border-t border-earth-100 dark:border-earth-800 transition-all"
            >
               View All Global Reports
            </button>
         </div>
      </div>

      {/* News Ticker */}
      <div className="bg-agro-900 text-white py-4 px-8 rounded-3xl overflow-hidden mb-16 shadow-2xl flex items-center gap-6 border border-agro-800">
         <div className="flex items-center gap-2 font-black text-xs uppercase tracking-[0.2em] text-red-500 shrink-0 border-r border-agro-700 pr-6">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div> BREAKING
         </div>
         <div className="flex-1 overflow-hidden relative h-5">
            <div className="absolute whitespace-nowrap animate-[marquee_25s_linear_infinite] text-sm font-bold text-agro-100 tracking-wide">
               {TICKER_ITEMS.map((item, i) => <span key={i} className="mr-24">{item}</span>)}
            </div>
         </div>
      </div>

      {/* Categories / Sections */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
         {CATEGORIES.map((cat, idx) => (
            <div 
                key={idx} 
                onClick={() => handleCategoryClick(cat.name)}
                className={`bg-white dark:bg-earth-900 p-8 rounded-[2.5rem] border-2 transition-all group cursor-pointer hover:shadow-xl ${activeCategoryFilter === cat.name ? 'border-agro-500 shadow-xl' : 'border-earth-100 dark:border-earth-800 hover:border-agro-200'}`}
            >
               {/* Fixed missing Leaf icon usage */}
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all shadow-inner ${activeCategoryFilter === cat.name ? 'bg-agro-600 text-white' : 'bg-earth-50 dark:bg-earth-800 text-earth-400 group-hover:text-agro-600 group-hover:bg-agro-50'}`}>
                   {idx === 0 ? <Globe size={24} /> : idx === 1 ? <Zap size={24} /> : idx === 2 ? <Leaf size={24} /> : <TrendingUp size={24} />}
               </div>
               <h4 className="font-bold text-xl text-earth-900 dark:text-white mb-3 group-hover:text-agro-700 transition-colors leading-tight">{cat.name}</h4>
               <p className="text-xs text-earth-500 dark:text-earth-400 leading-relaxed font-medium mb-8">{cat.desc}</p>
               <div className="flex justify-between items-center mt-auto pt-6 border-t border-earth-50 dark:border-earth-800">
                  <span className="text-[10px] font-black bg-earth-50 dark:bg-earth-800 text-earth-600 dark:text-earth-400 px-3 py-1.5 rounded-lg uppercase tracking-widest">
                     {NEWS_SEGMENTS.filter(s => s.tags.includes(cat.name)).length} New Records
                  </span>
                  <div className={`p-2 rounded-full transition-all ${activeCategoryFilter === cat.name ? 'bg-agro-600 text-white' : 'bg-earth-50 dark:bg-earth-800 text-earth-300 group-hover:text-agro-600'}`}>
                     <ArrowRight size={18} />
                  </div>
               </div>
            </div>
         ))}
      </div>

      {/* TRANSCRIPT MODAL */}
      {showTranscript && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-earth-950/95 backdrop-blur-xl animate-in fade-in duration-300">
              <div className="bg-white dark:bg-earth-900 w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden border border-white/10 flex flex-col animate-in zoom-in-95 h-[70vh]">
                  <div className="bg-agro-900 p-8 text-white flex justify-between items-center shrink-0 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><FileText size={180} /></div>
                      <div className="relative z-10 flex items-center gap-5">
                          <div className="p-4 bg-white/10 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md">
                             <FileText size={24} className="text-agro-300" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-serif font-bold tracking-tight">Report Transcript</h3>
                            <p className="text-xs text-agro-300 font-black uppercase tracking-[0.3em] mt-1">{activeSegment.title}</p>
                          </div>
                      </div>
                      <button onClick={() => setShowTranscript(false)} className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-all hover:rotate-90">
                          <X size={28} />
                      </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-earth-50/20 dark:bg-earth-950/20">
                      <div className="prose prose-earth dark:prose-invert max-w-none">
                          <div className="whitespace-pre-wrap font-mono text-sm leading-loose text-earth-700 dark:text-earth-300">
                              {activeSegment.transcript || "Establishing downlink to retrieve textual logs..."}
                          </div>
                      </div>
                  </div>

                  <div className="p-8 bg-earth-50 dark:bg-earth-950/50 border-t border-earth-100 dark:border-earth-800 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-3">
                          <CheckCircle2 size={20} className="text-agro-600" />
                          <p className="text-[10px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Verified AI Speech-to-Text Mapping</p>
                      </div>
                      <div className="flex gap-4">
                        <button 
                            onClick={handleCopyTranscript}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${copied ? 'bg-agro-600 text-white' : 'bg-white dark:bg-earth-800 text-earth-600 dark:text-earth-400 border border-earth-200 dark:border-earth-700'}`}
                        >
                            {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy Text</>}
                        </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* FULL ARCHIVE MODAL */}
      {showArchive && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-earth-950/95 backdrop-blur-2xl animate-in fade-in duration-300">
              <div className="bg-white dark:bg-earth-900 w-full max-w-5xl h-[85vh] rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border-4 border-agro-900/10 flex flex-col">
                  <div className="bg-agro-900 p-10 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shrink-0 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Radio size={300} /></div>
                      <div className="relative z-10 flex items-center gap-6">
                          <div className="p-5 bg-white/10 rounded-[2rem] border border-white/20 shadow-2xl backdrop-blur-md">
                              <Globe size={40} className="text-agro-400" />
                          </div>
                          <div>
                              <h3 className="text-4xl font-serif font-bold tracking-tight">Global News Archive</h3>
                              <p className="text-xs text-agro-300 font-black uppercase tracking-[0.4em] mt-2">Verified Satellite Intelligence • 100% Transparency</p>
                          </div>
                      </div>
                      
                      <div className="relative z-10 flex-1 max-w-md w-full">
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-agro-300" size={20} />
                            <input 
                                type="text"
                                value={archiveSearch}
                                onChange={(e) => setArchiveSearch(e.target.value)}
                                placeholder="Search by region, alert type, or year..."
                                className="w-full bg-white/10 border-2 border-white/10 rounded-[2.5rem] pl-14 pr-6 py-4 text-sm text-white placeholder-agro-300/50 focus:outline-none focus:border-agro-400 transition-all shadow-inner"
                            />
                        </div>
                      </div>

                      <button onClick={() => setShowArchive(false)} className="relative z-10 p-3 bg-white/5 hover:bg-white/20 rounded-full transition-all border border-white/10 hover:rotate-90">
                          <X size={28} />
                      </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-earth-50/30 dark:bg-earth-950/20">
                      {archiveResults.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {archiveResults.map((s) => (
                                <div 
                                    key={s.id} 
                                    /* Updated call site to use correctly named handleWatchNow */
                                    onClick={() => handleWatchNow(s)}
                                    className="bg-white dark:bg-earth-800 p-6 rounded-[3rem] border border-earth-100 dark:border-earth-700 hover:shadow-2xl transition-all group flex flex-col hover:-translate-y-1 cursor-pointer"
                                >
                                    <div className="relative aspect-video rounded-[2.2rem] overflow-hidden mb-6 shadow-md">
                                        <img src={s.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={s.title} />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all"></div>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-agro-700 shadow-2xl">
                                                <Play fill="currentColor" size={24} className="ml-1" />
                                            </div>
                                        </div>
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-red-600/90 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                                {s.category}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 text-[9px] font-black text-agro-600 dark:text-agro-400 uppercase tracking-widest mb-3">
                                            <Clock size={12} /> {s.time}
                                        </div>
                                        <h4 className="text-xl font-bold text-earth-900 dark:text-white group-hover:text-agro-700 transition-colors leading-tight mb-3">{s.title}</h4>
                                        <p className="text-xs text-earth-500 dark:text-earth-400 font-medium leading-relaxed line-clamp-2">
                                            {s.desc}
                                        </p>
                                    </div>
                                    
                                    <div className="pt-6 mt-6 border-t border-earth-50 dark:border-earth-700 flex items-center justify-between">
                                        <div className="flex flex-wrap gap-1.5">
                                            {s.tags.slice(0, 2).map(t => (
                                                <span key={t} className="text-[8px] font-black text-earth-400 uppercase tracking-tighter border border-earth-100 px-2 py-0.5 rounded-md">{t}</span>
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-black text-agro-600 uppercase tracking-widest flex items-center gap-1.5">
                                            Switch feed <MousePointer2 size={12} />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                      ) : (
                          <div className="py-32 text-center text-earth-300">
                              <Search size={64} className="mx-auto mb-6 opacity-20" />
                              <p className="text-xl font-serif italic text-earth-400">The historical lens found no results.</p>
                              <button onClick={() => setArchiveSearch('')} className="mt-6 text-agro-600 font-black uppercase text-xs tracking-widest hover:underline">Reset Intelligence Stream</button>
                          </div>
                      )}
                  </div>

                  <div className="p-8 bg-earth-50 dark:bg-earth-950/50 border-t border-earth-100 dark:border-earth-800 flex items-center justify-between px-16 shrink-0">
                    <div className="flex items-center gap-3">
                        <Activity size={20} className="text-agro-600" />
                        <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Integrated m(t) Historical Audit Path Active</p>
                    </div>
                    <div className="flex gap-10">
                        <div className="text-right">
                            <p className="text-[9px] font-black text-earth-300 uppercase tracking-widest mb-1">Archive Total</p>
                            <p className="text-lg font-serif font-bold text-earth-900 dark:text-white">{NEWS_SEGMENTS.length} Records</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-black text-earth-300 uppercase tracking-widest mb-1">Data Depth</p>
                            <p className="text-lg font-serif font-bold text-earth-900 dark:text-white">4.2 TB</p>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};