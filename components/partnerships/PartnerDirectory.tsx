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

      {/* New Automated Gateway CTA */}
      <div className="bg-blue-600 text-white rounded-[4rem] p-16 relative overflow-hidden shadow-2xl border-4 border-white/10 text-center">
        <div className="absolute top-0 right-0 p-16 opacity-10"><Layers size={300} /></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="text-[10px] font-black text-blue-200 uppercase tracking-[0.4em] mb-4">Automation First</div>
          <h3 className="text-4xl font-serif font-bold mb-6">Automated Onboarding Gateway</h3>
          <p className="text-blue-200 text-lg mb-10 leading-relaxed font-medium">
            Our streamlined gateway uses AI to validate and integrate new partners, accelerating collaboration and impact.
          </p>
          <button
            onClick={() => setActiveTab('AUTOMATED_GATEWAY')}
            className="bg-white text-blue-600 px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            Start Automated Onboarding
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {partnerCategories.map((cat) => (
          <div key={cat.id} className="bg-earth-50 dark:bg-earth-900/50 rounded-[4rem] p-10 flex flex-col border border-earth-100 dark:border-white/5 transition-all hover:shadow-2xl group">
            <div className="bg-white dark:bg-earth-800 p-8 rounded-[2.5rem] mb-12 shadow-sm border border-earth-100 dark:border-white/10 relative flex-grow flex flex-col">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-10 ${cat.color} shadow-inner`}>
                {cat.icon}
              </div>
              <h3 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-6 leading-tight">{cat.title}</h3>
              <p className="text-earth-500 dark:text-earth-400 text-sm leading-relaxed mb-10 font-medium opacity-80 flex-grow">
                {cat.description}
              </p>

              <div className="mt-auto">
                <ul className="space-y-4 mb-10">
                  {cat.opportunities.map((opp: string) => (
                    <li key={opp} className="flex items-center gap-3 text-[9px] font-black text-earth-400 dark:text-earth-400 uppercase tracking-[0.2em]">
                      <span className="w-1.5 h-1.5 bg-agro-500 rounded-full"></span> {opp}
                    </li>
                  ))}
                </ul>

                <div className="pt-8 border-t border-earth-100 dark:border-white/5 text-center">
                    <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('AUTOMATED_GATEWAY'); }} className="text-blue-600 hover:text-blue-500 font-bold text-xs uppercase tracking-widest">
                        Learn More & Apply
                    </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
