import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Microscope, Sprout, CloudRain, ArrowRight, ShieldCheck, Zap, 
  Search, Filter, Info, X, Clock, DollarSign, CheckCircle2, 
  MessageSquare, BrainCircuit, Globe, Activity, Star, Layers,
  ChevronRight, ArrowUpRight, BarChart3, FlaskConical, Droplet,
  Dna, Cpu, Factory, Users, ShieldAlert, Sparkles, Loader2,
  Telescope, Beaker, Binary, Atom,
  Leaf, TrendingUp
} from 'lucide-react';
import { View } from '../types';
import { GoogleGenerativeAI } from "@google/generative-ai";

const SERVICES = [
  {
    id: 'soil-genomics',
    title: "Soil Genomic Metagenomics",
    description: "Advanced DNA sequencing of soil biomes to map beneficial microbial networks and identify potential pathogenic threats at the molecular level.",
    price: "From $180/Plot",
    duration: "7-10 Business Days",
    icon: <Dna size={28} />,
    thrust: "TA",
    thrustName: "Technical",
    target: View.FARM_SCOUT,
    protocols: [
      "Metagenomic shotgun sequencing",
      "Microbial diversity index (Shannon-Wiener) calibration",
      "Pathogen DNA signature detection",
      "Functional gene mapping for Nitrogen fixation"
    ],
    deliverables: "Full Genomic Soil Profile + Targeted Biological Re-inoculation Plan",
    image: "https://images.unsplash.com/photo-1579033390041-995f33f4a4d1?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 'isotopic-water',
    title: "Isotopic Water Fingerprinting",
    description: "Stable isotope analysis (O18/H2) to determine exact water source recharge rates and underground aquifer health.",
    price: "Custom Quote",
    duration: "14 Business Days",
    icon: <Atom size={28} />,
    thrust: "EA",
    thrustName: "Environmental",
    target: View.ROADMAP_AI,
    protocols: [
      "Isotopic ratio mass spectrometry (IRMS)",
      "Hydrological source identification",
      "Evapotranspiration rate modeling",
      "Aquifer stress-test analysis"
    ],
    deliverables: "Regional Hydrological Health Audit + Water Security Strategy",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 'precision-diagnostics',
    title: "AI-Powered NIR Spectroscopy",
    description: "Near-Infrared spectral analysis for non-destructive, real-time testing of crop nutrient density and health indicators.",
    price: "$65/Consult",
    duration: "Instant Output",
    icon: <Cpu size={28} />,
    thrust: "TA",
    thrustName: "Technical",
    target: View.CROP_DOCTOR,
    protocols: [
      "Field NIR reflectance calibration",
      "Chlorophyll fluorescence measurement",
      "Dry matter & nutrient density quantification",
      "Spectral anomaly detection"
    ],
    deliverables: "Live Field Telemetry Dashboard + Corrective Fertigation Protocol",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 'industrial-audit',
    title: "Value-Chain Integrity Audit",
    description: "Multi-point technical audit of processing facilities to ensure compliance with global industrial safety and sustainability standards.",
    price: "$450/Unit",
    duration: "5 Business Days",
    icon: <Factory size={28} />,
    thrust: "IA",
    thrustName: "Industrial",
    target: View.SUPPLY_CHAIN_AUDIT,
    protocols: [
      "Energy efficiency delta analysis",
      "Effluent & waste management audit",
      "Automation logic verification",
      "Industrial safety m-score calculation"
    ],
    deliverables: "Certified Industrial Integrity Certificate + Optimization Roadmap",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=60"
  }
];

const THRUST_TAGS = [
  { id: 'All', icon: <Layers size={14}/> },
  { id: 'SA', icon: <Users size={14}/> },
  { id: 'EA', icon: <Leaf size={14}/> },
  { id: 'HA', icon: <ShieldAlert size={14}/> },
  { id: 'TA', icon: <Cpu size={14}/> },
  { id: 'IA', icon: <Factory size={14}/> }
];

interface ServicesProps {
  onNavigate?: (view: View) => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const [activeThrust, setActiveThrust] = useState('All');
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const [isAiConsulting, setIsAiConsulting] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
  
  const filteredServices = useMemo(() => {
    if (activeThrust === 'All') return SERVICES;
    return SERVICES.filter(s => s.thrust === activeThrust);
  }, [activeThrust]);

