import React from 'react';

export const Values: React.FC = () => {
  const values = [
    {
      title: "Empowerment",
      desc: "Giving farmers and communities the tools and knowledge to thrive."
    },
    {
      title: "Resilience",
      desc: "Building systems that can withstand and adapt to environmental changes."
    },
    {
      title: "Trust",
      desc: "Establishing verifiable trust through blockchain and data auditing."
    },
    {
      title: "Equity",
      desc: "Ensuring fair access and opportunities across the global agricultural network."
    }
  ];

  return (
    <section className="mb-20">
      <h3 className="text-3xl font-bold text-agro-900 mb-8 text-center">Our Values</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, i) => (
          <div key={i} className="bg-agro-50 p-6 rounded-xl border border-agro-100">
            <h4 className="font-bold text-agro-800 mb-2">{v.title}</h4>
            <p className="text-earth-600 text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
