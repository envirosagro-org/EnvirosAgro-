
import React, { useState } from 'react';
import { Calendar, User, Tag, ArrowUpRight, Globe, FileText, Search, X, Share2, Download, Bookmark } from 'lucide-react';
import { DATASETS } from '../data';

interface Article {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    category: string;
    image: string;
    thrust: string;
    type: string;
    region: string;
}

export const KnowledgeHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

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
            type: d.type,
            region: d.region
        };
    });

  // 2. Filter based on search term
  const displayedArticles = allArticles.filter(article => {
      const term = searchTerm.toLowerCase();
      return (
          article.title.toLowerCase().includes(term) ||
          article.excerpt.toLowerCase().includes(term) ||
          article.category.toLowerCase().includes(term)
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
      
      <div className="mb-6 text-sm font-semibold text-earth-500">
          Showing {displayedArticles.length} resources
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedArticles.length > 0 ? (
            displayedArticles.map((article) => (
            <div 
                key={article.id} 
                onClick={() => setSelectedArticle(article)}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-earth-100 flex flex-col h-full cursor-pointer"
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
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white shadow-sm">
                    {article.thrust}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-900/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col relative">
                
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                        <div className="flex gap-2 mb-3">
                            <span className="bg-agro-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                {selectedArticle.category}
                            </span>
                            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30">
                                {selectedArticle.type}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight shadow-black drop-shadow-md">
                            {selectedArticle.title}
                        </h2>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-8 grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div className="flex items-center gap-6 text-sm text-earth-500 border-b border-earth-100 pb-4">
                                <span className="flex items-center gap-2"><User size={16} /> {selectedArticle.author}</span>
                                <span className="flex items-center gap-2"><Calendar size={16} /> {selectedArticle.date}</span>
                                <span className="flex items-center gap-2"><Globe size={16} /> {selectedArticle.region}</span>
                            </div>
                            
                            <div className="prose prose-earth max-w-none">
                                <p className="lead text-lg text-earth-700 font-medium">
                                    {selectedArticle.excerpt}
                                </p>
                                <p className="text-earth-600 leading-relaxed">
                                    This resource provides an in-depth analysis of <strong>{selectedArticle.title}</strong>. 
                                    It is part of our {selectedArticle.thrust} (Thrust) collection, specifically targeting 
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
                                        "Sustainable integration of {selectedArticle.category.toLowerCase()} principles is essential for long-term food security."
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
                                <button className="w-full bg-agro-600 hover:bg-agro-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mb-3 shadow-md">
                                    <Download size={18} /> Download Full Data
                                </button>
                                <button className="w-full bg-white border border-earth-200 text-earth-700 font-bold py-3 rounded-xl hover:bg-earth-100 transition-colors flex items-center justify-center gap-2 mb-3">
                                    <Share2 size={18} /> Share Resource
                                </button>
                                <button className="w-full bg-white border border-earth-200 text-earth-700 font-bold py-3 rounded-xl hover:bg-earth-100 transition-colors flex items-center justify-center gap-2">
                                    <Bookmark size={18} /> Save for Later
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
