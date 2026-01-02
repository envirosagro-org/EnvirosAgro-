import React from 'react';
import { 
  Twitter, Facebook, Linkedin, Globe, Activity, Zap, Cpu, Users, 
  ShieldCheck, Layers, ArrowUpRight, Mail, Phone, MapPin, 
  Lock, Terminal, Heart, Database, Sprout, Briefcase, ClipboardCheck
} from 'lucide-react';
import { Logo } from './Logo';
import { View } from '../types';

interface FooterProps {
  onNavigate: (view: View) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, url: '#' },
    { name: 'Facebook', icon: Facebook, url: '#' },
    { name: 'LinkedIn', icon: Linkedin, url: '#' },
  ];

  const legalLinks = [
    { view: View.PRIVACY_POLICY, label: "Privacy Sovereignty" },
    { view: View.TRADEMARKS, label: "Legal & IP" },
    { view: View.COMMUNITY_GUIDELINES, label: "Ethical Code" }
  ];

  return (
    <footer className="bg-[#050a14] dark:bg-earth-950 text-slate-400 pt-24 pb-12 px-8 relative overflow-hidden border-t border-white/5">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-600/40 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-agro-500/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>

      <div className="mx-auto max-w-[1700px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-16 mb-24">
            
            {/* Column 1: Identity & Mission */}
            <div className="space-y-8">
                <div onClick={() => onNavigate(View.HOME)} className="cursor-pointer inline-block">
                    <Logo size={40} variant="horizontal" color="white" />
                </div>
                <p className="leading-relaxed text-slate-400 font-medium text-xs uppercase tracking-[0.2em] max-w-xs">
                  EnvirosAgro is a pioneering organization committed to establishing a comprehensive network that advances and supports global agricultural resilience.
                </p>
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 italic text-[10px] text-slate-500 leading-relaxed font-serif">
                   "To ensure agriculture and its environ is smooth, reliable and safe."
                </div>
                <div className="flex gap-4">
                    {socialLinks.map(social => (
                        <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 hover:bg-blue-600 hover:text-white rounded-xl flex items-center justify-center transition-all cursor-pointer text-slate-500 border border-white/10 group shadow-lg">
                            <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                        </a>
                    ))}
                </div>
            </div>

            {/* Column 2: Strategic Hubs */}
            <div className="space-y-8">
                <h4 className="text-white font-black uppercase tracking-[0.5em] text-[10px] flex items-center gap-3 pb-3 border-b border-white/5">
                    <Zap size={14} className="text-amber-500" /> Control Hub
                </h4>
                <ul className="space-y-4">
                    {[
                      { view: View.NETWORK_INPUT_HUB, label: 'Network Ingest Hub' },
                      { view: View.DASHBOARD, label: 'Impact Dashboard' },
                      { view: View.FUTURE_VISION, label: 'Vision Lab' },
                      { view: View.SUSTAINABILITY_FRAMEWORK, label: 'Thrust Matrix' },
                    ].map(link => (
                      <li key={link.view} onClick={() => onNavigate(link.view)} className="cursor-pointer hover:text-agro-400 transition-all flex items-center gap-3 text-xs font-bold uppercase tracking-wider group">
                         <div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-agro-500 transition-all"></div>
                         {link.label}
                      </li>
                    ))}
                </ul>
            </div>

            {/* Column 3: Tech Units */}
            <div className="space-y-8">
                <h4 className="text-white font-black uppercase tracking-[0.5em] text-[10px] flex items-center gap-3 pb-3 border-b border-white/5">
                    <Cpu size={14} className="text-blue-500" /> Tech & Strategy
                </h4>
                <ul className="space-y-4">
                    {[
                      { view: View.CROP_DOCTOR, label: 'AI Diagnostic' },
                      { view: View.FARM_SCOUT, label: 'Field Telemetry' },
                      { view: View.SMART_FARM_VR, label: 'Virtual Training' },
                      { view: View.SERVICES, label: 'Scientific Services' },
                      { view: View.ROADMAP_AI, label: 'AI Roadmap' }
                    ].map(link => (
                      <li key={link.view} onClick={() => onNavigate(link.view)} className="cursor-pointer hover:text-blue-400 transition-all flex items-center gap-3 text-xs font-bold uppercase tracking-wider group">
                         <div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-blue-500 transition-all"></div>
                         {link.label}
                      </li>
                    ))}
                </ul>
            </div>

            {/* Column 4: Ecosystem */}
            <div className="space-y-8">
                <h4 className="text-white font-black uppercase tracking-[0.5em] text-[10px] flex items-center gap-3 pb-3 border-b border-white/5">
                    <Users size={14} className="text-rose-500" /> Collective
                </h4>
                <ul className="space-y-4">
                    {[
                      { view: View.COMMUNITY, label: 'Member Hubs' },
                      { view: View.FINANCE, label: 'Tokenz™ Node' },
                      { view: View.INVESTOR_PORTAL, label: 'Capital Node' },
                      { view: View.BRANDS, label: 'Portfolio' },
                      { view: View.KNOWLEDGE, label: 'Intelligence Base' }
                    ].map(link => (
                      <li key={link.view} onClick={() => onNavigate(link.view)} className="cursor-pointer hover:text-rose-400 transition-all flex items-center gap-3 text-xs font-bold uppercase tracking-wider group">
                         <div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-rose-500 transition-all"></div>
                         {link.label}
                      </li>
                    ))}
                </ul>
            </div>

            {/* Column 5: Global Status */}
            <div className="space-y-8">
                <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 shadow-inner relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform duration-1000"><Globe size={100} /></div>
                    <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                        <span className="text-[10px] font-black text-agro-500 uppercase tracking-[0.4em]">Grid_Active</span>
                    </div>
                    <div className="space-y-4 mb-8 relative z-10">
                        <p className="text-[11px] text-slate-400 font-bold uppercase leading-relaxed tracking-wider">
                          Central Hub <br/>
                          <span className="text-slate-500">Kiriaini, Murang'a Cluster <br/> East Africa, 0.45S, 36.9E</span>
                        </p>
                        <p className="text-[11px] text-slate-400 font-bold uppercase leading-relaxed tracking-wider">
                          Global Comms <br/>
                          <span className="text-blue-500 lowercase">envirosagro.com@gmail.com</span>
                        </p>
                    </div>
                    <button onClick={() => onNavigate(View.TRANSMISSION_GATEWAY)} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl text-[9px] uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                      Open Transmission Gateway
                    </button>
                </div>
            </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-[9px] font-black uppercase tracking-[0.5em] text-slate-600">
              <p>© {new Date().getFullYear()} ENVIROSAGRO STRATEGIC INFRASTRUCTURE. ALL ASSETS HASHED VIA m(t) LEDGER.</p>
              
              <div className="flex gap-12">
                  {legalLinks.map(link => (
                    <span key={link.view} onClick={() => onNavigate(link.view)} className="hover:text-white cursor-pointer transition-colors">
                      {link.label}
                    </span>
                  ))}
              </div>

              <div className="flex items-center gap-4 bg-white/5 px-8 py-3 rounded-full border border-white/10 group cursor-default">
                  <Activity size={16} className="text-blue-500 animate-pulse group-hover:scale-125 transition-transform" />
                  <span className="text-slate-400 group-hover:text-white transition-colors">UPLINK_STABLE: v4.2.2-G_NODE</span>
              </div>
          </div>
        </div>
    </footer>
  );
};