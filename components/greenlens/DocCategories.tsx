import React, { useState } from 'react';

const categories = [
    { name: 'All', count: 12 },
    { name: 'Soil Health', count: 4 },
    { name: 'Biodiversity', count: 3 },
    { name: 'Water Scarcity', count: 2 },
    { name: 'Restoration', count: 3 },
];

export const DocCategories: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="mb-12">
        <div className="flex items-center justify-center space-x-2 md:space-x-4 lg:space-x-6">
            {categories.map((category) => (
                <button 
                    key={category.name} 
                    onClick={() => setActiveCategory(category.name)}
                    className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 dark:focus:ring-offset-gray-800 focus:ring-green-500 ${
                        activeCategory === category.name
                        ? 'bg-green-600 text-white shadow-lg transform scale-105'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}>
                    {category.name} <span className="opacity-75 ml-1">({category.count})</span>
                </button>
            ))}
        </div>
    </div>
  );
};