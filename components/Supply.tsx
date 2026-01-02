import React from 'react';
import { Users, Leaf, ShieldPlus, Cpu, Factory, Truck, Package, Thermometer, BarChart, ShoppingCart, Store, BookOpen, ClipboardCheck, GraduationCap, X, CheckCircle2, Search, FileText, Microscope, QrCode, Scale, Scan, Sun, Recycle, RefreshCw, Zap, Map, Globe, Smartphone, Tag, Wifi } from 'lucide-react';
import { View } from '../types';
import { SupplyChainVisualizer } from './supply-chain/SupplyChainVisualizer';

interface SupplyProps {
    onNavigate?: (view: View) => void;
}

export const Supply: React.FC<SupplyProps> = ({ onNavigate }) => {

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold text-agro-900 mb-4">Supply Network</h2>
        <p className="text-xl text-earth-600 max-w-3xl mx-auto">
          A resilient, integrated supply chain framework designed to deliver value securely and sustainably.
        </p>
      </div>

      <SupplyChainVisualizer onNavigate={onNavigate} />

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
                    <li className="flex gap-4">
                        <div className="bg-agro-600 p-3 rounded-xl h-fit"><Wifi size={24} /></div>
                        <div>
                            <h4 className="font-bold text-lg">IoT-Enabled Fleet</h4>
                            <p className="text-agro-100 text-sm">Real-time tracking of location, temperature, and vehicle health.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="bg-agro-600 p-3 rounded-xl h-fit"><Zap size={24} /></div>
                        <div>
                            <h4 className="font-bold text-lg">Carbon Footprint Tracking</h4>
                            <p className="text-agro-100 text-sm">Live monitoring of emissions per kilometer for sustainable logistics.</p>
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
    </div>
  );
};