import React from 'react';

interface TickerProps {
  tickerItems: string[];
}

export const Ticker: React.FC<TickerProps> = ({ tickerItems }) => {
  return (
    <div className="bg-agro-900 text-white py-4 px-8 rounded-3xl overflow-hidden mb-16 shadow-2xl flex items-center gap-6 border border-agro-800">
      <div className="flex items-center gap-2 font-black text-xs uppercase tracking-[0.2em] text-red-500 shrink-0 border-r border-agro-700 pr-6">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div> BREAKING
      </div>
      <div className="flex-1 overflow-hidden relative h-5">
        <div className="absolute whitespace-nowrap animate-[marquee_25s_linear_infinite] text-sm font-bold text-agro-100 tracking-wide">
          {tickerItems.map((item, i) => <span key={i} className="mr-24">{item}</span>)}
        </div>
      </div>
    </div>
  );
};
