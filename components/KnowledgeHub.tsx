import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calendar, Tag, ArrowUpRight, Globe, FileText, Search, X, Share2, 
  Download, Layers, Eye, Bell, BookOpen, Filter, TrendingUp, Award,
  Sparkles, ChevronRight, Bookmark, ArrowRight, ShieldCheck, Microscope,
  ArrowLeft, Printer, Share, Quote, CheckCircle2, ChevronLeft, Loader2,
  ArrowUpDown, SortAsc, SortDesc, Zap, Mail, BellRing, Brain, Shield, Terminal
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

type SortOrder = 'newest' | 'oldest';

interface NotificationToast {
    id: string;
    subject: string;
    body: string;
}

export const KnowledgeHub: React.FC<KnowledgeHubProps> = ({ onNavigate, initialSearch = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialSearch);
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [readingId, setReadingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [followedCategories, setFollowedCategories] = useState<Set<string>>(new Set());
  const [notifications, setNotifications] = useState<NotificationToast[]>([]);
  
  // AI Insights state
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [showAiModal, setShowAiModal] = useState(false);

  // Raw Dataset state
  const [isGeneratingDataset, setIsGeneratingDataset] = useState(false);
  const [rawDataset, setRawDataset] = useState<string | null>(null);
  const [showDatasetModal, setShowDatasetModal] = useState(false);

  const ARTICLES_PER_PAGE = 10;

  // Placeholder User Email
  const USER_EMAIL = "stakeholder@envirosagro.org";

  // Mock Email Service
  const sendMockEmail = (subject: string, body: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotif = { id, subject, body };
    setNotifications(prev => [newNotif, ...prev]);
    
    // Auto-remove toast after 6 seconds
    setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, 6000);

    console.log(`[MOCK EMAIL SERVICE] To: ${USER_EMAIL}\nSubject: ${subject}\nBody: ${body}`);
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
                "Subscription Confirmed",
                `You are now following updates for "${article.title}". We will notify you at ${USER_EMAIL} whenever this resource is updated.`
            );
        }
    }
    setBookmarkedIds(newBookmarks);
  };

  const toggleFollowCategory = (cat: string) => {
      const newFollows = new Set(followedCategories);
      if (newFollows.has(cat)) {
          newFollows.delete(cat);
      } else {
          newFollows.add(cat);
          sendMockEmail(
              `Following ${cat}`,
              `You have successfully subscribed to the ${cat} thrust. You will receive email alerts for all new publications in this domain.`
          );
      }
      setFollowedCategories(newFollows);
  };

  // Sync with global search query
  useEffect(() => {
    setSearchTerm(initialSearch);
    setDebouncedSearchTerm(initialSearch);
  }, [initialSearch]);

  // Debouncing logic for the search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset page when filtering or searching
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, activeFilter, sortOrder]);

  // Auto-scroll to top when opening a brief or changing page
  useEffect(() => {
    if (readingId || currentPage !== 1) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [readingId, currentPage]);

  const getThrustName = (code: string) => {
      switch(code) {
          case 'SA': return 'Social Agriculture';
          case 'EA': return 'Environmental Agriculture';
          case 'HA': return 'Health Agriculture';
          case 'TA': return 'Technical Agriculture';
          case 'IA': return 'Industrial Agriculture';
          default: return 'General Agriculture';
      }
  };

  const allArticles: Article[] = useMemo(() => {
    return DATASETS
      .filter(d => d.access === 'Public')
      .map(d => {
          let themeTag = 'Research';
          let image = `https://picsum.photos/1200/800?random=${d.id.split('-').pop()}`;
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
              excerpt: `A comprehensive ${d.type} focusing on ${d.domain} within the ${d.region} region. This resource provides critical insights into sustainable practices and data-driven decision making.`,
              author: 'EnvirosAgro Strategic Council',
              date: d.date,
              category: themeTag,
              image: image,
              thrust: d.thrust,
              thrustName: getThrustName(d.thrust),
              type: d.type,
              region: d.region,
              domain: d.domain,
              integrity: (Math.random() * 2 + 7.5).toFixed(1),
              fullContent: (d as any).content // Map specific content field if it exists
          };
      });
  }, []);

  const featuredArticle = allArticles[0];
  const activeArticle = useMemo(() => 
    allArticles.find(a => a.id === readingId), 
    [readingId, allArticles]
  );

  const displayedArticles = useMemo(() => {
    const filtered = allArticles.filter(article => {
        const term = debouncedSearchTerm.toLowerCase();
        const matchesSearch = (
            article.title.toLowerCase().includes(term) ||
            article.excerpt.toLowerCase().includes(term) ||
            article.domain.toLowerCase().includes(term) ||
            article.thrustName.toLowerCase().includes(term)
        );
        const matchesFilter = activeFilter === 'All' || article.category === activeFilter;
        return matchesSearch && matchesFilter;
    });

    return [...filtered].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [allArticles, debouncedSearchTerm, activeFilter, sortOrder]);

  const totalPages = Math.ceil(displayedArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = displayedArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const handleShare = (article: Article) => {
      if (navigator.share) {
          navigator.share({
              title: article.title,
              text: article.excerpt,
              url: window.location.href
          }).catch(() => {});
      } else {
          alert('Link copied to clipboard!');
      }
  };

  /**
   * Fix for line 609: Added missing simulateUpdate function.
   * This simulates an automated network update to demonstrate the notification system.
   */
  const simulateUpdate = () => {
    if (bookmarkedIds.size > 0) {
      const articleId = Array.from(bookmarkedIds)[0];
      const article = allArticles.find(a => a.id === articleId);
      if (article) {
        sendMockEmail(
          "Resource Updated",
          `A new version of "${article.title}" has been published. Your synchronized repository has been updated with the latest telemetry data.`
        );
      }
    } else if (followedCategories.size > 0) {
      const cat = Array.from(followedCategories)[0];
      sendMockEmail(
        `New Publication in ${cat}`,
        `A new research brief has been added to the ${cat} thrust. Log in to your dashboard to review the updated m(t) indices.`
      );
    }
  };

  const handleGenerateSummary = async () => {
    if (displayedArticles.length === 0) return;
    setIsSummarizing(true);
    setShowAiModal(true);
    try {
        const result = await summarizeResearch(displayedArticles.slice(0, 5));
        setAiSummary(result);
    } catch (err) {
        console.error(err);
        setAiSummary("Unable to synthesize findings at this time. Please try again.");
    } finally {
        setIsSummarizing(false);
    }
  };

  const handleAccessDataset = async (article: Article) => {
    setIsGeneratingDataset(true);
    setShowDatasetModal(true);
    try {
        const result = await generateRawDataset(article);
        setRawDataset(result);
    } catch (err) {
        console.error(err);
        setRawDataset("Dataset retrieval failed. Please verify credentials or try again.");
    } finally {
        setIsGeneratingDataset(false);
    }
  };

  // Immersive Research Brief View
  const renderResearchBrief = (article: Article) => (
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-7xl mx-auto px-6">
          {/* Brief Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 pt-8">
              <button 
                onClick={() => setReadingId(null)}
                className="flex items-center gap-2 text-earth-500 hover:text-agro-700 font-black text-[10px] uppercase tracking-[0.2em] transition-all group"
              >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Knowledge Hub
              </button>
              <div className="flex gap-4">
                  <button onClick={() => window.print()} className="p-2 text-earth-400 hover:text-agro-600 transition-colors" title="Print Brief">
                      <Printer size={20} />
                  </button>
                  <button onClick={() => handleShare(article)} className="p-2 text-earth-400 hover:text-agro-600 transition-colors" title="Share Brief">
                      <Share size={20} />
                  </button>
              </div>
          </div>

          <div className="bg-white dark:bg-earth-900 rounded-[4rem] border border-earth-100 dark:border-earth-800 shadow-2xl overflow-hidden mb-20">
              {/* Cover Image Area */}
              <div className="h-[400px] md:h-[600px] w-full relative">
                  <SafeImage 
                    src={article.image} 
                    className="w-full h-full object-cover" 
                    alt={`Cover image for ${article.title} research brief`} 
                    containerClassName="w-full h-full"
                    loading="eager" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-950 via-earth-950/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-10 md:p-20 text-white">
                      <div className="flex flex-wrap gap-3 mb-6">
                          <span className="bg-agro-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-agro-500/50">{article.thrustName}</span>
                          <span className="bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">{article.category}</span>
                      </div>
                      <h1 className="text-4xl md:text-7xl font-serif font-bold leading-[1.1] max-w-5xl tracking-tight mb-6">
                          {article.title}
                      </h1>
                      <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-agro-200">
                          <span className="flex items-center gap-2"><Globe size={14}/> {article.region}</span>
                          <span className="flex items-center gap-2"><Calendar size={14}/> {article.date}</span>
                      </div>
                  </div>
              </div>

              {/* Main Content Body */}
              <div className="p-10 md:p-20">
                  <div className="grid lg:grid-cols-12 gap-20">
                      {/* Left Side: Article Narrative */}
                      <div className="lg:col-span-8">
                          {article.fullContent ? (
                              <section className="mb-16">
                                  <div className="prose prose-lg prose-earth dark:prose-invert max-w-none text-earth-700 dark:text-earth-300 leading-relaxed whitespace-pre-wrap font-sans">
                                      {article.fullContent}
                                  </div>
                              </section>
                          ) : (
                              <>
                                <section className="mb-16">
                                    <h2 className="text-xs font-black text-agro-600 uppercase tracking-[0.3em] mb-6">Executive Summary</h2>
                                    <p className="text-2xl md:text-3xl font-medium text-earth-900 dark:text-white leading-snug mb-10">
                                        {article.excerpt}
                                    </p>
                                    <div className="prose prose-lg prose-earth dark:prose-invert max-w-none text-earth-600 dark:text-earth-400 leading-relaxed">
                                        <p>
                                            Agriculture in the 21st century is defined by its ability to adapt to extreme volatility. This research, conducted within the <strong>{article.domain}</strong> domain, explores how standardized data frameworks can mitigate risks associated with environmental shocks and resource scarcity in the <strong>{article.region}</strong>.
                                        </p>
                                        <p>
                                            Our investigation follows the <strong>Five Thrusts Framework</strong>, specifically examining the intersection of <em>{article.thrustName}</em> and regional socioeconomic stability. By applying the EnvirosAgro geometric model, we have quantified a resilience increase that directly correlates with the structured adoption of regenerative techniques.
                                        </p>
                                    </div>
                                </section>

                                <section className="mb-16 bg-earth-50 dark:bg-earth-800/50 rounded-[3rem] p-10 md:p-16 border border-earth-100 dark:border-earth-700">
                                    <h2 className="text-xs font-black text-agro-600 uppercase tracking-[0.3em] mb-8">Critical Findings & Data Points</h2>
                                    <div className="space-y-8">
                                        {[
                                            { label: "Resilience Score Δ", val: "+24.2%", desc: "Increase in the m(t) score across a 12-month period following implementation." },
                                            { label: "Data Integrity (In)", val: `${article.integrity}/10`, desc: "Verified via EnvirosAgro's proprietary standardization audit protocols." },
                                            { label: "Resource Efficiency", val: "1.8x", desc: "Gain in water-to-yield ratio using recommended technical interventions." }
                                        ].map((finding, idx) => (
                                            <div key={idx} className="flex gap-6 items-start pb-8 border-b border-earth-200 dark:border-earth-700 last:border-0 last:pb-0">
                                                <div className="text-4xl font-serif font-bold text-agro-700 dark:text-agro-400 w-32 shrink-0">{finding.val}</div>
                                                <div>
                                                    <h4 className="font-bold text-earth-900 dark:text-white mb-1">{finding.label}</h4>
                                                    <p className="text-sm text-earth-500 dark:text-earth-400 leading-relaxed">{finding.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                              </>
                          )}

                          <section>
                              <h2 className="text-xs font-black text-agro-600 uppercase tracking-[0.3em] mb-6">Strategic Memo</h2>
                              <div className="relative p-10 bg-agro-950 text-white rounded-[3rem] overflow-hidden group shadow-xl">
                                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                                      <Layers size={200} />
                                  </div>
                                  <Quote className="text-agro-400 mb-6" size={40} />
                                  <p className="text-xl md:text-2xl font-medium italic leading-relaxed relative z-10 mb-8">
                                      "The transition to a {article.domain.toLowerCase()} focus is not merely an option for the local farming collective; it is the cornerstone of our regional survival strategy. Standardized data is the new fertilizer."
                                  </p>
                                  <div className="flex items-center gap-4 relative z-10">
                                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                                          <ShieldCheck className="text-agro-400" />
                                      </div>
                                      <div>
                                          <p className="font-bold text-sm">Strategic Council</p>
                                          <p className="text-[10px] uppercase font-black tracking-widest text-agro-400">Policy & Governance Division</p>
                                      </div>
                                  </div>
                              </div>
                          </section>
                      </div>

                      {/* Right Side: Technical Specs & Actions */}
                      <div className="lg:col-span-4">
                          <div className="sticky top-32 space-y-8">
                              <div className="bg-white dark:bg-earth-900 p-8 rounded-[2.5rem] border border-earth-200 dark:border-earth-800 shadow-sm">
                                  <h4 className="text-[10px] font-black text-earth-400 dark:text-earth-500 uppercase tracking-[0.25em] mb-8 border-b border-earth-100 dark:border-earth-800 pb-4">Brief Metadata</h4>
                                  <div className="space-y-8">
                                      <div>
                                          <p className="text-[10px] font-bold text-earth-400 dark:text-earth-500 uppercase mb-2">Lead Researcher</p>
                                          <p className="font-bold text-earth-900 dark:text-white flex items-center gap-2 text-lg">
                                              <Microscope size={18} className="text-agro-600 dark:text-agro-400" /> {article.author}
                                          </p>
                                      </div>
                                      <div>
                                          <p className="text-[10px] font-bold text-earth-400 dark:text-earth-500 uppercase mb-2">Technical Format</p>
                                          <span className="font-mono text-xs text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800 uppercase font-black">
                                              {article.type}
                                          </span>
                                      </div>
                                      <div>
                                          <p className="text-[10px] font-bold text-earth-400 dark:text-earth-500 uppercase mb-2">Regional Scope</p>
                                          <p className="font-bold text-earth-900 dark:text-white flex items-center gap-2 text-lg uppercase tracking-tight">
                                              {article.region}
                                          </p>
                                      </div>
                                      <div>
                                          <p className="text-[10px] font-bold text-earth-400 dark:text-earth-500 uppercase mb-2">Resilience Weighting</p>
                                          <div className="flex items-center gap-4">
                                              <span className="text-3xl font-serif font-bold text-agro-700 dark:text-agro-400">{article.integrity}</span>
                                              <div className="flex-1 bg-earth-100 dark:bg-earth-800 h-3 rounded-full overflow-hidden border border-earth-200 dark:border-earth-700 shadow-inner">
                                                  <div className="bg-agro-600 h-full" style={{ width: `${parseFloat(article.integrity) * 10}%` }}></div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              <div className="space-y-4">
                                  <button onClick={() => handleAccessDataset(article)} className="w-full bg-agro-900 dark:bg-agro-700 text-white font-black uppercase text-xs tracking-widest py-5 rounded-[2rem] hover:bg-agro-800 dark:hover:bg-agro-600 transition-all shadow-xl shadow-agro-900/10 flex items-center justify-center gap-3">
                                      <Download size={20} /> Access Full Dataset
                                  </button>
                                  <button 
                                    onClick={(e) => toggleBookmark(e, article.id)}
                                    className={`w-full py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-3 border-2 ${
                                        bookmarkedIds.has(article.id)
                                        ? 'bg-agro-50 border-agro-200 text-agro-700'
                                        : 'bg-white border-earth-100 text-earth-700 hover:bg-earth-50'
                                    }`}
                                  >
                                      <Bookmark size={20} fill={bookmarkedIds.has(article.id) ? "currentColor" : "none"} /> 
                                      {bookmarkedIds.has(article.id) ? "Bookmarked (Notifications Active)" : "Bookmark for Updates"}
                                  </button>
                                  <div className="pt-6 border-t border-earth-100 dark:border-earth-800 text-center">
                                      <p className="text-[10px] font-bold text-earth-400 uppercase tracking-widest mb-4">Related Thrust Content</p>
                                      <button onClick={() => onNavigate?.(View.SUSTAINABILITY_FRAMEWORK)} className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center gap-2 mx-auto">
                                          View {article.thrust} Metrics <ArrowUpRight size={14} />
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          {/* Further Reading Section */}
          <div className="mb-32">
              <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white mb-10 flex items-center gap-4">
                  <span className="w-12 h-px bg-earth-200 dark:bg-earth-800"></span> More Research for You
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                  {allArticles.filter(a => a.id !== article.id).slice(0, 3).map(related => (
                      <div key={related.id} onClick={() => setReadingId(related.id)} className="group cursor-pointer">
                          <SafeImage 
                            src={related.image} 
                            containerClassName="h-48 rounded-3xl mb-4 border border-earth-100 dark:border-earth-800 shadow-sm"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                            alt={`Thumbnail for related research: ${related.title}`} 
                          />
                          <h4 className="font-bold text-earth-900 dark:text-white group-hover:text-agro-600 transition-colors leading-tight mb-2">{related.title}</h4>
                          <span className="text-[10px] font-black text-earth-400 uppercase tracking-widest">{related.date}</span>
                      </div>
                  ))}
              </div>
          </div>
      </div>
  );

  // Default Knowledge Hub Layout
  if (readingId && activeArticle) {
      return renderResearchBrief(activeArticle);
  }

  const isDebouncing = searchTerm !== debouncedSearchTerm;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* AI Summary Modal */}
      {showAiModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-earth-950/80 backdrop-blur-md animate-in fade-in duration-300">
              <div className="bg-white dark:bg-earth-900 rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-earth-100 dark:border-earth-800 animate-in zoom-in-95 duration-300">
                  <div className="bg-agro-900 p-8 text-white flex justify-between items-center">
                      <div className="flex items-center gap-4">
                          <div className="bg-white/10 p-3 rounded-2xl">
                             <Brain size={28} className="text-agro-300" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">AI Synthesis Hub</h3>
                            <p className="text-xs text-agro-200 font-bold uppercase tracking-widest">Powered by EnvirosAgro Intelligence</p>
                          </div>
                      </div>
                      <button onClick={() => { setShowAiModal(false); setAiSummary(null); }} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                          <X size={24} />
                      </button>
                  </div>
                  <div className="p-10 max-h-[60vh] overflow-y-auto custom-scrollbar">
                      {isSummarizing ? (
                          <div className="flex flex-col items-center justify-center py-20">
                              <Loader2 size={48} className="text-agro-600 animate-spin mb-6" />
                              <p className="text-earth-500 dark:text-earth-400 font-bold animate-pulse">Aggregating dataset points and correlating framework thrusts...</p>
                          </div>
                      ) : (
                          <div className="prose prose-earth dark:prose-invert max-w-none">
                              <h4 className="text-agro-600 dark:text-agro-400 font-black uppercase text-xs tracking-[0.3em] mb-4">Research Overview Summary</h4>
                              <div className="text-earth-700 dark:text-earth-200 leading-relaxed whitespace-pre-wrap">
                                  {aiSummary}
                              </div>
                              <div className="mt-10 p-6 bg-earth-50 dark:bg-earth-800/50 rounded-2xl border border-earth-100 dark:border-earth-700 flex items-center gap-4">
                                  <Zap size={24} className="text-amber-500" />
                                  <p className="text-xs text-earth-500 dark:text-earth-400 font-medium">This summary accounts for the top 5 most relevant results from your current search filter.</p>
                              </div>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      )}

      {/* Dataset Modal */}
      {showDatasetModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-earth-950/80 backdrop-blur-md animate-in fade-in duration-300">
              <div className="bg-white dark:bg-earth-900 rounded-[3rem] shadow-2xl w-full max-w-3xl overflow-hidden border border-earth-100 dark:border-earth-800 animate-in zoom-in-95 duration-300">
                  <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
                      <div className="flex items-center gap-4">
                          <div className="bg-white/10 p-3 rounded-2xl text-blue-400">
                             <Terminal size={28} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">Secure Dataset Access</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Encrypted Telemetry Stream</p>
                          </div>
                      </div>
                      <button onClick={() => { setShowDatasetModal(false); setRawDataset(null); }} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                          <X size={24} />
                      </button>
                  </div>
                  <div className="p-10 max-h-[70vh] overflow-y-auto custom-scrollbar bg-slate-950">
                      {isGeneratingDataset ? (
                          <div className="flex flex-col items-center justify-center py-24">
                              <Loader2 size={48} className="text-blue-500 animate-spin mb-6" />
                              <p className="text-slate-400 font-mono text-sm animate-pulse tracking-widest uppercase">Establishing Secure Data Tunnel...</p>
                          </div>
                      ) : (
                          <div className="prose prose-invert max-w-none font-mono">
                              <pre className="text-green-400 text-xs leading-relaxed bg-black/40 p-6 rounded-2xl border border-white/5 whitespace-pre-wrap">
                                  {rawDataset}
                              </pre>
                              <div className="mt-10 flex gap-4">
                                  <button onClick={() => alert("Simulating download of encrypted archive...")} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                                      <Download size={16} /> Download .EAGRO Package
                                  </button>
                                  <button onClick={() => { const el = document.createElement('textarea'); el.value = rawDataset || ''; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el); alert("Copied to clipboard!"); }} className="px-6 bg-white/10 text-white border border-white/10 hover:bg-white/20 rounded-xl transition-all">
                                      Copy
                                  </button>
                              </div>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      )}

      {/* MOCK EMAIL NOTIFICATION SYSTEM */}
      <div className="fixed bottom-10 right-10 z-[100] flex flex-col gap-3 pointer-events-none w-full max-sm:right-4 w-full max-w-sm">
          {notifications.map(notif => (
              <div key={notif.id} className="bg-white dark:bg-earth-900 border-2 border-agro-500 shadow-2xl rounded-2xl p-4 pointer-events-auto animate-in slide-in-from-bottom-4 fade-in duration-500 flex gap-4">
                  <div className="bg-agro-600 text-white p-2 h-fit rounded-lg shadow-lg">
                      <Mail size={20} />
                  </div>
                  <div>
                      <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-black text-agro-600 uppercase tracking-widest">Email Notification Sent</span>
                          <button 
                            onClick={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))}
                            className="text-earth-400 hover:text-earth-600 transition-colors"
                          >
                              <X size={14} />
                          </button>
                      </div>
                      <h4 className="font-bold text-sm text-earth-900 dark:text-white mb-1">{notif.subject}</h4>
                      <p className="text-xs text-earth-500 dark:text-earth-400 leading-relaxed">{notif.body}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-[8px] font-bold text-earth-400 uppercase">Recipient: {USER_EMAIL}</span>
                      </div>
                  </div>
              </div>
          ))}
      </div>

      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 border-b border-earth-100 dark:border-earth-800 pb-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-agro-50 dark:bg-agro-900/30 text-agro-700 dark:text-agro-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
             <BookOpen size={14} /> Knowledge Repository
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-earth-900 dark:text-white mb-4">Research & Insights</h1>
          <p className="text-earth-600 dark:text-earth-400 text-lg leading-relaxed">
            Access the EnvirosAgro Data Base: A comprehensive collection of manuals, datasets, and strategic briefs organized by the Five Thrusts framework.
          </p>
        </div>
        <div className="flex flex-col items-end gap-4 w-full md:w-auto">
            {/* Action Buttons Row */}
            <div className="flex gap-3">
                <button 
                    onClick={handleGenerateSummary}
                    disabled={displayedArticles.length === 0}
                    className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-xl text-xs font-bold border border-purple-200 dark:border-purple-800 hover:scale-105 transition-all disabled:opacity-50"
                >
                    <Brain size={14} fill="currentColor" /> AI Synthesis
                </button>
                <button 
                    onClick={() => { if(bookmarkedIds.size > 0 || followedCategories.size > 0) simulateUpdate(); else alert("Bookmark an article or follow a category first to see the update simulation."); }}
                    title="Simulate Data Update"
                    className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-4 py-2 rounded-xl text-xs font-bold border border-amber-200 dark:border-amber-800 hover:scale-105 transition-all"
                >
                    <Zap size={14} fill="currentColor" /> Simulate Update
                </button>
            </div>
            <div className="relative group">
                {isDebouncing ? (
                    <Loader2 className="absolute left-4 top-1/2 -translate-y-1/2 text-agro-600 animate-spin" size={18} />
                ) : (
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-400 group-focus-within:text-agro-600 transition-colors" size={18} />
                )}
                <input 
                    type="text" 
                    placeholder="Search the repository..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="w-full md:w-80 bg-white dark:bg-earth-900 border border-earth-200 dark:border-earth-800 rounded-2xl pl-12 pr-6 py-3.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-agro-500 transition-all font-medium text-earth-900 dark:text-earth-100" 
                />
            </div>
        </div>
      </div>

      {/* 2. Featured Content */}
      {!debouncedSearchTerm && activeFilter === 'All' && featuredArticle && (
          <div className="mb-20">
              <h2 className="text-xs font-black text-earth-400 dark:text-earth-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                 <Sparkles size={16} className="text-agro-500" /> Featured Research
              </h2>
              <div 
                onClick={() => setReadingId(featuredArticle.id)}
                className="group relative bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer flex flex-col lg:flex-row hover:scale-[1.01] duration-500"
              >
                  <div className="lg:w-1/2 h-[400px] overflow-hidden relative">
                      <SafeImage 
                        src={featuredArticle.image} 
                        alt={`Featured research spotlight: ${featuredArticle.title}`} 
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" 
                      />
                      <button 
                        onClick={(e) => toggleBookmark(e, featuredArticle.id)}
                        className={`absolute top-6 right-6 p-4 rounded-2xl backdrop-blur-md transition-all shadow-xl z-10 border ${
                            bookmarkedIds.has(featuredArticle.id)
                            ? 'bg-agro-600 border-agro-400 text-white'
                            : 'bg-white/40 border-white/20 text-white hover:bg-white/60'
                        }`}
                        title={bookmarkedIds.has(featuredArticle.id) ? "Bookmarked" : "Bookmark for Updates"}
                      >
                          <Bookmark size={24} fill={bookmarkedIds.has(featuredArticle.id) ? "currentColor" : "none"} />
                      </button>
                  </div>
                  <div className="lg:w-1/2 p-10 md:p-14 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                          <span className="bg-agro-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{featuredArticle.thrustName}</span>
                          <span className="text-[10px] font-black text-earth-400 uppercase tracking-widest">{featuredArticle.date}</span>
                      </div>
                      <h3 className="text-4xl font-serif font-bold text-earth-900 dark:text-white mb-6 group-hover:text-agro-700 dark:group-hover:text-agro-400 transition-colors leading-tight">
                          {featuredArticle.title}
                      </h3>
                      <p className="text-earth-600 dark:text-earth-400 text-lg leading-relaxed mb-10 line-clamp-3">
                          {featuredArticle.excerpt}
                      </p>
                      <div className="flex items-center gap-6">
                          <button 
                            className="bg-agro-900 dark:bg-agro-600 text-white px-8 py-3.5 rounded-2xl font-black text-sm hover:bg-agro-800 dark:hover:bg-agro-50 transition-all flex items-center gap-2 shadow-lg hover:scale-105"
                          >
                              View Details <ArrowRight size={18} />
                          </button>
                          <div className="flex items-center gap-2 text-earth-400 font-bold text-xs">
                              <Microscope size={18} /> In Score: {featuredArticle.integrity}/10
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* 3. Filtering & Grid */}
      <div className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-2">
                  <Filter size={18} className="text-earth-400" />
                  <span className="text-sm font-bold text-earth-900 dark:text-earth-200 mr-4">Category:</span>
                  <div className="flex gap-2 flex-wrap">
                      {['All', 'Social', 'Environment', 'Health', 'Technology', 'Industrial'].map(cat => (
                          <div key={cat} className="flex items-center gap-1 group">
                                <button
                                    onClick={() => setActiveFilter(cat)}
                                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${
                                        activeFilter === cat 
                                        ? 'bg-agro-600 text-white border-agro-600 shadow-md' 
                                        : 'bg-white dark:bg-earth-800 text-earth-500 dark:text-earth-400 border-earth-200 dark:border-earth-700 hover:bg-earth-50 dark:hover:bg-earth-900'
                                    }`}
                                >
                                    {cat}
                                </button>
                                {cat !== 'All' && (
                                    <button 
                                        onClick={() => toggleFollowCategory(cat)}
                                        title={followedCategories.has(cat) ? `Following ${cat}` : `Follow ${cat} category`}
                                        className={`p-2 rounded-full transition-all border ${
                                            followedCategories.has(cat)
                                            ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                                            : 'bg-earth-50 dark:bg-earth-800 border-earth-200 dark:border-earth-700 text-earth-400 hover:text-blue-600'
                                        }`}
                                    >
                                        <Bell size={12} fill={followedCategories.has(cat) ? "currentColor" : "none"} className={followedCategories.has(cat) ? 'animate-pulse' : ''} />
                                    </button>
                                )}
                          </div>
                      ))}
                  </div>
              </div>

              {/* SORTING CONTROLS */}
              <div className="flex items-center gap-2">
                  <ArrowUpDown size={18} className="text-earth-400" />
                  <span className="text-sm font-bold text-earth-900 dark:text-earth-200 mr-2">Sort by Date:</span>
                  <div className="flex bg-white dark:bg-earth-800 border border-earth-200 dark:border-earth-700 rounded-xl p-1 shadow-sm">
                      <button 
                        onClick={() => setSortOrder('newest')}
                        title="Newest first"
                        className={`p-1.5 rounded-lg transition-all flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter ${sortOrder === 'newest' ? 'bg-agro-600 text-white' : 'text-earth-400 hover:text-earth-600'}`}
                      >
                        <SortDesc size={14} /> Newest
                      </button>
                      <button 
                        onClick={() => setSortOrder('oldest')}
                        title="Oldest first"
                        className={`p-1.5 rounded-lg transition-all flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter ${sortOrder === 'oldest' ? 'bg-agro-600 text-white' : 'text-earth-400 hover:text-earth-600'}`}
                      >
                        <SortAsc size={14} /> Oldest
                      </button>
                  </div>
              </div>

              <div className="text-sm font-bold text-earth-400 w-full md:w-auto text-right">
                  Showing {displayedArticles.length} Resources
              </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {paginatedArticles.map((article) => (
                  <div 
                    key={article.id} 
                    onClick={() => setReadingId(article.id)} 
                    className="group bg-white dark:bg-earth-900 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-earth-100 dark:border-earth-800 flex flex-col h-full cursor-pointer hover:-translate-y-2 hover:scale-[1.03]"
                  >
                      <div className="h-60 overflow-hidden relative">
                          <SafeImage 
                            src={article.image} 
                            alt={`Research article illustration for: ${article.title}`} 
                            containerClassName="w-full h-full"
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                          />
                          
                          {/* Hover Overlay with Button */}
                          <div className="absolute inset-0 bg-agro-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                              <button className="bg-white text-agro-900 px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-agro-50 flex items-center gap-2 hover:scale-105 active:scale-95">
                                 <Eye size={14} /> View Details
                              </button>
                          </div>

                          <div className="absolute top-4 left-4 bg-white dark:bg-earth-800 px-3 py-1 rounded-full text-[10px] font-black text-agro-700 dark:text-agro-400 shadow-sm flex items-center gap-1 uppercase tracking-widest border border-earth-100 dark:border-earth-700">
                              <Tag size={12} /> {article.category}
                          </div>

                          {/* Individual Card Bookmark */}
                          <button 
                            onClick={(e) => toggleBookmark(e, article.id)}
                            className={`absolute top-4 right-4 p-2 rounded-xl backdrop-blur-md transition-all z-10 border ${
                                bookmarkedIds.has(article.id)
                                ? 'bg-agro-600 border-agro-400 text-white opacity-100'
                                : 'bg-white/20 border-white/10 text-white opacity-0 group-hover:opacity-100'
                            }`}
                          >
                            <Bookmark size={16} fill={bookmarkedIds.has(article.id) ? "currentColor" : "none"} />
                          </button>
                      </div>
                      
                      <div className="p-8 flex-1 flex flex-col relative">
                          <div className="flex items-center gap-4 text-[10px] font-black text-earth-400 uppercase tracking-widest mb-4">
                              <span className="flex items-center gap-1 text-agro-600">{article.thrust}</span> 
                              <span className="w-1 h-1 bg-earth-200 dark:bg-earth-700 rounded-full"></span>
                              <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-earth-900 dark:text-white mb-4 group-hover:text-agro-700 dark:group-hover:text-agro-400 transition-colors line-clamp-2 leading-tight">
                              {article.title}
                          </h3>
                          
                          <p className="text-earth-600 dark:text-earth-400 mb-8 flex-1 leading-relaxed text-sm line-clamp-3">
                              {article.excerpt}
                          </p>
                          
                          <div className="mt-auto pt-6 border-t border-earth-50 dark:border-earth-800 flex items-center justify-between">
                              <span className="text-[10px] font-black text-agro-600 uppercase tracking-widest flex items-center gap-1">
                                  <FileText size={14} /> {article.type}
                              </span>
                              <div className="flex items-center gap-1 text-agro-600 font-bold text-xs group-hover:gap-2 transition-all">
                                  View Details <ArrowUpRight size={16} />
                              </div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-3 rounded-xl border border-earth-200 dark:border-earth-800 text-earth-400 hover:bg-earth-50 dark:hover:bg-earth-900 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                      currentPage === page 
                      ? 'bg-agro-600 text-white shadow-md' 
                      : 'text-earth-500 dark:text-earth-400 hover:bg-earth-50 dark:hover:bg-earth-900 border border-transparent'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-3 rounded-xl border border-earth-200 dark:border-earth-800 text-earth-400 hover:bg-earth-50 dark:hover:bg-earth-900 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
          
          {displayedArticles.length === 0 && (
              <div className="py-32 text-center bg-earth-50 dark:bg-earth-900 rounded-[3rem] border border-dashed border-earth-200 dark:border-earth-800">
                  <Search size={48} className="mx-auto text-earth-300 mb-4 opacity-20" />
                  <p className="text-earth-500 dark:text-earth-400 font-bold">No results matching your query "{debouncedSearchTerm}".</p>
                  <button onClick={() => { setSearchTerm(''); setDebouncedSearchTerm(''); setActiveFilter('All'); }} className="mt-4 text-agro-600 font-bold hover:underline">Clear all filters</button>
              </div>
          )}
      </div>

      {/* 5. Support Section */}
      <div className="bg-earth-900 text-white rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
              <div className="w-20 h-20 bg-agro-600 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl rotate-3">
                  <TrendingUp size={40} />
              </div>
              <h3 className="text-4xl font-serif font-bold mb-6">Contribute to the Global m(t) Index</h3>
              <p className="text-agro-100 text-xl mb-12 leading-relaxed">
                  Your standardized data helps the community grow. Submit your research or field observations to earn EAC rewards and improve regional resilience metrics.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                  <button onClick={() => onNavigate?.(View.DATABASE)} className="bg-white text-agro-900 px-10 py-4 rounded-2xl font-black text-sm hover:bg-agro-50 transition-all shadow-xl">
                      Submit Your Data
                  </button>
                  <button onClick={() => onNavigate?.(View.COMMUNITY)} className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-2xl font-black text-sm hover:bg-white/20 transition-all">
                      Join Discussion
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};
