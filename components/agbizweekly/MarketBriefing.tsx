import React from 'react';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';

export const MarketBriefing: React.FC = () => {
  const commodities = [
    { name: 'Hard Red Wheat', price: '$242.50', change: '+1.2%', trend: 'up', volume: '12.4k' },
    { name: 'Arabica Coffee', price: '$184.20', change: '-0.8%', trend: 'down', volume: '8.1k' },
    { name: 'Yellow Maize', price: '$156.00', change: '+2.4%', trend: 'up', volume: '45.2k' },
    { name: 'Soybean Oil', price: '$1,120.40', change: '0.0%', trend: 'stable', volume: '5.6k' },
    { name: 'Raw Sugar', price: '$22.15', change: '+4.5%', trend: 'up', volume: '18.9k' },
  ];

  return (
    <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-[3rem] p-10 shadow-sm mb-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-2xl font-bold text-earth-900 dark:text-white">Market Briefing</h3>
          <p className="text-earth-500 dark:text-earth-400 text-sm mt-1">Real-time commodity valuation and trading volume.</p>
        </div>
        <div className="flex items-center gap-2 bg-earth-50 dark:bg-earth-800 px-4 py-2 rounded-xl border border-earth-100 dark:border-earth-800">
           <Info size={14} className="text-earth-400" />
           <span className="text-[10px] font-black uppercase tracking-widest text-earth-400">Data delayed 15m</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-earth-100 dark:border-earth-800 pb-4">
              <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-earth-400">Commodity Asset</th>
              <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-earth-400">Last Price (USD)</th>
              <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-earth-400">24h Change</th>
              <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-earth-400">Trade Volume</th>
              <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-earth-400 text-right">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-earth-50 dark:divide-earth-800/50">
            {commodities.map((c, i) => (
              <tr key={i} className="group hover:bg-earth-50 dark:hover:bg-earth-800/30 transition-colors">
                <td className="py-6 font-bold text-earth-900 dark:text-white">{c.name}</td>
                <td className="py-6 font-mono font-bold text-earth-600 dark:text-earth-300">{c.price}</td>
                <td className={`py-6 font-mono font-bold ${c.trend === 'up' ? 'text-green-600' : c.trend === 'down' ? 'text-red-600' : 'text-blue-600'}`}>
                  {c.change}
                </td>
                <td className="py-6 font-mono text-earth-500">{c.volume} t</td>
                <td className="py-6 text-right">
                  <div className="inline-flex items-center justify-center p-2 rounded-lg bg-earth-50 dark:bg-earth-800 group-hover:bg-white dark:group-hover:bg-earth-700 transition-colors">
                    {c.trend === 'up' ? <TrendingUp size={16} className="text-green-600" /> : 
                     c.trend === 'down' ? <TrendingDown size={16} className="text-red-600" /> : 
                     <Minus size={16} className="text-blue-600" />}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 flex justify-center">
         <button className="text-[10px] font-black uppercase tracking-widest text-agro-600 bg-agro-50 px-8 py-4 rounded-xl hover:bg-agro-100 transition-all active:scale-95 shadow-sm">
            Access Terminal Level Data
         </button>
      </div>
    </div>
  );
};
