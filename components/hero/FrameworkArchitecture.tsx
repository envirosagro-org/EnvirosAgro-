import React from 'react';
import { View } from '../../types';
import { Users, Leaf, ShieldCheck, Cpu, Layers, ChevronRight } from 'lucide-react';

interface Thrust {
  id: string;
  label: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
  bg: string;
  border: string;
  target: View;
}

const thrusts: Thrust[] = [
    { 
      id: 'SA', label: "Social", icon: Users, title: "Social Immunity", desc: "Diagnosing fractures like SI-D to build durable communal bonds.",
      color: "text-rose-500", bg: "bg-rose-500/5", border: "border-rose-500/20", target: View.COMMUNITY
    },
    { 
      id: 'EA', label: "Environmental", icon: Leaf, title: "Resource Integrity", desc: "Regenerating soil health and localized biomass reserves.",
      color: "text-green-500", bg: "bg-green-500/5", border: "border-green-500/20", target: View.CARBON_LEDGER
    },
    { 
      id: 'HA', label: "Health", icon: ShieldCheck, title: "Biological Safety", desc: "Standardizing safety protocols for human and plant health.",
      color: "text-red-500", bg: "bg-red-500/5", border: "border-red-500/20", target: View.SAFE_HARVEST
    },
    { 
      id: 'TA', label: "Technical", icon: Cpu, title: "AI Precision", desc: "Optimizing efficiency through diagnostic neural networks.",
      color: "text-blue-500", bg: "bg-blue-500/5", border: "border-blue-500/20", target: View.ROADMAP_AI
    },
    { 
      id: 'IA', label: "Industrial", icon: Layers, title: "Value Maturity", desc: "Scaling supply chains to global industrial standards.",
      color: "text-slate-400", bg: "bg-slate-500/5", border: "border-slate-500/20", target: View.SCALEUP_SUMMIT
    }
];

interface FrameworkArchitectureProps {
  activeThrust: string | null;
  setActiveThrust: (id: string | null) => void;
  onNavigate: (view: View) => void;
}

export const FrameworkArchitecture: React.FC<FrameworkArchitectureProps> = ({ activeThrust, setActiveThrust, onNavigate }) => {
  return (
    <section className="w-full mb-56 px-12 max-w-[1700px] mx-auto">
      <div className="text-center mb-32 max-w-5xl mx-auto">
        <div className="ea-label-meta justify-center mb-6">Framework Architecture</div>
        <h3 className="text-6xl md:text-9xl font-serif font-bold text-slate-900 dark:text-white tracking-tighter leading-[0.8] mb-12">
          The Ecosystem <br/><span className="text-agro-600 italic">Matrix</span>
        </h3>
        <p className="text-2xl md:text-3xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-balance max-w-4xl mx-auto">
          Sustainable Integrated Development is measured through five specialized domains, each ensuring growth is socially equitable and environmentally secure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {thrusts.map((thrust) => {
          const Icon = thrust.icon;
          return (
            <div 
              key={thrust.id}
              onMouseEnter={() => setActiveThrust(thrust.id)}
              onClick={() => onNavigate(thrust.target)}
              className={`p-12 rounded-[4rem] flex flex-col items-center text-center group h-full transition-all duration-1000 border-4 cursor-pointer ${
                activeThrust === thrust.id 
                ? `${thrust.bg} ${thrust.border} scale-[1.05] z-10 shadow-cinematic-xl ring-1 ring-white/10` 
                : 'bg-white/50 dark:bg-white/5 border-transparent opacity-60 grayscale hover:grayscale-0 hover:opacity-100'
              }`}
            >
              <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center mb-12 shadow-2xl transition-all duration-1000 group-hover:rotate-[360deg] ${
                activeThrust === thrust.id ? 'bg-white dark:bg-slate-800 scale-110 shadow-strategic' : 'bg-white dark:bg-white/10'
              } ${thrust.color}`}>
                <Icon size={38} />
              </div>
              <h4 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] leading-none mb-8">{thrust.label}</h4>
              <p className="text-base font-bold text-slate-500 dark:text-slate-400 leading-relaxed mb-16 flex-1">{thrust.desc}</p>
              
              <div className={`w-16 h-16 rounded-1.8rem border-2 flex items-center justify-center transition-all duration-500 ${
                activeThrust === thrust.id ? `${thrust.color} border-agro-500/30 rotate-45 bg-agro-500/10` : 'border-slate-200 dark:border-white/5 text-slate-300'
              }`}>
                <ChevronRight size={28} />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  );
};