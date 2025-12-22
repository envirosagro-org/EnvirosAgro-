import React from 'react';
import { ShieldCheck, Users, Smile, Heart, Gavel } from 'lucide-react';

export const Values: React.FC = () => {
  const values = [
    { title: "Ethical", icon: <ShieldCheck size={28} />, color: "text-amber-600" },
    { title: "Communal", icon: <Users size={28} />, color: "text-rose-600" },
    { title: "Optimistic", icon: <Smile size={28} />, color: "text-yellow-500" },
    { title: "Supportive", icon: <Heart size={28} />, color: "text-green-600" },
    { title: "Governed", icon: <Gavel size={28} />, color: "text-blue-600" }
  ];

  return (
    <div className="mb-20 bg-earth-50 rounded-3xl p-10 border border-earth-100">
      <h3 className="text-3xl font-serif font-bold text-agro-900 mb-10 text-center">Values of EnvirosAgro</h3>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
        {values.map((value, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className={`mb-4 ${value.color}`}>{value.icon}</div>
            <h4 className="font-bold text-lg text-earth-900">{value.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
