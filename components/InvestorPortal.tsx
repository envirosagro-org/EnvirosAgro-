import React, { useState, useMemo, useEffect } from 'react';
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
  },
  {
      id: 'op4',
      title: "Bio-Corridor Restoration",
      thrust: "EA",
      thrustName: "Environmental",
      target: "$300,000",
      raised: 280000,
      yield: "6.1% p.a.",
      minInvest: 500,
      risk: "Low",
      daysLeft: 2,
      image: "https://images.unsplash.com/photo-1448375240586-dfd8f37933ff?w=400"
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
  
  const [portfolioValue, setPortfolioValue] = useState(12450.00);
  const [totalImpact, setTotalImpact] = useState(28.4);
  const [allocations, setAllocations] = useState({
    bonds: 45,
    equity: 35,
    carbon: 20
  });
  
  const [insuranceStatus, setInsuranceStatus] = useState<'IDLE' | 'VERIFYING' | 'VERIFIED'>('IDLE');
  const [verificationStep, setVerificationStep] = useState(0);

  const [deploymentStatus, setDeploymentStatus] = useState<'IDLE' | 'DEPLOYING' | 'SUCCESS'>('IDLE');
  const [deployAmount, setDeployAmount] = useState('');
  const [deployStep, setDeployStep] = useState(0);

  const [rebalanceStatus, setRebalanceStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');
  const [tempAllocations, setTempAllocations] = useState({ ...allocations });

  const verificationSteps = [
    "Establishing Node Handshake...",
    "Validating Audit Trail...",
    "Syncing Liquidity Reserve...",
    "Verifying Asset Backing..."
  ];

  const deploymentSteps = [
    "Initializing Asset Lock...",
    "Syncing Benchmarks...",
    "Validating Resilience Delta...",
    "Finalizing Node Entry..."
  ];

  const rebalanceSteps = [
    "Calculating Spread...",
    "Executing Liquidity Swap...",
    "Updating Smart Contracts...",
    "Re-calibrating Portfolio..."
  ];

  const [transactions, setTransactions] = useState<any[]>([
    { id: 1, type: 'Yield Payment', amount: 142.50, method: 'Carbon Bond G2', date: 'May 01, 10:24 AM', currency: 'USD', status: 'Received' },
    { id: 2, type: 'Asset Purchase', amount: -2500.00, method: 'Eco-Reforest Fund', date: 'Apr 15, 02:45 PM', currency: 'USD', status: 'Completed' },
    { id: 3, type: 'Deposit', amount: 5000.00, method: 'Bank Transfer', date: 'Apr 02, 09:12 AM', currency: 'USD', status: 'Completed' }
  ]);
  
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'MOBILE'>('CARD');
  const [depositStatus, setDepositStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');

  const filteredOpportunities = useMemo(() => {
    if (riskFilter === 'All') return OPPORTUNITIES;
    return OPPORTUNITIES.filter(op => op.risk === riskFilter);
  }, [riskFilter]);

  const handleDeposit = () => {
      const val = parseFloat(amount);
      if (!amount || isNaN(val) || val <= 0) return;
      setDepositStatus('PROCESSING');
      setTimeout(() => {
          setPortfolioValue(prev => prev + val);
          setTransactions(prev => [{
              id: Date.now(),
              type: 'Deposit',
              amount: val,
              method: depositMethod === 'TOKENZ' ? 'Tokenz Wallet' : (paymentMethod === 'CARD' ? 'Visa' : 'Mobile'),
              date: 'Just Now',
              currency: depositMethod === 'TOKENZ' ? 'TKZ' : 'USD',
              status: 'Completed'
          }, ...prev]);
          setDepositStatus('SUCCESS');
          setTimeout(() => { setShowDepositModal(false); setDepositStatus('IDLE'); setAmount(''); }, 2000);
      }, 2000);
  };

  const handleVerifyInsurance = () => {
    setInsuranceStatus('VERIFYING');
    setVerificationStep(0);
    const interval = setInterval(() => {
        setVerificationStep(prev => (prev >= verificationSteps.length - 1 ? (clearInterval(interval), prev) : prev + 1));
    }, 1000);
    setTimeout(() => setInsuranceStatus('VERIFIED'), 5000);
  };

  const handleDeployAssets = () => {
    const val = parseFloat(deployAmount);
    if (!selectedOpportunity || val < selectedOpportunity.minInvest || val > portfolioValue) return;
    setDeploymentStatus('DEPLOYING');
    setDeployStep(0);
    const interval = setInterval(() => {
        setDeployStep(prev => (prev >= deploymentSteps.length - 1 ? (clearInterval(interval), prev) : prev + 1));
    }, 1000);
    setTimeout(() => {
        setPortfolioValue(prev => prev - val);
        setTransactions(prev => [{
            id: Date.now(),
            type: 'Asset Deployment',
            amount: -val,
            method: selectedOpportunity.title,
            date: 'Just Now',
            currency: 'USD',
            status: 'Completed'
        }, ...prev]);
        setDeploymentStatus('SUCCESS');
    }, 5000);
  };

  const handleRebalance = () => {
    const total = tempAllocations.bonds + tempAllocations.equity + tempAllocations.carbon;
    if (total !== 100) return;
    setRebalanceStatus('PROCESSING');
    setVerificationStep(0);
    const interval = setInterval(() => {
        setVerificationStep(prev => (prev >= rebalanceSteps.length - 1 ? (clearInterval(interval), prev) : prev + 1));
    }, 800);
    setTimeout(() => {
        setAllocations({ ...tempAllocations });
        setRebalanceStatus('SUCCESS');
    }, 4000);
  };

  const pieData = [
    { name: 'Regenerative Bonds', value: portfolioValue * (allocations.bonds / 100), fill: '#16a34a' },
    { name: 'Ag-Tech Equity', value: portfolioValue * (allocations.equity / 100), fill: '#3b82f6' },
    { name: 'Carbon Credits', value: portfolioValue * (allocations.carbon / 100), fill: '#9333ea' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 relative animate-in fade-in duration-1000">
      
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-10 gap-6">
        <div className="max-w-3xl">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[8px] font-black uppercase tracking-widest mb-4">
              <ShieldCheck size={12} /> Official Portal v2.4
           </div>
           <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4 tracking-tight leading-[1]">
              Capital for <span className="text-blue-600 italic">Resilience</span>
           </h1>
           <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
             Deploying impact capital benchmarked against the m(t) Sustainability Constant.
           </p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
            <button 
                onClick={() => setShowDepositModal(true)}
                className="flex-1 md:flex-none bg-blue-600 text-white px-6 py-2.5 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-blue-700 transition-all shadow-lg active:scale-95"
            >
                <Plus size={16} className="mr-1" /> Add Capital
            </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 mb-12">
         
         <div className="lg:col-span-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-earth-900 p-8 rounded-[2rem] border border-earth-100 dark:border-earth-800 shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[9px] font-black uppercase tracking-widest text-earth-400">Portfolio Value</span>
                            <Activity size={16} className="text-blue-600" />
                        </div>
                        <div className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-2">
                            ${portfolioValue.toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded text-[8px] font-black">+4.24%</span>
                        </div>
                    </div>
                </div>

                <div className="bg-agro-900 p-8 rounded-[2rem] text-white shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <span className="text-[9px] font-black uppercase tracking-widest text-agro-300 mb-4 block">Verified Impact</span>
                        <div className="text-4xl font-serif font-bold mb-1">{totalImpact.toFixed(1)} <span className="text-sm font-sans font-black opacity-40 uppercase">Tons</span></div>
                        <p className="text-[8px] font-black text-agro-400 uppercase tracking-widest">CO2 Sequestration</p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-earth-900 p-8 rounded-[2rem] border border-earth-100 dark:border-earth-800 shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-48 h-48 relative shrink-0">
                         <ResponsiveContainer width="100%" height="100%">
                            <RePie>
                                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={5} stroke="none">
                                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '10px' }} />
                            </RePie>
                         </ResponsiveContainer>
                    </div>
                    
                    <div className="flex-1 w-full">
                        <div className="flex justify-between items-end mb-4">
                            <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-widest">Asset Mix</h3>
                            <button onClick={() => setShowRebalanceModal(true)} className="text-[8px] font-black text-blue-600 uppercase tracking-widest hover:underline">Rebalance</button>
                        </div>
                        <div className="space-y-2">
                            {pieData.map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-2.5 bg-earth-50 dark:bg-earth-800/50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-6 rounded-full" style={{backgroundColor: item.fill}}></div>
                                        <span className="text-[10px] font-bold text-slate-700 dark:text-white uppercase">{item.name}</span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">${item.value.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
         </div>

         <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white dark:bg-earth-900 p-6 rounded-[2rem] border border-earth-100 dark:border-earth-800 shadow-sm flex-1 flex flex-col min-h-0">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                    <BarChart3 size={16} className="text-blue-600" /> Recent Ledger
                </h3>
                <div className="flex-1 ea-scroll-container max-h-[340px] space-y-2">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="p-3 bg-earth-50/50 dark:bg-earth-800/30 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`p-1.5 rounded-lg ${tx.amount > 0 ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                                    {tx.amount > 0 ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-[10px] text-slate-900 dark:text-white">{tx.type}</h4>
                                    <p className="text-[8px] text-earth-400 font-bold uppercase">{tx.method}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`text-[11px] font-black ${tx.amount > 0 ? 'text-green-600' : 'text-slate-900 dark:text-white'}`}>{tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}</p>
                                <p className="text-[7px] text-earth-400 font-bold uppercase">{tx.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
         </div>
      </div>

      <div className="mb-12">
          <div className="flex justify-between items-end mb-6">
              <div>
                  <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">Vetted Opportunities</h2>
                  <p className="text-xs text-slate-500 font-medium">Standardized project pipelines.</p>
              </div>
          </div>

          <div className="ea-scroll-container max-h-[500px] grid md:grid-cols-2 lg:grid-cols-3 gap-6 pr-2">
              {filteredOpportunities.map((opp) => (
                    <div key={opp.id} className="bg-white dark:bg-earth-900 rounded-[1.5rem] overflow-hidden border border-earth-100 dark:border-earth-800 shadow-sm hover:shadow-md transition-all group flex flex-col">
                        <div className="h-40 overflow-hidden relative">
                            <img src={opp.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={opp.title} />
                            <div className="absolute top-3 left-3 bg-white/95 px-2 py-0.5 rounded-full text-[7px] font-black uppercase text-blue-600 shadow">
                                {opp.risk} Risk
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors pr-2 truncate">
                                    {opp.title}
                                </h4>
                                <span className="text-lg font-bold text-agro-700 dark:text-agro-400 font-serif leading-none">{opp.yield}</span>
                            </div>
                            <div className="w-full bg-earth-100 dark:bg-earth-800 h-1 rounded-full overflow-hidden mb-4">
                                <div className="bg-blue-600 h-full" style={{width: `${Math.round((opp.raised / parseFloat(opp.target.replace('$', '').replace('M', '1000000').replace(',', ''))) * 100)}%`}}></div>
                            </div>
                            <div className="mt-auto flex justify-between items-center">
                                <span className="text-[9px] font-mono text-earth-400 uppercase tracking-widest">Min: ${opp.minInvest}</span>
                                <button 
                                    onClick={() => { setSelectedOpportunity(opp); setDeployAmount(opp.minInvest.toString()); setShowDeployModal(true); }}
                                    className="bg-blue-600 text-white px-4 py-1.5 rounded-lg font-black text-[8px] uppercase tracking-widest shadow-sm hover:bg-blue-700"
                                >
                                    Invest
                                </button>
                            </div>
                        </div>
                    </div>
              ))}
          </div>
      </div>
    </div>
  );
};