import React, { useState } from 'react';
import { User, View } from '../types';
import { IdCard } from './community/IdCard';
import { GetESIN } from './community/GetESIN';
import { 
  User as UserIcon, Settings, ShieldCheck, 
  Zap, Database, Globe, ArrowLeft, 
  Edit3, LogOut, Camera, Bell, Activity,
  Award, Heart, Share2, Download, ExternalLink,
  ChevronRight, CheckCircle2, Lock, Key
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserProfileProps {
  user: User | null;
  onUpdateUser: (user: User) => void;
  onNavigate?: (view: View) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdateUser, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'SECURITY' | 'NODE' | 'CERTIFICATES'>('OVERVIEW');
  const [esinStep, setEsinStep] = useState(1);
  const [isEditing, setIsEditing] = useState(false);

  const handleEsinGenerated = (esin: string) => {
    if (user) {
      onUpdateUser({ ...user, esin });
    }
  };

  if (!user) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-earth-50 dark:bg-earth-950 px-6">
            <div className="bg-white dark:bg-earth-900 rounded-[3rem] p-12 text-center shadow-xl border border-earth-100 dark:border-earth-800 max-w-md w-full animate-in zoom-in-95">
                <div className="w-20 h-20 bg-earth-50 dark:bg-earth-800 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-earth-300">
                    <UserIcon size={40} />
                </div>
                <h2 className="text-2xl font-serif font-black text-earth-900 dark:text-white mb-2">Access Denied</h2>
                <p className="text-earth-500 dark:text-earth-400 mb-10 font-medium">Please authenticate your node connection to view the profile terminal.</p>
                <button 
                    onClick={() => onNavigate?.(View.PROFILE)} // This will trigger the login view via ViewHandler
                    className="w-full bg-agro-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all"
                >
                    Authenticate Linkage
                </button>
            </div>
        </div>
    );
  }

  const navItems = [
    { id: 'OVERVIEW', label: 'Node Overview', icon: <Activity size={18}/> },
    { id: 'NODE', label: 'Ecosystem Registry', icon: <Database size={18}/> },
    { id: 'CERTIFICATES', label: 'Credentials', icon: <Award size={18}/> },
    { id: 'SECURITY', label: 'Security Protocols', icon: <ShieldCheck size={18}/> },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12 transition-colors duration-500 min-h-screen">
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-12">
        <button 
          onClick={() => onNavigate?.(View.HOME)}
          className="flex items-center gap-2 text-earth-400 hover:text-agro-600 font-black text-[10px] uppercase tracking-widest transition-all group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Command
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        
        {/* Left: Tactical Navigation Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-earth-900 rounded-[3.5rem] border border-earth-100 dark:border-earth-800 p-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12"><UserIcon size={200} /></div>
                
                <div className="relative z-10 flex flex-col items-center">
                    <div className="relative group mb-8">
                        <div className="w-40 h-40 rounded-[3rem] overflow-hidden border-8 border-earth-50 dark:border-earth-800 shadow-xl relative">
                            {user.avatar ? (
                                <img src={user.avatar} className="w-full h-full object-cover" alt={user.name} />
                            ) : (
                                <div className="w-full h-full bg-agro-600 flex items-center justify-center text-white">
                                    <span className="text-5xl font-serif font-black">{user.name.charAt(0)}</span>
                                </div>
                            )}
                        </div>
                        <button className="absolute bottom-2 right-2 p-3 bg-white dark:bg-earth-700 text-agro-600 rounded-2xl shadow-xl border border-earth-100 dark:border-earth-600 hover:scale-110 transition-all">
                            <Camera size={20} />
                        </button>
                    </div>

                    <div className="text-center mb-10">
                        <div className="flex items-center justify-center gap-3 mb-2">
                           <span className="px-3 py-1 bg-agro-50 dark:bg-agro-900/30 text-agro-600 dark:text-agro-400 text-[8px] font-black uppercase tracking-widest rounded-lg border border-agro-100 dark:border-agro-800">
                             {user.role} Node
                           </span>
                        </div>
                        <h2 className="text-3xl font-serif font-black text-earth-900 dark:text-white leading-tight">{user.name}</h2>
                        <p className="text-xs text-earth-400 font-bold uppercase tracking-widest mt-1">{user.email}</p>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-4">
                        <div className="p-5 bg-earth-50 dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-700 text-center shadow-inner">
                            <span className="text-[9px] font-black uppercase text-earth-400 block mb-1">EAC Tokens</span>
                            <span className="text-2xl font-black text-agro-600">{user.eacBalance || 0}</span>
                        </div>
                        <div className="p-5 bg-earth-50 dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-700 text-center shadow-inner">
                            <span className="text-[9px] font-black uppercase text-earth-400 block mb-1">Trust Rank</span>
                            <span className="text-2xl font-black text-blue-600">#14</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-earth-900 rounded-[3rem] border border-earth-100 dark:border-earth-800 p-8 shadow-sm">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-300 mb-8 ml-4">Node Configuration</h3>
                <div className="space-y-3">
                    {navItems.map((item) => (
                        <button 
                            key={item.id}
                            onClick={() => setActiveTab(item.id as any)}
                            className={`w-full py-4 px-6 rounded-2xl text-left font-bold transition-all flex items-center gap-4 group ${activeTab === item.id ? 'bg-earth-900 dark:bg-white text-white dark:text-earth-900 shadow-xl translate-x-2' : 'text-earth-500 hover:bg-earth-50 dark:hover:bg-earth-800'}`}
                        >
                            <span className={`${activeTab === item.id ? 'text-agro-400' : 'text-earth-300 group-hover:text-agro-500'} transition-colors`}>
                                {item.icon}
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em]">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <button className="w-full py-5 text-red-500 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-red-50 dark:hover:bg-red-950/20 rounded-[1.8rem] transition-all flex items-center justify-center gap-3 group">
                <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> De-authenticate Node
            </button>
        </aside>

        {/* Right: Functional Content Area */}
        <main className="lg:col-span-8">
            <AnimatePresence mode="wait">
                {activeTab === 'OVERVIEW' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        key="overview"
                        className="space-y-10"
                    >
                        <div className="bg-white dark:bg-earth-900 rounded-[3.5rem] border border-earth-100 dark:border-earth-800 p-12 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12"><Activity size={250} /></div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-12">
                                    <div>
                                        <h3 className="text-4xl font-serif font-black text-earth-900 dark:text-white leading-tight tracking-tighter">Strategic Node Status</h3>
                                        <p className="text-earth-500 font-medium mt-2">Real-time performance markers for node synchronicity.</p>
                                    </div>
                                    <button className="p-4 bg-agro-50 dark:bg-agro-900/30 text-agro-600 rounded-2xl hover:bg-agro-100 transition-all shadow-sm">
                                        <Edit3 size={20} />
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8">
                                    {[
                                        { label: 'Network Uptime', val: '99.98%', icon: <Globe className="text-blue-500" /> },
                                        { label: 'Impact Factor', val: '4.8x', icon: <Zap className="text-amber-500" /> },
                                        { label: 'Data Ingest', val: '1.2 GB/d', icon: <Database className="text-purple-500" /> }
                                    ].map((stat, i) => (
                                        <div key={i} className="p-6 bg-earth-50 dark:bg-earth-800/50 rounded-2xl border border-earth-100 dark:border-earth-700 group hover:border-agro-500/30 transition-all">
                                            <div className="p-3 bg-white dark:bg-earth-900 rounded-xl w-fit mb-4 shadow-sm group-hover:scale-110 transition-transform">{stat.icon}</div>
                                            <span className="text-[9px] font-black uppercase text-earth-400 block mb-1 tracking-widest">{stat.label}</span>
                                            <span className="text-xl font-black text-earth-900 dark:text-white">{stat.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="bg-agro-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-1000"><Heart size={200} /></div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-agro-400 mb-6">Social Agriculture</h4>
                                <p className="text-lg font-serif font-medium leading-relaxed italic mb-10">
                                    "Your node has contributed to 12% of the regional SI-D diagnostic markers this quarter."
                                </p>
                                <button className="relative z-10 w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
                                    View Contribution Log
                                </button>
                            </div>

                            <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-10 rounded-[3.5rem] shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12 group-hover:scale-110 transition-transform duration-1000"><Database size={200} /></div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-300 mb-6">Verified Assets</h4>
                                <div className="space-y-4 mb-8">
                                    {[
                                        { label: 'Precision Drone v9', date: 'Authorized Oct 12' },
                                        { label: 'Soil Health Dataset', date: 'Synced Oct 04' }
                                    ].map((asset, i) => (
                                        <div key={i} className="flex justify-between items-center py-3 border-b border-earth-100 dark:border-earth-800 last:border-0">
                                            <div>
                                                <p className="text-sm font-bold text-earth-900 dark:text-white leading-tight">{asset.label}</p>
                                                <p className="text-[9px] text-earth-400 font-medium uppercase mt-1">{asset.date}</p>
                                            </div>
                                            <div className="text-agro-600"><CheckCircle2 size={16}/></div>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => onNavigate?.(View.PRODUCTS)} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-2">
                                    Access Asset Hub <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'NODE' && (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        key="node"
                        className="space-y-10"
                    >
                        <div className="bg-white dark:bg-earth-900 rounded-[3.5rem] border border-earth-100 dark:border-earth-800 p-12 shadow-sm">
                            <div className="flex items-center gap-6 mb-12 border-b border-earth-50 dark:border-earth-800 pb-10">
                                <div className="p-5 bg-earth-50 dark:bg-earth-800 rounded-[2rem] text-agro-600 shadow-inner">
                                    <ShieldCheck size={32} />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-serif font-black text-earth-900 dark:text-white tracking-tight">Environmental Registry</h3>
                                    <p className="text-earth-400 font-medium mt-1 uppercase text-[10px] tracking-widest">Verifiable Node Identification (ESIN)</p>
                                </div>
                            </div>

                            {user.esin ? (
                                <div className="space-y-10">
                                    <IdCard user={user} />
                                    <div className="bg-earth-50 dark:bg-earth-800 p-10 rounded-[3rem] border border-earth-100 dark:border-earth-700 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12"><Lock size={180} /></div>
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-400 mb-6 flex items-center gap-3">
                                            <Key size={16} className="text-blue-500" /> Registry Metadata
                                        </h4>
                                        <div className="grid md:grid-cols-2 gap-10 relative z-10">
                                            <div className="space-y-1">
                                                <span className="text-[9px] font-black uppercase text-earth-400 block tracking-widest">Public Token</span>
                                                <code className="text-xs font-mono font-bold text-earth-900 dark:text-white bg-white dark:bg-earth-950 p-4 rounded-xl block border border-earth-100 dark:border-earth-800 break-all shadow-inner">
                                                    {user.esin}-HASH-77492-BF01
                                                </code>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[9px] font-black uppercase text-earth-400 block tracking-widest">Bilateral Handshake</span>
                                                <div className="bg-agro-50 dark:bg-agro-900/20 p-4 rounded-xl border border-agro-100 dark:border-agro-800">
                                                    <p className="text-xs font-bold text-agro-700 dark:text-agro-400 italic">"Node identity has been peer-validated across the 14 regional nodes. m(t) scoring active."</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button className="flex-1 bg-earth-900 dark:bg-white text-white dark:text-earth-900 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl flex items-center justify-center gap-4">
                                            <Download size={20} /> Export Digital Identity
                                        </button>
                                        <button className="p-5 bg-earth-50 dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-700 text-earth-400 hover:text-blue-600 transition-all shadow-sm">
                                            <Share2 size={24} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <GetESIN 
                                    esinStep={esinStep} 
                                    setEsinStep={setEsinStep} 
                                    setActiveTab={() => setActiveTab('NODE')} 
                                    onEsinGenerated={handleEsinGenerated} 
                                />
                            )}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'SECURITY' && (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        key="security"
                        className="bg-white dark:bg-earth-900 rounded-[3.5rem] border border-earth-100 dark:border-earth-800 p-12 shadow-sm"
                    >
                        <h3 className="text-3xl font-serif font-black text-earth-900 dark:text-white mb-12 border-l-4 border-agro-600 pl-8 uppercase tracking-tighter">Security Protocols</h3>
                        <div className="space-y-6">
                            {[
                                { title: 'Two-Factor Authentication', desc: 'Secure your node with an additional layer of verification.', status: 'Inactive', icon: <Lock /> },
                                { title: 'Registry Sync Alert', desc: 'Notify when data ingest requests are detected.', status: 'Active', icon: <Bell /> },
                                { title: 'Bilateral Handshake Keys', desc: 'Manage PGP keys for industrial node-to-node transmissions.', status: 'Configured', icon: <Key /> }
                            ].map((sec, i) => (
                                <div key={i} className="bg-earth-50 dark:bg-earth-800/50 p-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-700 flex items-center justify-between group hover:border-agro-500/30 transition-all">
                                    <div className="flex items-center gap-6">
                                        <div className="p-4 bg-white dark:bg-earth-900 rounded-2xl text-earth-300 group-hover:text-agro-600 transition-colors shadow-sm">{sec.icon}</div>
                                        <div>
                                            <h4 className="font-bold text-earth-900 dark:text-white text-lg mb-1">{sec.title}</h4>
                                            <p className="text-sm text-earth-500 dark:text-earth-400 font-medium leading-relaxed max-w-sm">{sec.desc}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${sec.status === 'Active' || sec.status === 'Configured' ? 'bg-agro-50 text-agro-600 border-agro-100' : 'bg-red-50 text-red-500 border-red-100'}`}>
                                            {sec.status}
                                        </span>
                                        <button className="block text-[9px] font-black text-blue-600 uppercase tracking-widest mt-2 hover:underline">RECONFIGURE</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'CERTIFICATES' && (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        key="certs"
                        className="bg-white dark:bg-earth-900 rounded-[3.5rem] border border-earth-100 dark:border-earth-800 p-12 shadow-sm"
                    >
                        <h3 className="text-3xl font-serif font-black text-earth-900 dark:text-white mb-12 border-l-4 border-blue-600 pl-8 uppercase tracking-tighter">Academic Credentials</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                { title: 'EA Thrust Masterclass', instructor: 'Dr. Elena Rossi', date: 'Authorized Oct 2024', icon: <Award className="text-agro-600"/> },
                                { title: 'm(t) Modeling Professional', instructor: 'Lead Node Analyst', date: 'Certified Sep 2024', icon: <Award className="text-blue-600"/> }
                            ].map((cert, i) => (
                                <div key={i} className="bg-earth-50 dark:bg-earth-800 p-8 rounded-[3rem] border border-earth-100 dark:border-earth-700 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000 rotate-12">{cert.icon}</div>
                                    <div className="p-4 bg-white dark:bg-earth-900 rounded-2xl w-fit mb-6 shadow-sm border border-earth-100 dark:border-earth-800 group-hover:scale-110 transition-transform">
                                        {cert.icon}
                                    </div>
                                    <h4 className="text-xl font-bold text-earth-900 dark:text-white mb-2 leading-tight">{cert.title}</h4>
                                    <p className="text-[10px] text-earth-400 font-black uppercase tracking-widest mb-6">{cert.instructor}</p>
                                    <div className="flex justify-between items-center pt-6 border-t border-earth-200 dark:border-earth-700">
                                        <span className="text-[9px] font-bold text-earth-500 uppercase tracking-widest">{cert.date}</span>
                                        <button className="p-3 bg-white dark:bg-earth-900 text-earth-400 hover:text-agro-600 rounded-xl transition-all shadow-sm">
                                            <Download size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
