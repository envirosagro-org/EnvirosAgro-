import React from 'react';
import { View } from '../types';

import { MissionVision } from './information/MissionVision';
import { FrameworkDistinctions } from './information/FrameworkDistinctions';
import { Principles } from './information/Principles';
import { Values } from './information/Values';
import { LegalGovernance } from './information/LegalGovernance';
import { FAQ } from './information/FAQ';
import { Headquarters } from './information/Headquarters';
import { ContactBlock } from './information/ContactBlock';

export const Information: React.FC<{ onNavigate?: (view: View) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold text-agro-900 mb-4">About EnvirosAgro</h2>
        <p className="text-xl text-earth-600 max-w-3xl mx-auto">
          We are a pioneering network committed to establishing a comprehensive ecosystem that advances and supports agricultural sustainability globally.
        </p>
      </div>

      <MissionVision />
      
      <FrameworkDistinctions />
      
      <Principles />
      
      <Values />
      
      <LegalGovernance />
      
      <Headquarters />
      
      <FAQ />
      
      <ContactBlock onNavigate={onNavigate} />

      {/* Footer Quote */}
      <div className="bg-agro-900 text-white p-12 rounded-3xl text-center">
        <blockquote className="text-xl md:text-2xl font-serif italic max-w-4xl mx-auto leading-relaxed">
          "To ensure agriculture and its environ is smooth, reliable and safe."
        </blockquote>
      </div>
    </div>
  );
};
