import React, { useState } from 'react';
import { Users, Leaf, ShieldPlus, Cpu, Factory, Truck, Package, Thermometer, BarChart, ShoppingCart, Store, BookOpen, ClipboardCheck, GraduationCap, X, CheckCircle2, Search, FileText, Microscope, QrCode, Scale, Scan, Sun, Recycle, RefreshCw, Zap, Map, Globe, Smartphone, Tag } from 'lucide-react';
import { View } from '../types';

const SUPPLY_CHAIN = [
  {
    id: 1,
    title: "Strategic Purchasing",
    icon: <ShoppingCart size={24} />,
    color: "bg-blue-50 border-blue-200 text-blue-800",
    stats: "Vol: 500k Tons",
    description: "Procurement of raw materials from registered farmer groups using fair-trade protocols and smart contracts."
  },
  {
    id: 2,
    title: "Aggregation & Quality",
    icon: <Package size={24} />,
    color: "bg-amber-50 border-amber-200 text-amber-800",
    stats: "98% Purity",
    description: "Centralized collection points where produce is graded, cleaned, and batched for processing."
  },
  {
    id: 3,
    title: "Sustainable Processing",
    icon: <Factory size={24} />,
    color: "bg-slate-50 border-slate-200 text-slate-800",
    stats: "Zero Waste",
    description: "Value addition facilities transforming raw inputs into shelf-stable goods with minimal environmental footprint."
  },
  {
    id: 4,
    title: "Green Logistics",
    icon: <Truck size={24} />,
    color: "bg-green-50 border-green-200 text-green-800",
    stats: "Fleet: 50 EVs",
    description: "Low-carbon transportation network optimizing routes from hubs to markets using live tracking."
  },
  {
    id: 5,
    title: "Market Distribution",
    icon: <Store size={24} />,
    color: "bg-rose-50 border-rose-200 text-rose-800",
    stats: "Global Reach",
    description: "Delivering finished products to retailers, wholesalers, and direct consumers with full traceability."
  }
];

interface SupplyProps {
    onNavigate?: (view: View) => void;
}

