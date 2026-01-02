
import React from 'react';
import { GlobeVisualization } from './GlobeVisualization';

export const PlanetWatchHeader: React.FC = () => {
  return (
    <div className="relative w-full h-[600px] bg-black rounded-3xl overflow-hidden">
        <GlobeVisualization />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-5xl font-bold tracking-tighter">Planet Watch</h1>
            <p className="text-lg text-white/70 max-w-lg mt-2">Global environmental intelligence, real-time climate monitoring, and planetary health forensics.</p>
        </div>
    </div>
  );
};
