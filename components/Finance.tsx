import React, { useState } from 'react';
import { Users, Leaf, ShieldPlus, Cpu, Factory, PiggyBank, Coins, TrendingUp, Wallet, ArrowUpRight, Gem, Fingerprint, CheckCircle2, ArrowRightLeft, Smartphone, Building2, Globe, Mail, Newspaper, CreditCard, Loader2, X } from 'lucide-react';
import { View, User } from '../types';

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
    user: User | null;
    onNavigate?: (view: View) => void;
}

export const Finance: React.FC<FinanceProps> = ({ user, onNavigate }) => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositMethod, setDepositMethod] = useState<'TOKENZ' | 'FIAT'>('TOKENZ');
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);
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
      setTimeout(() => {
          setPortfolioValue(prev => prev + val);
          const newTransaction = {
              id: Date.now(),
              type: 'Deposit',
              amount: val,
              method: paymentMethod,
              date: new Date().toLocaleTimeString(),
              currency: depositMethod === 'TOKENZ' ? 'TKZ' : 'USD'
          };
          setTransactions(prev => [newTransaction, ...prev]);
          setDepositStatus('SUCCESS');
          setTimeout(() => {
              setShowDepositModal(false);
              setDepositStatus('IDLE');
              setAmount('');
          }, 2000);
      }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
           <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100"><Coins className="text-amber-600" size={32} /></div>
              <h2 className="text-4xl font-serif font-bold text-agro-900">Agro Finance</h2>
           </div>
           <p className="text-xl text-earth-600 max-w-2xl">Powered by <strong>Tokenz™</strong> — Innovative financial solutions to fuel sustainable growth.</p>
        </div>
        <div className="flex gap-4">
            <div className="bg-amber-50 px-6 py-4 rounded-2xl border border-amber-100">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1 flex items-center gap-2"><Gem size={14} /> My EAC Balance</p>
                <p className="text-3xl font-serif font-bold text-agro-900">{user?.eacBalance || 0}</p>
            </div>
            <div className="bg-blue-50 px-6 py-4 rounded-2xl border border-blue-100">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1 flex items-center gap-2"><Wallet size={14} /> Portfolio</p>
                <p className="text-3xl font-serif font-bold text-agro-900">${portfolioValue.toLocaleString()}</p>
            </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            {FINANCIAL_PRODUCTS.map((category) => (
                <div key={category.id} className={`p-6 rounded-2xl border ${category.border} ${category.bg}`}>
                    <div className="flex items-center gap-3 mb-6"><div className="bg-white p-2 rounded-xl shadow-sm text-current">{category.icon}</div><h3 className={`text-xl font-bold ${category.text}`}>{category.title}</h3></div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {category.products.map((prod, idx) => (
                            <div key={idx} onClick={() => setShowDepositModal(true)} className="bg-white/60 p-4 rounded-xl hover:bg-white transition-all cursor-pointer border border-transparent hover:border-black/5 hover:shadow-sm">
                                <div className="flex justify-between items-start mb-2"><h4 className="font-bold text-earth-900">{prod.name}</h4><span className="text-xs font-bold bg-white px-2 py-1 rounded text-agro-700 shadow-sm">{prod.rate}</span></div>
                                <p className="text-sm text-earth-600">{prod.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        <div className="space-y-6">
            <div className="bg-gradient-to-br from-amber-500 to-amber-700 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                <Coins size={120} className="absolute -bottom-10 -right-10 opacity-20" />
                <h3 className="text-2xl font-bold mb-2">Tokenz Exchange</h3>
                <p className="text-amber-100 mb-6 text-sm">The digital asset powering the agricultural economy.</p>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setShowDepositModal(true)} className="bg-white text-amber-700 font-bold py-2 rounded-xl hover:bg-amber-50 transition-colors text-sm shadow-sm">Buy Tokenz</button>
                    <button onClick={() => onNavigate && onNavigate(View.CARBON_LEDGER)} className="bg-amber-800/50 text-white border border-amber-400/30 font-bold py-2 rounded-xl hover:bg-amber-800 transition-colors text-sm">Swap EAC</button>
                </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-earth-200 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-3 mb-4"><div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Fingerprint size={24} /></div><h3 className="font-bold text-lg text-earth-900">Digital ID</h3></div>
                <p className="text-earth-600 text-sm mb-6">Your <strong>ESIN</strong> acts as your secure wallet address.</p>
                <button onClick={() => onNavigate && onNavigate(View.COMMUNITY)} className="w-full border border-blue-200 text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors">View My Digital ID</button>
            </div>

            <div className="bg-agro-900 text-white p-8 rounded-3xl">
                <PiggyBank size={48} className="mb-4 text-agro-300" />
                <h3 className="text-2xl font-bold mb-2">Eligibility Checker</h3>
                <div className="space-y-3">
                    <button onClick={() => onNavigate && onNavigate(View.SUSTAINABILITY_FRAMEWORK)} className="w-full bg-agro-500 hover:bg-agro-400 text-white font-bold py-3 rounded-xl transition-colors">Check My m-score</button>
                </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-earth-200 shadow-sm">
                <button onClick={() => onNavigate && onNavigate(View.INVESTOR_PORTAL)} className="w-full border border-earth-200 text-earth-700 font-bold py-3 rounded-xl hover:bg-earth-50 transition-colors flex items-center justify-center gap-2">
                    <Wallet size={18} /> Investor Portal <ArrowUpRight size={16} />
                </button>
            </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="p-6 border-b border-earth-100 flex justify-between items-center bg-blue-50">
                  <h3 className="font-bold text-xl text-blue-900 flex items-center gap-2"><Wallet className="text-blue-600" /> Fund Wallet</h3>
                  <button onClick={() => setShowDepositModal(false)} className="text-blue-400 hover:text-blue-700 transition-colors"><X size={24} /></button>
               </div>
               <div className="p-6">
                  {depositStatus === 'SUCCESS' ? (
                      <div className="text-center py-8">
                          <CheckCircle2 size={48} className="text-green-600 mx-auto mb-4" />
                          <h3 className="text-2xl font-bold text-earth-900">Success!</h3>
                          <button onClick={() => setShowDepositModal(false)} className="mt-6 bg-blue-600 text-white font-bold py-2 px-8 rounded-lg">Close</button>
                      </div>
                  ) : (
                      <div className="space-y-4">
                          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border border-earth-200 rounded-xl px-4 py-3 font-mono text-lg" placeholder="Enter Amount" />
                          <button onClick={handleDeposit} disabled={depositStatus === 'PROCESSING'} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2">
                              {depositStatus === 'PROCESSING' ? <Loader2 className="animate-spin" /> : 'Confirm Deposit'}
                          </button>
                      </div>
                  )}
               </div>
            </div>
         </div>
      )}
    </div>
  );
};