
import React from 'react';
import { View } from '../types';
import { ArrowRight, Activity, Globe, Sprout, Database, ChevronRight, PlayCircle, Star } from 'lucide-react';
import { THRUSTS, DATASETS } from '../data';

interface HeroProps {
  onNavigate: (view: View) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  // Get latest 3 public datasets
  const latestResources = DATASETS
    .filter(d => d.access === 'Public')
    .slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      
      {/* 1. HERO BANNER */}
      <div className="relative bg-agro-950 text-white min-h-[85vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1625246333195-551e51245128?q=80&w=1932&auto=format&fit=crop" 
                alt="Sustainable Agriculture" 
                className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-agro-950 via-agro-900/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-agro-800/50 border border-agro-600 backdrop-blur-md text-agro-300 text-xs font-bold uppercase tracking-wider mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Live Network: 15k+ Active Stakeholders
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Harmonizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-agro-400 to-green-300">Nature</span> <br />
            and <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Innovation</span>
          </h1>
          
          <p className="text-xl text-agro-100 max-w-3xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            EnvirosAgro establishes a comprehensive network advancing agricultural sustainability. 
            Guided by the <strong>Five Thrusts Framework</strong> and the <strong>Sustainability Coefficient C(a)</strong>, 
            we quantify resilience to ensure the future of farming.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <button 
              onClick={() => onNavigate(View.SUSTAINABILITY_FRAMEWORK)}
              className="bg-agro-600 hover:bg-agro-500 text-white font-bold py-4 px-10 rounded-full transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] flex items-center gap-3 transform hover:-translate-y-1"
            >
              Explore Framework <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => onNavigate(View.AI_ADVISOR)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold py-4 px-10 rounded-full transition-all flex items-center gap-3"
            >
              Ask AI Consultant
            </button>
          </div>
        </div>
      </div>

      {/* 2. MISSION STRIP */}
      <div className="bg-agro-600 py-8 px-6 relative z-20 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center text-center gap-4 md:gap-8">
            <span className="font-serif italic text-agro-100 text-lg opacity-80">Our Mission:</span>
            <span className="text-xl md:text-2xl font-bold text-white tracking-wide">
                "To ensure agriculture and its environ is smooth, reliable and safe."
            </span>
        </div>
      </div>

