import React from 'react';
import { Award, ArrowRight, Flower, Music, Heart, Stethoscope, FileText, Bot, Utensils, Smile, Coins } from 'lucide-react';

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
    borderColor: "border-slate-100"
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

export const Brands: React.FC = () => {
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
          <div key={brand.id} className={`p-8 rounded-3xl border ${brand.borderColor} ${brand.color} hover:shadow-lg transition-all group`}>
            <div className="flex items-start justify-between mb-6">
              <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                {brand.icon}
              </div>
              <button className="bg-white/50 hover:bg-white p-2 rounded-full text-earth-400 hover:text-agro-600 transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
            <h3 className="text-2xl font-bold text-earth-900 mb-1">{brand.name}</h3>
            <p className="text-sm font-bold text-agro-700 uppercase tracking-wider mb-4">{brand.tagline}</p>
            <p className="text-earth-600 leading-relaxed mb-6 text-sm">
              {brand.description}
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-earth-400 uppercase tracking-wider">
               <Award size={14} /> EnvirosAgro Certified
            </div>
          </div>
        ))}
      </div>

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