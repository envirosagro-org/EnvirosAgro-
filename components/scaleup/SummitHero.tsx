import React from 'react';

export const SummitHero: React.FC = () => {
  return (
    <div className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">Scale-Up Summit 2024</h1>
        <p className="mt-6 text-xl max-w-3xl mx-auto">Your premier destination for agricultural innovation and growth.</p>
        <div className="mt-10">
          <a href="#" className="bg-white text-blue-600 font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider">Register Now</a>
        </div>
      </div>
    </div>
  );
};