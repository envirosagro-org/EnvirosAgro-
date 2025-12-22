import React from 'react';
import { Cloud, ShieldCheck, Award } from 'lucide-react';

export const ProfessionalView: React.FC = () => {
  return (
    <div className="animate-in slide-in-from-right-4 duration-500">
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <Cloud size={120} />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-200 mb-4">Total Registered Nodes</p>
            <div className="text-6xl font-serif font-bold mb-4 tracking-tighter">5,240</div>
            <div className="flex items-center gap-3">
              <span className="bg-white/20 px-3 py-1 rounded-full text-[9px] font-black uppercase">Live Registry</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]"></div>
            </div>
          </div>
        </div>
        <div className="ea-card p-10">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-400 mb-4">Verification Throughput</p>
          <div className="text-6xl font-serif font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">98.2%</div>
          <p className="text-[9px] text-blue-600 font-black uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck size={14} /> ESIN_SYNC_SECURED
          </p>
        </div>
        <div className="bg-agro-900 rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Award size={120} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-agro-300 mb-4">Ethical Compliance Index</p>
          <div className="text-6xl font-serif font-bold mb-4 tracking-tighter">A+</div>
          <p className="text-[9px] text-agro-400 font-black uppercase tracking-widest">CONDUCT_PROTOCOL_V4.2</p>
        </div>
      </div>
    </div>
  );
};
