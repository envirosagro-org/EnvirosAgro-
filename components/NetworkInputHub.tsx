import React from 'react';
import { View } from '../types';
import { InputForm } from './network/InputForm';
import { IntegrationDetails } from './network/IntegrationDetails';
import { PastSubmissions } from './network/PastSubmissions';
import { ArrowLeft, Network, Globe, Activity, ShieldCheck } from 'lucide-react';

interface NetworkInputHubProps {
  onNavigate: (view: View) => void;
  isIntegrated: boolean;
  partnerName: string | undefined;
  partnerId: string | undefined;
}

export const NetworkInputHub: React.FC<NetworkInputHubProps> = ({ onNavigate, isIntegrated, partnerName, partnerId }) => {
  return (
    <div className="min-h-screen bg-earth-50 dark:bg-earth-950 text-earth-900 dark:text-white transition-colors duration-500">
      
      {/* Back Button */}
      <div className="max-w-[1600px] mx-auto px-6 pt-8">
        <button 
          onClick={() => onNavigate(View.HOME)}
          className="flex items-center gap-2 text-earth-400 hover:text-blue-600 font-black text-[10px] uppercase tracking-widest transition-all group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Command
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
            <InputForm isIntegrated={isIntegrated} partnerName={partnerName} partnerId={partnerId} />
          </div>
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-indigo-900 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl group">
                <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 transition-transform duration-1000 group-hover:scale-110"><ShieldCheck size={180} /></div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-300 mb-6">Security Handshake</h4>
                <p className="text-sm text-indigo-100 font-medium leading-relaxed mb-10 relative z-10 italic">
                    "All transmissions are automatically validated against the ISO-27001 standard and hashed into the Biomass Ledger."
                </p>
                <button className="relative z-10 w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
                    View Security Protocols
                </button>
            </div>
            
            <IntegrationDetails 
              isIntegrated={isIntegrated} 
              partnerName={partnerName} 
              onNavigate={() => onNavigate(View.PARTNERSHIPS)} 
            />
            <PastSubmissions />
          </div>
        </main>
      </div>
    </div>
  );
};
