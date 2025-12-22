import React from 'react';
import { Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 text-[10px] font-black uppercase tracking-[0.5em] mb-8 animate-pulse">
        <Sparkles size={16} fill="currentColor" /> Predictive Vision Lab
      </div>
      <h2 className="text-5xl md:text-7xl font-serif font-black text-agro-900 dark:text-white tracking-tighter mb-6">
        Future <span className="text-purple-600 italic">Simulations</span>
      </h2>
      <p className="text-xl text-earth-500 dark:text-earth-400 max-w-2xl mx-auto font-medium">
        Visualize your localized $m(t)$ optimized future. Describe your ideal sustainable ecosystem and let our neural network render the outcome.
      </p>
    </div>
  );
};
