import React from 'react';
import { HERO_VIDEO_URL } from './data';

export const GreenLensHero: React.FC = () => {
  return (
    <div className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
        style={{ objectFit: 'cover', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <source src={HERO_VIDEO_URL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 px-4">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-widest text-white">GreenLens</h1>
        <p className="text-lg md:text-xl text-slate-300 mt-4 max-w-2xl mx-auto">Visually-driven stories of agricultural innovation.</p>
        <button className="mt-8 bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
          Watch Now
        </button>
      </div>
    </div>
  );
};