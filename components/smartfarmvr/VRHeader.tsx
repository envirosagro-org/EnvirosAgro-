import React from 'react';
import { BrainCircuit } from 'lucide-react';

export const VRHeader: React.FC = () => {
  return (
    <div className="text-center mb-16">
      <div className="inline-block bg-earth-900 p-5 rounded-3xl mb-6 shadow-2xl">
        <BrainCircuit size={40} className="text-blue-400" strokeWidth={2} />
      </div>
      <h1 className="text-5xl md:text-7xl font-black text-earth-900 dark:text-white uppercase tracking-wider mb-4 font-serif">SmartFarm VR</h1>
      <p className="text-lg md:text-xl text-earth-500 dark:text-earth-400 max-w-3xl mx-auto leading-relaxed">
        Step into the future of agriculture with immersive virtual reality training modules. Practice complex operations in a zero-risk environment.
      </p>
    </div>
  );
};