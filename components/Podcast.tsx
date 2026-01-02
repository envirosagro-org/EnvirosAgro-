import React from 'react';
import { PodcastHero } from './podcast/PodcastHero';
import { FeaturedEpisode } from './podcast/FeaturedEpisode';
import { EpisodeList } from './podcast/EpisodeList';
import { RegionalCuratedSection } from './podcast/RegionalCuratedSection';
import { SubscribeCta } from './podcast/SubscribeCta';
import { 
  Mic2, Radio, Activity, Globe, Sparkles, 
  Search, Filter, ChevronRight, Headphones, ArrowLeft
} from 'lucide-react';
import { View } from '../types';

interface PodcastProps {
  onNavigate?: (view: View) => void;
}

const Podcast: React.FC<PodcastProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-earth-950 text-earth-900 dark:text-white overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-agro-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <button 
                onClick={() => onNavigate?.(View.HOME)}
                className="flex items-center gap-2 text-earth-400 hover:text-indigo-600 transition-colors text-sm font-bold uppercase tracking-widest"
            >
                <ArrowLeft size={16} /> Back to Home
            </button>
        </div>

        <PodcastHero />

        {/* Global Podcast Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 mb-24">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Listens', val: '1.2M+', icon: <Headphones className="text-indigo-600" /> },
                { label: 'Global Rank', val: 'Top 1%', icon: <Globe className="text-blue-600" /> },
                { label: 'Avg. Rating', val: '4.9/5', icon: <Sparkles className="text-amber-500" /> },
                { label: 'Live Uplinks', val: '24', icon: <Radio className="text-agro-600" /> }
              ].map((stat, i) => (
                <div key={i} className="bg-white/80 dark:bg-earth-900/80 backdrop-blur-xl p-6 rounded-[2rem] border border-earth-100 dark:border-earth-800 shadow-xl group hover:scale-[1.05] transition-all cursor-default">
                   <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-earth-50 dark:bg-earth-800 rounded-2xl group-hover:bg-indigo-50 transition-colors">
                        {stat.icon}
                      </div>
                      <Activity size={16} className="text-earth-200" />
                   </div>
                   <h4 className="text-earth-500 dark:text-earth-400 font-bold text-[10px] uppercase tracking-widest">{stat.label}</h4>
                   <p className="text-2xl font-black text-earth-900 dark:text-white mt-1">{stat.val}</p>
                </div>
              ))}
           </div>
        </div>

        <FeaturedEpisode />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
           <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
              <div className="max-w-2xl">
                 <div className="ea-label-meta mb-4 text-indigo-600">Secure Audio Stream</div>
                 <h2 className="text-4xl lg:text-5xl font-serif font-black text-earth-900 dark:text-white leading-tight">
                    Voice of the <span className="text-indigo-600 italic">Ecosystem</span>
                 </h2>
                 <p className="text-lg text-earth-500 mt-4 font-medium italic">High-fidelity strategic dialogues with the pioneers of agricultural resilience.</p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search episodes..." 
                      className="bg-earth-50 dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all w-full md:w-64"
                    />
                 </div>
                 <button className="p-4 bg-earth-50 dark:bg-earth-900 rounded-2xl border border-earth-100 dark:border-earth-800 text-earth-400 hover:text-indigo-600 transition-all">
                    <Filter size={20} />
                 </button>
              </div>
           </div>
           
           <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                 <EpisodeList />
              </div>
              <div className="space-y-10">
                 <RegionalCuratedSection />
                 
                 <div className="bg-indigo-900 text-white p-10 rounded-[3rem] relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Mic2 size={160} /></div>
                    <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-6 flex items-center gap-3 text-indigo-300">
                      <Sparkles size={16} fill="currentColor" /> Episode Intelligence
                    </h4>
                    <p className="text-sm font-medium leading-relaxed relative z-10 italic mb-8">
                      &quot;The latest discussion on regenerative soil metrics is currently trending in the Eastern Node, showing a 42% engagement spike.&quot;
                    </p>
                    <button className="relative z-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] bg-white/10 hover:bg-white/20 px-6 py-4 rounded-xl transition-all">
                      View Deep Analysis <ChevronRight size={14} />
                    </button>
                 </div>

                 <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-8 rounded-[3rem] shadow-sm">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                       <Activity className="text-indigo-600" /> Live Listener Node Map
                    </h3>
                    <div className="aspect-video bg-earth-50 dark:bg-earth-800 rounded-[2rem] relative overflow-hidden border border-earth-100 dark:border-earth-800">
                       <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800" className="w-full h-full object-cover opacity-20" alt="Map" />
                       <div className="absolute inset-0 bg-indigo-500/10 backdrop-blur-[1px]"></div>
                       {[
                         { top: '20%', left: '30%' },
                         { top: '60%', left: '70%' },
                         { top: '40%', left: '50%' }
                       ].map((pos, i) => (
                         <div key={i} className="absolute w-3 h-3 bg-indigo-500 rounded-full animate-ping" style={pos}></div>
                       ))}
                       <div className="absolute bottom-4 left-4 right-4 bg-white/80 dark:bg-earth-900/80 backdrop-blur-md p-3 rounded-xl border border-white/20 text-center">
                          <span className="text-[9px] font-black text-earth-900 dark:text-white uppercase tracking-widest">3,421 Active Uplinks</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <SubscribeCta />
      </div>
    </div>
  );
};

export default Podcast;