import React from 'react';
import { History, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface HistoryWidgetProps {
  transactions: any[];
}

export const HistoryWidget: React.FC<HistoryWidgetProps> = ({ transactions }) => {
  return (
    <div className="space-y-6 pt-10 border-t border-earth-100 dark:border-earth-800">
      <h3 className="font-black text-earth-900 dark:text-white flex items-center gap-3 text-sm uppercase tracking-[0.4em] px-2">
        <History size={18} className="text-earth-400" /> Recent History
      </h3>
      <div className="space-y-3">
        {transactions.map(tx => (
          <div key={tx.id} className="p-5 bg-white dark:bg-earth-900 rounded-[1.5rem] flex items-center justify-between border border-earth-100 dark:border-earth-800 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${tx.type === 'EARN' ? 'text-green-600 bg-green-50/50 dark:bg-green-900/20' : 'text-red-600 bg-red-50/50 dark:bg-red-900/20'}`}>
                {tx.type === 'EARN' ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-white leading-none mb-1">{tx.source}</h4>
                <p className="text-[9px] text-earth-400 uppercase font-black tracking-widest">{tx.date}</p>
              </div>
            </div>
            <span className={`text-base font-serif font-bold ${tx.type === 'EARN' ? 'text-green-600' : 'text-red-600'}`}>{tx.type === 'EARN' ? '+' : '-'}{tx.amount}</span>
          </div>
        ))}
      </div>
      <button className="w-full py-4 text-[10px] font-black text-earth-400 hover:text-agro-600 transition-colors uppercase tracking-[0.4em] text-center border-t border-earth-100 dark:border-earth-800 mt-4">
        View Entire Transmission History
      </button>
    </div>
  );
};
