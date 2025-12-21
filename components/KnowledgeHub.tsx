import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Calendar, Globe, FileText, Search, X, Share2, 
  Download, Layers, BookOpen, Filter, TrendingUp,
  Sparkles, ChevronRight, Bookmark, ArrowRight, ShieldCheck, Microscope,
  ArrowLeft, Printer, Quote, CheckCircle2, ChevronLeft, Loader2,
  Zap, Mail, Brain, Database, Fingerprint, Activity, Server, Terminal, RefreshCcw,
  ArrowUpRight, ArrowUp, ChevronDown
} from 'lucide-react';
import { DATASETS } from './data';
import { View } from '../types';
import { summarizeResearch, generateRawDataset } from '../services/gemini';
import { SafeImage } from './SafeImage';

interface Article {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    category: string;
    image: string;
    thrust: string;
    thrustName: string;
    type: string;
    region: string;
    domain: string;
    integrity: string;
    fullContent?: string;
}

interface KnowledgeHubProps {
    onNavigate?: (view: View) => void;
    initialSearch?: string;
}

interface NotificationToast {
    id: string;
    subject: string;
    body: string;
}

const ITEMS_PER_PAGE = 5; // Updated to 5 per page as requested

export const KnowledgeHub: React.FC<KnowledgeHubProps> = ({ onNavigate, initialSearch = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialSearch);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [readingId, setReadingId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [notifications, setNotifications] = useState<NotificationToast[]>([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [showAiModal, setShowAiModal] = useState(false);

  const [isGeneratingDataset, setIsGeneratingDataset] = useState(false);
  const [rawDataset, setRawDataset] = useState<string | null>(null);
  const [showDatasetModal, setShowDatasetModal] = useState(false);

  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const sendMockEmail = (subject: string, body: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotif = { id, subject, body };
    setNotifications(prev => [newNotif, ...prev]);
    setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, 6000);
  };

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newBookmarks = new Set(bookmarkedIds);
    const article = allArticles.find(a => a.id === id);
    
    if (newBookmarks.has(id)) {
        newBookmarks.delete(id);
    } else {
        newBookmarks.add(id);
        if (article) {
            sendMockEmail(
                "Dossier Archived",
                `"${article.title}" has been added to your local intelligence node.`
            );
        }
    }
    setBookmarkedIds(newBookmarks);
  };

  useEffect(() => {
    setSearchTerm(initialSearch);
    setDebouncedSearchTerm(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    if (searchTerm !== debouncedSearchTerm) {
      setIsDebouncing(true);
    }
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsDebouncing(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || readingId) return;
    const handleScroll = () => setShowScrollTop(container.scrollTop > 200);
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [readingId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, debouncedSearchTerm]);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const allArticles: Article[] = useMemo(() => {
    return DATASETS
      .filter(d => d.access === 'Public')
      .map(d => {
          let themeTag = 'Research';
          let image = `https://picsum.photos/800/600?random=${d.id.split('-').pop()}`;
          switch(d.thrust) {
              case 'SA': themeTag = 'Social'; break;
              case 'EA': themeTag = 'Environment'; break;
              case 'HA': themeTag = 'Health'; break;
              case 'TA': themeTag = 'Technology'; break;
              case 'IA': themeTag = 'Industrial'; break;
          }
          return {
              id: d.id,
              title: d.name,
              excerpt: `A comprehensive ${d.type} focusing on ${d.domain} within the ${d.region} region.`,
              author: 'Strategic Council',
              date: d.date,
              category: themeTag,
              image: image,
              thrust: d.thrust,
              thrustName: d.thrust === 'SA' ? 'Social' : d.thrust === 'EA' ? 'Environmental' : d.thrust === 'HA' ? 'Health' : d.thrust === 'TA' ? 'Technical' : 'Industrial',
              type: d.type,
              region: d.region,
              domain: d.domain,
              integrity: (Math.random() * 1.5 + 8.0).toFixed(1),
              fullContent: (d as any).content
          };
      });
  }, []);

  const featuredArticle = useMemo(() => allArticles[0], [allArticles]);

  const displayedArticles = useMemo(() => {
    return allArticles.filter(article => {
        const term = debouncedSearchTerm.toLowerCase();
        const matchesSearch = (
            article.title.toLowerCase().includes(term) ||
            article.excerpt.toLowerCase().includes(term) ||
            article.domain.toLowerCase().includes(term)
        );
        const matchesFilter = activeFilter === 'All' || article.category === activeFilter;
        return matchesSearch && matchesFilter;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [allArticles, debouncedSearchTerm, activeFilter]);

  const totalPages = Math.ceil(displayedArticles.length / ITEMS_PER_PAGE);
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return displayedArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [displayedArticles, currentPage]);

  const showFeatured = !debouncedSearchTerm && activeFilter === 'All' && !!featuredArticle && currentPage === 1;

  const handleAccessDataset = async (article: Article) => {
    setIsGeneratingDataset(true);
    setShowDatasetModal(true);
    try {
        const result = await generateRawDataset(article);
        setRawDataset(result);
    } catch (err) {
        setRawDataset("Dataset retrieval error.");
    } finally {
        setIsGeneratingDataset(false);
    }
  };

  const handleGenerateSummary = async () => {
    setIsSummarizing(true);
    setShowAiModal(true);
    setAiSummary(null);
    try {
        const result = await summarizeResearch(displayedArticles.slice(0, 5));
        setAiSummary(result);
    } catch (err) {
        setAiSummary("Synthesis error.");
    } finally {
        setIsSummarizing(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    scrollToTop();
  };

  const activeArticle = useMemo(() => 
    allArticles.find(a => a.id === readingId), 
    [readingId, allArticles]
  );

  if (readingId && activeArticle) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-4 animate-in fade-in duration-500">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
              <button onClick={() => setReadingId(null)} className="flex items-center gap-2 text-earth-500 hover:text-agro-700 font-black text-[9px] uppercase tracking-widest transition-all">
                  <ArrowLeft size={14} /> Back to Hub
              </button>
              <div className="flex gap-2">
                  <button onClick={() => window.print()} className="p-1.5 bg-white dark:bg-earth-800 border border-earth-100 dark:border-white/5 rounded-lg text-earth-400 hover:text-agro-600 transition-all">
                      <Printer size={14} />
                  </button>
              </div>
          </div>

          <div className="ea-card overflow-hidden h-[calc(100vh-250px)] flex flex-col">
              <div className="h-48 md:h-64 w-full relative shrink-0">
                  <SafeImage src={activeArticle.image} className="w-full h-full object-cover" alt={activeArticle.title} containerClassName="w-full h-full" loading="eager" />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-950 via-earth-950/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                      <div className="flex gap-2 mb-2">
                          <span className="bg-agro-600 text-white px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest border border-white/20">{activeArticle.thrustName} Thrust</span>
                      </div>
                      <h1 className="text-xl md:text-3xl font-serif font-bold leading-tight max-w-3xl text-white">
                          {activeArticle.title}
                      </h1>
                  </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-10 ea-scroll-container">
                  <div className="grid lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-8">
                          <p className="text-lg font-medium text-earth-900 dark:text-white leading-relaxed mb-6 italic">
                              {activeArticle.excerpt}
                          </p>
                          <div className="prose prose-sm prose-earth dark:prose-invert max-w-none text-earth-600 dark:text-earth-400 font-medium">
                              {activeArticle.fullContent ? (
                                  <div className="whitespace-pre-wrap">{activeArticle.fullContent}</div>
                              ) : (
                                  <p>Standardization documentation is being processed. Detailed data metrics available in the repository.</p>
                              )}
                          </div>
                      </div>
                      <div className="lg:col-span-4">
                          <div className="bg-earth-50 dark:bg-earth-800 p-6 rounded-2xl border border-earth-100 dark:border-white/5 space-y-4">
                              <div className="space-y-1">
                                  <p className="text-[7px] font-black text-agro-600 uppercase tracking-widest">In-Score Integrity</p>
                                  <div className="flex items-center gap-3">
                                      <span className="text-xl font-black text-earth-900 dark:text-white">{activeArticle.integrity}</span>
                                      <div className="flex-1 bg-earth-100 dark:bg-earth-950 h-1 rounded-full overflow-hidden">
                                          <div className="bg-agro-600 h-full" style={{ width: `${parseFloat(activeArticle.integrity) * 10}%` }}></div>
                                      </div>
                                  </div>
                              </div>
                              <button onClick={() => handleAccessDataset(activeArticle)} className="ea-button-primary w-full py-2.5 text-[9px]">
                                  <Download size={14} /> Access Node
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-earth-950 transition-colors duration-500">
      <section className="max-w-7xl mx-auto px-6 pt-4 pb-4">
        <div className="ea-header-block p-4 md:p-6 mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex-1">
                <div className="ea-label mb-1">
                    <Terminal size={12} /> Intelligence Node v4.2
                </div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-earth-900 dark:text-white tracking-tight">Knowledge <span className="text-blue-600 italic">Hub</span></h1>
            </div>
            <div className="flex gap-2 items-center">
                <div className="relative group w-48 md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-300" size={14} />
                    <input 
                        type="text" 
                        placeholder="Search Dossiers..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="w-full bg-white dark:bg-earth-900 border border-earth-100 dark:border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-xs focus:outline-none dark:text-white" 
                    />
                </div>
                <button 
                    onClick={handleGenerateSummary}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest flex items-center gap-2"
                >
                    <Brain size={14} /> Synthesis
                </button>
            </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3 space-y-4">
              <div className="ea-card p-4">
                  <h4 className="ea-label mb-3 text-[8px]">
                    <Filter size={12} /> Lenses
                  </h4>
                  <div className="flex flex-col gap-1">
                      {['All', 'Social', 'Environment', 'Health', 'Technology', 'Industrial'].map(cat => (
                          <button
                              key={cat}
                              onClick={() => setActiveFilter(cat)}
                              className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                                  activeFilter === cat 
                                  ? 'bg-agro-600 text-white' 
                                  : 'text-earth-400 hover:bg-earth-50 dark:hover:bg-earth-800'
                              }`}
                          >
                              {cat}
                              {activeFilter === cat && <Zap size={10} />}
                          </button>
                      ))}
                  </div>
              </div>
          </aside>

          <main className="lg:col-span-9 relative">
              <div 
                ref={scrollContainerRef}
                className="ea-scroll-container h-[calc(100vh-320px)] pr-2 relative scroll-smooth space-y-6 pb-6"
              >
                  {showFeatured && (
                    <div onClick={() => setReadingId(featuredArticle.id)} className="relative rounded-3xl overflow-hidden bg-earth-950 shadow-sm group cursor-pointer border border-white dark:border-white/5 h-48 shrink-0">
                        <SafeImage src={featuredArticle.image} alt={featuredArticle.title} containerClassName="w-full h-full" className="w-full h-full object-cover opacity-60 transition-all duration-[10s] group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-earth-950 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-6 right-6 text-white">
                            <span className="bg-amber-400 text-agro-950 px-2 py-0.5 rounded text-[7px] font-black uppercase tracking-widest mb-2 inline-block">Spotlight</span>
                            <h2 className="text-lg md:text-xl font-serif font-bold tracking-tight text-white leading-tight">
                                {featuredArticle.title}
                            </h2>
                        </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">
                      {currentItems.map((article) => (
                          <div key={article.id} onClick={() => setReadingId(article.id)} className="ea-card flex flex-col group cursor-pointer h-full border border-earth-50 dark:border-earth-800">
                              <div className="h-32 overflow-hidden relative">
                                  <SafeImage src={article.image} alt={article.title} containerClassName="w-full h-full" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                  <div className="absolute top-2 left-2">
                                      <span className="bg-white/95 dark:bg-earth-900/95 text-agro-900 dark:text-agro-400 px-2 py-0.5 rounded text-[6px] font-black uppercase tracking-widest">
                                          {article.category}
                                      </span>
                                  </div>
                              </div>
                              <div className="p-4 flex-1 flex flex-col">
                                  <div className="flex items-center gap-2 text-[6px] font-black text-earth-300 uppercase tracking-widest mb-1.5">
                                      <span className="text-agro-600">{article.thrust} NODE</span> 
                                      <span className="w-1 h-1 bg-earth-200 rounded-full"></span>
                                      <span>{article.date}</span>
                                  </div>
                                  <h3 className="text-sm font-bold text-earth-900 dark:text-white mb-1 group-hover:text-agro-700 transition-colors leading-tight line-clamp-1">
                                      {article.title}
                                  </h3>
                                  <p className="text-earth-500 dark:text-earth-400 text-[10px] line-clamp-1 font-medium leading-relaxed mb-3">
                                      {article.excerpt}
                                  </p>
                                  <div className="pt-2 border-t border-earth-50 dark:border-white/5 flex items-center justify-between">
                                      <span className="text-[7px] font-black text-earth-400 uppercase tracking-widest">{article.type}</span>
                                      <ArrowUpRight size={12} className="text-earth-200 group-hover:text-agro-600" />
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>

                  {displayedArticles.length === 0 && (
                      <div className="py-20 text-center text-earth-300">
                          <Search size={48} className="mx-auto mb-4 opacity-10" />
                          <p className="text-sm italic">Adjust query parameters.</p>
                      </div>
                  )}

                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 pt-4">
                       <button 
                         onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                         disabled={currentPage === 1}
                         className="p-1.5 bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-lg text-earth-400 disabled:opacity-30"
                       >
                         <ChevronLeft size={16} />
                       </button>
                       <div className="flex gap-1">
                          {Array.from({ length: totalPages }).map((_, i) => (
                             <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`w-6 h-6 rounded-lg font-black text-[8px] transition-all border ${
                                  currentPage === i + 1 
                                  ? 'bg-agro-600 border-agro-600 text-white' 
                                  : 'bg-white dark:bg-earth-900 border-earth-100 text-earth-400'
                                }`}
                             >
                                {i + 1}
                             </button>
                          ))}
                       </div>
                       <button 
                         onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                         disabled={currentPage === totalPages}
                         className="p-1.5 bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-lg text-earth-400 disabled:opacity-30"
                       >
                         <ChevronRight size={16} />
                       </button>
                    </div>
                  )}
              </div>

              {showScrollTop && (
                  <button 
                      onClick={scrollToTop}
                      className="absolute bottom-4 right-4 z-30 p-2 bg-blue-600 text-white rounded-xl shadow-lg animate-in slide-in-from-bottom-2"
                  >
                      <ArrowUp size={16} />
                  </button>
              )}
          </main>
      </div>
    </div>
  );
};