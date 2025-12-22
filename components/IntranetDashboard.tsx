import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Users, Activity, BarChart3, Database, MessageSquare, 
  Bell, Settings, Search, ChevronRight, PieChart, TrendingUp,
  Briefcase, Zap, AlertCircle, FileText, CheckCircle2, MoreVertical,
  Terminal, Loader2, RefreshCw, X, Globe, ShieldCheck, Cpu, Layers,
  Lock
} from 'lucide-react';

const INTERNAL_STATS = [
  { label: "Active Staff", value: "245", icon: <Users className="text-blue-500" /> },
  { label: "System Uptime", value: "99.98%", icon: <Activity className="text-green-500" /> },
  { label: "Pending Approvals", value: "18", icon: <AlertCircle className="text-amber-500" /> },
  { label: "Security Lvl", value: "Grade A", icon: <Shield className="text-purple-500" /> }
];

const AUDIT_STEPS = [
  "Initializing Central Organizational Sync...",
  "Validating Staff ESIN Credentials...",
  "Hashing Internal Project Ledgers...",
  "Scanning Private File Systems for SI-D Anomaly...",
  "Synchronizing Departmental C(a) Scores...",
  "Cross-referencing Global m(t) Baselines...",
  "Finalizing Organizational Integrity Report..."
];

