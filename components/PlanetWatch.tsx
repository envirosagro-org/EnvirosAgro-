import React from 'react';
import { PlanetWatchHeader } from './planet-watch/PlanetWatchHeader';
import { PlanetWatchStats } from './planet-watch/PlanetWatchStats';
import { RegionalIntelligence } from './planet-watch/RegionalIntelligence';
import { NewsList } from './planet-watch/NewsList';
import { FutureVision } from './planet-watch/FutureVision';

export const PlanetWatch: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-xl mx-auto">
        <PlanetWatchHeader />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PlanetWatchStats />
            <FutureVision />
          </div>
          <div className="space-y-8">
            <RegionalIntelligence />
            <NewsList />
          </div>
        </main>
      </div>
    </div>
  );
};
