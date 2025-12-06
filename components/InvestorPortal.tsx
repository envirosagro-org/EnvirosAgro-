import React from 'react';
import { TrendingUp, PieChart, ArrowUpRight, DollarSign, Leaf, Globe, ShieldCheck, Download, Plus } from 'lucide-react';
import { PieChart as RePie, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const PORTFOLIO_DATA = [
  { name: 'Green Bonds', value: 45, color: '#16a34a' },
  { name: 'Direct Equity', value: 30, color: '#2563eb' },
  { name: 'Carbon Credits', value: 15, color: '#ca8a04' },
  { name: 'Cash', value: 10, color: '#94a3b8' },
];

const OPPORTUNITIES = [
  {
    id: 1,
    title: "Solar Irrigation Grid Expansion",
    location: "Turkana, Kenya",
    sector: "Infrastructure (TA)",
    target: "$500,000",
    raised: "$325,000",
    roi: "6.5% Est.",
    risk: "Low",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "Organic Macadamia Processing Plant",
    location: "Embu, Kenya",
    sector: "Industrial (IA)",
    target: "$1.2M",
    raised: "$800,000",
    roi: "8.2% Est.",
    risk: "Medium",
    image: "https://images.unsplash.com/photo-1504198266287-165943f376d8?w=800&auto=format&fit=crop&q=60"
  }
];

export const InvestorPortal: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
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
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg">
                <Plus size={18} /> Deposit Funds
            </button>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
         
         {/* Stats Cards */}
         <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-earth-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-earth-500 text-sm uppercase tracking-wider">Total Asset Value</h3>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                        <TrendingUp size={12} /> +12.4%
                    </span>
                </div>
                <div className="text-4xl font-serif font-bold text-earth-900 mb-2">$142,500.00</div>
                <p className="text-earth-400 text-xs">Last updated: Today, 09:30 AM</p>
            </div>
            
            <div className="bg-white p-6 rounded-3xl border border-earth-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-earth-500 text-sm uppercase tracking-wider">Total Impact Generated</h3>
                    <Leaf size={16} className="text-green-600" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-2xl font-bold text-earth-900">450 t</div>
                        <div className="text-xs text-earth-500">CO2 Offset</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-earth-900">125</div>
                        <div className="text-xs text-earth-500">Jobs Supported</div>
                    </div>
                </div>
            </div>

            {/* Asset Allocation Chart */}
            <div className="bg-white p-6 rounded-3xl border border-earth-100 shadow-sm md:col-span-2 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                    <h3 className="font-bold text-earth-900 mb-2">Portfolio Allocation</h3>
                    <p className="text-sm text-earth-500 mb-6">Diversification across sustainable asset classes.</p>
                    <div className="space-y-3">
                        {PORTFOLIO_DATA.map((entry) => (
                            <div key={entry.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: entry.color}}></div>
                                    <span className="text-earth-700 font-medium">{entry.name}</span>
                                </div>
                                <span className="font-bold text-earth-900">{entry.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="h-48 w-48 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <RePie>
                            <Pie data={PORTFOLIO_DATA} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                {PORTFOLIO_DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </RePie>
                    </ResponsiveContainer>
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
                     <button className="w-full bg-white text-agro-900 font-bold py-3 rounded-xl hover:bg-agro-100 transition-colors">
                         View Audit Logs
                     </button>
                 </div>
             </div>
         </div>
      </div>

      {/* Opportunities Marketplace */}
      <div>
          <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-earth-900">Open Opportunities</h3>
              <button className="text-blue-600 font-bold text-sm hover:underline">View All</button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
              {OPPORTUNITIES.map((opp) => (
                  <div key={opp.id} className="bg-white rounded-3xl border border-earth-100 overflow-hidden hover:shadow-lg transition-all group">
                      <div className="h-48 relative overflow-hidden">
                          <img src={opp.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-earth-800 shadow-sm flex items-center gap-1">
                              <Globe size={12} /> {opp.location}
                          </div>
                      </div>
                      <div className="p-6">
                          <div className="flex justify-between items-start mb-2">
                              <div>
                                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1 block">{opp.sector}</span>
                                  <h4 className="text-xl font-bold text-earth-900">{opp.title}</h4>
                              </div>
                              <div className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm font-bold">
                                  {opp.roi}
                              </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 my-6 py-4 border-y border-earth-50">
                              <div>
                                  <span className="text-xs text-earth-400 uppercase font-bold block mb-1">Target</span>
                                  <span className="font-mono font-bold text-earth-700">{opp.target}</span>
                              </div>
                              <div>
                                  <span className="text-xs text-earth-400 uppercase font-bold block mb-1">Raised</span>
                                  <span className="font-mono font-bold text-earth-700">{opp.raised}</span>
                              </div>
                              <div>
                                  <span className="text-xs text-earth-400 uppercase font-bold block mb-1">Risk</span>
                                  <span className="font-bold text-green-600">{opp.risk}</span>
                              </div>
                          </div>

                          <div className="flex gap-4">
                              <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors">
                                  Invest Now
                              </button>
                              <button className="px-4 py-3 border border-earth-200 rounded-xl hover:bg-earth-50 text-earth-600 transition-colors">
                                  <ArrowUpRight size={20} />
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