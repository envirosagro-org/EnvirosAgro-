import React, { useState } from 'react';
import { Newspaper } from 'lucide-react';

import { MarketTicker } from './agbizweekly/MarketTicker';
import { ReportList } from './agbizweekly/ReportList';
import { ReportDetail } from './agbizweekly/ReportDetail';
import { SubscriptionBox } from './agbizweekly/SubscriptionBox';
import { CommodityIndices } from './agbizweekly/CommodityIndices';

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
    setTimeout(() => {
      setSubStatus('SUCCESS');
      setEmail('');
      setTimeout(() => setSubStatus('IDLE'), 4000);
    }, 2000);
  };

  if (selectedReport) {
    return (
      <ReportDetail
        report={selectedReport}
        allReports={REPORTS}
        onBack={() => setSelectedReport(null)}
        onSelectReport={setSelectedReport}
      />
    );
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

      <MarketTicker tickerItems={MARKET_TICKER} />

      <div className="grid lg:grid-cols-3 gap-12">
        <ReportList reports={REPORTS} onSelectReport={setSelectedReport} />

        <div className="space-y-8">
          <SubscriptionBox
            email={email}
            setEmail={setEmail}
            subStatus={subStatus}
            handleSubscribe={handleSubscribe}
          />
          <CommodityIndices />
        </div>
      </div>
    </div>
  );
};
