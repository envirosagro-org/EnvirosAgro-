
import React from 'react';
import { View } from '../types';
import { InputForm } from './network/InputForm';
import { IntegrationDetails } from './network/IntegrationDetails';
import { PastSubmissions } from './network/PastSubmissions';

interface NetworkInputHubProps {
  onNavigate: (view: View) => void;
  isIntegrated: boolean;
  partnerName: string | undefined;
  partnerId: string | undefined;
}

export const NetworkInputHub: React.FC<NetworkInputHubProps> = ({ onNavigate, isIntegrated, partnerName, partnerId }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Network Input Hub</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">A centralized point for our partners to submit data directly into our ecosystem.</p>
        </header>
        
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <InputForm isIntegrated={isIntegrated} partnerName={partnerName} partnerId={partnerId} />
          </div>
          <div>
            <IntegrationDetails 
              isIntegrated={isIntegrated} 
              partnerName={partnerName} 
              onNavigate={() => onNavigate(View.PARTNERSHIPS)} 
            />
            <PastSubmissions />
          </div>
        </main>
      </div>
    </div>
  );
};
