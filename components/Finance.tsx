
import React, { useState } from 'react';
import { Users, Leaf, ShieldPlus, Cpu, Factory, PiggyBank, Coins, TrendingUp, Wallet, ArrowUpRight, Gem, Fingerprint, CheckCircle2, ArrowRightLeft, Smartphone, Building2, Globe, Mail, Newspaper, CreditCard, Loader2, X } from 'lucide-react';
import { View } from '../types';

const FINANCIAL_PRODUCTS = [
  {
    id: 'SA',
    title: 'Community Grants (SA)',
    icon: <Users size={28} />,
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    text: 'text-rose-900',
    products: [
        { name: 'Cooperative Seed Fund', desc: 'Micro-grants for starting local farming co-ops.', rate: 'Grant (No Repayment)' },
        { name: 'Education Stipends', desc: 'Funding for agricultural training workshops.', rate: 'Grant' }
    ]
  },
  {
    id: 'EA',
    title: 'Green Financing (EA)',
    icon: <Leaf size={28} />,
    bg: 'bg-green-50',
    border: 'border-green-100',
    text: 'text-green-900',
    products: [
        { name: 'Carbon Credit Advance', desc: 'Upfront capital against future carbon sequestration.', rate: '2.5% APR' },
        { name: 'Regenerative Transition Loan', desc: 'Long-term financing for soil health improvements.', rate: '3.0% APR' }
    ]
  },
  {
    id: 'HA',
    title: 'Health & Risk (HA)',
    icon: <ShieldPlus size={28} />,
    bg: 'bg-red-50',
    border: 'border-red-100',
    text: 'text-red-900',
    products: [
        { name: 'Crop Resilience Insurance', desc: 'Coverage against pests and disease outbreaks.', rate: 'Premium based' },
        { name: 'Worker Safety Fund', desc: 'Low-interest loans for PPE and safety equipment.', rate: '1.5% APR' }
    ]
  },
  {
    id: 'TA',
    title: 'Tech Leasing (TA)',
    icon: <Cpu size={28} />,
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    text: 'text-blue-900',
    products: [
        { name: 'Smart Equipment Lease', desc: 'Pay-per-use financing for drones and sensors.', rate: 'Flexible Terms' },
        { name: 'Digital Adoption Loan', desc: 'Capital for farm management software integration.', rate: '4.0% APR' }
    ]
  },
  {
    id: 'IA',
    title: 'Industrial Capital (IA)',
    icon: <Factory size={28} />,
    bg: 'bg-slate-50',
    border: 'border-slate-100',
    text: 'text-slate-900',
    products: [
        { name: 'Supply Chain Factoring', desc: 'Immediate cash flow for invoiced goods.', rate: 'Market Rate' },
        { name: 'Infrastructure CAPEX', desc: 'Large-scale loans for processing facilities.', rate: 'Prime + 1%' }
    ]
  }
];

interface FinanceProps {
    onNavigate?: (view: View) => void;
}

