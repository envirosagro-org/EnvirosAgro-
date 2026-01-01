import React, { useState } from 'react';
import { GreenLensHero } from './greenlens/GreenLensHero';
import { GreenLensStats } from './greenlens/GreenLensStats';
import { FeaturedDoc } from './greenlens/FeaturedDoc';
import { DocsLibrary } from './greenlens/DocsLibrary';
import { FilmStrip } from './greenlens/FilmStrip';
import { HeroPlayer } from './greenlens/HeroPlayer';
import { ImpactStats } from './greenlens/ImpactStats';
import { 
  Play, Film, Eye, Share2, 
  Maximize2, Volume2, Sparkles, 
  Tv, Camera, Info, Target, ArrowLeft
} from 'lucide-react';
import { View } from '../types';

interface GreenLensProps {
  onNavigate?: (view: View) => void;
}

export const GreenLens: React.FC<GreenLensProps> = ({ onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-[#050a14] text-white selection:bg-agro-500 selection:text-white">
      {/* Immersive Cinema Mode (Optional overlay) */}
      {isPlaying && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center animate-in fade-in duration-1000">
           <div className="absolute top-10 right-10 z-[110]">
              <button 
                onClick={() => setIsPlaying(false)}
                className="p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md border border-white/20 transition-all group"
              >
                <Maximize2 size={24} className="group-hover:scale-110 transition-transform" />
              </button>
           </div>
           <HeroPlayer onEnded={() => setIsPlaying(false)} />
        </div>
      )}

      {/* Main Experience */}
      <div className={`${isPlaying ? 'hidden' : 'block'}`}>
        <div className="max-w-[1600px] mx-auto px-6 pt-6 relative z-10">
            <button 
                onClick={() => onNavigate?.(View.HOME)}
                className="flex items-center gap-2 text-slate-500 hover:text-agro-400 transition-colors text-sm font-bold uppercase tracking-widest"
            >
                <ArrowLeft size={16} /> Back to Home
            </button>
        </div>
        <GreenLensHero onPlay={() => setIsPlaying(true)} />
        
        {/* Visual Impact Ticker */}
        <div className="bg-agro-600 py-3 relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-r from-agro-600 via-agro-500 to-agro-600 animate-pulse"></div>
           <div className="flex whitespace-nowrap animate-marquee relative z-10">
              {[1,2,3,4].map(i => (
                <span key={i} className="text-[10px] font-black uppercase tracking-[0.5em] text-white/80 mx-10 flex items-center gap-4">
                  <Camera size={14}/> LIVE_VISUAL_AUDIT: SECTOR-ALPHA_SUCCESSFUL
                  <Tv size={14}/> BROADCASTING_RESILIENCE_DOCS
                  <Sparkles size={14}/> 4K_UPLINK_STABLE
                </span>
              ))}
           </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 py-20">
           <div className="grid lg:grid-cols-4 gap-8 mb-24">
              {[
                { label: 'Total Content Hours', val: '420+', icon: <Film className="text-agro-400" /> },
                { label: 'Active Viewers', val: '12.8K', icon: <Eye className="text-blue-400" /> },
                { label: 'Visual Data Nodes', val: '1,204', icon: <Target className="text-purple-400" /> },
                { label: 'System Compliance', val: 'Verified', icon: <Sparkles className="text-amber-400" /> }
              ].map((stat, i) => (
                <div key={i} className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl group hover:border-agro-500/30 transition-all cursor-default relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:scale-125 transition-transform duration-1000">
                      {React.cloneElement(stat.icon as React.ReactElement, { size: 120 })}
                   </div>
                   <div className="flex items-center justify-between mb-8 relative z-10">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-agro-500/10 transition-colors">
                        {stat.icon}
                      </div>
                      <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5">
                        <Info size={16} className="text-slate-500"/>
                      </button>
                   </div>
                   <h4 className="text-slate-500 font-black text-[10px] uppercase tracking-[0.5em] mb-2">{stat.label}</h4>
                   <p className="text-3xl font-black text-white tracking-tighter">{stat.val}</p>
                </div>
              ))}
           </div>

           <div className="flex flex-col lg:flex-row gap-12 mb-32 items-center">
              <div className="lg:w-1/3">
                 <div className="ea-label-meta mb-6 text-agro-500">Cinematic Evidence</div>
                 <h2 className="text-5xl lg:text-7xl font-serif font-black text-white leading-none tracking-tighter mb-8">
                   The <span className="text-agro-500 italic">Visual</span> Standard
                 </h2>
                 <p className="text-xl text-slate-400 font-medium leading-relaxed mb-10 italic">
                   Documenting the transformation of degraded landscapes into thriving ecosystems through the lens of agricultural innovation.
                 </p>
                 <div className="flex flex-wrap gap-4">
                    <button className="flex items-center gap-3 bg-white text-black px-8 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-agro-500 hover:text-white transition-all shadow-glow-white">
                       Enter Archive <Play size={16} fill="currentColor" />
                    </button>
                    <button className="flex items-center gap-3 bg-white/5 text-white border border-white/10 px-8 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                       Share Impact <Share2 size={16} />
                    </button>
                 </div>
              </div>
              <div className="lg:w-2/3 w-full">
                 <div className="relative rounded-[4rem] overflow-hidden border-8 border-white/5 shadow-cinematic-2xl group cursor-pointer" onClick={() => setIsPlaying(true)}>
                    <div className="absolute inset-0 bg-agro-900/20 group-hover:bg-transparent transition-colors duration-1000 z-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                       <div className="w-24 h-24 bg-white text-black rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500">
                          <Play size={40} fill="currentColor" className="ml-2" />
                       </div>
                    </div>
                    <img 
                      src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600" 
                      className="w-full h-full object-cover aspect-video group-hover:scale-105 transition-transform duration-[2000ms]" 
                      alt="Featured Document" 
                    />
                    <div className="absolute bottom-0 left-0 w-full p-12 bg-gradient-to-t from-black/90 to-transparent z-20">
                       <div className="flex items-center gap-6 mb-4">
                          <span className="px-4 py-1.5 bg-agro-600 text-[10px] font-black uppercase tracking-widest rounded-full">New Series</span>
                          <span className="flex items-center gap-2 text-[10px] font-bold text-slate-300"><Volume2 size={14}/> Stereo Uplink</span>
                       </div>
                       <h3 className="text-3xl font-bold">Earth Reclamation: Sector Alpha</h3>
                    </div>
                 </div>
              </div>
           </div>

           <div className="mb-32">
              <div className="flex items-center justify-between mb-16">
                 <div>
                    <h3 className="text-3xl font-black text-white flex items-center gap-4">
                       <Film className="text-agro-500" /> Documentary Library
                    </h3>
                    <p className="text-slate-500 text-sm mt-2 tracking-wide font-medium">Curated visual data for industrial stakeholders.</p>
                 </div>
                 <div className="hidden md:flex gap-4">
                    {['ALL', 'INDUSTRIAL', 'REGENERATIVE', 'CLIMATE'].map(cat => (
                       <button key={cat} className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                          {cat}
                       </button>
                    ))}
                 </div>
              </div>
              <DocsLibrary />
           </div>

           <div className="grid lg:grid-cols-3 gap-12 mb-32">
              <div className="lg:col-span-2">
                 <FilmStrip />
              </div>
              <div className="space-y-10">
                 <ImpactStats />
                 <div className="bg-gradient-to-br from-agro-900 to-indigo-950 p-12 rounded-[3.5rem] relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] transition-transform duration-1000 group-hover:rotate-12 group-hover:scale-125"><Tv size={200} /></div>
                    <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-6 flex items-center gap-3 text-agro-400">
                      <Sparkles size={16} fill="currentColor" /> Strategic Feed
                    </h4>
                    <p className="text-sm font-medium leading-relaxed relative z-10 italic mb-8">
                      &quot;The Sector Alpha time-lapse has been verified for industrial compliance, showcasing a 220% increase in biodiversity markers over 36 months.&quot;
                    </p>
                    <button className="relative z-10 w-full bg-white text-black font-black py-5 rounded-[1.5rem] text-[10px] uppercase tracking-widest hover:bg-agro-500 hover:text-white transition-all">
                       Download Media Kit
                    </button>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-white/5 border-t border-white/5 py-24 text-center">
           <div className="max-w-4xl mx-auto px-6">
              <h3 className="text-4xl font-serif font-black italic mb-8 leading-tight">
                 &quot;Visual evidence is the final frontier of agricultural accountability.&quot;
              </h3>
              <p className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-500">EnvirosAgro Cinematic Division</p>
           </div>
        </div>
      </div>
    </div>
  );
};
