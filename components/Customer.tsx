import React, { useState } from 'react';
import { 
  ScanBarcode, CheckCircle2, MapPin, Calendar, Star, ShieldCheck, Leaf, Cpu, Users, 
  Heart, MessageCircle, BookOpen, ShoppingBag, X, Activity, FileText, ShieldPlus, 
  Sprout, Microscope, Zap, Wifi, Database, Handshake, ArrowRight, Download, History,
  Award, Quote, HelpCircle, ArrowUpRight, Search, TrendingUp
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

const SUCCESS_STORIES = [
  {
    id: 1,
    name: "Benjamin Kiptoo",
    role: "Dairy Farmer",
    location: "Nyeri, Kenya",
    story: "By using the EA traceability tools, I proved my milk was organic. My revenue increased by 35% as I could finally sell to premium retailers.",
    image: "https://images.unsplash.com/photo-1542464489-0639913cc334?w=400&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Clara Mensah",
    role: "Mother of Two",
    location: "Accra, Ghana",
    story: "I always use SafeHarvest QR codes when buying vegetables. It gives me peace of mind knowing the soil was tested for heavy metals.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?w=400&auto=format&fit=crop&q=60"
  }
];

const RECENT_TRACES = [
  { id: 'EA-921', product: 'Organic Arabica Coffee', date: '2 days ago', status: 'Verified' },
  { id: 'HA-402', product: 'Premium Soyabean Oil', date: '1 week ago', status: 'Verified' },
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

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-agro-50 text-agro-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-agro-100">
            <Heart size={16} /> Human-Centric Agriculture
        </div>
        <h2 className="text-4xl font-serif font-bold text-agro-900 mb-4">Customer Experience Hub</h2>
        <p className="text-xl text-earth-600 max-w-3xl mx-auto">
          Empowering consumers and producers through transparency, support, and verifiable sustainability data.
        </p>
      </div>

      {/* Experience Dashboard Summary */}
      <div className="grid lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-earth-100 shadow-sm flex flex-col justify-between">
              <div>
                  <span className="text-xs font-bold text-earth-400 uppercase tracking-widest">My Loyalty</span>
                  <div className="text-3xl font-serif font-bold text-amber-600 mt-1">125 EAC</div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded w-fit">
                  <TrendingUp size={10} /> +15 this week
              </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-earth-100 shadow-sm flex flex-col justify-between">
              <div>
                  <span className="text-xs font-bold text-earth-400 uppercase tracking-widest">Traced Products</span>
                  <div className="text-3xl font-serif font-bold text-blue-600 mt-1">42 Items</div>
              </div>
              <button onClick={() => onNavigate && onNavigate(View.SUPPLY)} className="mt-4 text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                  View History <ArrowRight size={12} />
              </button>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-earth-100 shadow-sm flex flex-col justify-between">
              <div>
                  <span className="text-xs font-bold text-earth-400 uppercase tracking-widest">My Impact</span>
                  <div className="text-3xl font-serif font-bold text-agro-600 mt-1">0.8 Tons</div>
              </div>
              <p className="mt-4 text-[10px] text-earth-500">CO2 Equivalent offset by your purchases</p>
          </div>
          <div className="bg-agro-900 p-6 rounded-2xl shadow-md flex flex-col justify-between text-white">
              <div>
                  <span className="text-xs font-bold text-agro-300 uppercase tracking-widest">Status</span>
                  <div className="text-xl font-bold mt-1 flex items-center gap-2">
                      <Award className="text-yellow-400" size={20} /> Gold Member
                  </div>
              </div>
              <button onClick={() => onNavigate && onNavigate(View.INVESTOR_PORTAL)} className="mt-4 w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg text-xs font-bold transition-colors">
                  View Benefits
              </button>
          </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-earth-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <ScanBarcode size={120} />
                </div>
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-earth-900 mb-1">Trace Your Product</h3>
                            <p className="text-earth-600 text-sm">Verify origin, quality, and environmental impact score.</p>
                        </div>
                        <div className="bg-blue-50 text-blue-700 p-2 rounded-xl">
                            <ShieldCheck size={24} />
                        </div>
                    </div>

                    <form onSubmit={handleTrace} className="flex gap-2 mb-8">
                        <input 
                            type="text" 
                            value={traceId}
                            onChange={(e) => setTraceId(e.target.value)}
                            placeholder="Scan or type Batch ID (e.g. EA-2024-X92)"
                            className="flex-1 border border-earth-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agro-500 bg-earth-50 text-earth-900 font-mono"
                        />
                        <button 
                            type="submit" 
                            disabled={isTracing}
                            className="bg-agro-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-agro-700 transition-colors disabled:opacity-70 flex items-center gap-2"
                        >
                            {isTracing ? 'Tracing...' : <><ScanBarcode size={18} /> Verify</>}
                        </button>
                    </form>

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

                            <div className="relative">
                                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-earth-200"></div>
                                <div className="space-y-6">
                                    {traceResult.journey.map((step: any, idx: number) => (
                                        <div key={idx} className="relative flex gap-4 items-start group pl-2">
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
          </div>

          <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-earth-200 shadow-sm">
                  <h3 className="font-bold text-earth-900 mb-6 flex items-center gap-2">
                      <History size={18} className="text-earth-400" /> Recent Activities
                  </h3>
                  <div className="space-y-4">
                      {RECENT_TRACES.map((trace) => (
                          <div key={trace.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-earth-50 transition-colors border border-transparent hover:border-earth-100 cursor-pointer">
                              <div className="flex items-center gap-3">
                                  <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                                      <ShoppingBag size={16} />
                                  </div>
                                  <div>
                                      <p className="text-sm font-bold text-earth-900 leading-tight">{trace.product}</p>
                                      <p className="text-[10px] text-earth-400 font-medium uppercase">{trace.date} • {trace.id}</p>
                                  </div>
                              </div>
                              <CheckCircle2 size={14} className="text-green-500" />
                          </div>
                      ))}
                  </div>
                  <button onClick={() => onNavigate && onNavigate(View.SUPPLY)} className="w-full mt-6 py-2 text-xs font-bold text-earth-400 hover:text-agro-600 border-t border-earth-100 transition-colors">
                      VIEW FULL HISTORY
                  </button>
              </div>

              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                  <div className="flex items-center gap-3 mb-4">
                      <div className="bg-white p-2 rounded-xl text-blue-600 shadow-sm">
                          <MessageCircle size={20} />
                      </div>
                      <h3 className="font-bold text-blue-900">Live Expert Chat</h3>
                  </div>
                  <p className="text-xs text-blue-700 leading-relaxed mb-6">
                      Questions about a product's impact or safety score? Our agronomists are online.
                  </p>
                  <button onClick={() => onNavigate && onNavigate(View.AI_ADVISOR)} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-md hover:bg-blue-700 transition-colors">
                      Start Conversation
                  </button>
              </div>
          </div>
      </div>

      <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-earth-900">Choose Your Pathway</h3>
          <p className="text-earth-500 text-sm mt-2">Personalized resources and tools tailored to your unique role in the ecosystem.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {CUSTOMER_SEGMENTS.map((persona) => (
            <div key={persona.id} className={`p-8 rounded-3xl border ${persona.border} ${persona.bg} hover:shadow-lg transition-all relative overflow-hidden group flex flex-col`}>
                <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
                    {persona.icon}
                </div>
                
                <div className="relative z-10 flex-1">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="bg-white/60 p-2 rounded-xl backdrop-blur-sm">{persona.icon}</div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/50 px-2 py-1 rounded">{persona.thrust}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-earth-900 leading-tight">{persona.title}</h3>
                    <p className="text-[10px] font-bold text-earth-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Star size={12} fill="currentColor" className="text-amber-500" /> {persona.focus}
                    </p>
                    <div className="bg-white/40 p-4 rounded-xl italic leading-relaxed text-xs text-earth-700">"{persona.quote}"</div>
                </div>

                <div className="mt-6 space-y-2 relative z-10">
                    {persona.id === 1 && (
                        <button onClick={() => onNavigate && onNavigate(View.COMMUNITY)} className="w-full bg-white text-rose-700 text-xs font-bold py-3 rounded-xl border border-rose-100 shadow-sm hover:bg-rose-50 transition-colors flex items-center justify-center gap-2">
                            <Users size={14} /> Access Support
                        </button>
                    )}
                    {persona.id === 2 && (
                        <button onClick={() => onNavigate && onNavigate(View.SAFE_HARVEST)} className="w-full bg-white text-red-600 text-xs font-bold py-3 rounded-xl border border-red-100 shadow-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                            <ShieldCheck size={14} /> Safety Standards
                        </button>
                    )}
                    {persona.id === 3 && (
                        <button onClick={() => onNavigate && onNavigate(View.PRODUCTS)} className="w-full bg-white text-green-700 text-xs font-bold py-3 rounded-xl border border-green-100 shadow-sm hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
                            <Leaf size={14} /> View Input Specs
                        </button>
                    )}
                    {persona.id === 4 && (
                        <button onClick={() => onNavigate && onNavigate(View.DASHBOARD)} className="w-full bg-white text-blue-700 text-xs font-bold py-3 rounded-xl border border-blue-100 shadow-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                            <Cpu size={14} /> Connect FarmOS
                        </button>
                    )}
                    <button onClick={() => onNavigate && onNavigate(View.SUSTAINABILITY_FRAMEWORK)} className="w-full text-center text-[10px] font-bold text-earth-400 hover:text-earth-900 transition-colors">
                        LEARN MORE ABOUT {persona.thrust.split(' ')[0].toUpperCase()}
                    </button>
                </div>
            </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-earth-200 flex items-start gap-6">
              <div className="bg-agro-50 p-4 rounded-2xl text-agro-600"><HelpCircle size={32} /></div>
              <div>
                  <h3 className="text-xl font-bold text-earth-900 mb-2">Help Center</h3>
                  <p className="text-earth-600 text-sm mb-6 leading-relaxed">Find detailed documentation on how to use the network and manage your digital ID.</p>
                  <div className="flex gap-4">
                      <button onClick={() => onNavigate && onNavigate(View.INFORMATION)} className="text-agro-600 font-bold text-sm flex items-center gap-1 hover:underline">Browse FAQs <ArrowUpRight size={16} /></button>
                      <button onClick={() => onNavigate && onNavigate(View.KNOWLEDGE)} className="text-agro-600 font-bold text-sm flex items-center gap-1 hover:underline">User Manuals <Download size={16} /></button>
                  </div>
              </div>
          </div>
          <div className="bg-agro-900 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden flex items-start gap-6">
              <div className="absolute -bottom-8 -right-8 opacity-10"><Handshake size={150} /></div>
              <div className="bg-white/10 p-4 rounded-2xl text-white backdrop-blur-sm relative z-10"><MessageCircle size={32} /></div>
              <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Contact Our Team</h3>
                  <p className="text-agro-100 text-sm mb-6 leading-relaxed">Dedicated support for our global community of farmers and stakeholders.</p>
                  <button onClick={() => onNavigate && onNavigate(View.INFORMATION)} className="bg-white text-agro-900 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-agro-50 transition-colors shadow-lg">Open a Ticket</button>
              </div>
          </div>
      </div>
    </div>
  );
};