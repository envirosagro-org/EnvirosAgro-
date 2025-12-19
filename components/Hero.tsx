import React from 'react';
import { View } from '../types';
import { 
  ArrowRight, Activity, Globe, Sprout, Database, ChevronRight, PlayCircle, Star, 
  Users, TrendingUp, ShieldCheck, Leaf, ShoppingBag, MessageSquare, MonitorPlay, 
  Mic, Play, Film, Volume2, ArrowUpRight
} from 'lucide-react';
import { THRUSTS, DATASETS } from './data';

interface HeroProps {
  onNavigate: (view: View) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  // Get latest 3 public datasets
  const latestResources = DATASETS
    .filter(d => d.access === 'Public')
    .slice(0, 3);

  return (
    <div className="flex flex-col w-full bg-earth-50 dark:bg-earth-950 transition-colors duration-300">
      
      {/* 1. IMMERSIVE HERO BANNER */}
      <div className="relative bg-agro-950 text-white min-h-[90vh] flex items-center justify-center px-6 overflow-hidden rounded-b-[3rem] shadow-2xl">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1625246333195-551e51245128?q=80&w=1932&auto=format&fit=crop" 
                alt="Sustainable Agriculture" 
                className="w-full h-full object-cover opacity-40 transform scale-105 animate-[pulse_60s_ease-in-out_infinite]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-agro-950/80 via-agro-900/60 to-agro-950"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 text-xs font-bold uppercase tracking-wider mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Live Network: 15,420+ Active Stakeholders
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Harmonizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Nature</span> <br className="hidden md:block" />
            and <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Innovation</span>
          </h1>
          
          <p className="text-xl text-agro-100 max-w-3xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            EnvirosAgro establishes a global network advancing sustainability. 
            Guided by the <strong>Five Thrusts Framework</strong>, we quantify resilience using the <strong>Sustainability Coefficient C(a)</strong> to secure the future of farming.
          </p>
          
          {/* Persona Pathways */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
             <button onClick={() => onNavigate(View.CUSTOMER)} className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-400 p-4 rounded-2xl transition-all">
                <Users className="mx-auto mb-2 text-green-400 group-hover:scale-110 transition-transform" />
                <span className="block text-sm font-bold">I am a Farmer</span>
             </button>
             <button onClick={() => onNavigate(View.KNOWLEDGE)} className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400 p-4 rounded-2xl transition-all">
                <Database className="mx-auto mb-2 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="block text-sm font-bold">I am a Researcher</span>
             </button>
             <button onClick={() => onNavigate(View.PARTNERSHIPS)} className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400 p-4 rounded-2xl transition-all">
                <Star className="mx-auto mb-2 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="block text-sm font-bold">I am a Partner</span>
             </button>
             <button onClick={() => onNavigate(View.INVESTOR_PORTAL)} className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400 p-4 rounded-2xl transition-all">
                <TrendingUp className="mx-auto mb-2 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="block text-sm font-bold">I am an Investor</span>
             </button>
          </div>
        </div>
      </div>

      {/* 2. LIVE IMPACT STRIP */}
      <div className="max-w-6xl mx-auto -mt-12 relative z-20 px-6">
        <div className="bg-white dark:bg-earth-900 rounded-2xl shadow-xl border border-earth-100 dark:border-earth-800 p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-earth-100 dark:divide-earth-800">
           <div className="text-center">
              <div className="text-3xl font-bold text-agro-600 dark:text-agro-400">2.4M</div>
              <div className="text-xs font-bold text-earth-400 uppercase tracking-wider mt-1">Data Points Collected</div>
           </div>
           <div className="text-center pl-4">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">120+</div>
              <div className="text-xs font-bold text-earth-400 uppercase tracking-wider mt-1">Countries Active</div>
           </div>
           <div className="text-center pl-4">
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">$12M</div>
              <div className="text-xs font-bold text-earth-400 uppercase tracking-wider mt-1">Sustainable Finance</div>
           </div>
           <div className="text-center pl-4">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">50k</div>
              <div className="text-xs font-bold text-earth-400 uppercase tracking-wider mt-1">Tons CO2 Offset</div>
           </div>
        </div>
      </div>

      {/* 3. MEDIA HIGHLIGHTS (NEW) */}
      <div className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-agro-900 dark:text-white mb-4">Latest from Media</h2>
                <p className="text-earth-600 dark:text-earth-400 max-w-2xl text-lg">
                    Discover the newest stories, broadcasts, and insights from across the EnvirosAgro network.
                </p>
              </div>
              <button 
                onClick={() => onNavigate(View.MEDIA)}
                className="bg-agro-600 text-white px-8 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-agro-700 transition-all shadow-lg hover:-translate-y-1"
              >
                  Enter Media Hub <ArrowUpRight size={18} />
              </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1: News */}
              <div onClick={() => onNavigate(View.PLANET_WATCH)} className="group bg-white dark:bg-earth-900 rounded-[2rem] overflow-hidden border border-earth-100 dark:border-earth-800 shadow-sm hover:shadow-2xl transition-all cursor-pointer">
                  <div className="h-48 overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                        Live News
                    </div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-earth-900 dark:text-white mb-2 leading-tight">Global Drought Impact: Horn of Africa Report</h3>
                    <p className="text-earth-500 dark:text-earth-400 text-sm mb-6 line-clamp-2">Analyzing severe rainfall deficits affecting crop yields in the region.</p>
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-black text-[10px] uppercase tracking-widest group-hover:gap-3 transition-all">
                        Watch Report <ArrowRight size={14} />
                    </div>
                  </div>
              </div>

              {/* Feature 2: Podcast */}
              <div onClick={() => onNavigate(View.PODCAST)} className="group bg-white dark:bg-earth-900 rounded-[2rem] overflow-hidden border border-earth-100 dark:border-earth-800 shadow-sm hover:shadow-2xl transition-all cursor-pointer">
                  <div className="h-48 overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                        Podcast
                    </div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border border-white/30 scale-0 group-hover:scale-100 transition-transform duration-500">
                            <Volume2 size={24} className="text-white" />
                        </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-earth-900 dark:text-white mb-2 leading-tight">Roots of Resilience: Indigenous Seed Saving</h3>
                    <p className="text-earth-500 dark:text-earth-400 text-sm mb-6 line-clamp-2">Discussion with Dr. Amani on the spiritual and biological connection to soil.</p>
                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-black text-[10px] uppercase tracking-widest group-hover:gap-3 transition-all">
                        Listen Now <ArrowRight size={14} />
                    </div>
                  </div>
              </div>

              {/* Feature 3: Documentary */}
              <div onClick={() => onNavigate(View.GREEN_LENS)} className="group bg-white dark:bg-earth-900 rounded-[2rem] overflow-hidden border border-earth-100 dark:border-earth-800 shadow-sm hover:shadow-2xl transition-all cursor-pointer">
                  <div className="h-48 overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                        Green Lens Original
                    </div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-earth-900 dark:text-white mb-2 leading-tight">The Great Green Wall: Cinema for Planet Earth</h3>
                    <p className="text-earth-500 dark:text-earth-400 text-sm mb-6 line-clamp-2">A cinematic journey across the Sahel following the African-led restoration initiative.</p>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-widest group-hover:gap-3 transition-all">
                        Stream Doc <ArrowRight size={14} />
                    </div>
                  </div>
              </div>
          </div>
      </div>

      {/* 4. THE FIVE THRUSTS (Carousel) */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 px-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-agro-900 dark:text-white mb-4">The Five Thrusts of Agriculture</h2>
            <p className="text-earth-600 dark:text-earth-400 max-w-2xl mx-auto text-lg">
              Our holistic model organizes sustainability progression into five interconnected domains, moving from foundational social structures to advanced industrial scalability.
            </p>
          </div>

          <div className="flex overflow-x-auto gap-6 px-6 pb-12 snap-x snap-mandatory scrollbar-hide">
            {THRUSTS.map((thrust) => (
              <div 
                key={thrust.id} 
                className={`min-w-[85vw] md:min-w-[350px] flex-shrink-0 snap-center bg-white dark:bg-earth-900 p-8 rounded-[2rem] shadow-sm border ${thrust.borderColor} dark:border-earth-800 hover:shadow-2xl hover:border-transparent transition-all group cursor-pointer relative overflow-hidden`}
                onClick={() => onNavigate(View.SUSTAINABILITY_FRAMEWORK)}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 ${thrust.color.split(' ')[0]} rounded-bl-[4rem] opacity-20 transition-transform group-hover:scale-150`}></div>
                
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${thrust.color} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                  {thrust.icon}
                </div>
                
                <h3 className="text-lg font-bold text-agro-900 dark:text-earth-100 mb-3 group-hover:text-agro-700 dark:group-hover:text-agro-400 transition-colors">{thrust.title}</h3>
                <p className="text-sm text-earth-600 dark:text-earth-400 leading-relaxed mb-4">
                  {thrust.description}
                </p>
                
                <div className="flex items-center text-xs font-bold text-agro-600 dark:text-agro-400 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Learn More <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. THE SUSTAINABILITY EQUATION */}
      <div className="bg-white dark:bg-earth-900 py-24 px-6 border-y border-earth-100 dark:border-earth-800 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
             <Activity size={400} className="text-agro-900 dark:text-white absolute -left-20 top-20" />
         </div>

         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8 relative z-10">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
                  <Database size={14} /> Data-Driven Ecology
               </div>
               <h2 className="text-4xl md:text-5xl font-serif font-bold text-agro-900 dark:text-white leading-tight">
                  We don't just guess at sustainability. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-agro-600 to-blue-500">We measure it.</span>
               </h2>
               <p className="text-xl text-earth-600 dark:text-earth-400 leading-relaxed">
                  By treating agriculture as a dependent variable of nature, we calculate the <strong>Sustainable Time Constant m(t)</strong> to predict system resilience against environmental shocks.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => onNavigate(View.SUSTAINABILITY_FRAMEWORK)} className="bg-agro-900 dark:bg-agro-600 text-white px-8 py-3 rounded-full font-bold hover:bg-agro-800 dark:hover:bg-agro-500 transition-colors flex items-center justify-center gap-2">
                     Use the Calculator <CalculatorIcon />
                  </button>
                  <button onClick={() => onNavigate(View.KNOWLEDGE)} className="bg-white dark:bg-earth-800 border border-earth-200 dark:border-earth-700 text-earth-700 dark:text-earth-300 px-8 py-3 rounded-full font-bold hover:bg-earth-50 dark:hover:bg-earth-700 transition-colors flex items-center justify-center gap-2">
                     Read Methodology
                  </button>
               </div>
            </div>

            <div className="lg:w-1/2 w-full">
               <div className="bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-white transform rotate-1 hover:rotate-0 transition-transform duration-500 border border-slate-700">
                  <div className="absolute top-0 right-0 p-12 bg-white/5 rounded-bl-full"></div>
                  
                  <div className="flex justify-between items-start mb-8">
                     <div>
                        <h3 className="text-2xl font-bold text-agro-300 mb-1">Resilience Metric</h3>
                        <p className="text-slate-400 text-sm font-mono">Formula v2.1</p>
                     </div>
                     <div className="p-3 bg-white/10 rounded-xl">
                        <Activity className="text-agro-400" />
                     </div>
                  </div>
                  
                  <div className="bg-black/30 p-8 rounded-2xl border border-white/10 mb-8 overflow-x-auto text-center">
                     <div className="font-serif text-3xl md:text-5xl text-white font-bold whitespace-nowrap tracking-wider">
                        m = √[((Dn × In) × C(a)) / S]
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs text-slate-300 font-mono">
                      <div className="p-2 border border-slate-700 rounded bg-slate-800/50">Dn: Rainfall Duration</div>
                      <div className="p-2 border border-slate-700 rounded bg-slate-800/50">In: Soil Moisture</div>
                      <div className="p-2 border border-slate-700 rounded bg-slate-800/50">C(a): Sustain. Coeff.</div>
                      <div className="p-2 border border-slate-700 rounded bg-slate-800/50">S: Crop Req.</div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 6. EXPLORE THE ECOSYSTEM */}
      <div className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-agro-900 dark:text-white mb-4">Explore the Ecosystem</h2>
            <p className="text-earth-600 dark:text-earth-400 max-w-2xl mx-auto text-lg">
              From marketplace to media, discover how we integrate every aspect of the value chain.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             {/* Card 1: Marketplace */}
             <div onClick={() => onNavigate(View.PRODUCTS)} className="group bg-white dark:bg-earth-900 rounded-3xl overflow-hidden border border-earth-100 dark:border-earth-800 shadow-sm hover:shadow-xl transition-all cursor-pointer">
                <div className="h-48 overflow-hidden relative">
                   <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&auto=format&fit=crop&q=60" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <ShoppingBag size={12} className="text-agro-600" /> Products
                   </div>
                </div>
                <div className="p-8">
                   <h3 className="text-xl font-bold text-agro-900 dark:text-white mb-2">Sustainable Marketplace</h3>
                   <p className="text-earth-600 dark:text-earth-400 text-sm mb-4">Access vetted inputs, machinery, and tools tailored for regenerative farming.</p>
                   <span className="text-agro-600 dark:text-agro-400 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Shop Now <ArrowRight size={16} /></span>
                </div>
             </div>

             {/* Card 2: Community */}
             <div onClick={() => onNavigate(View.COMMUNITY)} className="group bg-white dark:bg-earth-900 rounded-3xl overflow-hidden border border-earth-100 dark:border-earth-800 shadow-sm hover:shadow-xl transition-all cursor-pointer">
                <div className="h-48 overflow-hidden relative">
                   <img src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&auto=format&fit=crop&q=60" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Users size={12} className="text-blue-600" /> Network
                   </div>
                </div>
                <div className="p-8">
                   <h3 className="text-xl font-bold text-agro-900 dark:text-white mb-2">Community & ID</h3>
                   <p className="text-earth-600 dark:text-earth-400 text-sm mb-4">Register your group, get your ESIN, and connect with 15k+ stakeholders.</p>
                   <span className="text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Join Network <ArrowRight size={16} /></span>
                </div>
             </div>

             {/* Card 3: Media */}
             <div onClick={() => onNavigate(View.MEDIA)} className="group bg-white dark:bg-earth-900 rounded-3xl overflow-hidden border border-earth-100 dark:border-earth-800 shadow-sm hover:shadow-xl transition-all cursor-pointer">
                <div className="h-48 overflow-hidden relative">
                   <img src="https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=800&auto=format&fit=crop&q=60" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <MonitorPlay size={12} className="text-red-600" /> Media
                   </div>
                </div>
                <div className="p-8">
                   <h3 className="text-xl font-bold text-agro-900 dark:text-white mb-2">EnvirosAgro Media</h3>
                   <p className="text-earth-600 dark:text-earth-400 text-sm mb-4">Podcasts, webinars, and documentaries covering the latest in ag-tech.</p>
                   <span className="text-red-600 dark:text-red-400 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Watch Now <ArrowRight size={16} /></span>
                </div>
             </div>
          </div>
      </div>

      {/* 6. CTA SECTION */}
      <div className="bg-agro-900 text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
           <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 text-agro-300">
               <Star size={32} fill="currentColor" />
           </div>
           
           <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ready to Join the Network?</h2>
           <p className="text-agro-100 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
             Whether you are a farmer, researcher, or industrial partner, EnvirosAgro provides the framework, data, and capital to advance your sustainability goals.
           </p>
           
           <div className="flex flex-wrap justify-center gap-6">
              <button 
                onClick={() => onNavigate(View.SIGN_UP)}
                className="bg-white text-agro-900 font-bold py-4 px-10 rounded-full hover:bg-agro-50 transition-colors shadow-lg"
              >
                Register Now
              </button>
              <button 
                onClick={() => onNavigate(View.COMMUNITY)}
                className="bg-transparent border-2 border-agro-500 text-white font-bold py-4 px-10 rounded-full hover:bg-agro-800 transition-colors"
              >
                Get Social ID (ESIN)
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

// Helper Icon for Calculator
function CalculatorIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
  )
}