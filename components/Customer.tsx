
import React, { useState } from 'react';
import { 
  ScanBarcode, CheckCircle2, MapPin, Calendar, Star, ShieldCheck, Leaf, Cpu, Users, 
  Heart, MessageCircle, BookOpen, ShoppingBag, X, Activity, FileText, ShieldPlus, 
  Sprout, Microscope, Zap, Wifi, Database, Handshake, ArrowRight, Download
} from 'lucide-react';
import { View } from '../types';

const CUSTOMER_SEGMENTS = [
  {
    id: 1,
    title: "Smallholder Farmer",
    focus: "Community & Subsistence",
    thrust: "Social Ag (SA)",
    quote: "I need affordable seeds and a market for my surplus without middlemen taking all the profit.",
    icon: <Users size={32} className="text-rose-600" />,
    bg: "bg-rose-50",
    border: "border-rose-100"
  },
  {
    id: 2,
    title: "Health-Conscious Family",
    focus: "Safety & Nutrition",
    thrust: "Health Ag (HA)",
    quote: "My priority is chemical-free food for my children. I want to know exactly where it came from.",
    icon: <ShieldCheck size={32} className="text-red-600" />,
    bg: "bg-red-50",
    border: "border-red-100"
  },
  {
    id: 3,
    title: "Regenerative Farmer",
    focus: "Soil Health & Ecology",
    thrust: "Environmental Ag (EA)",
    quote: "Restoring my land's biodiversity is an investment. I need inputs that heal the soil, not harm it.",
    icon: <Leaf size={32} className="text-green-600" />,
    bg: "bg-green-50",
    border: "border-green-100"
  },
  {
    id: 4,
    title: "Industrial Producer",
    focus: "Scale & Efficiency",
    thrust: "Technical Ag (TA)",
    quote: "I manage 500 acres. I need data-driven insights and automated supply chains to optimize yield.",
    icon: <Cpu size={32} className="text-blue-600" />,
    bg: "bg-blue-50",
    border: "border-blue-100"
  }
];

interface CustomerProps {
    onNavigate?: (view: View) => void;
}

