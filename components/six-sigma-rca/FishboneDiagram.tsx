import React from 'react';
import { ChevronRight } from 'lucide-react';
import { FISHBONE_CATEGORIES } from './constants';

export const FishboneDiagram = () => {
  return (
    <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg text-earth-900 dark:text-white">Ishikawa (Fishbone) Diagram</h4>
          <p className="text-sm text-earth-600 dark:text-earth-400">Categorizing potential causes to find the root source of the problem.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {FISHBONE_CATEGORIES.map(cat => (
            <div key={cat.label} className="p-5 bg-earth-50 dark:bg-earth-800/40 rounded-xl border border-earth-100 dark:border-earth-800 transition-all hover:shadow-md hover:scale-[1.02]">
              <h4 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-3">{cat.label}</h4>
              <ul className="space-y-2.5">
                {cat.causes.map(cause => (
                  <li key={cause} className="flex items-start gap-2 text-sm font-medium text-earth-700 dark:text-earth-300">
                    <ChevronRight size={14} className="text-purple-500 mt-1 shrink-0" />
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
    </div>
  )
}