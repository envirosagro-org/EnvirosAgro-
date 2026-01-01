import React, { useState } from 'react';
import { User, View } from '../types';
import { 
  Zap, ShieldCheck, Activity, Globe, Info, 
  ArrowRight, CheckCircle2, Loader2, Sparkles, 
  Database, GitBranch, History, TrendingUp,
  Cloud, Leaf, Droplets, Target, ArrowLeft,
  X, ExternalLink, FileText, Download, Share2
} from 'lucide-react';

import { LedgerHeader } from './carbonledger/LedgerHeader';
import { OffsetChart } from './carbonledger/OffsetChart';
import { ProjectList } from './carbonledger/ProjectList';
import { MintSidebar } from './carbonledger/MintSidebar';
import { MintModal } from './carbonledger/MintModal';
import { VerificationProtocol } from './carbonledger/VerificationProtocol';
import { AuditSidebar } from './carbonledger/AuditSidebar';
import { motion, AnimatePresence } from 'framer-motion';

const OFFSETS_DATA = [
  { month: 'Jan', tons: 1.2, sequestered: 45, goal: 40 },
  { month: 'Feb', tons: 2.1, sequestered: 52, goal: 40 },
  { month: 'Mar', tons: 1.8, sequestered: 48, goal: 45 },
  { month: 'Apr', tons: 3.5, sequestered: 65, goal: 45 },
  { month: 'May', tons: 4.2, sequestered: 78, goal: 50 },
  { month: 'Jun', tons: 5.8, sequestered: 92, goal: 50 },
];

const INITIAL_PROJECTS = [
  { id: 1, name: 'Kiriaini Reforestation', type: 'Afforestation', status: 'Active', credits: 450, impact: 'High', availableTons: 8.5, location: 'Kenya', efficiency: 94, desc: 'Large scale indigenous tree planting in the Central Highlands to restore watershed integrity.' },
  { id: 2, name: 'Central Valley Biochar', type: 'Soil Sequestration', status: 'Verifying', credits: 120, impact: 'Medium', availableTons: 3.2, location: 'USA', efficiency: 82, desc: 'Integrating biochar into commercial almond orchards to improve water retention and carbon storage.' },
  { id: 3, name: 'Eco-Corridor Alpha', type: 'Biodiversity', status: 'Active', credits: 300, impact: 'High', availableTons: 5.4, location: 'Brazil', efficiency: 91, desc: 'Connecting fragmented rainforest patches to facilitate species migration and biomass accumulation.' },
];

const RECENT_TRANSACTIONS = [
  { id: 'TX-901', project: 'Kiriaini Reforestation', amount: '+4.2 Tons', eac: '+210 EAC', date: '2024-05-12', status: 'Verified', hash: '0x4f2...a9c', method: 'Biomass Hashing' },
  { id: 'TX-894', project: 'Eco-Corridor Alpha', amount: '+1.5 Tons', eac: '+75 EAC', date: '2024-05-10', status: 'Verified', hash: '0x1b4...e8d', method: 'Soil Delta Analysis' },
  { id: 'TX-882', project: 'Central Valley Biochar', amount: '+0.8 Tons', eac: '+40 EAC', date: '2024-05-08', status: 'Pending', hash: '0x9a2...f3b', method: 'Biochar Audit' },
];

interface CarbonLedgerProps {
  user: User | null;
  onAwardEac?: (amount: number) => void;
  onNavigate?: (view: View) => void;
}

