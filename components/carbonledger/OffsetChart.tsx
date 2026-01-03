import React, { useEffect, useRef } from 'react';
import { createChart, IChartApi, ISeriesApi } from 'lightweight-charts';
import { TrendingUp, Download } from 'lucide-react';

interface OffsetChartProps {
  data: any[];
}

export const OffsetChart: React.FC<OffsetChartProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi>();
  const seriesRef = useRef<ISeriesApi<"Bar">>();

  useEffect(() => {
    if (chartContainerRef.current) {
      chartRef.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        layout: {
          backgroundColor: '#ffffff',
          textColor: '#333',
        },
        grid: {
          vertLines: {
            visible: false,
          },
          horzLines: {
            color: '#f0f0f0',
          },
        },
        rightPriceScale: {
          borderColor: '#e0e0e0',
        },
        timeScale: {
          borderColor: '#e0e0e0',
        },
      });

      seriesRef.current = chartRef.current.addBarSeries({
        color: '#22c55e',
      });

      if (data) {
        seriesRef.current.setData(data);
      }
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [data]);

  return (
    <div className="bg-white dark:bg-earth-900 p-8 rounded-3xl shadow-sm border border-earth-100 dark:border-earth-800">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-bold text-earth-900 dark:text-white flex items-center gap-2">
          <TrendingUp size={20} className="text-agro-600" /> Monthly Offset Performance
        </h3>
        <button className="text-xs font-bold text-agro-600 hover:underline flex items-center gap-1">
          <Download size={14} /> Export CSV
        </button>
      </div>
      <div ref={chartContainerRef} className="h-64 w-full" />
    </div>
  );
};
