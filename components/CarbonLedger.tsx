
import React, { useState } from 'react';
import { Leaf, TrendingUp, History, Download, Plus, Zap, Award, Globe, ShieldCheck, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const OFFSETS_DATA = [
  { month: 'Jan', tons: 1.2 },
  { month: 'Feb', tons: 2.1 },
  { month: 'Mar', tons: 1.8 },
  { month: 'Apr', tons: 3.5 },
  { month: 'May', tons: 4.2 },
  { month: 'Jun', tons: 5.8 },
];

const PROJECTS = [
  { id: 1, name: 'Kiriaini Reforestation', type: 'Afforestation', status: 'Active', credits: 450, impact: 'High' },
  { id: 2, name: 'Central Valley Biochar', type: 'Soil Sequestration', status: 'Verifying', credits: 120, impact: 'Medium' },
  { id: 3, name: 'Eco-Corridor Alpha', type: 'Biodiversity', status: 'Active', credits: 300, impact: 'High' },
];

export const CarbonLedger: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
           <div className="flex items-center gap-2 text-green-600 font-bold uppercase tracking-wider text-xs mb-2">
              <Leaf size={16} /> Impact Accounting
           </div>
           <h2 className="text-4xl font-serif font-bold text-agro-900 dark:text-white">Carbon Ledger</h2>
           <p className="text-xl text-earth-600 dark:text-earth-400 max-w-2xl">
             Quantify your farm's environmental contributions and manage your carbon credit assets.
           </p>
        </div>
        <div className="bg-white dark:bg-earth-900 px-6 py-4 rounded-2xl border border-earth-100 dark:border-earth-800 shadow-sm flex items-center gap-6">
           <div>
              <p className="text-xs font-bold text-earth-400 uppercase">Total Sequestration</p>
              <p className="text-3xl font-serif font-bold text-agro-700 dark:text-agro-400">18.6 <span className="text-sm font-sans text-earth-500">Tons</span></p>
           </div>
           <div className="w-12 h-12 bg-agro-50 dark:bg-agro-900/30 rounded-xl flex items-center justify-center text-agro-600">
              <Zap size={24} />
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white dark:bg-earth-900 p-8 rounded-3xl shadow-sm border border-earth-100 dark:border-earth-800">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="font-bold text-earth-900 dark:text-white flex items-center gap-2">
                    <TrendingUp size={20} className="text-agro-600" /> Monthly Offset Performance
                 </h3>
                 <button className="text-xs font-bold text-agro-600 hover:underline flex items-center gap-1">
                    <Download size={14} /> Export CSV
                 </button>
              </div>
              <div className="h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={OFFSETS_DATA}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                       <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                       <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                       <Tooltip cursor={{fill: 'rgba(0,0,0,0.02)'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                       <Bar dataKey="tons" radius={[4, 4, 0, 0]}>
                          {OFFSETS_DATA.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={index === OFFSETS_DATA.length - 1 ? '#15803d' : '#22c55e'} />
                          ))}
                       </Bar>
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Active Projects */}
           <div>
              <h3 className="text-xl font-bold text-earth-900 dark:text-white mb-6">Active Sequestration Projects</h3>
              <div className="grid gap-4">
                 {PROJECTS.map((project) => (
                    <div key={project.id} className="bg-white dark:bg-earth-900 p-6 rounded-2xl border border-earth-100 dark:border-earth-800 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-center gap-6">
                       <div className="flex items-center gap-4 flex-1">
                          <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-xl text-green-600">
                             <Globe size={24} />
                          </div>
                          <div>
                             <h4 className="font-bold text-earth-900 dark:text-white">{project.name}</h4>
                             <p className="text-xs text-earth-500">{project.type}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-12 w-full md:w-auto">
                          <div className="text-center">
                             <p className="text-[10px] font-bold text-earth-400 uppercase mb-1">Impact</p>
                             <span className={`text-xs font-bold px-2 py-1 rounded-full ${project.impact === 'High' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{project.impact}</span>
                          </div>
                          <div className="text-center">
                             <p className="text-[10px] font-bold text-earth-400 uppercase mb-1">Credits</p>
                             <span className="font-bold text-earth-900 dark:text-white">{project.credits} <span className="text-agro-600">EAC</span></span>
                          </div>
                          <div className="text-center">
                             <p className="text-[10px] font-bold text-earth-400 uppercase mb-1">Status</p>
                             <span className="text-xs font-bold text-earth-600 dark:text-earth-400">{project.status}</span>
                          </div>
                          <button className="text-earth-300 hover:text-agro-600 transition-colors">
                             <ChevronRight size={20} />
                          </button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           <div className="bg-agro-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <Award size={48} className="text-agro-300 mb-6" />
                <h3 className="text-2xl font-bold mb-2">Mint EAC Credits</h3>
                <p className="text-agro-100 text-sm mb-6 leading-relaxed">
                  Convert your verified carbon offsets into EnvirosAgro Coins (EAC) to spend in the marketplace or trade in the capital exchange.
                </p>
                <button className="w-full bg-agro-500 hover:bg-agro-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                   <Zap size={20} fill="currentColor" /> Initialize Minting
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 text-white/5">
                <Leaf size={200} />
              </div>
           </div>

           <div className="bg-white dark:bg-earth-900 p-8 rounded-3xl shadow-sm border border-earth-100 dark:border-earth-800">
              <h3 className="font-bold text-earth-900 dark:text-white mb-4 flex items-center gap-2">
                 <ShieldCheck className="text-blue-600" /> Verification Protocol
              </h3>
              <p className="text-earth-600 dark:text-earth-400 text-sm mb-6">
                Your sequestration data is cross-verified via the <strong className="text-agro-600">m(t) Resilience Metric</strong> ensuring highest integrity for market trading.
              </p>
              <div className="space-y-3">
                 <div className="flex items-center gap-3 text-xs text-earth-500">
                    <div className="w-1.5 h-1.5 bg-agro-500 rounded-full"></div>
                    Satellite Biomass Analysis
                 </div>
                 <div className="flex items-center gap-3 text-xs text-earth-500">
                    <div className="w-1.5 h-1.5 bg-agro-500 rounded-full"></div>
                    In-situ Soil Carbon Testing
                 </div>
                 <div className="flex items-center gap-3 text-xs text-earth-500">
                    <div className="w-1.5 h-1.5 bg-agro-500 rounded-full"></div>
                    Chain-of-Custody Logging
                 </div>
              </div>
           </div>

           <div className="bg-earth-50 dark:bg-earth-800/50 p-6 rounded-3xl border border-earth-100 dark:border-earth-800">
              <h3 className="font-bold text-earth-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Upcoming Audits</h3>
              <div className="flex items-center gap-4 p-3 bg-white dark:bg-earth-900 rounded-xl border border-earth-100 dark:border-earth-800">
                 <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 p-2 rounded-lg">
                    <History size={16} />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-earth-900 dark:text-white">Annual Verification</p>
                    <p className="text-[10px] text-earth-500">Due in 42 days</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
