
import React, { useState } from 'react';
import { Calendar, User, Tag, ArrowUpRight, Globe, FileText, Search } from 'lucide-react';
import { DATASETS } from '../data';

export const KnowledgeHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Get all public datasets and map them to article format first
  const allArticles = DATASETS
    .filter(d => d.access === 'Public')
    .map(d => {
        // Map Thrust to Visual Theme
        let theme = { color: 'text-agro-700', bg: 'bg-white', tag: 'Research' };
        let image = `https://picsum.photos/800/600?random=${d.id.split('-').pop()}`; // Deterministic random image

        switch(d.thrust) {
            case 'SA': 
                theme = { color: 'text-rose-700', bg: 'bg-rose-50', tag: 'Social' }; 
                break;
            case 'EA': 
                theme = { color: 'text-green-700', bg: 'bg-green-50', tag: 'Environment' }; 
                break;
            case 'HA': 
                theme = { color: 'text-red-700', bg: 'bg-red-50', tag: 'Health' }; 
                break;
            case 'TA': 
                theme = { color: 'text-blue-700', bg: 'bg-blue-50', tag: 'Technology' }; 
                break;
            case 'IA': 
                theme = { color: 'text-slate-700', bg: 'bg-slate-50', tag: 'Industrial' }; 
                break;
        }

        return {
            id: d.id,
            title: d.name,
            excerpt: `A ${d.type} focusing on ${d.domain} within the ${d.region} region.`,
            author: 'EnvirosAgro Database',
            date: d.date,
            category: theme.tag,
            image: image,
            thrust: d.thrust
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
    <div className="max-w-7xl mx-auto px-6 py-12">
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
            <div key={article.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-earth-100 flex flex-col h-full">
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
                <p className="text-earth-600 mb-6 flex-1 leading-relaxed text-sm">
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
    </div>
  );
};
