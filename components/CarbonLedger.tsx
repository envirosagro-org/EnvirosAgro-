import React, { useState } from 'react';
import { User, View } from '../types';

import { LedgerHeader } from './carbonledger/LedgerHeader';
import { OffsetChart } from './carbonledger/OffsetChart';
import { ProjectList } from './carbonledger/ProjectList';
import { MintSidebar } from './carbonledger/MintSidebar';
import { MintModal } from './carbonledger/MintModal';
import { VerificationProtocol } from './carbonledger/VerificationProtocol';
import { AuditSidebar } from './carbonledger/AuditSidebar';

const OFFSETS_DATA = [
  { month: 'Jan', tons: 1.2 },
  { month: 'Feb', tons: 2.1 },
  { month: 'Mar', tons: 1.8 },
  { month: 'Apr', tons: 3.5 },
  { month: 'May', tons: 4.2 },
  { month: 'Jun', tons: 5.8 },
];

const INITIAL_PROJECTS = [
  { id: 1, name: 'Kiriaini Reforestation', type: 'Afforestation', status: 'Active', credits: 450, impact: 'High', availableTons: 8.5 },
  { id: 2, name: 'Central Valley Biochar', type: 'Soil Sequestration', status: 'Verifying', credits: 120, impact: 'Medium', availableTons: 3.2 },
  { id: 3, name: 'Eco-Corridor Alpha', type: 'Biodiversity', status: 'Active', credits: 300, impact: 'High', availableTons: 5.4 },
];

interface CarbonLedgerProps {
  user: User | null;
  onAwardEac?: (amount: number) => void;
  onNavigate?: (view: View) => void;
}

export const CarbonLedger: React.FC<CarbonLedgerProps> = ({ user, onAwardEac, onNavigate }) => {
  const [showMintModal, setShowMintModal] = useState(false);
  const [mintStatus, setMintStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');
  const [mintAmount, setMintAmount] = useState('1.0');
  const [selectedProjectId, setSelectedProjectId] = useState<number>(1);
  const [processingStep, setProcessingStep] = useState(0);

  const MINT_RATE = 50; // 1 ton = 50 EAC

  const steps = [
    "Establishing Satellite Uplink...",
    "Verifying Biomass Density...",
    "Validating Soil Sequestration Delta...",
    "Securing EAC Ledger Entry..."
  ];

  const handleMint = () => {
    const tons = parseFloat(mintAmount);
    if (isNaN(tons) || tons <= 0) return;

    setMintStatus('PROCESSING');
    setProcessingStep(0);

    const interval = setInterval(() => {
      setProcessingStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    setTimeout(() => {
      const eacToAward = tons * MINT_RATE;
      if (onAwardEac) onAwardEac(eacToAward);
      setMintStatus('SUCCESS');
    }, 5500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <LedgerHeader />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 space-y-8">
          <OffsetChart data={OFFSETS_DATA} />

          {/* Active Projects */}
          <ProjectList
            projects={INITIAL_PROJECTS}
            setSelectedProjectId={setSelectedProjectId}
            setShowMintModal={setShowMintModal}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <MintSidebar setShowMintModal={setShowMintModal} />
          <VerificationProtocol />
          <AuditSidebar />
        </div>
      </div>

      {showMintModal && (
        <MintModal
          setShowMintModal={setShowMintModal}
          mintStatus={mintStatus}
          setMintStatus={setMintStatus}
          mintAmount={mintAmount}
          setMintAmount={setMintAmount}
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
          projects={INITIAL_PROJECTS}
          steps={steps}
          processingStep={processingStep}
          handleMint={handleMint}
          MINT_RATE={MINT_RATE}
          user={user}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
};
