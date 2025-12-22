import React, { useState, useEffect } from 'react';
import { 
  Network, Globe, Database, Cloud, Link2, 
  ArrowRightLeft, Zap, ShieldCheck, Search, Activity, 
  Terminal, Server, Box, Users, Factory, 
  ArrowUpRight, RefreshCw, Loader2, Info, MessageSquare,
  Twitter, Linkedin, ChevronRight, X, Lock, Cpu, 
  TrendingUp, CheckCircle2, Key, Layers, Smartphone, Signal, 
  BarChart3, Satellite, Share2, ShieldAlert, FileDown, ArrowDownLeft,
  ArrowRight, Radio, Wifi, HardDrive, Shield
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, Cell, Tooltip, XAxis, LineChart, Line } from 'recharts';
import { View } from '../types';

const CONNECTORS = [
  { id: 'cloud', name: 'Cloud Repositories', type: 'Storage Bases', icon: <Cloud size={24} />, desc: 'Automated data pooling from Azure, AWS, and private clouds.' },
  { id: 'intranet', name: 'Internal Intranets', type: 'Organizational Nodes', icon: <Shield size={24} />, desc: 'Synchronize staff nodes, internal projects, and private file systems.' },
  { id: 'extranet', name: 'Partner Extranets', type: 'Partner Networks', icon: <Globe size={24} />, desc: 'Bilateral information trade channels for authorized organizations.' },
  { id: 'iot', name: 'IoT Services', type: 'Sensor Swarms', icon: <Wifi size={24} />, desc: 'Real-time telemetry from field sensors, smart gates, and livestock tags.' },
  { id: 'internet', name: 'Global Internet', type: 'Public Intelligence', icon: <Globe size={24} />, desc: 'News ingest, API scraping, and public dataset crawling.' }
];

const RECENT_INGESTS = [
  { id: 1, source: 'AWS S3 Bucket', status: 'SYNCHRONIZED', thrust: 'IA', date: '2m ago', size: '1.2GB' },
  { id: 2, source: 'IoT Field G-4', status: 'PROCESSING', thrust: 'EA', date: '12m ago', size: '450MB' },
  { id: 3, source: 'Internal HR Node', status: 'SYNCHRONIZED', thrust: 'SA', date: '45m ago', size: '2.8GB' },
  { id: 4, source: 'UN FAO Database', status: 'VERIFYING', thrust: 'SA', date: '1h ago', size: '8.4GB' }
];

const SENTIMENT_DATA = [
  { name: 'RegenAg', value: 85 },
  { name: 'BioFuel', value: 64 },
  { name: 'm(t) Res', value: 92 },
  { name: 'Soil H', value: 78 },
  { name: 'UrbanF', value: 45 }
];

const TRADE_PARTNERS = [
  { id: 'fao-01', name: 'FAO Global', thrust: 'SA/EA', access: 'Standard' },
  { id: 'wah-22', name: 'World Agro Hub', thrust: 'IA', access: 'Premium' },
  { id: 'ss-sat', name: 'Sentinel-Sync', thrust: 'TA', access: 'Satellite' },
  { id: 'cgi-r', name: 'CGIAR Research', thrust: 'EA/HA', access: 'Full' }
];

interface NetworkInputHubProps {
  onNavigate?: (view: View) => void;
  isIntegrated?: boolean;
  partnerName?: string;
  partnerId?: string;
}

