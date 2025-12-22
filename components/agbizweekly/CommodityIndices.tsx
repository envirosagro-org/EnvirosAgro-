import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';

export const CommodityIndices: React.FC = () => {
  const indices = [
    { label: 'FAO Food Price Index', val: '118.4' },
    { label: 'World Fertilizer Index', val: '245.2' },
    { label: 'Global Freight Rate', val: '$2,400' },
    { label: 'Biofuel Demand', val: '+4.2%' }
  ];

  return (
    <div className="bg-white border border-earth-200 rounded-3xl p-8 shadow-sm">
      <h4 className="font-black text-slate-900 mb-6 text-[10px] uppercase tracking-[0.25em] border-b border-earth-100 pb-3 flex justify-between items-center">
        Commodity Indices <TrendingUp size={14} className="text-blue-600" />
      </h4>
      <ul className="space-y-5">
        {indices.map((link, i) => (
          <li key={i} className="flex justify-between items-center text-sm group cursor-pointer">
            <span className="text-earth-600 group-hover:text-blue-600 transition-colors font-bold">{link.label}</span>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-slate-400 group-hover:text-blue-600">{link.val}</span>
              <ArrowRight size={14} className="text-earth-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
