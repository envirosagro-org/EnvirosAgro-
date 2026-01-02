import React from 'react';
import { View } from '../../types';
import { Sparkles, Network, Terminal, Send } from 'lucide-react';

interface HeroHeaderProps {
  onNavigate: (view: View, searchQuery?: string) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleSearchSubmit: (e?: React.FormEvent) => void;
  trendingTags: string[];
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ 
  onNavigate, 
  searchValue, 
  setSearchValue, 
  handleSearchSubmit, 
  trendingTags 
}) => {
  return (
    <div className="lg:col-span-7 text-left animate-in fade-in slide-in-from-left-20 duration-1000">
      <div className="ea-header-block bg-white/5 backdrop-blur-3xl border-white/10 p-10 md:p-14 mb-8 shadow-cinematic-xl ring-1 ring-white/10 rounded-[4rem]">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-agro-500/10 border border-agro-500/20 text-agro-500 text-[10px] font-black uppercase tracking-[0.5em] mb-12 shadow-sm">
          <div className="w-2 h-2 bg-agro-500 rounded-full animate-ping"></div>
          QUANTIFYING GLOBAL RESILIENCE
        </div>
        
        <h1 className="text-[clamp(3.5rem,9vw,9rem)] font-serif font-black text-slate-900 dark:text-white mb-12 tracking-tighter leading-[0.82] md:leading-[0.8]">
          Predictive <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-agro-400 via-blue-400 to-emerald-400 italic pr-6 pb-2 inline-block">Stability</span>
        </h1>
        
        <p className="text-xl md:text-3xl text-slate-500 dark:text-slate-300 max-w-2xl mb-16 leading-relaxed font-medium text-balance text-wrap">
          The first interdisciplinary network standardizing agricultural resilience through the <span className="text-agro-500 font-black">Five Thrusts</span> and the <span className="text-blue-500 font-mono">m(t)</span> constant.
        </p>

        <div className="flex flex-wrap gap-6 mb-16">
          <button 
              onClick={() => onNavigate(View.FUTURE_VISION)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-black py-7 px-16 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(147,51,234,0.4)] hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-[0.4em] flex items-center gap-6 group"
          >
              Future Vision Lab <Sparkles size={24} fill="currentColor" className="group-hover:rotate-12 transition-transform" />
          </button>
          <button 
              onClick={() => onNavigate(View.NETWORK_INPUT_HUB)}
              className="bg-white/5 hover:bg-white/10 dark:bg-white/5 backdrop-blur-xl text-slate-900 dark:text-white px-16 py-7 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.4em] border border-white/10 transition-all flex items-center gap-6 shadow-xl active:scale-95"
          >
              Node Ingest Hub <Network size={24} className="text-blue-500" />
          </button>
        </div>

        <div className="max-w-2xl">
          <form onSubmit={handleSearchSubmit} className="relative group mb-6">
              <div className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-agro-500 transition-colors">
                <Terminal size={28} />
              </div>
              <input 
                  type="text" 
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Query Global Intelligence Ledger..." 
                  className="w-full bg-white/5 border border-white/10 rounded-[3rem] py-9 pl-24 pr-40 text-slate-900 dark:text-white placeholder-slate-600 focus:outline-none focus:ring-[12px] focus:ring-agro-500/5 transition-all font-bold text-2xl shadow-inner backdrop-blur-md"
              />
              <button 
                type="submit"
                disabled={!searchValue.trim()}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-agro-600 hover:bg-agro-500 disabled:bg-slate-800 text-white p-5 rounded-full shadow-2xl transition-all active:scale-90"
              >
                <Send size={24} />
              </button>
          </form>
          <div className="flex flex-wrap items-center gap-4 px-10">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Trending:</span>
            {trendingTags.map((tag) => (
              <button 
                key={tag}
                onClick={() => onNavigate(View.KNOWLEDGE, tag)}
                className="text-[10px] font-black text-agro-500 hover:text-agro-400 uppercase tracking-widest transition-colors"
              >
                #{tag.replace(/\s/g, '_').toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};