      {/* 3. THE FIVE THRUSTS */}
      <div className="py-24 bg-earth-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-agro-900 mb-4">The Five Thrusts of Agriculture</h2>
            <p className="text-earth-600 max-w-2xl mx-auto text-lg">
              Our holistic model organizes sustainability progression into five interconnected domains, moving from foundational social structures to advanced industrial scalability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {THRUSTS.map((thrust) => (
              <div 
                key={thrust.id} 
                className={`bg-white p-8 rounded-[2rem] shadow-sm border ${thrust.borderColor} hover:shadow-2xl hover:border-transparent transition-all group cursor-pointer relative overflow-hidden`}
                onClick={() => onNavigate(View.SUSTAINABILITY_FRAMEWORK)}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 ${thrust.color.split(' ')[0]} rounded-bl-[4rem] opacity-20 transition-transform group-hover:scale-150`}></div>
                
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${thrust.color} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                  {thrust.icon}
                </div>
                
                <h3 className="text-lg font-bold text-agro-900 mb-3 group-hover:text-agro-700 transition-colors">{thrust.title}</h3>
                <p className="text-sm text-earth-600 leading-relaxed mb-4">
                  {thrust.description}
                </p>
                
                <div className="flex items-center text-xs font-bold text-agro-600 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Learn More <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. METRIC / SCIENCE SECTION */}
      <div className="bg-white py-24 px-6 border-y border-earth-100 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
             <Activity size={400} className="text-agro-900 absolute -left-20 top-20" />
         </div>

         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8 relative z-10">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                  <Database size={14} /> Data-Driven Ecology
               </div>
               <h2 className="text-4xl md:text-5xl font-serif font-bold text-agro-900 leading-tight">
                  We don't just guess at sustainability. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-agro-600 to-blue-500">We measure it.</span>
               </h2>
               <p className="text-xl text-earth-600 leading-relaxed">
                  By treating agriculture as a dependent variable of nature, we calculate the <strong>Sustainable Time Constant m(t)</strong> to predict system resilience against environmental shocks.
               </p>
               
               <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-earth-50 border border-earth-100">
                     <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><Globe size={24} /></div>
                     <div>
                        <h4 className="font-bold text-earth-900 text-lg">Global Network</h4>
                        <p className="text-sm text-earth-500">Connecting 15k+ stakeholders</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-earth-50 border border-earth-100">
                     <div className="bg-green-100 p-3 rounded-xl text-green-600"><Sprout size={24} /></div>
                     <div>
                        <h4 className="font-bold text-earth-900 text-lg">Resilient Crops</h4>
                        <p className="text-sm text-earth-500">Optimized for local m(t) scores</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="lg:w-1/2 w-full">
               <div className="bg-agro-950 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-white transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute top-0 right-0 p-12 bg-white/5 rounded-bl-full"></div>
                  
                  <h3 className="text-2xl font-bold text-agro-300 mb-2">The Sustainability Equation</h3>
                  <p className="text-agro-400 text-sm mb-8 font-mono">EnvirosAgro Proprietary Metric</p>
                  
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 mb-8 overflow-x-auto">
                     <div className="font-serif text-3xl md:text-5xl text-white font-bold text-center whitespace-nowrap">
                        m = √[((Dn × In) × C(a)) / S]
                     </div>
                  </div>
                  
                  <div className="space-y-4 text-sm text-agro-200">
                      <div className="flex justify-between border-b border-white/10 pb-2">
                          <span><strong>Dn</strong>: Rainfall Duration</span>
                          <span><strong>In</strong>: Soil Moisture / Irrigation</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                          <span><strong>C(a)</strong>: Sustainability Coefficient</span>
                          <span><strong>S</strong>: Crop Requirement</span>
                      </div>
                  </div>

                  <button 
                    onClick={() => onNavigate(View.SUSTAINABILITY_FRAMEWORK)}
                    className="w-full mt-8 bg-agro-500 hover:bg-agro-400 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                     Run Simulation <PlayCircle size={20} />
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* 5. LATEST INTELLIGENCE (Dynamic) */}
      <div className="bg-earth-50 py-24 px-6">
          <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                  <div>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-agro-900 mb-4">Latest Intelligence</h2>
                      <p className="text-earth-600 max-w-xl">Fresh insights, research, and datasets from our global knowledge hub.</p>
                  </div>
                  <button 
                    onClick={() => onNavigate(View.KNOWLEDGE)}
                    className="text-agro-700 font-bold hover:text-agro-900 flex items-center gap-2 group"
                  >
                      View Knowledge Hub <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {latestResources.map((item) => (
                      <div key={item.id} className="bg-white rounded-3xl p-6 shadow-sm border border-earth-200 hover:shadow-xl transition-all group flex flex-col">
                          <div className="flex items-start justify-between mb-4">
                              <span className="bg-earth-100 text-earth-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                  {item.domain.split(':')[0]}
                              </span>
                              <span className="text-xs text-earth-400 font-medium">{item.date}</span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-earth-900 mb-3 group-hover:text-agro-700 transition-colors line-clamp-2">
                              {item.name}
                          </h3>
                          
                          <div className="flex items-center gap-3 mb-6">
                              <div className="flex items-center gap-1 text-xs text-earth-500 font-bold bg-earth-50 px-2 py-1 rounded">
                                  <Globe size={12} /> {item.region}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-earth-500 font-bold bg-earth-50 px-2 py-1 rounded">
                                  <Database size={12} /> {item.category}
                              </div>
                          </div>

                          <div className="mt-auto pt-4 border-t border-earth-100 flex justify-between items-center">
                              <span className="text-xs font-mono text-earth-400">{item.type}</span>
                              <button 
                                onClick={() => onNavigate(View.KNOWLEDGE)}
                                className="bg-agro-50 text-agro-700 p-2 rounded-full hover:bg-agro-600 hover:text-white transition-all"
                              >
                                  <ArrowRight size={18} />
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* 6. CTA SECTION */}
      <div className="bg-agro-900 text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
           <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 text-agro-300 backdrop-blur-sm">
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
