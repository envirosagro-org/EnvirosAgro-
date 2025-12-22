I encountered an error. It seems like the `default_api` was not correctly defined in the execution context for the previous operation. I will try again to make the change to the `Podcast.tsx` file.I apologize, I am still encountering an error that prevents me from directly modifying the file using the previous method. It seems there's an issue with the tool's internal setup.

However, I can still provide the *corrected code* for `components/Podcast.tsx` with the requested change.

Please find the enhanced code below:

```typescript
import React, { useState, useMemo } from 'react';
// Added missing CheckCircle2 import
import {
  Play, Pause, SkipForward, SkipBack, Clock, Calendar, Mic, Volume2,
  Share2, Download, Search, X, List, Headphones, Sparkles, Filter,
  TrendingUp, PlayCircle, History, ExternalLink, Library, ArrowRight, User,
  FileText, Copy, Check, HeadphonesIcon, CheckCircle2
} from 'lucide-react';

const EPISODES = [
  {
    id: 1,
    title: "The Roots of Indigenous Farming",
    host: "Dr. Amani",
    date: "April 15, 2024",
    duration: "45:20",
    description: "Exploring traditional methods that have sustained communities for centuries. We discuss soil sovereignty, seed saving, and the spiritual connection to the land.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=60",
    tags: ["Indigenous", "SA Thrust"],
    transcript: `[00:00:05] Dr. Amani: Welcome back to the AgroCulture Podcast. Today we are digging deep into the roots of indigenous farming.
[00:00:15] Guest: It's a pleasure to be here. When we talk about heritage, we talk about the future.
[00:01:30] Dr. Amani: Exactly. Many people view traditional methods as outdated, but the data—the m(t) resilience constant—tells a different story.
[00:05:22] Dr. Amani: We've observed that heirloom seeds preserved by local societies often outperform hybrids during irregular rainfall cycles (Dn).
[00:10:45] Guest: That's because these seeds have 'genetic memory' of the local micro-climates. They aren't just biological units; they are cultural archives.
[00:15:30] Dr. Amani: In the SA (Social Agriculture) thrust, we emphasize that the community is the first laboratory...`
  },
  {
    id: 2,
    title: "Soil Health: The Invisible Ecosystem",
    host: "Sarah Jenkins",
    date: "April 08, 2024",
    duration: "32:15",
    description: "A deep dive into the microbial world beneath our feet. How nematodes, fungi, and bacteria work together to feed your crops.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60",
    tags: ["Soil", "EA Thrust"],
    transcript: `[00:00:10] Sarah Jenkins: Today's episode is all about the ground we walk on. It's alive.
