import React, { useState } from 'react';
import { Search, BrainCircuit, Leaf, TestTube2, DollarSign } from 'lucide-react';

interface KnowledgeSearchProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const quickAccessTopics = [
  { name: 'AI Diagnostics', icon: BrainCircuit, query: 'AI diagnostics' },
  { name: 'Soil Health', icon: Leaf, query: 'soil health' },
  { name: 'Crop Science', icon: TestTube2, query: 'crop science' },
  { name: 'Carbon Credits', icon: DollarSign, query: 'carbon credits' },
];

export const KnowledgeSearch: React.FC<KnowledgeSearchProps> = ({ onSearch, initialQuery }) => {
  const [query, setQuery] = useState(initialQuery || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleQuickAccess = (quickQuery: string) => {
    setQuery(quickQuery);
    onSearch(quickQuery);
  }

  return (
    <div className="w-full py-12 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">Ag-Knowledge Central</h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Your AI-powered gateway to agricultural intelligence.</p>
      <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex items-center">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full p-4 pl-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-agro-500 focus:border-agro-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-agro-500 dark:focus:border-agro-500"
            placeholder="Search for articles, research papers, best practices..."
          />
        </div>
        <button
          type="submit"
          className="ml-4 px-6 py-3 text-sm font-medium text-white bg-agro-600 rounded-lg border border-agro-600 hover:bg-agro-700 focus:ring-4 focus:outline-none focus:ring-agro-300 dark:bg-agro-600 dark:hover:bg-agro-700 dark:focus:ring-agro-800 transition-transform hover:scale-105"
        >
          Search
        </button>
      </form>
      <div className="max-w-2xl mx-auto mt-6">
        <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Or explore a topic:</p>
        <div className="flex flex-wrap justify-center gap-3">
          {quickAccessTopics.map((topic) => {
            const Icon = topic.icon;
            return (
              <button
                key={topic.name}
                onClick={() => handleQuickAccess(topic.query)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700/50 dark:hover:bg-gray-700 transition-colors"
              >
                <Icon size={16} />
                <span>{topic.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};