export const NetworkInputHub: React.FC<NetworkInputHubProps> = ({ 
  onNavigate, 
  isIntegrated = false,
  partnerName,
  partnerId
}) => {
  const [activeTab, setActiveTab] = useState<'CONNECTORS' | 'TRADE' | 'LOGS'>('CONNECTORS');
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [activeConfig, setActiveConfig] = useState<string | null>(null);
  const [activationStep, setActivationStep] = useState(0);
  const [isActivating, setIsActivating] = useState(false);
  const [activationSuccess, setActivationSuccess] = useState(false);

  const [showTradeTerminal, setShowTradeTerminal] = useState(false);
  const [tradeStep, setTradeStep] = useState(1);
  const [isTrading, setIsTrading] = useState(false);
  const [tradeSuccess, setTradeSuccess] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(TRADE_PARTNERS[0]);

  const steps = [
    "Initializing Edge Handshake...",
    "Validating Encryption Layer...",
    "Syncing Node Metadata...",
    "Finalizing Global Link..."
  ];

  const tradeVerificationSteps = [
    "Authenticating Bilateral Channel...",
    "Encrypting Outgoing Intelligence...",
    "Verifying Reciprocal Data Hash...",
    "Finalizing Handshake Protocol..."
  ];

  const handleSync = (id: string) => {
    setSyncingId(id);
    setTimeout(() => setSyncingId(null), 3000);
  };

  const handleStartActivation = () => {
    setIsActivating(true);
    setActivationStep(0);
    const interval = setInterval(() => {
      setActivationStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsActivating(false);
            setActivationSuccess(true);
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const resetActivation = () => {
    setActiveConfig(null);
    setActivationStep(0);
    setIsActivating(false);
    setActivationSuccess(false);
  };

  const handleStartTrade = () => {
    setIsTrading(true);
    setActivationStep(0);
    const interval = setInterval(() => {
        setActivationStep(prev => {
            if (prev >= tradeVerificationSteps.length - 1) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsTrading(false);
                    setTradeSuccess(true);
                }, 800);
                return prev;
            }
            return prev + 1;
        });
    }, 1200);
  };

  const resetTradeTerminal = () => {
    setShowTradeTerminal(false);
    setTradeStep(1);
    setTradeSuccess(false);
    setIsTrading(false);
  };

  if (!isIntegrated) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 animate-in fade-in duration-700 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="bg-slate-900 rounded-[5rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-cinematic border-8 border-slate-950 ring-1 ring-white/10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05] pointer-events-none"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-red-600/10 blur-[100px] rounded-full animate-pulse"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-32 h-32 bg-white/5 rounded-[3rem] flex items-center justify-center mx-auto mb-12 border-2 border-white/10 shadow-2xl backdrop-blur-md">
              <ShieldAlert size={64} className="text-red-500 animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-black tracking-tighter mb-8 leading-[1.1]">Restricted <span className="text-red-500 italic">Node Access</span></h2>
            <p className="text-xl text-slate-400 mb-16 leading-relaxed font-medium">
              Network Process 01 (External-to-Internal Uplink) requires a **Verified Organizational Handshake**. 
              Complete your automated integration and authorized payment via the Partnership Hub to merge with the global data core.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => onNavigate?.(View.PARTNERSHIPS)}
                className="bg-white text-slate-950 px-16 py-6 rounded-full font-black uppercase text-xs tracking-[0.4em] hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-6"
              >
                Go to Partnership Gateway <ArrowRight size={24} />
              </button>
              <div className="flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-widest px-4">
                 <Lock size={16} /> Encryption: Active
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderTradeTerminal = () => {
      if (!showTradeTerminal) return null;
      const renderStepContent = () => {
          if (tradeSuccess) {
              return (
                  <div className="text-center py-10 animate-in zoom-in duration-500">
                      <div className="w-24 h-24 bg-agro-500/20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-agro-500/30 shadow-inner text-agro-500">
                          <CheckCircle2 size={56} />
                      </div>
                      <h3 className="text-3xl font-serif font-black tracking-tight text-earth-900 dark:text-white uppercase mb-4">Trade Complete</h3>
                      <p className="text-earth-500 dark:text-earth-400 mb-10 max-w-sm mx-auto leading-relaxed font-medium italic">
                          Information packet successfully exchanged with {selectedPartner.name}. Resilience ledger updated.
                      </p>
                      <button onClick={resetTradeTerminal} className="bg-agro-900 text-white px-12 py-5 rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] shadow-xl active:scale-95 transition-all">Return to Trade Hub</button>
                  </div>
              );
          }
          if (isTrading) {
              return (
                <div className="py-20 flex flex-col items-center justify-center gap-10">
                    <div className="relative">
                        <div className="w-40 h-40 rounded-full border-4 border-blue-500/10 border-t-blue-500 animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <ArrowRightLeft size={48} className="text-blue-500 animate-pulse" />
                        </div>
                    </div>
                    <div className="text-center">
                        <h4 className="text-white font-mono text-xl font-bold mb-2 tracking-widest">{tradeVerificationSteps[activationStep]}</h4>
                    </div>
                </div>
              );
          }
          if (tradeStep === 1) {
              return (
                  <div className="space-y-10 animate-in slide-in-from-right-4">
                      <div className="space-y-6">
                        <label className="text-[10px] font-black text-earth-400 uppercase tracking-[0.4em] px-1">Select Verified Trade Partner</label>
                        <div className="grid grid-cols-2 gap-4">
                            {TRADE_PARTNERS.map(partner => (
                                <button key={partner.id} onClick={() => setSelectedPartner(partner)} className={`p-6 rounded-[2rem] border-2 text-left transition-all ${selectedPartner.id === partner.id ? 'bg-blue-600/10 border-blue-500 text-blue-600 shadow-lg' : 'bg-white dark:bg-earth-800 border-earth-100 dark:border-earth-700 text-earth-400'}`}>
                                    <h5 className="font-bold text-earth-900 dark:text-white text-sm mb-1">{partner.name}</h5>
                                </button>
                            ))}
                        </div>
                      </div>
                      <button onClick={() => setTradeStep(2)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[2rem] text-[10px] uppercase tracking-[0.4em] shadow-xl active:scale-95 transition-all">Initialize Bilateral Link</button>
                  </div>
              );
          }
          return (
              <div className="space-y-10 animate-in slide-in-from-right-4">
                  <button onClick={handleStartTrade} className="py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 w-full">
                      <Lock size={18} /> Execute Trade Request
                  </button>
              </div>
          );
      };
      return (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-earth-950/90 backdrop-blur-3xl animate-in fade-in duration-300">
              <div className="bg-white dark:bg-earth-900 w-full max-w-3xl rounded-[4rem] shadow-cinematic border border-white/10 overflow-hidden flex flex-col max-h-[90vh]">
                  <div className="bg-slate-900 p-10 text-white flex justify-between items-center shrink-0 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-5"><ArrowRightLeft size={300} /></div>
                      <h3 className="text-3xl font-serif font-black tracking-tight relative z-10">{isTrading ? 'Exchange in Progress' : tradeSuccess ? 'Trade Authenticated' : 'Trade Protocol Hub'}</h3>
                      <button onClick={resetTradeTerminal} className="p-3 hover:bg-white/10 rounded-2xl transition-all relative z-10"><X size={28} /></button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-earth-50/20 dark:bg-earth-950/20">{renderStepContent()}</div>
              </div>
          </div>
      );
  };

  const renderConfigTerminal = () => {
    if (!activeConfig) return null;

    const renderContent = () => {
        if (activationSuccess) {
            return (
                <div className="text-center py-10 animate-in zoom-in">
                    <CheckCircle2 size={56} className="text-agro-500 mx-auto mb-6" />
                    <h3 className="text-3xl font-serif font-black text-earth-900 dark:text-white mb-4 uppercase">Node Active</h3>
                    <p className="text-earth-500 dark:text-earth-400 mb-10 max-w-sm mx-auto font-medium italic">Handshake confirmed. This transmission node is now embedded in Process 01.</p>
                    <button onClick={resetActivation} className="bg-agro-900 text-white px-12 py-5 rounded-[2rem] font-black uppercase text-xs tracking-[0.3em]">Return to Hub</button>
                </div>
            );
        }

        if (isActivating) {
            return (
                <div className="py-20 flex flex-col items-center justify-center gap-10">
                    <div className="w-24 h-24 border-[6px] border-blue-500/20 border-t-blue-500 animate-spin rounded-full"></div>
                    <h4 className="text-white font-mono text-xl font-bold mb-2 tracking-widest uppercase">{steps[activationStep]}</h4>
                </div>
            );
        }

        switch (activeConfig) {
            case 'cloud':
                return (
                    <div className="space-y-8 animate-in slide-in-from-right-4">
                        <div className="grid grid-cols-2 gap-4">
                            {['AWS S3 Bucket', 'Azure Blob', 'Google Cloud', 'Private NAS'].map(base => (
                                <div key={base} className="p-6 bg-white dark:bg-earth-800 rounded-3xl border border-earth-100 dark:border-earth-700 flex flex-col items-center text-center group cursor-pointer hover:border-blue-400 transition-all">
                                    <Cloud className="text-blue-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                                    <p className="text-[10px] font-black text-earth-900 dark:text-white uppercase tracking-widest">{base}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleStartActivation} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[2rem] text-[10px] uppercase tracking-[0.4em] shadow-xl">Mount Cloud Repositories</button>
                    </div>
                );
            case 'intranet':
                return (
                    <div className="space-y-8 animate-in slide-in-from-right-4">
                        <div className="bg-slate-900 p-8 rounded-[3rem] border border-white/5 shadow-inner">
                           <div className="flex items-center gap-4 mb-8">
                               <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400 border border-blue-500/20 shadow-xl"><Shield size={24} /></div>
                               <h4 className="text-xl font-serif font-bold text-white">Intranet Uplink Status</h4>
                           </div>
                           <div className="space-y-4">
                               {['Org Staff Node', 'Project Files v4', 'Financial Vault'].map(n => (
                                   <div key={n} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                                       <span className="text-xs font-bold text-slate-300 uppercase">{n}</span>
                                       <span className="text-[9px] font-black text-agro-500 uppercase tracking-widest">VERIFIED</span>
                                   </div>
                               ))}
                           </div>
                        </div>
                        <button onClick={handleStartActivation} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[2rem] text-[10px] uppercase tracking-[0.4em] shadow-xl">Synchronize Internal Nodes</button>
                    </div>
                );
            case 'extranet':
                return (
                    <div className="space-y-8 animate-in slide-in-from-right-4">
                        <div className="bg-white dark:bg-earth-800 p-8 rounded-[3rem] border-2 border-dashed border-earth-200 dark:border-earth-700 text-center">
                            <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner text-blue-600">
                                <Link2 size={40} />
                            </div>
                            <h4 className="text-xl font-bold text-earth-900 dark:text-white mb-2">Partner Whitelist</h4>
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="space-y-1">
                                    <p className="text-[8px] font-black text-earth-400 uppercase text-left pl-1">Partner Node ID</p>
                                    <input className="w-full bg-earth-50 dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-xl px-4 py-2 text-xs font-bold dark:text-white" placeholder="EA-EXT-000" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[8px] font-black text-earth-400 uppercase text-left pl-1">Pass-Code</p>
                                    <input type="password" placeholder="••••" className="w-full bg-earth-50 dark:bg-earth-900 rounded-xl px-4 py-2 text-xs font-bold dark:text-white" />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleStartActivation} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[2rem] text-[10px] uppercase tracking-[0.4em] shadow-xl">Activate Extranet Link</button>
                    </div>
                );
            case 'iot':
                return (
                    <div className="space-y-8 animate-in slide-in-from-right-4">
                        <div className="bg-slate-900 p-10 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-8 opacity-5 text-agro-400"><Wifi size={200}/></div>
                           <div className="relative z-10">
                              <h4 className="text-2xl font-serif font-bold text-white mb-6">IoT Fleet Discovery</h4>
                              <div className="space-y-4">
                                 {[
                                    { name: 'Plot G-4 Moisture', rssi: '-42 dBm', color: 'text-green-500' },
                                    { name: 'H-Type Drone Swarm', rssi: '-68 dBm', color: 'text-amber-500' },
                                    { name: 'Main Gate Sensor', rssi: 'OFFLINE', color: 'text-red-500' }
                                 ].map(s => (
                                    <div key={s.name} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                                        <div className="flex items-center gap-3">
                                            <Wifi size={14} className="text-blue-500" />
                                            <span className="text-xs font-bold text-slate-300">{s.name}</span>
                                        </div>
                                        <span className={`text-[10px] font-black uppercase ${s.color}`}>{s.rssi}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                        <button onClick={handleStartActivation} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[2rem] text-[10px] uppercase tracking-[0.4em] shadow-xl">Engage IoT Swarm</button>
                    </div>
                );
            case 'internet':
                return (
                    <div className="space-y-8 animate-in slide-in-from-right-4">
                        <div className="bg-slate-950 p-8 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden h-[300px] flex flex-col">
                            <div className="absolute top-0 right-0 p-8 opacity-5 text-blue-400"><Globe size={200} /></div>
                            <div className="flex justify-between items-center mb-8 relative z-10">
                                <h4 className="font-mono text-blue-400 text-xs font-bold uppercase tracking-widest">Public_Crawler_Active</h4>
                                <div className="flex gap-2">
                                    <div className="p-2 bg-white/5 rounded-lg text-slate-500 border border-white/10"><Search size={14} /></div>
                                    <div className="p-2 bg-white/5 rounded-lg text-slate-500 border border-white/10"><Globe size={14} /></div>
                                </div>
                            </div>
                            <div className="flex-1 font-mono text-[10px] text-green-500 space-y-1 ea-scroll-area">
                                <p className="animate-in fade-in">GET https://fao.org/data/ag-indices...</p>
                                <p className="animate-in fade-in delay-100">Status: 200 OK | Hashing Results...</p>
                                <p className="animate-in fade-in delay-200">Scraping Coffee Market Prices: +2.4% Delta</p>
                                <p className="animate-in fade-in delay-300">Syncing with NOAA Weather Stream...</p>
                                <p className="animate-pulse opacity-50 mt-4">{'>'} WAITING_FOR_UPLINK_COMMAND_</p>
                            </div>
                        </div>
                        <button onClick={handleStartActivation} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[2rem] text-[10px] uppercase tracking-[0.4em] shadow-xl">Initialize Public Ingest</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
      <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-earth-950/90 backdrop-blur-3xl animate-in fade-in duration-300">
        <div className="bg-white dark:bg-earth-900 w-full max-w-3xl rounded-[4rem] shadow-cinematic border border-white/10 overflow-hidden flex flex-col max-h-[90vh]">
          <div className="bg-slate-900 p-10 text-white flex justify-between items-center shrink-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12"><Terminal size={300} /></div>
            <div className="relative z-10 flex items-center gap-6">
              <div className="p-4 bg-white/10 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md text-blue-400">
                {isActivating ? <RefreshCw className="animate-spin" size={32} /> : activationSuccess ? <CheckCircle2 size={32} className="text-agro-500" /> : <Activity size={32} />}
              </div>
              <div>
                <h3 className="text-3xl font-serif font-black tracking-tight">{isActivating ? 'Activating Node' : activationSuccess ? 'Node Verified' : 'Source Connector'}</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.4em] mt-1">{activeConfig?.toUpperCase()}_CONFIG_V4.2</p>
              </div>
            </div>
            {!isActivating && (
              <button onClick={resetActivation} className="relative z-10 p-3 hover:bg-white/10 rounded-2xl transition-all hover:rotate-90">
                <X size={28} />
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-earth-50/20 dark:bg-earth-950/20">
            {renderContent()}
          </div>
          <div className="p-8 bg-earth-50 dark:bg-earth-950/50 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-center gap-3 shrink-0">
            <ShieldCheck size={18} className="text-blue-500" />
            <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Sovereign Data Storage • SHA-256 Encrypted Handshake</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      {renderConfigTerminal()}
      {renderTradeTerminal()}
      
      <div className="ea-header-block p-10 mb-10 bg-slate-900/5 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-inner backdrop-blur-3xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex-1">
              <div className="ea-label-meta mb-2"><Network size={12} className="text-blue-500" /> Process 01: External-to-Internal Uplink</div>
              <h1 className="text-4xl md:text-6xl font-serif font-black text-earth-900 dark:text-white tracking-tighter">Network <span className="text-blue-600 italic">Input Hub</span></h1>
              <div className="mt-8 flex items-center gap-4 animate-in slide-in-from-left-2">
                  <div className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-lg">
                      <ShieldCheck size={16} /> Partner: {partnerName || 'ORGANIZATION'}
                  </div>
                  <div className="px-4 py-2 bg-white dark:bg-earth-800 border border-blue-100 dark:border-blue-800 rounded-xl text-[10px] font-mono text-blue-500">
                      SyncID: {partnerId || 'EA-PART-SYNC'}
                  </div>
              </div>
           </div>
           <div className="flex gap-4 items-center shrink-0">
              <div className="bg-agro-50 dark:bg-agro-900/30 px-6 py-3 rounded-2xl border border-agro-100 dark:border-agro-800 text-agro-700 dark:text-agro-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-3">
                 <Activity size={16} className="animate-pulse" /> UPLINK_ACTIVE
              </div>
           </div>
        </div>
      </div>

      <div className="flex justify-center mb-12 overflow-x-auto no-scrollbar pb-2">
        <div className="agro-glass p-1.5 rounded-[2rem] flex gap-1 border border-earth-200 dark:border-white/5 backdrop-blur-xl shrink-0">
           {[{ id: 'CONNECTORS', label: 'Systems & Connectors', icon: <Link2 size={14}/> }, { id: 'TRADE', label: 'Information Trade', icon: <ArrowRightLeft size={14}/> }, { id: 'LOGS', label: 'Ingest Logs', icon: <Terminal size={14}/> }].map(tab => (
             <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === tab.id ? 'bg-agro-600 text-white shadow-lg' : 'text-earth-400 hover:text-earth-900 dark:hover:text-white'}`}>{tab.icon} {tab.label}</button>
           ))}
        </div>
      </div>

      {activeTab === 'CONNECTORS' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CONNECTORS.map((conn) => (
                <div key={conn.id} className="ea-card p-10 flex flex-col group hover:shadow-cinematic hover:-translate-y-1 transition-all duration-700 bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800">
                   <div className="flex justify-between items-start mb-8">
                      <div className="p-4 bg-earth-50 dark:bg-earth-800 rounded-[1.2rem] text-earth-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/40 group-hover:text-blue-600 transition-all shadow-inner border border-black/5 group-hover:rotate-6">{conn.icon}</div>
                      <button onClick={() => handleSync(conn.id)} disabled={syncingId === conn.id} className={`p-3 rounded-xl transition-all shadow-sm ${syncingId === conn.id ? 'bg-agro-50 dark:bg-agro-900/30 text-agro-600' : 'bg-earth-50 dark:bg-earth-800 text-earth-400 hover:text-agro-600'}`}>{syncingId === conn.id ? <Loader2 size={18} className="animate-spin" /> : <RefreshCw size={18} />}</button>
                   </div>
                   <div className="flex-1">
                      <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.4em] block mb-3">{conn.type}</span>
                      <h3 className="text-2xl font-bold text-earth-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors tracking-tight">{conn.name}</h3>
                      <p className="text-sm text-earth-500 dark:text-earth-400 leading-relaxed font-medium mb-10 opacity-80">{conn.desc}</p>
                   </div>
                   <button onClick={() => setActiveConfig(conn.id)} className="w-full py-4 border-2 border-earth-50 dark:border-earth-800 rounded-2xl text-[9px] font-black uppercase tracking-widest text-earth-400 hover:text-blue-600 hover:border-blue-100 dark:hover:border-blue-900/50 transition-all flex items-center justify-center gap-3 group/btn">Configure Link <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" /></button>
                </div>
              ))}
           </div>
        </div>
      )}

      {activeTab === 'TRADE' && (
        <div className="animate-in slide-in-from-right-4 duration-500 space-y-12">
           <div className="grid lg:grid-cols-2 gap-12 items-stretch">
              <div className="bg-white dark:bg-earth-900 p-12 rounded-[3.5rem] border border-earth-100 dark:border-earth-800 shadow-sm flex flex-col">
                 <h3 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-8 flex items-center gap-5">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600"><ArrowRightLeft size={28} /></div>
                    Trade Protocol
                 </h3>
                 <div className="space-y-6 flex-1">
                    {[ { label: 'Market Availability', val: 'Active', color: 'text-agro-500' }, { label: 'Trade Balance', val: '+2.4 TB', color: 'text-blue-500' }, { label: 'Security Clearance', val: 'Level 4', color: 'text-slate-400' } ].map(stat => (
                      <div key={stat.label} className="flex justify-between items-center p-6 bg-earth-50 dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-800">
                         <span className="text-[10px] font-black uppercase tracking-widest text-earth-400">{stat.label}</span>
                         <span className={`text-base font-black tracking-tight ${stat.color}`}>{stat.val}</span>
                      </div>
                    ))}
                 </div>
                 <button onClick={() => setShowTradeTerminal(true)} className="w-full mt-12 bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-3xl text-xs uppercase tracking-[0.3em] shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-4">Initialize Trade Request <ArrowUpRight size={20} /></button>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'LOGS' && (
        <div className="animate-in fade-in duration-500">
           <div className="bg-white dark:bg-earth-900 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm overflow-hidden flex flex-col h-[500px]">
              <div className="p-8 border-b border-earth-100 dark:border-earth-800 bg-earth-50 dark:bg-earth-800/50 flex justify-between items-center">
                 <h3 className="font-bold text-lg text-earth-900 dark:text-white flex items-center gap-3">
                    <Terminal size={20} className="text-blue-500" /> Ingest Audit Log
                 </h3>
                 <div className="flex gap-4 text-[9px] font-black uppercase text-earth-400">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 bg-agro-500 rounded-full"></div> Synchronized</span>
                    <span className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div> Processing</span>
                 </div>
              </div>
              <div className="flex-1 overflow-y-auto ea-scroll-area p-8">
                 <table className="w-full text-left">
                    <thead className="text-[10px] font-black text-earth-300 uppercase tracking-widest border-b border-earth-50 dark:border-earth-800">
                       <tr>
                          <th className="pb-6 px-4">Node Origin</th>
                          <th className="pb-6 px-4">Registry Thrust</th>
                          <th className="pb-6 px-4">Payload Size</th>
                          <th className="pb-6 px-4">Timestamp</th>
                          <th className="pb-6 px-4 text-right">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-earth-50 dark:divide-earth-800">
                       {RECENT_INGESTS.map(log => (
                         <tr key={log.id} className="group hover:bg-earth-50/50 dark:hover:bg-earth-800/50 transition-all">
                            <td className="py-6 px-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-earth-50 dark:bg-earth-800 flex items-center justify-center text-blue-500 shadow-inner group-hover:scale-110 transition-transform"><Globe size={16} /></div><span className="text-sm font-bold text-earth-900 dark:text-white">{log.source}</span></div></td>
                            <td className="py-6 px-4"><span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800">{log.thrust} THRUST</span></td>
                            <td className="py-6 px-4 text-sm font-mono text-earth-500">{log.size}</td>
                            <td className="py-6 px-4 text-xs font-bold text-earth-400 uppercase">{log.date}</td>
                            <td className="py-6 px-4 text-right"><span className={`text-[10px] font-black uppercase tracking-widest ${log.status === 'SYNCHRONIZED' ? 'text-agro-600' : log.status === 'PROCESSING' ? 'text-blue-600 animate-pulse' : 'text-amber-600'}`}>{log.status}</span></td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      )}

      <div className="mt-32 pt-16 border-t border-earth-100 dark:border-earth-800 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-earth-400">
         <div className="flex items-center gap-8">
            <span className="hover:text-agro-600 transition-colors cursor-default flex items-center gap-3"><Globe size={14} /> Global Input Authority</span>
            <span className="hover:text-agro-600 transition-colors cursor-default flex items-center gap-3"><ShieldCheck size={14} /> End-to-End Data Sovereignty</span>
         </div>
         <p className="opacity-40">INPUT GATEWAY v4.2.2-INGEST</p>
      </div>
    </div>
  );
};