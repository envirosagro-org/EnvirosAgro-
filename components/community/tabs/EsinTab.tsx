
import React from 'react';
import { GetESIN } from '../GetESIN';

interface EsinTabProps {
  esinStep: number;
  setEsinStep: React.Dispatch<React.SetStateAction<number>>;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  onEsinGenerated: (esin: string) => void;
}

const EsinTab: React.FC<EsinTabProps> = ({ esinStep, setEsinStep, setActiveTab, onEsinGenerated }) => {
  return (
    <GetESIN 
      esinStep={esinStep} 
      setEsinStep={setEsinStep} 
      setActiveTab={setActiveTab} 
      onEsinGenerated={onEsinGenerated} 
    />
  );
};

export default EsinTab;
