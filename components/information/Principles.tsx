import React from 'react';

export const Principles: React.FC = () => {
  const principles = [
    {
      title: "Integrity",
      desc: "We uphold the highest standards of honesty and transparency in all our data and dealings."
    },
    {
      title: "Sustainability",
      desc: "Our core focus is long-term ecological balance and resource efficiency."
    },
    {
      title: "Collaboration",
      desc: "We believe in the power of a connected network to solve complex global challenges."
    },
    {
      title: "Innovation",
      desc: "Continuously pushing the boundaries of technology to improve agricultural outcomes."
    }
  ];

  return (
    <section className="mb-20">
      <h3 className="text-3xl font-bold text-agro-900 mb-8 text-center">Our Principles</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {principles.map((p, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-earth-100">
            <h4 className="font-bold text-agro-800 mb-2">{p.title}</h4>
            <p className="text-earth-600 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
