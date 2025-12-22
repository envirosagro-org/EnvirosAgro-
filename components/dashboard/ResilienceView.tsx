import React from 'react';
import { MetricCards } from './MetricCards';
import { PerformanceChart } from './PerformanceChart';
import { FutureVisionWidget } from './FutureVisionWidget';
import { View } from '../../types';

interface ResilienceViewProps {
  networkHealth: any[];
  dynamicTrend: any[];
  chartMetric: string;
  setChartMetric: (metric: any) => void;
  metricConfig: any;
  onNavigate: (view: View) => void;
}

export const ResilienceView: React.FC<ResilienceViewProps> = ({
  networkHealth,
  dynamicTrend,
  chartMetric,
  setChartMetric,
  metricConfig,
  onNavigate,
}) => {
  return (
    <div className="animate-in slide-in-from-left-4 duration-500">
      <MetricCards networkHealth={networkHealth} />

      <div className="grid lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-8">
          <PerformanceChart
            dynamicTrend={dynamicTrend}
            chartMetric={chartMetric}
            setChartMetric={setChartMetric}
            metricConfig={metricConfig}
          />
        </div>
        <div className="lg:col-span-4 flex flex-col gap-8">
          <FutureVisionWidget onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
};