[00:01:45] Dr. Soil: If you look through a microscope, a handful of healthy soil has more organisms than people on Earth.
[00:05:20] Sarah Jenkins: Why is this vital for the EA (Environmental Agriculture) thrust?
[00:05:40] Dr. Soil: Because a dead soil structure (low In score) cannot hold moisture. You can have all the rainfall in the world (Dn), but if the soil integrity is zero, the m(t) resilience is zero.
[00:12:00] Sarah Jenkins: Let's talk about mycorrhizal fungi and their role in nutrient exchange...`
  },
  {
    id: 3,
    title: "Market Trends: From Farm to Fork",
    host: "James Mwangi",
    date: "April 01, 2024",
    duration: "28:45",
    description: "Analyzing the latest shifts in global supply chains. Why local value addition is the key to profitability for smallholder farmers.",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&auto=format&fit=crop&q=60",
    tags: ["Market", "IA Thrust"],
    transcript: `[00:00:00] James Mwangi: Efficiency, scale, and value. That's the industrial agricultural (IA) thrust mission.
[00:02:15] James Mwangi: We are seeing a 20% increase in profit for farmers who process their own coffee into dried cherries before sale.
[00:08:40] Analyst: The bottleneck isn't production anymore; it's the logistics of the middle-mile.
[00:15:30] James Mwangi: How do we use the Tokenz™ network to provide instant liquidity to these cooperatives?
[00:22:10] Analyst: By using smart contracts that trigger payments the moment the C(a) coefficient is verified at the hub...`
  },
  {
    id: 4,
    title: "Water Wisdom for Arid Zones",
    host: "Dr. Amani",
    date: "March 25, 2024",
    duration: "51:10",
    description: "Strategies for harvesting every drop. Sand dams, zai pits, and the ancient art of water retention in dryland agriculture.",
    image: "https://images.unsplash.com/photo-1589923158776-0d53f2e030e2?w=800&auto=format&fit=crop&q=60",
    tags: ["Water", "EA Thrust"],
    transcript: `[00:00:30] Dr. Amani: Water is life, especially in semi-arid zones.
[00:05:00] Dr. Amani: We are looking at the 'Zai Pit' technique. It's a traditional method of micro-catchment.
[00:10:45] Engineer: By concentrating water and compost in small pits, we boost the In(val) coefficient by over 40%.
[00:15:20] Dr. Amani: This directly affects the m(t) equation by compensating for low Dn (Rainfall Duration).
[00:25:00] Engineer: Let's discuss the construction of sand dams for seasonal riverbeds...`
  },
  {
    id: 5,
    title: "AI Diagnostics on the Field",
    host: "Eng. Kimani",
    date: "March 18, 2024",
    duration: "39:50",
    description: "How computer vision is helping farmers identify coffee berry disease before it spreads. Real-world application of the TA Thrust.",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&auto=format&fit=crop&q=60",
    tags: ["Tech", "TA Thrust"],
    transcript: `[00:00:15] Eng. Kimani: Technical Agriculture isn't just about big tractors. It's about precision.
[00:05:22] Eng. Kimani: I'm demoing the AI Crop Doctor. You take a photo, and the neural network identifies the fungal strain in milliseconds.
[00:12:45] Farmer: It saved my entire crop last month. I thought it was nutrient deficiency, but the AI flagged it as CBD early.
[00:18:30] Eng. Kimani: That's the power of the TA thrust. Early diagnosis prevents the need for chemical overkill later...`
  },
  {
    id: 6,
    title: "Industrial Scaling for Societies",
    host: "James Mwangi",
    date: "March 11, 2024",
    duration: "42:30",
    description: "Bridging the gap between smallholder groups and global manufacturing plants. Standardizing processing for export quality.",
    image: "https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&auto=format&fit=crop&q=60",
    tags: ["Industrial", "IA Thrust"],
    transcript: `[00:00:05] James Mwangi: Today we talk about the leap from subsistence to industrial maturity.
[00:10:45] James Mwangi: To compete globally, our smallholder societies need standardized processing equipment.
[00:20:15] Guest: We've implemented a modular processing plant in Kiriaini that handles 5 tons a day.
[00:25:30] James Mwangi: This raises the regional C(a) score to industrial-grade levels.
[00:35:45] Guest: The next step is the automated export ledger for full traceability...`
  }
];

