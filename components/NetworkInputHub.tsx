import React from 'react';
import { NetworkHeader } from './network/NetworkHeader';
import { InputForm } from './network/InputForm';
import { DataVisualization } from './network/DataVisualization';
import { NetworkActivity } from './network/NetworkActivity';

export const NetworkInputHub: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NetworkHeader />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <InputForm />
          </div>
          <div>
            <DataVisualization />
            <NetworkActivity />
          </div>
        </div>
      </div>
    </div>
  );
};