export const Customer: React.FC<CustomerProps> = ({ onNavigate }) => {
  const [traceId, setTraceId] = useState('');
  const [traceResult, setTraceResult] = useState<any>(null);
  const [isTracing, setIsTracing] = useState(false);
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showTechModal, setShowTechModal] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);

  const handleTrace = (e: React.FormEvent) => {
    e.preventDefault();
    if(!traceId.trim()) return;
    setIsTracing(true);
    
    // Simulate API verification
    setTimeout(() => {
        setTraceResult({
            id: traceId,
            product: "Fair Trade Arabica Coffee (Grade AA)",
            origin: "Kiriaini, Kenya (Green Valley Co-op)",
            rating: "98/100 Quality Score",
            journey: [
                { status: "Harvested", date: "Apr 10, 2024", location: "Farm Block C", completed: true },
                { status: "Processed", date: "Apr 12, 2024", location: "Wet Mill #4", completed: true },
                { status: "Quality Check", date: "Apr 13, 2024", location: "Regional Lab", completed: true },
                { status: "Exported", date: "Apr 15, 2024", location: "Mombasa Port", completed: true },
                { status: "Retail", date: "Pending", location: "Distribution Center", completed: false },
            ]
        });
        setIsTracing(false);
    }, 1500);
  };

  const handleDownload = (docName: string) => {
    alert(`Downloading ${docName}...`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold text-agro-900 mb-4">Customer Experience</h2>
        <p className="text-xl text-earth-600 max-w-3xl mx-auto">
          We serve a diverse ecosystem of stakeholders, tailoring our value proposition to meet specific needs across the Five Thrusts.
        </p>
      </div>

      {/* Traceability Feature */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-earth-200 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
            <ScanBarcode size={120} />
        </div>
        <div className="relative z-10">
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                    <CheckCircle2 size={14} /> Trust & Transparency
                </div>
                <h3 className="text-2xl font-bold text-earth-900 mb-2">Product Traceability Verification</h3>
                <p className="text-earth-600 max-w-lg mx-auto text-sm">
                    Verify the origin and journey of your EnvirosAgro certified products. Enter the Batch ID found on your packaging to see its full lifecycle.
                </p>
            </div>

            <div className="max-w-xl mx-auto mb-10">
                <form onSubmit={handleTrace} className="flex gap-2">
                    <input 
                        type="text" 
                        value={traceId}
                        onChange={(e) => setTraceId(e.target.value)}
                        placeholder="Enter Batch ID (e.g. EA-2024-X92)"
                        className="flex-1 border border-earth-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agro-500 bg-earth-50 text-earth-900 font-mono"
                    />
                    <button 
                        type="submit" 
                        disabled={isTracing}
                        className="bg-agro-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-agro-700 transition-colors disabled:opacity-70 flex items-center gap-2"
                    >
                        {isTracing ? 'Tracing...' : <><ScanBarcode size={18} /> Trace</>}
                    </button>
                </form>
            </div>

            {traceResult && (
                <div className="bg-earth-50 rounded-2xl p-6 md:p-8 border border-earth-100 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-earth-200 pb-6 gap-4">
                        <div>
                            <span className="text-[10px] font-bold text-agro-600 uppercase tracking-wider bg-white px-2 py-1 rounded border border-agro-100 mb-2 inline-block">Verified Product</span>
                            <h4 className="text-xl font-bold text-earth-900">{traceResult.product}</h4>
                            <p className="text-sm text-earth-500 font-mono">Batch: {traceResult.id}</p>
                        </div>
                        <div className="text-left md:text-right">
                            <p className="text-sm text-earth-600 flex items-center md:justify-end gap-1"><MapPin size={14} className="text-agro-500"/> Origin Source</p>
                            <p className="font-bold text-earth-900">{traceResult.origin}</p>
                            <p className="text-xs text-agro-600 font-bold mt-1">{traceResult.rating}</p>
                        </div>
                    </div>

                    <div className="relative pl-2 md:pl-0">
                        {/* Timeline Line */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-earth-200"></div>
                        
                        <div className="space-y-6">
                            {traceResult.journey.map((step: any, idx: number) => (
                                <div key={idx} className="relative flex gap-4 items-start group">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 shadow-sm border-2 border-white ${step.completed ? 'bg-agro-600 text-white' : 'bg-earth-200 text-earth-400'}`}>
                                        {step.completed ? <CheckCircle2 size={16} /> : <div className="w-2 h-2 rounded-full bg-current"></div>}
                                    </div>
                                    <div className="flex-1 bg-white p-4 rounded-xl border border-earth-100 shadow-sm group-hover:border-agro-200 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <h5 className={`font-bold text-sm ${step.completed ? 'text-earth-900' : 'text-earth-400'}`}>{step.status}</h5>
                                            <span className="text-xs text-earth-400 flex items-center gap-1"><Calendar size={12}/> {step.date}</span>
                                        </div>
                                        <p className="text-xs text-earth-600 mt-1">{step.location}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* Customer Personas Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {CUSTOMER_SEGMENTS.length > 0 ? (
            CUSTOMER_SEGMENTS.map((persona) => (
                <div key={persona.id} className={`p-8 rounded-3xl border ${persona.border} ${persona.bg} hover:shadow-lg transition-all relative overflow-hidden group flex flex-col`}>
                    <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
                        {persona.icon}
                    </div>
                    
                    <div className="relative z-10 flex-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="bg-white/60 p-2 rounded-xl backdrop-blur-sm">
                                {persona.icon}
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider bg-white/50 px-2 py-1 rounded">
                                {persona.thrust}
                            </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-2">{persona.title}</h3>
                        <p className="text-sm font-bold opacity-70 mb-6 uppercase tracking-wide flex items-center gap-2">
                            <Star size={14} fill="currentColor" /> {persona.focus}
                        </p>
                        
                        <div className="bg-white/40 p-6 rounded-xl italic leading-relaxed text-sm">
                            "{persona.quote}"
                        </div>
                    </div>

                    {persona.id === 1 && (
                        <button
                            onClick={() => setShowCommunityModal(true)}
                            className="mt-6 w-full bg-white text-rose-700 text-sm font-bold py-3 rounded-xl border border-rose-100 shadow-sm hover:bg-rose-50 transition-colors flex items-center justify-center gap-2 relative z-10"
                        >
                            <Users size={16} /> Access Support
                        </button>
                    )}

                    {persona.id === 2 && (
                        <button
                            onClick={() => setShowSafetyModal(true)}
                            className="mt-6 w-full bg-white text-red-600 text-sm font-bold py-3 rounded-xl border border-red-100 shadow-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2 relative z-10"
                        >
                            <ShieldCheck size={16} /> Check Safety Standards
                        </button>
                    )}

                    {persona.id === 3 && (
                        <button
                            onClick={() => setShowInputModal(true)}
                            className="mt-6 w-full bg-white text-green-700 text-sm font-bold py-3 rounded-xl border border-green-100 shadow-sm hover:bg-green-50 transition-colors flex items-center justify-center gap-2 relative z-10"
                        >
                            <Leaf size={16} /> View Input Specs
                        </button>
                    )}

                    {persona.id === 4 && (
                        <button
                            onClick={() => setShowTechModal(true)}
                            className="mt-6 w-full bg-white text-blue-700 text-sm font-bold py-3 rounded-xl border border-blue-100 shadow-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 relative z-10"
                        >
                            <Cpu size={16} /> Connect FarmOS
                        </button>
                    )}
                </div>
            ))
        ) : (
            <div className="col-span-full md:col-span-1 lg:col-span-2 py-12 px-8 bg-earth-50 rounded-3xl border border-earth-100 flex flex-col justify-center items-center text-center">
                <Users size={48} className="text-earth-300 mb-4" />
                <h3 className="text-xl font-bold text-earth-600 mb-2">Customer Segments Updating</h3>
                <p className="text-earth-500 text-sm">We are currently refining our customer personas data. Please check back soon.</p>
            </div>
        )}
        
        {/* Call to Action Card */}
        <div className="bg-agro-900 text-white p-8 rounded-3xl flex flex-col justify-center items-center text-center shadow-lg">
            <Heart size={48} className="text-agro-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Customer First</h3>
            <p className="text-agro-100 mb-8 text-sm">
                Our support team is available 24/7 to assist with any inquiries across all sectors.
            </p>
            <button className="bg-white text-agro-900 px-6 py-3 rounded-full font-bold hover:bg-agro-100 transition-colors flex items-center gap-2">
                <MessageCircle size={18} /> Contact Support
            </button>
        </div>
      </div>

      {/* Satisfaction Metrics */}
      <div className="bg-white border border-earth-100 rounded-3xl p-12 shadow-sm">
         <div className="grid md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-earth-100">
             <div className="p-4">
                 <div className="text-4xl font-serif font-bold text-agro-600 mb-2">98%</div>
                 <div className="text-earth-500 font-medium text-sm">Customer Retention</div>
             </div>
             <div className="p-4">
                 <div className="text-4xl font-serif font-bold text-blue-600 mb-2">24/7</div>
                 <div className="text-earth-500 font-medium text-sm">Technical Support</div>
             </div>
             <div className="p-4">
                 <div className="text-4xl font-serif font-bold text-rose-600 mb-2">15k+</div>
                 <div className="text-earth-500 font-medium text-sm">Active Community</div>
             </div>
             <div className="p-4">
                 <div className="text-4xl font-serif font-bold text-amber-500 mb-2">4.9/5</div>
                 <div className="text-earth-500 font-medium text-sm">Average Rating</div>
             </div>
         </div>
      </div>

      {/* Community & Subsistence Modal */}
      {showCommunityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-rose-50 p-6 border-b border-rose-100 flex justify-between items-center">
                    <h3 className="font-bold text-xl text-rose-900 flex items-center gap-2">
                        <Users className="text-rose-600" /> Community & Subsistence
                    </h3>
                    <button onClick={() => setShowCommunityModal(false)} className="text-rose-400 hover:text-rose-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-8 space-y-6">
                    <p className="text-earth-600 text-sm">
                        Empowering smallholder farmers through collective action and food security resources under the Social Ag (SA) Thrust.
                    </p>
                    
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="bg-rose-100 p-2 rounded-full text-rose-700 mt-1">
                                <Handshake size={16} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900">Cooperative Power</h4>
                                <p className="text-xs text-earth-500">Access bulk purchasing for seeds/fertilizer and shared machinery to reduce costs.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-amber-100 p-2 rounded-full text-amber-700 mt-1">
                                <Sprout size={16} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900">Subsistence Security</h4>
                                <p className="text-xs text-earth-500">Guides on intercropping maize and beans for maximum household food security.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-100 p-2 rounded-full text-blue-700 mt-1">
                                <ShoppingBag size={16} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900">Surplus Markets</h4>
                                <p className="text-xs text-earth-500">Direct connection to local buyers for excess produce, eliminating middlemen.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 text-center">
                        <p className="text-xs font-bold text-rose-800 mb-2">Join Local Group</p>
                        <button 
                            onClick={() => onNavigate && onNavigate(View.COMMUNITY)}
                            className="w-full bg-rose-600 text-white font-bold py-2 rounded-lg text-sm hover:bg-rose-700 transition-colors flex items-center justify-center gap-2"
                        >
                            Find Nearest Co-op <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Safety Modal */}
      {showSafetyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-red-50 p-6 border-b border-red-100 flex justify-between items-center">
                    <h3 className="font-bold text-xl text-red-900 flex items-center gap-2">
                        <ShieldCheck className="text-red-600" /> SafeHarvest™ Standards
                    </h3>
                    <button onClick={() => setShowSafetyModal(false)} className="text-red-400 hover:text-red-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-8 space-y-6">
                    <p className="text-earth-600 text-sm">
                        Products tagged for the "Health-Conscious Family" undergo rigorous testing under the HA (Health Agriculture) Thrust.
                    </p>
                    
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="bg-green-100 p-2 rounded-full text-green-700 mt-1">
                                <Activity size={16} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900">Zero-Residue Testing</h4>
                                <p className="text-xs text-earth-500">Screening for 400+ synthetic pesticide residues. Tolerance limit: 0.00ppm.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-100 p-2 rounded-full text-blue-700 mt-1">
                                <FileText size={16} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900">Heavy Metal Audit</h4>
                                <p className="text-xs text-earth-500">Soil and water analysis to ensure Lead, Arsenic, and Mercury levels are below detectable limits.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-amber-100 p-2 rounded-full text-amber-700 mt-1">
                                <ShieldPlus size={16} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900">Pathogen Free</h4>
                                <p className="text-xs text-earth-500">Certified free from E. coli, Salmonella, and Listeria via regular batch testing.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-center">
                        <p className="text-xs font-bold text-red-800 mb-2">View Sample Lab Report</p>
                        <button 
                            onClick={() => handleDownload("SafeHarvest Lab Sample.pdf")}
                            className="w-full bg-red-600 text-white font-bold py-2 rounded-lg text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                        >
                            Download PDF <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Input Quality Modal */}
      {showInputModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-green-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-green-50 p-6 border-b border-green-100 flex justify-between items-center">
                    <h3 className="font-bold text-xl text-green-900 flex items-center gap-2">
                        <Leaf className="text-green-600" /> Regenerative Input Standards
                    </h3>
                    <button onClick={() => setShowInputModal(false)} className="text-green-400 hover:text-green-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-8 space-y-6">
                    <p className="text-earth-600 text-sm">
                        Inputs for the "Regenerative Farmer" are vetted for ecological compatibility and soil enhancement potential.
                    </p>
                    
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="bg-green-100 p-2 rounded-full text-green-700 mt-1">
                                <Sprout size={16} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900">Seed Viability</h4>
                                <p className="text-xs text-earth-500">Certified organic, non-GMO with >95% germination rate tested within 30 days of dispatch.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-amber-100 p-2 rounded-full text-amber-700 mt-1">
                                <Microscope size={16} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900">Bio-Active Load</h4>
                                <p className="text-xs text-earth-500">Fertilizers contain guaranteed microbial counts (min 10^8 CFU/g) to boost soil biome.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-100 p-2 rounded-full text-blue-700 mt-1">
                                <CheckCircle2 size={16} />
                            </div>
                            <div>
                                <h4 className="font-bold text-earth-900">Purity Analysis</h4>
                                <p className="text-xs text-earth-500">Free from synthetic coatings, inert fillers, and invasive weed seeds (0.0% tolerance).</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
                        <p className="text-xs font-bold text-green-800 mb-2">Detailed Tech Sheet</p>
                        <button 
                            onClick={() => handleDownload("Regenerative Inputs Specs.pdf")}
                            className="w-full bg-green-600 text-white font-bold py-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                        >
                            Download PDF <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Tech Efficiency Modal */}
      {showTechModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-blue-50 p-6 border-b border-blue-100 flex justify-between items-center">
                    <h3 className="font-bold text-xl text-blue-900 flex items-center gap-2">
                        <Zap className="text-blue-600" /> Efficiency & Integration
                    </h3>
                    <button onClick={() => setShowTechModal(false)} className="text-blue-400 hover:text-blue-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-8 space-y-6">
                    <p className="text-earth-600 text-sm">
                        Optimize your supply chain by connecting EnvirosAgro directly to your digital farming ecosystem.
                    </p>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white border border-earth-200 rounded-xl shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                    <Wifi size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-earth-900 text-sm">Smart Reordering</h4>
                                    <p className="text-xs text-earth-500">Auto-purchase when IoT sensors detect low stock.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-xs font-bold text-earth-500">Active</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white border border-earth-200 rounded-xl shadow-sm">
                                <div className="flex items-center gap-3">
                                <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                                    <Database size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-earth-900 text-sm">Farm Management Sync</h4>
                                    <p className="text-xs text-earth-500">Export invoices directly to QuickBooks/Xero.</p>
                                </div>
                            </div>
                            <button className="text-xs font-bold text-blue-600 border border-blue-200 px-3 py-1.5 rounded hover:bg-blue-50 transition-colors">Connect</button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white border border-earth-200 rounded-xl shadow-sm">
                                <div className="flex items-center gap-3">
                                <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                                    <Activity size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-earth-900 text-sm">Predictive Logistics</h4>
                                    <p className="text-xs text-earth-500">AI-optimized delivery windows based on weather.</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Beta</span>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
                        <p className="text-xs font-bold text-blue-800 mb-2">Access Integration Hub</p>
                        <button 
                            onClick={() => onNavigate && onNavigate(View.DASHBOARD)}
                            className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                            Open Farm Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
