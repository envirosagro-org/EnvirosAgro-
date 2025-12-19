import React, { useState } from 'react';
import { 
  Newspaper, TrendingUp, TrendingDown, BarChart2, DollarSign, Mail, 
  ArrowRight, Globe, ArrowLeft, Share2, Bookmark, Clock, CheckCircle2, Loader2, X 
} from 'lucide-react';

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
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=60",
    content: `
      The second quarter of 2024 has seen unprecedented challenges in regional fertilizer distribution. Logistical bottlenecks at major transshipment hubs have led to a 15% increase in lead times for DAP and NPK deliveries to smallholder societies in the Kiriaini sector.

      ### Key Industrial Constraints
      Our technical audit indicates that the primary constraint is not a lack of raw material, but a disconnect between port telemetry and last-mile logistics fleets. This misalignment results in 'haphazard distribution' patterns that increase the overall cost of production for individual farm blocks.

      ### Strategic Recommendations
      1. **Digitize Fleet Management**: Integration of the TA thrust's IoT sensors on all transit containers to provide real-time location deltas.
      2. **Decentralized Storage**: Establishment of micro-hubs in high-yield zones to buffer against port delays.
      3. **Smart Contracts**: Utilizing Tokenz™ to automate payment releases upon verified delivery, reducing the financial lag that currently plagues the supply chain.

      Data-driven synchronization remains the most actionable variable in increasing regional m(t) resilience scores for the coming harvest season.
    `
  },
  {
    id: 2,
    title: "The Rise of Agri-Fintech in Emerging Markets",
    desc: "How mobile money is revolutionizing smallholder credit access and insurance penetration.",
    type: "Tech Trend",
    date: "May 03, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60",
    content: `
      Financial technology is closing the gap between subsistence and industrial agriculture. In the last 12 months, the adoption of digital assets within the EnvirosAgro network has facilitated over $4.2M in peer-to-peer micro-grants.

      ### The Tokenz™ Impact
      By utilizing our proprietary Tokenz layer, farmers are bypassing traditional banking barriers. The ability to swap EAC (earned from sustainable practices) for fiat or technical equipment is creating a self-sustaining economy.

      ### Future Outlook
      We anticipate that "Credit Based on Resilience" (CBR) will become the new global standard. Investors are increasingly looking at m(t) scores as a more accurate predictor of loan repayment than traditional collateral.
    `
  },
  {
    id: 3,
    title: "Export Compliance: New EU Regulations",
    desc: "A guide for producers navigating the new carbon border adjustment mechanisms.",
    type: "Policy Brief",
    date: "Apr 26, 2024",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60",
    content: `
      New international regulations mandate a verifiable digital audit trail for all agricultural imports into the European zone. EnvirosAgro's Supply Chain Audit tool is now calibrated to these new standards.

      ### Compliance Pillars
      - **Traceability**: Every batch must have a unique ESIN fingerprint.
      - **Carbon Ledger**: Verified sequestration data from the EA thrust.
      - **Health Safety**: Pathogen-free certification via the HA thrust diagnostics.

      Failure to comply with these digital mandates will result in a 20% tariff increase on non-standardized produce. We recommend all industrial partners run a Gap Analysis immediately.
    `
  }
];