export const Podcast: React.FC = () => {
  const [currentEpisode, setCurrentEpisode] = useState(EPISODES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);
  const [showArchive, setShowArchive] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const filteredEpisodes = useMemo(() => {
    return EPISODES.filter(ep =>
      ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const handleSelectEpisode = (ep: typeof EPISODES[0]) => {
    setCurrentEpisode(ep);
    setIsPlaying(true);
    setShowArchive(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyTranscript = () => {
    if (currentEpisode.transcript) {
        navigator.clipboard.writeText(currentEpisode.transcript);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <div className="grid lg:grid-cols-3 gap-12">

        {/* Left Column: Player */}
        <div className="lg:col-span-2">
           <div className="bg-agro-900 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden mb-8 group">
              {/* Background Cover */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <img src={currentEpisode.image} alt="Cover" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[10s]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-agro-950 via-agro-950/40 to-transparent"></div>

              <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
                  <div className="w-64 h-64 rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-white/20 shrink-0 relative">
                      <img src={currentEpisode.image} alt={currentEpisode.title} className="w-full h-full object-cover" />
                      {isPlaying && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 items-end h-8">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-1.5 bg-white/80 rounded-full animate-[pulse_1s_infinite]" style={{animationDelay: `${i*0.2}s`, height: `${30 + Math.random()*70}%`}}></div>
                            ))}
                        </div>
                      )}
                  </div>

                  <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-2 text-agro-300 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                          <div className="w-8 h-px bg-agro-400"></div>
                          <Mic size={14} /> AgroCulture Podcast
                      </div>
                      <h2 className="text-3xl md:text-5xl font-serif font-bold mb-3 leading-tight tracking-tight">{currentEpisode.title}</h2>
                      <p className="text-agro-200 text-lg mb-10 font-medium opacity-80">Hosted by {currentEpisode.host}</p>

                      {/* Controls */}
                      <div className="flex flex-col gap-8">
                          <div className="flex items-center justify-center md:justify-start gap-10">
                              <button className="text-agro-300 hover:text-white transition-all hover:scale-110"><SkipBack size={32} /></button>
                              <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-20 h-20 bg-white text-agro-900 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-xl shadow-white/10 active:scale-95 group/play"
                              >
                                  {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-2" />}
                              </button>
                              <button className="text-agro-300 hover:text-white transition-all hover:scale-110"><SkipForward size={32} /></button>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full max-w-lg">
                              <div className="flex justify-between text-[10px] font-black text-agro-300 uppercase tracking-widest mb-3">
                                  <span className="font-mono">12:45</span>
                                  <span className="font-mono">{currentEpisode.duration}</span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-2 cursor-pointer relative overflow-hidden group/bar">
                                  <div className="bg-agro-400 h-full rounded-full transition-all relative shadow-[0_0_15px_rgba(74,222,128,0.5)]" style={{width: `${progress}%`}}>
                                  </div>
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/bar:animate-progress"></div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
           </div>

           <div className="bg-white dark:bg-earth-900 p-10 rounded-[3rem] shadow-sm border border-earth-100 dark:border-earth-800">
               <div className="flex items-center gap-3 mb-6">
                   <div className="p-3 bg-agro-50 dark:bg-agro-950/30 rounded-2xl text-agro-600">
                       <Headphones size={24} />
                   </div>
                   <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white">Episode Intelligence</h3>
               </div>
               <p className="text-earth-600 dark:text-earth-400 leading-relaxed mb-10 text-lg font-medium">
                   {currentEpisode.description}
               </p>
               <div className="flex flex-wrap gap-3 mb-10">
                   {currentEpisode.tags?.map(t => (
                       <span key={t} className="bg-earth-50 dark:bg-earth-800 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-earth-100 dark:border-earth-800">
                           {t}
                       </span>
                   ))}
               </div>
               <div className="flex flex-wrap gap-4 border-t border-earth-100 dark:border-earth-800 pt-8">
                   <button className="flex items-center gap-3 text-earth-500 hover:text-agro-600 font-black text-[10px] uppercase tracking-widest transition-all">
                       <Share2 size={20} /> Share Session
                   </button>
                   <button className="flex items-center gap-3 text-earth-500 hover:text-agro-600 font-black text-[10px] uppercase tracking-widest transition-all">
                       <Download size={20} /> Offline Access
                   </button>
                   <button
                    onClick={() => setShowTranscript(true)}
                    className="ml-auto flex items-center gap-3 text-agro-600 font-black text-[10px] uppercase tracking-widest group"
                   >
                       View Transcript <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                   </button>
               </div>
           </div>
        </div>

        {/* Right Column: Playlist */}
        <div className="lg:col-span-1">
            <div className="bg-white dark:bg-earth-900 rounded-[2.5rem] shadow-sm border border-earth-100 dark:border-earth-800 overflow-hidden sticky top-24">
                <div className="p-8 border-b border-earth-100 dark:border-earth-800 bg-earth-50 dark:bg-earth-900/50 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-xl text-earth-900 dark:text-white">Audio Stream</h3>
                        <p className="text-[10px] text-earth-400 font-black uppercase tracking-widest mt-1">Network Transmission Active</p>
                    </div>
                    <div className="bg-agro-500 text-white p-2 rounded-xl shadow-lg shadow-agro-500/20">
                        <TrendingUp size={20} />
                    </div>
                </div>
                <div className="divide-y divide-earth-50 dark:divide-earth-800">
                    {EPISODES.slice(0, 4).map((ep) => (
                        <div
                            key={ep.id}
                            onClick={() => handleSelectEpisode(ep)}
                            className={`p-6 hover:bg-agro-50 dark:hover:bg-agro-900/20 cursor-pointer transition-all group ${currentEpisode.id === ep.id ? 'bg-agro-50 dark:bg-agro-900/10' : ''}`}
                        >
                            <div className="flex gap-4">
                                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-md">
                                    <img src={ep.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={ep.title} />
                                    {currentEpisode.id === ep.id && isPlaying && (
                                        <div className="absolute inset-0 bg-agro-900/60 flex items-center justify-center backdrop-blur-[2px]">
                                            <div className="flex gap-1 items-end h-4">
                                                {[1,2,3].map(i => <div key={i} className="w-1 bg-white rounded-full animate-bounce" style={{animationDelay: `${i*0.1}s`}}></div>)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                    <h4 className={`text-sm font-bold mb-2 line-clamp-2 leading-tight transition-colors ${currentEpisode.id === ep.id ? 'text-agro-700 dark:text-agro-400' : 'text-earth-900 dark:text-white group-hover:text-agro-700'}`}>
                                        {ep.title}
                                    </h4>
                                    <div className="flex items-center gap-4 text-[9px] font-black text-earth-400 uppercase tracking-widest">
                                        <span className="flex items-center gap-1"><Clock size={10} /> {ep.duration}</span>
                                        <span className="w-1 h-1 bg-earth-200 dark:bg-earth-800 rounded-full"></span>
                                        <span>{ep.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-8 text-center bg-earth-50/50 dark:bg-earth-900/30">
                    <button
                        onClick={() => setShowArchive(true)}
                        className="w-full bg-white dark:bg-earth-800 border-2 border-earth-100 dark:border-earth-700 text-earth-700 dark:text-earth-300 font-black py-4 rounded-2xl hover:bg-agro-50 dark:hover:bg-agro-900/20 hover:text-agro-700 transition-all text-xs uppercase tracking-widest shadow-sm active:scale-95 flex items-center justify-center gap-3"
                    >
                        <Library size={18} /> View All Episodes
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* TRANSCRIPT MODAL */}
      {showTranscript && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-earth-950/90 backdrop-blur-xl animate-in fade-in duration-300 overflow-hidden">
              <div className="w-full max-w-3xl h-[80vh] bg-white dark:bg-earth-900 rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-earth-100 dark:border-earth-800 flex flex-col">
                  <div className="bg-agro-900 p-10 text-white flex justify-between items-center shrink-0 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><FileText size={180} /></div>
                      <div className="relative z-10 flex items-center gap-5">
                          <div className="p-4 bg-white/10 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md">
                             <FileText size={24} className="text-agro-300" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-serif font-bold tracking-tight">Episode Transcript</h3>
                            <p className="text-xs text-agro-300 font-black uppercase tracking-[0.3em] mt-1">{currentEpisode.title}</p>
                          </div>
                      </div>
                      <button
                        onClick={() => setShowTranscript(false)}
                        className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-all group"
                      >
                          <X size={28} />
                      </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-earth-50/30 dark:bg-earth-950/20">
                      <div className="max-w-2xl mx-auto space-y-8">
                          <div className="prose prose-earth dark:prose-invert max-w-none">
                              <div className="whitespace-pre-wrap font-sans text-earth-700 dark:text-earth-200 leading-relaxed text-lg">
                                  {currentEpisode.transcript || "Transcript for this session is being synthesized by the AI core. Please check back shortly."}
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="p-8 bg-white dark:bg-earth-900 border-t border-earth-100 dark:border-earth-800 flex flex-col sm:flex-row items-center justify-between gap-6 shrink-0">
                      <div className="flex items-center gap-3">
                          <CheckCircle2 size={20} className="text-agro-600" />
                          <p className="text-[10px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.3em]">Verified AI Speech-to-Text Mapping Active</p>
                      </div>
                      <div className="flex gap-4 w-full sm:w-auto">
                          <button
                            onClick={handleCopyTranscript}
                            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${copied ? 'bg-agro-600 text-white shadow-lg' : 'bg-earth-100 dark:bg-earth-800 text-earth-700 dark:text-earth-300 hover:bg-earth-200'}`}
                          >
                              {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy Text</>}
                          </button>
                          <button
                            onClick={() => alert("Simulation: Full transcript PDF generated for offline review.")}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-agro-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-agro-800 transition-all shadow-xl shadow-agro-900/20 active:scale-95"
                          >
                              <Download size={16} /> Export PDF
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* REPOSITORY ARCHIVE MODAL */}
      {showArchive && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-earth-950/95 backdrop-blur-2xl animate-in fade-in duration-500 overflow-hidden">
              <div className="w-full max-w-5xl h-[85vh] bg-white dark:bg-earth-900 rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border-4 border-agro-900/10 flex flex-col">
                  {/* Modal Header */}
                  <div className="bg-agro-900 p-10 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shrink-0 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Mic size={300} /></div>
                      <div className="relative z-10 flex items-center gap-6">
                          <div className="p-5 bg-white/10 rounded-[2rem] border border-white/20 shadow-2xl backdrop-blur-md">
                              <History size={40} className="text-agro-300" />
                          </div>
                          <div>
                              <h3 className="text-4xl font-serif font-bold tracking-tight">AgroCulture Archive</h3>
                              <p className="text-xs text-agro-300 font-black uppercase tracking-[0.4em] mt-2">Verified Oral Intelligence • Data Sovereignty Enabled</p>
                          </div>
                      </div>

                      <div className="relative z-10 flex-1 max-w-md w-full">
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-agro-300" size={20} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by topic, host, or era..."
                                className="w-full bg-white/10 border-2 border-white/10 rounded-[2rem] pl-14 pr-6 py-4 text-sm text-white placeholder-agro-300/50 focus:outline-none focus:border-agro-400 transition-all"
                            />
                        </div>
                      </div>

                      <button
                        onClick={() => setShowArchive(false)}
                        className="relative z-10 p-3 bg-white/5 hover:bg-white/20 rounded-full transition-all border border-white/10 hover:rotate-90"
                      >
                          <X size={28} />
                      </button>
                  </div>

                  {/* Modal Body */}
                  <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] dark:bg-none">
                      {filteredEpisodes.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredEpisodes.map((ep) => (
                                <div
                                    key={ep.id}
                                    onClick={() => handleSelectEpisode(ep)}
                                    className="bg-white dark:bg-earth-800 p-6 rounded-[3rem] border border-earth-100 dark:border-earth-700 hover:shadow-2xl transition-all group flex flex-col hover:-translate-y-1 cursor-pointer"
                                >
                                    <div className="relative h-48 rounded-[2rem] overflow-hidden mb-6 shadow-lg">
                                        <img src={ep.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={ep.title} />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-agro-700 shadow-2xl">
                                                <Play fill="currentColor" size={24} className="ml-1" />
                                            </div>
                                        </div>
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-agro-600/90 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                                {ep.tags[0]}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-[9px] font-black px-3 py-1 rounded-lg border border-white/10 uppercase tracking-widest">
                                            {ep.duration}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 text-[9px] font-black text-agro-600 uppercase tracking-[0.2em] mb-3">
                                            <Calendar size={12} /> {ep.date}
                                        </div>
                                        <h4 className="text-xl font-bold text-earth-900 dark:text-white group-hover:text-agro-700 transition-colors leading-tight mb-3">{ep.title}</h4>
                                        <p className="text-xs text-earth-500 dark:text-earth-400 font-medium leading-relaxed line-clamp-2 mb-6">
                                            {ep.description}
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t border-earth-50 dark:border-earth-700 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-earth-50 dark:bg-earth-900 flex items-center justify-center text-earth-400 group-hover:text-agro-600">
                                                <User size={16} />
                                            </div>
                                            <span className="text-[10px] font-bold text-earth-600 dark:text-earth-300 uppercase tracking-wider">{ep.host}</span>
                                        </div>
                                        <button className="text-earth-300 group-hover:text-agro-600 transition-colors">
                                            <ExternalLink size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                      ) : (
                          <div className="py-32 text-center text-earth-300">
                              <Search size={64} className="mx-auto mb-6 opacity-20" />
                              <p className="text-xl font-serif italic text-earth-400">The echoes are distant. No episodes match your criteria.</p>
                              <button onClick={() => setSearchQuery('')} className="mt-6 text-agro-600 font-black uppercase text-xs tracking-widest hover:underline">Reset Data Stream</button>
                          </div>
                      )}
                  </div>

                  {/* Modal Footer */}
                  <div className="p-8 bg-earth-50 dark:bg-earth-950/50 border-t border-earth-100 dark:border-earth-800 flex items-center justify-between px-16 shrink-0">
                    <div className="flex items-center gap-3">
                        <Sparkles size={20} className="text-agro-600" />
                        <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Integrated m(t) Cultural Sync Protocol Active</p>
                    </div>
                    <div className="flex gap-10">
                        <div className="text-right">
                            <p className="text-[9px] font-black text-earth-300 uppercase tracking-widest mb-1">Archive Total</p>
                            <p className="text-lg font-serif font-bold text-earth-900 dark:text-white">{EPISODES.length} Records</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-black text-earth-300 uppercase tracking-widest mb-1">Listening Time</p>
                            <p className="text-lg font-serif font-bold text-earth-900 dark:text-white">4.2 Hours</p>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
      )}

      {/* Feature Recommendation Section */}
      <div className="mt-24 p-12 bg-agro-50 dark:bg-agro-900/10 rounded-[3.5rem] border-2 border-dashed border-agro-200 dark:border-agro-800 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 transform rotate-12 group-hover:rotate-45 transition-transform duration-1000">
              <HeadphonesIcon size={200} />
          </div>
          <div className="w-24 h-24 bg-white dark:bg-earth-900 rounded-[2rem] flex items-center justify-center text-agro-600 shadow-xl border border-agro-100 dark:border-agro-800 shrink-0">
              <Sparkles size={40} className="animate-pulse" />
          </div>
          <div className="flex-1 relative z-10 text-center md:text-left">
              <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white mb-2">Curated for Your Region</h3>
              <p className="text-earth-600 dark:text-earth-400 leading-relaxed font-medium">
                  Our AI models analyze global environmental data to recommend content that strengthens your regional ecological resilience.
              </p>
          </div>
          <button
            onClick={() => setShowArchive(true)}
            className="bg-agro-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-agro-900/20 transition-all hover:scale-105 active:scale-95"
          >
              Global Discovery
          </button>
      </div>
    </div>
  );
};
```