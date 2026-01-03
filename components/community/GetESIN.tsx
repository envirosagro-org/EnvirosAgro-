
import React from 'react';
import { Fingerprint } from 'lucide-react';
import { useMultiStep } from '../../hooks/useMultiStep';
import { esinSteps } from './esin-steps';

interface GetESINProps {
  setActiveTab: (tab: any) => void;
  onEsinGenerated: (esin: string) => void;
}

export const GetESIN: React.FC<GetESINProps> = ({ setActiveTab, onEsinGenerated }) => {
  const generatedEsin = `EA-FAR-2024-${Math.floor(1000 + Math.random() * 9000)}`;

  const handleIssueEsin = () => {
    onEsinGenerated(generatedEsin);
    setActiveTab('ID_CARD');
  };

  const steps = esinSteps(generatedEsin, handleIssueEsin, (step) => goTo(step));
  const { currentStep, step, isFirstStep, isLastStep, totalSteps, next, prev, goTo } = useMultiStep(steps);

  return (
    <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-earth-900 rounded-[2rem] shadow-sm border border-earth-100 dark:border-earth-800 overflow-hidden">
        <div className="bg-agro-900 p-6 text-white text-center">
          <h3 className="text-xl font-serif font-bold flex items-center justify-center gap-3">
            <Fingerprint size={20} /> Issuance Terminal
          </h3>
        </div>
        <div className="p-8 space-y-6">
          <div className="flex justify-between relative mb-8 px-4">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-earth-100 dark:bg-earth-800 -z-10 -translate-y-1/2"></div>
            {Array.from({ length: totalSteps }, (_, i) => i).map(stepIndex => (
              <div key={stepIndex} className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-[10px] border-2 z-10 transition-all ${currentStep >= stepIndex ? 'bg-agro-600 border-agro-600 text-white' : 'bg-white dark:bg-earth-800 border-earth-100 dark:border-earth-800 text-earth-300'}`}>
                {stepIndex + 1}
              </div>
            ))}
          </div>
          {step.content}
        </div>
      </div>
    </div>
  );
};