export const CarbonLedger: React.FC<CarbonLedgerProps> = ({ user, onAwardEac, onNavigate }) => {
  const [showMintModal, setShowMintModal] = useState(false);
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [mintStatus, setMintStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');
  const [mintAmount, setMintAmount] = useState('1.0');
  const [selectedProjectId, setSelectedProjectId] = useState<number>(1);
  const [processingStep, setProcessingStep] = useState(0);

  const MINT_RATE = 50; // 1 ton = 50 EAC

  const steps = [
    "Establishing Satellite Uplink...",
    "Verifying Biomass Density...",
    "Validating Soil Sequestration Delta...",
    "Securing EAC Ledger Entry..."
  ];

  const handleMint = () => {
    const tons = parseFloat(mintAmount);
    if (isNaN(tons) || tons <= 0) return;

    setMintStatus('PROCESSING');
    setProcessingStep(0);

    const interval = setInterval(() => {
      setProcessingStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    setTimeout(() => {
      const eacToAward = tons * MINT_RATE;
      if (onAwardEac) onAwardEac(eacToAward);
      setMintStatus('SUCCESS');
    }, 5500);
  };

  return (
    <div className="bg-white dark:bg-earth-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button 
          onClick={() => onNavigate?.(View.HOME)}
          className="flex items-center gap-2 text-gray-500 hover:text-agro-600 transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LedgerHeader />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
           {[
             { label: 'Total Sequestered', val: '42.8 Tons', icon: <Cloud className="text-blue-500" />, trend: '+12%' },
             { label: 'EAC Generated', val: '2,140', icon: <Zap className="text-agro-600" />, trend: '+15%' },
             { label: 'Network Node Rank', val: '#14', icon: <Globe className="text-purple-500" />, trend: '+2' },
             { label: 'System Integrity', val: '99.9%', icon: <ShieldCheck className="text-green-500" />, trend: 'Stable' }
           ].map((stat, i) => (
             <div key={i} className="bg-white dark:bg-earth-900 p-6 rounded-[2rem] border border-earth-100 dark:border-earth-800 shadow-sm group hover:scale-[1.02] transition-transform cursor-default">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-earth-50 dark:bg-earth-800 rounded-2xl group-hover:bg-agro-50 transition-colors">
                    {stat.icon}
                  </div>
                  <span className="text-[10px] font-black text-agro-600 dark:text-agro-400 bg-agro-50 dark:bg-agro-900/20 px-3 py-1 rounded-full">{stat.trend}</span>
                </div>
                <h4 className="text-earth-500 dark:text-earth-400 font-bold text-[10px] uppercase tracking-widest">{stat.label}</h4>
                <p className="text-2xl font-black text-earth-900 dark:text-white mt-1">{stat.val}</p>
             </div>
           ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Chart Section */}
            <div className="bg-white dark:bg-earth-900 rounded-[2.5rem] p-8 border border-earth-100 dark:border-earth-800 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-10 relative z-10">
                   <div>
                      <h3 className="text-2xl font-bold text-earth-900 dark:text-white flex items-center gap-3">
                         <TrendingUp className="text-blue-500" /> Sequestration Analytics
                      </h3>
                      <p className="text-xs text-earth-500 mt-1">Real-time performance of your carbon sink assets.</p>
                   </div>
                   <div className="flex gap-2">
                      <button className="px-4 py-2 bg-earth-50 dark:bg-earth-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-earth-600">Monthly</button>
                      <button className="px-4 py-2 bg-agro-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Yearly</button>
                   </div>
                </div>
                <OffsetChart data={OFFSETS_DATA} />
            </div>

            {/* Active Projects */}
            <ProjectList
              projects={INITIAL_PROJECTS}
              setSelectedProjectId={setSelectedProjectId}
              setShowMintModal={setShowMintModal}
            />

            {/* Transaction History */}
            <div className="bg-white dark:bg-earth-900 rounded-[2.5rem] p-8 border border-earth-100 dark:border-earth-800 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-earth-900 dark:text-white flex items-center gap-3">
                     <History className="text-purple-500" /> Ledger History
                  </h3>
                  <button className="text-[10px] font-black text-agro-600 uppercase tracking-widest">View All</button>
                </div>
                <div className="space-y-4">
                   {RECENT_TRANSACTIONS.map((tx, i) => (
                     <div 
                        key={i} 
                        onClick={() => setSelectedTx(tx)}
                        className="flex items-center justify-between p-5 bg-earth-50/50 dark:bg-earth-800/30 rounded-2xl border border-transparent hover:border-earth-200 cursor-pointer transition-all group"
                     >
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-xl bg-white dark:bg-earth-900 flex items-center justify-center text-earth-400 group-hover:text-agro-600 transition-colors border border-earth-100 dark:border-earth-800">
                              <Database size={20} />
                           </div>
                           <div>
                              <h4 className="font-bold text-earth-900 dark:text-white text-sm">{tx.project}</h4>
                              <p className="text-[10px] text-earth-500 font-medium">{tx.id} • {tx.date}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-sm font-black text-agro-600">{tx.amount}</p>
                           <p className="text-[9px] font-bold text-earth-400 uppercase tracking-widest">{tx.eac}</p>
                        </div>
                     </div>
                   ))}
                </div>
            </div>
          </div>

          <div className="space-y-8">
            <MintSidebar setShowMintModal={setShowMintModal} />
            
            <div className="bg-gradient-to-br from-agro-900 to-agro-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl group cursor-pointer">
                <div className="absolute top-0 right-0 p-10 opacity-[0.05] transition-transform duration-1000 group-hover:scale-125 rotate-12"><GitBranch size={160} /></div>
                <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-6 flex items-center gap-3 text-agro-400">
                  <Sparkles size={16} fill="currentColor" /> Strategic Intelligence
                </h4>
                <p className="text-sm text-agro-100 leading-relaxed relative z-10 font-medium italic mb-6">
                  &quot;Increasing Biochar integration in the Central Valley sector could amplify your annual EAC yield by 22%.&quot;
                </p>
                <button className="relative z-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] bg-white/10 hover:bg-white/20 px-5 py-3 rounded-xl transition-all">
                  Analyze Scenarios <ArrowRight size={14} />
                </button>
            </div>

            <VerificationProtocol />
            <AuditSidebar />
            
            <div className="bg-earth-50 dark:bg-earth-900/50 p-6 rounded-[2rem] border border-earth-100 dark:border-earth-800">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-earth-500 mb-4 flex items-center gap-2">
                 <Target size={14} /> Regional Goals
               </h4>
               <div className="space-y-4">
                  {[
                    { label: 'Local Carbon Sink', progress: 65, color: 'bg-blue-500' },
                    { label: 'Soil Organic Matter', progress: 42, color: 'bg-agro-600' },
                    { label: 'Water Retention', progress: 88, color: 'bg-cyan-500' }
                  ].map((goal, i) => (
                    <div key={i}>
                       <div className="flex justify-between mb-1.5">
                          <span className="text-[10px] font-bold text-earth-700 dark:text-earth-300">{goal.label}</span>
                          <span className="text-[10px] font-mono font-bold text-earth-500">{goal.progress}%</span>
                       </div>
                       <div className="h-1.5 bg-earth-200 dark:bg-earth-800 rounded-full overflow-hidden">
                          <div className={`h-full ${goal.color} rounded-full`} style={{ width: `${goal.progress}%` }}></div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedTx && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-earth-950/80 backdrop-blur-md"
                onClick={() => setSelectedTx(null)}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="bg-white dark:bg-earth-900 w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        onClick={() => setSelectedTx(null)}
                        className="absolute top-6 right-6 p-2 bg-earth-50 dark:bg-earth-800 rounded-full hover:bg-earth-100 transition-all"
                    >
                        <X size={24} />
                    </button>

                    <div className="bg-agro-600 p-10 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Database size={200} /></div>
                        <div className="relative z-10">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-agro-200 mb-4 block">Transaction Verified</span>
                            <h2 className="text-4xl font-serif font-black">{selectedTx.id}</h2>
                            <p className="text-agro-100 mt-2 font-medium">{selectedTx.date}</p>
                        </div>
                    </div>

                    <div className="p-10 space-y-8">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <span className="text-[10px] font-black uppercase text-earth-400 block mb-1">Project Node</span>
                                <p className="text-lg font-bold text-earth-900 dark:text-white">{selectedTx.project}</p>
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase text-earth-400 block mb-1">Verification Method</span>
                                <p className="text-lg font-bold text-earth-900 dark:text-white">{selectedTx.method}</p>
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase text-earth-400 block mb-1">Sequestered Amount</span>
                                <p className="text-lg font-black text-agro-600">{selectedTx.amount}</p>
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase text-earth-400 block mb-1">EAC Generated</span>
                                <p className="text-lg font-black text-blue-600">{selectedTx.eac}</p>
                            </div>
                        </div>

                        <div className="p-6 bg-earth-50 dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-700">
                             <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-black uppercase text-earth-400">Ledger Hash</span>
                                <span className="text-[10px] font-mono font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded">SECURE_CHAIN_V4</span>
                             </div>
                             <p className="text-xs font-mono text-earth-600 dark:text-earth-400 break-all bg-white dark:bg-earth-950 p-4 rounded-xl border border-earth-100 dark:border-earth-800 shadow-inner">
                                {selectedTx.hash}7d2e9f1a8c4b0d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0
                             </p>
                        </div>

                        <div className="flex gap-4">
                           <button className="flex-1 flex items-center justify-center gap-3 bg-earth-900 dark:bg-white text-white dark:text-earth-900 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                              <Download size={18} /> Export Certificate
                           </button>
                           <button className="p-4 bg-earth-50 dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-700 text-earth-400 hover:text-agro-600 transition-all">
                              <Share2 size={20} />
                           </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {showMintModal && (
        <MintModal
          setShowMintModal={setShowMintModal}
          mintStatus={mintStatus}
          setMintStatus={setMintStatus}
          mintAmount={mintAmount}
          setMintAmount={setMintAmount}
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
          projects={INITIAL_PROJECTS}
          steps={steps}
          processingStep={processingStep}
          handleMint={handleMint}
          MINT_RATE={MINT_RATE}
          user={user}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
};
