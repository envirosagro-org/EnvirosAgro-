import React from 'react';
import { Users, Leaf, ShieldPlus, Cpu, Factory, Truck, Package, Thermometer, BarChart, ShoppingCart } from 'lucide-react';

const SUPPLY_CHAIN: any[] = [];

export const Supply: React.FC = () => {
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
                            <p className="text-earth-600 text-sm leading-relaxed">
                                {node.description}
                            </p>
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
    </div>
  );
};