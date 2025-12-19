import React, { useState } from 'react';
import { 
  Shield, Users, Activity, BarChart3, Database, MessageSquare, 
  Bell, Settings, Search, ChevronRight, PieChart, TrendingUp,
  Briefcase, Zap, AlertCircle, FileText, CheckCircle2, MoreVertical
} from 'lucide-react';

const INTERNAL_STATS = [
  { label: "Active Staff", value: "245", icon: <Users className="text-blue-500" /> },
  { label: "System Uptime", value: "99.98%", icon: <Activity className="text-green-500" /> },
  { label: "Pending Approvals", value: "18", icon: <AlertCircle className="text-amber-500" /> },
  { label: "Security Lvl", value: "Grade A", icon: <Shield className="text-purple-500" /> }
];

export const IntranetDashboard: React.FC = () => {
  const [activeDepartment, setActiveDepartment] = useState('Compliance');

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
           <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[10px] mb-2">
              <Shield size={14} /> Internal Organization Hub
           </div>
           <h2 className="text-4xl font-serif font-bold text-earth-900 dark:text-white">Intranet Dashboard</h2>
        </div>
        <div className="flex gap-3">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400" size={16} />
              <input type="text" placeholder="Search staff, files, nodes..." className="pl-10 pr-4 py-2 rounded-xl border border-earth-200 dark:border-earth-800 bg-white dark:bg-earth-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
           </div>
           <button className="bg-white dark:bg-earth-900 p-2.5 rounded-xl border border-earth-200 dark:border-earth-800 text-earth-500"><Bell size={20} /></button>
           <button className="bg-white dark:bg-earth-900 p-2.5 rounded-xl border border-earth-200 dark:border-earth-800 text-earth-500"><Settings size={20} /></button>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {INTERNAL_STATS.map((stat, i) => (
              <div key={i} className="bg-white dark:bg-earth-900 p-6 rounded-3xl border border-earth-100 dark:border-earth-800 shadow-sm flex items-center gap-5">
                  <div className="p-3 bg-earth-50 dark:bg-earth-800 rounded-2xl">{stat.icon}</div>
                  <div>
                      <div className="text-[10px] font-black text-earth-400 uppercase tracking-wider">{stat.label}</div>
                      <div className="text-2xl font-bold text-earth-900 dark:text-white">{stat.value}</div>
                  </div>
              </div>
          ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Tasks/Approvals */}
          <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-earth-900 rounded-3xl border border-earth-100 dark:border-earth-800 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-earth-100 dark:border-earth-800 flex justify-between items-center">
                      <h3 className="font-bold text-lg text-earth-900 dark:text-white">Critical Approvals Queue</h3>
                      <button className="text-xs font-bold text-blue-600 hover:underline uppercase tracking-widest">View All</button>
                  </div>
                  <div className="divide-y divide-earth-50 dark:divide-earth-800">
                      {[
                        { title: "Kiriaini EA Thrust Funding", type: "Budget", author: "Dr. Rossi", priority: "High" },
                        { title: "New AI Diagnostic Node Release", type: "Technical", author: "Eng. Kim", priority: "Medium" },
                        { title: "Regional Partner Vetting", type: "Compliance", author: "Admin Sarah", priority: "Low" }
                      ].map((item, i) => (
                          <div key={i} className="p-6 hover:bg-earth-50 dark:hover:bg-earth-800/50 transition-colors flex items-center justify-between group">
                              <div className="flex gap-4">
                                  <div className={`w-2 h-12 rounded-full ${item.priority === 'High' ? 'bg-red-500' : item.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                                  <div>
                                      <h4 className="font-bold text-earth-900 dark:text-white leading-tight mb-1 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                                      <p className="text-xs text-earth-500">{item.type} • Submitted by {item.author}</p>
                                  </div>
                              </div>
                              <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">Review</button>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Departmental Sync */}
              <div className="bg-white dark:bg-earth-900 p-8 rounded-3xl border border-earth-100 dark:border-earth-800 shadow-sm">
                  <h3 className="font-bold text-lg text-earth-900 dark:text-white mb-6">Departmental Performance</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                      {['Social Ag', 'Eco-Tech', 'Compliance'].map((dept) => (
                          <div key={dept} className="bg-earth-50 dark:bg-earth-800 p-5 rounded-2xl border border-earth-100 dark:border-earth-700">
                              <div className="flex justify-between items-start mb-4">
                                  <div className="text-[10px] font-black text-earth-400 uppercase tracking-widest">{dept}</div>
                                  <CheckCircle2 size={16} className="text-agro-500" />
                              </div>
                              <div className="text-2xl font-bold text-earth-900 dark:text-white mb-1">94%</div>
                              <div className="w-full bg-earth-200 dark:bg-earth-900 h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-agro-500 h-full w-[94%]"></div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
              <div className="bg-agro-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                  <div className="relative z-10">
                      <Zap size={32} className="text-agro-400 mb-4" />
                      <h3 className="text-xl font-bold mb-2">Live Thrust Health</h3>
                      <p className="text-agro-200 text-xs mb-6 leading-relaxed">System-wide monitoring of the C(a) Sustainability Coefficient across all registered 12,000+ nodes.</p>
                      <button className="w-full bg-agro-500 hover:bg-agro-400 text-white font-bold py-3 rounded-xl transition-all text-xs uppercase tracking-[0.15em]">System Audit</button>
                  </div>
                  <div className="absolute -bottom-10 -right-10 opacity-10"><PieChart size={200} /></div>
              </div>

              <div className="bg-white dark:bg-earth-900 p-6 rounded-3xl border border-earth-100 dark:border-earth-800 shadow-sm">
                  <h3 className="font-bold text-earth-900 dark:text-white mb-6 flex items-center gap-2"><Briefcase size={18} className="text-blue-500" /> Staff Directory</h3>
                  <div className="space-y-4">
                      {[
                        { name: "Samuel Omondi", role: "Network Architect", status: "Online" },
                        { name: "Dr. Elena Rossi", role: "Sustainability Lead", status: "In Meeting" },
                        { name: "John Mwangi", role: "DevOps Engineer", status: "Offline" }
                      ].map((staff, i) => (
                          <div key={i} className="flex items-center gap-3 p-2 hover:bg-earth-50 dark:hover:bg-earth-800 rounded-xl transition-colors cursor-pointer group">
                              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 font-bold">{staff.name.charAt(0)}</div>
                              <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-bold text-earth-900 dark:text-white truncate">{staff.name}</h4>
                                  <p className="text-[10px] text-earth-500 truncate">{staff.role}</p>
                              </div>
                              <div className={`w-2 h-2 rounded-full ${staff.status === 'Online' ? 'bg-green-500 animate-pulse' : staff.status === 'In Meeting' ? 'bg-amber-500' : 'bg-earth-300'}`}></div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};