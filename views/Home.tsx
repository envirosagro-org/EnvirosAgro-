
import React from 'react';
import { Hero } from '../components/Hero';
import { FrameworkDistinctions } from '../components/FrameworkDistinctions';
import { Cta } from '../components/Cta';
import { PeopleAndCulture } from '../components/PeopleAndCulture';
import { Podcast } from '../components/Podcast';
import { ImpactStats } from '../components/greenlens/ImpactStats';
import { 
  Globe, ShieldCheck, Zap, BarChart3, 
  ArrowRight, Users, Microscope, Database
} from 'lucide-react';
import { View, User } from '../types';

interface HomeProps {
    onNavigate: (view: View) => void;
    user: User | null;
}

const StrategicPillars = ({ onNavigate }: any) => (
    <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
                <div className="ea-label-meta mb-4">Strategic Architecture</div>
                <h2 className="text-4xl md:text-5xl font-serif font-black text-earth-900 dark:text-white leading-tight">
                    Standardizing <span className="text-agro-600 italic">Resilience</span> at Global Scale
                </h2>
                <p className="text-lg text-earth-500 mt-6 font-medium">
                    The EnvirosAgro ecosystem operates on the Five Thrusts framework, integrating horizontal technology with biological and social integrity.
                </p>
            </div>
            <button 
                onClick={() => onNavigate(View.SUSTAINABILITY_FRAMEWORK)}
                className="flex items-center gap-3 bg-earth-900 dark:bg-white text-white dark:text-earth-900 px-8 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
            >
                Explore Framework <ArrowRight size={18} />
            </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
                { 
                    title: 'Intelligence Nodes', 
                    desc: 'Standardized agricultural telemetry across 14 regional clusters.', 
                    icon: <Globe className="text-blue-500" />,
                    target: View.PLANET_WATCH 
                },
                { 
                    title: 'Strategic Audits', 
                    desc: 'Identifying professionalism-output gaps in industrial supply chains.', 
                    icon: <ShieldCheck className="text-agro-600" />,
                    target: View.SUPPLY_CHAIN_AUDIT
                },
                { 
                    title: 'M(t) Modeling', 
                    desc: 'Quantifying sustainability through advanced mathematical simulation.', 
                    icon: <Zap className="text-amber-500" />,
                    target: View.DASHBOARD
                },
                { 
                    title: 'Asset Ledger', 
                    desc: 'Minting verifiable carbon credits through biomass hashing.', 
                    icon: <Database className="text-purple-500" />,
                    target: View.CARBON_LEDGER
                }
            ].map((pillar, i) => (
                <div 
                    key={i} 
                    onClick={() => onNavigate(pillar.target)}
                    className="bg-white dark:bg-earth-900 p-10 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 shadow-sm group hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-125 transition-transform duration-700">
                        {React.cloneElement(pillar.icon as React.ReactElement, { size: 100 })}
                    </div>
                    <div className="w-14 h-14 bg-earth-50 dark:bg-earth-800 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-agro-50 transition-colors">
                        {pillar.icon}
                    </div>
                    <h3 className="text-xl font-bold text-earth-900 dark:text-white mb-3">{pillar.title}</h3>
                    <p className="text-xs text-earth-500 dark:text-earth-400 font-medium leading-relaxed mb-6">{pillar.desc}</p>
                    <div className="flex items-center gap-2 text-[9px] font-black text-agro-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        Access Node <ArrowRight size={12} />
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const UserStatsWidget = ({ user, onNavigate }: any) => {
    if (!user) return null;
    return (
        <section className="max-w-7xl mx-auto px-6 -mt-12 mb-24 relative z-20">
             <div className="bg-white dark:bg-earth-900 p-8 rounded-[3rem] shadow-strategic border border-earth-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-agro-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-agro-600/20">
                        <Microscope size={32} />
                    </div>
                    <div>
                        <span className="text-[10px] font-black text-earth-400 uppercase tracking-[0.2em] mb-1 block">Authenticated Node</span>
                        <h4 className="text-2xl font-serif font-black text-earth-900 dark:text-white">{user.name}</h4>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-12">
                   <div>
                      <span className="text-[9px] font-black text-earth-400 uppercase tracking-widest block mb-1 text-center">EAC Balance</span>
                      <span className="text-2xl font-black text-agro-600 block text-center">{user.eacBalance || 0}</span>
                   </div>
                   <div className="w-px h-10 bg-earth-100 dark:bg-earth-800 hidden md:block"></div>
                   <div>
                      <span className="text-[9px] font-black text-earth-400 uppercase tracking-widest block mb-1 text-center">Trust Index</span>
                      <span className="text-2xl font-black text-blue-600 block text-center">4.8/5</span>
                   </div>
                   <div className="w-px h-10 bg-earth-100 dark:border-earth-800 hidden md:block"></div>
                   <div>
                      <span className="text-[9px] font-black text-earth-400 uppercase tracking-widest block mb-1 text-center">Network Rank</span>
                      <span className="text-2xl font-black text-earth-900 dark:text-white block text-center">#14</span>
                   </div>
                </div>

                <button 
                    onClick={() => onNavigate(View.DASHBOARD)}
                    className="bg-earth-50 dark:bg-earth-800 hover:bg-earth-100 text-earth-900 dark:text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                >
                    Management Terminal
                </button>
             </div>
        </section>
    );
};

export const Home: React.FC<HomeProps> = ({ onNavigate, user }) => (
  <div className="bg-white dark:bg-earth-950 transition-colors duration-500">
    <Hero onNavigate={onNavigate} />
    
    <UserStatsWidget user={user} onNavigate={onNavigate} />
    
    <StrategicPillars onNavigate={onNavigate} />

    <div className="bg-earth-50 dark:bg-earth-900/50 py-24">
        <FrameworkDistinctions />
    </div>

    <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <div className="ea-label-meta mb-6 text-blue-600">Industrial Scale-Up</div>
                <h2 className="text-4xl md:text-6xl font-serif font-black text-earth-900 dark:text-white leading-none tracking-tighter mb-8">
                  From Knowledge <br/> to <span className="text-blue-600 italic">Execution</span>
                </h2>
                <p className="text-xl text-earth-500 dark:text-earth-400 font-medium leading-relaxed mb-10">
                   Access the ScaleUp Summit resources and the Supply Chain Gap Auditor to transition from small-scale prototyping to industrialized resilient production.
                </p>
                <div className="space-y-6 mb-12">
                   {[
                       "Standardized Resource Management",
                       "Direct Access to Finance Nodes",
                       "Automated ESG Compliance Logging"
                   ].map((item, i) => (
                       <div key={i} className="flex items-center gap-4 text-sm font-bold text-earth-700 dark:text-earth-300">
                          <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center">
                             <Zap size={14} fill="currentColor" />
                          </div>
                          {item}
                       </div>
                   ))}
                </div>
                <button 
                  onClick={() => onNavigate(View.SCALEUP_SUMMIT)}
                  className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                >
                   ScaleUp Portal <ArrowRight size={18} />
                </button>
            </div>
            <div className="relative">
                <div className="absolute -inset-4 bg-blue-500/10 blur-[80px] rounded-full"></div>
                <img 
                    src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=1200" 
                    className="rounded-[4rem] shadow-cinematic relative z-10 border-8 border-white dark:border-earth-800"
                    alt="Industrial Agriculture"
                />
            </div>
        </div>
    </section>

    <div className="border-y border-earth-100 dark:border-earth-800">
        <ImpactStats />
    </div>

    <Podcast />
    
    <div className="bg-earth-50 dark:bg-earth-900/50 py-24">
        <PeopleAndCulture user={user} onNavigate={onNavigate} />
    </div>

    <Cta 
      title="Ready to stabilize your m(t) score?" 
      subtitle="Join the 2,400+ nodes already optimizing regional agricultural resilience." 
      buttonText="Register Intelligence Node" 
      onClick={() => onNavigate(View.SIGN_UP)}
    />
  </div>
);
