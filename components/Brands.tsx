
import React, { useState } from 'react';
import { Award, ArrowRight, Flower, Music, Heart, Stethoscope, FileText, Bot, Utensils, Smile, Coins, BookOpen, X, Image as ImageIcon, Play, ShoppingBag, Gamepad2, Activity, ExternalLink } from 'lucide-react';
import { View } from '../types';

const BRANDS = [
  {
    id: 1,
    name: "Lilies Around",
    tagline: "Agricultural Aesthetics",
    description: "Enhancing landscapes and environments through floral beauty and aesthetic agricultural design.",
    icon: <Flower size={40} className="text-pink-600" />,
    color: "bg-pink-50",
    borderColor: "border-pink-100"
  },
  {
    id: 2,
    name: "AgroMusika",
    tagline: "Agricultural Arts",
    description: "Celebrating the cultural rhythm of farming through music, art, and creative expression.",
    icon: <Music size={40} className="text-purple-600" />,
    color: "bg-purple-50",
    borderColor: "border-purple-100"
  },
  {
    id: 3,
    name: "Hearts4Agro",
    tagline: "Agricultural Environments",
    description: "Fostering love and care for agricultural ecosystems and environmental stewardship.",
    icon: <Heart size={40} className="text-red-600" />,
    color: "bg-red-50",
    borderColor: "border-red-100"
  },
  {
    id: 4,
    name: "MedicAg",
    tagline: "Agricultural Health",
    description: "Ensuring the safety, health, and wellbeing of the agricultural workforce and consumers.",
    icon: <Stethoscope size={40} className="text-teal-600" />,
    color: "bg-teal-50",
    borderColor: "border-teal-100"
  },
  {
    id: 5,
    name: "AgroInPDF",
    tagline: "Agricultural Media",
    description: "Digital dissemination of agricultural knowledge through accessible media and documentation.",
    icon: <FileText size={40} className="text-slate-600" />,
    color: "bg-slate-50",
    borderColor: "border-slate-100",
    linkTo: View.MEDIA
  },
  {
    id: 6,
    name: "Agroboto",
    tagline: "Agricultural Tech",
    description: "Pioneering robotics and automation solutions for the modern smart farm.",
    icon: <Bot size={40} className="text-blue-600" />,
    color: "bg-blue-50",
    borderColor: "border-blue-100"
  },
  {
    id: 7,
    name: "Juiezy Cookiez",
    tagline: "Agricultural Food",
    description: "Delicious, value-added food products crafted from sustainable agricultural produce.",
    icon: <Utensils size={40} className="text-orange-600" />,
    color: "bg-orange-50",
    borderColor: "border-orange-100"
  },
  {
    id: 8,
    name: "ChildsLabour",
    tagline: "Children Growth & Development",
    description: "Empowering the next generation through agricultural education, discipline, and growth.",
    icon: <Smile size={40} className="text-yellow-600" />,
    color: "bg-yellow-50",
    borderColor: "border-yellow-100"
  },
  {
    id: 9,
    name: "Tokenz",
    tagline: "Agricultural Finance",
    description: "Innovative financial solutions and digital assets powering the agricultural economy.",
    icon: <Coins size={40} className="text-amber-600" />,
    color: "bg-amber-50",
    borderColor: "border-amber-100"
  }
];

interface BrandsProps {
    onNavigate?: (view: View) => void;
}

