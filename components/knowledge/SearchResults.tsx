import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Filter } from 'lucide-react';
import { SearchResult } from '../../types';

interface SearchResultsProps {
  results: SearchResult[];
  filters: string[];
  activeFilters: string[];
  onFilterToggle: (filter: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring' } }
};

export const SearchResults: React.FC<SearchResultsProps> = ({ results, filters, activeFilters, onFilterToggle }) => {
  return (
    <div className="mt-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">Search Results ({results.length})</h3>
        <div className="flex items-center gap-3 flex-wrap">
            <Filter size={18} className="text-gray-500"/>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by category:</span>
            {filters.map(filter => (
                <button 
                    key={filter}
                    onClick={() => onFilterToggle(filter)}
                    className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${activeFilters.includes(filter) 
                        ? 'bg-agro-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                    {filter}
                </button>
            ))}
        </div>
      </div>

      {results.length > 0 ? (
        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          {results.map((result) => (
            <motion.div 
                key={result.id} 
                className="bg-white dark:bg-gray-800/50 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700/50"
                variants={itemVariants}
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                    <span className="px-2 py-1 text-xs font-semibold text-agro-800 bg-agro-100 dark:text-agro-200 dark:bg-agro-900/50 rounded-full mb-3">
                        {result.category}
                    </span>
                     <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                        <Calendar size={14} />
                        {result.date}
                    </div>
                </div>
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-agro-600">
                  <a href={result.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {result.title}
                  </a>
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {result.summary}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <a href={result.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-semibold text-agro-600 hover:text-agro-500 dark:text-agro-400 dark:hover:text-agro-300">
                        <BookOpen size={16} className="mr-2"/> Read More
                    </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400">No results found. Try a different search query or adjust your filters.</p>
        </div>
      )}
    </div>
  );
};