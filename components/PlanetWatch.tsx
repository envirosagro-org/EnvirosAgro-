import React, { useState } from 'react';
import { Play, Clock, Globe, Thermometer, Wind, AlertTriangle, TrendingUp, Share2, Info } from 'lucide-react';

const NEWS_SEGMENTS = [
  {
    id: 1,
    title: "Global Drought Impact Report: Horn of Africa",
    category: "Climate Alert",
    time: "2h ago",
    duration: "12:45",
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&auto=format&fit=crop&q=60",
    desc: "Analyzing the severe rainfall deficit affecting crop yields across Kenya, Somalia, and Ethiopia."
  },
  {
    id: 2,
    title: "Ocean Acidification & Coastal Farming",
    category: "Marine Ecosystems",
    time: "5h ago",
    duration: "08:30",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&auto=format&fit=crop&q=60",
    desc: "How rising CO2 levels are impacting shellfish farming and coastal agricultural zones."
  },
  {
    id: 3,
    title: "Reforestation Success in the Amazon",
    category: "Conservation",
    time: "Yesterday",
    duration: "15:20",
    image: "https://images.unsplash.com/photo-1516214104703-d870798883c5?w=800&auto=format&fit=crop&q=60",
    desc: "Indigenous communities reclaim land using agroforestry techniques, restoring biodiversity."
  },
  {
    id: 4,
    title: "New Pest Resistant Maize Variety Approved",
    category: "Agri-Tech",
    time: "2 days ago",
    duration: "06:15",
    image: "https://images.unsplash.com/photo-1629814682056-2775fa339793?w=800&auto=format&fit=crop&q=60",
    desc: "Scientists unveil a drought-tolerant, pest-resistant strain tailored for semi-arid regions."
  }
];

const TICKER_ITEMS = [
  "BREAKING: El Niño expected to peak in late 2024, farmers advised to prepare drainage systems.",
  "MARKET: Global wheat prices stabilize after bumper harvest in Northern Hemisphere.",
  "POLICY: EU passes new regenerative agriculture subsidy package for smallholders.",
  "TECH: Drone-based pollination trials show 30% yield increase in almond orchards."
];

export const PlanetWatch: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState(NEWS_SEGMENTS[0]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
         <div className="bg-green-100 p-2 rounded-xl text-green-700">
            <Globe size={32} />
         </div>
         <div>
            <h2 className="text-3xl font-serif font-bold text-agro-900 leading-none">Planet Watch News</h2>
            <p className="text-earth-500 text-sm mt-1">Daily Intelligence on Climate, Agriculture & Conservation.</p>
         </div>
         <div className="ml-auto flex gap-4 text-xs font-bold text-earth-500 bg-white border border-earth-200 px-4 py-2 rounded-full shadow-sm hidden md:flex">
             <span className="flex items-center gap-1"><Thermometer size={14} className="text-red-500"/> +1.2°C Global Avg</span>
             <span className="text-earth-300">|</span>
             <span className="flex items-center gap-1"><Wind size={14} className="text-blue-500"/> CO2 421ppm</span>
         </div>
      </div>

      {/* Main News Player */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
         <div className="lg:col-span-2">
            <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border border-earth-900">
               <img src={activeSegment.image} className="w-full h-full object-cover opacity-80" alt="Main News" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
               
               {/* Overlay Content */}
               <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                  <span className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-3 inline-block animate-pulse">
                     {activeSegment.category}
                  </span>
                  <h3 className="text-3xl font-bold mb-2 leading-tight max-w-2xl">{activeSegment.title}</h3>
                  <p className="text-gray-300 text-sm mb-6 max-w-xl line-clamp-2">{activeSegment.desc}</p>
                  
                  <div className="flex items-center gap-6">
                     <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                        <Play size={18} fill="currentColor" /> Watch Report
                     </button>
                     <button className="flex items-center gap-2 text-white hover:text-agro-400 transition-colors font-medium text-sm bg-white/10 px-4 py-2 rounded-full">
                        <Info size={18} /> Read Transcript
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* Up Next List */}
         <div className="bg-white border border-earth-200 rounded-3xl p-6 shadow-sm flex flex-col h-full">
            <h3 className="font-bold text-earth-900 mb-4 flex items-center gap-2">
               <TrendingUp size={20} className="text-agro-600" /> Top Stories
            </h3>
            <div className="space-y-4 overflow-y-auto flex-1 pr-2 custom-scrollbar">
               {NEWS_SEGMENTS.map((segment) => (
                  <div 
                     key={segment.id} 
                     onClick={() => setActiveSegment(segment)}
                     className={`flex gap-3 p-3 rounded-xl cursor-pointer transition-all ${activeSegment.id === segment.id ? 'bg-agro-50 border border-agro-100' : 'hover:bg-earth-50 border border-transparent'}`}
                  >
                     <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0 relative">
                        <img src={segment.image} className="w-full h-full object-cover" />
                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[8px] font-bold px-1 rounded">
                           {segment.duration}
                        </div>
                     </div>
                     <div>
                        <span className="text-[10px] font-bold text-agro-600 uppercase mb-0.5 block">{segment.category}</span>
                        <h4 className={`text-xs font-bold leading-snug line-clamp-2 mb-1 ${activeSegment.id === segment.id ? 'text-earth-900' : 'text-earth-700'}`}>
                           {segment.title}
                        </h4>
                        <span className="text-[10px] text-earth-400 flex items-center gap-1">
                           <Clock size={10} /> {segment.time}
                        </span>
                     </div>
                  </div>
               ))}
            </div>
            <button className="w-full mt-4 text-xs font-bold text-center text-earth-500 hover:text-agro-600 uppercase tracking-wider py-2 border-t border-earth-100">
               View All Reports
            </button>
         </div>
      </div>

      {/* News Ticker */}
      <div className="bg-agro-900 text-white py-3 px-6 rounded-full overflow-hidden mb-12 shadow-lg flex items-center gap-4 border border-agro-800">
         <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-red-400 shrink-0 border-r border-agro-700 pr-4">
            <AlertTriangle size={14} /> Breaking
         </div>
         <div className="flex-1 overflow-hidden relative h-5">
            <div className="absolute whitespace-nowrap animate-[marquee_20s_linear_infinite] text-sm font-medium text-agro-100">
               {TICKER_ITEMS.join(" ••• ")}
            </div>
         </div>
      </div>

      {/* Categories / Sections */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
         {['Climate Policy', 'Sustainable Tech', 'Biodiversity', 'Market Watch'].map((cat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-earth-100 hover:shadow-md transition-all group cursor-pointer">
               <h4 className="font-bold text-lg text-earth-900 mb-2 group-hover:text-agro-700 transition-colors">{cat}</h4>
               <p className="text-xs text-earth-500 mb-4">Latest updates on {cat.toLowerCase()} affecting global agriculture.</p>
               <div className="flex justify-between items-center mt-auto pt-4 border-t border-earth-50">
                  <span className="text-xs font-bold bg-earth-100 text-earth-600 px-2 py-1 rounded">3 New Stories</span>
                  <button className="bg-earth-50 p-2 rounded-full text-earth-400 group-hover:bg-agro-600 group-hover:text-white transition-all">
                     <TrendingUp size={16} />
                  </button>
               </div>
            </div>
         ))}
      </div>

    </div>
  );
};