export const Brands: React.FC<BrandsProps> = ({ onNavigate }) => {
  const [selectedBrand, setSelectedBrand] = useState<typeof BRANDS[0] | null>(null);

  const renderPortalContent = (brand: typeof BRANDS[0]) => {
      // Switch logic for specific brand content
      switch(brand.id) {
          case 1: // Lilies Around
              return (
                  <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                          <img src="https://images.unsplash.com/photo-1490750967868-58cb75069ed6?w=600&auto=format&fit=crop&q=80" className="rounded-xl h-24 object-cover w-full" alt="Landscape" />
                          <img src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&auto=format&fit=crop&q=80" className="rounded-xl h-24 object-cover w-full" alt="Flowers" />
                      </div>
                      <button className="w-full bg-pink-600 hover:bg-pink-700 transition-colors text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                          <ImageIcon size={18} /> View Landscape Portfolio
                      </button>
                  </div>
              );
          case 2: // AgroMusika
               return (
                  <div className="space-y-4">
                      <div className="bg-purple-100 p-4 rounded-xl flex items-center gap-4">
                          <div className="bg-purple-600 text-white p-3 rounded-full"><Play size={20} fill="currentColor" /></div>
                          <div>
                              <h4 className="font-bold text-purple-900">Rhythm of the Harvest</h4>
                              <p className="text-xs text-purple-700">Now Playing • Folk Series</p>
                          </div>
                          <div className="ml-auto w-12 h-6 bg-purple-200 rounded-full flex items-center justify-center">
                              <div className="w-full mx-2 h-1 bg-purple-400 rounded-full"></div>
                          </div>
                      </div>
                      <button className="w-full border border-purple-200 text-purple-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-purple-50 transition-colors">
                          <Music size={18} /> Browse Playlist
                      </button>
                  </div>
              );
           case 3: // Hearts4Agro
               return (
                  <div className="text-center">
                      <p className="text-red-800 mb-6 italic text-sm">"Adopting a tree is adopting a future."</p>
                      <div className="grid grid-cols-2 gap-4">
                          <button className="bg-red-100 py-3 rounded-xl text-red-700 font-bold hover:bg-red-200 transition-colors text-sm">
                             Volunteer
                          </button>
                          <button className="bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors text-sm">
                             Donate
                          </button>
                      </div>
                  </div>
              );
           case 6: // Agroboto
               return (
                  <div className="space-y-4">
                      <div className="bg-slate-900 text-green-400 p-4 rounded-xl font-mono text-xs shadow-inner">
                          <p>{'>'} System Status: ONLINE</p>
                          <p>{'>'} Active Units: 142</p>
                          <p>{'>'} Soil Scans: 45,201 Today</p>
                          <p className="animate-pulse">{'>'} Awaiting Command_</p>
                      </div>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                          <Bot size={18} /> Access Fleet Dashboard
                      </button>
                  </div>
              );
           case 7: // Juiezy Cookiez
               return (
                  <div className="space-y-4">
                      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                          {['Moringa Bites', 'Sorghum Crunch', 'Honey Glazed'].map(item => (
                              <div key={item} className="min-w-[100px] bg-orange-50 p-2 rounded-xl border border-orange-100 text-center">
                                  <div className="w-10 h-10 bg-orange-200 rounded-full mx-auto mb-2"></div>
                                  <p className="text-xs font-bold text-orange-900 leading-tight">{item}</p>
                              </div>
                          ))}
                      </div>
                      <button 
                        onClick={() => onNavigate && onNavigate(View.PRODUCTS)}
                        className="w-full bg-orange-600 hover:bg-orange-700 transition-colors text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                      >
                          <ShoppingBag size={18} /> Order Now
                      </button>
                  </div>
              );
            case 9: // Tokenz
               return (
                  <div className="space-y-4">
                      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-center">
                          <p className="text-xs font-bold text-amber-600 uppercase">Current Rate</p>
                          <p className="text-2xl font-bold text-amber-900">1 TKZ = $1.00 USD</p>
                      </div>
                      <button 
                         onClick={() => onNavigate && onNavigate(View.FINANCE)}
                         className="w-full bg-amber-600 hover:bg-amber-700 transition-colors text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                      >
                          <Coins size={18} /> Open Wallet
                      </button>
                  </div>
              );
            case 5: // AgroInPDF
                return (
                    <div className="space-y-4">
                        <p className="text-slate-600 text-sm italic">Access the world's largest library of sustainable agriculture documentation.</p>
                        <button 
                            onClick={() => onNavigate && onNavigate(View.MEDIA)}
                            className="w-full bg-slate-600 hover:bg-slate-700 transition-colors text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                        >
                            <BookOpen size={18} /> Enter Library
                        </button>
                    </div>
                );
            case 4: // MedicAg
                return (
                    <div className="space-y-4">
                         <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl border border-teal-100">
                             <Activity className="text-teal-600" />
                             <div>
                                 <p className="text-sm font-bold text-teal-900">Tele-Health Status</p>
                                 <p className="text-xs text-teal-600">Doctors Online: 12</p>
                             </div>
                         </div>
                         <button className="w-full bg-teal-600 hover:bg-teal-700 transition-colors text-white py-3 rounded-xl font-bold">
                             Schedule Consultation
                         </button>
                    </div>
                );
            case 8: // ChildsLabour
                 return (
                    <div className="space-y-4">
                         <p className="text-yellow-800 text-sm italic">Gamified learning for the next generation of farmers.</p>
                         <button className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                             <Gamepad2 size={18} /> Play & Learn
                         </button>
                    </div>
                );
          default:
              return <p className="text-earth-500 italic text-center">Portal content loading...</p>;
      }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold text-agro-900 mb-4">Our Brands</h2>
        <p className="text-xl text-earth-600 max-w-3xl mx-auto">
          EnvirosAgro operates a diverse family of specialized brands, each dedicated to a unique facet of the agricultural ecosystem.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {BRANDS.map((brand) => (
          <div key={brand.id} 
             onClick={() => setSelectedBrand(brand)}
             className={`p-8 rounded-3xl border ${brand.borderColor} ${brand.color} hover:shadow-lg transition-all group relative overflow-hidden cursor-pointer`}
          >
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                {brand.icon}
              </div>
              <button className="bg-white/50 hover:bg-white p-2 rounded-full text-earth-400 hover:text-agro-600 transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
            <h3 className="text-2xl font-bold text-earth-900 mb-1 relative z-10">{brand.name}</h3>
            <p className="text-sm font-bold text-agro-700 uppercase tracking-wider mb-4 relative z-10">{brand.tagline}</p>
            <p className="text-earth-600 leading-relaxed mb-6 text-sm relative z-10">
              {brand.description}
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-earth-400 uppercase tracking-wider relative z-10 group-hover:text-agro-600 transition-colors">
               <ExternalLink size={14} /> Enter Portal
            </div>
          </div>
        ))}
      </div>

      {/* Brand Portal Modal */}
      {selectedBrand && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-900/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedBrand(null)}>
              <div 
                  className="w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 bg-white"
                  onClick={(e) => e.stopPropagation()}
              >
                  {/* Header */}
                  <div className={`p-8 ${selectedBrand.color} border-b ${selectedBrand.borderColor} relative`}>
                      <button 
                          onClick={() => setSelectedBrand(null)}
                          className="absolute top-4 right-4 bg-white/50 hover:bg-white p-2 rounded-full transition-colors text-earth-600"
                      >
                          <X size={20} />
                      </button>
                      
                      <div className="flex flex-col items-center text-center">
                          <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
                              {selectedBrand.icon}
                          </div>
                          <h2 className="text-3xl font-serif font-bold text-earth-900 mb-1">{selectedBrand.name}</h2>
                          <p className="text-sm font-bold text-agro-700 uppercase tracking-wider">{selectedBrand.tagline}</p>
                      </div>
                  </div>

                  {/* Body */}
                  <div className="p-8">
                      <p className="text-earth-600 mb-8 text-center leading-relaxed text-sm">
                          {selectedBrand.description}
                      </p>
                      
                      <div className="bg-earth-50 rounded-2xl p-6 border border-earth-100">
                          <h4 className="font-bold text-earth-900 mb-4 text-xs uppercase tracking-wide text-center">Portal Features</h4>
                          {renderPortalContent(selectedBrand)}
                      </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="p-4 bg-earth-50 text-center border-t border-earth-100">
                      <p className="text-xs text-earth-400">Powered by EnvirosAgro Infrastructure</p>
                  </div>
              </div>
          </div>
      )}

      {/* Trust Section */}
      <div className="bg-agro-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">Unified by a Single Mission</h3>
          <p className="text-agro-100 max-w-2xl mx-auto mb-8">
            From aesthetics to finance, every EnvirosAgro brand adheres to our strict Sustainability Framework to ensure a holistic approach to agricultural development.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 opacity-70">
            {BRANDS.map(brand => (
                <span key={brand.id} className="text-lg font-serif font-bold whitespace-nowrap">{brand.name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
