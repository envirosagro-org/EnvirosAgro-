import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const VerificationProtocol: React.FC = () => {
  return (
    <div className="bg-white dark:bg-earth-900 p-8 rounded-3xl shadow-sm border border-earth-100 dark:border-earth-800">
      <h3 className="font-bold text-earth-900 dark:text-white mb-4 flex items-center gap-2">
        <ShieldCheck className="text-blue-600" /> Verification Protocol
      </h3>
      <p className="text-earth-600 dark:text-earth-400 text-sm mb-6">
        Your sequestration data is cross-verified via the <strong className="text-agro-600">m(t) Resilience Metric</strong> ensuring highest integrity for market trading.
      </p>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-xs text-earth-500">
          <div className="w-1.5 h-1.5 bg-agro-500 rounded-full"></div>
          Satellite Biomass Analysis
        </div>
        <div className="flex items-center gap-3 text-xs text-earth-500">
          <div className="w-1.5 h-1.5 bg-agro-500 rounded-full"></div>
          In-situ Soil Carbon Testing
        </div>
        <div className="flex items-center gap-3 text-xs text-earth-500">
          <div className="w-1.5 h-1.5 bg-agro-500 rounded-full"></div>
          Chain-of-Custody Logging
        </div>
      </div>
    </div>
  );
};
