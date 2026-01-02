import React from 'react';
import { BarChart, TrendingDown, AlertTriangle } from 'lucide-react';

const PARETO_DATA = [
  { cause: 'Outdated firmware', frequency: 128, percentage: 51.2 },
  { cause: 'Sensor drift', frequency: 62, percentage: 76.0 },
  { cause: 'Network latency', frequency: 31, percentage: 88.4 },
  { cause: 'API timeout', frequency: 15, percentage: 94.4 },
  { cause: 'Power fluctuation', frequency: 9, percentage: 98.0 },
  { cause: 'Other', frequency: 5, percentage: 100.0 },
];

export const ParetoChart = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h4 className="font-bold text-lg text-earth-900 dark:text-white">Pareto Analysis of Failure Modes</h4>
          <p className="text-sm text-earth-600 dark:text-earth-400">Identifying the vital few causes from the trivial many.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 p-2 rounded-lg">
            <AlertTriangle size={14} />
            <p><strong>80/20 Rule:</strong> 76% of failures from 2 causes.</p>
        </div>
      </div>
      
      <div className="w-full h-80 bg-earth-50 dark:bg-earth-800/40 p-4 rounded-xl border border-earth-100 dark:border-earth-800">
        <div className="h-full flex items-end gap-3 relative">
          {/* Cumulative Line */}
          <svg className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="none">
            <path 
              d={`M ${100/12}% ${100-51.2}% L ${100/12*3}% ${100-76}% L ${100/12*5}% ${100-88.4}% L ${100/12*7}% ${100-94.4}% L ${100/12*9}% ${100-98}% L ${100/12*11}% ${100-100}%`}
              fill="none"
              stroke="#f59e0b" // amber-500
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>
          
          {PARETO_DATA.map((data, index) => (
            <div key={index} className="flex-1 h-full flex flex-col justify-end items-center gap-1 group">
              <div 
                className="w-[60%] bg-purple-500 dark:bg-purple-600 group-hover:bg-purple-400 transition-colors rounded-t-md shadow-lg"
                style={{ height: `${data.frequency / 1.5}%` }}
              ></div>
              <p className="text-[10px] text-earth-600 dark:text-earth-400 font-medium text-center">{data.cause}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}