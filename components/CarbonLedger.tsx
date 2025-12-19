import React, { useState, useMemo } from 'react';
import { 
  Leaf, TrendingUp, History, Download, Plus, Zap, Award, Globe, ShieldCheck, ChevronRight,
  X, Loader2, CheckCircle2, Sparkles, AlertCircle, Database, ArrowUpRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
// Fix for line 355: Added View to imports
import { User, View } from '../types';

const OFFSETS_DATA = [
  { month: 'Jan', tons: 1.2 },
  { month: 'Feb', tons: 2.1 },
  { month: 'Mar', tons: 1.8 },
  { month: 'Apr', tons: 3.5 },
  { month: 'May', tons: 4.2 },
  { month: 'Jun', tons: 5.8 },
];

const INITIAL_PROJECTS = [
  { id: 1, name: 'Kiriaini Reforestation', type: 'Afforestation', status: 'Active', credits: 450, impact: 'High', availableTons: 8.5 },
  { id: 2, name: 'Central Valley Biochar', type: 'Soil Sequestration', status: 'Verifying', credits: 120, impact: 'Medium', availableTons: 3.2 },
  { id: 3, name: 'Eco-Corridor Alpha', type: 'Biodiversity', status: 'Active', credits: 300, impact: 'High', availableTons: 5.4 },
];

interface CarbonLedgerProps {
  user: User | null;
  onAwardEac?: (amount: number) => void;
  // Fix for line 355: Added missing onNavigate prop to interface
  onNavigate?: (view: View) => void;
}

// Fix for line 355: Destructured onNavigate from props
export const CarbonLedger: React.FC<CarbonLedgerProps> = ({ user, onAwardEac, onNavigate }) => {
  const [showMintModal, setShowMintModal] = useState(false);
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

    // Step through the verification process
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

  const selectedProject = INITIAL_PROJECTS.find(p => p.id === selectedProjectId);

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
                 {INITIAL_PROJECTS.map((project) => (
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
                             <p className="text-[10px] font-bold text-earth-400 uppercase mb-1">Available</p>
                             <span className="font-bold text-earth-900 dark:text-white">{project.availableTons} <span className="text-agro-600">Tons</span></span>
                          </div>
                          <div className="text-center">
                             <p className="text-[10px] font-bold text-earth-400 uppercase mb-1">Status</p>
                             <span className="text-xs font-bold text-earth-600 dark:text-earth-400">{project.status}</span>
                          </div>
                          <button onClick={() => { setSelectedProjectId(project.id); setShowMintModal(true); }} className="p-2 bg-agro-50 dark:bg-agro-900/30 text-agro-600 rounded-lg hover:bg-agro-600 hover:text-white transition-all">
                             <Zap size={18} fill="currentColor" />
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
                <button 
                  onClick={() => setShowMintModal(true)}
                  className="w-full bg-agro-500 hover:bg-agro-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
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

      {/* MINTING MODAL */}
      {showMintModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-950/80 backdrop-blur-md animate-in fade-in duration-300">
              <div className="bg-white dark:bg-earth-900 w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10">
                  <div className="bg-agro-900 p-8 text-white flex justify-between items-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><Zap size={100} /></div>
                      <div className="relative z-10">
                          <h3 className="text-2xl font-serif font-bold">Asset Minting Console</h3>
                          <p className="text-xs text-agro-300 font-bold uppercase tracking-widest mt-1">Biomass to Digital Capital Protocol</p>
                      </div>
                      <button 
                        onClick={() => { setShowMintModal(false); setMintStatus('IDLE'); }} 
                        className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
                      >
                          <X size={24} />
                      </button>
                  </div>

                  <div className="p-10">
                      {mintStatus === 'IDLE' && (
                          <div className="space-y-8">
                              <div className="space-y-4">
                                  <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest block px-1">Select Verified Source</label>
                                  <div className="grid gap-3">
                                      {INITIAL_PROJECTS.map(p => (
                                          <button 
                                            key={p.id}
                                            onClick={() => setSelectedProjectId(p.id)}
                                            className={`p-4 rounded-2xl border-2 text-left transition-all flex justify-between items-center ${selectedProjectId === p.id ? 'bg-agro-50 dark:bg-agro-950/30 border-agro-500 shadow-lg' : 'bg-white dark:bg-earth-800 border-earth-100 dark:border-earth-800 opacity-60'}`}
                                          >
                                              <div>
                                                  <h4 className="font-bold text-sm text-earth-900 dark:text-white">{p.name}</h4>
                                                  <p className="text-[10px] text-earth-500 font-bold uppercase tracking-tighter">{p.type} • {p.availableTons} Tons Available</p>
                                              </div>
                                              {selectedProjectId === p.id && <CheckCircle2 size={18} className="text-agro-600" />}
                                          </button>
                                      ))}
                                  </div>
                              </div>

                              <div className="space-y-4">
                                  <div className="flex justify-between items-end px-1">
                                      <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest">Tons to Convert</label>
                                      <span className="text-xs font-bold text-agro-600">Max: {selectedProject?.availableTons}</span>
                                  </div>
                                  <div className="relative">
                                      <input 
                                        type="number" 
                                        value={mintAmount}
                                        onChange={(e) => setMintAmount(e.target.value)}
                                        max={selectedProject?.availableTons}
                                        className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-earth-100 dark:border-earth-700 rounded-2xl p-6 text-3xl font-mono font-black text-center focus:outline-none focus:border-agro-500 transition-all dark:text-white"
                                      />
                                      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-earth-300 font-bold">TONS</div>
                                  </div>
                              </div>

                              <div className="bg-earth-50 dark:bg-earth-800/50 p-6 rounded-2xl border border-earth-100 dark:border-earth-800 flex items-center justify-between">
                                  <div>
                                      <p className="text-[10px] font-black text-earth-400 uppercase tracking-widest mb-1">EAC Value to Mint</p>
                                      <p className="text-3xl font-serif font-bold text-agro-700 dark:text-agro-400">
                                          {(parseFloat(mintAmount || '0') * MINT_RATE).toFixed(0)} <span className="text-sm font-sans font-black text-earth-400">EAC</span>
                                      </p>
                                  </div>
                                  <Sparkles size={32} className="text-amber-400 opacity-40" />
                              </div>

                              <button 
                                onClick={handleMint}
                                disabled={!mintAmount || parseFloat(mintAmount) <= 0 || parseFloat(mintAmount) > (selectedProject?.availableTons || 0)}
                                className="w-full bg-agro-600 hover:bg-agro-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-agro-600/20 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0 text-sm tracking-widest uppercase"
                              >
                                  INITIALIZE MINTING SEQUENCE
                              </button>
                          </div>
                      )}

                      {mintStatus === 'PROCESSING' && (
                          <div className="py-12 flex flex-col items-center text-center space-y-10">
                              <div className="relative">
                                  <div className="w-32 h-32 rounded-full border-4 border-agro-100 dark:border-earth-800 border-t-agro-600 animate-spin"></div>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                      <Database size={40} className="text-agro-600 animate-pulse" />
                                  </div>
                              </div>
                              
                              <div className="space-y-4">
                                  <h4 className="text-2xl font-serif font-bold text-earth-900 dark:text-white">Minting in Progress</h4>
                                  <p className="text-earth-500 font-mono text-xs uppercase tracking-widest animate-pulse">
                                      {steps[processingStep]}
                                  </p>
                              </div>

                              <div className="w-full max-w-xs space-y-2">
                                  <div className="flex justify-between text-[10px] font-black text-earth-400 uppercase tracking-widest">
                                      <span>Sequence Progress</span>
                                      <span>{((processingStep + 1) / steps.length * 100).toFixed(0)}%</span>
                                  </div>
                                  <div className="w-full h-1.5 bg-earth-100 dark:bg-earth-800 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-agro-600 transition-all duration-700"
                                        style={{ width: `${(processingStep + 1) / steps.length * 100}%` }}
                                      ></div>
                                  </div>
                              </div>
                          </div>
                      )}

                      {mintStatus === 'SUCCESS' && (
                          <div className="py-12 text-center animate-in zoom-in duration-500">
                              <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-green-600 dark:text-green-400 shadow-inner">
                                  <CheckCircle2 size={56} />
                              </div>
                              <h3 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-4 tracking-tight">Minting Successful</h3>
                              <p className="text-earth-600 dark:text-earth-400 mb-10 max-w-xs mx-auto leading-relaxed">
                                  Verified biomass assets have been successfully converted and deployed to your ESIN wallet.
                              </p>
                              
                              <div className="bg-agro-50 dark:bg-agro-900/30 p-8 rounded-[2.5rem] border border-agro-100 dark:border-agro-800 inline-block min-w-[280px] shadow-sm">
                                  <p className="text-[10px] font-black text-agro-600 dark:text-agro-400 uppercase tracking-widest mb-2">New Portfolio Balance</p>
                                  <p className="text-5xl font-serif font-bold text-agro-900 dark:text-white">
                                      {user?.eacBalance} <span className="text-xl font-sans font-black opacity-40">EAC</span>
                                  </p>
                              </div>

                              <div className="mt-12 flex gap-4">
                                  <button 
                                    onClick={() => setShowMintModal(false)}
                                    className="flex-1 bg-white dark:bg-earth-800 border-2 border-earth-100 dark:border-earth-700 text-earth-600 dark:text-earth-300 font-black py-4 rounded-2xl hover:bg-earth-50 transition-all text-xs uppercase tracking-widest"
                                  >
                                      Close
                                  </button>
                                  <button 
                                    onClick={() => { setShowMintModal(false); onNavigate?.(View.FINANCE); }}
                                    className="flex-1 bg-agro-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-agro-600/20 hover:bg-agro-700 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                                  >
                                      Go to Finance <ArrowUpRight size={16} />
                                  </button>
                              </div>
                          </div>
                      )}
                  </div>

                  <div className="p-8 bg-earth-50 dark:bg-earth-800/30 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-center gap-2">
                      <ShieldCheck size={16} className="text-blue-500" />
                      <p className="text-[10px] text-earth-400 dark:text-earth-600 font-black uppercase tracking-[0.4em]">Audit Trail Logged to Network Node EA-SYNC-8</p>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};