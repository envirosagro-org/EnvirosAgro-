import React from 'react';
import { ThrustsHero } from './ThrustsHero';
import { ThrustsGrid } from './ThrustsGrid';
import { CtaSection } from './CtaSection';

export const Thrusts: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
      <ThrustsHero />
      <ThrustsGrid />
      <CtaSection />
    </div>
  );
};