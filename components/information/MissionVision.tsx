import React from 'react';

export const MissionVision: React.FC = () => {
  return (
    <section className="mb-20">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-earth-100">
          <h3 className="text-2xl font-bold text-agro-800 mb-4">Our Mission</h3>
          <p className="text-earth-700 leading-relaxed">
            To catalyze a global shift towards sustainable agriculture by providing innovative technology, robust certification, and a collaborative network for all stakeholders in the agricultural value chain.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-earth-100">
          <h3 className="text-2xl font-bold text-agro-800 mb-4">Our Vision</h3>
          <p className="text-earth-700 leading-relaxed">
            A world where every farm is resilient, every harvest is safe, and the entire agricultural ecosystem operates in harmony with nature, ensuring food security and planetary health for generations to come.
          </p>
        </div>
      </div>
    </section>
  );
};
