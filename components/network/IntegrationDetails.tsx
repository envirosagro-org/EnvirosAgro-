
import React from 'react';

interface IntegrationDetailsProps {
  isIntegrated: boolean;
  partnerName: string | undefined;
  onNavigate: () => void;
}

export const IntegrationDetails: React.FC<IntegrationDetailsProps> = ({ isIntegrated, partnerName, onNavigate }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Integration Status</h3>
      {isIntegrated ? (
        <div>
          <p className="text-gray-700 dark:text-gray-200">Currently integrated with {partnerName}.</p>
          <button 
            onClick={onNavigate} 
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            View Integration
          </button>
        </div>
      ) : (
        <div>
          <p className="text-gray-700 dark:text-gray-200">Not currently integrated with a partner.</p>
          <button 
            onClick={onNavigate} 
            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Connect to a Partner
          </button>
        </div>
      )}
    </div>
  );
};
