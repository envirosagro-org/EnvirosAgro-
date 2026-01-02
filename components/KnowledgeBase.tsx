import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { View } from '../types';
import { KnowledgeSearch } from './knowledge/KnowledgeSearch';
import { SearchResults } from './knowledge/SearchResults';
import { sampleData } from './knowledge/sampleData';

interface KnowledgeBaseProps {
  onNavigate: (view: View) => void;
  initialSearchQuery?: string;
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ onNavigate, initialSearchQuery }) => {
  const [searchQuery, setSearchQuery] = React.useState(initialSearchQuery || '');
  const [searchResults, setSearchResults] = React.useState(sampleData);
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, you would fetch data based on the query
    const filtered = sampleData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.summary.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const filteredResults = activeFilters.length > 0 
    ? searchResults.filter(item => activeFilters.includes(item.category))
    : searchResults;

  const allCategories = [...new Set(sampleData.map(item => item.category))];


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-800 dark:text-white">
      <header className="bg-white dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center justify-between h-16">
             <button 
              onClick={() => onNavigate(View.HOME)}
              className="flex items-center gap-2 text-gray-500 hover:text-agro-600 transition-colors text-sm font-bold uppercase tracking-widest"
            >
              <ArrowLeft size={16} /> Back to Home
            </button>
            <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Knowledge Base</h1>
           </div>
         </div>
       </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <KnowledgeSearch 
          onSearch={handleSearch} 
          initialQuery={searchQuery} 
        />
        <SearchResults 
          results={filteredResults}
          filters={allCategories}
          activeFilters={activeFilters}
          onFilterToggle={toggleFilter}
        />
      </main>
    </div>
  );
};