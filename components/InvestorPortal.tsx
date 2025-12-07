
import React, { useState } from 'react';
import { TrendingUp, PieChart, ArrowUpRight, DollarSign, Leaf, Globe, ShieldCheck, Download, Plus, Coins, CreditCard, X, Smartphone } from 'lucide-react';
import { PieChart as RePie, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const PORTFOLIO_DATA = [
  // Empty State
];

const OPPORTUNITIES: any[] = [
  // Empty State
];

export const InvestorPortal: React.FC = () => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositMethod, setDepositMethod] = useState<'TOKENZ' | 'FIAT'>('TOKENZ');

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

      {/* Portfolio Overview - Empty State */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
         
         {/* Stats Cards */}
         <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-earth-100 shadow-sm flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-earth-500 text-sm uppercase tracking-wider">Total Asset Value</h3>
                </div>
                <div className="text-4xl font-serif font-bold text-earth-900 mb-2">$0.00</div>
                <p className="text-earth-400 text-xs">Waiting for initial deposit...</p>
            </div>
            
            <div className="bg-white p-6 rounded-3xl border border-earth-100 shadow-sm flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-earth-500 text-sm uppercase tracking-wider">Total Impact Generated</h3>
                    <Leaf size={16} className="text-green-600" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-earth-400">
                    <div>
                        <div className="text-2xl font-bold">--</div>
                        <div className="text-xs">CO2 Offset</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">--</div>
                        <div className="text-xs">Jobs Supported</div>
                    </div>
                </div>
            </div>

            {/* Asset Allocation Chart - Empty State */}
            <div className="bg-white p-6 rounded-3xl border border-earth-100 shadow-sm md:col-span-2 flex items-center justify-center text-center h-64">
                <div>
                    <PieChart size={48} className="mx-auto text-earth-200 mb-4" />
                    <h3 className="text-earth-500 font-bold mb-1">No Active Investments</h3>
                    <p className="text-xs text-earth-400">Deposit funds to start building your green portfolio.</p>
                </div>
            </div>
         </div>

         {/* Right Sidebar: Quick Actions */}
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
                  <div className="flex gap-2 mb-6 bg-earth-50 p-1 rounded-xl">
                      <button 
                        onClick={() => setDepositMethod('TOKENZ')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${depositMethod === 'TOKENZ' ? 'bg-white text-amber-600 shadow-sm' : 'text-earth-500 hover:text-earth-800'}`}
                      >
                          <Coins size={16} /> Pay with Tokenz
                      </button>
                      <button 
                        onClick={() => setDepositMethod('FIAT')}
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
                              <input type="number" className="w-full border border-earth-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-lg" placeholder="0.00" />
                          </div>
                          <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl transition-all shadow-md">
                              Transfer to Portfolio
                          </button>
                      </div>
                  ) : (
                      <div className="space-y-4">
                          <div>
                              <label className="text-sm font-bold text-earth-700 block mb-1">Deposit Amount (USD)</label>
                              <input type="number" className="w-full border border-earth-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-lg" placeholder="0.00" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                              <button className="flex items-center justify-center gap-2 border border-earth-200 rounded-xl py-3 hover:bg-earth-50 font-bold text-sm text-earth-700">
                                  <CreditCard size={16} /> Card
                              </button>
                              <button className="flex items-center justify-center gap-2 border border-earth-200 rounded-xl py-3 hover:bg-earth-50 font-bold text-sm text-earth-700">
                                  <Smartphone size={16} /> Mobile Money
                              </button>
                          </div>
                          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md">
                              Process Deposit
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
