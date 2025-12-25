import React, { useState } from 'react';
import { AgBizHeader } from './agbizweekly/AgBizHeader';
import { MarketBriefing } from './agbizweekly/MarketBriefing';
import { ReportList } from './agbizweekly/ReportList';
import { ReportDetail } from './agbizweekly/ReportDetail';
import { SubscriptionBox } from './agbizweekly/SubscriptionBox';
import { CommodityIndices } from './agbizweekly/CommodityIndices';
import { MarketTicker } from './agbizweekly/MarketTicker';

const REPORTS = [
  {
    id: 1,
    title: "The Wheat Gap: Supply Chain Fragility in 2024",
    category: "Strategic Report",
    date: "Oct 12, 2024",
    author: "Dr. Sarah Miller",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=60",
    excerpt: "An in-depth analysis of global wheat reserves and the impact of geopolitical shifts on secondary export markets.",
    content: "The global wheat market is currently navigating a period of unprecedented volatility. While production in the Northern Hemisphere has reached record highs in certain quadrants, the infrastructure for dissemination remains under severe strain. Our recent telemetry indicates a 15% bottleneck at major shipping hubs, compounded by shifting trade alliances in the EA sector. For industrial stakeholders, the primary risk remains currency fluctuations in emerging markets which are driving up input costs for small-to-medium scale cooperatives. This report outlines three mitigation strategies: direct bilateral trade agreements, decentralized storage nodes, and the adoption of tokenized forward contracts to hedge against localized inflation.",
    tags: ["Logistics", "Economics", "Industrial Ag"]
  },
  {
    id: 2,
    title: "Mechanization Trends in Sub-Saharan Ag",
    category: "Market Watch",
    date: "Oct 10, 2024",
    author: "James Mwangi",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?w=800&auto=format&fit=crop&q=60",
    excerpt: "Exploring the rise of shared-economy tractor models and autonomous field units across the continent.",
    content: "The adoption of mechanization across East Africa is no longer driven solely by large-scale commercial estates. We are seeing a profound shift towards 'Tractor-as-a-Service' models, enabled by real-time GPS tracking and mobile payment integration. This democratization of hardware is projected to increase regional productivity by 40% within the IA thrust's five-year roadmap. Key players in the sector are currently pivoting towards ruggedized, solar-powered units that require minimal maintenance in remote field conditions. The financial infrastructure supporting these acquisitions is also evolving, with multi-stakeholder credit risk modeling replacing traditional collateral requirements.",
    tags: ["Tech-Ag", "Investment", "Development"]
  },
  {
    id: 3,
    title: "Regenerative Carbon: The New Asset Class",
    category: "Finance & Sustainability",
    date: "Oct 08, 2024",
    author: "Elena Rossi",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60",
    excerpt: "How industrial agriculture is leveraging soil sequestration to participate in global carbon markets.",
    content: "Soil organic carbon (SOC) is rapidly transitioning from an environmental metric to a core financial asset. Industrial agricultural enterprises that can demonstrably increase SOC through regenerative practices are now eligible for premium tier carbon offsets. The EA-Thrust verification protocols provide the necessary transparency for these assets to be traded on global exchanges. However, the challenge remains in standardized measurement across diverse soil types. This report details the integration of remote sensing and ground-truth sensor arrays to provide high-fidelity audits for institutional investors looking to diversify their ESG portfolios through agricultural sequestration.",
    tags: ["Carbon", "ESG", "Finance"]
  }
];

const TICKER_DATA = [
  "WHEAT (SRW) 584.25 +2.4%",
  "CORN (ZCN) 428.50 -0.5%",
  "SOYBEANS (ZSN) 1184.75 +1.1%",
  "COFFEE (KC) 184.20 -0.8%",
  "SUGAR (SB) 22.15 +4.5%",
  "COTTON (CT) 82.40 +0.2%"
];

export const AgBizWeekly: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<typeof REPORTS[0] | null>(null);
  const [isSubscribing, setIsSubscribing] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      
      <AgBizHeader />

      <MarketTicker items={TICKER_DATA} />

      <div className="grid lg:grid-cols-3 gap-12 mb-24">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-serif font-black text-earth-900 dark:text-white mb-8 border-l-4 border-agro-600 pl-6">Deep Dive Analysis</h2>
          <ReportList 
            reports={REPORTS} 
            onSelect={setSelectedReport} 
          />
        </div>
        <div className="lg:col-span-1 space-y-12">
          <div className="sticky top-32">
            <CommodityIndices />
            <SubscriptionBox 
              isSubscribing={isSubscribing} 
              setIsSubscribing={setIsSubscribing} 
            />
          </div>
        </div>
      </div>

      <MarketBriefing />

      {selectedReport && (
        <ReportDetail 
          report={selectedReport} 
          onClose={() => setSelectedReport(null)} 
        />
      )}

      {/* Industrial Archive Grid */}
      <div className="mt-24 border-t border-earth-100 dark:border-earth-800 pt-16">
        <div className="flex items-center justify-between mb-12 px-2">
           <div>
              <h3 className="text-3xl font-serif font-black text-earth-900 dark:text-white">Historical Archive</h3>
              <p className="text-earth-500 dark:text-earth-400 mt-2">Access past issues and strategic datasets.</p>
           </div>
           <button className="text-[10px] font-black uppercase tracking-widest text-agro-600 bg-agro-50 px-8 py-4 rounded-xl hover:bg-agro-100 transition-all">
              Browse All Issues
           </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[1, 2, 3].map(i => (
              <div key={i} className="group bg-white dark:bg-earth-900 p-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 hover:border-agro-500/30 transition-all hover:shadow-xl cursor-pointer">
                 <div className="flex justify-between items-start mb-6">
                    <span className="text-[9px] font-black text-earth-400 uppercase tracking-widest">Issue #{142 - i}</span>
                    <span className="text-[9px] font-bold text-agro-600 uppercase tracking-widest px-2 py-1 bg-agro-50 rounded-lg">PDF • 8MB</span>
                 </div>
                 <h4 className="text-xl font-bold text-earth-900 dark:text-white mb-4 group-hover:text-agro-600 transition-colors">Strategic Q{4-i} Forecast: Commodities & Climate</h4>
                 <p className="text-sm text-earth-500 dark:text-earth-400 line-clamp-3 mb-8">Analyzing the convergence of El Niño patterns and global trade logistics in the final quarter...</p>
                 <div className="flex items-center gap-3 text-[10px] font-black text-earth-400 uppercase tracking-widest group-hover:text-agro-600 transition-colors">
                    Download Archive <div className="p-2 bg-earth-50 dark:bg-earth-800 rounded-lg group-hover:bg-agro-600 group-hover:text-white transition-all">↓</div>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};
