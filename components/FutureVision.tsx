import React, { useState } from 'react';
import { generateFarmVision } from '../services/gemini';

import { Header } from './futurevision/Header';
import { ControlPanel } from './futurevision/ControlPanel';
import { VisionDisplay } from './futurevision/VisionDisplay';

export const FutureVision: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const steps = [
    "Uplink Established: AI Core Active",
    "Calibrating m(t) Projections...",
    "Synthesizing Regional Biomass Deltas...",
    "Rendering Optimized Future State..."
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratedImage(null);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500);

    try {
      const img = await generateFarmVision(prompt);
      setGeneratedImage(img);
    } catch (err) {
      console.error(err);
    } finally {
      clearInterval(stepInterval);
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <Header />

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <ControlPanel
          prompt={prompt}
          setPrompt={setPrompt}
          isGenerating={isGenerating}
          handleGenerate={handleGenerate}
        />

        <VisionDisplay
          isGenerating={isGenerating}
          generatedImage={generatedImage}
          loadingStep={loadingStep}
          steps={steps}
          prompt={prompt}
        />
      </div>
    </div>
  );
};
