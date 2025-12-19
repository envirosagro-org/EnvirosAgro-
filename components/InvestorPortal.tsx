import React, { useState, useMemo, useEffect } from 'react';
/* Added missing Cpu and Factory icon imports */
import { 
  TrendingUp, PieChart, ArrowUpRight, ArrowRight, DollarSign, Leaf, Globe, 
  ShieldCheck, Download, Plus, Coins, CreditCard, X, Smartphone, Loader2, 
  CheckCircle2, ArrowDownLeft, Clock, Activity, Trash2, BarChart3, Target, 
  Shield, Filter, Search, Zap, Info, Briefcase, ChevronRight, Cpu, Factory,
  Lock, ShieldAlert, FileCheck, Server, QrCode, Layers, History, RefreshCcw,
  FileText, ExternalLink
} from 'lucide-react';
import { PieChart as RePie, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { View } from '../types';

interface InvestorPortalProps {
  onNavigate?: (view: View) => void;
}

const OPPORTUNITIES = [
  {
    id: 'op1',
    title: "Kiriaini Carbon Seq Bond",
    thrust: "EA",
    thrustName: "Environmental",
    target: "$500,000",
    raised: 425000,
    yield: "5.5% p.a.",
    minInvest: 1000,
    risk: "Low",
    daysLeft: 12,
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 'op2',
    title: "Youth Ag-Tech Accelerator",
    thrust: "TA",
    thrustName: "Technical",
    target: "$250,000",
    raised: 85000,
    yield: "8.2% (Est)",
    minInvest: 5000,
    risk: "High",
    daysLeft: 4,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 'op3',
    title: "Regional Cold-Chain Link",
    thrust: "IA",
    target: "$1.2M",
    raised: 600000,
    thrustName: "Industrial",
    yield: "4.8% p.a.",
    minInvest: 10000,
    risk: "Medium",
    daysLeft: 28,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=60"
  }
];

export const InvestorPortal: React.FC<InvestorPortalProps> = ({ onNavigate }) => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [showRebalanceModal, setShowRebalanceModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  
  const [selectedOpportunity, setSelectedOpportunity] = useState<typeof OPPORTUNITIES[0] | null>(null);
  const [depositMethod, setDepositMethod] = useState<'TOKENZ' | 'FIAT'>('TOKENZ');
  const [riskFilter, setRiskFilter] = useState('All');
  
  // Portfolio State
  const [portfolioValue, setPortfolioValue] = useState(12450.00);
  const [totalImpact, setTotalImpact] = useState(28.4);
  const [allocations, setAllocations] = useState({
    bonds: 45,
    equity: 35,
    carbon: 20
  });
  
  // Insurance Verification State
  const [insuranceStatus, setInsuranceStatus] = useState<'IDLE' | 'VERIFYING' | 'VERIFIED'>('IDLE');
  const [verificationStep, setVerificationStep] = useState(0);

  // Deployment State
  const [deploymentStatus, setDeploymentStatus] = useState<'IDLE' | 'DEPLOYING' | 'SUCCESS'>('IDLE');
  const [deployAmount, setDeployAmount] = useState('');
  const [deployStep, setDeployStep] = useState(0);

  // Rebalance State
  const [rebalanceStatus, setRebalanceStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');
  const [tempAllocations, setTempAllocations] = useState({ ...allocations });

  const verificationSteps = [
    "Establishing Secure Node Handshake...",
    "Validating Biological Audit Trail...",
    "Syncing with Global Liquidity Reserve...",
    "Verifying m(t) Asset Backing..."
  ];

  const deploymentSteps = [
    "Initializing Asset Lock Protocol...",
    "Syncing Yield Benchmarks...",
    "Validating m(t) Resilience Delta...",
    "Finalizing Node Entry..."
  ];

  const rebalanceSteps = [
    "Calculating Spread Delta...",
    "Executing Liquidity Swap...",
    "Updating Smart Contract Benchmarks...",
    "Re-calibrating Portfolio Weighting..."
  ];

  // Transaction History State
  const [transactions, setTransactions] = useState<any[]>([
    {
      id: 1,
      type: 'Yield Payment',
      amount: 142.50,
      method: 'Carbon Bond G2',
      date: 'May 01, 10:24 AM',
      currency: 'USD',
      status: 'Received'
    },
    {
      id: 2,
      type: 'Asset Purchase',
      amount: -2500.00,
      method: 'Eco-Reforest Fund',
      date: 'Apr 15, 02:45 PM',
      currency: 'USD',
      status: 'Completed'
    },
    {
      id: 3,
      type: 'Deposit',
      amount: 5000.00,
      method: 'Bank Transfer',
      date: 'Apr 02, 09:12 AM',
      currency: 'USD',
      status: 'Completed'
    }
  ]);
  
  // Deposit State
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'MOBILE'>('CARD');
  const [depositStatus, setDepositStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');

  const filteredOpportunities = useMemo(() => {
    if (riskFilter === 'All') return OPPORTUNITIES;
    return OPPORTUNITIES.filter(op => op.risk === riskFilter);
  }, [riskFilter]);

  const handleDeposit = () => {
      const val = parseFloat(amount);
      if (!amount || isNaN(val) || val <= 0) {
          alert("Please enter a valid amount.");
          return;
      }

      setDepositStatus('PROCESSING');

      setTimeout(() => {
          const newVal = portfolioValue + val;
          setPortfolioValue(newVal);
          setTotalImpact(prev => prev + (val * 0.005)); 
          
          let methodLabel = paymentMethod === 'CARD' ? 'EnvirosAgro Visa' : 'Mobile Money';
          if (depositMethod === 'TOKENZ') methodLabel = 'Tokenz Wallet';

          const newTransaction = {
              id: Date.now(),
              type: 'Deposit',
              amount: val,
              method: methodLabel,
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
              currency: depositMethod === 'TOKENZ' ? 'TKZ' : 'USD',
              status: 'Completed'
          };
          
          setTransactions(prev => [newTransaction, ...prev]);
          setDepositStatus('SUCCESS');

          setTimeout(() => {
              setShowDepositModal(false);
              setDepositStatus('IDLE');
              setAmount('');
          }, 2000);
      }, 2000);
  };

  const handleVerifyInsurance = () => {
    setInsuranceStatus('VERIFYING');
    setVerificationStep(0);
    
    const interval = setInterval(() => {
        setVerificationStep(prev => {
            if (prev >= verificationSteps.length - 1) {
                clearInterval(interval);
                return prev;
            }
            return prev + 1;
        });
    }, 1200);

    setTimeout(() => {
        setInsuranceStatus('VERIFIED');
    }, 5500);
  };

  const handleDeployAssets = () => {
    const val = parseFloat(deployAmount);
    if (!selectedOpportunity || isNaN(val) || val < selectedOpportunity.minInvest) {
        alert(`Minimum investment for this project is $${selectedOpportunity?.minInvest.toLocaleString()}`);
        return;
    }
    if (val > portfolioValue) {
        alert("Insufficient portfolio balance. Please add capital first.");
        return;
    }

    setDeploymentStatus('DEPLOYING');
    setDeployStep(0);

    const interval = setInterval(() => {
        setDeployStep(prev => {
            if (prev >= deploymentSteps.length - 1) {
                clearInterval(interval);
                return prev;
            }
            return prev + 1;
        });
    }, 1200);

    setTimeout(() => {
        const impactGain = val * 0.0012; 
        setTotalImpact(prev => prev + impactGain);
        
        const newTransaction = {
            id: Date.now(),
            type: 'Asset Deployment',
            amount: -val,
            method: selectedOpportunity.title,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            currency: 'USD',
            status: 'Completed'
        };
        
        setTransactions(prev => [newTransaction, ...prev]);
        setDeploymentStatus('SUCCESS');
    }, 5500);
  };

  const handleRebalance = () => {
    const total = tempAllocations.bonds + tempAllocations.equity + tempAllocations.carbon;
    if (total !== 100) {
        alert("Allocations must sum exactly to 100%. Current total: " + total + "%");
        return;
    }

    setRebalanceStatus('PROCESSING');
    setVerificationStep(0);

    const interval = setInterval(() => {
        setVerificationStep(prev => {
            if (prev >= rebalanceSteps.length - 1) {
                clearInterval(interval);
                return prev;
            }
            return prev + 1;
        });
    }, 1000);

    setTimeout(() => {
        setAllocations({ ...tempAllocations });
        setRebalanceStatus('SUCCESS');
        
        const newTransaction = {
            id: Date.now(),
            type: 'Portfolio Rebalance',
            amount: 0,
            method: 'Network Allocation Sync',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            currency: 'USD',
            status: 'Optimized'
        };
        setTransactions(prev => [newTransaction, ...prev]);
    }, 4500);
  };

  const handleReset = () => {
      if (confirm("Are you sure you want to clear your portfolio data?")) {
          setPortfolioValue(0);
          setTotalImpact(0);
          setTransactions([]);
      }
  };

  const pieData = [
    { name: 'Regenerative Bonds', value: portfolioValue * (allocations.bonds / 100), fill: '#16a34a' },
    { name: 'Ag-Tech Equity', value: portfolioValue * (allocations.equity / 100), fill: '#3b82f6' },
    { name: 'Carbon Credits', value: portfolioValue * (allocations.carbon / 100), fill: '#9333ea' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative animate-in fade-in duration-1000">
      
      {/* Header & Global Stats */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-16 gap-8">
        <div className="max-w-3xl">
           <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              <ShieldCheck size={14} /> Official Investor Portal v2.4
           </div>
           <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.1]">
              Capital for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-agro-600 to-blue-600 dark:from-agro-400 dark:to-blue-400 italic">Global Resilience</span>
           </h1>
           <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
             Deploying impact capital across high-integrity agricultural projects. Every investment is benchmarked against the **m(t)** Sustainability Constant.
           </p>
        </div>
        
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none bg-white dark:bg-earth-800 border border-earth-200 dark:border-earth-700 text-earth-700 dark:text-earth-300 px-8 py-4 rounded-[2rem] font-black uppercase text-[10px] tracking-widest hover:bg-earth-50 dark:hover:bg-earth-700 transition-all flex items-center justify-center gap-3 shadow-sm">
                <Download size={18} /> Financials
            </button>
            <button 
                onClick={() => setShowDepositModal(true)}
                className="flex-1 md:flex-none bg-blue-600 text-white px-10 py-4 rounded-[2rem] font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/20 active:scale-95"
            >
                <Plus size={20} /> Add Capital
            </button>
        </div>
      </div>

      {/* Portfolio Main Section */}
      <div className="grid lg:grid-cols-12 gap-8 mb-20">
         
         {/* Left Side: Summary & Chart */}
         <div className="lg:col-span-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Portfolio Value Card */}
                <div className="bg-white dark:bg-earth-900 p-10 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                        <DollarSign size={200} className="text-blue-600" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-earth-400">Total Asset Value</span>
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-600">
                                <Activity size={18} />
                            </div>
                        </div>
                        <div className="text-6xl font-serif font-bold text-slate-900 dark:text-white mb-4">
                            ${portfolioValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-[10px] font-black">
                                <TrendingUp size={12} /> +4.24%
                            </span>
                            <span className="text-[10px] font-bold text-earth-300 uppercase tracking-widest">Growth (Q2)</span>
                        </div>
                    </div>
                </div>

                {/* Impact Card */}
                <div className="bg-agro-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                        <Leaf size={250} />
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-agro-300 mb-8 block">Verified Impact (m)</span>
                            <div className="text-6xl font-serif font-bold mb-4">{totalImpact.toFixed(1)} <span className="text-xl font-sans font-black opacity-40 uppercase tracking-tighter">Tons</span></div>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-black text-agro-400 uppercase tracking-widest">CO2 Sequestration</p>
                                <p className="text-sm font-bold text-agro-100">Gold Standard Verified</p>
                            </div>
                            <button onClick={() => onNavigate?.(View.CARBON_LEDGER)} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 transition-all">
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Asset Allocation & Detailed Breakdown */}
            <div className="bg-white dark:bg-earth-900 p-10 rounded-[3.5rem] border border-earth-100 dark:border-earth-800 shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-64 h-64 relative shrink-0">
                         <ResponsiveContainer width="100%" height="100%">
                            <RePie>
                                <Pie 
                                    data={pieData} 
                                    dataKey="value" 
                                    nameKey="name" 
                                    cx="50%" 
                                    cy="50%" 
                                    innerRadius={75} 
                                    outerRadius={100} 
                                    paddingAngle={8}
                                    stroke="none"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} className="hover:opacity-80 transition-opacity cursor-pointer outline-none" />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.95)', padding: '20px' }}
                                    itemStyle={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '10px' }}
                                />
                            </RePie>
                         </ResponsiveContainer>
                         <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                             <span className="text-[10px] text-earth-400 font-black uppercase tracking-[0.3em] mb-1">Status</span>
                             <span className="text-2xl font-black text-agro-600 dark:text-agro-400">HEALTHY</span>
                         </div>
                    </div>
                    
                    <div className="flex-1 w-full">
                        <div className="flex justify-between items-end mb-8">
                            <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">Asset Mix</h3>
                            <button 
                                onClick={() => { setTempAllocations({ ...allocations }); setShowRebalanceModal(true); }}
                                className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-2"
                            >
                                Rebalance Portfolio <ChevronRight size={14} />
                            </button>
                        </div>
                        <div className="grid gap-4">
                            {pieData.map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-earth-50 dark:bg-earth-800/50 rounded-2xl border border-transparent hover:border-earth-200 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-3 h-10 rounded-full" style={{backgroundColor: item.fill}}></div>
                                        <div>
                                            <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">{item.name}</span>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <div className="w-1 h-1 bg-earth-300 rounded-full"></div>
                                                <span className="text-[10px] text-earth-400 font-bold uppercase tracking-widest">Allocation: {Math.round((item.value/portfolioValue)*100)}%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-lg font-bold text-slate-900 dark:text-white block font-mono">${item.value.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
         </div>

         {/* Right Side: Ledger & Activity */}
         <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-white dark:bg-earth-900 p-8 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm flex-1 flex flex-col min-h-0">
                <div className="flex justify-between items-center mb-8 shrink-0">
                    <h3 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-3">
                        <BarChart3 size={24} className="text-blue-600" /> Transaction Ledger
                    </h3>
                    {portfolioValue > 0 && (
                        <button onClick={handleReset} className="text-earth-300 hover:text-red-500 transition-colors" title="Clear History">
                            <Trash2 size={18} />
                        </button>
                    )}
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                    {transactions.length > 0 ? (
                        transactions.slice(0, 5).map((tx) => (
                            <div key={tx.id} className="p-4 bg-earth-50/50 dark:bg-earth-800/30 rounded-2xl border border-transparent hover:border-earth-100 dark:hover:border-earth-700 transition-all flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl shadow-sm ${tx.amount > 0 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {tx.amount > 0 ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{tx.type}</h4>
                                        <p className="text-[10px] text-earth-400 font-bold uppercase tracking-tight mt-0.5">{tx.method}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-sm font-black font-mono ${tx.amount > 0 ? 'text-green-600' : 'text-slate-900 dark:text-white'}`}>
                                        {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                                    </p>
                                    <p className="text-[9px] text-earth-400 font-bold uppercase tracking-tighter mt-0.5">{tx.date}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center px-10">
                            <Activity size={48} className="text-earth-200 dark:text-earth-800 mb-4 opacity-30" />
                            <p className="text-sm font-bold text-earth-400">No recent entries found in the synchronized ledger.</p>
                        </div>
                    )}
                </div>
                
                <div className="mt-8 pt-6 border-t border-earth-100 dark:border-earth-800 flex justify-between items-center shrink-0">
                    <div className="text-left">
                        <span className="text-[9px] font-black text-earth-300 uppercase tracking-widest block mb-1">Network Integrity</span>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 size={12} className="text-agro-600" />
                            <span className="text-[10px] font-bold text-agro-600 uppercase tracking-wider">Node Sync: 100%</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => setShowArchiveModal(true)}
                        className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] hover:underline"
                    >
                        Full Archive
                    </button>
                </div>
            </div>
            
            <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                    <ShieldCheck size={120} />
                </div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-serif font-bold mb-4">Capital Insurance</h3>
                    <p className="text-blue-200 text-sm leading-relaxed mb-10 font-medium">
                        All impact deployments are protected by our liquidity reserve and verified via third-party biological audit.
                    </p>
                    <button 
                        onClick={() => setShowInsuranceModal(true)}
                        className="w-full py-4 bg-white text-blue-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl active:scale-95"
                    >
                        Verify Coverage
                    </button>
                </div>
            </div>
         </div>
      </div>

      {/* REBALANCE MODAL */}
      {showRebalanceModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
              <div className="bg-white dark:bg-earth-900 w-full max-w-xl rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10">
                  <div className="bg-blue-600 p-10 text-white flex justify-between items-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><RefreshCcw size={150} /></div>
                      <div className="relative z-10">
                          <h3 className="text-3xl font-serif font-bold">Rebalancing Engine</h3>
                          <p className="text-xs text-blue-200 font-bold uppercase tracking-[0.3em] mt-2">Dynamic Asset Allocation Sync</p>
                      </div>
                      <button 
                          onClick={() => { setShowRebalanceModal(false); setRebalanceStatus('IDLE'); }} 
                          className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-all hover:rotate-90 active:scale-90"
                      >
                          <X size={28} />
                      </button>
                  </div>

                  <div className="p-12">
                      {rebalanceStatus === 'IDLE' && (
                          <div className="space-y-8">
                              <p className="text-earth-500 dark:text-earth-400 text-center mb-6">Adjust your portfolio weightings. Total must equal 100%.</p>
                              
                              <div className="space-y-8">
                                  {Object.entries(tempAllocations).map(([key, val]) => (
                                      <div key={key} className="space-y-3">
                                          <div className="flex justify-between items-center px-1">
                                              <span className="text-xs font-black uppercase text-earth-400 tracking-widest">
                                                  {key === 'bonds' ? 'Regenerative Bonds' : key === 'equity' ? 'Ag-Tech Equity' : 'Carbon Credits'}
                                              </span>
                                              <span className="font-mono font-bold text-blue-600">{val}%</span>
                                          </div>
                                          <input 
                                              type="range" min="0" max="100" step="5"
                                              value={val}
                                              onChange={(e) => setTempAllocations({ ...tempAllocations, [key]: parseInt(e.target.value) })}
                                              className="w-full accent-blue-600 h-2 bg-earth-100 dark:bg-earth-800 rounded-full appearance-none cursor-pointer"
                                          />
                                      </div>
                                  ))}
                              </div>

                              <div className={`p-6 rounded-[2rem] border-2 text-center transition-all ${tempAllocations.bonds + tempAllocations.equity + tempAllocations.carbon === 100 ? 'bg-agro-50 border-agro-200 text-agro-700' : 'bg-red-50 border-red-200 text-red-600'}`}>
                                  <span className="text-[10px] font-black uppercase tracking-widest">Calculated Total</span>
                                  <div className="text-3xl font-black font-mono">{tempAllocations.bonds + tempAllocations.equity + tempAllocations.carbon}%</div>
                              </div>

                              <button 
                                  onClick={handleRebalance}
                                  className="w-full nature-gradient text-white font-black py-6 rounded-3xl shadow-xl shadow-agro-900/20 hover:scale-[1.01] active:scale-95 transition-all text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-50"
                              >
                                  <RefreshCcw size={20} /> Execute Rebalance
                              </button>
                          </div>
                      )}

                      {rebalanceStatus === 'PROCESSING' && (
                          <div className="py-12 flex flex-col items-center text-center space-y-12">
                              <div className="relative">
                                  <div className="w-40 h-40 rounded-full border-[6px] border-blue-50 dark:border-earth-800 border-t-blue-600 animate-spin"></div>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                      <Layers size={48} className="text-blue-600 animate-pulse" />
                                  </div>
                              </div>
                              <div className="space-y-4">
                                  <h4 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">Synchronizing Node</h4>
                                  <p className="text-slate-500 dark:text-slate-400 font-mono text-sm uppercase tracking-widest animate-pulse">
                                      {rebalanceSteps[verificationStep]}
                                  </p>
                              </div>
                          </div>
                      )}

                      {rebalanceStatus === 'SUCCESS' && (
                          <div className="py-8 space-y-10 animate-in zoom-in duration-500 text-center">
                              <div className="w-28 h-28 bg-green-50 dark:bg-agro-900/30 rounded-[3rem] flex items-center justify-center mx-auto mb-8 text-agro-600 dark:text-agro-400 shadow-inner ring-8 ring-green-50 dark:ring-agro-950">
                                  <CheckCircle2 size={64} className="animate-bounce" />
                              </div>
                              <h3 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Portfolio Rebalanced</h3>
                              <p className="text-earth-500 dark:text-earth-400 mb-10">New smart contract weights have been propagated to the network.</p>
                              <button 
                                  onClick={() => { setShowRebalanceModal(false); setRebalanceStatus('IDLE'); }}
                                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black py-5 rounded-2xl hover:bg-slate-800 transition-all text-xs uppercase tracking-widest shadow-xl"
                              >
                                  Done
                              </button>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      )}

      {/* FULL ARCHIVE MODAL */}
      {showArchiveModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
              <div className="bg-white dark:bg-earth-900 w-full max-w-4xl rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10 flex flex-col max-h-[90vh]">
                  <div className="bg-slate-900 p-10 text-white flex justify-between items-center shrink-0">
                      <div className="flex items-center gap-5">
                          <div className="bg-white/10 p-3 rounded-2xl text-blue-400">
                             <History size={32} />
                          </div>
                          <div>
                            <h3 className="text-3xl font-serif font-bold">Asset Ledger Archive</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.3em] mt-1">Unified Financial History v4.0</p>
                          </div>
                      </div>
                      <button 
                          onClick={() => setShowArchiveModal(false)} 
                          className="p-2 hover:bg-white/10 rounded-full transition-all hover:rotate-90 active:scale-90"
                      >
                          <X size={28} />
                      </button>
                  </div>

                  <div className="p-10 flex-1 overflow-y-auto custom-scrollbar">
                      <div className="flex flex-wrap gap-4 mb-10">
                          <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-bold text-xs uppercase tracking-widest shadow-lg">All Activity</button>
                          <button className="px-6 py-2 rounded-full bg-earth-50 dark:bg-earth-800 text-earth-500 font-bold text-xs uppercase tracking-widest hover:bg-earth-100 transition-all">Deposits</button>
                          <button className="px-6 py-2 rounded-full bg-earth-50 dark:bg-earth-800 text-earth-500 font-bold text-xs uppercase tracking-widest hover:bg-earth-100 transition-all">Deployments</button>
                          <button className="px-6 py-2 rounded-full bg-earth-50 dark:bg-earth-800 text-earth-500 font-bold text-xs uppercase tracking-widest hover:bg-earth-100 transition-all">Yields</button>
                          <button className="ml-auto flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest hover:underline">
                              <Download size={14} /> Export full CSV
                          </button>
                      </div>

                      <div className="space-y-4">
                          {transactions.length > 0 ? (
                              transactions.map((tx) => (
                                  <div key={tx.id} className="p-6 bg-earth-50/50 dark:bg-earth-800/30 rounded-3xl border border-transparent hover:border-earth-100 dark:hover:border-earth-700 transition-all flex items-center justify-between group">
                                      <div className="flex items-center gap-6">
                                          <div className={`p-4 rounded-2xl shadow-sm ${tx.amount > 0 ? 'bg-green-100 text-green-700' : tx.amount < 0 ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                                              {tx.amount > 0 ? <ArrowDownLeft size={24} /> : tx.amount < 0 ? <ArrowUpRight size={24} /> : <RefreshCcw size={24} />}
                                          </div>
                                          <div>
                                              <h4 className="font-bold text-lg text-slate-900 dark:text-white leading-none mb-2">{tx.type}</h4>
                                              <div className="flex items-center gap-4">
                                                  <span className="text-xs font-black text-earth-400 uppercase tracking-widest">{tx.method}</span>
                                                  <span className="w-1 h-1 bg-earth-300 rounded-full"></span>
                                                  <span className="text-xs text-earth-400 font-bold uppercase">{tx.date}</span>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="text-right">
                                          <p className={`text-xl font-black font-mono ${tx.amount > 0 ? 'text-green-600' : tx.amount < 0 ? 'text-slate-900 dark:text-white' : 'text-purple-600'}`}>
                                              {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} <span className="text-xs font-sans opacity-40">{tx.currency}</span>
                                          </p>
                                          <span className="text-[10px] font-black uppercase text-agro-600 tracking-widest">Verified</span>
                                      </div>
                                  </div>
                              ))
                          ) : (
                              <div className="py-20 text-center">
                                  <History size={48} className="mx-auto text-earth-200 mb-4 opacity-20" />
                                  <p className="text-earth-400 font-bold uppercase tracking-widest">Archive Empty</p>
                              </div>
                          )}
                      </div>
                  </div>

                  <div className="p-8 bg-earth-50 dark:bg-earth-950/50 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-center gap-3 shrink-0">
                      <ShieldAlert size={18} className="text-blue-600" />
                      <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Audit Trail Sync ID: EA-ARC-99-ALPHA</p>
                  </div>
              </div>
          </div>
      )}

      {/* Vetted Opportunities Section */}
      <div className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
              <div>
                  <h2 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-2">Vetted Opportunities</h2>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Standardized project pipelines ready for capitalization.</p>
              </div>
              
              <div className="flex items-center gap-4 bg-earth-100 dark:bg-earth-900 p-1.5 rounded-2xl border border-earth-200 dark:border-earth-800">
                  <div className="flex px-2 text-[10px] font-black text-earth-400 uppercase tracking-widest border-r border-earth-200 dark:border-earth-800 mr-2 items-center gap-2">
                    <Filter size={12} /> Risk Level:
                  </div>
                  {['All', 'Low', 'Medium', 'High'].map(level => (
                      <button 
                        key={level}
                        onClick={() => setRiskFilter(level)}
                        className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${riskFilter === level ? 'bg-white dark:bg-earth-700 text-blue-600 dark:text-blue-300 shadow-sm' : 'text-earth-400 hover:text-earth-700 dark:hover:text-white'}`}
                      >
                        {level}
                      </button>
                  ))}
              </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredOpportunities.map((opp) => {
                  const percentRaised = Math.round((opp.raised / parseFloat(opp.target.replace('$', '').replace('M', '1000000').replace(',', ''))) * 100);
                  
                  return (
                    <div key={opp.id} className="bg-white dark:bg-earth-900 rounded-[3rem] overflow-hidden border border-earth-100 dark:border-earth-800 shadow-sm hover:shadow-2xl transition-all group flex flex-col relative">
                        <div className="h-56 overflow-hidden relative">
                            <img src={opp.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[4s]" alt={opp.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            
                            <div className="absolute top-6 left-6 flex gap-2">
                                <span className={`bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1.5 ${opp.risk === 'Low' ? 'text-green-600' : opp.risk === 'Medium' ? 'text-blue-600' : 'text-red-600'}`}>
                                    <Shield size={10} /> {opp.risk} Risk
                                </span>
                            </div>
                            
                            <div className="absolute bottom-6 left-6 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg border-2 border-white/20">
                                    {opp.thrust === 'EA' ? <Leaf size={14} /> : opp.thrust === 'TA' ? <Cpu size={14} /> : <Factory size={14} />}
                                </div>
                                <span className="text-[10px] font-black text-white uppercase tracking-widest drop-shadow-md">{opp.thrustName} Thrust</span>
                            </div>
                        </div>
                        
                        <div className="p-8 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <h4 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors pr-4">
                                    {opp.title}
                                </h4>
                                <div className="text-right shrink-0">
                                    <span className="text-2xl font-bold text-agro-700 dark:text-agro-400 font-serif block">{opp.yield}</span>
                                    <span className="text-[8px] font-black text-earth-400 uppercase tracking-widest">Est. Return</span>
                                </div>
                            </div>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-[10px] font-black text-earth-400 uppercase tracking-widest">
                                    <span>Funding Progress</span>
                                    <span className="text-slate-900 dark:text-white">{percentRaised}%</span>
                                </div>
                                <div className="w-full bg-earth-100 dark:bg-earth-800 h-2 rounded-full overflow-hidden">
                                    <div className="bg-blue-600 h-full transition-all duration-1000" style={{width: `${percentRaised}%`}}></div>
                                </div>
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <span className="text-slate-900 dark:text-white">${opp.raised.toLocaleString()}</span>
                                    <span className="text-earth-400">Target: {opp.target}</span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <div className="p-4 bg-earth-50 dark:bg-earth-800/50 rounded-2xl">
                                    <span className="text-[9px] font-black text-earth-400 uppercase tracking-widest block mb-1">Min. Commitment</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">${opp.minInvest.toLocaleString()}</span>
                                </div>
                                <div className="p-4 bg-earth-50 dark:bg-earth-800/50 rounded-2xl">
                                    <span className="text-[9px] font-black text-earth-400 uppercase tracking-widest block mb-1">Round Closes</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">{opp.daysLeft} Days</span>
                                </div>
                            </div>
                            
                            <div className="mt-auto pt-6 border-t border-earth-100 dark:border-earth-800 flex items-center justify-between">
                                <button className="flex items-center gap-2 text-[10px] font-black text-earth-400 hover:text-agro-600 transition-colors uppercase tracking-widest">
                                    <Info size={14} /> Full Prospectus
                                </button>
                                <button 
                                    onClick={() => { setSelectedOpportunity(opp); setDeployAmount(opp.minInvest.toString()); setShowDeployModal(true); }}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
                                >
                                    Deploy Assets
                                </button>
                            </div>
                        </div>
                    </div>
                  );
              })}
          </div>
      </div>

      {/* DEPLOY ASSETS MODAL */}
      {showDeployModal && selectedOpportunity && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
              <div className="bg-white dark:bg-earth-900 w-full max-w-2xl rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10">
                  <div className="bg-slate-900 p-10 text-white flex justify-between items-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><Zap size={150} /></div>
                      <div className="relative z-10">
                          <h3 className="text-3xl font-serif font-bold">Asset Deployment</h3>
                          <p className="text-xs text-blue-300 font-bold uppercase tracking-[0.3em] mt-2">Capitalizing Resilience Nodes</p>
                      </div>
                      <button 
                          onClick={() => { setShowDeployModal(false); setDeploymentStatus('IDLE'); }} 
                          className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-all hover:rotate-90 active:scale-90"
                      >
                          <X size={28} />
                      </button>
                  </div>

                  <div className="p-12">
                      {deploymentStatus === 'IDLE' && (
                          <div className="space-y-10">
                              <div className="flex gap-6 items-start">
                                  <img src={selectedOpportunity.image} className="w-24 h-24 rounded-[2rem] object-cover shadow-lg border-2 border-white dark:border-earth-800 shrink-0" alt="Project" />
                                  <div>
                                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{selectedOpportunity.title}</h4>
                                      <div className="flex items-center gap-2 mb-4">
                                          <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase rounded border border-blue-100 dark:border-blue-900">
                                              Target: {selectedOpportunity.target}
                                          </span>
                                          <span className="px-2 py-0.5 bg-agro-50 dark:bg-agro-950 text-agro-600 dark:text-agro-400 text-[10px] font-black uppercase rounded border border-agro-100 dark:border-agro-900">
                                              Yield: {selectedOpportunity.yield}
                                          </span>
                                      </div>
                                      <p className="text-sm text-earth-500 dark:text-earth-400 leading-relaxed font-medium">
                                          Deploying capital to this project increases the regional **m(t)** index and secures high-integrity sustainable returns.
                                      </p>
                                  </div>
                              </div>

                              <div className="space-y-4">
                                  <div className="flex justify-between items-end px-1">
                                      <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest">Investment Amount (USD)</label>
                                      <span className="text-[10px] font-bold text-blue-600 uppercase">Min: ${selectedOpportunity.minInvest.toLocaleString()}</span>
                                  </div>
                                  <div className="relative">
                                      <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-earth-300" size={24} />
                                      <input 
                                          type="number" 
                                          value={deployAmount}
                                          onChange={(e) => setDeployAmount(e.target.value)}
                                          className="w-full border-2 border-earth-100 dark:border-earth-800 bg-earth-50 dark:bg-earth-800 rounded-3xl pl-14 pr-6 py-6 focus:outline-none focus:border-blue-500 font-mono text-4xl text-earth-900 dark:text-white transition-all placeholder:text-earth-200" 
                                          placeholder="0" 
                                      />
                                  </div>
                                  <div className="flex justify-between text-[10px] font-bold text-earth-400 px-1">
                                      <span>Available Portfolio: ${portfolioValue.toLocaleString()}</span>
                                      <button onClick={() => setDeployAmount(portfolioValue.toString())} className="text-agro-600 hover:underline">MAX</button>
                                  </div>
                              </div>

                              <button 
                                  onClick={handleDeployAssets}
                                  className="w-full nature-gradient text-white font-black py-6 rounded-3xl shadow-xl shadow-agro-900/20 hover:scale-[1.01] active:scale-95 transition-all text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                              >
                                  <Layers size={20} /> Initialize Deployment
                              </button>
                          </div>
                      )}

                      {deploymentStatus === 'DEPLOYING' && (
                          <div className="py-12 flex flex-col items-center text-center space-y-12">
                              <div className="relative">
                                  <div className="w-40 h-40 rounded-full border-[6px] border-blue-50 dark:border-earth-800 border-t-blue-600 animate-spin"></div>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                      <Server size={48} className="text-blue-600 animate-pulse" />
                                  </div>
                              </div>
                              
                              <div className="space-y-4">
                                  <h4 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">Executing Allocation</h4>
                                  <p className="text-slate-500 dark:text-slate-400 font-mono text-sm uppercase tracking-widest animate-pulse">
                                      {deploymentSteps[deployStep]}
                                  </p>
                              </div>

                              <div className="w-full max-w-sm space-y-3">
                                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                      <span>Sequence Progress</span>
                                      <span>{((deployStep + 1) / deploymentSteps.length * 100).toFixed(0)}%</span>
                                  </div>
                                  <div className="w-full h-2 bg-slate-100 dark:bg-earth-800 rounded-full overflow-hidden">
                                      <div 
                                          className="h-full bg-blue-600 transition-all duration-700 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                                          style={{ width: `${(deployStep + 1) / deploymentSteps.length * 100}%` }}
                                      ></div>
                                  </div>
                              </div>
                          </div>
                      )}

                      {deploymentStatus === 'SUCCESS' && (
                          <div className="py-8 space-y-10 animate-in zoom-in duration-500">
                              <div className="text-center">
                                  <div className="w-28 h-28 bg-green-50 dark:bg-agro-900/30 rounded-[3rem] flex items-center justify-center mx-auto mb-8 text-agro-600 dark:text-agro-400 shadow-inner ring-8 ring-green-50 dark:ring-agro-950">
                                      <CheckCircle2 size={64} className="animate-bounce" />
                                  </div>
                                  <h3 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Deployment Successful</h3>
                                  <p className="text-[10px] text-agro-600 font-black uppercase tracking-[0.4em] mb-10">Asset Node EA-DEPL-882-C</p>
                              </div>
                              
                              <div className="bg-slate-950 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden border border-white/5 text-center">
                                  <div className="absolute top-0 right-0 p-8 opacity-5"><FileCheck size={120} /></div>
                                  <div className="relative z-10 space-y-6">
                                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Project: {selectedOpportunity.title}</p>
                                      <div className="text-6xl font-serif font-bold tracking-tighter">
                                          ${parseFloat(deployAmount).toLocaleString()}
                                      </div>
                                      <p className="text-xs text-slate-400 leading-relaxed font-medium max-w-xs mx-auto">
                                          Your assets are now powering sustainable growth. Track performance live in your Transaction Ledger.
                                      </p>
                                  </div>
                              </div>

                              <button 
                                  onClick={() => { setShowDeployModal(false); setDeploymentStatus('IDLE'); }}
                                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black py-5 rounded-2xl hover:bg-slate-800 transition-all text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-3"
                              >
                                  <History size={18} /> Return to Dashboard
                              </button>
                          </div>
                      )}
                  </div>

                  <div className="p-8 bg-slate-50 dark:bg-earth-950/50 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-center gap-3">
                      <ShieldAlert size={18} className="text-blue-600" />
                      <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Integrated m(t) Resilience Verification Protocol</p>
                  </div>
              </div>
          </div>
      )}

      {/* INSURANCE VERIFICATION MODAL */}
      {showInsuranceModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white dark:bg-earth-900 w-full max-w-2xl rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10">
              <div className="bg-blue-900 p-10 text-white flex justify-between items-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><ShieldCheck size={150} /></div>
                 <div className="relative z-10">
                    <h3 className="text-3xl font-serif font-bold">Insurance Protocol</h3>
                    <p className="text-xs text-blue-300 font-bold uppercase tracking-[0.3em] mt-2">Capital Integrity & Biological Verification</p>
                 </div>
                 <button 
                    onClick={() => { setShowInsuranceModal(false); setInsuranceStatus('IDLE'); }} 
                    className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-all hover:rotate-90 active:scale-90"
                 >
                    <X size={28} />
                 </button>
              </div>

              <div className="p-12">
                 {insuranceStatus === 'IDLE' && (
                    <div className="space-y-10">
                        <div className="flex gap-6 items-start">
                            <div className="p-5 bg-blue-50 dark:bg-blue-900/30 rounded-3xl text-blue-600 shadow-inner">
                                <Lock size={32} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Coverage Authentication</h4>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                    EnvirosAgro provides a tiered insurance layer for all deployed impact capital. Our coverage is dynamically backed by verified biomass assets and carbon seq reserves.
                                </p>
                            </div>
                        </div>

                        <div className="bg-earth-50 dark:bg-earth-800/50 p-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-800">
                            <h5 className="text-[10px] font-black text-earth-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                                <Zap size={14} className="text-amber-500" /> Active Coverage Specs
                            </h5>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-earth-100 dark:border-earth-800">
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Protected Assets</span>
                                    <span className="text-sm font-mono font-black text-slate-900 dark:text-white">${portfolioValue.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-earth-100 dark:border-earth-800">
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Asset Backing Ratio</span>
                                    <span className="text-sm font-bold text-agro-600">1.25 : 1 (Over-collateralized)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Auditor Status</span>
                                    <span className="text-[10px] font-black bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full uppercase">Global Sentinel-2 Hub</span>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={handleVerifyInsurance}
                            className="w-full nature-gradient text-white font-black py-6 rounded-3xl shadow-xl shadow-agro-900/20 hover:scale-[1.01] active:scale-95 transition-all text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                        >
                            <ShieldCheck size={20} /> Initialize Coverage Verification
                        </button>
                    </div>
                 )}

                 {insuranceStatus === 'VERIFYING' && (
                    <div className="py-12 flex flex-col items-center text-center space-y-12">
                        <div className="relative">
                            <div className="w-40 h-40 rounded-full border-[6px] border-blue-50 dark:border-earth-800 border-t-blue-600 animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Server size={48} className="text-blue-600 animate-pulse" />
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <h4 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">Audit Handshake</h4>
                            <p className="text-slate-500 dark:text-slate-400 font-mono text-sm uppercase tracking-widest animate-pulse">
                                {verificationSteps[verificationStep]}
                            </p>
                        </div>

                        <div className="w-full max-w-sm space-y-3">
                            <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <span>Network Sync Progress</span>
                                <span>{((verificationStep + 1) / verificationSteps.length * 100).toFixed(0)}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 dark:bg-earth-800 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-blue-600 transition-all duration-700 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                                    style={{ width: `${(verificationStep + 1) / verificationSteps.length * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                 )}

                 {insuranceStatus === 'VERIFIED' && (
                    <div className="py-8 space-y-10 animate-in zoom-in duration-500">
                        <div className="text-center">
                            <div className="w-28 h-28 bg-green-50 dark:bg-agro-900/30 rounded-[3rem] flex items-center justify-center mx-auto mb-8 text-agro-600 dark:text-agro-400 shadow-inner ring-8 ring-green-50 dark:ring-agro-950">
                                <CheckCircle2 size={64} className="animate-bounce" />
                            </div>
                            <h3 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Active Coverage Verified</h3>
                            <p className="text-[10px] text-agro-600 font-black uppercase tracking-[0.4em] mb-10">Policy Node EA-SAFE-882-C</p>
                        </div>
                        
                        <div className="bg-slate-950 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden border border-white/5">
                            <div className="absolute top-0 right-0 p-8 opacity-5"><FileCheck size={120} /></div>
                            <div className="grid grid-cols-2 gap-10 relative z-10">
                                <div>
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Coverage Threshold</p>
                                    <p className="text-2xl font-bold text-white font-mono">100.00%</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Asset Backing</p>
                                    <p className="text-2xl font-bold text-agro-400 font-mono">125.4%</p>
                                </div>
                                <div className="col-span-2 pt-6 border-t border-white/10">
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Shield size={12} /> Biological Integrity Certificate
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                                            <QrCode size={24} className="text-slate-400" />
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                            Your portfolio is currently mirrored and collateralized by 142.5 Tons of verified sustainable biomass.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => setShowInsuranceModal(false)}
                            className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black py-5 rounded-2xl hover:bg-slate-800 transition-all text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-3"
                        >
                            <Download size={18} /> Download Policy Archive (.PDF)
                        </button>
                    </div>
                 )}
              </div>

              <div className="p-8 bg-slate-50 dark:bg-earth-950/50 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-center gap-3">
                 <ShieldAlert size={18} className="text-blue-600" />
                 <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Full Network Custody Protocol in Effect</p>
              </div>
           </div>
        </div>
      )}

      {/* DEPOSIT MODAL - Enhanced Visuals */}
      {showDepositModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-950/80 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="bg-white dark:bg-earth-900 w-full max-w-xl rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10">
               <div className="p-10 border-b border-earth-100 dark:border-earth-800 flex justify-between items-center bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center gap-5">
                      <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-xl">
                          <Plus size={24} />
                      </div>
                      <div>
                          <h3 className="font-bold text-2xl text-blue-900 dark:text-blue-100 tracking-tight">Fund Account</h3>
                          <p className="text-[10px] text-blue-600 dark:text-blue-400 font-black uppercase tracking-[0.2em]">Asset Ingress Protocol</p>
                      </div>
                  </div>
                  <button onClick={() => setShowDepositModal(false)} className="bg-white/50 dark:bg-black/20 p-2 rounded-full text-earth-400 hover:text-earth-700 dark:hover:text-white transition-colors">
                     <X size={28} />
                  </button>
               </div>
               
               <div className="p-10">
                  {depositStatus === 'SUCCESS' ? (
                      <div className="text-center py-12 animate-in zoom-in">
                          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-green-600 dark:text-green-400 shadow-inner">
                              <CheckCircle2 size={48} />
                          </div>
                          <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Capital Verified</h3>
                          <p className="text-earth-600 dark:text-earth-400 mb-8 max-w-xs mx-auto leading-relaxed">
                              Your funds have been successfully deployed to your liquidity reserve.
                          </p>
                          <div className="bg-earth-50 dark:bg-earth-800 p-6 rounded-3xl border border-earth-100 dark:border-earth-800 inline-block min-w-[200px]">
                              <p className="text-[10px] font-black text-earth-400 uppercase tracking-widest mb-1">New Balance</p>
                              <p className="text-3xl font-serif font-bold text-blue-600 dark:text-blue-400 font-mono">
                                ${portfolioValue.toLocaleString()}
                              </p>
                          </div>
                      </div>
                  ) : (
                      <div className="space-y-10">
                        <div className="flex gap-3 bg-earth-50 dark:bg-earth-800 p-2 rounded-[2.2rem]">
                            <button 
                                onClick={() => { setDepositMethod('TOKENZ'); setAmount(''); }}
                                disabled={depositStatus === 'PROCESSING'}
                                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-[1.8rem] transition-all flex items-center justify-center gap-2 ${depositMethod === 'TOKENZ' ? 'bg-white dark:bg-earth-700 text-amber-600 dark:text-amber-400 shadow-xl' : 'text-earth-400 hover:text-earth-700 dark:hover:text-white'}`}
                            >
                                <Coins size={16} /> Tokenz
                            </button>
                            <button 
                                onClick={() => { setDepositMethod('FIAT'); setAmount(''); }}
                                disabled={depositStatus === 'PROCESSING'}
                                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-[1.8rem] transition-all flex items-center justify-center gap-2 ${depositMethod === 'FIAT' ? 'bg-white dark:bg-earth-700 text-blue-600 dark:text-blue-400 shadow-xl' : 'text-earth-400 hover:text-earth-700 dark:hover:text-white'}`}
                            >
                                <CreditCard size={16} /> Fiat
                            </button>
                        </div>

                        {depositMethod === 'TOKENZ' ? (
                            <div className="space-y-8 animate-in slide-in-from-left-4">
                                <div className="bg-amber-50 dark:bg-amber-900/10 p-8 rounded-[2.5rem] border border-amber-100 dark:border-amber-800 flex justify-between items-center shadow-inner">
                                    <div>
                                        <p className="text-[9px] font-black text-amber-700 dark:text-amber-500 uppercase tracking-widest mb-1">Available TKZ</p>
                                        <p className="text-4xl font-bold text-amber-900 dark:text-amber-100 font-mono tracking-tighter">2,500<span className="text-xl">.00</span></p>
                                    </div>
                                    <div className="w-16 h-16 bg-white dark:bg-earth-800 rounded-2xl flex items-center justify-center shadow-lg"><Coins className="text-amber-400" size={32} /></div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between px-1"><label className="text-[10px] font-black text-earth-400 uppercase tracking-widest">Amount (TKZ)</label><span className="text-[10px] font-black text-agro-600 uppercase tracking-widest">Max</span></div>
                                    <input 
                                        type="number" 
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        disabled={depositStatus === 'PROCESSING'}
                                        className="w-full border-2 border-earth-100 dark:border-earth-800 bg-earth-50 dark:bg-earth-800 rounded-3xl px-8 py-6 focus:outline-none focus:border-amber-400 font-mono text-4xl text-earth-900 dark:text-white transition-all text-center placeholder:text-earth-200" 
                                        placeholder="0" 
                                    />
                                </div>
                                <button 
                                    onClick={handleDeposit}
                                    disabled={depositStatus === 'PROCESSING' || !amount}
                                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-black py-6 rounded-3xl transition-all shadow-2xl shadow-amber-600/20 flex items-center justify-center gap-3 text-sm uppercase tracking-[0.2em] disabled:opacity-50 hover:-translate-y-1"
                                >
                                    {depositStatus === 'PROCESSING' ? <><Loader2 className="animate-spin" /> Verifying Blockchain...</> : 'Initialize Transfer'}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-8 animate-in slide-in-from-right-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between px-1"><label className="text-[10px] font-black text-earth-400 uppercase tracking-widest">Deposit Amount (USD)</label></div>
                                    <input 
                                        type="number" 
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        disabled={depositStatus === 'PROCESSING'}
                                        className="w-full border-2 border-earth-100 dark:border-earth-800 bg-earth-50 dark:bg-earth-800 rounded-3xl px-8 py-6 focus:outline-none focus:border-blue-500 font-mono text-4xl text-earth-900 dark:text-white transition-all text-center placeholder:text-earth-200" 
                                        placeholder="0" 
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => setPaymentMethod('CARD')}
                                        className={`flex items-center justify-center gap-3 border-2 rounded-[2rem] py-5 font-black text-[10px] uppercase tracking-widest transition-all ${
                                            paymentMethod === 'CARD' 
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-lg ring-1 ring-blue-500' 
                                            : 'border-earth-100 dark:border-earth-800 hover:bg-earth-50 dark:hover:bg-earth-800 text-earth-400'
                                        }`}
                                    >
                                        <CreditCard size={18} /> Credit Card
                                    </button>
                                    <button 
                                        onClick={() => setPaymentMethod('MOBILE')}
                                        className={`flex items-center justify-center gap-3 border-2 rounded-[2rem] py-5 font-black text-[10px] uppercase tracking-widest transition-all ${
                                            paymentMethod === 'MOBILE' 
                                            ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 shadow-lg ring-1 ring-green-500' 
                                            : 'border-earth-100 dark:border-earth-800 hover:bg-earth-50 dark:hover:bg-earth-800 text-earth-400'
                                        }`}
                                    >
                                        <Smartphone size={18} /> Mobile Money
                                    </button>
                                </div>
                                
                                <button 
                                    onClick={handleDeposit}
                                    disabled={depositStatus === 'PROCESSING' || !amount}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-3xl transition-all shadow-2xl shadow-blue-600/20 flex items-center justify-center gap-3 text-sm uppercase tracking-[0.2em] disabled:opacity-50 hover:-translate-y-1"
                                >
                                    {depositStatus === 'PROCESSING' ? <><Loader2 className="animate-spin" /> Authorizing...</> : <><CheckCircle2 size={20} /> Authorize Deposit</>}
                                </button>
                                <p className="text-[9px] text-center text-earth-400 uppercase tracking-[0.4em] font-bold">Encrypted 256-bit Secure Layer</p>
                            </div>
                        )}
                      </div>
                  )}
               </div>
            </div>
         </div>
      )}

    </div>
  );
};
