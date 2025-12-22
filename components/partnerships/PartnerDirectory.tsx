import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';

interface PartnerDirectoryProps {
  partnerCategories: any[];
  setActiveTab: (tab: any) => void;
}

export const PartnerDirectory: React.FC<PartnerDirectoryProps> = ({ partnerCategories, setActiveTab }) => {
  return (
    <div className="space-y-20 animate-in slide-in-from-bottom-4 duration-500">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-serif font-bold text-agro-900 dark:text-white mb-6 tracking-tight">Strategic Alliances</h2>
        <p className="text-xl text-earth-500 dark:text-earth-400 leading-relaxed font-medium">
          We collaborate with global leaders to synchronize industrial operations with the Five Thrusts framework.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {partnerCategories.map((cat) => (
          <div key={cat.id} className="bg-earth-50 dark:bg-earth-900/50 rounded-[4rem] p-10 flex flex-col border border-earth-100 dark:border-white/5 transition-all hover:shadow-2xl group">
            <div className="bg-white dark:bg-earth-800 p-8 rounded-[2.5rem] mb-12 shadow-sm border border-earth-100 dark:border-white/10 relative">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-10 ${cat.color} shadow-inner`}>
                {cat.icon}
              </div>
              <h3 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-6 leading-tight">{cat.title}</h3>
              <p className="text-earth-500 dark:text-earth-400 text-sm leading-relaxed mb-10 font-medium opacity-80">
                {cat.description}
              </p>

              <ul className="space-y-4 mb-10">
                {cat.opportunities.map((opp: string) => (
                  <li key={opp} className="flex items-center gap-3 text-[9px] font-black text-earth-400 dark:text-earth-400 uppercase tracking-[0.2em]">
                    <span className="w-1.5 h-1.5 bg-agro-500 rounded-full"></span> {opp}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setActiveTab('AUTOMATED_GATEWAY')}
                className="w-full pt-8 border-t border-earth-100 dark:border-white/5 flex items-center justify-center gap-2 text-[10px] font-black text-earth-800 dark:text-earth-200 uppercase tracking-[0.3em] hover:text-agro-600 transition-colors group/btn"
              >
                APPLY VIA AUTOMATED GATEWAY <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-earth-950 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl border-4 border-white/5">
        <div className="absolute top-0 right-0 p-16 opacity-5"><Layers size={300} /></div>
        <div className="max-w-2xl relative z-10">
          <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4">Industrial Maturity</div>
          <h3 className="text-4xl font-serif font-bold mb-6">Cross-Sector Innovation</h3>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">Our open innovation model allows partners to share data securely through the EnvirosAgro Data Base, improving regional maturity scores collectively.</p>
          <button
            onClick={() => setActiveTab('AUTOMATED_GATEWAY')}
            className="bg-white text-earth-950 px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            Start Automated Onboarding
          </button>
        </div>
      </div>
    </div>
  );
};
