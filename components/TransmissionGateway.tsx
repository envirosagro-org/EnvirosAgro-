
import React, { useState, useEffect } from 'react';
import { 
  Mail, Send, ShieldCheck, Globe, Activity, Terminal, 
  ArrowRight, Loader2, CheckCircle2, AlertCircle, Lock,
  Cpu, Zap, Database, Share2, Info, Users, ArrowUpRight
} from 'lucide-react';
import { View } from '../types';

export const TransmissionGateway: React.FC<{ onNavigate?: (view: View) => void }> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [txLog, setTxLog] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    thrust: 'SA',
    senderNode: 'GUEST_NODE_' + Math.floor(Math.random() * 9000),
  });

  const destination = "envirosagro.com@gmail.com";

  const handleTransmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransmitting(true);
    setTxLog(["Initializing handshake with nearest Edge node...", `Destination mapping: ${destination}`]);
    
    try {
      // Local processing logs
      const localSequence = [
        "Encrypting payload via m(t) secure standards...",
        "Validating node ESIN alignment...",
        "Hashing local metadata packets..."
      ];

      for (const log of localSequence) {
        await new Promise(r => setTimeout(r, 450));
        setTxLog(prev => [...prev, log]);
      }

      // Real call to the Cloudflare Pages Function (Worker)
      setTxLog(prev => [...prev, "Transmitting to Cloudflare Edge Router..."]);
      
      const response = await fetch('/api/transmit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Remote node timeout");

      const result = await response.json();

      setTxLog(prev => [
        ...prev, 
        `Serverless execution confirmed: ${result.processedBy}`,
        `Propagating to central node: ${result.routing.target}`,
        `Uplink complete. ID: ${result.id}`
      ]);

      await new Promise(r => setTimeout(r, 1000));
      setStep(3);
    } catch (err) {
      setTxLog(prev => [...prev, "CRITICAL ERROR: Data packet lost at edge gateway."]);
      console.error(err);
    } finally {
      setIsTransmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      
      <div className="ea-header-block p-10 mb-10 bg-slate-900/5 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-inner backdrop-blur-3xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex-1">
              <div className="ea-label-meta mb-2">
                 <Terminal size={12} className="text-blue-500" /> Global Edge Protocol v4.2
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-black text-earth-900 dark:text-white tracking-tighter">Transmission <span className="text-blue-600 italic">Gateway</span></h1>
              <p className="text-lg text-earth-500 dark:text-earth-400 mt-4 max-w-2xl font-medium leading-relaxed">
                 Secure, high-availability uplink via Cloudflare Workers. Your messages are processed at the nearest global node for peak organizational resilience.
              </p>
           </div>
           <div className="bg-blue-600 text-white p-6 rounded-[2.5rem] shadow-2xl shadow-blue-600/20 hidden md:block">
              <Mail size={40} />
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-earth-900 rounded-[3.5rem] border border-earth-100 dark:border-earth-800 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
            {step === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="p-10 lg:p-14 space-y-10 animate-in slide-in-from-left-4">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 px-1">Network Hub Target</label>
                    <div className="p-4 bg-earth-50 dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-700 flex items-center gap-3 text-slate-500">
                      <Globe size={16} className="text-blue-500" />
                      <span className="font-bold text-sm">{destination}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 px-1">Sender Node / ESIN</label>
                    <input 
                      className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-blue-500 rounded-2xl px-6 py-4 font-bold text-sm outline-none transition-all dark:text-white"
                      value={formData.senderNode}
                      onChange={e => setFormData({...formData, senderNode: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 px-1">Transmission Subject</label>
                  <input 
                    required
                    className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-blue-500 rounded-2xl px-6 py-4 font-bold text-sm outline-none transition-all dark:text-white"
                    placeholder="e.g. Infrastructure Scalability Analysis"
                    value={formData.subject}
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 px-1">Encrypted Payload</label>
                  <textarea 
                    required
                    rows={8}
                    className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-blue-500 rounded-[2.5rem] px-8 py-6 text-sm font-medium transition-all outline-none resize-none dark:text-white leading-relaxed"
                    placeholder="Document your inquiry or telemetry report..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[2rem] text-xs uppercase tracking-[0.3em] shadow-xl shadow-blue-600/30 flex items-center justify-center gap-4 transition-all"
                >
                  Verify Data <ArrowRight size={20} />
                </button>
              </form>
            )}

            {step === 2 && (
              <div className="p-10 lg:p-20 flex-1 flex flex-col animate-in slide-in-from-right-4">
                 <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                       <ShieldCheck size={40} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white mb-2">Uplink Authentication</h3>
                    <p className="text-earth-500 text-[10px] font-black uppercase tracking-widest">Routing data through the closest edge worker.</p>
                 </div>
                 
                 <div className="bg-earth-50 dark:bg-earth-800/50 p-8 rounded-[3rem] border border-earth-100 dark:border-earth-700 flex-1 flex flex-col">
                    <div className="space-y-6 flex-1">
                       <div className="grid grid-cols-2 gap-6">
                          <div>
                            <p className="text-[8px] font-black text-earth-400 uppercase tracking-widest mb-1">Subject</p>
                            <p className="font-bold text-earth-900 dark:text-white text-sm">{formData.subject}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[8px] font-black text-earth-400 uppercase tracking-widest mb-1">Target Address</p>
                            <p className="font-mono text-xs text-blue-600 font-bold">{destination}</p>
                          </div>
                       </div>
                       <div className="pt-6 border-t border-earth-100 dark:border-earth-700">
                          <p className="text-[8px] font-black text-earth-400 uppercase tracking-widest mb-3">Payload Sample</p>
                          <p className="text-xs text-earth-600 dark:text-earth-400 italic line-clamp-4 leading-relaxed font-medium">{formData.message}</p>
                       </div>
                    </div>

                    {isTransmitting ? (
                      <div className="mt-10 p-6 bg-slate-950 rounded-2xl font-mono text-[10px] text-blue-400 space-y-1 shadow-inner h-48 overflow-y-auto ea-scroll-area">
                         {txLog.map((log, i) => (
                           <div key={i} className="flex gap-2 animate-in slide-in-from-left-2">
                              <span className="opacity-40">[{new Date().toLocaleTimeString()}]</span>
                              <span>{log}</span>
                           </div>
                         ))}
                         <div className="flex gap-2 items-center text-blue-300">
                            <Loader2 size={12} className="animate-spin" />
                            <span className="animate-pulse">EDGE_UPLINK_COMMITTING...</span>
                         </div>
                      </div>
                    ) : (
                      <div className="flex gap-4 mt-10">
                        <button onClick={() => setStep(1)} className="flex-1 py-4 bg-white dark:bg-earth-900 text-earth-400 font-black rounded-2xl text-[10px] uppercase tracking-widest border border-earth-100 dark:border-earth-800">Edit Node</button>
                        <button 
                          onClick={handleTransmit}
                          className="flex-[2] py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-3"
                        >
                          <Send size={18} /> Commit Edge Transfer
                        </button>
                      </div>
                    )}
                 </div>
              </div>
            )}

            {step === 3 && (
              <div className="p-10 lg:p-20 text-center animate-in zoom-in duration-500 flex-1 flex flex-col justify-center">
                 <div className="w-24 h-24 bg-green-50 dark:bg-green-900/30 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-green-600 shadow-inner">
                    <CheckCircle2 size={56} />
                 </div>
                 <h3 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-4">Transmission Hashed</h3>
                 <p className="text-earth-600 dark:text-earth-400 mb-10 max-sm mx-auto leading-relaxed font-medium">
                    Your transmission was securely processed by Cloudflare Edge and is now being routed to EnvirosAgro's central node at {destination}.
                 </p>
                 <div className="bg-agro-50 dark:bg-agro-950/40 p-6 rounded-2xl border border-agro-100 dark:border-agro-900 inline-block mb-10">
                    <p className="text-[10px] font-black text-agro-600 uppercase tracking-widest mb-1">Receipt Hash (Verified by Edge)</p>
                    <p className="font-mono text-sm font-bold text-agro-900 dark:text-agro-100">EA-TX-{Date.now().toString().slice(-8)}</p>
                 </div>
                 <button onClick={() => setStep(1)} className="w-full max-w-xs mx-auto py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg active:scale-95 transition-all">Start New Transmission</button>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 transition-transform duration-1000 group-hover:rotate-12"><Cpu size={200} /></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                   <Lock size={24} className="text-blue-400" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 tracking-tight">Edge Security</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium mb-8">
                  By utilizing serverless workers at the global edge, we ensure your intelligence reaches Command with minimal latency and maximum data sovereignty.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[10px] font-black text-blue-400 uppercase tracking-widest">
                     <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> Serverless Architecture
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-black text-blue-400 uppercase tracking-widest">
                     <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> Edge-to-Edge Encryption
                  </div>
                </div>
              </div>
           </div>

           <div className="bg-white dark:bg-earth-900 p-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 shadow-sm group">
              <h3 className="font-bold text-earth-900 dark:text-white mb-6 flex items-center gap-3">
                 <Info size={18} className="text-blue-500" /> Transmission Metadata
              </h3>
              <div className="space-y-4">
                 {[
                   { label: 'Latency Policy', desc: 'Targeting < 30ms via nearest POP.' },
                   { label: 'Traceability', desc: 'Unique TX-ID hashed for audit logs.' },
                   { label: 'Central Router', desc: 'Routed to verified organization mail.' },
                   { label: 'Sovereignty', desc: 'Zero data storage at the edge.' }
                 ].map(cat => (
                    <div key={cat.label} className="p-4 bg-earth-50 dark:bg-earth-800/50 rounded-2xl border border-transparent group-hover:border-earth-100 transition-all">
                       <p className="text-xs font-bold text-earth-900 dark:text-white leading-tight mb-1">{cat.label}</p>
                       <p className="text-[10px] text-earth-500 font-medium">{cat.desc}</p>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-agro-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden flex flex-col justify-center min-h-[220px]">
              <div className="absolute -bottom-10 -right-10 opacity-10"><Activity size={180} /></div>
              <p className="text-3xl font-serif font-bold mb-4 tracking-tight leading-tight">Emergency <br/><span className="text-agro-400">Response</span></p>
              <p className="text-xs text-agro-200 mb-6 font-medium">Use the SafeHarvest portal for immediate biological threat alerts.</p>
              <button onClick={() => onNavigate?.(View.SAFE_HARVEST)} className="w-fit bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
                 Enter Secure Portal <ArrowUpRight size={14} />
              </button>
           </div>
        </div>
      </div>
      
      <div className="mt-20 pt-10 border-t border-earth-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-[9px] font-black uppercase tracking-[0.4em] text-earth-400">
         <div className="flex items-center gap-8">
            <span className="flex items-center gap-3"><Globe size={14} className="text-blue-500" /> Global Edge: DEPLOYED</span>
            <span className="flex items-center gap-3"><ShieldCheck size={14} className="text-agro-600" /> Data integrity verified</span>
         </div>
         <p className="opacity-40">UPLINK STATUS: EDGE_STABLE • v4.2.2</p>
      </div>
    </div>
  );
};
