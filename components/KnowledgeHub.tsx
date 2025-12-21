import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Calendar, Globe, FileText, Search, X, Share2, 
  Download, Layers, BookOpen, Filter, TrendingUp,
  Sparkles, ChevronRight, Bookmark, ArrowRight, ShieldCheck, Microscope,
  ArrowLeft, Printer, Quote, CheckCircle2, ChevronLeft, Loader2,
  Zap, Mail, Brain, Database, Fingerprint, Activity, Server, Terminal, RefreshCcw,
  ArrowUpRight, ArrowUp, ChevronDown, ListFilter, Info, Clock,
  History, Settings2, BarChart3, ShieldAlert, GraduationCap, Award, PlayCircle,
  User,
  Heart
} from 'lucide-react';
import { DATASETS } from './data';
import { View } from '../types';
import { summarizeResearch, generateRawDataset } from '../services/gemini';
import { SafeImage } from './SafeImage';

interface LearningModule {
    id: string;
    version: string;
    title: string;
    excerpt: string;
    instructor: string;
    date: string;
    category: string;
    image: string;
    thrust: string;
    thrustName: string;
    type: string;
    region: string;
    domain: string;
    complexity: 'Beginner' | 'Intermediate' | 'Expert';
    duration: string;
    fullContent?: string;
}

interface KnowledgeHubProps {
    onNavigate?: (view: View) => void;
    initialSearch?: string;
}

const ITEMS_PER_PAGE = 10;

