import React from 'react';
import { Globe, Zap, Leaf, TrendingUp, ArrowRight } from 'lucide-react';

interface CategoryFiltersProps {
  categories: any[];
  activeCategoryFilter: string | null;
  handleCategoryClick: (cat: string) => void;
  newsSegments: any[];
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  categories,
  activeCategoryFilter,
  handleCategoryClick,
  newsSegments,
}) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {categories.map((cat, idx) => (
        <div
          key={idx}
          onClick={() => handleCategoryClick(cat.name)}
          className={`bg-white dark:bg-earth-900 p-8 rounded-[2.5rem] border-2 transition-all group cursor-pointer hover:shadow-xl ${activeCategoryFilter === cat.name ? 'border-agro-500 shadow-xl' : 'border-earth-100 dark:border-earth-800 hover:border-agro-200'}`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all shadow-inner ${activeCategoryFilter === cat.name ? 'bg-agro-600 text-white' : 'bg-earth-50 dark:bg-earth-800 text-earth-400 group-hover:text-agro-600 group-hover:bg-agro-50'}`}>
            {idx === 0 ? <Globe size={24} /> : idx === 1 ? <Zap size={24} /> : idx === 2 ? <Leaf size={24} /> : <TrendingUp size={24} />}
          </div>
          <h4 className="font-bold text-xl text-earth-900 dark:text-white mb-3 group-hover:text-agro-700 transition-colors leading-tight">{cat.name}</h4>
          <p className="text-xs text-earth-500 dark:text-earth-400 leading-relaxed font-medium mb-8">{cat.desc}</p>
          <div className="flex justify-between items-center mt-auto pt-6 border-t border-earth-50 dark:border-earth-800">
            <span className="text-[10px] font-black bg-earth-50 dark:bg-earth-800 text-earth-600 dark:text-earth-400 px-3 py-1.5 rounded-lg uppercase tracking-widest">
              {newsSegments.filter(s => s.tags.includes(cat.name)).length} New Records
            </span>
            <div className={`p-2 rounded-full transition-all ${activeCategoryFilter === cat.name ? 'bg-agro-600 text-white' : 'bg-earth-50 dark:bg-earth-800 text-earth-300 group-hover:text-agro-600'}`}>
              <ArrowRight size={18} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