export const IntranetDashboard: React.FC = () => {
  const [activeDepartment, setActiveDepartment] = useState('Compliance');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditStep, setAuditStep] = useState(0);
  const [auditLogs, setAuditLogs] = useState<string[]>([]);
  const [auditSuccess, setAuditSuccess] = useState(false);
  const auditIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (auditIntervalRef.current) window.clearInterval(auditIntervalRef.current);
    };
  }, []);

  const startSystemAudit = () => {
    if (isAuditing) return;
    
    setIsAuditing(true);
    setAuditSuccess(false);
    setAuditStep(0);
    setAuditLogs(["[SYSTEM] Bootstrap sequence initiated."]);
    
    let currentStep = 0;
    auditIntervalRef.current = window.setInterval(() => {
      if (currentStep < AUDIT_STEPS.length) {
        setAuditLogs(prev => [...prev, `[PROCESS] ${AUDIT_STEPS[currentStep]}`]);
        setAuditStep(currentStep + 1);
        currentStep++;
      } else {
        if (auditIntervalRef.current) window.clearInterval(auditIntervalRef.current);
        setTimeout(() => {
          setAuditSuccess(true);
          setAuditLogs(prev => [...prev, "[SUCCESS] Organization standard: VERIFIED_AAA"]);
        }, 800);
      }
    }, 1200);
  };

  const closeAudit = () => {
    if (auditIntervalRef.current) window.clearInterval(auditIntervalRef.current);
    setIsAuditing(false);
    setAuditSuccess(false);
    setAuditLogs([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative animate-in fade-in duration-700">
      
      {/* System Audit Terminal Modal */}
      {isAuditing && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="bg-[#0a0f1a] w-full max-w-4xl rounded-[3rem] shadow-strategic border border-white/10 overflow-hidden flex flex-col h-[700px] max-h-[85vh]">
            <div className="bg-slate-900 p-8 border-b border-white/5 flex justify-between items-center shrink-0">
               <div className="flex items-center gap-5">
                  <div className={`p-3 rounded-2xl ${auditSuccess ? 'bg-green-600' : 'bg-blue-600'} text-white shadow-xl`}>
                    {auditSuccess ? <ShieldCheck size={28} /> : <Terminal size={28} className="animate-pulse" />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white leading-none">System Audit Core</h3>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] mt-1.5">
                      {auditSuccess ? 'Audit_Completed_Stable' : 'Deep_Scan_Active_v4.2.2'}
                    </p>
                  </div>
               </div>
               {!auditSuccess && (
                 <div className="bg-white/5 px-4 py-2 rounded-xl text-blue-400 font-mono text-xs border border-white/5">
                   SCAN_PROGRESS: {Math.round((auditStep / AUDIT_STEPS.length) * 100)}%
                 </div>
               )}
               {auditSuccess && (
                 <button onClick={closeAudit} className="p-2 hover:bg-white/10 rounded-xl text-white transition-all"><X size={24} /></button>
               )}
            </div>

            <div className="flex-1 p-10 font-mono text-[11px] overflow-y-auto ea-scroll-area bg-black/40 no-scrollbar">
               <div className="space-y-2">
                  {auditLogs.map((log, i) => (
                    <div key={i} className="flex gap-4 animate-in fade-in">
                      <span className="text-slate-700">[{new Date().toLocaleTimeString()}]</span>
                      <span className={log.includes('[SUCCESS]') ? 'text-green-500 font-bold' : log.includes('[SYSTEM]') ? 'text-blue-400' : 'text-slate-300'}>
                        {log}
                      </span>
                    </div>
                  ))}
                  {!auditSuccess && (
                    <div className="flex items-center gap-3 text-blue-500 pt-4">
                      <Loader2 size={14} className="animate-spin" />
                      <span className="animate-pulse tracking-widest">EXECUTING_INTEGRITY_HANDSHAKE...</span>
                    </div>
                  )}
               </div>

               {auditSuccess && (
                 <div className="mt-12 grid md:grid-cols-3 gap-6 animate-in zoom-in duration-500">
                    {[
                      { l: 'Data Trust', v: '99.9%', c: 'text-green-500' },
                      { l: 'Staff Sync', v: 'Grade A', c: 'text-blue-500' },
                      { l: 'Risk Index', v: '0.02%', c: 'text-agro-400' }
                    ].map(m => (
                      <div key={m.l} className="bg-white/5 p-6 rounded-[2rem] border border-white/5 shadow-inner text-center">
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{m.l}</p>
                        <p className={`text-2xl font-black ${m.c}`}>{m.v}</p>
                      </div>
                    ))}
                 </div>
               )}
            </div>

            <div className="p-8 bg-slate-900 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 shrink-0">
               <div className="flex items-center gap-3 text-slate-500">
                  <ShieldCheck size={18} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Sovereign Data Protection Active</span>
               </div>
               {auditSuccess ? (
                 <button onClick={closeAudit} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-black py-4 px-12 rounded-2xl text-[10px] uppercase tracking-[0.4em] shadow-xl active:scale-95 transition-all">
                   Verify & Commit Log
                 </button>
               ) : (
                 <div className="flex items-center gap-6">
                    <p className="text-[10px] text-slate-600 font-bold uppercase italic">Do not terminate session during sync</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
           <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[10px] mb-2">
              <Shield size={14} /> Internal Organization Hub
           </div>
           <h2 className="text-4xl font-serif font-bold text-earth-900 dark:text-white leading-tight tracking-tight">Intranet Dashboard</h2>
        </div>
        <div className="flex gap-3">
           <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400 group-focus-within:text-blue-500 transition-colors" size={16} />
              <input type="text" placeholder="Search staff, files, nodes..." className="pl-10 pr-4 py-2 rounded-xl border border-earth-200 dark:border-earth-800 bg-white dark:bg-earth-900 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all w-64 dark:text-white" />
           </div>
           <button className="bg-white dark:bg-earth-900 p-2.5 rounded-xl border border-earth-200 dark:border-earth-800 text-earth-500 hover:bg-earth-50 dark:hover:bg-earth-800 transition-all"><Bell size={20} /></button>
           <button className="bg-white dark:bg-earth-900 p-2.5 rounded-xl border border-earth-200 dark:border-earth-800 text-earth-500 hover:bg-earth-50 dark:hover:bg-earth-800 transition-all"><Settings size={20} /></button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {INTERNAL_STATS.map((stat, i) => (
              <div key={i} className="ea-card p-6 flex items-center gap-5">
                  <div className="p-3 bg-earth-50 dark:bg-earth-800 rounded-2xl shadow-inner border border-black/5">{stat.icon}</div>
                  <div>
                      <div className="text-[10px] font-black text-earth-400 uppercase tracking-wider">{stat.label}</div>
                      <div className="text-2xl font-bold text-earth-900 dark:text-white leading-tight">{stat.value}</div>
                  </div>
              </div>
          ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-earth-900 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 shadow-sm overflow-hidden">
                  <div className="p-8 border-b border-earth-100 dark:border-earth-800 flex justify-between items-center bg-earth-50/30 dark:bg-earth-950/30">
                      <h3 className="font-bold text-xl text-earth-900 dark:text-white flex items-center gap-3"><FileText size={20} className="text-blue-500" /> Approvals Queue</h3>
                      <button className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest">Global Queue</button>
                  </div>
                  <div className="overflow-x-auto">
                    <div className="divide-y divide-earth-50 dark:divide-earth-800 min-w-[600px]">
                        {[
                          { title: "Kiriaini EA Thrust Funding", type: "Budget", author: "Dr. Rossi", priority: "High", time: "2h ago" },
                          { title: "New AI Diagnostic Node Release", type: "Technical", author: "Eng. Kim", priority: "Medium", time: "5h ago" },
                          { title: "Regional Partner Vetting", type: "Compliance", author: "Admin Sarah", priority: "Low", time: "Yesterday" }
                        ].map((item, i) => (
                            <div key={i} className="p-8 hover:bg-earth-50/50 dark:hover:bg-earth-800/50 transition-all flex items-center justify-between group">
                                <div className="flex gap-6 items-center">
                                    <div className={`w-1.5 h-12 rounded-full shadow-sm ${item.priority === 'High' ? 'bg-red-500' : item.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                                    <div>
                                        <h4 className="font-bold text-lg text-earth-900 dark:text-white leading-tight mb-1 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                                        <p className="text-xs text-earth-500 font-medium">{item.type} • {item.author} • <span className="opacity-60">{item.time}</span></p>
                                    </div>
                                </div>
                                <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 shadow-lg active:scale-95">Review</button>
                            </div>
                        ))}
                    </div>
                  </div>
              </div>

              <div className="bg-white dark:bg-earth-900 p-10 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm">
                  <h3 className="text-xl font-bold text-earth-900 dark:text-white mb-8 flex items-center gap-3">
                    <Layers size={20} className="text-agro-600" /> Departmental Alignment
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                      {[
                        { name: 'Social Ag', val: 94, icon: <Users size={16} />, color: 'bg-agro-500' }, 
                        { name: 'Eco-Tech', val: 88, icon: <Cpu size={16} />, color: 'bg-blue-500' }, 
                        { name: 'Compliance', val: 92, icon: <ShieldCheck size={16} />, color: 'bg-purple-500' }
                      ].map((dept) => (
                          <div key={dept.name} className="bg-earth-50/50 dark:bg-earth-800/50 p-6 rounded-[2rem] border border-earth-100 dark:border-earth-700 group hover:shadow-lg transition-all">
                              <div className="flex justify-between items-start mb-6">
                                  <div className="p-2 bg-white dark:bg-earth-900 rounded-lg shadow-sm text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{dept.icon}</div>
                                  <CheckCircle2 size={16} className="text-agro-500" />
                              </div>
                              <div className="flex justify-between items-end mb-2">
                                <span className="text-[10px] font-black text-earth-400 uppercase tracking-widest">{dept.name}</span>
                                <span className="text-xl font-black text-earth-900 dark:text-white font-mono">{dept.val}%</span>
                              </div>
                              <div className="w-full bg-earth-200 dark:bg-earth-900 h-1.5 rounded-full overflow-hidden shadow-inner">
                                  <div className={`${dept.color} h-full transition-all duration-1000`} style={{width: `${dept.val}%`}}></div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          <div className="space-y-6">
              <div className="bg-agro-900 text-white p-10 rounded-[3rem] shadow-strategic relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 transition-transform duration-[10s] group-hover:rotate-12 group-hover:scale-110 pointer-events-none"><PieChart size={300} /></div>
                  <div className="relative z-10">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10 backdrop-blur-md shadow-2xl">
                        <Zap size={32} className="text-agro-400 animate-pulse" />
                      </div>
                      <h3 className="text-3xl font-serif font-bold mb-4 tracking-tight leading-none">Live Thrust <br/><span className="text-agro-400 italic">Health</span></h3>
                      <p className="text-agro-200 text-sm mb-10 leading-relaxed font-medium">Real-time telemetry audit of the C(a) Sustainability Coefficient across all 12,000+ registered global nodes.</p>
                      <button 
                        onClick={startSystemAudit}
                        className="w-full bg-agro-500 hover:bg-agro-400 text-white font-black py-4 rounded-2xl transition-all text-xs uppercase tracking-[0.3em] shadow-xl shadow-agro-500/20 active:scale-95 flex items-center justify-center gap-3 border border-agro-400"
                      >
                         <ShieldCheck size={18} /> Run System Audit
                      </button>
                  </div>
              </div>

              <div className="bg-white dark:bg-earth-900 p-8 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm">
                  <div className="flex justify-between items-center mb-8 px-2">
                    <h3 className="font-bold text-earth-900 dark:text-white flex items-center gap-3">
                      <Briefcase size={20} className="text-blue-500" /> Active Staff
                    </h3>
                    <button className="p-1 hover:bg-earth-50 rounded-lg text-earth-400"><MoreVertical size={16} /></button>
                  </div>
                  <div className="space-y-4">
                      {[
                        { name: "Samuel Omondi", role: "Network Architect", status: "Online" },
                        { name: "Dr. Elena Rossi", role: "Sustainability Lead", status: "In Meeting" },
                        { name: "John Mwangi", role: "DevOps Engineer", status: "Offline" }
                      ].map((staff, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 hover:bg-earth-50 dark:hover:bg-earth-800 rounded-2xl transition-all cursor-pointer group border border-transparent hover:border-earth-100">
                              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-[1.2rem] flex items-center justify-center text-blue-600 font-black shadow-inner border border-white/20 group-hover:scale-105 transition-transform">{staff.name.charAt(0)}</div>
                              <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-bold text-earth-900 dark:text-white truncate leading-none mb-1.5">{staff.name}</h4>
                                  <p className="text-[10px] text-earth-500 font-bold uppercase tracking-widest truncate">{staff.role}</p>
                              </div>
                              <div className={`w-2.5 h-2.5 rounded-full shadow-sm ${staff.status === 'Online' ? 'bg-green-500 animate-pulse' : staff.status === 'In Meeting' ? 'bg-amber-500' : 'bg-earth-300'}`}></div>
                          </div>
                      ))}
                  </div>
                  <button className="w-full mt-8 py-3 text-[10px] font-black text-blue-600 uppercase tracking-widest border-t border-earth-100 dark:border-earth-800 pt-6 hover:underline">
                    View Complete Roster
                  </button>
              </div>
          </div>
      </div>
      
      <div className="mt-24 pt-12 border-t border-earth-100 dark:border-earth-800 flex flex-col md:flex-row justify-between items-center gap-10 text-[9px] font-black uppercase tracking-[0.5em] text-earth-400">
         <div className="flex items-center gap-8">
            <span className="flex items-center gap-2"><Globe size={14} className="text-blue-500" /> Internal Node: ACTIVE</span>
            <span className="flex items-center gap-2"><Lock size={14} className="text-agro-600" /> 256-bit AES Encryption</span>
         </div>
         <p className="opacity-40">ADMIN REVISION v4.2.2-INTERNAL</p>
      </div>
    </div>
  );
};
