import React from 'react';

export const FrameworkDistinctions: React.FC = () => {
  return (
    <section className="mb-20">
      <h3 className="text-3xl font-bold text-agro-900 mb-8 text-center">Our Framework Distinctions</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Data-Driven Integrity",
            desc: "Every claim is backed by verifiable data integrated through our global network."
          },
          {
            title: "Holistic Sustainability",
            desc: "Addressing ecological, economic, and social pillars simultaneously."
          },
          {
            title: "Stakeholder Centric",
            desc: "Empowering farmers, investors, and consumers through a unified platform."
          }
        ].map((item, i) => (
          <div key={i} className="bg-earth-50 p-6 rounded-xl border border-earth-100">
            <h4 className="font-bold text-agro-800 mb-2">{item.title}</h4>
            <p className="text-earth-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
