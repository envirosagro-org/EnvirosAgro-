import React, { useState, useEffect, useMemo } from 'react';
import { 
  Play, Clock, Info, Share2, Award, Heart, Leaf, Mountain, Droplets, 
  ArrowRight, X, Pause, Maximize, Volume2, Settings, Wifi, Activity, 
  User, Users, Calendar, Globe, Star, Zap, Search, Filter, Film, 
  ChevronRight, PlayCircle, Loader2 
} from 'lucide-react';

const FEATURED_FILM = {
  id: 1,
  title: "Roots of Resilience: The Great Green Wall",
  category: "Restoration",
  duration: "1h 24m",
  year: "2023",
  director: "Amani K.",
  image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=80",
  description: "A cinematic journey across the Sahel, following the ambitious African-led initiative to grow an 8,000km natural wonder of the world to combat desertification.",
  synopsis: "The Great Green Wall is an epic ambition to grow an 8,000km natural wonder of the world across the entire width of Africa. Its goal is to provide food, jobs and a future for the millions of people who live in a region on the frontline of climate change. This documentary follows the pioneers working on the ground to transform the Sahel into a green haven, proving that humanity can indeed heal the Earth.",
  impact: "15% Canopy Increase",
  crew: [
    { role: "Director", name: "Amani K." },
    { role: "Cinematography", name: "Liam Sterling" },
    { role: "Scientific Lead", name: "Dr. Elena Rossi" }
  ],
  awards: ["Green Film Award 2023", "Critics Choice: Impact"]
};

const DOCS_LIBRARY = [
  {
    id: 2,
    title: "Guardians of the Soil",
    category: "Regenerative Ag",
    duration: "45m",
    year: "2024",
    image: "https://images.unsplash.com/photo-1625246333195-551e51245128?w=800&auto=format&fit=crop&q=60",
    impact: "1.2k Farmers Trained",
    description: "The story of four farmers transitioning to regenerative practices.",
    synopsis: "Soil is not dirt; it is a living organism. 'Guardians of the Soil' dives into the microbial universe beneath our feet. Through the lens of four farmers in different continents, we witness the struggle and triumph of letting go of chemical dependency to embrace the natural intelligence of the earth. This film serves as a practical and emotional guide to the regenerative revolution.",
    crew: [{ role: "Director", name: "Marcus Thorne" }],
    awards: ["Best Feature Doc - AgroFilm Fest"]
  },
  {
    id: 3,
    title: "Beneath the Canopy",
    category: "Biodiversity",
    duration: "52m",
    year: "2022",
    image: "https://images.unsplash.com/photo-1448375240586-dfd8f37933ff?w=800&auto=format&fit=crop&q=60",
    impact: "500 Acres Protected",
    description: "Exploring the symbiotic relationships in tropical agroforestry.",
    synopsis: "In the heart of the rainforest, agriculture and nature aren't at odds—they are partners. 'Beneath the Canopy' explores the intricate web of life in shade-grown coffee and cocoa plantations. From the insects that pollinate to the birds that manage pests, discover why preserving the canopy is the ultimate insurance for our food systems.",
    crew: [{ role: "Director", name: "Sarah Jenkins" }],
    awards: ["Earth Day Selection 2022"]
  },
  {
    id: 4,
    title: "Water Wars & Peace",
    category: "Conservation",
    duration: "1h 10m",
    year: "2023",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&auto=format&fit=crop&q=80",
    impact: "Policy Change Enacted",
    description: "How communities are redefining water rights through conservation.",
    synopsis: "As rivers dry up and glaciers melt, water has become the most valuable commodity on Earth. This film investigates the innovative community-led management systems that are preventing conflict and ensuring water security in the most arid regions of the globe. A story of diplomacy, engineering, and shared survival.",
    crew: [{ role: "Director", name: "James Mwangi" }],
    awards: ["Sundance Impact Nominee"]
  },
  {
    id: 5,
    title: "The Urban Harvest",
    category: "Food Security",
    duration: "38m",
    year: "2024",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=80",
    impact: "50 Community Gardens",
    description: "The rise of vertical and rooftop farming in modern megacities.",
    synopsis: "By 2050, 70% of the world will live in cities. 'The Urban Harvest' explores the technological and social movement to grow food where it is consumed. From high-tech aeroponics to community-managed rooftops, witness how concrete jungles are becoming the breadbaskets of the future.",
    crew: [{ role: "Director", name: "Lisa Chen" }],
    awards: ["Urban Future Award 2024"]
  }
];