export const Finance: React.FC<FinanceProps> = ({ onNavigate }) => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositMethod, setDepositMethod] = useState<'TOKENZ' | 'FIAT'>('TOKENZ');
  
  // Portfolio State
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [totalImpact, setTotalImpact] = useState(0);
  
  // Transaction History State
  const [transactions, setTransactions] = useState<any[]>([]);
  
  // Deposit State
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'MOBILE' | 'PAYPAL'>('CARD');
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
          
          let methodLabel = paymentMethod === 'CARD' ? 'EnvirosAgro Visa' : paymentMethod === 'MOBILE' ? 'Mobile Money' : 'PayPal';
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
              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100">
                  <Coins className="text-amber-600" size={32} />
              </div>
              <h2 className="text-4xl font-serif font-bold text-agro-900">Agro Finance</h2>
           </div>
           <p className="text-xl text-earth-600 max-w-2xl">
             Powered by <strong>Tokenz™</strong> — Innovative financial solutions and digital assets designed to de-risk sustainability and fuel growth across all five thrusts.
           </p>
        </div>
        <div className="bg-amber-50 px-6 py-4 rounded-2xl border border-amber-100">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1 flex items-center gap-2">
                <Gem size={14} /> Tokenz Liquidity Pool
            </p>
            <p className="text-3xl font-serif font-bold text-agro-900">$12.5 Million</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Product Cards */}
        <div className="lg:col-span-2 space-y-6">
            {FINANCIAL_PRODUCTS.map((category) => (
                <div key={category.id} className={`p-6 rounded-2xl border ${category.border} ${category.bg} transition-all`}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-white p-2 rounded-xl shadow-sm text-current">
                            {category.icon}
                        </div>
                        <h3 className={`text-xl font-bold ${category.text}`}>{category.title}</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                        {category.products.map((prod, idx) => (
                            <div key={idx} className="bg-white/60 p-4 rounded-xl hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-black/5">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-earth-900">{prod.name}</h4>
                                    <span className="text-xs font-bold bg-white px-2 py-1 rounded text-agro-700 shadow-sm whitespace-nowrap">{prod.rate}</span>
                                </div>
                                <p className="text-sm text-earth-600">{prod.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
            
            {/* Tokenz Promo Card */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-700 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                <Coins size={120} className="absolute -bottom-10 -right-10 opacity-20" />
                <h3 className="text-2xl font-bold mb-2 relative z-10">Introducing Tokenz</h3>
                <p className="text-amber-100 mb-6 text-sm relative z-10 leading-relaxed">
                    The digital asset powering the agricultural economy. Secure, transparent, and built for the future of farming finance.
                </p>
                <div className="bg-white/10 rounded-xl p-4 mb-6 backdrop-blur-sm relative z-10">
                    <div className="flex justify-between items-center text-sm font-bold mb-2">
                        <span>1 TKZ</span>
                        <span>= 1.00 USD</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-amber-200">
                        <span>EnvirosAgro Coin (EAC)</span>
                        <span>Mining...</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 relative z-10">
                    <button className="bg-white text-amber-700 font-bold py-2 rounded-xl hover:bg-amber-50 transition-colors text-sm shadow-sm">
                        Buy Tokenz
                    </button>
                    <button className="bg-amber-800/50 text-white border border-amber-400/30 font-bold py-2 rounded-xl hover:bg-amber-800 transition-colors text-sm">
                        Swap EAC
                    </button>
                </div>
                <div className="mt-4 text-center relative z-10">
                    <p className="text-xs text-amber-200">
                        Community Action = <span className="font-bold text-white">EAC Mining</span>
                    </p>
                </div>
            </div>

            {/* Tokenz Bridge / External Providers */}
            <div className="bg-white p-8 rounded-3xl border border-earth-200 shadow-sm">
                <h3 className="font-bold text-lg text-earth-900 mb-4 flex items-center gap-2">
                    <ArrowRightLeft className="text-agro-600" /> Tokenz Bridge
                </h3>
                <p className="text-earth-600 text-sm mb-6">
                    Seamlessly exchange and transfer value between Tokenz and trusted external financial partners.
                </p>
                <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 rounded-xl border border-earth-100 hover:border-agro-200 hover:bg-agro-50 transition-all group">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-lg text-green-700 group-hover:bg-white"><Smartphone size={18} /></div>
                            <span className="font-bold text-earth-700 text-sm">Mobile Money (M-Pesa)</span>
                        </div>
                        <ArrowUpRight size={16} className="text-earth-400 group-hover:text-agro-600" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-xl border border-earth-100 hover:border-agro-200 hover:bg-agro-50 transition-all group">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-lg text-blue-700 group-hover:bg-white"><Building2 size={18} /></div>
                            <span className="font-bold text-earth-700 text-sm">Local Banks</span>
                        </div>
                        <ArrowUpRight size={16} className="text-earth-400 group-hover:text-agro-600" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-xl border border-earth-100 hover:border-agro-200 hover:bg-agro-50 transition-all group">
                        <div className="flex items-center gap-3">
                            <div className="bg-indigo-100 p-2 rounded-lg text-indigo-700 group-hover:bg-white"><Globe size={18} /></div>
                            <span className="font-bold text-earth-700 text-sm">International Wire</span>
                        </div>
                        <ArrowUpRight size={16} className="text-earth-400 group-hover:text-agro-600" />
                    </button>
                </div>
            </div>

            {/* Payment Gateways */}
            <div className="bg-white p-8 rounded-3xl border border-earth-200 shadow-sm">
                <h3 className="font-bold text-lg text-earth-900 mb-4 flex items-center gap-2">
                    <CreditCard className="text-agro-600" /> Payment Gateways
                </h3>
                <p className="text-earth-600 text-sm mb-6">
                    Manage connected methods for purchasing products and services.
                </p>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-earth-50 border border-earth-100">
                        <div className="flex items-center gap-3">
                            <CreditCard size={24} className="text-slate-600" />
                            <span className="font-bold text-earth-700 text-sm">Visa / Mastercard</span>
                        </div>
                        <button className="text-xs font-bold text-agro-600 hover:underline">Manage</button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-earth-50 border border-earth-100">
                        <div className="flex items-center gap-3">
                            <Globe size={24} className="text-blue-600" />
                            <div>
                                <span className="font-bold text-earth-700 text-sm block">PayPal</span>
                            </div>
                        </div>
                        <a 
                            href="https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=9STR6FS6XBLVY&currency_code=USD" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-agro-600 hover:underline"
                        >
                            Pay Now
                        </a>
                    </div>
                     <div className="flex items-center justify-between p-3 rounded-xl bg-earth-50 border border-earth-100">
                        <div className="flex items-center gap-3">
                            <Smartphone size={24} className="text-green-600" />
                             <div>
                                <span className="font-bold text-earth-700 text-sm block">Mobile Money</span>
                            </div>
                        </div>
                         <a 
                            href="tel:+254740161447"
                            className="text-xs font-bold text-agro-600 hover:underline"
                        >
                            Pay Now
                        </a>
                    </div>
                </div>
            </div>

            {/* Digital ID Integration */}
            <div className="bg-white p-8 rounded-3xl border border-earth-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Fingerprint size={100} />
                </div>
                <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                        <Fingerprint size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-earth-900">Identity-Linked Wallet</h3>
                </div>
                <p className="text-earth-600 text-sm mb-6 relative z-10">
                    Your <strong>EnvirosAgro Social ID (ESIN)</strong> acts as your secure, immutable wallet address for all Tokenz transactions.
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-green-700 bg-green-50 p-3 rounded-xl mb-4 relative z-10">
                    <CheckCircle2 size={16} /> ESIN Connected
                </div>
                <button className="w-full border border-blue-200 text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors relative z-10">
                    View My Digital ID
                </button>
            </div>

            {/* Eligibility Checker */}
            <div className="bg-agro-900 text-white p-8 rounded-3xl">
                <PiggyBank size={48} className="mb-4 text-agro-300" />
                <h3 className="text-2xl font-bold mb-2">Check Eligibility</h3>
                <p className="text-agro-100 mb-6 text-sm">
                    Find out which grants or loans your farm qualifies for based on your sustainability score (m-score).
                </p>
                <div className="space-y-3">
                    <input type="text" placeholder="Farm ID / Email" className="w-full px-4 py-3 rounded-xl text-earth-900 text-sm focus:outline-none" />
                    <button className="w-full bg-agro-500 hover:bg-agro-400 text-white font-bold py-3 rounded-xl transition-colors">
                        Verify Now
                    </button>
                </div>
            </div>

            {/* Impact Investment Info */}
            <div className="bg-white p-8 rounded-3xl border border-earth-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="text-blue-600" />
                    <h3 className="font-bold text-lg text-earth-900">For Investors</h3>
                </div>
                <p className="text-earth-600 text-sm mb-6">
                    Looking to fund sustainable agriculture? Explore our Green Bond program yielding 4-6% annually.
                </p>
                <button 
                    onClick={() => onNavigate && onNavigate(View.INVESTOR_PORTAL)}
                    className="w-full border border-earth-200 text-earth-700 font-bold py-3 rounded-xl hover:bg-earth-50 transition-colors flex items-center justify-center gap-2"
                >
                    <Wallet size={18} /> Investor Portal <ArrowUpRight size={16} />
                </button>
            </div>

        </div>
      </div>

      {/* DEPOSIT MODAL */}
      {showDepositModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="p-6 border-b border-earth-100 flex justify-between items-center bg-blue-50">
                  <h3 className="font-bold text-xl text-blue-900 flex items-center gap-2">
                     <Wallet className="text-blue-600" /> Fund Investment Wallet
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
                                <div className="grid grid-cols-3 gap-2">
                                    <button 
                                        onClick={() => setPaymentMethod('CARD')}
                                        className={`flex items-center justify-center gap-1 border rounded-xl py-3 font-bold text-xs transition-all ${
                                            paymentMethod === 'CARD' 
                                            ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500' 
                                            : 'border-earth-200 hover:bg-earth-50 text-earth-700'
                                        }`}
                                    >
                                        <CreditCard size={14} /> Card
                                    </button>
                                    <button 
                                        onClick={() => setPaymentMethod('MOBILE')}
                                        className={`flex items-center justify-center gap-1 border rounded-xl py-3 font-bold text-xs transition-all ${
                                            paymentMethod === 'MOBILE' 
                                            ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500' 
                                            : 'border-earth-200 hover:bg-earth-50 text-earth-700'
                                        }`}
                                    >
                                        <Smartphone size={14} /> Mobile
                                    </button>
                                     <button 
                                        onClick={() => setPaymentMethod('PAYPAL')}
                                        className={`flex items-center justify-center gap-1 border rounded-xl py-3 font-bold text-xs transition-all ${
                                            paymentMethod === 'PAYPAL' 
                                            ? 'border-blue-600 bg-blue-100 text-blue-800 ring-1 ring-blue-600' 
                                            : 'border-earth-200 hover:bg-earth-50 text-earth-700'
                                        }`}
                                    >
                                        <Globe size={14} /> PayPal
                                    </button>
                                </div>
                                {paymentMethod === 'PAYPAL' ? (
                                    <a 
                                        href={`https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=9STR6FS6XBLVY&currency_code=USD&amount=${amount}`}
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                                    >
                                        <Globe size={18} /> Continue to PayPal
                                    </a>
                                ) : paymentMethod === 'MOBILE' ? (
                                     <div className="space-y-3">
                                        <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
                                             <p className="text-xs text-green-800 mb-1">Send funds to</p>
                                             <p className="text-lg font-bold text-green-900 font-mono mb-2">EnvirosAgro Paybill</p>
                                             <p className="text-[10px] text-green-600">After sending, click 'Confirm Transaction' below.</p>
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
                                            {depositStatus === 'PROCESSING' ? <><Loader2 className="animate-spin inline mr-2" /> Verifying...</> : 'Confirm Transaction'}
                                        </button>
                                     </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
                                                <p className="text-xs text-blue-800 mb-1">Transfer to</p>
                                                <p className="text-lg font-bold text-blue-900 font-mono mb-2">EnvirosAgro Corporate Account</p>
                                                <p className="text-[10px] text-blue-600">Use this for direct bank transfers.</p>
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