export const AgBizWeekly: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS'>('IDLE');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus('LOADING');
    // Simulate API call to the industrial network
    setTimeout(() => {
      setSubStatus('SUCCESS');
      setEmail('');
      setTimeout(() => setSubStatus('IDLE'), 4000);
    }, 2000);
  };

  const renderReportDetail = (report: any) => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => setSelectedReport(null)}
        className="mb-8 flex items-center gap-2 text-earth-500 hover:text-blue-600 font-bold transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Newsroom
      </button>

      <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden mb-12">
        <div className="relative aspect-video md:h-[450px] w-full bg-slate-900">
           <img src={report.image} className="w-full h-full object-cover opacity-70" alt={report.title} />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
           <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
              <div className="flex gap-3 mb-4">
                 <span className="bg-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{report.type}</span>
                 <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">Industrial Data</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6">{report.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 font-bold uppercase tracking-wider">
                 <span className="flex items-center gap-2"><Globe size={16} /> Market Intel</span>
                 <span className="flex items-center gap-2"><Clock size={16} /> {report.readTime}</span>
                 <span className="flex items-center gap-2"><Newspaper size={16} /> {report.date}</span>
              </div>
           </div>
        </div>
        
        <div className="p-8 md:p-16 max-w-4xl mx-auto">
           <div className="prose prose-lg prose-slate max-w-none">
              <div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-medium text-lg">
                {report.content}
              </div>
           </div>
           
           <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-center">
              <div className="flex gap-4">
                 <button className="p-3 bg-slate-50 rounded-full text-slate-400 hover:text-blue-600 transition-colors">
                    <Share2 size={24} />
                 </button>
                 <button className="p-3 bg-slate-50 rounded-full text-slate-400 hover:text-blue-600 transition-colors">
                    <Bookmark size={24} />
                 </button>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-agro-600 uppercase tracking-widest">
                 <CheckCircle2 size={16} /> Verified Industrial Analysis
              </div>
           </div>
        </div>
      </div>
      
      <h3 className="text-2xl font-serif font-bold text-slate-900 mb-8">Related Briefs</h3>
      <div className="grid md:grid-cols-2 gap-8">
         {REPORTS.filter(p => p.id !== report.id).map(related => (
           <div key={related.id} onClick={() => { setSelectedReport(related); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-lg transition-all cursor-pointer group flex gap-6">
              <img src={related.image} className="w-24 h-24 object-cover rounded-2xl shrink-0" alt={related.title} />
              <div>
                <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{related.title}</h4>
                <p className="text-xs text-slate-500 uppercase font-black tracking-widest">{related.date}</p>
              </div>
           </div>
         ))}
      </div>
    </div>
  );

  if (selectedReport) {
    return renderReportDetail(selectedReport);
  }

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
                  <div key={report.id} className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-2xl shadow-sm border border-earth-100 hover:shadow-md transition-all group">
                     <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0">
                        <img src={report.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={report.title} />
                     </div>
                     <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                           <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{report.type}</span>
                           <span className="text-xs text-earth-400">{report.date}</span>
                        </div>
                        <h4 className="text-lg font-bold text-earth-900 mb-2 leading-tight">
                           {report.title}
                        </h4>
                        <p className="text-earth-600 text-sm leading-relaxed mb-4 line-clamp-2">
                           {report.desc}
                        </p>
                        <button 
                          onClick={() => setSelectedReport(report)}
                          className="text-sm font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all uppercase tracking-widest"
                        >
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
               <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Mail size={150} /></div>
               <div className="relative z-10">
                  <Mail size={32} className="mb-4 text-blue-400" />
                  <h3 className="text-xl font-bold mb-2">Get the Weekly Brief</h3>
                  <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                     Essential market data, m(t) indices, and industrial policy updates delivered directly.
                  </p>
                  
                  {subStatus === 'SUCCESS' ? (
                    <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 flex items-center gap-3 animate-in zoom-in">
                       <CheckCircle2 size={24} className="text-green-400 shrink-0" />
                       <p className="text-xs font-bold text-green-100">Subscription Active. Welcome to the industrial network.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="space-y-3">
                       <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Corporate Email" 
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 text-white transition-all" 
                       />
                       <button 
                          type="submit"
                          disabled={subStatus === 'LOADING'}
                          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-3.5 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 text-xs uppercase tracking-widest disabled:opacity-50"
                       >
                          {subStatus === 'LOADING' ? <><Loader2 size={16} className="animate-spin" /> Syncing Gateway...</> : 'Subscribe Free'}
                       </button>
                    </form>
                  )}
                  
                  <p className="text-center text-[10px] text-slate-500 mt-6 font-black uppercase tracking-widest opacity-60">
                     Join 15k+ Global Stakeholders
                  </p>
               </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white border border-earth-200 rounded-3xl p-8 shadow-sm">
               <h4 className="font-black text-slate-900 mb-6 text-[10px] uppercase tracking-[0.25em] border-b border-earth-100 pb-3 flex justify-between items-center">
                  Commodity Indices <TrendingUp size={14} className="text-blue-600" />
               </h4>
               <ul className="space-y-5">
                  {[
                    { label: 'FAO Food Price Index', val: '118.4' },
                    { label: 'World Fertilizer Index', val: '245.2' },
                    { label: 'Global Freight Rate', val: '$2,400' },
                    { label: 'Biofuel Demand', val: '+4.2%' }
                  ].map((link, i) => (
                     <li key={i} className="flex justify-between items-center text-sm group cursor-pointer">
                        <span className="text-earth-600 group-hover:text-blue-600 transition-colors font-bold">{link.label}</span>
                        <div className="flex items-center gap-3">
                           <span className="font-mono text-xs text-slate-400 group-hover:text-blue-600">{link.val}</span>
                           <ArrowRight size={14} className="text-earth-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </div>
                     </li>
                  ))}
               </ul>
            </div>
         </div>

      </div>
    </div>
  );
};
