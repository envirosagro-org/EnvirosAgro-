
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
         
         {SUPPLY_CHAIN.length > 0 ? (
            <div className="grid lg:grid-cols-5 gap-6">
                {SUPPLY_CHAIN.map((node, index) => (
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
                                    className="mt-auto text-xs font-bold text-blue-600 border border-blue-200 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors flex items-center gap-1"
                                >
                                    View Strategy
                                </button>
                            )}

                            {node.id === 2 && (
                                <button
                                    onClick={() => setShowQualityModal(true)}
                                    className="mt-auto text-xs font-bold text-amber-600 border border-amber-200 px-4 py-2 rounded-full hover:bg-amber-50 transition-colors flex items-center gap-1"
                                >
                                    Check Standards
                                </button>
                            )}

                            {node.id === 3 && (
                                <button
                                    onClick={() => setShowProcessingModal(true)}
                                    className="mt-auto text-xs font-bold text-slate-600 border border-slate-200 px-4 py-2 rounded-full hover:bg-slate-50 transition-colors flex items-center gap-1"
                                >
                                    View Methods
                                </button>
                            )}

                            {node.id === 4 && (
                                <button
                                    onClick={() => setShowLogisticsModal(true)}
                                    className="mt-auto text-xs font-bold text-green-600 border border-green-200 px-4 py-2 rounded-full hover:bg-green-50 transition-colors flex items-center gap-1"
                                >
                                    Track Fleet
                                </button>
                            )}

                            {node.id === 5 && (
                                <button
                                    onClick={() => setShowDistributionModal(true)}
                                    className="mt-auto text-xs font-bold text-rose-600 border border-rose-200 px-4 py-2 rounded-full hover:bg-rose-50 transition-colors flex items-center gap-1"
                                >
                                    View Network
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
         ) : (
            <div className="text-center py-16 bg-earth-50 rounded-2xl border border-earth-100 relative z-10">
                <Truck size={48} className="mx-auto text-earth-300 mb-4" />
                <h3 className="text-lg font-bold text-earth-600">Supply Network Data Updating</h3>
                <p className="text-earth-500 text-sm">We are currently re-mapping our logistics nodes. Please check back soon for the updated visual chain.</p>
            </div>
         )}
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
            <div className="relative h-full min-h-[300px] bg-white/10 rounded-2xl overflow-hidden border border-white/10">
                 {/* Abstract Map Visualization */}
                 <div className="absolute inset-0 flex items-center justify-center text-agro-200">
                     <div className="text-center">
                        <BarChart size={64} className="mx-auto mb-4 opacity-50" />
                        <p>Live Supply Chain Map Visualization</p>
                     </div>
                 </div>
            </div>
         </div>
      </div>

      {/* Strategic Purchasing Modal */}
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
                    <p className="text-earth-600 text-sm">
                        Our sourcing strategy prioritizes long-term relationships, fair pricing, and strict adherence to the Five Thrusts framework.
                    </p>
                    
                    <div className="grid gap-4">
                        <div className="flex gap-4 p-4 rounded-xl border border-blue-100 bg-white hover:shadow-md transition-shadow">
                            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg h-fit">
                                <Search size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900 mb-1">1. Demand Analysis</h4>
                                <p className="text-xs text-earth-600">
                                    AI-driven forecasting utilizing market trends and historical consumption data to prevent overstocking and waste.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-xl border border-blue-100 bg-white hover:shadow-md transition-shadow">
                            <div className="bg-green-100 text-green-600 p-3 rounded-lg h-fit">
                                <Leaf size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900 mb-1">2. Supplier Vetting</h4>
                                <p className="text-xs text-earth-600">
                                    All suppliers must meet a minimum Sustainability Coefficient C(a) score. We verify labor practices and environmental impact.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-xl border border-blue-100 bg-white hover:shadow-md transition-shadow">
                            <div className="bg-amber-100 text-amber-600 p-3 rounded-lg h-fit">
                                <FileText size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900 mb-1">3. Smart Contracts</h4>
                                <p className="text-xs text-earth-600">
                                    Transparent, blockchain-backed agreements ensure guaranteed payments upon delivery verification, protecting smallholder farmers.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-xl border border-blue-100 bg-white hover:shadow-md transition-shadow">
                            <div className="bg-purple-100 text-purple-600 p-3 rounded-lg h-fit">
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900 mb-1">4. Order Fulfillment</h4>
                                <p className="text-xs text-earth-600">
                                    Automated purchase orders trigger logistics workflows immediately, reducing lead times and preserving freshness.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
                        <p className="text-xs font-bold text-blue-800 mb-2">Are you a supplier?</p>
                        <button 
                            onClick={() => onNavigate && onNavigate(View.PARTNERSHIPS)}
                            className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                            Register as Vendor
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Aggregation Quality Modal */}
      {showQualityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-amber-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-amber-50 p-6 border-b border-amber-100 flex justify-between items-center">
                    <h3 className="font-bold text-xl text-amber-900 flex items-center gap-2">
                        <Package className="text-amber-600" /> Aggregation & Quality Standards
                    </h3>
                    <button onClick={() => setShowQualityModal(false)} className="text-amber-400 hover:text-amber-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-8 space-y-6">
                    <p className="text-earth-600 text-sm">
                        Our centralized collection centers utilize advanced technology to ensure fair payments and premium product quality.
                    </p>
                    
                    <div className="grid gap-4">
                        <div className="flex gap-4 p-4 rounded-xl border border-amber-100 bg-white hover:shadow-md transition-shadow">
                            <div className="bg-amber-100 text-amber-600 p-3 rounded-lg h-fit">
                                <Scale size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900 mb-1">1. Digital Weighing & Payment</h4>
                                <p className="text-xs text-earth-600">
                                    Integrated with mobile money for instant, transparent farmer payments based on exact weight measurements.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-xl border border-amber-100 bg-white hover:shadow-md transition-shadow">
                            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg h-fit">
                                <Scan size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900 mb-1">2. Optical Grading</h4>
                                <p className="text-xs text-earth-600">
                                    AI-powered cameras sort produce by size, color, and ripeness to ensure uniformity and reduce manual handling.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-xl border border-amber-100 bg-white hover:shadow-md transition-shadow">
                            <div className="bg-green-100 text-green-600 p-3 rounded-lg h-fit">
                                <Microscope size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900 mb-1">3. Quality Lab Testing</h4>
                                <p className="text-xs text-earth-600">
                                    Random sampling for moisture content, sugar levels (Brix), and rapid contaminant screening on site.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-xl border border-amber-100 bg-white hover:shadow-md transition-shadow">
                            <div className="bg-slate-100 text-slate-600 p-3 rounded-lg h-fit">
                                <QrCode size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900 mb-1">4. Batch Traceability</h4>
                                <p className="text-xs text-earth-600">
                                    Assigning a unique digital ID (QR Code) to every aggregated lot for full supply chain visibility back to the source.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-center">
                        <p className="text-xs font-bold text-amber-800 mb-2">Want to learn more?</p>
                        <button 
                            onClick={() => onNavigate && onNavigate(View.SUSTAINABILITY_FRAMEWORK)}
                            className="w-full bg-amber-600 text-white font-bold py-2 rounded-lg text-sm hover:bg-amber-700 transition-colors"
                        >
                            View Quality Certifications
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Sustainable Processing Modal */}
      {showProcessingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-xl text-slate-900 flex items-center gap-2">
                        <Factory className="text-slate-600" /> Sustainable Processing
                    </h3>
                    <button onClick={() => setShowProcessingModal(false)} className="text-slate-400 hover:text-slate-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-8 space-y-6">
                    <p className="text-earth-600 text-sm">
                        Our value-addition facilities focus on minimizing carbon footprint while maximizing product longevity and nutritional retention.
                    </p>
                    
                    <div className="grid gap-4">
                        <div className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:shadow-md transition-shadow">
                            <div className="bg-amber-100 text-amber-600 p-3 rounded-lg h-fit">
                                <Sun size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900 mb-1">1. Hybrid Solar Drying</h4>
                                <p className="text-xs text-earth-600">
                                    Utilizing passive solar energy combined with biomass backup to dry grains and fruits, reducing fossil fuel use by 90%.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:shadow-md transition-shadow">
                            <div className="bg-green-100 text-green-600 p-3 rounded-lg h-fit">
                                <Recycle size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900 mb-1">2. Waste-to-Energy</h4>
                                <p className="text-xs text-earth-600">
                                    Coffee husks and macadamia shells are converted into briquettes to fuel factory boilers, creating a circular energy loop.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:shadow-md transition-shadow">
                            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg h-fit">
                                <RefreshCw size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900 mb-1">3. Water Recovery</h4>
                                <p className="text-xs text-earth-600">
                                    Advanced filtration systems recycle 80% of processing water, treating effluents before releasing them back to nature.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:shadow-md transition-shadow">
                            <div className="bg-purple-100 text-purple-600 p-3 rounded-lg h-fit">
                                <Zap size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900 mb-1">4. Smart Efficiency</h4>
                                <p className="text-xs text-earth-600">
                                    IoT sensors monitor energy spikes in real-time, optimizing machinery schedules to reduce grid load.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                        <p className="text-xs font-bold text-slate-800 mb-2">See Technology in Action</p>
                        <button 
                            onClick={() => onNavigate && onNavigate(View.SMART_FARM_VR)}
                            className="w-full bg-slate-800 text-white font-bold py-2 rounded-lg text-sm hover:bg-slate-700 transition-colors"
                        >
                            Virtual Factory Tour
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Green Logistics Modal */}
      {showLogisticsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-green-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-green-50 p-6 border-b border-green-100 flex justify-between items-center">
                    <h3 className="font-bold text-xl text-green-900 flex items-center gap-2">
                        <Truck className="text-green-600" /> Green Logistics Network
                    </h3>
                    <button onClick={() => setShowLogisticsModal(false)} className="text-green-400 hover:text-green-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-8 space-y-6">
                    <p className="text-earth-600 text-sm">
                        Our logistics network prioritizes carbon reduction through electric vehicles and AI-driven route optimization.
                    </p>
                    
                    <div className="grid gap-4">
                        <div className="flex gap-4 p-4 rounded-xl border border-green-100 bg-white hover:shadow-md transition-shadow">
                            <div className="bg-green-100 text-green-600 p-3 rounded-lg h-fit">
                                <Leaf size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900 mb-1">1. Electric Vehicle Fleet</h4>
                                <p className="text-xs text-earth-600">
                                    Deploying 50+ electric trucks for short-haul aggregation, reducing last-mile emissions by 100%.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-xl border border-green-100 bg-white hover:shadow-md transition-shadow">
                            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg h-fit">
                                <Map size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900 mb-1">2. AI Route Optimization</h4>
                                <p className="text-xs text-earth-600">
                                    Algorithms calculate the most fuel-efficient paths, reducing distance traveled by 15% on average.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-xl border border-green-100 bg-white hover:shadow-md transition-shadow">
                            <div className="bg-amber-100 text-amber-600 p-3 rounded-lg h-fit">
                                <Thermometer size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900 mb-1">3. Solar Cold Chain</h4>
                                <p className="text-xs text-earth-600">
                                    Refrigerated units powered by roof-mounted solar panels to maintain produce freshness without idling.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-xl border border-green-100 bg-white hover:shadow-md transition-shadow">
                            <div className="bg-slate-100 text-slate-600 p-3 rounded-lg h-fit">
                                <BarChart size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900 mb-1">4. Carbon Impact Ledger</h4>
                                <p className="text-xs text-earth-600">
                                    Every kilometer is logged, providing transparent carbon footprint data for every batch delivered.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
                        <p className="text-xs font-bold text-green-800 mb-2">Monitor Live Operations</p>
                        <button 
                            onClick={() => onNavigate && onNavigate(View.DASHBOARD)}
                            className="w-full bg-green-600 text-white font-bold py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                        >
                            Open Fleet Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Global Market Distribution Modal */}
      {showDistributionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-rose-50 p-6 border-b border-rose-100 flex justify-between items-center">
                    <h3 className="font-bold text-xl text-rose-900 flex items-center gap-2">
                        <Store className="text-rose-600" /> Global Market Distribution
                    </h3>
                    <button onClick={() => setShowDistributionModal(false)} className="text-rose-400 hover:text-rose-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-8 space-y-6">
                    <p className="text-earth-600 text-sm">
                        Connecting sustainable producers to conscious consumers worldwide through a transparent, multi-channel network.
                    </p>
                    
                    <div className="grid gap-4">
                        <div className="flex gap-4 p-4 rounded-xl border border-rose-100 bg-white hover:shadow-md transition-shadow">
                            <div className="bg-rose-100 text-rose-600 p-3 rounded-lg h-fit">
                                <Smartphone size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900 mb-1">1. Direct-to-Consumer (DTC)</h4>
                                <p className="text-xs text-earth-600">
                                    Our "Farm-to-Fork" mobile app allows consumers to order fresh produce directly from local hubs, bypassing traditional middlemen.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-xl border border-rose-100 bg-white hover:shadow-md transition-shadow">
                            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg h-fit">
                                <Store size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900 mb-1">2. Retail Partnerships</h4>
                                <p className="text-xs text-earth-600">
                                    Securing premium shelf space in certified supermarkets for EnvirosAgro branded value-added products.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-xl border border-rose-100 bg-white hover:shadow-md transition-shadow">
                            <div className="bg-green-100 text-green-600 p-3 rounded-lg h-fit">
                                <Globe size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900 mb-1">3. Wholesale Exports</h4>
                                <p className="text-xs text-earth-600">
                                    Consolidating bulk volumes of coffee, tea, and macadamia for export to international markets with full organic certification.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-xl border border-rose-100 bg-white hover:shadow-md transition-shadow">
                            <div className="bg-amber-100 text-amber-600 p-3 rounded-lg h-fit">
                                <Tag size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900 mb-1">4. Traceability Marketing</h4>
                                <p className="text-xs text-earth-600">
                                    Every product carries a QR code revealing its journey, environmental impact score, and the specific farmer group origin.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 text-center">
                        <p className="text-xs font-bold text-rose-800 mb-2">Access Market Data</p>
                        <button 
                            onClick={() => onNavigate && onNavigate(View.AGBIZ_WEEKLY)}
                            className="w-full bg-rose-600 text-white font-bold py-2 rounded-lg text-sm hover:bg-rose-700 transition-colors"
                        >
                            View Live Prices
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
