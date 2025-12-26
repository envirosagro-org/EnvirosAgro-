import React from 'react';
import { GreenLensHero } from './GreenLensHero';
import { GreenLensStats } from './GreenLensStats';
import { FeaturedDoc } from './FeaturedDoc';
import { DocsLibrary } from './DocsLibrary';
import { FilmStrip } from './FilmStrip';

export const GreenLens: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050a14] text-white">
      <GreenLensHero />
      <GreenLensStats />
      <FeaturedDoc />
      <DocsLibrary />
      <FilmStrip />
    </div>
  );
};