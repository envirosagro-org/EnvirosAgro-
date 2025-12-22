import React, { useState, useMemo, useEffect } from 'react';
import { View } from '../types';

import { DashboardHeader } from './dashboard/DashboardHeader';
import { ResilienceView } from './dashboard/ResilienceView';
import { ProfessionalView } from './dashboard/ProfessionalView';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

const INITIAL_TREND_DATA = [
  { month: 'Jan', resilience: 2.4, yield: 45, carbon: 1.2, workers: 850 },
  { month: 'Feb', resilience: 2.8, yield: 52, carbon: 2.1, workers: 1200 },
  { month: 'Mar', resilience: 3.1, yield: 48, carbon: 1.8, workers: 1800 },
  { month: 'Apr', resilience: 3.5, yield: 62, carbon: 3.5, workers: 2400 },
  { month: 'May', resilience: 4.2, yield: 75, carbon: 4.2, workers: 3800 },
  { month: 'Jun', resilience: 4.8, yield: 88, carbon: 5.8, workers: 5200 },
];

const NETWORK_HEALTH = [
  { name: 'Optimal', value: 85, fill: '#16a34a' },
  { name: 'Critical', value: 15, fill: '#f1f5f9' },
];

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'RESILIENCE' | 'PROFESSIONAL'>('RESILIENCE');
  const [chartMetric, setChartMetric] = useState<'resilience' | 'yield' | 'carbon' | 'workers'>('resilience');
  const [isLivePulse, setIsLivePulse] = useState(false);
  const [dynamicTrend, setDynamicTrend] = useState(INITIAL_TREND_DATA);

  useEffect(() => {
    let interval: any;
    if (isLivePulse) {
      interval = setInterval(() => {
        setDynamicTrend(prev => prev.map(item => ({
          ...item,
          [chartMetric]: item[chartMetric as keyof typeof item] as number * (1 + (Math.random() * 0.04 - 0.02))
        })));
      }, 2000);
    } else {
      setDynamicTrend(INITIAL_TREND_DATA);
    }
    return () => clearInterval(interval);
  }, [isLivePulse, chartMetric]);

  const metricConfig = useMemo(() => {
    switch (chartMetric) {
      case 'yield': return { key: 'yield', color: '#3b82f6', label: 'Verified Yield' };
      case 'carbon': return { key: 'carbon', color: '#0ea5e9', label: 'Carbon Seq' };
      case 'workers': return { key: 'workers', color: '#6366f1', label: 'Registered Professionals' };
      default: return { key: 'resilience', color: '#16a34a', label: 'Verified Resilience' };
    }
  }, [chartMetric]);

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-6 min-h-screen animate-in fade-in duration-700">
      <DashboardHeader
        isLivePulse={isLivePulse}
        setIsLivePulse={setIsLivePulse}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setChartMetric={setChartMetric}
        onNavigate={onNavigate}
      />

      {activeTab === 'RESILIENCE' ? (
        <ResilienceView
          networkHealth={NETWORK_HEALTH}
          dynamicTrend={dynamicTrend}
          chartMetric={chartMetric}
          setChartMetric={setChartMetric}
          metricConfig={metricConfig}
          onNavigate={onNavigate}
        />
      ) : (
        <ProfessionalView />
      )}
    </div>
  );
};