const CATEGORIES = ["All", "Restoration", "Regenerative Ag", "Biodiversity", "Conservation", "Food Security"];

export const GreenLens: React.FC = () => {
  const [activeFilm, setActiveFilm] = useState(FEATURED_FILM);
  const [isWatching, setIsWatching] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsFilm, setDetailsFilm] = useState<typeof FEATURED_FILM | null>(null);
  
  // Catalog State
  const [showFullCatalog, setShowFullCatalog] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCatalog = useMemo(() => {
    return [FEATURED_FILM, ...DOCS_LIBRARY].filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(catalogSearch.toLowerCase()) || 
                            doc.description.toLowerCase().includes(catalogSearch.toLowerCase());
      const matchesCategory = activeCategory === 'All' || doc.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [catalogSearch, activeCategory]);

  useEffect(() => {
    let interval: any;
    if (isWatching && !isPaused) {
      interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 100 : prev + 0.05));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isWatching, isPaused]);

  const handleWatchNow = (film?: any) => {
    if (film) setActiveFilm(film);
    setIsWatching(true);
    setProgress(0);
    setIsPaused(false);
    setShowDetailsModal(false);
    setShowFullCatalog(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDetails = (film: any) => {
    setDetailsFilm(film);
    setShowDetailsModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
           <div className="flex items-center gap-2 text-green-700 font-bold uppercase tracking-wider text-xs mb-2">
              <Leaf size={16} /> Green Lens Documentaries
           </div>
           <h2 className="text-3xl font-serif font-bold text-agro-900 dark:text-white transition-colors">Cinema for the Planet</h2>
        </div>
        <div className="flex gap-2">
           <span className="px-4 py-2 bg-earth-100 dark:bg-earth-900 rounded-full text-xs font-bold text-earth-600 dark:text-earth-400">Originals</span>
           <span className="px-4 py-2 bg-earth-100 dark:bg-earth-900 rounded-full text-xs font-bold text-earth-600 dark:text-earth-400">Series</span>
        </div>
      </div>

      {/* Hero Player Section */}
      <div className="relative rounded-[3rem] overflow-hidden shadow-2xl mb-16 aspect-[21/9] group bg-black border border-earth-100 dark:border-earth-800">
         {isWatching ? (
            <div className="absolute inset-0 flex flex-col bg-slate-950">
                <img 
                    src={activeFilm.image} 
                    className={`w-full h-full object-cover transition-all duration-1000 ${isPaused ? 'opacity-30 blur-md scale-110' : 'opacity-60'}`} 
                    alt="Cinema Feed" 
                />
                
                {/* HUD Overlays */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                    <div className="flex justify-between items-start">
                        <div className="bg-green-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg border border-green-500/50">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> CINEMATIC STREAM
                        </div>
                        <button 
                            onClick={() => setIsWatching(false)}
                            className="bg-black/40 hover:bg-white/10 backdrop-blur-md text-white p-2 rounded-full border border-white/10 transition-all pointer-events-auto"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        {isPaused && (
                            <button 
                                onClick={() => setIsPaused(false)}
                                className="pointer-events-auto w-24 h-24 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20 flex items-center justify-center text-white hover:scale-110 transition-all shadow-2xl animate-in zoom-in"
                            >
                                <Play size={40} fill="currentColor" className="ml-2" />
                            </button>
                        )}
                    </div>

                    {/* Bottom Controls */}
                    <div className="w-full max-w-4xl mx-auto bg-black/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10 pointer-events-auto shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-6">
                                <button onClick={() => setIsPaused(!isPaused)} className="text-white hover:text-green-400 transition-colors">
                                    {isPaused ? <Play size={24} fill="currentColor" /> : <Pause size={24} fill="currentColor" />}
                                </button>
                                <div>
                                    <h4 className="text-sm font-bold text-white leading-none">{activeFilm.title}</h4>
                                    <p className="text-[10px] text-green-400 font-black uppercase tracking-widest mt-1">HD • {activeFilm.category} Documentary</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Volume2 size={20} className="text-slate-400 hover:text-white transition-colors cursor-pointer" />
                                <Settings size={20} className="text-slate-400 hover:text-white transition-colors cursor-pointer" />
                                <Maximize size={20} className="text-slate-400 hover:text-white transition-colors cursor-pointer" />
                            </div>
                        </div>
                        
                        <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden group/seek cursor-pointer">
                            <div 
                                className="h-full bg-green-500 relative transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute right-0 top-0 h-full w-2 bg-white shadow-[0_0_20px_#22c55e] opacity-0 group-hover/seek:opacity-100"></div>
                            </div>
                        </div>
                        
                        <div className="flex justify-between mt-3 text-[10px] font-mono text-slate-500">
                            <span>{Math.floor(progress * 0.84)}:{(Math.floor(progress * 60) % 60).toString().padStart(2, '0')}</span>
                            <span>{activeFilm.duration}</span>
                        </div>
                    </div>
                </div>
            </div>
         ) : (
            <>
                <img 
                    src={activeFilm.image} 
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[2s]"
                    alt={activeFilm.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
                    <div className="flex items-center gap-4 mb-4 text-sm font-medium text-green-300">
                    <span className="bg-green-900/80 px-3 py-1 rounded border border-green-700">{activeFilm.category}</span>
                    <span>{activeFilm.year}</span>
                    <span>{activeFilm.duration}</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl leading-tight tracking-tight">{activeFilm.title}</h1>
                    <p className="text-gray-300 text-lg mb-8 max-w-2xl line-clamp-2 md:line-clamp-none leading-relaxed">
                    {activeFilm.description || "A powerful story of nature's resilience and the human spirit."}
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                    <button 
                        onClick={() => handleWatchNow()}
                        className="bg-green-600 hover:bg-green-500 text-white px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest flex items-center gap-3 transition-all shadow-xl shadow-green-900/50 hover:scale-105 active:scale-95"
                    >
                        <Play fill="currentColor" size={20} /> Watch Now
                    </button>
                    <button 
                        onClick={() => handleOpenDetails(activeFilm)}
                        className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all border border-white/20 backdrop-blur-md"
                    >
                        <Info size={20} /> Documentary Details
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full font-bold transition-all border border-white/20 backdrop-blur-md">
                        <Heart size={20} />
                    </button>
                    </div>
                </div>
            </>
         )}
      </div>

      {/* Impact Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
         {[
            { label: "Trees Planted", value: "1.5M", icon: <TreeIcon /> },
            { label: "Water Restored", value: "500GL", icon: <Droplets /> },
            { label: "Species Tracked", value: "240+", icon: <Leaf /> },
            { label: "Communities", value: "85", icon: <Mountain /> }
         ].map((stat, idx) => (
            <div key={idx} className="bg-green-50 dark:bg-green-900/20 p-6 rounded-[2rem] border border-green-100 dark:border-green-800 flex items-center gap-4 group hover:shadow-lg transition-all">
               <div className="bg-white dark:bg-earth-800 p-3 rounded-2xl text-green-700 shadow-sm group-hover:scale-110 transition-transform">
                  {stat.icon}
               </div>
               <div>
                  <div className="text-2xl font-bold text-green-900 dark:text-green-100">{stat.value}</div>
                  <div className="text-xs text-green-700 dark:text-green-400 font-bold uppercase tracking-wider">{stat.label}</div>
               </div>
            </div>
         ))}
      </div>

      {/* Library Grid */}
      <div className="flex items-center justify-between mb-8">
         <h3 className="text-2xl font-bold text-earth-900 dark:text-white">Now Streaming</h3>
         <button 
            onClick={() => setShowFullCatalog(true)}
            className="text-green-700 dark:text-green-400 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
         >
            View Full Catalog <ArrowRight size={18} />
         </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
         {DOCS_LIBRARY.map((doc) => (
            <div 
                key={doc.id} 
                onClick={() => handleOpenDetails(doc)}
                className="group cursor-pointer flex flex-col h-full"
            >
               <div className="relative rounded-[2rem] overflow-hidden mb-4 aspect-[3/4] border border-earth-100 dark:border-earth-800 shadow-sm">
                  <img src={doc.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={doc.title} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-6 text-center">
                     <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-xl border border-white/20">
                        <Play size={32} fill="currentColor" />
                     </div>
                     <p className="font-bold text-sm mb-1">{doc.impact}</p>
                     <p className="text-[10px] text-gray-300 uppercase tracking-widest font-black">Verified Impact</p>
                  </div>

                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest border border-white/10">
                     {doc.duration}
                  </div>
               </div>
               
               <h4 className="font-bold text-lg text-earth-900 dark:text-white mb-2 group-hover:text-green-700 transition-colors leading-tight">{doc.title}</h4>
               <div className="flex items-center gap-2 text-xs text-earth-50 dark:text-earth-400 font-medium">
                  <span>{doc.category}</span>
                  <span className="w-1 h-1 bg-earth-300 dark:bg-earth-700 rounded-full"></span>
                  <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-bold uppercase text-[10px] tracking-tighter"><Award size={14} /> Impact Film</span>
               </div>
            </div>
         ))}
      </div>

      {/* FULL CATALOG MODAL */}
      {showFullCatalog && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-earth-950/95 backdrop-blur-2xl animate-in fade-in duration-300">
              <div className="bg-white dark:bg-earth-900 w-full max-w-6xl h-[85vh] rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-white/10 flex flex-col">
                  {/* Catalog Header */}
                  <div className="bg-green-900 p-10 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shrink-0 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Film size={300} /></div>
                      <div className="relative z-10 flex items-center gap-6">
                          <div className="p-5 bg-white/10 rounded-[2rem] border border-white/20 shadow-2xl backdrop-blur-md text-green-400">
                              <PlayCircle size={40} />
                          </div>
                          <div>
                              <h3 className="text-4xl font-serif font-bold tracking-tight">GreenLens Catalog</h3>
                              <p className="text-xs text-green-300 font-black uppercase tracking-[0.4em] mt-2">Verified Cinematic Assets • 4K HDR Optimized</p>
                          </div>
                      </div>
                      
                      <div className="relative z-10 flex-1 max-w-md w-full">
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-green-300" size={20} />
                            <input 
                                type="text"
                                value={catalogSearch}
                                onChange={(e) => setCatalogSearch(e.target.value)}
                                placeholder="Search by title, theme, or region..."
                                className="w-full bg-white/10 border-2 border-white/10 rounded-[2.5rem] pl-14 pr-6 py-4 text-sm text-white placeholder-green-300/50 focus:outline-none focus:border-green-400 transition-all shadow-inner"
                            />
                        </div>
                      </div>

                      <button onClick={() => setShowFullCatalog(false)} className="relative z-10 p-3 bg-white/5 hover:bg-white/20 rounded-full transition-all border border-white/10 hover:rotate-90">
                          <X size={28} />
                      </button>
                  </div>

                  {/* Catalog Navigation */}
                  <div className="px-10 py-6 border-b border-earth-100 dark:border-earth-800 bg-earth-50 dark:bg-earth-900/50 flex gap-4 overflow-x-auto no-scrollbar">
                      {CATEGORIES.map(cat => (
                          <button 
                            key={cat} 
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-green-600 text-white shadow-lg' : 'bg-white dark:bg-earth-800 text-earth-500 border border-earth-100 dark:border-earth-700 hover:bg-earth-50'}`}
                          >
                              {cat}
                          </button>
                      ))}
                  </div>

                  {/* Catalog Grid */}
                  <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-white dark:bg-earth-900">
                      {filteredCatalog.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {filteredCatalog.map((s) => (
                                <div 
                                    key={s.id} 
                                    onClick={() => handleOpenDetails(s)}
                                    className="bg-white dark:bg-earth-800 p-4 rounded-[2.5rem] border border-earth-100 dark:border-earth-700 hover:shadow-2xl transition-all group flex flex-col hover:-translate-y-1 cursor-pointer"
                                >
                                    <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 shadow-md">
                                        <img src={s.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={s.title} />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all"></div>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-green-700 shadow-2xl">
                                                <Play fill="currentColor" size={24} className="ml-1" />
                                            </div>
                                        </div>
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-green-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                                {s.category}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-[8px] font-black px-3 py-1 rounded-lg border border-white/10 uppercase tracking-widest">
                                            {s.duration}
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1 px-2">
                                        <div className="flex items-center gap-3 text-[9px] font-black text-green-600 dark:text-green-400 uppercase tracking-widest mb-2">
                                            <Star size={10} fill="currentColor" /> Premium Original
                                        </div>
                                        <h4 className="text-lg font-bold text-earth-900 dark:text-white group-hover:text-green-700 transition-colors leading-tight mb-3 line-clamp-2">{s.title}</h4>
                                        <p className="text-xs text-earth-500 dark:text-earth-400 font-medium leading-relaxed line-clamp-2">
                                            {s.description}
                                        </p>
                                    </div>
                                    
                                    <div className="pt-4 mt-4 border-t border-earth-50 dark:border-earth-700 flex items-center justify-between px-2">
                                        <span className="text-[10px] font-black text-earth-400 uppercase tracking-widest">{s.year}</span>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handleWatchNow(s); }}
                                            className="text-[10px] font-black text-green-600 uppercase tracking-widest flex items-center gap-1.5 group-hover:gap-3 transition-all"
                                        >
                                            Watch Now <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                      ) : (
                          <div className="py-32 text-center text-earth-300">
                              <Film size={64} className="mx-auto mb-6 opacity-20" />
                              <p className="text-xl font-serif italic text-earth-400">The vault is quiet. No documentaries match your search.</p>
                              <button onClick={() => { setCatalogSearch(''); setActiveCategory('All'); }} className="mt-6 text-green-600 font-black uppercase text-xs tracking-widest hover:underline">Reset Catalog View</button>
                          </div>
                      )}
                  </div>

                  {/* Catalog Footer */}
                  <div className="p-8 bg-earth-50 dark:bg-earth-950/50 border-t border-earth-100 dark:border-earth-800 flex items-center justify-between px-16 shrink-0">
                    <div className="flex items-center gap-3">
                        <Activity size={20} className="text-green-600" />
                        <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Integrated m(t) Cultural Sync Protocol Active</p>
                    </div>
                    <div className="flex gap-10">
                        <div className="text-right">
                            <p className="text-[9px] font-black text-earth-300 uppercase tracking-widest mb-1">Catalog Size</p>
                            <p className="text-lg font-serif font-bold text-earth-900 dark:text-white">12.5 TB</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-black text-earth-300 uppercase tracking-widest mb-1">Available Titles</p>
                            <p className="text-lg font-serif font-bold text-earth-900 dark:text-white">42 Films</p>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
      )}

      {/* DOCUMENTARY DETAILS MODAL */}
      {showDetailsModal && detailsFilm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-earth-950/90 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto" onClick={() => setShowDetailsModal(false)}>
              <div 
                  className="bg-white dark:bg-earth-900 w-full max-w-4xl rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10 flex flex-col my-8"
                  onClick={(e) => e.stopPropagation()}
              >
                  {/* Modal Header/Cover */}
                  <div className="relative h-96 shrink-0">
                      <img src={detailsFilm.image} className="w-full h-full object-cover" alt={detailsFilm.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-earth-900 dark:from-earth-950 via-earth-900/40 to-transparent"></div>
                      <button 
                          onClick={() => setShowDetailsModal(false)}
                          className="absolute top-8 right-8 bg-black/40 hover:bg-white/10 backdrop-blur-md text-white p-3 rounded-full border border-white/10 transition-all hover:rotate-90 active:scale-90"
                      >
                          <X size={28} />
                      </button>
                      <div className="absolute bottom-10 left-10 text-white">
                          <div className="flex items-center gap-3 mb-4">
                              <span className="bg-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{detailsFilm.category}</span>
                              <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-earth-300"><Clock size={12} /> {detailsFilm.duration}</span>
                              <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-earth-300"><Calendar size={12} /> {detailsFilm.year}</span>
                          </div>
                          <h3 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">{detailsFilm.title}</h3>
                      </div>
                  </div>

                  <div className="p-10 md:p-14">
                      <div className="grid lg:grid-cols-3 gap-12">
                          <div className="lg:col-span-2 space-y-10">
                              <section>
                                  <h4 className="text-xs font-black text-green-600 uppercase tracking-[0.3em] mb-4">Synopsis</h4>
                                  <p className="text-lg text-earth-700 dark:text-earth-300 leading-relaxed font-medium">
                                      {detailsFilm.synopsis || detailsFilm.description}
                                  </p>
                              </section>

                              <section>
                                  <h4 className="text-xs font-black text-green-600 uppercase tracking-[0.3em] mb-6">Production Credits</h4>
                                  <div className="grid grid-cols-2 gap-8">
                                      {(detailsFilm.crew || [{role: "Director", name: detailsFilm.director || "Unknown"}]).map((member, i) => (
                                          <div key={i} className="flex items-center gap-4">
                                              <div className="w-10 h-10 bg-earth-50 dark:bg-earth-800 rounded-xl flex items-center justify-center text-earth-400">
                                                  <User size={20} />
                                              </div>
                                              <div>
                                                  <p className="text-[10px] font-black text-earth-400 uppercase tracking-widest">{member.role}</p>
                                                  <p className="font-bold text-earth-900 dark:text-white">{member.name}</p>
                                              </div>
                                          </div>
                                      ))}
                                  </div>
                              </section>
                          </div>

                          <div className="space-y-8">
                              <div className="bg-earth-50 dark:bg-earth-800/50 p-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-700">
                                  <h4 className="text-[10px] font-black text-earth-400 uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
                                      <Zap size={14} className="text-amber-500" /> Impact Metrics
                                  </h4>
                                  <div className="space-y-6">
                                      <div className="flex items-center gap-4">
                                          <div className="p-3 bg-white dark:bg-earth-900 rounded-xl shadow-sm text-green-600">
                                              <Leaf size={18} />
                                          </div>
                                          <div>
                                              <p className="text-[10px] font-black text-earth-400 uppercase tracking-widest leading-none mb-1">Environmental Impact</p>
                                              <p className="font-bold text-earth-900 dark:text-white">{detailsFilm.impact}</p>
                                          </div>
                                      </div>
                                      <div className="flex items-center gap-4">
                                          <div className="p-3 bg-white dark:bg-earth-900 rounded-xl shadow-sm text-blue-600">
                                              <Globe size={18} />
                                          </div>
                                          <div>
                                              <p className="text-[10px] font-black text-earth-400 uppercase tracking-widest leading-none mb-1">Certification</p>
                                              <p className="font-bold text-earth-900 dark:text-white">Gold Standard</p>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              {(detailsFilm.awards && detailsFilm.awards.length > 0) && (
                                  <div className="bg-agro-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
                                      <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 transition-transform group-hover:rotate-45 duration-1000">
                                          <Award size={100} />
                                      </div>
                                      <h4 className="text-[10px] font-black text-agro-400 uppercase tracking-[0.4em] mb-6 relative z-10">Recognition</h4>
                                      <ul className="space-y-3 relative z-10">
                                          {detailsFilm.awards.map((award, i) => (
                                              <li key={i} className="flex items-center gap-3 text-xs font-bold text-agro-100">
                                                  <Star size={14} className="text-amber-400" fill="currentColor" /> {award}
                                              </li>
                                          ))}
                                      </ul>
                                  </div>
                              )}

                              <button 
                                  onClick={() => handleWatchNow(detailsFilm)}
                                  className="w-full nature-gradient text-white py-5 rounded-3xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-agro-900/20 hover:scale-[1.01] active:scale-95 transition-all"
                              >
                                  <Play size={20} fill="currentColor" /> Watch Now
                              </button>
                          </div>
                      </div>
                  </div>

                  <div className="p-8 bg-earth-50 dark:bg-earth-950/50 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-center gap-3 shrink-0">
                      <Share2 size={18} className="text-green-600" />
                      <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Share this impact story with your network</p>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

// Helper Icon
function TreeIcon() {
   return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19v-9"/><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-2.222-2.222-3-3 2-1 2.222-2.222 3-3 .5-1 1-2 2-3 2 1 2.222 2.222 3 3 .778.778-.072.857-1 3-.5 1-1 1.62-1 3a2.5 2.5 0 0 0 2.5 2.5z"/><path d="M12 22h.01"/></svg>
}