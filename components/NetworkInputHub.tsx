
import React, { useState, useEffect } from 'react';
import { 
  Network, Share2, Globe, Database, Cloud, Link2, 
  ArrowRightLeft, Zap, ShieldCheck, Search, Activity, 
  Terminal, Server, Box, Users, Factory, 
  ArrowUpRight, RefreshCw, Loader2, Info, MessageSquare,
  Twitter, Facebook, Linkedin, ExternalLink,
  // Added comment above fix: Added missing ChevronRight icon to imports
  ChevronRight
} from 'lucide-react';

const CONNECTORS = [
  { id: 'erp', name: 'ERP Integration', type: 'Enterprise Resource Planning', icon: <Server size={24} />, desc: 'Synchronize external resource planning data with EnvirosAgro internal nodes.' },
  { id: 'vmi', name: 'VMI Gateway', type: 'Vendor Managed Inventory', icon: <Box size={24} />, desc: 'Real-time inventory levels from global suppliers and batches.' },
  { id: 'cloud', name: 'Cloud Repositories', type: 'Storage Bases', icon: <Cloud size={24} />, desc: 'Automated data pooling from Azure, AWS, and private clouds.' },
  { id: 'extranet', name: 'Extranet Link', type: 'Partner Networks', icon: <Globe size={24} />, desc: 'Bilateral information trade channels for authorized organizations.' },
  { id: 'social', name: 'Social Intelligence', type: 'Social Media Channels', icon: <MessageSquare size={24} />, desc: 'Sentiment analysis and trend mapping from public social streams.' }
];

const RECENT_INGESTS = [
  { id: 1, source: 'AgriCorp ERP', status: 'SYNCHRONIZED', thrust: 'IA', date: '2m ago', size: '1.2GB' },
  { id: 2, source: 'Global Seeds VMI', status: 'PROCESSING', thrust: 'EA', date: '12m ago', size: '450MB' },
  { id: 3, source: 'Regional Logistics', status: 'SYNCHRONIZED', thrust: 'TA', date: '45m ago', size: '2.8GB' },
  { id: 4, source: 'UN FAO Database', status: 'VERIFYING', thrust: 'SA', date: '1h ago', size: '8.4GB' }
];

