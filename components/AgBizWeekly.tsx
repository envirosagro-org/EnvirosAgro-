import React from 'react';
import { Newspaper, TrendingUp, TrendingDown, BarChart2, DollarSign, Mail, ArrowRight, Globe } from 'lucide-react';

const MARKET_TICKER = [
  { name: 'Wheat', price: '$218.50', change: '+1.2%', up: true },
  { name: 'Coffee (Arabica)', price: '$4.25', change: '-0.5%', up: false },
  { name: 'Maize', price: '$189.00', change: '+0.8%', up: true },
  { name: 'Fertilizer (DAP)', price: '$560.00', change: '-2.1%', up: false },
  { name: 'Brent Crude', price: '$82.40', change: '+0.3%', up: true },
];

const REPORTS = [
  {
    id: 1,
    title: "Global Supply Chain Report: Q2 2024",
    desc: "Analysis of shipping logistics bottlenecks impacting fertilizer distribution in East Africa.",
    type: "Market Analysis",
    date: "May 10, 2024",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "The Rise of Agri-Fintech in Emerging Markets",
    desc: "How mobile money is revolutionizing smallholder credit access and insurance penetration.",
    type: "Tech Trend",
    date: "May 03, 2024",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "Export Compliance: New EU Regulations",
    desc: "A guide for producers navigating the new carbon border adjustment mechanisms.",
    type: "Policy Brief",
    date: "Apr 26, 2024",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60"
  }
];

export const AgBizWeekly: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
         <div className="bg-slate-100 p-2 rounded-xl text-slate-700">
            <Newspaper size={32} />
         </div>
         <div>
            <h2 className="text-3xl font-serif font-bold text-agro-900 leading-none">AgBiz Weekly</h2>
            <p className="text-earth-500 text-sm mt-1">Market intelligence for industrial agriculture stakeholders.</p>
         </div>
      </div>

      {/* Market Ticker */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 mb-12 shadow-lg overflow-x-auto no-scrollbar">
         <div className="flex items-center gap-8 min-w-max">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-r border-slate-700 pr-4">
               <Globe size={14} /> Global Markets
            </span>
            {MARKET_TICKER.map((item, idx) => (
               <div key={idx} className="flex items-center gap-3">
                  <span className="font-bold text-sm text-slate-200">{item.name}</span>
                  <span className="font-mono text-sm">{item.price}</span>
                  <span className={`text-xs font-bold flex items-center px-1.5 py-0.5 rounded ${item.up ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                     {item.up ? <TrendingUp size={10} className="mr-1" /> : <TrendingDown size={10} className="mr-1" />}
                     {item.change}
                  </span>
               </div>
            ))}
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
         
         {/* Main Content */}
         <div className="lg:col-span-2">
            <h3 className="font-bold text-xl text-earth-900 mb-6 flex items-center gap-2">
               <BarChart2 className="text-agro-600" /> Featured Insights
            </h3>
            
            <div className="space-y-8">
               {REPORTS.map((report) => (
                  <div key={report.id} className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-2xl shadow-sm border border-earth-100 hover:shadow-md transition-all group cursor-pointer">
                     <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0">
                        <img src={report.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                     </div>
                     <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                           <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{report.type}</span>
                           <span className="text-xs text-earth-400">{report.date}</span>
                        </div>
                        <h4 className="text-lg font-bold text-earth-900 mb-2 group-hover:text-blue-700 transition-colors">
                           {report.title}
                        </h4>
                        <p className="text-earth-600 text-sm leading-relaxed mb-4">
                           {report.desc}
                        </p>
                        <button className="text-sm font-bold text-agro-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                           Read Brief <ArrowRight size={16} />
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Sidebar */}
         <div className="space-y-8">
            {/* Subscription Box */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
               <div className="relative z-10">
                  <Mail size={32} className="mb-4 text-blue-400" />
                  <h3 className="text-xl font-bold mb-2">Get the Weekly Brief</h3>
                  <p className="text-slate-300 text-sm mb-6">
                     Essential market data and policy updates delivered to your inbox every Monday morning.
                  </p>
                  <div className="space-y-3">
                     <input type="email" placeholder="Corporate Email" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 placeholder-slate-400" />
                     <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg">
                        Subscribe Free
                     </button>
                  </div>
                  <p className="text-center text-[10px] text-slate-500 mt-4">
                     Join 15,000+ industry leaders. No spam.
                  </p>
               </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white border border-earth-200 rounded-2xl p-6 shadow-sm">
               <h4 className="font-bold text-earth-900 mb-4 text-sm uppercase tracking-wider">Commodity Indices</h4>
               <ul className="space-y-3">
                  {['FAO Food Price Index', 'World Fertilizer Index', 'Global Freight Rate', 'Biofuel Demand'].map((link, i) => (
                     <li key={i} className="flex justify-between items-center text-sm group cursor-pointer">
                        <span className="text-earth-600 group-hover:text-agro-700 transition-colors">{link}</span>
                        <ArrowRight size={14} className="text-earth-300 group-hover:text-agro-600" />
                     </li>
                  ))}
               </ul>
            </div>
         </div>

      </div>
    </div>
  );
};