import React from 'react';
import { Globe, TrendingUp, TrendingDown } from 'lucide-react';

interface MarketTickerProps {
  tickerItems: any[];
}

export const MarketTicker: React.FC<MarketTickerProps> = ({ tickerItems }) => {
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-4 mb-12 shadow-lg overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-8 min-w-max">
        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-r border-slate-700 pr-4">
          <Globe size={14} /> Global Markets
        </span>
        {tickerItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="font-bold text-sm text-slate-200">{item.name}</span>
            <span className="font-mono text-sm">{item.price}</span>
            <span className={`text-xs font-bold flex items-center px-1.5 py-0.5 rounded ${item.up ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {item.up ? <TrendingUp size={10} className="mr-1" /> : <TrendingDown size={10} className="mr-1" />}
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