  const handleAiConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim() || isAiConsulting) return;

    setIsAiConsulting(true);
    setAiRecommendation(null);

    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY as string);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-preview"});
      const prompt = `You are the Lead Scientific Advisor for EnvirosAgro. 
        A user is describing a technical or operational agricultural challenge: "${aiInput}".
        
        Our current scientific service catalog includes:
        - Soil Genomic Metagenomics (TA): Deep DNA analysis of soil biomes.
        - Isotopic Water Fingerprinting (EA): Source and recharge analysis using stable isotopes.
        - AI-Powered NIR Spectroscopy (TA): Real-time nutrient density testing.
        - Value-Chain Integrity Audit (IA): Industrial compliance and efficiency optimization.
        
        Based on their query, recommend the most appropriate scientific protocol. 
        Explain the "Why" using high-level scientific terminology aligned with our Five Thrusts. 
        Reference the Sustainable Time Constant m(t) where applicable. 
        Keep the response to 3-4 professional, technical sentences.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setAiRecommendation(text);
    } catch (err) {
      console.error("Scientific AI Error:", err);
      setAiRecommendation("Satellite uplink to the Intelligence Core interrupted. Please initiate manual service selection.");
    } finally {
      setIsAiConsulting(false);
    }
  };

  return (
    <div className="bg-[#fafaf9] dark:bg-earth-950 min-h-screen transition-colors duration-500 pb-32">
      
      {/* 1. HERO & SCIENTIFIC ADVISOR */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-agro-600 pointer-events-none transition-transform duration-[10s]"><Beaker size={600} /></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-20 items-center relative z-10">
           <div className="lg:col-span-7 animate-in fade-in slide-in-from-left-10 duration-1000">
              <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-agro-50 dark:bg-agro-900/30 border border-agro-100 dark:border-agro-800 text-agro-700 dark:text-agro-400 text-[10px] font-black uppercase tracking-[0.5em] mb-12 shadow-sm">
                 <FlaskConical size={14} className="animate-pulse" /> Advanced Scientific Protocols
              </div>
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-slate-900 dark:text-white mb-8 tracking-tighter leading-none">
                Verifiable <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-agro-600 to-emerald-600 italic">Resilience</span>
              </h1>
              <p className="text-2xl text-earth-500 dark:text-earth-400 max-w-2xl leading-relaxed font-medium">
                Bridging the data gap with high-resolution diagnostic services. Quantifying agricultural potential through molecular, isotopic, and spectral intelligence.
              </p>
           </div>

           <div className="lg:col-span-5 animate-in fade-in zoom-in-95 duration-1000 delay-300">
              <div className="bg-white dark:bg-earth-900 p-10 rounded-[4rem] shadow-cinematic border border-earth-100 dark:border-earth-800 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-6 opacity-5 text-blue-600"><Binary size={180}/></div>
                 
                 <div className="relative z-10">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                       <Sparkles className="text-blue-500" size={20} /> Protocol Advisor
                    </h3>
                    <p className="text-sm text-earth-500 dark:text-earth-400 mb-8 leading-relaxed">
                       Input your localized challenge data (e.g., specific yield drop or water uncertainty) for a scientific service recommendation.
                    </p>
                    
                    <form onSubmit={handleAiConsult} className="space-y-4">
                       <div className="relative group">
                          <textarea 
                            value={aiInput}
                            onChange={(e) => setAiInput(e.target.value)}
                            placeholder="Describe your technical inquiry..."
                            className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-agro-500 rounded-[2rem] p-6 text-sm font-medium transition-all outline-none min-h-[140px] resize-none dark:text-white shadow-inner"
                          />
                          <button 
                            type="submit"
                            disabled={!aiInput.trim() || isAiConsulting}
                            className="absolute bottom-4 right-4 p-4 bg-agro-600 text-white rounded-2xl shadow-xl hover:bg-agro-700 transition-all active:scale-95 disabled:opacity-50"
                          >
                             {isAiConsulting ? <Loader2 size={24} className="animate-spin" /> : <ArrowUpRight size={24} />}
                          </button>
                       </div>
                    </form>

                    {aiRecommendation && (
                        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-3xl animate-in fade-in slide-in-from-top-4 duration-500">
                           <div className="flex items-center gap-2 mb-3">
                              <ShieldCheck size={14} className="text-blue-600" />
                              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Scientific Recommendation</span>
                           </div>
                           <p className="text-xs text-blue-800 dark:text-blue-300 italic font-medium leading-relaxed">
                              {aiRecommendation}
                           </p>
                        </div>
                    )}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 2. SERVICES CATALOG */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-earth-100 dark:border-earth-800 pb-10">
           <div>
              <h2 className="text-[11px] font-black text-agro-600 uppercase tracking-[0.6em] mb-4">Scientific Units</h2>
              <h3 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">Core Solutions</h3>
           </div>
           
           <div className="flex bg-white dark:bg-earth-900 p-1.5 rounded-[2rem] border border-earth-100 dark:border-earth-800 shadow-sm gap-1 overflow-x-auto no-scrollbar">
              {THRUST_TAGS.map(tag => (
                <button 
                  key={tag.id}
                  onClick={() => setActiveThrust(tag.id)}
                  className={`px-8 py-3 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${activeThrust === tag.id ? 'bg-agro-600 text-white shadow-lg shadow-agro-600/20' : 'text-earth-400 hover:text-earth-800 dark:hover:text-white'}`}
                >
                  {tag.icon} {tag.id}
                </button>
              ))}
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {filteredServices.map((service) => (
            <div 
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="bg-white dark:bg-earth-900 p-10 rounded-[3.5rem] border border-earth-100 dark:border-earth-800 shadow-sm hover:shadow-cinematic hover:-translate-y-2 transition-all duration-700 group cursor-pointer flex flex-col md:flex-row gap-10"
            >
               <div className="w-full md:w-56 h-56 rounded-[3rem] overflow-hidden shrink-0 border border-earth-50 dark:border-earth-800 shadow-inner group-hover:scale-[1.02] transition-transform duration-700">
                  <img src={service.image} className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" alt={service.title} />
               </div>
               
               <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-6">
                     <div className="p-4 bg-earth-50 dark:bg-earth-800 rounded-2xl text-agro-600 dark:text-agro-400 shadow-sm border border-black/5 group-hover:rotate-12 transition-transform">
                        {service.icon}
                     </div>
                     <span className="bg-agro-50 dark:bg-agro-900/40 text-agro-600 dark:text-agro-400 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-agro-100 dark:border-agro-800">
                        {service.thrustName} Thrust
                     </span>
                  </div>
                  
                  <h4 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-agro-600 transition-colors">
                     {service.title}
                  </h4>
                  
                  <p className="text-sm text-earth-500 dark:text-earth-400 leading-relaxed font-medium mb-10 line-clamp-2">
                     {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-earth-50 dark:border-earth-800 mt-auto">
                     <span className="text-lg font-black text-slate-900 dark:text-white font-mono tracking-tighter">{service.price}</span>
                     <button className="text-[10px] font-black text-agro-600 uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                        Initialize <ChevronRight size={14} />
                     </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PARTNERSHIP BANNER */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="bg-earth-900 dark:bg-earth-950 rounded-[5rem] p-16 md:p-24 text-white relative overflow-hidden shadow-cinematic-lg border border-white/5">
           <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-[10s]"><Atom size={500} /></div>
           
           <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div>
                 <h3 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight tracking-tighter">Strategic Research <br/><span className="text-blue-500">Pathways</span></h3>
                 <p className="text-slate-400 text-xl max-w-xl mb-12 leading-relaxed font-medium">
                    Are you a research institution, governmental body, or NGO looking to deploy the EnvirosAgro Framework for regional development?
                 </p>
                 <button 
                    onClick={() => onNavigate?.(View.PARTNERSHIPS)}
                    className="bg-white text-earth-950 px-16 py-6 rounded-full font-black uppercase text-xs tracking-[0.4em] hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-6"
                 >
                    Contact Strategy Team <ArrowRight size={24} />
                 </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                 {[
                   { label: 'Institutional Sync', val: '24 Nodes', icon: <Globe size={20}/> },
                   { label: 'Data Integrity', val: '99.8%', icon: <Activity size={20}/> },
                   { label: 'Network Reach', val: '2.5M+', icon: <Users size={20}/> },
                   { label: 'Maturity C(a)', val: '8.4 Avg', icon: <TrendingUp size={20}/> }
                 ].map(stat => (
                   <div key={stat.label} className="bg-white/5 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 shadow-inner group cursor-default hover:bg-white/10 transition-all">
                      <div className="text-blue-400 mb-6 group-hover:scale-110 transition-transform">{stat.icon}</div>
                      <div className="text-3xl font-serif font-bold mb-1">{stat.val}</div>
                      <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* 4. SERVICE DETAIL MODAL */}
      {selectedService && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-earth-950/90 backdrop-blur-xl animate-in fade-in duration-300">
             <div className="bg-white dark:bg-earth-900 w-full max-w-5xl max-h-[90vh] rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10 flex flex-col">
                
                <div className="relative h-72 shrink-0 overflow-hidden">
                   <img src={selectedService.image} className="w-full h-full object-cover opacity-80 blur-[2px]" alt={selectedService.title} />
                   <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-earth-900 to-transparent"></div>
                   <button 
                      onClick={() => setSelectedService(null)}
                      className="absolute top-8 right-8 bg-white/20 dark:bg-black/20 hover:bg-white/40 p-2 rounded-full text-white backdrop-blur-md transition-all z-20"
                   >
                      <X size={24} />
                   </button>
                   <div className="absolute bottom-10 left-12 z-10">
                      <span className="bg-agro-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block shadow-xl">
                        {selectedService.thrustName} Protocol
                      </span>
                      <h3 className="text-4xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">{selectedService.title}</h3>
                   </div>
                </div>

                <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                   <div className="grid lg:grid-cols-2 gap-16">
                      <div className="space-y-12">
                         <section>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-agro-600 mb-6">Service Overview</h4>
                            <p className="text-xl text-earth-700 dark:text-earth-300 font-medium leading-relaxed">
                               {selectedService.description}
                            </p>
                         </section>

                         <section>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-agro-600 mb-6">Scientific Protocol Steps</h4>
                            <div className="space-y-4">
                               {selectedService.protocols.map((p, i) => (
                                 <div key={i} className="flex items-center gap-4 p-5 bg-earth-50 dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-700 group transition-all hover:bg-white dark:hover:bg-agro-900/20 shadow-sm">
                                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-earth-700 flex items-center justify-center font-black text-xs text-agro-600 shadow-sm group-hover:scale-110 transition-transform">0{i+1}</div>
                                    <span className="text-sm font-bold text-earth-800 dark:text-earth-200">{p}</span>
                                 </div>
                               ))}
                            </div>
                         </section>
                      </div>

                      <div className="space-y-8">
                         <div className="bg-earth-50 dark:bg-earth-800 p-8 rounded-[3rem] border border-earth-100 dark:border-earth-700 shadow-inner">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-400 mb-8 flex items-center gap-3">
                               <Info size={16} /> Operational Metadata
                            </h4>
                            <div className="space-y-8">
                               <div>
                                  <p className="text-[9px] font-black text-earth-400 uppercase tracking-widest mb-1.5">Network Service Fee</p>
                                  <p className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">{selectedService.price}</p>
                               </div>
                               <div>
                                  <p className="text-[9px] font-black text-earth-400 uppercase tracking-widest mb-1.5">Turnaround Period</p>
                                  <div className="flex items-center gap-3 text-lg font-bold text-earth-800 dark:text-earth-200">
                                     <Clock size={20} className="text-blue-500" /> {selectedService.duration}
                                  </div>
                               </div>
                               <div>
                                  <p className="text-[9px] font-black text-earth-400 uppercase tracking-widest mb-3">Primary Deliverable</p>
                                  <div className="bg-white dark:bg-earth-900 p-4 rounded-2xl border border-earth-100 dark:border-earth-700 text-xs font-bold text-earth-700 dark:text-earth-300 leading-relaxed shadow-sm">
                                     {selectedService.deliverables}
                                  </div>
                               </div>
                            </div>
                         </div>

                         <div className="bg-agro-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform duration-1000 group-hover:rotate-12"><Activity size={100} /></div>
                            <h4 className="text-[10px] font-black text-agro-400 uppercase tracking-[0.4em] mb-4 relative z-10">Resilience Projection</h4>
                            <p className="text-sm font-medium leading-relaxed relative z-10">
                               Implementation of this protocol increases the **In(val)** soil/source integrity by a projected 18-24% per cycle, stabilizing the **m(t)** constant.
                            </p>
                         </div>

                         <button 
                            onClick={() => onNavigate?.(selectedService.target)}
                            className="w-full bg-agro-600 hover:bg-agro-500 text-white font-black py-6 rounded-3xl transition-all shadow-xl shadow-agro-600/30 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.2em] hover:-translate-y-1 active:translate-y-0"
                         >
                            <Activity size={20} /> Request Scientific Deployment
                         </button>
                      </div>
                   </div>
                </div>

                <div className="p-8 bg-earth-50 dark:bg-earth-950/50 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-center gap-3 shrink-0">
                   <ShieldCheck size={18} className="text-agro-600" />
                   <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Audit Trail Hashed via Global Resilience Ledger</p>
                </div>
             </div>
          </div>
      )}

      {/* 5. FOOTER DECOR */}
      <div className="max-w-7xl mx-auto border-t border-earth-100 dark:border-earth-800 mt-32 pt-16 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-earth-400">
         <div className="flex items-center gap-8">
            <span className="hover:text-agro-600 transition-colors cursor-default flex items-center gap-3"><Globe size={14} /> Certified Scientific Network</span>
            <span className="hover:text-agro-600 transition-colors cursor-default flex items-center gap-3"><BarChart3 size={14} /> Peer Reviewed Metrics</span>
         </div>
         <p className="opacity-40">PROTOCOL REVISION v4.2.2-BIO</p>
      </div>

    </div>
  );
};
