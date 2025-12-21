import React, { useState } from 'react';
import { 
  Users, MapPin, Briefcase, GraduationCap, 
  Search, Plus, Upload, TrendingUp, Award, BookOpen, Zap, Filter,
  Cloud, ShieldCheck, Fingerprint, Star, ArrowRight, CheckCircle2,
  AlertCircle, FileText, Globe, Activity, Smartphone, QrCode,
  Loader2, Network, Factory, Database, ShoppingBag, ArrowUpRight,
  ShieldAlert, Terminal, Lock, BarChart3
} from 'lucide-react';
import { View, User } from '../types';

const WORKERS_CLOUD = [
  {
    id: 1,
    name: "Dr. Elena Rossi",
    role: "Senior Agronomist",
    type: "Researcher",
    location: "Nairobi, Kenya",
    available: true,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60",
    skills: ["Soil Chemistry", "Crop Genetics", "IPM"],
    esin: "EA-RES-2024-8842"
  },
  {
    id: 2,
    name: "Samuel Kweli",
    role: "Precision Ag Operator",
    type: "Technical Specialist",
    location: "Kampala, Uganda",
    available: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
    skills: ["Drone Piloting", "IoT Systems", "GIS Mapping"],
    esin: "EA-TEC-2024-9102"
  }
];

const VALUE_CHAIN_LINKS = [
  { id: 'registry', label: 'Cloud Registry', icon: <Fingerprint size={20} />, status: 'ACTIVE', desc: 'Verified professional identity node.' },
  { id: 'telemetry', label: 'Field Telemetry', icon: <Smartphone size={20} />, status: 'LINKED', desc: 'Direct input to Farm Scout networks.' },
  { id: 'supply', label: 'Supply Audit', icon: <Factory size={20} />, status: 'AUTHORIZED', desc: 'Verify batches for industrial maturity.' },
  { id: 'capital', label: 'Capital Exchange', icon: <Zap size={20} />, status: 'ELIGIBLE', desc: 'Access Tokenz™ micro-grant tiers.' }
];

const PROFESSIONAL_LEDGER = [
  { id: 'TX-884', type: 'BATCH_VERIFY', asset: 'Kiriaini Arabica Lot #4', date: '2h ago', points: '+15 XP' },
  { id: 'TX-901', type: 'DATA_CONTRIBUTE', asset: 'Q2 Soil Integrity Log', date: '5h ago', points: '+25 XP' },
  { id: 'TX-772', type: 'SECURITY_AUDIT', asset: 'Zone A-4 Node Sync', date: 'Yesterday', points: '+10 XP' }
];

const JOBS_LIST = [
  {
    id: 1,
    title: "Regional Sustainability Lead",
    org: "GreenEarth Co-op",
    location: "Kiriaini, Kenya",
    type: "Full-Time",
    salary: "$2,500 - $3,500",
    posted: "2 days ago",
    description: "Seeking a visionary leader to oversee the implementation of the EA thrust across 500 smallholder farms."
  }
];

const CAREER_PATHWAYS = [
  {
    id: 1,
    title: "Certified Sustainable Agronomist (CSA)",
    provider: "EnvirosAgro Academy",
    duration: "6 Months",
    level: "Advanced",
    icon: <Award size={32} className="text-amber-600" />,
    color: "bg-amber-50 border-amber-100",
    desc: "Master the principles of the Five Thrusts and soil regeneration techniques."
  }
];

interface HumanResourceProps {
    user: User | null;
    onNavigate?: (view: View) => void;
    initialTab?: 'CLOUD' | 'JOBS' | 'REGISTER' | 'CAREER';
}

