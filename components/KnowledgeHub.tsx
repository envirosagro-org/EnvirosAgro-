
import React, { useState, useEffect } from 'react';
import { Calendar, User, Tag, ArrowUpRight, Globe, FileText, Search, X, Share2, Download, Bookmark, Layers } from 'lucide-react';
import { DATASETS } from './data';

interface Article {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    category: string;
    image: string;
    thrust: string; // Code like 'SA'
    thrustName: string; // Full name like 'Social Agriculture'
    type: string;
    region: string;
    domain: string;
}

export const KnowledgeHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Initialize bookmarks from localStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('envirosagro_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setBookmarkedIds(prev => {
      const newBookmarks = prev.includes(id) 
        ? prev.filter(b => b !== id) 
        : [...prev, id];
      localStorage.setItem('envirosagro_bookmarks', JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  };

  const handleShare = async (e: React.MouseEvent, article: Article) => {
    e.stopPropagation();
    
    // Construct a valid URL. Fallback to canonical if window.location is not http/https (e.g. in some previews)
    let shareUrl = window.location.href;
    if (!shareUrl.startsWith('http')) {
        shareUrl = 'https://envirosagro.org';
    }

    const shareData = {
        title: article.title,
        text: article.excerpt,
        url: shareUrl
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.error('Error sharing:', err);
        }
    } else {
        // Fallback for browsers that don't support Web Share API
        alert(`Share this article:\n\n${article.title}\n${shareUrl}`);
    }
  };

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

  // 1. Get all public datasets and map them to article format first
  const allArticles: Article[] = DATASETS
    .filter(d => d.access === 'Public')
    .map(d => {
        // Map Thrust to Visual Theme
        let themeTag = 'Research';
        let image = `https://picsum.photos/800/600?random=${d.id.split('-').pop()}`; // Deterministic random image

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
            author: 'EnvirosAgro Database',
            date: d.date,
            category: themeTag,
            image: image,
            thrust: d.thrust,
            thrustName: getThrustName(d.thrust),
            type: d.type,
            region: d.region,
            domain: d.domain
        };
    });

  // 2. Filter based on search term
  const displayedArticles = allArticles.filter(article => {
      const term = searchTerm.toLowerCase();
      return (
          article.title.toLowerCase().includes(term) ||
          article.excerpt.toLowerCase().includes(term) ||
          article.category.toLowerCase().includes(term) || 
          article.domain.toLowerCase().includes(term)
      );
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-earth-200 pb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-agro-900 mb-2">Knowledge Hub</h2>
          <p className="text-earth-600">
            Latest research, technologies, and best practices directly from the EnvirosAgro Data Base.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-3 text-earth-400" size={18} />
            <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-earth-200 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-agro-500 transition-all shadow-sm"
            />
        </div>
      </div>
      
      <div className="mb-6 text-sm font-semibold text-earth-500 flex justify-between items-center">
          <span>Showing {displayedArticles.length} resources</span>
          {bookmarkedIds.length > 0 && (
              <span className="text-agro-600 font-bold flex items-center gap-1">
                  <Bookmark size={14} fill="currentColor" /> {bookmarkedIds.length} Saved
              </span>
          )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedArticles.length > 0 ? (
            displayedArticles.map((article) => (
            <div 
                key={article.id} 
                onClick={() => setSelectedArticle(article)}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-earth-100 flex flex-col h-full cursor-pointer hover:-translate-y-1"
            >
                <div className="h-48 overflow-hidden relative">
                <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-agro-700 shadow-sm flex items-center gap-1">
                    <Tag size={12} /> {article.category}
                </div>
                
                {/* Bookmark & Share & Thrust Badge Group */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button 
                        onClick={(e) => handleShare(e, article)}
                        className="p-2 rounded-full backdrop-blur-md transition-all shadow-sm bg-black/30 text-white hover:bg-black/50"
                        title="Share"
                    >
                        <Share2 size={14} />
                    </button>
                    <button 
                        onClick={(e) => toggleBookmark(e, article.id)}
                        className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
                            bookmarkedIds.includes(article.id) 
                            ? 'bg-agro-500 text-white scale-110' 
                            : 'bg-black/30 text-white hover:bg-black/50'
                        }`}
                        title={bookmarkedIds.includes(article.id) ? "Remove Bookmark" : "Bookmark Article"}
                    >
                        <Bookmark size={14} fill={bookmarkedIds.includes(article.id) ? "currentColor" : "none"} />
                    </button>
                    <div className="bg-black/50 backdrop-blur-md px-2 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm">
                        {article.thrust}
                    </div>
                </div>

                </div>
                <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-earth-500 mb-3">
                    <span className="flex items-center gap-1"><User size={12} /> {article.author}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                </div>
                <h3 className="text-lg font-bold text-earth-900 mb-3 group-hover:text-agro-600 transition-colors line-clamp-2">
                    {article.title}
                </h3>
                <p className="text-earth-600 mb-6 flex-1 leading-relaxed text-sm line-clamp-3">
                    {article.excerpt}
                </p>
                <button className="text-agro-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all mt-auto pt-4 border-t border-earth-50">
                    View Resource <ArrowUpRight size={16} />
                </button>
                </div>
            </div>
            ))
        ) : (
            <div className="col-span-full py-12 text-center text-earth-400 bg-earth-50 rounded-2xl border border-earth-100">
                <Search size={48} className="mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium">No articles found matching "{searchTerm}".</p>
                <p className="text-sm mt-2">Try adjusting your search terms or browse all resources.</p>
            </div>
        )}
      </div>

      {/* ARTICLE DETAIL MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-900/70 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedArticle(null)}>
            <div 
                className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col relative"
                onClick={(e) => e.stopPropagation()}
            >
                
                {/* Close Button */}
                <button 
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors backdrop-blur-md"
                >
                    <X size={24} />
                </button>

                {/* Hero Image */}
                <div className="h-64 md:h-80 w-full relative shrink-0">
                    <img src={selectedArticle.image} className="w-full h-full object-cover" alt={selectedArticle.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                        <div className="flex flex-wrap gap-2 mb-3">
                            <span className="bg-agro-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                {selectedArticle.category}
                            </span>
                            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30">
                                {selectedArticle.type}
                            </span>
                            <span className="bg-blue-600/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                <Layers size={12} /> {selectedArticle.thrustName}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight shadow-black drop-shadow-md mb-2">
                            {selectedArticle.title}
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-white/80">
                            <FileText size={16} />
                            <span>{selectedArticle.domain}</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-8 grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div className="flex flex-wrap items-center gap-6 text-sm text-earth-500 border-b border-earth-100 pb-4">
                                <span className="flex items-center gap-2"><User size={16} className="text-agro-600" /> {selectedArticle.author}</span>
                                <span className="flex items-center gap-2"><Calendar size={16} className="text-agro-600" /> {selectedArticle.date}</span>
                                <span className="flex items-center gap-2"><Globe size={16} className="text-agro-600" /> {selectedArticle.region}</span>
                            </div>
                            
                            <div className="prose prose-earth max-w-none">
                                <p className="lead text-lg text-earth-700 font-medium">
                                    {selectedArticle.excerpt}
                                </p>
                                <p className="text-earth-600 leading-relaxed">
                                    This resource provides an in-depth analysis of <strong>{selectedArticle.title}</strong> within the domain of <strong>{selectedArticle.domain}</strong>. 
                                    It is part of our {selectedArticle.thrustName} collection, specifically targeting 
                                    the advancement of sustainable agricultural practices in the {selectedArticle.region} region.
                                </p>
                                <p className="text-earth-600 leading-relaxed">
                                    Accessing this data allows stakeholders to benchmark their performance against regional standards 
                                    and adopt evidence-based strategies for resilience. The full dataset includes detailed metrics, 
                                    historical trends, and actionable recommendations derived from the EnvirosAgro Sustainability Framework.
                                </p>
                                <div className="bg-earth-50 p-6 rounded-xl border-l-4 border-agro-500 my-6">
                                    <h4 className="font-bold text-agro-900 mb-2">Key Takeaway</h4>
                                    <p className="text-earth-700 italic">
                                        "Sustainable integration of {selectedArticle.domain.toLowerCase()} principles is essential for long-term food security."
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Actions */}
                        <div className="space-y-6">
                            <div className="bg-earth-50 p-6 rounded-2xl border border-earth-100">
                                <h4 className="font-bold text-earth-900 mb-4 flex items-center gap-2">
                                    <FileText size={18} className="text-agro-600" /> Resource Actions
                                </h4>
                                <a 
                                    href={`#download-${selectedArticle.id}`} // Simulated download link
                                    className="w-full bg-agro-600 hover:bg-agro-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mb-3 shadow-md"
                                >
                                    <Download size={18} /> Download Full Data
                                </a>
                                <button 
                                    onClick={(e) => handleShare(e, selectedArticle)}
                                    className="w-full bg-white border border-earth-200 text-earth-700 font-bold py-3 rounded-xl hover:bg-earth-100 transition-colors flex items-center justify-center gap-2 mb-3"
                                >
                                    <Share2 size={18} /> Share Resource
                                </button>
                                
                                {/* Updated Modal Bookmark Button */}
                                <button 
                                    onClick={(e) => toggleBookmark(e, selectedArticle.id)}
                                    className={`w-full border font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 ${
                                        bookmarkedIds.includes(selectedArticle.id)
                                        ? 'bg-agro-50 border-agro-200 text-agro-700'
                                        : 'bg-white border-earth-200 text-earth-700 hover:bg-earth-100'
                                    }`}
                                >
                                    <Bookmark size={18} fill={bookmarkedIds.includes(selectedArticle.id) ? "currentColor" : "none"} /> 
                                    {bookmarkedIds.includes(selectedArticle.id) ? 'Saved to Bookmarks' : 'Save for Later'}
                                </button>
                            </div>

                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                                <h4 className="font-bold text-blue-900 mb-2 text-sm">Need more like this?</h4>
                                <p className="text-xs text-blue-700 mb-4">
                                    Subscribe to our {selectedArticle.category} digest for weekly updates.
                                </p>
                                <button className="text-xs font-bold text-blue-600 hover:underline">Manage Subscriptions</button>
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
