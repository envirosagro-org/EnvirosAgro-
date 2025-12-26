import React from 'react';
import { GreenLensHero } from './greenlens/GreenLensHero';
import { GreenLensStats } from './greenlens/GreenLensStats';
import { FeaturedDoc } from './greenlens/FeaturedDoc';
import { DocsLibrary } from './greenlens/DocsLibrary';
import { FilmStrip } from './greenlens/FilmStrip';

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