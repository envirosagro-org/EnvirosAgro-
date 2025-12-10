
import React, { useState } from 'react';
import { TrendingUp, PieChart, ArrowUpRight, DollarSign, Leaf, Globe, ShieldCheck, Download, Plus, Coins, CreditCard, X, Smartphone, Loader2, CheckCircle2, ArrowDownLeft, Clock, Activity, Trash2 } from 'lucide-react';
import { PieChart as RePie, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { View } from '../types';

interface InvestorPortalProps {
  onNavigate?: (view: View) => void;
}

export const InvestorPortal: React.FC<InvestorPortalProps> = ({ onNavigate }) => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositMethod, setDepositMethod] = useState<'TOKENZ' | 'FIAT'>('TOKENZ');
  
  // Portfolio State
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [totalImpact, setTotalImpact] = useState(0);
  
  // Transaction History State
  const [transactions, setTransactions] = useState<any[]>([]);
  
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
          setPortfolioValue(prev => prev + val);
          setTotalImpact(prev => prev + (val * 0.5)); // Mock impact calculation
          
          let methodLabel = paymentMethod === 'CARD' ? 'EnvirosAgro Visa' : 'Mobile Money';
          if (depositMethod === 'TOKENZ') methodLabel = 'Tokenz Wallet';

          const newTransaction = {
              id: Date.now(),
              type: 'Deposit',
              amount: val,
              method: methodLabel,
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
              currency: depositMethod === 'TOKENZ' ? 'TKZ' : 'USD'
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
      if (confirm("Are you sure you want to clear your portfolio and transaction history?")) {
          setPortfolioValue(0);
          setTotalImpact(0);
          setTransactions([]);
      }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
           <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-50 p-3 rounded-2xl border border-blue-100">
                  <TrendingUp className="text-blue-600" size={32} />
              </div>
              <h2 className="text-4xl font-serif font-bold text-agro-900">Investor Portal</h2>
           </div>
           <p className="text-xl text-earth-600 max-w-2xl">
             Track your impact investments, analyze portfolio performance, and discover vetted sustainable opportunities.
           </p>
        </div>
        <div className="flex gap-4">
            <button className="bg-white border border-earth-200 text-earth-600 px-6 py-3 rounded-full font-bold hover:bg-earth-50 transition-colors flex items-center gap-2">
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
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
         
         {/* Stats Cards */}
         <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-earth-100 shadow-sm flex flex-col justify-center relative overflow-hidden">
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="font-bold text-earth-500 text-sm uppercase tracking-wider">Total Asset Value</h3>
                    {portfolioValue > 0 && (
                        <button 
                            onClick={handleReset}
                            className="text-earth-300 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                            title="Clear Portfolio"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>
                <div className="text-4xl font-serif font-bold text-earth-900 mb-2 relative z-10">
                    ${portfolioValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </div>
                <p className="text-earth-400 text-xs relative z-10">
                    {portfolioValue > 0 ? '+100.0% (Net Deposit)' : 'Waiting for initial deposit...'}
                </p>
                {portfolioValue > 0 && (
                    <div className="absolute -bottom-4 -right-4 text-blue-50 opacity-50">
                        <TrendingUp size={100} />
                    </div>
                )}
            </div>
            
            <div className="bg-white p-6 rounded-3xl border border-earth-100 shadow-sm flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-earth-500 text-sm uppercase tracking-wider">Total Impact Generated</h3>
                    <Leaf size={16} className="text-green-600" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-earth-400">
                    <div>
                        <div className={`text-2xl font-bold ${totalImpact > 0 ? 'text-earth-900' : ''}`}>
                            {totalImpact > 0 ? totalImpact.toFixed(1) : '--'}
                        </div>
                        <div className="text-xs">CO2 Offset (tons)</div>
                    </div>
                    <div>
                        <div className={`text-2xl font-bold ${totalImpact > 0 ? 'text-earth-900' : ''}`}>
                            {totalImpact > 0 ? Math.floor(totalImpact / 10) : '--'}
                        </div>
                        <div className="text-xs">Jobs Supported</div>
                    </div>
                </div>
            </div>

            {/* Asset Allocation Chart */}
            <div className="bg-white p-6 rounded-3xl border border-earth-100 shadow-sm md:col-span-2 flex items-center justify-center text-center h-64">
                {portfolioValue > 0 ? (
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <div className="w-48 h-48 relative">
                             <ResponsiveContainer width="100%" height="100%">
                                <RePie>
                                    <Pie data={[{name: 'Cash Reserves', value: portfolioValue}]} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#3b82f6">
                                        <Cell fill="#3b82f6" />
                                    </Pie>
                                    <Tooltip />
                                </RePie>
                             </ResponsiveContainer>
                             <div className="absolute inset-0 flex items-center justify-center flex-col">
                                 <span className="text-xs text-earth-400 font-bold uppercase">Liquidity</span>
                                 <span className="text-xl font-bold text-blue-600">100%</span>
                             </div>
                        </div>
                        <p className="text-xs text-earth-500 mt-2">Allocated to Cash Reserves. View opportunities to invest.</p>
                    </div>
                ) : (
                    <div>
                        <PieChart size={48} className="mx-auto text-earth-200 mb-4" />
                        <h3 className="text-earth-500 font-bold mb-1">No Active Investments</h3>
                        <p className="text-xs text-earth-400">Deposit funds to start building your green portfolio.</p>
                    </div>
                )}
            </div>
         </div>

         {/* Right Sidebar: Quick Actions & History */}
         <div className="space-y-6">
             <div className="bg-agro-900 text-white p-8 rounded-3xl relative overflow-hidden">
                 <div className="relative z-10">
                     <ShieldCheck size={48} className="mb-4 text-agro-300" />
                     <h3 className="text-2xl font-bold mb-2">Impact Verification</h3>
                     <p className="text-agro-200 text-sm mb-6">
                         Your investments are audited quarterly using the <strong>Sustainability Coefficient C(a)</strong>.
                     </p>
                     <button disabled className="w-full bg-white/10 text-agro-200 font-bold py-3 rounded-xl cursor-not-allowed">
                         No Logs Available
                     </button>
                 </div>
             </div>

             {/* Recent Activity Feed */}
             <div className="bg-white p-6 rounded-3xl border border-earth-200 shadow-sm flex-1">
                <h3 className="font-bold text-lg text-earth-900 mb-4 flex items-center gap-2">
                    <Clock size={18} className="text-earth-400" /> Recent Activity
                </h3>
                <div className="space-y-3">
                    {transactions.length > 0 ? (
                        transactions.map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between p-3 bg-earth-50 rounded-xl border border-earth-100 hover:border-agro-200 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                                        <ArrowDownLeft size={16} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-earth-900">{tx.type}</p>
                                        <p className="text-[10px] text-earth-500">{tx.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-green-600">+{tx.amount.toLocaleString()} <span className="text-[10px] text-green-700">{tx.currency}</span></p>
                                    <p className="text-[10px] text-earth-400">{tx.method}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-earth-400">
                            <Activity size={24} className="mx-auto mb-2 opacity-50" />
                            <p className="text-xs italic">No transactions yet.</p>
                        </div>
                    )}
                </div>
             </div>
         </div>
      </div>

      {/* Opportunities Marketplace - Empty State */}
      <div>
          <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-earth-900">Open Opportunities</h3>
              <button disabled className="text-earth-400 font-bold text-sm cursor-default">View All</button>
          </div>

          <div className="bg-earth-50 rounded-3xl border border-earth-100 py-16 text-center">
              <Globe size={48} className="mx-auto text-earth-300 mb-4" />
              <h3 className="text-xl font-bold text-earth-600 mb-2">No Opportunities Matched</h3>
              <p className="text-sm text-earth-500 mb-6">There are currently no open projects matching your profile settings.</p>
              <button className="bg-white text-earth-600 border border-earth-200 px-6 py-2 rounded-full font-bold hover:bg-earth-100 transition-colors text-sm">
                  Update Preferences
              </button>
          </div>
      </div>

      {/* DEPOSIT MODAL */}
      {showDepositModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="p-6 border-b border-earth-100 flex justify-between items-center bg-blue-50">
                  <h3 className="font-bold text-xl text-blue-900 flex items-center gap-2">
                     <Plus className="text-blue-600" /> Fund Investment Wallet
                  </h3>
                  <button onClick={() => setShowDepositModal(false)} className="text-blue-400 hover:text-blue-700 transition-colors">
                     <X size={24} />
                  </button>
               </div>
               
               <div className="p-6">
                  {depositStatus === 'SUCCESS' ? (
                      <div className="text-center py-8 animate-in zoom-in">
                          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                              <CheckCircle2 size={40} />
                          </div>
                          <h3 className="text-2xl font-bold text-earth-900 mb-2">Deposit Successful!</h3>
                          <p className="text-earth-600 mb-2">
                              Your funds have been added to your portfolio liquidity.
                          </p>
                          <p className="text-sm font-bold text-blue-600">
                              New Balance: ${(portfolioValue + parseFloat(amount || '0')).toLocaleString()}
                          </p>
                      </div>
                  ) : (
                      <>
                        <div className="flex gap-2 mb-6 bg-earth-50 p-1 rounded-xl">
                            <button 
                                onClick={() => { setDepositMethod('TOKENZ'); setAmount(''); }}
                                disabled={depositStatus === 'PROCESSING'}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${depositMethod === 'TOKENZ' ? 'bg-white text-amber-600 shadow-sm' : 'text-earth-500 hover:text-earth-800'}`}
                            >
                                <Coins size={16} /> Pay with Tokenz
                            </button>
                            <button 
                                onClick={() => { setDepositMethod('FIAT'); setAmount(''); }}
                                disabled={depositStatus === 'PROCESSING'}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${depositMethod === 'FIAT' ? 'bg-white text-blue-600 shadow-sm' : 'text-earth-500 hover:text-earth-800'}`}
                            >
                                <CreditCard size={16} /> Fiat Deposit
                            </button>
                        </div>

                        {depositMethod === 'TOKENZ' ? (
                            <div className="space-y-4">
                                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex justify-between items-center">
                                    <div>
                                        <p className="text-xs font-bold text-amber-700 uppercase">Available Balance</p>
                                        <p className="text-xl font-bold text-amber-900">250.00 TKZ</p>
                                    </div>
                                    <Coins className="text-amber-400" size={32} />
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-earth-700 block mb-1">Transfer Amount (TKZ)</label>
                                    <input 
                                        type="number" 
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        disabled={depositStatus === 'PROCESSING'}
                                        className="w-full border border-earth-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-lg" 
                                        placeholder="0.00" 
                                    />
                                </div>
                                <button 
                                    onClick={handleDeposit}
                                    disabled={depositStatus === 'PROCESSING'}
                                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {depositStatus === 'PROCESSING' ? <><Loader2 className="animate-spin" /> Processing Transfer...</> : 'Transfer to Portfolio'}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-bold text-earth-700 block mb-1">Deposit Amount (USD)</label>
                                    <input 
                                        type="number" 
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        disabled={depositStatus === 'PROCESSING'}
                                        className="w-full border border-earth-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-lg" 
                                        placeholder="0.00" 
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => setPaymentMethod('CARD')}
                                        className={`flex items-center justify-center gap-2 border rounded-xl py-3 font-bold text-sm transition-all ${
                                            paymentMethod === 'CARD' 
                                            ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500' 
                                            : 'border-earth-200 hover:bg-earth-50 text-earth-700'
                                        }`}
                                    >
                                        <CreditCard size={16} /> Card
                                    </button>
                                    <button 
                                        onClick={() => setPaymentMethod('MOBILE')}
                                        className={`flex items-center justify-center gap-2 border rounded-xl py-3 font-bold text-sm transition-all ${
                                            paymentMethod === 'MOBILE' 
                                            ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500' 
                                            : 'border-earth-200 hover:bg-earth-50 text-earth-700'
                                        }`}
                                    >
                                        <Smartphone size={16} /> Mobile Money
                                    </button>
                                </div>
                                
                                {paymentMethod === 'MOBILE' ? (
                                     <div className="space-y-3">
                                        <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
                                             <p className="text-xs text-green-800 mb-1">Send funds to M-Pesa / Mobile Money</p>
                                             <p className="text-lg font-bold text-green-900 font-mono">EnvirosAgro Paybill</p>
                                        </div>
                                        <a 
                                            href={`tel:+254740161447`}
                                            className="block w-full bg-green-600 hover:bg-green-700 text-white text-center font-bold py-3 rounded-xl transition-all shadow-md mb-2"
                                        >
                                            <Smartphone className="inline mr-2" size={18} /> Dial Number
                                        </a>
                                        <button 
                                            onClick={handleDeposit}
                                            disabled={depositStatus === 'PROCESSING'}
                                            className="w-full border border-green-200 text-green-700 font-bold py-3 rounded-xl transition-all hover:bg-green-50"
                                        >
                                            {depositStatus === 'PROCESSING' ? <><Loader2 className="animate-spin inline mr-2" /> Verifying...</> : 'Confirm Transfer'}
                                        </button>
                                     </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
                                                <p className="text-xs text-blue-800 mb-1">Transfer to</p>
                                                <p className="text-lg font-bold text-blue-900 font-mono mb-2">EnvirosAgro Corporate Account</p>
                                                <p className="text-[10px] text-blue-600">Use this card number for direct bank transfers.</p>
                                        </div>
                                        <button 
                                            onClick={handleDeposit}
                                            disabled={depositStatus === 'PROCESSING'}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {depositStatus === 'PROCESSING' ? <><Loader2 className="animate-spin" /> Verifying Payment...</> : <><CheckCircle2 size={18} /> Process Deposit</>}
                                        </button>
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
