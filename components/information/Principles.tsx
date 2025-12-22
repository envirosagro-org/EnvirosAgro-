import React from 'react';
import { Users, Eye, Lightbulb, Leaf, RefreshCw } from 'lucide-react';

export const Principles: React.FC = () => {
  const principles = [
    { title: "Integration", icon: <Users size={24} />, desc: "Unifying diverse agricultural sectors." },
    { title: "Vision", icon: <Eye size={24} />, desc: "Forward-thinking strategies for the future." },
    { title: "Innovation", icon: <Lightbulb size={24} />, desc: "Embracing technology and creative solutions." },
    { title: "Sustainability", icon: <Leaf size={24} />, desc: "Ensuring long-term ecological balance." },
    { title: "Kaizen", icon: <RefreshCw size={24} />, desc: "Continuous improvement in all practices." }
  ];

  return (
    <div className="mb-20">
      <h3 className="text-3xl font-serif font-bold text-agro-900 mb-10 text-center">Principles of EnvirosAgro</h3>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
        {principles.map((principle, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-earth-100 shadow-sm hover:border-agro-300 hover:shadow-md transition-all text-center group">
            <div className="w-12 h-12 bg-earth-50 rounded-full flex items-center justify-center mx-auto mb-4 text-earth-600 group-hover:bg-agro-50 group-hover:text-agro-600 transition-colors">
              {principle.icon}
            </div>
            <h4 className="font-bold text-lg text-earth-900 mb-2">{principle.title}</h4>
            <p className="text-sm text-earth-500">{principle.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
