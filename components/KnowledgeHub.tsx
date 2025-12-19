import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calendar, Tag, ArrowUpRight, Globe, FileText, Search, X, Share2, 
  Download, Layers, Eye, Bell, BookOpen, Filter, TrendingUp, Award,
  Sparkles, ChevronRight, Bookmark, ArrowRight, ShieldCheck, Microscope,
  ArrowLeft, Printer, Share, Quote, CheckCircle2, ChevronLeft
} from 'lucide-react';
import { DATASETS } from './data';
import { View } from '../types';

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
}

interface KnowledgeHubProps {
    onNavigate?: (view: View) => void;
}

export const KnowledgeHub: React.FC<KnowledgeHubProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [readingId, setReadingId] = useState<string | null>(null);

  // Auto-scroll to top when opening a brief
  useEffect(() => {
    if (readingId) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [readingId]);

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
              integrity: (Math.random() * 2 + 7.5).toFixed(1)
          };
      });
  }, []);

  const featuredArticle = allArticles[0];
  const activeArticle = useMemo(() => 
    allArticles.find(a => a.id === readingId), 
    [readingId, allArticles]
  );

  const displayedArticles = allArticles.filter(article => {
      const term = searchTerm.toLowerCase();
      const matchesSearch = (
          article.title.toLowerCase().includes(term) ||
          article.excerpt.toLowerCase().includes(term) ||
          article.domain.toLowerCase().includes(term)
      );
      const matchesFilter = activeFilter === 'All' || article.category === activeFilter;
      return matchesSearch && matchesFilter;
  });

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

          <div className="bg-white rounded-[4rem] border border-earth-100 shadow-2xl overflow-hidden mb-20">
              {/* Cover Image Area */}
              <div className="h-[400px] md:h-[600px] w-full relative">
                  <img src={article.image} className="w-full h-full object-cover" alt={article.title} />
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
                          <section className="mb-16">
                              <h2 className="text-xs font-black text-agro-600 uppercase tracking-[0.3em] mb-6">Executive Summary</h2>
                              <p className="text-2xl md:text-3xl font-medium text-earth-900 leading-snug mb-10">
                                  {article.excerpt}
                              </p>
                              <div className="prose prose-lg prose-earth max-w-none text-earth-600 leading-relaxed">
                                  <p>
                                      Agriculture in the 21st century is defined by its ability to adapt to extreme volatility. This research, conducted within the <strong>{article.domain}</strong> domain, explores how standardized data frameworks can mitigate risks associated with environmental shocks and resource scarcity in the <strong>{article.region}</strong>.
                                  </p>
                                  <p>
                                      Our investigation follows the <strong>Five Thrusts Framework</strong>, specifically examining the intersection of <em>{article.thrustName}</em> and regional socioeconomic stability. By applying the EnvirosAgro geometric model, we have quantified a resilience increase that directly correlates with the structured adoption of regenerative techniques.
                                  </p>
                              </div>
                          </section>

                          <section className="mb-16 bg-earth-50 rounded-[3rem] p-10 md:p-16 border border-earth-100">
                              <h2 className="text-xs font-black text-agro-600 uppercase tracking-[0.3em] mb-8">Critical Findings & Data Points</h2>
                              <div className="space-y-8">
                                  {[
                                      { label: "Resilience Score Δ", val: "+24.2%", desc: "Increase in the m(t) score across a 12-month period following implementation." },
                                      { label: "Data Integrity (In)", val: `${article.integrity}/10`, desc: "Verified via EnvirosAgro's proprietary standardization audit protocols." },
                                      { label: "Resource Efficiency", val: "1.8x", desc: "Gain in water-to-yield ratio using recommended technical interventions." }
                                  ].map((finding, idx) => (
                                      <div key={idx} className="flex gap-6 items-start pb-8 border-b border-earth-200 last:border-0 last:pb-0">
                                          <div className="text-4xl font-serif font-bold text-agro-700 w-32 shrink-0">{finding.val}</div>
                                          <div>
                                              <h4 className="font-bold text-earth-900 mb-1">{finding.label}</h4>
                                              <p className="text-sm text-earth-500 leading-relaxed">{finding.desc}</p>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </section>

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
                              <div className="bg-white p-8 rounded-[2.5rem] border border-earth-200 shadow-sm">
                                  <h4 className="text-[10px] font-black text-earth-400 uppercase tracking-[0.25em] mb-8 border-b border-earth-100 pb-4">Brief Metadata</h4>
                                  <div className="space-y-8">
                                      <div>
                                          <p className="text-[10px] font-bold text-earth-400 uppercase mb-2">Lead Researcher</p>
                                          <p className="font-bold text-earth-900 flex items-center gap-2 text-lg">
                                              <Microscope size={18} className="text-agro-600" /> {article.author}
                                          </p>
                                      </div>
                                      <div>
                                          <p className="text-[10px] font-bold text-earth-400 uppercase mb-2">Technical Format</p>
                                          <span className="font-mono text-xs text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 uppercase font-black">
                                              {article.type}
                                          </span>
                                      </div>
                                      <div>
                                          <p className="text-[10px] font-bold text-earth-400 uppercase mb-2">Regional Scope</p>
                                          <p className="font-bold text-earth-900 flex items-center gap-2 text-lg uppercase tracking-tight">
                                              {article.region}
                                          </p>
                                      </div>
                                      <div>
                                          <p className="text-[10px] font-bold text-earth-400 uppercase mb-2">Resilience Weighting</p>
                                          <div className="flex items-center gap-4">
                                              <span className="text-3xl font-serif font-bold text-agro-700">{article.integrity}</span>
                                              <div className="flex-1 bg-earth-100 h-3 rounded-full overflow-hidden border border-earth-200 shadow-inner">
                                                  <div className="bg-agro-600 h-full" style={{ width: `${parseFloat(article.integrity) * 10}%` }}></div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              <div className="space-y-4">
                                  <button onClick={() => alert("Initializing Secure Data Transfer...")} className="w-full bg-agro-900 text-white font-black uppercase text-xs tracking-widest py-5 rounded-[2rem] hover:bg-agro-800 transition-all shadow-xl shadow-agro-900/10 flex items-center justify-center gap-3">
                                      <Download size={20} /> Access Full Dataset
                                  </button>
                                  <button onClick={() => alert("Resource pinned to your research library.")} className="w-full bg-white border-2 border-earth-100 text-earth-700 font-black uppercase text-xs tracking-widest py-5 rounded-[2rem] hover:bg-earth-50 transition-all flex items-center justify-center gap-3">
                                      <Bookmark size={20} /> Bookmark for Later
                                  </button>
                                  <div className="pt-6 border-t border-earth-100 text-center">
                                      <p className="text-[10px] font-bold text-earth-400 uppercase tracking-widest mb-4">Related Thrust Content</p>
                                      <button onClick={() => onNavigate?.(View.SUSTAINABILITY_FRAMEWORK)} className="text-sm font-bold text-blue-600 hover:underline flex items-center justify-center gap-2 mx-auto">
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
              <h3 className="text-2xl font-serif font-bold text-earth-900 mb-10 flex items-center gap-4">
                  <span className="w-12 h-px bg-earth-200"></span> More Research for You
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                  {allArticles.filter(a => a.id !== article.id).slice(0, 3).map(related => (
                      <div key={related.id} onClick={() => setReadingId(related.id)} className="group cursor-pointer">
                          <div className="h-48 rounded-3xl overflow-hidden mb-4 border border-earth-100 shadow-sm">
                              <img src={related.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={related.title} />
                          </div>
                          <h4 className="font-bold text-earth-900 group-hover:text-agro-600 transition-colors leading-tight mb-2">{related.title}</h4>
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

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 border-b border-earth-100 pb-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-agro-50 text-agro-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
             <BookOpen size={14} /> Knowledge Repository
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-earth-900 mb-4">Research & Insights</h1>
          <p className="text-earth-600 text-lg">
            Access the EnvirosAgro Data Base: A comprehensive collection of manuals, datasets, and strategic briefs organized by the Five Thrusts framework.
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full md:w-auto">
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-400 group-focus-within:text-agro-600 transition-colors" size={18} />
                <input 
                    type="text" 
                    placeholder="Search the repository..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="w-full md:w-80 bg-white border border-earth-200 rounded-2xl pl-12 pr-6 py-3.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-agro-500 transition-all font-medium" 
                />
            </div>
        </div>
      </div>

      {/* 2. Featured Content */}
      {!searchTerm && activeFilter === 'All' && featuredArticle && (
          <div className="mb-20">
              <h2 className="text-xs font-black text-earth-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                 <Sparkles size={16} className="text-agro-500" /> Featured Research
              </h2>
              <div 
                onClick={() => setReadingId(featuredArticle.id)}
                className="group relative bg-white border border-earth-100 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer flex flex-col lg:flex-row"
              >
                  <div className="lg:w-1/2 h-[400px] overflow-hidden">
                      <img src={featuredArticle.image} alt="Featured" className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" />
                  </div>
                  <div className="lg:w-1/2 p-10 md:p-14 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                          <span className="bg-agro-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{featuredArticle.thrustName}</span>
                          <span className="text-[10px] font-black text-earth-400 uppercase tracking-widest">{featuredArticle.date}</span>
                      </div>
                      <h3 className="text-4xl font-serif font-bold text-earth-900 mb-6 group-hover:text-agro-700 transition-colors leading-tight">
                          {featuredArticle.title}
                      </h3>
                      <p className="text-earth-600 text-lg leading-relaxed mb-10 line-clamp-3">
                          {featuredArticle.excerpt}
                      </p>
                      <div className="flex items-center gap-6">
                          <button 
                            className="bg-agro-900 text-white px-8 py-3.5 rounded-2xl font-black text-sm hover:bg-agro-800 transition-all flex items-center gap-2 shadow-lg"
                          >
                              Read Full Brief <ArrowRight size={18} />
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
                  <span className="text-sm font-bold text-earth-900 mr-4">Category:</span>
                  <div className="flex gap-2">
                      {['All', 'Social', 'Environment', 'Health', 'Technology', 'Industrial'].map(cat => (
                          <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${
                                activeFilter === cat 
                                ? 'bg-agro-600 text-white border-agro-600 shadow-md' 
                                : 'bg-white text-earth-500 border-earth-200 hover:bg-earth-50'
                            }`}
                          >
                              {cat}
                          </button>
                      ))}
                  </div>
              </div>
              <div className="text-sm font-bold text-earth-400">
                  Showing {displayedArticles.length} Resources
              </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {displayedArticles.map((article) => (
                  <div 
                    key={article.id} 
                    onClick={() => setReadingId(article.id)} 
                    className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-earth-100 flex flex-col h-full cursor-pointer hover:-translate-y-2 hover:scale-[1.02]"
                  >
                      <div className="h-60 overflow-hidden relative">
                          <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                          
                          {/* Hover Overlay with Button */}
                          <div className="absolute inset-0 bg-agro-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                              <button className="bg-white text-agro-900 px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-agro-50 flex items-center gap-2">
                                 <Eye size={14} /> Read Full Brief
                              </button>
                          </div>

                          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-[10px] font-black text-agro-700 shadow-sm flex items-center gap-1 uppercase tracking-widest border border-earth-100">
                              <Tag size={12} /> {article.category}
                          </div>
                      </div>
                      
                      <div className="p-8 flex-1 flex flex-col relative">
                          <div className="flex items-center gap-4 text-[10px] font-black text-earth-400 uppercase tracking-widest mb-4">
                              <span className="flex items-center gap-1 text-agro-600">{article.thrust}</span> 
                              <span className="w-1 h-1 bg-earth-200 rounded-full"></span>
                              <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-earth-900 mb-4 group-hover:text-agro-700 transition-colors line-clamp-2 leading-tight">
                              {article.title}
                          </h3>
                          
                          <p className="text-earth-600 mb-8 flex-1 leading-relaxed text-sm line-clamp-3">
                              {article.excerpt}
                          </p>
                          
                          <div className="mt-auto pt-6 border-t border-earth-50 flex items-center justify-between">
                              <span className="text-[10px] font-black text-agro-600 uppercase tracking-widest flex items-center gap-1">
                                  <FileText size={14} /> {article.type}
                              </span>
                              <div className="flex items-center gap-1 text-agro-600 font-bold text-xs group-hover:gap-2 transition-all">
                                  Deep Dive <ArrowUpRight size={16} />
                              </div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
          
          {displayedArticles.length === 0 && (
              <div className="py-32 text-center bg-earth-50 rounded-[3rem] border border-dashed border-earth-200">
                  <Search size={48} className="mx-auto text-earth-300 mb-4 opacity-20" />
                  <p className="text-earth-500 font-bold">No results matching your query.</p>
                  <button onClick={() => { setSearchTerm(''); setActiveFilter('All'); }} className="mt-4 text-agro-600 font-bold hover:underline">Clear all filters</button>
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