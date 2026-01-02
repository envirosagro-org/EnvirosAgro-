import React, { useState, useMemo } from 'react';
import { VisionSelector } from './VisionSelector';
import { VisionCard } from './VisionCard';
import { VISIONS } from './data';

export const Header: React.FC = () => {
  const [activeVision, setActiveVision] = useState(VISIONS[0]);
  const [year, setYear] = useState(2035);

  const handleSelectVision = (vision: any) => {
    setActiveVision(vision);
  };

  const handleSelectYear = (selectedYear: number) => {
    setYear(selectedYear);
  };

  const activeVisionData = useMemo(() => {
    return VISIONS.find(v => v.id === activeVision.id);
  }, [activeVision]);

  return (
    <header className="relative bg-black text-white min-h-screen p-4 md:p-8 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />

      <main className="w-full max-w-7xl mx-auto z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white/80 via-white to-white/80 leading-tight">Explore the Future of Agriculture</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-white/60">Select a technological vision and use the timeline to see its projected impact over the coming decades.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1">
            <VisionSelector 
              visions={VISIONS}
              activeVision={activeVision}
              onSelectVision={handleSelectVision}
              year={year}
              onSelectYear={handleSelectYear}
            />
          </div>
          <div className="lg:col-span-2">
            <VisionCard vision={activeVisionData} year={year} />
          </div>
        </div>
      </main>
    </header>
  );
};