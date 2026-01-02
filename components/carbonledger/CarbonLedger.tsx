import React, { useState, useEffect } from 'react';
import { LedgerHeader } from './LedgerHeader';
import { OffsetChart } from './OffsetChart';
import { TransactionHistory } from './TransactionHistory';
import { MintSidebar } from './MintSidebar';
import { AuditSidebar } from './AuditSidebar';
import { MintModal } from './MintModal';
import { User, View } from '../../types';

const chartData = [
  { month: 'Jan', tons: 1.5 },
  { month: 'Feb', tons: 2.1 },
  { month: 'Mar', tons: 2.5 },
  { month: 'Apr', tons: 3.0 },
  { month: 'May', tons: 2.8 },
  { month: 'Jun', tons: 3.2 },
];

const projects = [
  {
    id: 1,
    name: 'Reforestation Project Alpha',
    type: 'Afforestation',
    availableTons: 150,
  },
  {
    id: 2,
    name: 'Soil Enrichment Initiative',
    type: 'Regenerative Agriculture',
    availableTons: 320,
  },
];

const MINT_RATE = 10; // 1 Ton = 10 EAC

const steps = [
  'Connecting to network node EA-SYNC-8...',
  'Verifying biomass proofs...',
  'Calculating EAC equivalent...',
  'Signing transaction with ESIN credentials...',
  'Broadcasting to the Enviros Network...',
  'Awaiting network confirmation...',
  'Finalizing asset deployment...'
];

interface CarbonLedgerProps {
  user: User | null;
  onNavigate?: (view: View) => void;
}

export const CarbonLedger: React.FC<CarbonLedgerProps> = ({ user, onNavigate }) => {
  const [showMintModal, setShowMintModal] = useState(false);
  const [mintStatus, setMintStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');
  const [mintAmount, setMintAmount] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const [processingStep, setProcessingStep] = useState(0);

  const handleMint = () => {
    setMintStatus('PROCESSING');
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (mintStatus === 'PROCESSING' && processingStep < steps.length - 1) {
      interval = setInterval(() => {
        setProcessingStep(prev => prev + 1);
      }, 1500);
    } else if (mintStatus === 'PROCESSING' && processingStep === steps.length - 1) {
      setTimeout(() => {
        setMintStatus('SUCCESS');
        // Here you would typically update the user's balance
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [mintStatus, processingStep]);

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-earth-100 dark:bg-earth-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <LedgerHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <OffsetChart data={chartData} />
            <TransactionHistory />
          </div>
          <div className="space-y-8">
            <MintSidebar setShowMintModal={setShowMintModal} />
            <AuditSidebar />
          </div>
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
          projects={projects}
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