export const KnowledgeHub: React.FC<KnowledgeHubProps> = ({ onNavigate, initialSearch = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialSearch);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [readingId, setReadingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [showAiModal, setShowAiModal] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchTerm(initialSearch);
    setDebouncedSearchTerm(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    if (searchTerm !== debouncedSearchTerm) setIsDebouncing(true);
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsDebouncing(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, debouncedSearchTerm]);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const learningModules: LearningModule[] = useMemo(() => {
    return DATASETS.slice(0, 50).map((d, i) => ({
        id: d.id,
        version: d.version || '1.0.0',
        title: d.name,
        excerpt: d.content?.split('\n').find(l => l.length > 30)?.substring(0, 140) + '...' || "Comprehensive sustainable development curriculum.",
        instructor: i % 2 === 0 ? "Dr. Elena Rossi" : "Lead Scientific Advisor",
        date: d.date,
        category: d.thrust === 'SA' ? 'Social' : d.thrust === 'EA' ? 'Environment' : d.thrust === 'HA' ? 'Health' : d.thrust === 'TA' ? 'Technical' : 'Industrial',
        image: `https://picsum.photos/800/600?random=${d.id.split('-').pop()}`,
        thrust: d.thrust,
        thrustName: d.thrust,
        type: d.type,
        region: d.region,
        domain: d.domain,
        complexity: i % 3 === 0 ? 'Beginner' : i % 3 === 1 ? 'Intermediate' : 'Expert',
        duration: `${Math.floor(Math.random() * 5 + 2)} Weeks`,
        fullContent: d.content
    }));
  }, []);

  const displayedModules = useMemo(() => {
    return learningModules.filter(m => {
        const term = debouncedSearchTerm.toLowerCase();
        const matchesSearch = (
            m.title.toLowerCase().includes(term) ||
            m.excerpt.toLowerCase().includes(term) ||
            m.domain.toLowerCase().includes(term)
        );
        const matchesCat = activeCategory === 'All' || m.category === activeCategory;
        return matchesSearch && matchesCat;
    });
  }, [learningModules, debouncedSearchTerm, activeCategory]);

  const totalPages = Math.ceil(displayedModules.length / ITEMS_PER_PAGE);
  const currentItems = displayedModules.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleGenerateSummary = async () => {
    setIsSummarizing(true);
    setShowAiModal(true);
    try {
        const result = await summarizeResearch(displayedModules.slice(0, 5));
        setAiSummary(result);
    } catch (err) {
        setAiSummary("Intelligence synthesis failed. Re-establishing link...");
    } finally {
        setIsSummarizing(false);
    }
  };

  const activeModule = useMemo(() => 
    learningModules.find(m => m.id === readingId), 
    [readingId, learningModules]
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    scrollToTop();
  };

  if (readingId && activeModule) {
    return (
      <div className="max-w-[1600px] mx-auto px-6 py-4 animate-in fade-in duration-500 h-[calc(100vh-140px)] flex flex-col">
          <div className="flex justify-between items-center mb-6 shrink-0">
              <button onClick={() => setReadingId(null)} className="flex items-center gap-3 text-earth-500 hover:text-agro-700 font-black text-[10px] uppercase tracking-widest transition-all group">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Curriculum
              </button>
              <div className="flex gap-3">
                  <span className="bg-agro-50 dark:bg-agro-900/30 text-agro-700 dark:text-agro-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-agro-100 dark:border-agro-800">
                    <GraduationCap size={14} className="inline mr-2" /> Learning Portal
                  </span>
              </div>
          </div>

          <div className="ea-card overflow-hidden flex-1 flex flex-col md:flex-row border-4 border-earth-100 dark:border-earth-800 shadow-cinematic">
              <div className="w-full md:w-[450px] relative shrink-0 border-b md:border-b-0 md:border-r border-earth-100 dark:border-earth-800 overflow-hidden group">
                  <SafeImage src={activeModule.image} className="w-full h-full object-cover opacity-80" alt={activeModule.title} containerClassName="w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-950 via-earth-950/20 to-transparent"></div>
                  
                  <div className="absolute bottom-12 left-12 right-12">
                      <div className="flex gap-2 mb-4">
                        <span className="bg-agro-600 text-white px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest">{activeModule.complexity}</span>
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest">{activeModule.duration}</span>
                      </div>
                      <h1 className="text-4xl font-serif font-black leading-tight text-white tracking-tighter mb-6">
                          {activeModule.title}
                      </h1>
                      <div className="flex items-center gap-4 text-white/60">
                         <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-agro-400 border border-white/10"><User size={20}/></div>
                         <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-agro-400">Course Instructor</p>
                            <p className="text-sm font-bold text-white">{activeModule.instructor}</p>
                         </div>
                      </div>
                  </div>
              </div>

              <div className="flex-1 overflow-y-auto ea-scroll-area p-10 md:p-20 bg-white dark:bg-earth-950">
                  <div className="max-w-3xl mx-auto">
                      <div className="flex items-center gap-4 mb-12 pb-12 border-b border-earth-100 dark:border-earth-800">
                          <Quote size={48} className="text-agro-100 dark:text-agro-900/40 shrink-0" />
                          <p className="text-xl md:text-2xl text-earth-800 dark:text-earth-200 font-serif italic leading-relaxed">
                              {activeModule.excerpt}
                          </p>
                      </div>

                      <div className="prose prose-lg prose-earth dark:prose-invert max-w-none mb-12">
                          <div className="whitespace-pre-wrap font-sans text-earth-700 dark:text-earth-300 leading-relaxed text-lg font-medium">
                              {activeModule.fullContent}
                          </div>
                      </div>

                      <div className="p-8 bg-earth-50 dark:bg-earth-900 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white dark:bg-earth-800 rounded-2xl flex items-center justify-center text-agro-600 shadow-sm"><Award size={24}/></div>
                            <div>
                                <h4 className="font-bold text-earth-900 dark:text-white text-sm uppercase tracking-widest">Mastery Certification</h4>
                                <p className="text-xs text-earth-500">Earn 50 EAC upon completion</p>
                            </div>
                         </div>
                         <button className="bg-agro-600 hover:bg-agro-700 text-white font-black py-4 px-10 rounded-2xl text-[10px] uppercase tracking-widest shadow-xl transition-all">Start Module Session</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-earth-950 transition-colors duration-500 pb-20">
      
      {/* 1. LEARNING HUB HEADER */}
      <section className="max-w-[1600px] mx-auto px-6 pt-8 mb-6">
        <div className="ea-header-block p-10 flex flex-col xl:flex-row justify-between items-center gap-10 bg-slate-900/5 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-inner backdrop-blur-3xl">
            <div className="flex-1 text-center xl:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-agro-600 text-white text-[9px] font-black uppercase tracking-widest mb-4 shadow-lg shadow-agro-600/20">
                    <GraduationCap size={14} /> Knowledge Hub
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-black text-earth-900 dark:text-white tracking-tighter leading-none mb-2">Sustainable <span className="text-blue-600 italic">Academy</span></h1>
                <p className="text-earth-500 dark:text-earth-400 font-medium text-lg leading-relaxed max-w-2xl">Standardized agricultural know-how and curriculum modules for regional resilient development.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center shrink-0 w-full xl:w-auto">
                <div className="relative group w-full sm:w-72 md:w-96">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-earth-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search curriculum..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="w-full bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-[2rem] pl-16 pr-6 py-5 text-base font-bold focus:outline-none focus:ring-8 focus:ring-blue-500/5 transition-all dark:text-white shadow-sm" 
                    />
                </div>
                <button 
                    onClick={handleGenerateSummary}
                    className="ea-btn-op nature-gradient px-10 h-16 rounded-[2rem] text-xs font-black uppercase"
                >
                    <Brain size={22} /> AI Path Synthesis
                </button>
            </div>
        </div>
      </section>

      {/* 2. CURRICULUM GRID */}
      <div className="max-w-[1600px] mx-auto px-6 grid lg:grid-cols-12 gap-8 items-start">
          <aside className="lg:col-span-3 space-y-6">
              <div className="ea-card p-8 bg-earth-50/50 dark:bg-earth-900/40 border-earth-100 dark:border-earth-800">
                  <h4 className="ea-label-meta text-[10px] mb-8">Curriculum tracks</h4>
                  <div className="grid gap-2">
                      {['All', 'Social', 'Environment', 'Health', 'Technical', 'Industrial'].map(cat => (
                          <button
                              key={cat}
                              onClick={() => setActiveCategory(cat)}
                              className={`flex items-center justify-between px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                                  activeCategory === cat 
                                  ? 'bg-agro-600 border-agro-500 text-white shadow-lg translate-x-2' 
                                  : 'text-earth-400 border-transparent hover:bg-white dark:hover:bg-earth-800 hover:text-earth-900'
                              }`}
                          >
                              {cat}
                              {activeCategory === cat ? <Zap size={14} fill="white" /> : <ChevronRight size={14} className="opacity-40" />}
                          </button>
                      ))}
                  </div>
              </div>

              {/* Social Resilience Focus Box */}
              <div className="bg-rose-900 p-8 rounded-[3rem] text-white relative overflow-hidden shadow-2xl group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12"><Heart size={200} /></div>
                  <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-rose-300 mb-6 flex items-center gap-3">
                      <ShieldAlert size={16} /> Social Integrity
                  </h4>
                  <p className="text-sm text-rose-100 font-medium leading-relaxed mb-8 relative z-10">
                      Learn to identify and treat **Social Influenza Disease (SI-D)** in your cluster to stabilize the **m(t)** constant.
                  </p>
                  <button className="w-full py-3.5 bg-white text-rose-950 rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-xl relative z-10 hover:bg-rose-50 transition-all">Start SI-D Track</button>
              </div>

              <div className="bg-blue-900 p-8 rounded-[3rem] text-white relative overflow-hidden shadow-2xl group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12"><Activity size={200} /></div>
                  <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-300 mb-6">Expert Sessions</h4>
                  <p className="text-sm text-blue-100 font-medium leading-relaxed mb-8">
                      Access live masterclasses from lead EnvirosAgro engineers on m(t) calibration.
                  </p>
                  <button className="w-full py-3.5 bg-white text-blue-950 rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-xl relative z-10 hover:bg-blue-50 transition-all">View Masterclass Schedule</button>
              </div>
          </aside>

          <main className="lg:col-span-9">
              <div 
                ref={scrollContainerRef}
                className="ea-scroll-area h-[calc(100vh-280px)] pr-4 relative scroll-smooth space-y-10 pb-20 no-scrollbar"
              >
                  <div className="grid md:grid-cols-2 gap-8">
                      {currentItems.map((module) => (
                          <div 
                             key={module.id} 
                             onClick={() => setReadingId(module.id)} 
                             className="ea-card flex flex-col group cursor-pointer h-full bg-white dark:bg-earth-900 border-earth-100 dark:border-earth-800 hover:shadow-cinematic transition-all duration-700"
                          >
                              <div className="h-48 overflow-hidden relative border-b border-earth-100 dark:border-earth-800 shrink-0">
                                  <SafeImage src={module.image} alt={module.title} containerClassName="w-full h-full" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[5s] opacity-90" />
                                  <div className="absolute top-4 left-4 flex gap-2">
                                      <span className="bg-white/95 dark:bg-earth-950/95 text-agro-900 dark:text-agro-400 px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-xl">
                                          {module.category}
                                      </span>
                                      <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-xl ${module.complexity === 'Beginner' ? 'bg-green-600 text-white' : module.complexity === 'Intermediate' ? 'bg-blue-600 text-white' : 'bg-rose-600 text-white'}`}>
                                          {module.complexity}
                                      </span>
                                  </div>
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                     <PlayCircle size={48} className="text-white drop-shadow-2xl" />
                                  </div>
                              </div>
                              
                              <div className="p-8 flex-1 flex flex-col">
                                  <div className="flex items-center gap-3 text-[9px] font-black text-earth-300 dark:text-earth-600 uppercase tracking-widest mb-4">
                                      <span className="text-agro-600">{module.duration} TRACK</span> 
                                      <span className="w-1 h-1 bg-earth-200 dark:bg-earth-800 rounded-full"></span>
                                      <span>BY {module.instructor}</span>
                                  </div>
                                  
                                  <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white leading-tight mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                                      {module.title}
                                  </h3>
                                  
                                  <p className="text-earth-500 dark:text-earth-400 text-sm line-clamp-2 font-medium leading-relaxed mb-10 flex-1">
                                      {module.excerpt}
                                  </p>
                                  
                                  <div className="pt-8 border-t border-earth-100 dark:border-earth-800 flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                          <div className="p-2 bg-earth-50 dark:bg-earth-800 rounded-xl text-earth-300 group-hover:text-agro-600">
                                              <BookOpen size={16} />
                                          </div>
                                          <span className="text-[10px] font-black text-earth-400 uppercase tracking-widest">Enroll module</span>
                                      </div>
                                      <div className="w-10 h-10 rounded-2xl bg-earth-50 dark:bg-earth-800 flex items-center justify-center text-earth-300 group-hover:text-blue-600 transition-all">
                                          <ArrowUpRight size={20} />
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>

                  {displayedModules.length === 0 && (
                      <div className="py-40 text-center animate-in fade-in zoom-in-95">
                          <Search size={48} className="mx-auto mb-4 text-earth-200" />
                          <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white mb-2">Curriculum Not Found</h3>
                          <p className="text-earth-500 font-medium">Please refine your module query or track lens.</p>
                      </div>
                  )}

                  {totalPages > 1 && (
                    <div className="flex flex-col items-center gap-6 pt-20 border-t border-earth-100 dark:border-earth-800">
                       <div className="flex items-center gap-4">
                          <button 
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))} 
                            disabled={currentPage === 1} 
                            className="w-14 h-14 bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-2xl flex items-center justify-center text-earth-400 disabled:opacity-20 transition-all hover:bg-earth-50 dark:hover:bg-earth-800 shadow-sm"
                          >
                            <ChevronLeft size={24} />
                          </button>
                          
                          <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }).map((_, i) => {
                                const page = i + 1;
                                // Showing current, first, last, and neighbors
                                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-12 h-12 rounded-xl text-[11px] font-black transition-all ${currentPage === page ? 'bg-agro-600 text-white shadow-lg shadow-agro-600/20' : 'bg-earth-50 dark:bg-earth-800 text-earth-400 hover:text-earth-900 dark:hover:text-white border border-earth-100 dark:border-earth-700'}`}
                                        >
                                            {page}
                                        </button>
                                    );
                                }
                                if (page === currentPage - 2 || page === currentPage + 2) {
                                    return <span key={page} className="text-earth-300">...</span>;
                                }
                                return null;
                            })}
                          </div>
                          
                          <button 
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} 
                            disabled={currentPage === totalPages} 
                            className="w-14 h-14 bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-2xl flex items-center justify-center text-earth-400 disabled:opacity-20 transition-all hover:bg-earth-50 dark:hover:bg-earth-800 shadow-sm"
                          >
                            <ChevronRight size={24} />
                          </button>
                       </div>
                       <p className="text-[10px] font-black uppercase text-earth-400 tracking-[0.3em]">
                          Displaying Module Block {currentPage} of {totalPages}
                       </p>
                    </div>
                  )}
              </div>
          </main>
      </div>

      {/* INTELLIGENCE MODALS */}
      {showAiModal && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-earth-950/90 backdrop-blur-xl animate-in fade-in duration-300">
              <div className="bg-white dark:bg-earth-900 w-full max-w-4xl rounded-[3.5rem] shadow-cinematic border border-white/10 flex flex-col h-[75vh] animate-in zoom-in-95">
                  <div className="bg-blue-900 p-8 text-white flex justify-between items-center shrink-0 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Brain size={300} /></div>
                      <div className="relative z-10 flex items-center gap-6">
                          <div className="p-4 bg-white/10 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md">
                             <Sparkles size={32} className="text-blue-300" />
                          </div>
                          <div>
                            <h3 className="text-3xl font-serif font-black tracking-tight">Curriculum Synthesis</h3>
                            <p className="text-xs text-blue-200 font-bold uppercase tracking-widest mt-1">Unified Learning Path Brief</p>
                          </div>
                      </div>
                      <button onClick={() => setShowAiModal(false)} className="relative z-10 p-3 bg-white/5 hover:bg-white/20 rounded-2xl transition-all">
                          <X size={28} />
                      </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-earth-50/20 dark:bg-earth-950/20">
                      {isSummarizing ? (
                          <div className="h-full flex flex-col items-center justify-center gap-8">
                              <Loader2 size={48} className="text-blue-600 animate-spin" />
                              <p className="text-xl font-serif italic text-earth-500 dark:text-earth-400 animate-pulse">Building personalized knowledge track...</p>
                          </div>
                      ) : (
                          <div className="prose prose-lg prose-blue dark:prose-invert max-w-none">
                              <div className="whitespace-pre-wrap font-sans text-earth-800 dark:text-earth-200 leading-relaxed font-medium">
                                  {aiSummary}
                              </div>
                          </div>
                      )}
                  </div>

                  <div className="p-10 bg-white dark:bg-earth-900 border-t border-earth-100 dark:border-earth-800 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-3">
                          <CheckCircle2 size={24} className="text-agro-600" />
                          <p className="text-[10px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Integrated Learning Path Verified</p>
                      </div>
                      <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all">Export Study Brief</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
