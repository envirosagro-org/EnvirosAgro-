
import React, { useState } from 'react';
/* Added ArrowRight to the imports from lucide-react to fix the "Cannot find name 'ArrowRight'" error */
import { TrendingUp, PieChart, ArrowUpRight, ArrowRight, DollarSign, Leaf, Globe, ShieldCheck, Download, Plus, Coins, CreditCard, X, Smartphone, Loader2, CheckCircle2, ArrowDownLeft, Clock, Activity, Trash2, BarChart3, Target, Shield } from 'lucide-react';
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
    yield: "5.5% p.a.",
    minInvest: "$1,000",
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
    yield: "8.2% (Est)",
    minInvest: "$5,000",
    risk: "High",
    daysLeft: 4,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 'op3',
    title: "Regional Cold-Chain Link",
    thrust: "IA",
    target: "$1.2M",
    thrustName: "Industrial",
    yield: "4.8% p.a.",
    minInvest: "$10,000",
    risk: "Medium",
    daysLeft: 28,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=60"
  }
];

export const InvestorPortal: React.FC<InvestorPortalProps> = ({ onNavigate }) => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositMethod, setDepositMethod] = useState<'TOKENZ' | 'FIAT'>('TOKENZ');
  
  // Portfolio State - Pre-populated for Mockup
  const [portfolioValue, setPortfolioValue] = useState(12450.00);
  const [totalImpact, setTotalImpact] = useState(28.4);
  
  // Transaction History State - Pre-populated for Mockup
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

  const handleDeposit = () => {
      const val = parseFloat(amount);
      if (!amount || isNaN(val) || val <= 0) {
          alert("Please enter a valid amount.");
          return;
      }

      setDepositStatus('PROCESSING');

      // Simulate Network Request
      setTimeout(() => {
          const newVal = portfolioValue + val;
          setPortfolioValue(newVal);
          setTotalImpact(prev => prev + (val * 0.005)); // Mock impact increment
          
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

  const handleReset = () => {
      if (confirm("Are you sure you want to clear your portfolio and transaction history for this session?")) {
          setPortfolioValue(0);
          setTotalImpact(0);
          setTransactions([]);
      }
  };

  const pieData = [
    { name: 'Regenerative Bonds', value: portfolioValue * 0.4, fill: '#16a34a' },
    { name: 'Ag-Tech Equity', value: portfolioValue * 0.3, fill: '#3b82f6' },
    { name: 'Cash Reserves', value: portfolioValue * 0.3, fill: '#94a3b8' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
           <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-2xl border border-blue-100 dark:border-blue-800">
                  <TrendingUp className="text-blue-600 dark:text-blue-400" size={32} />
              </div>
              <h2 className="text-4xl font-serif font-bold text-agro-900 dark:text-white">Investor Portal</h2>
           </div>
           <p className="text-xl text-earth-600 dark:text-earth-400 max-w-2xl">
             Track your impact investments, analyze portfolio performance, and discover vetted sustainable opportunities across the global network.
           </p>
        </div>
        <div className="flex gap-4">
            <button className="bg-white dark:bg-earth-800 border border-earth-200 dark:border-earth-700 text-earth-600 dark:text-earth-300 px-6 py-3 rounded-full font-bold hover:bg-earth-50 dark:hover:bg-earth-700 transition-colors flex items-center gap-2">
                <Download size={18} /> Quarterly Report
            </button>
            <button 
                onClick={() => setShowDepositModal(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg"
            >
                <Plus size={18} /> Deposit Funds
            </button>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
         
         {/* Stats Cards */}
         <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-earth-900 p-8 rounded-3xl border border-earth-100 dark:border-earth-800 shadow-sm flex flex-col justify-center relative overflow-hidden">
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="font-bold text-earth-500 dark:text-earth-400 text-sm uppercase tracking-wider">Total Portfolio Value</h3>
                    {portfolioValue > 0 && (
                        <button 
                            onClick={handleReset}
                            className="text-earth-300 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30"
                            title="Reset Mockup Data"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>
                <div className="text-5xl font-serif font-bold text-earth-900 dark:text-white mb-2 relative z-10">
                    ${portfolioValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </div>
                <div className="flex items-center gap-2 relative z-10">
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded text-xs font-bold flex items-center">
                        <TrendingUp size={12} className="mr-1" /> +4.2%
                    </span>
                    <span className="text-earth-400 text-xs font-medium">Yield this quarter</span>
                </div>
                {portfolioValue > 0 && (
                    <div className="absolute -bottom-8 -right-8 text-blue-50 dark:text-blue-900 opacity-20 pointer-events-none">
                        <Activity size={200} />
                    </div>
                )}
            </div>
            
            <div className="bg-white dark:bg-earth-900 p-8 rounded-3xl border border-earth-100 dark:border-earth-800 shadow-sm flex flex-col justify-center">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="font-bold text-earth-500 dark:text-earth-400 text-sm uppercase tracking-wider">Impact Accounting</h3>
                    <Leaf size={24} className="text-green-600 dark:text-green-500" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <div className={`text-3xl font-serif font-bold ${totalImpact > 0 ? 'text-earth-900 dark:text-white' : 'text-earth-300'}`}>
                            {totalImpact > 0 ? totalImpact.toFixed(1) : '--'}
                        </div>
                        <div className="text-xs text-earth-500 uppercase font-bold tracking-tight">Tons CO2 Offset</div>
                    </div>
                    <div>
                        <div className={`text-3xl font-serif font-bold ${totalImpact > 0 ? 'text-earth-900 dark:text-white' : 'text-earth-300'}`}>
                            {totalImpact > 0 ? Math.floor(totalImpact * 12) : '--'}
                        </div>
                        <div className="text-xs text-earth-500 uppercase font-bold tracking-tight">Smallholders Paid</div>
                    </div>
                </div>
            </div>

            {/* Asset Allocation Chart */}
            <div className="bg-white dark:bg-earth-900 p-8 rounded-3xl border border-earth-100 dark:border-earth-800 shadow-sm md:col-span-2 flex flex-col md:flex-row items-center gap-8 min-h-[300px]">
                {portfolioValue > 0 ? (
                    <>
                        <div className="w-48 h-48 relative shrink-0">
                             <ResponsiveContainer width="100%" height="100%">
                                <RePie>
                                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </RePie>
                             </ResponsiveContainer>
                             <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                                 <span className="text-[10px] text-earth-400 font-bold uppercase tracking-widest">Balanced</span>
                                 <span className="text-xl font-bold text-agro-600 dark:text-agro-400">Score 8.2</span>
                             </div>
                        </div>
                        <div className="flex-1 space-y-4">
                            <h4 className="font-bold text-earth-900 dark:text-white mb-4">Asset Allocation</h4>
                            {pieData.map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.fill}}></div>
                                        <span className="text-sm text-earth-600 dark:text-earth-300 font-medium">{item.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-bold text-earth-900 dark:text-white block">${item.value.toLocaleString()}</span>
                                        <span className="text-[10px] text-earth-400 font-bold uppercase">{Math.round((item.value/portfolioValue)*100)}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="w-full py-12 flex flex-col items-center justify-center text-center">
                        <PieChart size={64} className="text-earth-200 dark:text-earth-800 mb-4" />
                        <h3 className="text-earth-500 dark:text-earth-400 font-bold">Waiting for Initial Capital</h3>
                        <p className="text-sm text-earth-400 dark:text-earth-600 mt-2 max-w-xs mx-auto">Deposit funds to start building your sustainability-aligned green portfolio.</p>
                    </div>
                )}
            </div>
         </div>

         {/* Right Sidebar: Quick Actions & History */}
         <div className="space-y-6 flex flex-col h-full">
             <div className="bg-agro-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-xl">
                 <div className="relative z-10">
                     <ShieldCheck size={48} className="mb-4 text-agro-300" />
                     <h3 className="text-2xl font-bold mb-2">Impact Verification</h3>
                     <p className="text-agro-200 text-sm mb-6 leading-relaxed">
                         Every dollar is tracked via the <strong>m(t) Resilience Metric</strong>, ensuring your capital drives verifiable ecological restoration.
                     </p>
                     <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl border border-white/10 transition-all text-sm">
                         View Audit Standards
                     </button>
                 </div>
                 <div className="absolute -bottom-10 -right-10 text-white/5 pointer-events-none">
                     <BarChart3 size={200} />
                 </div>
             </div>

             {/* Recent Activity Feed */}
             <div className="bg-white dark:bg-earth-900 p-6 rounded-3xl border border-earth-200 dark:border-earth-800 shadow-sm flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-earth-900 dark:text-white mb-6 flex items-center gap-2">
                    <Clock size={18} className="text-earth-400" /> Activity Log
                </h3>
                <div className="space-y-4 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                    {transactions.length > 0 ? (
                        transactions.map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-earth-50 dark:hover:bg-earth-800/50 transition-colors border border-transparent hover:border-earth-100 dark:hover:border-earth-700">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${tx.amount > 0 ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'}`}>
                                        {tx.amount > 0 ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-earth-900 dark:text-white leading-tight">{tx.type}</p>
                                        <p className="text-[10px] text-earth-500 font-medium uppercase tracking-tight">{tx.method}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-sm font-bold ${tx.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
                                        {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} <span className="text-[10px] uppercase font-sans">{tx.currency}</span>
                                    </p>
                                    <p className="text-[10px] text-earth-400 font-medium">{tx.date}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-earth-400">
                            <Activity size={32} className="mx-auto mb-2 opacity-30" />
                            <p className="text-xs italic">No activity recorded yet.</p>
                        </div>
                    )}
                </div>
                <button className="w-full mt-4 text-xs font-bold text-earth-400 hover:text-agro-600 transition-colors pt-4 border-t border-earth-100 dark:border-earth-800 text-center">
                    FULL LEDGER HISTORY
                </button>
             </div>
         </div>
      </div>

      {/* Opportunities Marketplace */}
      <div>
          <div className="flex justify-between items-end mb-8">
              <div>
                  <h3 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-2">Vetted Opportunities</h3>
                  <p className="text-earth-500 dark:text-earth-400">High-impact projects ready for deployment capital.</p>
              </div>
              <button className="text-agro-600 dark:text-agro-400 font-bold text-sm hover:underline flex items-center gap-1">
                  Browse All Market <ArrowRight size={16} />
              </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {OPPORTUNITIES.map((opp) => (
                  <div key={opp.id} className="bg-white dark:bg-earth-900 rounded-3xl overflow-hidden border border-earth-100 dark:border-earth-800 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                      <div className="h-48 overflow-hidden relative">
                          <img src={opp.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={opp.title} />
                          <div className="absolute top-4 left-4 flex gap-2">
                              <span className="bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-agro-700 dark:text-agro-400 shadow-sm border border-black/5 flex items-center gap-1">
                                  <Shield size={10} /> Risk: {opp.risk}
                              </span>
                              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-sm flex items-center gap-1">
                                  <Target size={10} /> {opp.thrustName}
                              </span>
                          </div>
                          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur text-white px-2 py-1 rounded text-[10px] font-bold border border-white/20">
                             {opp.daysLeft} Days Left
                          </div>
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                          <h4 className="text-xl font-bold text-earth-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                              {opp.title}
                          </h4>
                          
                          <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="bg-earth-50 dark:bg-earth-800 p-3 rounded-2xl">
                                  <span className="text-[10px] font-bold text-earth-400 uppercase block mb-1">Target Yield</span>
                                  <span className="text-lg font-bold text-green-600 dark:text-green-400">{opp.yield}</span>
                              </div>
                              <div className="bg-earth-50 dark:bg-earth-800 p-3 rounded-2xl">
                                  <span className="text-[10px] font-bold text-earth-400 uppercase block mb-1">Target Raising</span>
                                  <span className="text-lg font-bold text-earth-900 dark:text-white">{opp.target}</span>
                              </div>
                          </div>
                          
                          <div className="mt-auto flex items-center justify-between pt-4 border-t border-earth-100 dark:border-earth-800">
                              <div className="text-xs text-earth-50 font-medium">
                                  Min Invest: <strong className="text-earth-900 dark:text-white">{opp.minInvest}</strong>
                              </div>
                              <button className="text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline flex items-center gap-1">
                                  Invest Now <ArrowUpRight size={16} />
                              </button>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>

      {/* DEPOSIT MODAL */}
      {showDepositModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-earth-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="p-6 border-b border-earth-100 dark:border-earth-800 flex justify-between items-center bg-blue-50 dark:bg-blue-900/20">
                  <h3 className="font-bold text-xl text-blue-900 dark:text-blue-100 flex items-center gap-2">
                     <Plus className="text-blue-600 dark:text-blue-400" size={24} /> Fund Investment Account
                  </h3>
                  <button onClick={() => setShowDepositModal(false)} className="text-earth-400 hover:text-earth-700 dark:hover:text-white transition-colors">
                     <X size={24} />
                  </button>
               </div>
               
               <div className="p-6">
                  {depositStatus === 'SUCCESS' ? (
                      <div className="text-center py-8 animate-in zoom-in">
                          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
                              <CheckCircle2 size={40} />
                          </div>
                          <h3 className="text-2xl font-bold text-earth-900 dark:text-white mb-2">Deposit Successful!</h3>
                          <p className="text-earth-600 dark:text-earth-400 mb-2 leading-relaxed">
                              Your funds have been added to your available portfolio balance.
                          </p>
                          <p className="text-lg font-bold text-blue-600 dark:text-blue-400 font-mono">
                              Portfolio: ${ (portfolioValue).toLocaleString() }
                          </p>
                      </div>
                  ) : (
                      <>
                        <div className="flex gap-2 mb-8 bg-earth-50 dark:bg-earth-800 p-1 rounded-2xl">
                            <button 
                                onClick={() => { setDepositMethod('TOKENZ'); setAmount(''); }}
                                disabled={depositStatus === 'PROCESSING'}
                                className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${depositMethod === 'TOKENZ' ? 'bg-white dark:bg-earth-700 text-amber-600 dark:text-amber-400 shadow-sm' : 'text-earth-500 hover:text-earth-800 dark:hover:text-white'}`}
                            >
                                <Coins size={16} /> Pay with Tokenz
                            </button>
                            <button 
                                onClick={() => { setDepositMethod('FIAT'); setAmount(''); }}
                                disabled={depositStatus === 'PROCESSING'}
                                className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${depositMethod === 'FIAT' ? 'bg-white dark:bg-earth-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-earth-500 hover:text-earth-800 dark:hover:text-white'}`}
                            >
                                <CreditCard size={16} /> Fiat Deposit
                            </button>
                        </div>

                        {depositMethod === 'TOKENZ' ? (
                            <div className="space-y-6 animate-in slide-in-from-left-4">
                                <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-2xl border border-amber-100 dark:border-amber-800/50 flex justify-between items-center">
                                    <div>
                                        <p className="text-[10px] font-bold text-amber-700 dark:text-amber-500 uppercase tracking-widest mb-1">Tokenz Available</p>
                                        <p className="text-2xl font-bold text-amber-900 dark:text-amber-100 font-mono">2,500.00 TKZ</p>
                                    </div>
                                    <Coins className="text-amber-400" size={40} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-earth-700 dark:text-earth-300 px-1">Amount to Move to Investment Portfolio (TKZ)</label>
                                    <input 
                                        type="number" 
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        disabled={depositStatus === 'PROCESSING'}
                                        className="w-full border border-earth-200 dark:border-earth-700 bg-earth-50 dark:bg-earth-800 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-xl text-earth-900 dark:text-white transition-all" 
                                        placeholder="0.00" 
                                    />
                                </div>
                                <button 
                                    onClick={handleDeposit}
                                    disabled={depositStatus === 'PROCESSING' || !amount}
                                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {depositStatus === 'PROCESSING' ? <><Loader2 className="animate-spin" /> Moving Assets...</> : 'Confirm Transfer'}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in slide-in-from-right-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-earth-700 dark:text-earth-300 px-1">Deposit Amount (USD)</label>
                                    <input 
                                        type="number" 
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        disabled={depositStatus === 'PROCESSING'}
                                        className="w-full border border-earth-200 dark:border-earth-700 bg-earth-50 dark:bg-earth-800 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xl text-earth-900 dark:text-white transition-all" 
                                        placeholder="0.00" 
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => setPaymentMethod('CARD')}
                                        className={`flex items-center justify-center gap-2 border rounded-2xl py-4 font-bold text-sm transition-all ${
                                            paymentMethod === 'CARD' 
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 ring-1 ring-blue-500' 
                                            : 'border-earth-200 dark:border-earth-700 hover:bg-earth-50 dark:hover:bg-earth-800 text-earth-700 dark:text-earth-300'
                                        }`}
                                    >
                                        <CreditCard size={18} /> Card
                                    </button>
                                    <button 
                                        onClick={() => setPaymentMethod('MOBILE')}
                                        className={`flex items-center justify-center gap-2 border rounded-2xl py-4 font-bold text-sm transition-all ${
                                            paymentMethod === 'MOBILE' 
                                            ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 ring-1 ring-green-500' 
                                            : 'border-earth-200 dark:border-earth-700 hover:bg-earth-50 dark:hover:bg-earth-800 text-earth-700 dark:text-earth-300'
                                        }`}
                                    >
                                        <Smartphone size={18} /> Mobile Money
                                    </button>
                                </div>
                                
                                {paymentMethod === 'MOBILE' ? (
                                     <div className="space-y-4 pt-2">
                                        <div className="bg-green-50 dark:bg-green-900/10 p-5 rounded-2xl border border-green-100 dark:border-green-800/50 text-center">
                                             <p className="text-xs text-green-800 dark:text-green-500 mb-1 font-bold uppercase tracking-tight">Global Paybill</p>
                                             <p className="text-2xl font-bold text-green-900 dark:text-green-100 font-mono">EnvirosAgro-LP</p>
                                        </div>
                                        <a 
                                            href={`tel:+254740161447`}
                                            className="block w-full bg-green-600 hover:bg-green-700 text-white text-center font-bold py-4 rounded-2xl transition-all shadow-lg"
                                        >
                                            <Smartphone className="inline mr-2" size={20} /> Open Mobile Dialer
                                        </a>
                                        <button 
                                            onClick={handleDeposit}
                                            disabled={depositStatus === 'PROCESSING' || !amount}
                                            className="w-full border border-earth-200 dark:border-earth-700 text-earth-700 dark:text-earth-300 font-bold py-4 rounded-2xl transition-all hover:bg-earth-50 dark:hover:bg-earth-800"
                                        >
                                            {depositStatus === 'PROCESSING' ? <><Loader2 className="animate-spin inline mr-2" /> Verifying Payment...</> : 'I Have Paid'}
                                        </button>
                                     </div>
                                ) : (
                                    <div className="space-y-4 pt-2">
                                        <button 
                                            onClick={handleDeposit}
                                            disabled={depositStatus === 'PROCESSING' || !amount}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {depositStatus === 'PROCESSING' ? <><Loader2 className="animate-spin" /> Authorizing...</> : <><CheckCircle2 size={20} /> Complete Deposit</>}
                                        </button>
                                        <p className="text-[10px] text-center text-earth-400 uppercase tracking-widest">Secure 256-bit encrypted transaction</p>
                                    </div>
                                )}
                            </div>
                        )}
                      </>
                  )}
               </div>
            </div>
         </div>
      )}

    </div>
  );
};
