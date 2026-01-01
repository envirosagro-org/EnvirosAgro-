import React, { useState } from 'react';
import { 
  Database, Upload, Cloud, ShieldCheck, 
  ArrowRight, Loader2, CheckCircle2, Zap, 
  Globe, Server, Lock, Cpu, Network,
  BarChart3, FileJson, FileSpreadsheet,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface InputFormProps {
  isIntegrated: boolean;
  partnerName: string | undefined;
  partnerId: string | undefined;
}

export const InputForm: React.FC<InputFormProps> = ({ isIntegrated, partnerName, partnerId }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dataType, setDataType] = useState('TELEMETRY');

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
      toast.success("Ecosystem data ingestion successful.");
    }, 2500);
  };

  const DATA_TYPES = [
    { id: 'TELEMETRY', label: 'IoT Telemetry', icon: <Cpu size={16} /> },
    { id: 'FINANCE', label: 'Finance Ledger', icon: <BarChart3 size={16} /> },
    { id: 'REMOTE', label: 'Remote Sensing', icon: <Globe size={16} /> }
  ];

  if (isSuccess) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-earth-900 rounded-[3rem] p-12 border border-earth-100 dark:border-earth-800 shadow-cinematic text-center"
        >
            <div className="w-20 h-20 bg-green-50 dark:bg-agro-900/30 text-agro-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={40} />
            </div>
            <h2 className="text-3xl font-serif font-black text-earth-900 dark:text-white mb-4 tracking-tight uppercase">Ingestion Successful</h2>
            <p className="text-earth-500 dark:text-earth-400 mb-10 max-w-md mx-auto font-medium">
                Data packet has been hashed and added to the global resilience registry. Intelligence dissemination cycle has begun.
            </p>
            <div className="bg-earth-50 dark:bg-earth-800 p-8 rounded-2xl border border-earth-100 dark:border-earth-700 mb-10 max-w-sm mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] font-black uppercase text-earth-400 tracking-widest">Transaction Hash</span>
                    <span className="text-[10px] font-mono font-bold text-agro-600">0xEA...F92A</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase text-earth-400 tracking-widest">In(val) Delta</span>
                    <span className="text-sm font-black text-blue-600">+0.12 pts</span>
                </div>
            </div>
            <button 
                onClick={() => setIsSuccess(false)}
                className="bg-earth-900 dark:bg-white text-white dark:text-earth-900 px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
                Submit New Packet
            </button>
        </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-earth-900 rounded-[3rem] p-10 md:p-12 border border-earth-100 dark:border-earth-800 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-10 opacity-5 -rotate-12"><Server size={200} /></div>
      
      <div className="mb-12 relative z-10">
        <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-600/20">
                <Network size={24} />
            </div>
            <div>
                <h3 className="text-2xl font-serif font-black text-earth-900 dark:text-white uppercase tracking-tight leading-none">Transmission Ingest</h3>
                <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-1">Uplink: Core-Alpha-Hub</p>
            </div>
        </div>
        <p className="text-earth-500 dark:text-earth-400 font-medium">
            Authorized portal for strategic partner data submission into the EnvirosAgro Registry.
        </p>
      </div>

      <form onSubmit={handleUpload} className="space-y-10 relative z-10">
        <div className="grid grid-cols-3 gap-4">
            {DATA_TYPES.map(type => (
                <button 
                    key={type.id}
                    type="button"
                    onClick={() => setDataType(type.id)}
                    className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${dataType === type.id ? 'bg-blue-50 border-blue-600 dark:bg-blue-900/30' : 'bg-earth-50 dark:bg-earth-800 border-transparent hover:border-earth-200'}`}
                >
                    <div className={`${dataType === type.id ? 'text-blue-600' : 'text-earth-400'}`}>
                        {type.icon}
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${dataType === type.id ? 'text-blue-600' : 'text-earth-400'}`}>{type.label}</span>
                </button>
            ))}
        </div>

        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-earth-400 tracking-widest ml-1">Partner Signature</label>
                    <div className="relative group">
                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input 
                            required
                            type="text" 
                            disabled={isIntegrated}
                            value={isIntegrated ? partnerName : ''}
                            placeholder="Authorized ID"
                            className="w-full bg-earth-50 dark:bg-earth-800 border border-earth-100 dark:border-earth-700 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all dark:text-white" 
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-earth-400 tracking-widest ml-1">Encryption Protocol</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <select className="w-full bg-earth-50 dark:bg-earth-800 border border-earth-100 dark:border-earth-700 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold focus:outline-none transition-all dark:text-white appearance-none">
                            <option>SHA-256 Hashed</option>
                            <option>Node-to-Node AES</option>
                            <option>Public Dissemination</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-earth-400 tracking-widest ml-1">Strategic Metadata (CSV/JSON)</label>
                <div className="border-4 border-dashed border-earth-100 dark:border-earth-800 rounded-[2rem] p-12 text-center group hover:border-blue-500/50 transition-all bg-earth-50/50 dark:bg-earth-950/20">
                    {isUploading ? (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center px-4">
                                <span className="text-[10px] font-black uppercase text-blue-600">Encrypting Packet...</span>
                                <span className="text-xs font-mono font-bold text-blue-600">{uploadProgress}%</span>
                            </div>
                            <div className="h-2 w-full bg-earth-200 dark:bg-earth-800 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-blue-600" 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="w-16 h-16 bg-white dark:bg-earth-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-earth-300 shadow-sm">
                                <Upload size={32} />
                            </div>
                            <p className="text-sm font-bold text-earth-700 dark:text-earth-300 mb-2">Drop data packets or browse node storage</p>
                            <p className="text-[9px] font-black text-earth-400 uppercase tracking-widest">Max size: 500MB per Transmission</p>
                        </>
                    )}
                </div>
            </div>
        </div>

        <button 
          type="submit"
          disabled={isUploading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 rounded-[1.8rem] font-black text-[10px] uppercase tracking-[0.4em] shadow-xl shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-4 disabled:opacity-50"
        >
          {isUploading ? <><Loader2 size={18} className="animate-spin" /> ESTABLISHING HANDSHAKE...</> : <><Cloud size={20} /> Deploy Data Transmission</>}
        </button>
      </form>

      <div className="mt-12 flex items-center justify-center gap-8 text-earth-400">
         <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest"><ShieldCheck size={14} className="text-agro-600"/> ISO-27001</span>
         <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest"><Zap size={14} className="text-amber-500"/> Low Latency</span>
         <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest"><Database size={14} className="text-purple-500"/> 99.9% Uptime</span>
      </div>
    </div>
  );
};
