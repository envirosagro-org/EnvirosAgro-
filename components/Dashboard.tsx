import React from 'react';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { MetricCards } from './dashboard/MetricCards';
import { PerformanceChart } from './dashboard/PerformanceChart';
import { FutureVisionWidget } from './dashboard/FutureVisionWidget';
import { View } from '../types';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#050a14] pt-24 px-4 sm:px-6 lg:px-8">
      <DashboardHeader />
      <main className="max-w-[1700px] mx-auto mt-8">
        <div className="flex justify-end mb-4">
          <button 
            onClick={() => onNavigate(View.IMPACT_DASHBOARD)} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            View Impact Dashboard
          </button>
        </div>
        <MetricCards />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PerformanceChart />
          </div>
          <div>
            <FutureVisionWidget />
          </div>
        </div>
      </main>
    </div>
  );
};