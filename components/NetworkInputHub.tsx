import React from 'react';
import { View, User } from '../types';
import { InputForm } from './network/InputForm';
import { PastSubmissions } from './network/PastSubmissions';
import { ArrowLeft, Network, Globe, Activity, ShieldCheck, LogOut } from 'lucide-react';

interface NetworkInputHubProps {
  user: User | null;
  onNavigate: (view: View) => void;
  onLogout: () => void;
}

export const NetworkInputHub: React.FC<NetworkInputHubProps> = ({ user, onNavigate, onLogout }) => {
  return (
    <div className="min-h-screen bg-earth-50 dark:bg-earth-950 text-earth-900 dark:text-white transition-colors duration-500">
      
      <div className="max-w-[1600px] mx-auto px-6 pt-8 flex justify-between items-center">
        <button 
          onClick={() => onNavigate(View.HOME)}
          className="flex items-center gap-2 text-earth-400 hover:text-blue-600 font-black text-[10px] uppercase tracking-widest transition-all group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Command
        </button>
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 text-earth-400 hover:text-red-600 font-black text-[10px] uppercase tracking-widest transition-all group"
        >
          Logout <LogOut size={14} />
        </button>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <header className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="ea-label-meta mb-4 text-blue-600">Global Data Ingest</div>
            <h1 className="text-5xl lg:text-7xl font-serif font-black text-earth-900 dark:text-white leading-none tracking-tighter">
                Network <span className="text-blue-600 italic">Ingest</span> Hub
            </h1>
            <p className="text-xl text-earth-500 dark:text-earth-400 mt-6 font-medium">
                Centralized gateway for strategic partners to synchronize telemetry and financial data packets with the EnvirosAgro Registry.
            </p>
          </div>
          
          <div className="flex gap-4">
              {[
                  { label: 'Uplink Latency', val: '14ms', color: 'text-agro-600', icon: <Activity size={16}/> },
                  { label: 'Ingest Rate', val: '1.2 PB/d', color: 'text-blue-600', icon: <Globe size={16}/> }
              ].map((s, i) => (
                  <div key={i} className="bg-white dark:bg-earth-900 px-6 py-4 rounded-2xl border border-earth-100 dark:border-earth-800 flex items-center gap-4 shadow-sm">
                      <div className={`p-2 bg-earth-50 dark:bg-earth-800 rounded-lg ${s.color}`}>{s.icon}</div>
                      <div>
                          <span className="text-[9px] font-black uppercase text-earth-400 block">{s.label}</span>
                          <span className="text-sm font-mono font-bold text-earth-900 dark:text-white">{s.val}</span>
                      </div>
                  </div>
              ))}
          </div>
        </header>
        
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <InputForm user={user} />
          </div>
          <div className="lg:col-span-4 space-y-8">
            <PastSubmissions user={user} />
          </div>
        </main>
      </div>
    </div>
  );
};
