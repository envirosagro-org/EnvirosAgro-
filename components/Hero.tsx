import React, { useState, useMemo } from 'react';
import { View } from './types';
import { HeroHeader } from './hero/HeroHeader';
import { SimulationPanel } from './hero/SimulationPanel';
import { GlobalImpactRibbon } from './hero/GlobalImpactRibbon';
import { FrameworkArchitecture } from './hero/FrameworkArchitecture';

interface HeroProps {
  onNavigate: (view: View, searchQuery?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [searchValue, setSearchValue] = useState('');
  const [activeThrust, setActiveThrust] = useState<string | null>('EA');
  
  const [simParams, setSimParams] = useState({
    dn: 8.5,      // Rainfall Duration
    inVal: 5.2,  // Soil Moisture/Integrity
    ca: 3.8,    // Sustainability Coeff
    s: 12       // Crop Requirement
  });

  const currentM = useMemo(() => {
    const { dn, inVal, ca, s } = simParams;
    return Math.sqrt(((dn * inVal) * ca) / s).toFixed(2);
  }, [simParams]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchValue.trim()) {
      onNavigate(View.KNOWLEDGE, searchValue.trim());
    }
  };

  const trendingTags = ["Soil Resilience", "EA Thrust", "Carbon Ledger", "SI-D Diagnostic"];

  return (
    <div className="flex flex-col w-full bg-[#fafaf9] dark:bg-[#020617] transition-colors duration-700 overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-[100%] h-[100%] bg-agro-900/10 blur-[200px] rounded-full animate-pulse-gentle"></div>
           <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-blue-900/10 blur-[180px] rounded-full animate-float" style={{animationDelay: '-4s'}}></div>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-[0.03]"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#020617]"></div>
        </div>

        <div className="relative z-10 w-full grid lg:grid-cols-12 gap-24 items-center pt-32 pb-40 max-w-[1800px]">
          <HeroHeader 
            onNavigate={onNavigate}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleSearchSubmit={handleSearchSubmit}
            trendingTags={trendingTags}
          />
          <SimulationPanel 
            currentM={currentM}
            simParams={simParams}
            setSimParams={setSimParams}
          />
        </div>
      </section>

      <GlobalImpactRibbon />

      <FrameworkArchitecture 
        activeThrust={activeThrust}
        setActiveThrust={setActiveThrust}
        onNavigate={onNavigate}
      />
    </div>
  );
};