export const Supply: React.FC<SupplyProps> = ({ onNavigate }) => {
  const [showPurchasingModal, setShowPurchasingModal] = useState(false);
  const [showQualityModal, setShowQualityModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [showLogisticsModal, setShowLogisticsModal] = useState(false);
  const [showDistributionModal, setShowDistributionModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold text-agro-900 mb-4">Supply Network</h2>
        <p className="text-xl text-earth-600 max-w-3xl mx-auto">
          A resilient, integrated supply chain framework designed to deliver value securely and sustainably.
        </p>
      </div>

      {/* Visual Chain */}
      <div className="relative mb-20">
         <div className="absolute top-1/2 left-0 w-full h-1 bg-earth-200 -z-10 hidden lg:block transform -translate-y-1/2 rounded-full"></div>
         
         <div className="grid lg:grid-cols-5 gap-6">
            {SUPPLY_CHAIN.map((node) => (
                <div key={node.id} className="relative group">
                    <div className={`bg-white border-2 ${node.color.split(' ')[0]} p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all h-full flex flex-col items-center text-center`}>
                        <div className={`mb-4 p-4 rounded-full ${node.color} text-earth-800`}>
                            {node.icon}
                        </div>
                        <h3 className="font-bold text-earth-900 mb-2">{node.title}</h3>
                        <div className="text-xs font-bold text-agro-600 uppercase tracking-wide mb-3 bg-earth-50 px-2 py-1 rounded">
                            {node.stats}
                        </div>
                        <p className="text-earth-600 text-sm leading-relaxed mb-4">
                            {node.description}
                        </p>
                        
                        {node.id === 1 && (
                            <button
                                onClick={() => setShowPurchasingModal(true)}
                                className="mt-auto text-xs font-bold text-blue-600 border border-blue-200 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors flex items-center justify-center gap-1 w-full"
                            >
                                View Strategy
                            </button>
                        )}

                        {node.id === 2 && (
                            <button
                                onClick={() => setShowQualityModal(true)}
                                className="mt-auto text-xs font-bold text-amber-600 border border-amber-200 px-4 py-2 rounded-full hover:bg-amber-50 transition-colors flex items-center justify-center gap-1 w-full"
                            >
                                Check Standards
                            </button>
                        )}

                        {node.id === 3 && (
                            <button
                                onClick={() => setShowProcessingModal(true)}
                                className="mt-auto text-xs font-bold text-slate-600 border border-slate-200 px-4 py-2 rounded-full hover:bg-slate-50 transition-colors flex items-center justify-center gap-1 w-full"
                            >
                                View Methods
                            </button>
                        )}

                        {node.id === 4 && (
                            <button
                                onClick={() => setShowLogisticsModal(true)}
                                className="mt-auto text-xs font-bold text-green-600 border border-green-200 px-4 py-2 rounded-full hover:bg-green-50 transition-colors flex items-center justify-center gap-1 w-full"
                            >
                                Track Fleet
                            </button>
                        )}

                        {node.id === 5 && (
                            <button
                                onClick={() => setShowDistributionModal(true)}
                                className="mt-auto text-xs font-bold text-rose-600 border border-rose-200 px-4 py-2 rounded-full hover:bg-rose-50 transition-colors flex items-center justify-center gap-1 w-full"
                            >
                                View Network
                            </button>
                        )}
                    </div>
                </div>
            ))}
         </div>
      </div>

      {/* Logistics Features */}
      <div className="bg-earth-900 text-white rounded-3xl p-10 lg:p-16">
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                <h3 className="text-3xl font-serif font-bold mb-6">Optimized for Reliability</h3>
                <ul className="space-y-6">
                    <li className="flex gap-4">
                        <div className="bg-agro-600 p-3 rounded-xl h-fit"><Truck size={24} /></div>
                        <div>
                            <h4 className="font-bold text-lg">Last-Mile Delivery</h4>
                            <p className="text-agro-100 text-sm">Reaching remote farms via a network of local micro-hubs.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="bg-agro-600 p-3 rounded-xl h-fit"><Thermometer size={24} /></div>
                        <div>
                            <h4 className="font-bold text-lg">Active Temp Control</h4>
                            <p className="text-agro-100 text-sm">Ensuring integrity of vaccines and bio-agents during transit.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="bg-agro-600 p-3 rounded-xl h-fit"><Package size={24} /></div>
                        <div>
                            <h4 className="font-bold text-lg">Bulk & Retail Packaging</h4>
                            <p className="text-agro-100 text-sm">Flexible solutions for both industrial clients and smallholder farmers.</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="relative h-full min-h-[300px] bg-white/10 rounded-2xl overflow-hidden border border-white/10 group cursor-pointer" onClick={() => onNavigate && onNavigate(View.FARM_SCOUT)}>
                 <div className="absolute inset-0 flex items-center justify-center text-agro-200 group-hover:text-white transition-colors">
                     <div className="text-center">
                        <BarChart size={64} className="mx-auto mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        <p className="font-bold">Live Supply Chain Map Visualization</p>
                        <p className="text-xs text-agro-400 mt-2">Click to Enter Farm Analytics</p>
                     </div>
                 </div>
            </div>
         </div>
      </div>

      {/* Modals with Active Buttons */}
      {showPurchasingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-blue-50 p-6 border-b border-blue-100 flex justify-between items-center">
                    <h3 className="font-bold text-xl text-blue-900 flex items-center gap-2">
                        <ShoppingCart className="text-blue-600" /> Strategic Purchasing Protocol
                    </h3>
                    <button onClick={() => setShowPurchasingModal(false)} className="text-blue-400 hover:text-blue-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-8 space-y-6">
                    <div className="grid gap-4">
                        {/* Purchasing Steps */}
                        {[
                          { icon: <Search />, title: "1. Demand Analysis", desc: "AI-driven forecasting utilizing market trends." },
                          { icon: <Leaf />, title: "2. Supplier Vetting", desc: "Verification of labor and environmental impact." },
                          { icon: <FileText />, title: "3. Smart Contracts", desc: "Blockchain-backed agreements for payment security." },
                          { icon: <CheckCircle2 />, title: "4. Fulfillment", desc: "Automated orders triggering logistics workflows." }
                        ].map((step, i) => (
                           <div key={i} className="flex gap-4 p-4 rounded-xl border border-blue-100 bg-white">
                               <div className="bg-blue-100 text-blue-600 p-3 rounded-lg h-fit">{step.icon}</div>
                               <div><h4 className="font-bold text-earth-900 mb-1">{step.title}</h4><p className="text-xs text-earth-600">{step.desc}</p></div>
                           </div>
                        ))}
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
                        <p className="text-xs font-bold text-blue-800 mb-2">Are you a supplier?</p>
                        <button onClick={() => onNavigate && onNavigate(View.PARTNERSHIPS)} className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">Register as Vendor</button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {showQualityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-amber-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-amber-50 p-6 border-b border-amber-100 flex justify-between items-center">
                    <h3 className="font-bold text-xl text-amber-900 flex items-center gap-2"><Package className="text-amber-600" /> Quality Standards</h3>
                    <button onClick={() => setShowQualityModal(false)} className="text-amber-400 hover:text-amber-700"><X size={24} /></button>
                </div>
                <div className="p-8 space-y-6">
                    <div className="grid gap-4">
                        <div className="flex gap-4 p-4 rounded-xl border border-amber-100 bg-white"><div className="bg-amber-100 text-amber-600 p-3 rounded-lg h-fit"><Scale size={20} /></div><div><h4 className="font-bold text-earth-900 mb-1">Digital Weighing</h4><p className="text-xs text-earth-600">Integrated with mobile money for instant payment.</p></div></div>
                        <div className="flex gap-4 p-4 rounded-xl border border-amber-100 bg-white"><div className="bg-blue-100 text-blue-600 p-3 rounded-lg h-fit"><Scan size={20} /></div><div><h4 className="font-bold text-earth-900 mb-1">Optical Grading</h4><p className="text-xs text-earth-600">AI cameras sort produce by size and quality.</p></div></div>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-center">
                        <button onClick={() => onNavigate && onNavigate(View.SUSTAINABILITY_FRAMEWORK)} className="w-full bg-amber-600 text-white font-bold py-2 rounded-lg text-sm hover:bg-amber-700 transition-colors">View Quality Certifications</button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {showProcessingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-xl text-slate-900 flex items-center gap-2"><Factory className="text-slate-600" /> Sustainable Processing</h3>
                    <button onClick={() => setShowProcessingModal(false)} className="text-slate-400 hover:text-slate-700"><X size={24} /></button>
                </div>
                <div className="p-8 space-y-6">
                    <div className="grid gap-4">
                        <div className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-white"><div className="bg-green-100 text-green-600 p-3 rounded-lg h-fit"><Recycle size={20} /></div><div><h4 className="font-bold text-earth-900 mb-1">Zero Waste</h4><p className="text-xs text-earth-600">Husks and shells converted into energy briquettes.</p></div></div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                        <button onClick={() => onNavigate && onNavigate(View.SMART_FARM_VR)} className="w-full bg-slate-800 text-white font-bold py-2 rounded-lg text-sm hover:bg-slate-700 transition-colors">Virtual Factory Tour</button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {showLogisticsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-green-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-green-50 p-6 border-b border-green-100 flex justify-between items-center">
                    <h3 className="font-bold text-xl text-green-900 flex items-center gap-2"><Truck className="text-green-600" /> Green Logistics</h3>
                    <button onClick={() => setShowLogisticsModal(false)} className="text-green-400 hover:text-green-700"><X size={24} /></button>
                </div>
                <div className="p-8 space-y-6">
                    <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
                        <button onClick={() => onNavigate && onNavigate(View.DASHBOARD)} className="w-full bg-green-600 text-white font-bold py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">Open Fleet Dashboard</button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {showDistributionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-rose-50 p-6 border-b border-rose-100 flex justify-between items-center">
                    <h3 className="font-bold text-xl text-rose-900 flex items-center gap-2"><Store className="text-rose-600" /> Global Distribution</h3>
                    <button onClick={() => setShowDistributionModal(false)} className="text-rose-400 hover:text-rose-700"><X size={24} /></button>
                </div>
                <div className="p-8 space-y-6">
                    <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 text-center">
                        <button onClick={() => onNavigate && onNavigate(View.AGBIZ_WEEKLY)} className="w-full bg-rose-600 text-white font-bold py-2 rounded-lg text-sm hover:bg-rose-700 transition-colors">View Live Prices</button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};