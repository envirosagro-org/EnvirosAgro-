import React, { useState } from 'react';
import { Play, Clock, Info, Share2, Award, Heart, Leaf, Mountain, Droplets, ArrowRight } from 'lucide-react';

const FEATURED_FILM = {
  id: 1,
  title: "Roots of Resilience: The Great Green Wall",
  category: "Restoration",
  duration: "1h 24m",
  year: "2023",
  director: "Amani K.",
  image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=80",
  description: "A cinematic journey across the Sahel, following the ambitious African-led initiative to grow an 8,000km natural wonder of the world to combat desertification."
};

const DOCS_LIBRARY = [
  {
    id: 2,
    title: "Guardians of the Soil",
    category: "Regenerative Ag",
    duration: "45m",
    image: "https://images.unsplash.com/photo-1625246333195-551e51245128?w=800&auto=format&fit=crop&q=60",
    impact: "1.2k Farmers Trained"
  },
  {
    id: 3,
    title: "Beneath the Canopy",
    category: "Biodiversity",
    duration: "52m",
    image: "https://images.unsplash.com/photo-1448375240586-dfd8f37933ff?w=800&auto=format&fit=crop&q=60",
    impact: "500 Acres Protected"
  },
  {
    id: 4,
    title: "Water Wars & Peace",
    category: "Conservation",
    duration: "1h 10m",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&auto=format&fit=crop&q=60",
    impact: "Policy Change Enacted"
  },
  {
    id: 5,
    title: "The Urban Harvest",
    category: "Food Security",
    duration: "38m",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=60",
    impact: "50 Community Gardens"
  }
];

export const GreenLens: React.FC = () => {
  const [activeFilm, setActiveFilm] = useState(FEATURED_FILM);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
           <div className="flex items-center gap-2 text-green-700 font-bold uppercase tracking-wider text-xs mb-2">
              <Leaf size={16} /> Green Lens Documentaries
           </div>
           <h2 className="text-3xl font-serif font-bold text-agro-900">Cinema for the Planet</h2>
        </div>
        <div className="flex gap-2">
           <span className="px-4 py-2 bg-earth-100 rounded-full text-xs font-bold text-earth-600">Originals</span>
           <span className="px-4 py-2 bg-earth-100 rounded-full text-xs font-bold text-earth-600">Series</span>
        </div>
      </div>

      {/* Hero Player Section */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-16 aspect-[21/9] group bg-black">
         <img 
            src={activeFilm.image} 
            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[2s]"
            alt={activeFilm.title}
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
         
         <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
            <div className="flex items-center gap-4 mb-4 text-sm font-medium text-green-300">
               <span className="bg-green-900/80 px-3 py-1 rounded border border-green-700">{activeFilm.category}</span>
               <span>{activeFilm.year}</span>
               <span>{activeFilm.duration}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl leading-tight">{activeFilm.title}</h1>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl line-clamp-2 md:line-clamp-none">
               {activeFilm.description || "A powerful story of nature's resilience and the human spirit."}
            </p>
            
            <div className="flex flex-wrap gap-4">
               <button className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-full font-bold flex items-center gap-3 transition-colors shadow-lg shadow-green-900/50">
                  <Play fill="currentColor" size={20} /> Watch Now
               </button>
               <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-colors border border-white/20">
                  <Info size={20} /> Details
               </button>
               <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full font-bold transition-colors border border-white/20">
                  <Heart size={20} />
               </button>
            </div>
         </div>
      </div>

      {/* Impact Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
         {[
            { label: "Trees Planted", value: "1.5M", icon: <TreeIcon /> },
            { label: "Water Restored", value: "500GL", icon: <Droplets /> },
            { label: "Species Tracked", value: "240+", icon: <Leaf /> },
            { label: "Communities", value: "85", icon: <Mountain /> }
         ].map((stat, idx) => (
            <div key={idx} className="bg-green-50 p-6 rounded-2xl border border-green-100 flex items-center gap-4">
               <div className="bg-white p-3 rounded-full text-green-700 shadow-sm">
                  {stat.icon}
               </div>
               <div>
                  <div className="text-2xl font-bold text-green-900">{stat.value}</div>
                  <div className="text-xs text-green-700 font-bold uppercase tracking-wider">{stat.label}</div>
               </div>
            </div>
         ))}
      </div>

      {/* Library Grid */}
      <div className="flex items-center justify-between mb-6">
         <h3 className="text-2xl font-bold text-earth-900">Now Streaming</h3>
         <button className="text-green-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
            View Full Catalog <ArrowRight size={16} />
         </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
         {DOCS_LIBRARY.map((doc) => (
            <div key={doc.id} className="group cursor-pointer">
               <div className="relative rounded-2xl overflow-hidden mb-3 aspect-[3/4]">
                  <img src={doc.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={doc.title} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4 text-center">
                     <Play size={48} className="mb-2" fill="currentColor" />
                     <p className="font-bold text-sm mb-1">{doc.impact}</p>
                     <p className="text-xs text-gray-300">Verified Impact</p>
                  </div>

                  <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded">
                     {doc.duration}
                  </div>
               </div>
               
               <h4 className="font-bold text-lg text-earth-900 mb-1 group-hover:text-green-700 transition-colors">{doc.title}</h4>
               <div className="flex items-center gap-2 text-xs text-earth-500 font-medium">
                  <span>{doc.category}</span>
                  <span className="w-1 h-1 bg-earth-300 rounded-full"></span>
                  <span className="flex items-center gap-1 text-green-600"><Award size={12} /> Impact Film</span>
               </div>
            </div>
         ))}
      </div>

    </div>
  );
};

// Helper Icon
function TreeIcon() {
   return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19v-9"/><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-2.222-2.222-3-3 2-1 2.222-2.222 3-3 .5-1 1-2 2-3 2 1 2.222 2.222 3 3 .778.778-.072.857-1 3-.5 1-1 1.62-1 3a2.5 2.5 0 0 0 2.5 2.5z"/><path d="M12 22h.01"/></svg>
}