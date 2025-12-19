import React, { useState } from 'react';
import { 
  Globe, Handshake, TrendingUp, BarChart3, ShieldCheck, 
  Map, FileCheck, MessageSquare, ExternalLink, ArrowUpRight,
  Target, Download, Calendar, Zap, ListChecks, Smartphone
} from 'lucide-react';

const PARTNER_STATS = [
  { label: "Partner Groups", value: "812", icon: <Handshake className="text-blue-500" /> },
  { label: "Shared C(a)", value: "8.4", icon: <Target className="text-agro-500" /> },
  { label: "Active Chains", value: "14", icon: <TrendingUp className="text-purple-500" /> },
  { label: "Compliant Nodes", value: "92%", icon: <ShieldCheck className="text-green-500" /> }
];

export const ExtranetDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ANALYTICS');

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div className="flex-1">
           <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-100 dark:border-blue-800">
               <Globe size={14} /> Partner & Stakeholder Hub
           </div>
           <h2 className="text-4xl font-serif font-bold text-agro-900 dark:text-white">Partner Extranet</h2>
           <p className="text-lg text-earth-600 dark:text-earth-400 mt-2">Monitoring collective impact and industrial supply chain transparency.</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-white dark:bg-earth-900 border border-earth-200 dark:border-earth-800 text-earth-700 dark:text-earth-300 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-earth-50 transition-all text-sm">
               <Download size={18} /> Shared Data Kit
           </button>
           <button className="bg-agro-600 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-agro-700 transition-all shadow-lg shadow-agro-600/20">
               Contact Admin
           </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {PARTNER_STATS.map((stat, i) => (
              <div key={i} className="bg-white dark:bg-earth-900 p-8 rounded-[2rem] border border-earth-100 dark:border-earth-800 shadow-sm transition-all hover:shadow-md">
                  <div className="mb-4">{stat.icon}</div>
                  <div className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-[10px] font-black text-earth-400 uppercase tracking-widest">{stat.label}</div>
              </div>
          ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Insights */}
          <div className="lg:col-span-2 space-y-8">
              <div className="bg-white dark:bg-earth-900 p-8 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm">
                  <h3 className="text-2xl font-bold text-earth-900 dark:text-white mb-8 flex items-center gap-3">
                      <Map className="text-blue-500" /> Regional Node Compliance
                  </h3>
                  <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                         {['East Africa Cluster', 'West Africa Hub', 'Southeast Asia Node'].map((region, i) => (
                             <div key={i} className="space-y-2">
                                <div className="flex justify-between text-sm font-bold text-earth-700 dark:text-earth-300 uppercase tracking-tight">
                                    <span>{region}</span>
                                    <span>{i === 0 ? '98%' : i === 1 ? '84%' : '91%'}</span>
                                </div>
                                <div className="w-full bg-earth-100 dark:bg-earth-800 h-2.5 rounded-full overflow-hidden">
                                    <div className={`h-full ${i === 1 ? 'bg-amber-500' : 'bg-agro-500'}`} style={{width: i === 0 ? '98%' : i === 1 ? '84%' : '91%'}}></div>
                                </div>
                             </div>
                         ))}
                      </div>
                      <div className="bg-earth-50 dark:bg-earth-800/50 rounded-2xl p-6 border border-earth-100 dark:border-earth-700 flex flex-col justify-center text-center">
                          <BarChart3 size={48} className="text-earth-300 mx-auto mb-4" />
                          <p className="text-sm text-earth-600 dark:text-earth-400 font-medium">Compliance has increased by <strong>12.4%</strong> since the Q1 implementation of the Five Thrusts policy.</p>
                      </div>
                  </div>
              </div>

              {/* Shared Documents */}
              <div className="bg-white dark:bg-earth-900 p-8 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm">
                  <h3 className="text-2xl font-bold text-earth-900 dark:text-white mb-6">Recent Shared Resources</h3>
                  <div className="grid gap-4">
                      {[
                        { title: "2024 Industrial Supply Chain Outlook", meta: "PDF • 12.4MB", date: "May 10" },
                        { title: "EA Trust Compliance Certification (Template)", meta: "DOCX • 2.1MB", date: "May 08" },
                        { title: "Regional Water Scarcity Predictive Model", meta: "XLSX • 45MB", date: "May 02" }
                      ].map((doc, i) => (
                          <div key={i} className="p-5 bg-earth-50 dark:bg-earth-800 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex items-center justify-between group cursor-pointer border border-transparent hover:border-blue-100">
                              <div className="flex items-center gap-4">
                                  <div className="p-3 bg-white dark:bg-earth-900 rounded-xl text-blue-500 shadow-sm"><FileCheck size={20} /></div>
                                  <div>
                                      <h4 className="font-bold text-earth-900 dark:text-white group-hover:text-blue-700 transition-colors">{doc.title}</h4>
                                      <p className="text-xs text-earth-500">{doc.meta}</p>
                                  </div>
                              </div>
                              <span className="text-[10px] font-black text-earth-400 uppercase">{doc.date}</span>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
              <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden flex flex-col h-fit">
                  <div className="relative z-10">
                      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
                          <Target size={32} className="text-blue-300" />
                      </div>
                      <h3 className="text-3xl font-serif font-bold mb-4 leading-tight">Supply Chain Resilience</h3>
                      <p className="text-blue-200 mb-10 leading-relaxed text-sm">Real-time predictive scoring of your supply chain nodes against the m(t) resilience constant.</p>
                      <button className="w-full bg-white text-blue-900 font-bold py-4 rounded-2xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group shadow-xl">
                          Access Monitor <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                  </div>
                  <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none transform rotate-12"><Smartphone size={250} /></div>
              </div>

              <div className="bg-white dark:bg-earth-900 p-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 shadow-sm">
                  <h3 className="font-bold text-earth-900 dark:text-white mb-6">Upcoming Milestones</h3>
                  <div className="space-y-6">
                      <div className="flex gap-4">
                          <div className="w-1 h-12 bg-agro-500 rounded-full"></div>
                          <div>
                              <p className="text-xs font-black text-agro-600 uppercase tracking-widest">May 24</p>
                              <p className="text-sm font-bold text-earth-800 dark:text-earth-200">ScaleUp Summit 2024</p>
                          </div>
                      </div>
                      <div className="flex gap-4">
                          <div className="w-1 h-12 bg-blue-500 rounded-full"></div>
                          <div>
                              <p className="text-xs font-black text-blue-600 uppercase tracking-widest">Jun 12</p>
                              <p className="text-sm font-bold text-earth-800 dark:text-earth-200">Q2 Data Audit Baseline</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};