export const HumanResource: React.FC<HumanResourceProps> = ({ user, onNavigate, initialTab = 'JOBS' }) => {
  const [activeTab, setActiveTab] = useState<'CLOUD' | 'JOBS' | 'REGISTER' | 'CAREER'>(initialTab);
  const [agreedToConduct, setAgreedToConduct] = useState(false);
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [cloudJoined, setCloudJoined] = useState(false);

  const handleApply = (title: string) => {
    alert(`Starting application for: ${title}. Redirecting to enrollment...`);
    if(onNavigate) onNavigate(View.SIGN_UP);
  };

  const handleJoinCloud = () => {
    if (!agreedToConduct) {
        alert("Please review and agree to the Code of Agriculture Conduct to join the Professional Cloud.");
        return;
    }
    setIsCloudSyncing(true);
    setTimeout(() => {
        setIsCloudSyncing(false);
        setCloudJoined(true);
    }, 2500);
  };

  const renderAgroWorkersCloud = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
        {/* Cloud Welcome & Branding */}
        <div className="bg-blue-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl border-4 border-blue-950/20">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-[5s]">
                <Cloud size={400} className="text-white" />
            </div>
            <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-8">
                    <div className="flex items-center gap-3 text-blue-300 font-black uppercase tracking-[0.4em] text-[10px] mb-6">
                        <div className="w-8 h-px bg-blue-400"></div>
                        <Globe size={14} /> Professional Registry Node
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight">Agro Workers <span className="text-blue-400 italic">Cloud</span></h1>
                    <p className="text-blue-100 text-lg leading-relaxed mb-8 font-medium max-w-xl">
                        The global professional ledger for agricultural practitioners. Verifiable status, network-wide credentials, and ethical conduct tracking.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={() => onNavigate?.(View.DASHBOARD)} className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-3 transition-all group">
                            <BarChart3 size={18} className="text-blue-400 group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-black uppercase tracking-widest">Live Cloud Analytics</span>
                        </button>
                        <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-3">
                            <Activity size={18} className="text-green-400" />
                            <span className="text-xs font-black uppercase tracking-widest">Live Sync OK</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 flex flex-col items-center">
                    {cloudJoined ? (
                        <div className="bg-white/95 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-blue-100 text-slate-900 w-full text-center animate-in zoom-in">
                            <CheckCircle2 size={48} className="text-green-600 mx-auto mb-4" />
                            <h3 className="font-bold text-xl mb-2">Cloud Credentials Active</h3>
                            <p className="text-xs text-slate-500 uppercase font-black tracking-widest mb-6">Linked to {user?.esin || 'EA-MEMBER'}</p>
                            <button onClick={() => onNavigate?.(View.PROFILE)} className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-xl">View Professional ID</button>
                        </div>
                    ) : (
                        <div className="bg-black/20 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 w-full">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Zap size={18} className="text-blue-400" /> Join the Registry
                            </h3>
                            <p className="text-blue-100/60 text-xs mb-6 leading-relaxed">
                                Align your profession with the code of agriculture conduct to unlock premium industrial tiers.
                            </p>
                            <button 
                                onClick={handleJoinCloud}
                                disabled={isCloudSyncing}
                                className="w-full bg-blue-500 hover:bg-blue-400 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {isCloudSyncing ? <Loader2 size={18} className="animate-spin" /> : <><ShieldCheck size={18} /> Initialize Enrollment</>}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Value Chain Connectivity Map Section */}
        <div className="bg-white dark:bg-earth-900 p-10 rounded-[3.5rem] border border-earth-100 dark:border-earth-800 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-[0.02] pointer-events-none"></div>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6 relative z-10">
                <div>
                   <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white">Value Chain Connectivity</h3>
                   <p className="text-sm text-earth-500 dark:text-earth-400 font-medium">Visualizing your professional nodes across the EnvirosAgro network.</p>
                </div>
                <div className="flex gap-4">
                   <div className="bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-xl text-[10px] font-black uppercase text-blue-600 border border-blue-100 dark:border-blue-800 flex items-center gap-2">
                       <Database size={14} /> ESIN Sync: ACTIVE
                   </div>
                   <div className="bg-agro-50 dark:bg-agro-900/30 px-4 py-2 rounded-xl text-[10px] font-black uppercase text-agro-600 border border-agro-100 dark:border-agro-800 flex items-center gap-2">
                       <Zap size={14} /> Power Level: LVL 4
                   </div>
                </div>
            </div>

            <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-agro-500 to-amber-500 opacity-20 hidden lg:block -translate-y-1/2"></div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    {VALUE_CHAIN_LINKS.map((link) => (
                        <div key={link.id} className="bg-white dark:bg-earth-800 p-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-700 shadow-sm hover:shadow-xl transition-all group flex flex-col items-center text-center">
                            <div className={`w-16 h-16 rounded-2xl bg-earth-50 dark:bg-earth-900 flex items-center justify-center mb-6 shadow-inner border border-black/5 transition-transform duration-700 group-hover:rotate-12 ${link.status === 'ACTIVE' ? 'text-blue-600' : link.status === 'LINKED' ? 'text-agro-600' : 'text-amber-500'}`}>
                                {link.icon}
                            </div>
                            <h4 className="font-bold text-earth-900 dark:text-white mb-2">{link.label}</h4>
                            <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest mb-4 border ${link.status === 'ACTIVE' ? 'bg-blue-50 text-blue-600 border-blue-100' : link.status === 'LINKED' ? 'bg-agro-50 text-agro-600 border-agro-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                {link.status}
                            </span>
                            <p className="text-xs text-earth-500 dark:text-earth-400 font-medium leading-relaxed">{link.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
            {/* Left: Professional Directory & Activity */}
            <div className="lg:col-span-8 space-y-8">
                <div className="flex justify-between items-center mb-2 px-2">
                    <h3 className="text-xl font-serif font-bold text-earth-900 dark:text-white">Professional Directory</h3>
                    <div className="flex gap-2">
                         <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-300" size={14} />
                            <input type="text" placeholder="Search professionals..." className="pl-9 pr-4 py-2 bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white" />
                         </div>
                         <button className="p-2 bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-xl text-earth-400"><Filter size={16} /></button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {WORKERS_CLOUD.map(worker => (
                        <div key={worker.id} className="bg-white dark:bg-earth-900 p-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden border-2 border-blue-50 dark:border-blue-900 shadow-md">
                                        <img src={worker.image} className="w-full h-full object-cover" alt={worker.name} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-earth-900 dark:text-white leading-tight">{worker.name}</h4>
                                        <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mt-1">{worker.type}</p>
                                    </div>
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-lg text-[8px] font-black text-green-600 border border-green-100 dark:border-green-800">
                                    VERIFIED
                                </div>
                            </div>
                            
                            <div className="flex-1 space-y-4 mb-8">
                                <p className="text-xs text-earth-500 dark:text-earth-400 flex items-center gap-2"><MapPin size={12} className="text-red-500" /> {worker.location}</p>
                                <div className="flex flex-wrap gap-2">
                                    {worker.skills.map(skill => (
                                        <span key={skill} className="px-3 py-1 bg-earth-50 dark:bg-earth-800 rounded-full text-[9px] font-bold text-earth-500">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-earth-50 dark:border-earth-800 flex justify-between items-center">
                                <div>
                                    <p className="text-[8px] font-black text-earth-300 uppercase">Linked ESIN</p>
                                    <p className="font-mono text-[9px] text-slate-500">{worker.esin}</p>
                                </div>
                                <button className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Professional Action Ledger */}
                <div className="bg-white dark:bg-earth-900 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-earth-100 dark:border-earth-800 flex justify-between items-center bg-earth-50/30 dark:bg-earth-950/30">
                        <h3 className="font-bold text-lg text-earth-900 dark:text-white flex items-center gap-3">
                            <Terminal size={20} className="text-blue-500" /> Professional Action Ledger
                        </h3>
                        <div className="flex gap-4 text-[8px] font-black uppercase text-earth-400">
                           <span className="flex items-center gap-2"><div className="w-2 h-2 bg-agro-500 rounded-full"></div> Synchronized</span>
                           <span className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div> Broadcast</span>
                        </div>
                    </div>
                    <div className="p-4">
                        <table className="w-full text-left">
                            <thead className="bg-earth-50 dark:bg-earth-950/90 text-[7px] font-black text-earth-400 uppercase tracking-[0.3em] border-b border-earth-50 dark:border-earth-800">
                                <tr>
                                    <th className="px-6 py-3">Transmission ID</th>
                                    <th className="px-6 py-3">Action Type</th>
                                    <th className="px-6 py-3">Impact Points</th>
                                    <th className="px-6 py-3 text-right">Timecode</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-earth-50 dark:divide-earth-800">
                                {PROFESSIONAL_LEDGER.map(tx => (
                                    <tr key={tx.id} className="hover:bg-earth-50/50 dark:hover:bg-earth-800/30 transition-all group">
                                        <td className="px-6 py-4 font-mono text-[10px] text-blue-600">{tx.id}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-earth-100 dark:bg-earth-800 px-2 py-0.5 rounded text-[8px] font-black text-earth-600 dark:text-earth-400 uppercase">{tx.type.replace('_', ' ')}</span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-[10px] text-agro-600">{tx.points}</td>
                                        <td className="px-6 py-4 text-right text-[10px] text-earth-400 font-bold uppercase">{tx.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Right: Code of Conduct & Profile Link */}
            <div className="lg:col-span-4 space-y-8">
                <div className="bg-white dark:bg-earth-900 p-10 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm relative overflow-hidden">
                    <h3 className="font-black text-earth-900 dark:text-white text-xs uppercase tracking-widest mb-8 flex items-center gap-3">
                        <FileText size={18} className="text-blue-600" /> Professional Conduct
                    </h3>
                    <div className="space-y-6 mb-10">
                        {[
                            "Maintain m(t) data integrity and honesty.",
                            "Prioritize environmental regeneration.",
                            "Respect communal heritage and social SA values.",
                            "Uphold health and safety HA standards."
                        ].map((rule, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                                <p className="text-xs text-earth-600 dark:text-earth-400 font-medium leading-relaxed">{rule}</p>
                            </div>
                        ))}
                    </div>

                    {!cloudJoined && (
                        <div className="flex items-center gap-3 p-4 bg-earth-50 dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-700 cursor-pointer transition-colors hover:bg-earth-100 dark:hover:bg-earth-700" onClick={() => setAgreedToConduct(!agreedToConduct)}>
                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${agreedToConduct ? 'bg-blue-600 border-blue-600' : 'border-earth-200'}`}>
                                {agreedToConduct && <CheckCircle2 size={14} className="text-white" />}
                            </div>
                            <span className="text-[10px] font-black text-earth-700 dark:text-earth-300 uppercase tracking-widest">I agree to the code</span>
                        </div>
                    )}
                </div>

                <div className="bg-agro-950 p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12 group-hover:rotate-45 transition-transform duration-1000"><Fingerprint size={150} /></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                            <Smartphone size={24} className="text-agro-400" />
                        </div>
                        <h4 className="text-2xl font-serif font-bold mb-4 tracking-tight">Sync EnvirosAgro ID</h4>
                        <p className="text-agro-100/60 text-xs mb-8 leading-relaxed font-medium">
                            Connecting your Workers Cloud profile with your ESIN ensures full traceability across the industrial value chain.
                        </p>
                        <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">Connect Hub ID</button>
                    </div>
                </div>

                <div className="bg-white dark:bg-earth-900 p-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 flex items-center gap-6 group hover:shadow-lg transition-all cursor-pointer">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600 transition-transform group-hover:rotate-12 shadow-inner">
                        <QrCode size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-earth-900 dark:text-white text-sm">Offline Registry</h4>
                        <p className="text-[10px] text-earth-400 uppercase font-black tracking-widest">Generate Scan Code</p>
                    </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5"><Activity size={100} /></div>
                    <div className="flex items-center gap-4 mb-6 relative z-10">
                        <div className="p-2 bg-blue-600/20 rounded-xl text-blue-400 border border-blue-500/20"><ShieldAlert size={18} /></div>
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Security Clearance</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed relative z-10 font-bold">
                        Access to Process 04 (Industrial Audit) and Process 05 (Value Outcome) is restricted to Verified Professional Cloud Nodes only.
                    </p>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-serif font-bold text-agro-900 dark:text-white mb-3 tracking-tight">Agro Human Resources</h2>
        <p className="text-earth-600 dark:text-earth-400 max-w-2xl mx-auto font-medium">Connecting agricultural talent with global opportunities across the Five Thrusts.</p>
      </div>

      <div className="flex justify-center mb-16 overflow-x-auto no-scrollbar pb-2">
        <div className="agro-glass p-1.5 rounded-[2rem] border border-earth-200 dark:border-white/5 backdrop-blur-xl inline-flex whitespace-nowrap shadow-sm">
          <button onClick={() => setActiveTab('CLOUD')} className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${activeTab === 'CLOUD' ? 'bg-agro-600 text-white shadow-lg' : 'text-earth-400 hover:text-earth-900 dark:hover:text-white'}`}><Cloud size={16} /> Workers Cloud</button>
          <button onClick={() => setActiveTab('JOBS')} className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${activeTab === 'JOBS' ? 'bg-agro-600 text-white shadow-lg' : 'text-earth-400 hover:text-earth-900 dark:hover:text-white'}`}><Briefcase size={16} /> Open Jobs</button>
          <button onClick={() => setActiveTab('CAREER')} className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${activeTab === 'CAREER' ? 'bg-agro-600 text-white shadow-lg' : 'text-earth-400 hover:text-earth-900 dark:hover:text-white'}`}><TrendingUp size={16} /> Career Track</button>
          <button onClick={() => setActiveTab('REGISTER')} className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${activeTab === 'REGISTER' ? 'bg-agro-600 text-white shadow-lg' : 'text-earth-400 hover:text-earth-900 dark:hover:text-white'}`}><Plus size={16} /> New Profile</button>
        </div>
      </div>

      {activeTab === 'CLOUD' && renderAgroWorkersCloud()}

      {activeTab === 'JOBS' && (
        <div className="grid gap-8 animate-in slide-in-from-right-10 duration-700">
          {JOBS_LIST.map((job) => (
            <div key={job.id} className="bg-white dark:bg-earth-900 p-10 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row justify-between gap-10 group">
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-earth-50 dark:bg-earth-800 rounded-xl text-earth-400"><Briefcase size={24} /></div>
                        <div>
                            <h4 className="font-bold text-2xl text-earth-900 dark:text-white group-hover:text-agro-700 transition-colors">{job.title}</h4>
                            <p className="text-[10px] text-earth-400 font-black uppercase tracking-widest">{job.org} • {job.posted}</p>
                        </div>
                    </div>
                    <p className="text-earth-600 dark:text-earth-400 text-sm leading-relaxed font-medium mb-6">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs font-bold text-earth-500">
                        <span className="flex items-center gap-2"><MapPin size={14} className="text-red-500" /> {job.location}</span>
                        <span className="flex items-center gap-2 font-mono text-agro-600 bg-agro-50 dark:bg-agro-900/30 px-2 py-0.5 rounded">{job.salary}</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <button onClick={() => handleApply(job.title)} className="w-full md:w-auto bg-agro-900 hover:bg-agro-800 text-white font-black py-4 px-12 rounded-2xl text-[10px] uppercase tracking-widest shadow-xl transition-all active:scale-95">Apply Session</button>
                </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'CAREER' && (
        <div className="grid md:grid-cols-2 gap-8 animate-in slide-in-from-right-10 duration-700">
          {CAREER_PATHWAYS.map((path) => (
            <div key={path.id} className={`p-10 rounded-[3.5rem] border ${path.color} bg-white dark:bg-earth-900 shadow-sm hover:shadow-xl transition-all group flex flex-col md:flex-row gap-10`}>
                <div className="bg-white dark:bg-earth-800 p-6 rounded-[2rem] shadow-sm h-fit shrink-0 group-hover:rotate-12 transition-transform">{path.icon}</div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-2xl text-earth-900 dark:text-white leading-tight">{path.title}</h4>
                    <span className="bg-agro-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">{path.level}</span>
                  </div>
                  <p className="text-[10px] text-earth-400 font-black uppercase tracking-widest mb-6">Provider: {path.provider} • {path.duration}</p>
                  <p className="text-sm text-earth-600 dark:text-earth-400 font-medium leading-relaxed mb-8">{path.desc}</p>
                  <button onClick={() => onNavigate && onNavigate(View.KNOWLEDGE)} className="text-agro-700 dark:text-agro-400 font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-2">Initialize Course <ArrowRight size={16}/></button>
                </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'REGISTER' && (
        <div className="max-w-2xl mx-auto animate-in zoom-in-95 duration-500">
           <form className="bg-white dark:bg-earth-900 p-12 rounded-[4rem] shadow-xl border border-earth-100 dark:border-earth-800 space-y-10">
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-agro-50 dark:bg-agro-900/40 rounded-[1.8rem] flex items-center justify-center mx-auto mb-6 text-agro-600">
                    <Users size={32} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white mb-2">Network Professional Profile</h3>
                <p className="text-earth-500 text-xs uppercase font-black tracking-widest">Identify yourself within the global node.</p>
              </div>
              <div className="space-y-6">
                <input type="text" className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-agro-500 rounded-2xl px-6 py-4 font-bold text-sm outline-none transition-all dark:text-white" placeholder="Professional Full Name" />
                <input type="email" className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-agro-500 rounded-2xl px-6 py-4 font-bold text-sm outline-none transition-all dark:text-white" placeholder="Registry Email" />
                <select className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-agro-500 rounded-2xl px-6 py-4 font-bold text-sm outline-none transition-all dark:text-white appearance-none">
                    <option>Select Primary Thrust</option>
                    <option>Social Agriculture (SA)</option>
                    <option>Environmental Agriculture (EA)</option>
                    <option>Technical Agriculture (TA)</option>
                    <option>Industrial Agriculture (IA)</option>
                </select>
              </div>
              <button type="button" onClick={() => onNavigate && onNavigate(View.SIGN_UP)} className="w-full bg-agro-900 hover:bg-agro-950 text-white font-black py-5 rounded-2xl text-[11px] uppercase tracking-widest shadow-2xl shadow-agro-900/30 transition-all active:scale-95">Verify Node & Initialize</button>
              <div className="flex items-center justify-center gap-3 text-[9px] font-black text-earth-300 uppercase tracking-[0.4em]">
                  <ShieldCheck size={14} className="text-agro-600" /> Identity Secure Protocol
              </div>
           </form>
        </div>
      )}
    </div>
  );
};