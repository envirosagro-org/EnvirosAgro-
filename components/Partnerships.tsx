import React from 'react';
import { Users, Leaf, ShieldPlus, Cpu, Factory, Building2 } from 'lucide-react';

const PARTNER_CATEGORIES = [
  {
    id: 'SA',
    title: 'Social Alliances',
    icon: <Users size={32} />,
    color: 'bg-rose-50 border-rose-100 text-rose-800',
    description: 'Collaborating with NGOs, cooperatives, and educational institutions to foster community resilience and knowledge transfer.'
  },
  {
    id: 'EA',
    title: 'Environmental Coalitions',
    icon: <Leaf size={32} />,
    color: 'bg-green-50 border-green-100 text-green-800',
    description: 'Partnering with conservation bodies and climate funds to drive biodiversity restoration and carbon neutrality.'
  },
  {
    id: 'HA',
    title: 'Health & Safety Boards',
    icon: <ShieldPlus size={32} />,
    color: 'bg-red-50 border-red-100 text-red-800',
    description: 'Working with health organizations and regulators to ensure food safety and the well-being of agricultural workers.'
  },
  {
    id: 'TA',
    title: 'Tech & Research Labs',
    icon: <Cpu size={32} />,
    color: 'bg-blue-50 border-blue-100 text-blue-800',
    description: 'Joint ventures with universities and tech firms to develop precision agriculture tools and AI diagnostics.'
  },
  {
    id: 'IA',
    title: 'Industrial Consortiums',
    icon: <Factory size={32} />,
    color: 'bg-slate-50 border-slate-100 text-slate-800',
    description: 'Strategic alignment with manufacturing giants and logistics fleets to scale sustainable supply chains.'
  }
];

export const Partnerships: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold text-agro-900 mb-4">Strategic Partnerships</h2>
        <p className="text-xl text-earth-600 max-w-3xl mx-auto">
          Building a unified ecosystem by collaborating with leaders across the Five Thrusts of sustainability.
        </p>
      </div>

      {/* Thrust Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
        {PARTNER_CATEGORIES.map((cat) => (
            <div key={cat.id} className={`p-6 rounded-2xl border ${cat.color} bg-white hover:shadow-lg transition-all flex flex-col`}>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${cat.color} bg-opacity-50`}>
                    {cat.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-earth-900">{cat.title}</h3>
                <p className="text-xs text-earth-600 mb-4 flex-1 leading-relaxed">
                    {cat.description}
                </p>
                <button className="text-xs font-bold uppercase tracking-wider text-earth-400 hover:text-agro-600 text-left">
                    Learn More &rarr;
                </button>
            </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-earth-100 rounded-3xl p-12 text-center">
         <Building2 size={48} className="mx-auto mb-4 text-earth-400" />
         <h3 className="text-2xl font-bold text-earth-900 mb-2">Become a Partner</h3>
         <p className="text-earth-600 max-w-xl mx-auto mb-8">
            Join the EnvirosAgro network to amplify your impact and drive the future of sustainable agriculture.
         </p>
         <div className="flex justify-center gap-4">
            <button className="bg-agro-600 text-white px-8 py-3 rounded-full font-bold hover:bg-agro-700 transition-colors">
                Apply for Partnership
            </button>
            <button className="bg-white text-earth-700 border border-earth-300 px-8 py-3 rounded-full font-bold hover:bg-earth-50 transition-colors">
                View Criteria
            </button>
         </div>
      </div>
    </div>
  );
};