export const NetworkInputHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CONNECTORS' | 'TRADE' | 'LOGS'>('CONNECTORS');
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSync = (id: string) => {
    setSyncingId(id);
    setTimeout(() => setSyncingId(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      
      {/* Header Block */}
      <div className="ea-header-block p-10 mb-10 bg-slate-900/5 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-inner backdrop-blur-3xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex-1">
              <div className="ea-label-meta mb-2">
                 <Network size={12} className="text-blue-500" /> Process 01: External-to-Internal Uplink
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-black text-earth-900 dark:text-white tracking-tighter">Network <span className="text-blue-600 italic">Input Hub</span></h1>
              <p className="text-lg text-earth-500 dark:text-earth-400 mt-4 max-w-2xl font-medium leading-relaxed">
                 The centralized gateway for embedding external inputs—ERP, VMI, and global datasets—into the EnvirosAgro intelligence core for professional information trade.
              </p>
           </div>
           
           <div className="flex gap-4 items-center shrink-0">
              <div className="bg-agro-50 dark:bg-agro-900/30 px-6 py-3 rounded-2xl border border-agro-100 dark:border-agro-800 text-agro-700 dark:text-agro-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-3">
                 <Activity size={16} className="animate-pulse" /> UPLINK_STANDBY
              </div>
           </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex justify-center mb-12">
        <div className="agro-glass p-1.5 rounded-[2rem] flex gap-1 border border-earth-200 dark:border-white/5 backdrop-blur-xl">
           {[
             { id: 'CONNECTORS', label: 'Systems & Connectors', icon: <Link2 size={14}/> },
             { id: 'TRADE', label: 'Information Trade', icon: <ArrowRightLeft size={14}/> },
             { id: 'LOGS', label: 'Ingest Logs', icon: <Terminal size={14}/> }
           ].map(tab => (
             <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${activeTab === tab.id ? 'bg-agro-600 text-white shadow-lg' : 'text-earth-400 hover:text-earth-900 dark:hover:text-white'}`}
             >
                {tab.icon} {tab.label}
             </button>
           ))}
        </div>
      </div>

      {activeTab === 'CONNECTORS' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
           {/* Search & Stats */}
           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="relative group max-w-md w-full">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-earth-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                 <input 
                    type="text" 
                    placeholder="Identify external system..." 
                    className="w-full bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-[1.5rem] pl-16 pr-6 py-4 text-sm font-bold focus:outline-none focus:ring-8 focus:ring-blue-500/5 transition-all shadow-sm dark:text-white"
                 />
              </div>
              <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-earth-400">
                 <span className="flex items-center gap-3"><Database size={14} className="text-blue-500" /> 12 Sources active</span>
                 <span className="flex items-center gap-3"><ShieldCheck size={14} className="text-agro-500" /> SHA-256 Verified</span>
              </div>
           </div>

           {/* Connector Grid */}
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CONNECTORS.map((conn) => (
                <div key={conn.id} className="ea-card p-10 flex flex-col group hover:shadow-cinematic hover:-translate-y-1 transition-all duration-700 bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800">
                   <div className="flex justify-between items-start mb-8">
                      <div className="p-4 bg-earth-50 dark:bg-earth-800 rounded-[1.2rem] text-earth-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/40 group-hover:text-blue-600 transition-all shadow-inner border border-black/5 group-hover:rotate-6">
                         {conn.icon}
                      </div>
                      <button 
                        onClick={() => handleSync(conn.id)}
                        disabled={syncingId === conn.id}
                        className={`p-3 rounded-xl transition-all shadow-sm ${syncingId === conn.id ? 'bg-agro-50 dark:bg-agro-900/30 text-agro-600' : 'bg-earth-50 dark:bg-earth-800 text-earth-400 hover:text-agro-600'}`}
                      >
                         {syncingId === conn.id ? <Loader2 size={18} className="animate-spin" /> : <RefreshCw size={18} />}
                      </button>
                   </div>
                   
                   <div className="flex-1">
                      <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.4em] block mb-3">{conn.type}</span>
                      <h3 className="text-2xl font-bold text-earth-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors tracking-tight">{conn.name}</h3>
                      <p className="text-sm text-earth-500 dark:text-earth-400 leading-relaxed font-medium mb-10 opacity-80">
                         {conn.desc}
                      </p>
                   </div>
                   
                   <button className="w-full py-4 border-2 border-earth-50 dark:border-earth-800 rounded-2xl text-[9px] font-black uppercase tracking-widest text-earth-400 hover:text-blue-600 hover:border-blue-100 dark:hover:border-blue-900/50 transition-all flex items-center justify-center gap-3">
                      Configure Link <ChevronRight size={14} />
                   </button>
                </div>
              ))}

              {/* Add Custom Source Card */}
              <div className="ea-card p-10 flex flex-col items-center justify-center text-center border-2 border-dashed border-earth-200 dark:border-earth-800 bg-earth-50/20 dark:bg-earth-900/20 group hover:border-blue-400 transition-all min-h-[350px] cursor-pointer">
                 <div className="w-16 h-16 bg-white dark:bg-earth-800 rounded-full flex items-center justify-center text-earth-300 group-hover:text-blue-50 group-hover:scale-110 transition-all shadow-sm border border-earth-100 dark:border-earth-700 mb-6">
                    <Zap size={32} />
                 </div>
                 <h3 className="text-lg font-bold text-earth-900 dark:text-white mb-2">Embed New Source</h3>
                 <p className="text-xs text-earth-400 font-medium max-w-[180px] mx-auto">Proprietary API or specialized agriculture database.</p>
              </div>
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
                 <p className="text-lg text-earth-500 dark:text-earth-400 leading-relaxed font-medium mb-12">
                    Exchange authorized internal intelligence packets for external datasets. This "Information Trade" improves collective regional m(t) resilience.
                 </p>
                 
                 <div className="space-y-6 flex-1">
                    {[
                      { label: 'Market Availability', val: 'Active', color: 'text-agro-500' },
                      { label: 'Trade Balance', val: '+2.4 TB', color: 'text-blue-500' },
                      { label: 'Security Clearance', val: 'Level 4', color: 'text-slate-400' }
                    ].map(stat => (
                      <div key={stat.label} className="flex justify-between items-center p-6 bg-earth-50 dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-800">
                         <span className="text-[10px] font-black uppercase tracking-widest text-earth-400">{stat.label}</span>
                         <span className={`text-base font-black tracking-tight ${stat.color}`}>{stat.val}</span>
                      </div>
                    ))}
                 </div>

                 <button className="w-full mt-12 bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-3xl text-xs uppercase tracking-[0.3em] shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-4">
                    Initialize Trade Request <ArrowUpRight size={20} />
                 </button>
              </div>

              <div className="bg-slate-900 text-white p-16 rounded-[4rem] relative overflow-hidden flex flex-col shadow-cinematic border border-white/5">
                 <div className="absolute top-0 right-0 p-16 opacity-5 rotate-12"><Globe size={300} /></div>
                 <h3 className="text-4xl font-serif font-bold mb-8">External Organizations</h3>
                 <p className="text-slate-400 text-xl leading-relaxed font-medium mb-12">Authorized entities currently in active information trade within the EnvirosAgro network.</p>
                 
                 <div className="grid grid-cols-2 gap-6 relative z-10">
                    {[
                      { name: 'FAO Global', id: 'fao-01', stat: '98% Compliant' },
                      { name: 'World Agro Hub', id: 'wah-22', stat: 'Active Sync' },
                      { name: 'Sentinel-Sync', id: 'ss-sat', stat: 'Satellite Link' },
                      { name: 'CGIAR Research', id: 'cgi-r', stat: 'Data Reciprocal' }
                    ].map(org => (
                      <div key={org.id} className="p-6 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all group">
                         <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{org.id}</span>
                            <div className="w-1.5 h-1.5 bg-agro-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                         </div>
                         <h4 className="text-xl font-bold mb-2">{org.name}</h4>
                         <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{org.stat}</p>
                      </div>
                    ))}
                 </div>
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
                            <td className="py-6 px-4">
                               <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-earth-50 dark:bg-earth-800 flex items-center justify-center text-blue-500 shadow-inner group-hover:scale-110 transition-transform">
                                     <Globe size={16} />
                                  </div>
                                  <span className="text-sm font-bold text-earth-900 dark:text-white">{log.source}</span>
                               </div>
                            </td>
                            <td className="py-6 px-4">
                               <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800">
                                  {log.thrust} THRUST
                               </span>
                            </td>
                            <td className="py-6 px-4 text-sm font-mono text-earth-500">{log.size}</td>
                            <td className="py-6 px-4 text-xs font-bold text-earth-400 uppercase">{log.date}</td>
                            <td className="py-6 px-4 text-right">
                               <div className="flex items-center justify-end gap-3">
                                  <span className={`text-[10px] font-black uppercase tracking-widest ${log.status === 'SYNCHRONIZED' ? 'text-agro-600' : log.status === 'PROCESSING' ? 'text-blue-600 animate-pulse' : 'text-amber-600'}`}>
                                     {log.status}
                                  </span>
                                  <Info size={14} className="text-earth-200 cursor-help" />
                               </div>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      )}

      {/* Footer Branding Ribbon */}
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
