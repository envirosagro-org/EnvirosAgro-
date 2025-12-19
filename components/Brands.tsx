import React, { useState, useEffect } from 'react';
import { 
  Award, ArrowRight, Flower, Music, Heart, Stethoscope, FileText, Bot, Utensils, 
  Smile, Coins, BookOpen, X, Play, ShoppingBag, Gamepad2, 
  Activity, ExternalLink, Sun, Droplets, Wind, Calendar, Star, TrendingUp, Users,
  Zap, Shield, Globe, Monitor, Satellite, Waves, Warehouse, Thermometer, Snowflake,
  Link, Box, ChevronRight, MapPin, AlertCircle, Headphones, Library, Sparkles, 
  BarChart, Battery, RefreshCcw, Droplet, ThermometerSnowflake, ListChecks,
  Leaf, Download, Send, Search, CheckCircle2, History, Power, ThermometerSun,
  Loader2, XCircle, ArrowRightLeft, PlusCircle, Trash2
} from 'lucide-react';
import { View } from '../types';

const BRAND_STATS = [
  { label: "Active Brands", value: "12", icon: <Award size={20} /> },
  { label: "Network Reach", value: "2.5M", icon: <Globe size={20} /> },
  { label: "Shared C(a) Score", value: "8.4", icon: <TrendingUp size={20} /> },
  { label: "Global Partners", value: "800+", icon: <Users size={20} /> }
];

const BRANDS = [
  {
    id: 1,
    name: "Lilies Around",
    tagline: "AGRICULTURAL AESTHETICS",
    description: "Enhancing landscapes and environments through floral beauty and aesthetic agricultural design.",
    icon: <Flower size={32} className="text-pink-600" />,
    color: "bg-pink-50/50",
    blobColor: "bg-pink-100",
    borderColor: "border-pink-100",
    accentColor: "text-pink-600",
    tier: "LIFESTYLE",
    features: ["Garden Planning", "Aesthetic Audits", "Native Landscaping"]
  },
  {
    id: 2,
    name: "AgroMusika",
    tagline: "AGRICULTURAL ARTS",
    description: "Celebrating the cultural rhythm of farming through music, art, and creative expression.",
    icon: <Music size={32} className="text-purple-600" />,
    color: "bg-purple-50/50",
    blobColor: "bg-purple-100",
    borderColor: "border-purple-100",
    accentColor: "text-purple-600",
    tier: "CULTURE",
    features: ["Folk Playlists", "Artist Grants", "Cultural Festivals"]
  },
  {
    id: 3,
    name: "Hearts4Agro",
    tagline: "AGRICULTURAL ENVIRONMENTS",
    description: "Fostering love and care for agricultural ecosystems and environmental stewardship.",
    icon: <Heart size={32} className="text-red-600" />,
    color: "bg-red-50/50",
    blobColor: "bg-red-100",
    borderColor: "border-red-100",
    accentColor: "text-red-600",
    tier: "IMPACT",
    features: ["Tree Adoption", "Eco-Volunteering", "Soil Restoration"]
  },
  {
    id: 4,
    name: "MedicAg",
    tagline: "AGRICULTURAL HEALTH",
    description: "Ensuring the safety, health, and wellbeing of the agricultural workforce and consumers.",
    icon: <Stethoscope size={32} className="text-teal-600" />,
    color: "bg-teal-50/50",
    blobColor: "bg-teal-100",
    borderColor: "border-teal-100",
    accentColor: "text-teal-600",
    tier: "CORE",
    features: ["Tele-Health", "Safety Standards", "Nutrition Plans"]
  },
  {
    id: 5,
    name: "AgroInPDF",
    tagline: "AGRICULTURAL MEDIA",
    description: "Digital dissemination of agricultural knowledge through accessible media and documentation.",
    icon: <FileText size={32} className="text-slate-600" />,
    color: "bg-slate-50/50",
    blobColor: "bg-slate-100",
    borderColor: "border-slate-100",
    accentColor: "text-slate-600",
    linkTo: View.MEDIA,
    tier: "EDUCATION",
    features: ["Digital Library", "Video Modules", "Research Papers"]
  },
  {
    id: 6,
    name: "Agroboto",
    tagline: "AGRICULTURAL TECH",
    description: "Pioneering robotics and automation solutions for the modern smart farm.",
    icon: <Bot size={32} className="text-blue-600" />,
    color: "bg-blue-50/50",
    blobColor: "bg-blue-100",
    borderColor: "border-blue-100",
    accentColor: "text-blue-600",
    tier: "TECHNOLOGY",
    features: ["Fleet Automation", "AI Diagnostics", "IoT Integration"]
  },
  {
    id: 10,
    name: "SkyScout",
    tagline: "ORBITAL SURVEILLANCE",
    description: "High-resolution satellite and drone data analysis for precision crop monitoring and biomass tracking.",
    icon: <Satellite size={32} className="text-indigo-600" />,
    color: "bg-indigo-50/50",
    blobColor: "bg-indigo-100",
    borderColor: "border-indigo-100",
    accentColor: "text-indigo-600",
    tier: "TECHNOLOGY",
    linkTo: View.FARM_SCOUT,
    features: ["Biomass Mapping", "Drought Detection", "NDVI Analysis"]
  },
  {
    id: 11,
    name: "AquaFlow",
    tagline: "INTELLIGENT IRRIGATION",
    description: "Smart water management infrastructure ensuring every drop is optimized for maximum C(a) resilience.",
    icon: <Waves size={32} className="text-cyan-600" />,
    color: "bg-cyan-50/50",
    blobColor: "bg-cyan-100",
    borderColor: "border-cyan-100",
    accentColor: "text-cyan-600",
    tier: "INFRASTRUCTURE",
    features: ["Smart Drip", "Moisture Sensing", "Reservoir Sync"]
  },
  {
    id: 7,
    name: "Juiezy Cookiez",
    tagline: "AGRICULTURAL FOOD",
    description: "Delicious, value-added food products crafted from sustainable agricultural produce.",
    icon: <Utensils size={32} className="text-orange-600" />,
    color: "bg-orange-50/50",
    blobColor: "bg-orange-100",
    borderColor: "border-orange-100",
    accentColor: "text-orange-600",
    tier: "CONSUMER",
    features: ["Organic Snacks", "Nutrient Tracking", "Direct Sourcing"]
  },
  {
    id: 12,
    name: "TerraStore",
    tagline: "COLD CHAIN LOGISTICS",
    description: "Energy-efficient storage and value-preservation systems for extending post-harvest life cycles.",
    icon: <Warehouse size={32} className="text-emerald-600" />,
    color: "bg-emerald-50/50",
    blobColor: "bg-emerald-100",
    borderColor: "border-emerald-100",
    accentColor: "text-emerald-600",
    tier: "LOGISTICS",
    linkTo: View.SUPPLY,
    features: ["Smart Storage", "Humidity Control", "Logistics Tracking"]
  },
  {
    id: 8,
    name: "ChildsLabour",
    tagline: "CHILD GROWTH & DEVELOPMENT",
    description: "Empowering the next generation through agricultural education, discipline, and growth.",
    icon: <Smile size={32} className="text-yellow-600" />,
    color: "bg-yellow-50/50",
    blobColor: "bg-yellow-100",
    borderColor: "border-yellow-100",
    accentColor: "text-yellow-600",
    tier: "SOCIAL",
    features: ["Youth Academy", "Farming Games", "Mentorship"]
  },
  {
    id: 9,
    name: "Tokenz",
    tagline: "AGRICULTURAL FINANCE",
    description: "Innovative financial solutions and digital assets powering the agricultural economy.",
    icon: <Coins size={32} className="text-amber-600" />,
    color: "bg-amber-50/50",
    blobColor: "bg-amber-100",
    borderColor: "border-amber-100",
    accentColor: "text-amber-600",
    tier: "FINANCE",
    linkTo: View.FINANCE,
    features: ["Digital Assets", "Grants Engine", "Impact Investment"]
  }
];

interface BrandsProps {
    onNavigate?: (view: View) => void;
}

export const Brands: React.FC<BrandsProps> = ({ onNavigate }) => {
  const [selectedBrand, setSelectedBrand] = useState<typeof BRANDS[0] | null>(null);
  
  // PORTAL STATES
  const [liliesMood, setLiliesMood] = useState<'ZEN' | 'TROPICAL' | 'WILDFLOWER'>('ZEN');
  const [botLogs, setBotLogs] = useState<string[]>(['> System initialized.', '> Waiting for instructions...']);
  const [storageTemp, setStorageTemp] = useState(4.2);
  const [irrigationActive, setIrrigationActive] = useState(false);
  const [tokenAmount, setTokenAmount] = useState('100');
  const [isScanning, setIsScanning] = useState(false);
  const [learningProgress, setLearningProgress] = useState(84);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Auto-running simulation for Agroboto
  useEffect(() => {
    let interval: any;
    if (selectedBrand?.id === 6) {
        interval = setInterval(() => {
            const actions = [
                "> Scanning perimeter...",
                "> Soil moisture check: 45%",
                "> Unit 12: Returning to base",
                "> AI Core: Analyzing satellite delta",
                "> Pest detected: None",
                "> Charging battery... 88%"
            ];
            setBotLogs(prev => [...prev.slice(-4), actions[Math.floor(Math.random() * actions.length)]]);
        }, 3000);
    }
    return () => clearInterval(interval);
  }, [selectedBrand]);

  const renderPortalContent = (brand: typeof BRANDS[0]) => {
      switch(brand.id) {
          case 1: // Lilies Around
              const moodData = {
                  ZEN: {
                      title: "Serene & Minimalist",
                      desc: "Find balance with raked gravel, bonsai accents, and calming water features.",
                      img: "https://images.unsplash.com/photo-1599026466070-5b1239c0f992?w=600&auto=format&fit=crop&q=80"
                  },
                  TROPICAL: {
                      title: "Lush & Vibrant",
                      desc: "Bold colors, large foliage, and exotic blooms for a paradise feel.",
                      img: "https://images.unsplash.com/photo-1558293842-c0fd3db86157?w=600&auto=format&fit=crop&q=80"
                  },
                  WILDFLOWER: {
                      title: "Native & Free",
                      desc: "Support pollinators with a natural, low-maintenance meadow style.",
                      img: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&auto=format&fit=crop&q=80"
                  }
              };

              return (
                  <div className="space-y-6">
                      <div className="text-center">
                          <h4 className="font-bold text-pink-900 dark:text-pink-100 mb-2">Design Your Sanctuary</h4>
                          <div className="flex justify-center gap-2 mb-4">
                              {(['ZEN', 'TROPICAL', 'WILDFLOWER'] as const).map((mood) => (
                                  <button 
                                    key={mood}
                                    onClick={() => setLiliesMood(mood)}
                                    className={`px-3 py-1 text-[10px] font-black rounded-full border transition-all ${
                                        liliesMood === mood 
                                        ? 'bg-pink-600 text-white border-pink-600 shadow-lg' 
                                        : 'bg-white dark:bg-earth-800 text-pink-600 border-pink-200 dark:border-pink-800 hover:bg-pink-50'
                                    }`}
                                  >
                                      {mood}
                                  </button>
                              ))}
                          </div>
                          
                          <div className="bg-white dark:bg-earth-800 rounded-3xl overflow-hidden shadow-sm border border-pink-100 dark:border-pink-900/50 group relative">
                              <img src={moodData[liliesMood].img} className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-105" alt="Mood" />
                              <div className="p-5 text-left bg-gradient-to-t from-white dark:from-earth-800 to-transparent">
                                  <h5 className="font-bold text-pink-800 dark:text-pink-300 text-sm">{moodData[liliesMood].title}</h5>
                                  <p className="text-xs text-earth-500 dark:text-earth-400 mt-1">{moodData[liliesMood].desc}</p>
                              </div>
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => onNavigate?.(View.COMMUNITY)} className="w-full bg-pink-100 dark:bg-pink-900/40 hover:bg-pink-200 text-pink-800 dark:text-pink-300 py-4 rounded-2xl font-black flex items-center justify-center gap-2 text-[10px] uppercase transition-all hover:-translate-y-0.5">
                            <Calendar size={16} /> Consult
                        </button>
                        <button onClick={() => onNavigate?.(View.PRODUCTS)} className="w-full bg-pink-600 hover:bg-pink-700 transition-all text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 text-[10px] uppercase shadow-lg shadow-pink-600/20 hover:-translate-y-0.5">
                            <ShoppingBag size={16} /> Catalog
                        </button>
                      </div>
                  </div>
              );
          case 2: // AgroMusika
               return (
                  <div className="space-y-5">
                      <div className="bg-purple-100 dark:bg-purple-900/40 p-6 rounded-3xl flex items-center gap-5 border border-purple-200 dark:border-purple-800 shadow-inner">
                          <button 
                            onClick={() => setIsMusicPlaying(!isMusicPlaying)}
                            className={`p-5 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 ${isMusicPlaying ? 'bg-white text-purple-600 animate-pulse' : 'bg-purple-600 text-white'}`}
                          >
                            <Play size={24} fill="currentColor" />
                          </button>
                          <div className="flex-1">
                              <h4 className="font-bold text-purple-900 dark:text-purple-100 text-sm">Earth Rhythms Vol. 1</h4>
                              <p className="text-[10px] text-purple-700 dark:text-purple-400 font-black uppercase tracking-widest mt-0.5">
                                  {isMusicPlaying ? 'Now Playing • Folk Fusion' : 'Stream Paused'}
                              </p>
                          </div>
                          <div className="flex gap-1 items-end h-8">
                              {[1,2,3].map(i => (
                                <span key={i} className={`w-1.5 bg-purple-400 rounded-full ${isMusicPlaying ? 'animate-[pulse_1s_infinite]' : 'h-1'}`} style={{animationDelay: `${i*0.2}s`}}></span>
                              ))}
                          </div>
                      </div>
                      <div className="space-y-2">
                          {['Sunrise Over Savanna', 'Soil & Soul', 'Harvest Jubilee'].map((track, i) => (
                              <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-earth-800 rounded-2xl border border-purple-50 dark:border-purple-900 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all cursor-pointer group">
                                  <span className="text-xs font-bold text-earth-700 dark:text-earth-200 flex items-center gap-3">
                                      <span className="text-purple-300 font-mono text-[10px]">0{i+1}</span> {track}
                                  </span>
                                  <Headphones size={14} className="text-purple-200 group-hover:text-purple-600 group-hover:scale-110 transition-all" />
                              </div>
                          ))}
                      </div>
                      <button onClick={() => onNavigate?.(View.PODCAST)} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-purple-600/20 transition-all">
                          <Star size={18} /> Open Cultural Hub
                      </button>
                  </div>
              );
           case 3: // Hearts4Agro
               return (
                  <div className="text-center space-y-8">
                      <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-[3rem] border border-red-100 dark:border-red-900/50 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
                          <Leaf size={56} className="text-red-500 mx-auto mb-4 animate-pulse-gentle" />
                          <p className="text-red-800 dark:text-red-200 italic text-sm font-medium leading-relaxed relative z-10">
                            "Every tree planted reduces our collective temperature. Join 8,000+ members in our reforestation mission."
                          </p>
                      </div>
                      <div className="space-y-4">
                         <div className="flex justify-between text-[10px] font-black text-earth-400 uppercase tracking-widest px-2">
                            <span>Global Target: 100k Trees</span>
                            <span>8,420 Planted</span>
                         </div>
                         <div className="w-full bg-earth-100 dark:bg-earth-800 h-4 rounded-full overflow-hidden border border-earth-200 dark:border-earth-700">
                            <div className="bg-gradient-to-r from-red-400 to-rose-600 h-full w-[8.4%] relative">
                                <div className="absolute inset-0 bg-white/20 animate-progress"></div>
                            </div>
                         </div>
                         <p className="text-[10px] text-red-600 font-bold uppercase tracking-tighter">Verified by Planet Watch AI</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <button onClick={() => onNavigate?.(View.COMMUNITY)} className="bg-white dark:bg-earth-800 border border-red-200 dark:border-red-900/50 py-4 rounded-2xl text-red-700 dark:text-red-300 font-black uppercase text-[10px] hover:bg-red-50 transition-all">Volunteer</button>
                          <button onClick={() => onNavigate?.(View.FINANCE)} className="bg-red-600 text-white py-4 rounded-2xl font-black uppercase text-[10px] hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">Donate Now</button>
                      </div>
                  </div>
              );
           case 4: // MedicAg
                return (
                    <div className="space-y-6">
                         <div className="bg-teal-50 dark:bg-teal-900/20 p-8 rounded-[2.5rem] border border-teal-100 dark:border-teal-900/50 shadow-inner relative overflow-hidden">
                            <div className="flex items-center gap-6 relative z-10">
                                <div className={`w-16 h-16 bg-white dark:bg-earth-800 rounded-2xl flex items-center justify-center text-teal-600 shadow-xl border border-black/5 ${isScanning ? 'animate-pulse' : ''}`}>
                                    {isScanning ? <RefreshCcw className="animate-spin text-teal-400" size={32} /> : <Activity size={32} />}
                                </div>
                                <div>
                                    <p className="text-base font-bold text-teal-900 dark:text-teal-100">Live Diagnostics</p>
                                    <p className="text-[10px] text-teal-600 dark:text-teal-400 uppercase font-black tracking-[0.2em]">{isScanning ? 'Analyzing Vitals...' : 'Network Ready'}</p>
                                </div>
                            </div>
                            {isScanning && (
                                <div className="absolute inset-0 bg-teal-500/10 pointer-events-none">
                                    <div className="h-0.5 w-full bg-teal-400 animate-[scan_2s_linear_infinite] absolute top-0 shadow-[0_0_10px_#2dd4bf]"></div>
                                </div>
                            )}
                         </div>
                         <button 
                             onClick={() => { setIsScanning(true); setTimeout(() => setIsScanning(false), 3000); }}
                             className="w-full bg-teal-600 hover:bg-teal-700 transition-all text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-lg shadow-teal-600/20 hover:-translate-y-0.5 active:translate-y-0"
                         >
                             {isScanning ? 'Running Deep Scan...' : <><Search size={20} /> Run System Diagnosis</>}
                         </button>
                         <button onClick={() => onNavigate?.(View.SAFE_HARVEST)} className="w-full bg-white dark:bg-earth-800 border border-teal-100 dark:border-teal-800 text-teal-700 dark:text-teal-400 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-teal-50">
                             Access Tele-Health Hub
                         </button>
                    </div>
                );
           case 6: // Agroboto
               return (
                  <div className="space-y-5">
                      <div className="bg-slate-950 text-green-400 p-8 rounded-[2.5rem] font-mono text-[10px] shadow-2xl border border-slate-800 relative h-56 overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-10">
                              <Bot size={80} />
                          </div>
                          {botLogs.map((log, i) => (
                              <p key={i} className="mb-1.5 animate-in fade-in slide-in-from-left-2">{log}</p>
                          ))}
                          <p className="animate-pulse font-black text-green-500 mt-6 tracking-widest">{'>'} FLEET_READY_FOR_DEPLOYMENT_</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => alert("Fleet unit deployed to Zone A-4.")} className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5">
                            <Bot size={18} /> Deploy Unit
                        </button>
                        <button onClick={() => { setBotLogs(['> Re-calibrating...', '> Aligning GPS...']); setTimeout(() => setBotLogs(['> Recalibration Complete.', '> Accuracy: 99.8%']), 2000); }} className="bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5">
                            <Battery size={18} /> Recalibrate
                        </button>
                      </div>
                      <button onClick={() => onNavigate?.(View.FARM_SCOUT)} className="w-full bg-slate-900 border border-slate-700 text-slate-400 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:text-white">
                          <Monitor size={18} /> Terminal Controller
                      </button>
                  </div>
              );
           case 10: // SkyScout
               return (
                  <div className="space-y-6">
                      <div className="relative aspect-video bg-slate-950 rounded-[3rem] overflow-hidden border-2 border-slate-800 shadow-2xl group cursor-crosshair">
                          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600" className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-[3s]" alt="Satellite" />
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                              {isScanning ? (
                                  <div className="text-center animate-in zoom-in duration-500">
                                      <Loader2 size={64} className="text-indigo-500 animate-spin mx-auto mb-4" />
                                      <p className="text-indigo-400 font-mono text-[10px] uppercase font-black tracking-[0.4em]">Downlinking HD Telemetry...</p>
                                  </div>
                              ) : (
                                  <div className="opacity-40 group-hover:opacity-100 transition-opacity">
                                      <Satellite size={80} className="text-white animate-float" />
                                  </div>
                              )}
                          </div>
                          <div className="absolute bottom-4 left-6 font-mono text-[8px] text-white opacity-60">
                              SAT: E-AGRO-9 <br/> COORDS: 0.45S, 36.9E
                          </div>
                      </div>
                      <button 
                         onClick={() => { setIsScanning(true); setTimeout(() => setIsScanning(false), 4000); }}
                         className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-lg shadow-indigo-600/20 hover:-translate-y-1"
                      >
                          {isScanning ? 'Syncing with Orbital Array...' : <><Zap size={18} /> Initialize Orbital Scan</>}
                      </button>
                  </div>
              );
           case 11: // AquaFlow
               return (
                  <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                          <div className={`p-6 rounded-[2rem] border-2 text-center transition-all ${irrigationActive ? 'bg-cyan-50 dark:bg-cyan-900/30 border-cyan-400 shadow-lg shadow-cyan-400/10' : 'bg-earth-50 dark:bg-earth-900 border-earth-200 dark:border-earth-800'}`}>
                              <p className="text-[10px] font-black text-earth-400 dark:text-earth-500 uppercase tracking-widest mb-3">Main Valve</p>
                              <div className="flex items-center justify-center gap-3">
                                 <Power size={24} className={irrigationActive ? 'text-cyan-600 animate-pulse' : 'text-earth-300'} />
                                 <p className={`text-xl font-black tracking-widest ${irrigationActive ? 'text-cyan-900 dark:text-cyan-100' : 'text-earth-400'}`}>{irrigationActive ? 'OPEN' : 'CLOSED'}</p>
                              </div>
                          </div>
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-[2rem] border-2 border-blue-100 dark:border-blue-900/50 text-center">
                              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">Live Pressure</p>
                              <p className="text-2xl font-black text-blue-900 dark:text-blue-100 font-mono tracking-tighter">{irrigationActive ? '4.82' : '0.00'}<span className="text-xs ml-1 font-sans">BAR</span></p>
                          </div>
                      </div>
                      <div className="bg-white dark:bg-earth-800 p-6 rounded-3xl border border-earth-100 dark:border-earth-700">
                          <div className="flex justify-between items-center mb-4">
                              <h5 className="text-xs font-black text-earth-900 dark:text-white uppercase tracking-widest">Zone Distribution</h5>
                              <span className="text-[10px] font-bold text-agro-600 bg-agro-50 dark:bg-agro-900/30 px-2 py-0.5 rounded">Optimized</span>
                          </div>
                          <div className="flex gap-2">
                             {[1,2,3,4,5].map(i => (
                                <div key={i} className={`h-8 flex-1 rounded-lg transition-all duration-1000 ${irrigationActive ? 'bg-cyan-500' : 'bg-earth-100 dark:bg-earth-900'}`} style={{opacity: irrigationActive ? (1 - i*0.1) : 1}}></div>
                             ))}
                          </div>
                      </div>
                      <button 
                         onClick={() => setIrrigationActive(!irrigationActive)}
                         className={`w-full py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl transition-all hover:-translate-y-1 ${irrigationActive ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-600/20' : 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-cyan-600/20'}`}
                      >
                          {irrigationActive ? <><XCircle size={20} /> Terminate Flow</> : <><Droplet size={20} /> Initiate Irrigation Cycle</>}
                      </button>
                  </div>
              );
            case 12: // TerraStore
               return (
                  <div className="space-y-6">
                      <div className="bg-slate-900 p-8 rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-8 opacity-5 text-blue-400 rotate-12">
                              <Snowflake size={120} />
                          </div>
                          <div className="flex items-center justify-between mb-10 relative z-10">
                             <div className="flex items-center gap-5">
                                <div className="bg-blue-500/20 p-4 rounded-2xl text-blue-400 shadow-inner">
                                   <ThermometerSnowflake size={36} />
                                </div>
                                <div>
                                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ambient Storage Temp</p>
                                   <p className="text-4xl font-black text-white font-mono tracking-tighter">{storageTemp.toFixed(1)}°C</p>
                                </div>
                             </div>
                             <div className="text-right">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Humidity</p>
                                <p className="text-2xl font-bold text-blue-400 font-mono">82%</p>
                             </div>
                          </div>
                          <div className="relative mb-6">
                              <input 
                                type="range" min="0" max="25" step="0.1" 
                                value={storageTemp} 
                                onChange={(e) => setStorageTemp(parseFloat(e.target.value))}
                                className="w-full accent-blue-500 h-3 bg-slate-800 rounded-full appearance-none cursor-pointer border border-white/5"
                              />
                              <div className="flex justify-between text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mt-3 px-1">
                                  <span>Freezing</span>
                                  <span className="text-blue-400">Target Zone</span>
                                  <span>Ambient</span>
                              </div>
                          </div>
                      </div>
                      <button onClick={() => onNavigate?.(View.SUPPLY)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all hover:-translate-y-1 shadow-lg shadow-emerald-600/20">
                          <Warehouse size={20} /> Enter Inventory Vault
                      </button>
                  </div>
              );
            case 9: // Tokenz
               return (
                  <div className="space-y-6">
                      <div className="bg-amber-50 dark:bg-amber-950/20 border-2 border-dashed border-amber-200 dark:border-amber-900/50 p-8 rounded-[3rem] text-center relative overflow-hidden group">
                          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                          <p className="text-[10px] font-black text-amber-600 dark:text-amber-500 uppercase tracking-[0.4em] mb-6">Real-Time Currency Node</p>
                          <div className="flex items-center justify-center gap-5 mb-6">
                             <div className="flex-1 bg-white dark:bg-earth-800 p-5 rounded-2xl border border-amber-100 dark:border-amber-900/50 shadow-sm">
                                <span className="text-[8px] text-earth-400 uppercase font-black block mb-2">Network TKZ</span>
                                <input 
                                    type="number" 
                                    value={tokenAmount} 
                                    onChange={(e) => setTokenAmount(e.target.value)} 
                                    className="w-full text-center font-black text-2xl text-amber-900 dark:text-amber-100 bg-transparent focus:outline-none" 
                                />
                             </div>
                             <div className="bg-amber-500 text-white p-3 rounded-full shadow-lg group-hover:rotate-180 transition-transform duration-500">
                                <ArrowRightLeft size={20} />
                             </div>
                             <div className="flex-1 bg-white dark:bg-earth-800 p-5 rounded-2xl border border-amber-100 dark:border-amber-900/50 shadow-sm">
                                <span className="text-[8px] text-earth-400 uppercase font-black block mb-2">Fiat USD Value</span>
                                <p className="font-black text-2xl text-agro-700 dark:text-agro-400 font-mono tracking-tighter">${(parseFloat(tokenAmount || '0') * 1.04).toFixed(2)}</p>
                             </div>
                          </div>
                          <p className="text-[9px] text-amber-500 font-bold uppercase tracking-widest">Network Fee: 0.1 TKZ • Instant Liquidity</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <button onClick={() => onNavigate?.(View.FINANCE)} className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 shadow-lg shadow-amber-600/20 transition-all hover:-translate-y-1">
                              <Coins size={18} /> Buy Tokenz
                          </button>
                          <button onClick={() => alert("Redirecting to swap interface...")} className="w-full bg-white dark:bg-earth-800 border-2 border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-400 py-4 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.2em] transition-all hover:bg-amber-50">
                              Swap Assets
                          </button>
                      </div>
                  </div>
              );
            case 5: // AgroInPDF
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-5 p-5 bg-slate-50 dark:bg-earth-900 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 shadow-inner">
                            <div className="p-4 bg-white dark:bg-earth-800 rounded-2xl text-slate-600 dark:text-slate-400 shadow-lg border border-black/5">
                                <Library size={32} />
                            </div>
                            <div>
                                <p className="text-base font-bold text-slate-800 dark:text-white">Ag-Knowledge Base</p>
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">4,250+ Verified Documents</p>
                            </div>
                        </div>
                        <div className="relative group">
                            <Search className="absolute left-4 top-4 text-slate-400 group-focus-within:text-agro-600 transition-colors" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search: 'Soil manual', 'Drip design'..." 
                                className="w-full pl-12 pr-6 py-4 bg-white dark:bg-earth-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl text-sm font-medium focus:outline-none focus:border-agro-400 transition-all shadow-sm" 
                            />
                        </div>
                        <div className="space-y-3">
                           {['Arid Zone Drip Guide', 'Coffee Pest Manual 2024'].map((doc, i) => (
                              <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-earth-800 border border-slate-50 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer group transition-all hover:border-agro-100">
                                 <span className="font-bold text-sm text-slate-700 dark:text-slate-300 group-hover:text-agro-600 transition-colors">{doc}</span>
                                 <div className="flex gap-4">
                                     <Download size={18} className="text-slate-300 group-hover:text-agro-500 transition-all group-hover:scale-110" />
                                     <ExternalLink size={18} className="text-slate-300 group-hover:text-blue-500 transition-all group-hover:scale-110" />
                                 </div>
                              </div>
                           ))}
                        </div>
                        <button onClick={() => onNavigate?.(View.MEDIA)} className="w-full bg-slate-800 hover:bg-slate-950 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl transition-all hover:-translate-y-1">
                            <Monitor size={20} /> Global Media Portal
                        </button>
                    </div>
                );
            case 8: // ChildsLabour
                 return (
                    <div className="space-y-6">
                         <div className="bg-yellow-50 dark:bg-yellow-950/20 p-8 rounded-[3.5rem] text-center border-2 border-dashed border-yellow-200 dark:border-yellow-800 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
                                <Award size={150} />
                            </div>
                            <Award size={64} className="text-yellow-500 mx-auto mb-4 drop-shadow-lg" />
                            <h5 className="text-xs font-black text-yellow-800 dark:text-yellow-300 uppercase tracking-[0.3em] mb-2">Module: Soil Ecosystems</h5>
                            <p className="text-2xl font-black text-yellow-900 dark:text-white mb-8">{learningProgress}% Mastery reached</p>
                            <div className="w-full bg-earth-100 dark:bg-earth-900 h-4 rounded-full overflow-hidden mb-10 border border-yellow-200 dark:border-yellow-800 shadow-inner">
                                <div className="bg-gradient-to-r from-yellow-400 to-amber-600 h-full transition-all duration-[2s] ease-out relative" style={{width: `${learningProgress}%`}}>
                                    <div className="absolute inset-0 bg-white/20 animate-progress"></div>
                                </div>
                            </div>
                            <button 
                                onClick={() => setLearningProgress(Math.min(100, learningProgress + 2))}
                                className="bg-white dark:bg-earth-800 text-yellow-700 dark:text-yellow-400 px-10 py-4 rounded-[2rem] font-black uppercase text-[10px] tracking-widest border-2 border-yellow-200 dark:border-yellow-900 shadow-lg hover:bg-yellow-50 transition-all hover:-translate-y-1 active:translate-y-0"
                            >
                                {learningProgress === 100 ? 'Claim Badge' : 'Continue Lesson'}
                            </button>
                         </div>
                         <button onClick={() => onNavigate?.(View.SMART_FARM_VR)} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-5 rounded-[2.5rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-lg shadow-yellow-500/20 transition-all hover:-translate-y-1">
                             <Gamepad2 size={24} /> Launch Academy VR
                         </button>
                    </div>
                );
            case 7: // Juiezy Cookiez
               return (
                  <div className="space-y-6">
                      <div className="bg-orange-50 dark:bg-orange-950/20 p-8 rounded-[3rem] border-2 border-orange-100 dark:border-orange-900/50 shadow-inner">
                          <h5 className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-[0.25em] mb-6 text-center">Batch Sourcing Customizer</h5>
                          <div className="flex gap-5 justify-center mb-8">
                              {['Moringa', 'Sorghum', 'Honey'].map(flavor => (
                                  <button key={flavor} className="flex flex-col items-center gap-3 p-5 bg-white dark:bg-earth-800 rounded-3xl border-2 border-transparent hover:border-orange-400 hover:shadow-xl transition-all group/f">
                                      <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover/f:scale-110 group-hover/f:bg-orange-200 transition-all shadow-md"><Utensils size={24} /></div>
                                      <span className="text-[10px] font-black text-earth-700 dark:text-earth-200 uppercase tracking-widest">{flavor}</span>
                                  </button>
                              ))}
                          </div>
                          <div className="bg-white/60 dark:bg-earth-900/60 p-4 rounded-2xl border border-orange-100 dark:border-orange-900/50 flex justify-between items-center">
                              <span className="text-[10px] font-black text-orange-800 dark:text-orange-300 uppercase tracking-widest">Sustainability Verified</span>
                              <CheckCircle2 size={16} className="text-agro-500" />
                          </div>
                      </div>
                      <button onClick={() => onNavigate?.(View.PRODUCTS)} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-5 rounded-[2.5rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl shadow-orange-600/20 transition-all hover:-translate-y-1">
                          <ShoppingBag size={20} /> Place Direct Farm Order
                      </button>
                  </div>
              );
          default:
              return <p className="text-earth-500 italic text-center py-20">Portal system initializing...</p>;
      }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white dark:bg-earth-950 min-h-screen transition-colors duration-300">
      
      {/* Network Header Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 animate-in fade-in duration-700">
          {BRAND_STATS.map((stat, i) => (
              <div key={i} className="agro-glass p-8 rounded-[2.5rem] shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all border border-earth-100 dark:border-white/5">
                  <div className="bg-agro-50 dark:bg-agro-900/30 p-5 rounded-2xl text-agro-600 dark:text-agro-400 group-hover:scale-110 transition-transform shadow-inner ring-1 ring-agro-100 dark:ring-agro-900">
                      {stat.icon}
                  </div>
                  <div>
                      <div className="text-4xl font-black text-earth-900 dark:text-white leading-none mb-1 tracking-tighter">{stat.value}</div>
                      <div className="text-[10px] text-earth-400 dark:text-earth-500 font-black uppercase tracking-[0.2em]">{stat.label}</div>
                  </div>
              </div>
          ))}
      </div>

      {/* Hero Text Section */}
      <div className="text-center mb-24 max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-3 bg-agro-50 dark:bg-agro-900/40 text-agro-700 dark:text-agro-400 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-12 border border-agro-100 dark:border-agro-800 shadow-sm animate-pulse-gentle">
            <Zap size={18} fill="currentColor" /> THE COLLECTIVE ECOSYSTEM
        </div>
        <h2 className="text-5xl md:text-7xl font-serif font-bold text-agro-900 dark:text-white mb-8 leading-tight tracking-tight">Our Brand Family</h2>
        <p className="text-2xl text-earth-500 dark:text-earth-400 leading-relaxed font-medium max-w-3xl mx-auto">
          EnvirosAgro operates a diverse network of specialized brands, each amplifying a specific facet of agricultural sustainability through our <strong>Five Thrusts</strong> framework.
        </p>
      </div>

      {/* Brand Cards Grid */}
      <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-16 mb-32 max-w-5xl mx-auto">
        {BRANDS.map((brand) => (
          <div key={brand.id} 
             onClick={() => setSelectedBrand(brand)}
             className={`p-10 md:p-16 rounded-[4.5rem] border-2 border-earth-100 ${brand.color} dark:bg-earth-900 dark:border-earth-800 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden cursor-pointer flex flex-col`}
          >
            {/* Background Blob Element */}
            <div className={`absolute top-0 right-0 w-[50%] h-full ${brand.blobColor} dark:bg-white/5 rounded-l-[12rem] pointer-events-none group-hover:scale-105 transition-transform duration-[3s] opacity-40`}></div>
            
            <div className="flex items-start justify-between mb-12 relative z-10">
              <div className="bg-white dark:bg-earth-800 p-8 rounded-[2.5rem] shadow-2xl border border-black/5 group-hover:scale-110 transition-transform duration-700 ring-4 ring-white/50">
                {brand.icon}
              </div>
              <div className="flex flex-col items-end gap-6">
                 <span className="px-8 py-3 bg-white/90 dark:bg-black/40 backdrop-blur-md rounded-full text-[10px] font-black text-earth-500 dark:text-earth-300 uppercase tracking-[0.3em] border border-white/40 shadow-xl">
                    {brand.tier}
                 </span>
                 <button className="bg-white dark:bg-earth-800 hover:bg-agro-50 p-4 rounded-full text-earth-300 hover:text-agro-600 transition-all shadow-2xl hover:scale-110">
                    <ArrowRight size={28} />
                 </button>
              </div>
            </div>
            
            <div className="flex-1 relative z-10 pr-[35%]">
                <h3 className="text-5xl font-black text-earth-900 dark:text-white mb-3 leading-tight tracking-tighter">{brand.name}</h3>
                <p className={`text-xs font-black ${brand.accentColor} dark:text-agro-400 uppercase tracking-[0.3em] mb-8`}>{brand.tagline}</p>
                <p className="text-xl text-earth-500 dark:text-earth-400 leading-relaxed mb-12 font-medium">
                   {brand.description}
                </p>
                
                {/* Capability Pills */}
                <div className="flex flex-wrap gap-3 mb-16">
                   {brand.features.map((feat, i) => (
                      <span key={i} className="text-[10px] font-black text-earth-400 dark:text-earth-500 uppercase tracking-widest bg-white/40 dark:bg-black/20 px-4 py-2 rounded-full border border-earth-100 dark:border-earth-800 backdrop-blur-sm">
                         {feat}
                      </span>
                   ))}
                </div>
            </div>
            
            <div className="relative z-10 flex items-center gap-6 text-blue-500 dark:text-blue-400 font-black text-sm uppercase tracking-[0.2em] transition-all group-hover:gap-10 border-t-2 border-black/5 dark:border-white/5 pt-12">
               <div className="p-3 bg-blue-50 dark:bg-blue-900/40 rounded-[1.5rem] group-hover:bg-blue-100 group-hover:scale-110 transition-all shadow-sm">
                  <ChevronRight size={24} className="transform rotate-45" />
               </div>
               <span>Enter Brand Portal</span>
            </div>
          </div>
        ))}
      </div>

      {/* Brand Portal Modal */}
      {selectedBrand && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-900/90 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto" onClick={() => setSelectedBrand(null)}>
              <div 
                  className="w-full max-w-2xl rounded-[5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 bg-white dark:bg-earth-950 border-4 border-earth-100 dark:border-earth-900 my-8"
                  onClick={(e) => e.stopPropagation()}
              >
                  <div className={`p-14 ${selectedBrand.color} dark:bg-agro-900/20 border-b border-earth-100 dark:border-earth-800 relative`}>
                      <button 
                          onClick={() => setSelectedBrand(null)}
                          className="absolute top-10 right-10 bg-white/80 dark:bg-black/30 hover:bg-white p-3 rounded-full transition-all text-earth-600 dark:text-white shadow-xl hover:rotate-90 active:scale-90"
                      >
                          <X size={28} />
                      </button>
                      
                      <div className="flex flex-col items-center text-center">
                          <div className="bg-white dark:bg-earth-800 p-8 rounded-[3.5rem] shadow-2xl mb-10 ring-[15px] ring-white/30 dark:ring-black/20 border border-black/5">
                             {React.cloneElement(selectedBrand.icon as React.ReactElement, { size: 64 })}
                          </div>
                          <h2 className="text-5xl font-serif font-bold text-earth-900 dark:text-white mb-3 tracking-tighter">{selectedBrand.name}</h2>
                          <p className="text-[10px] font-black text-agro-700 dark:text-agro-400 uppercase tracking-[0.5em]">{selectedBrand.tagline}</p>
                      </div>
                  </div>

                  <div className="p-14">
                      <p className="text-xl text-earth-500 dark:text-earth-400 mb-14 text-center leading-relaxed font-medium">
                          {selectedBrand.description}
                      </p>
                      
                      <div className="bg-earth-50 dark:bg-earth-900/50 p-12 rounded-[4rem] border-2 border-earth-100 dark:border-earth-800 shadow-inner relative overflow-hidden">
                          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid.png')]"></div>
                          <h4 className="font-black text-earth-300 dark:text-earth-600 mb-12 text-[10px] uppercase tracking-[0.6em] text-center flex items-center justify-center gap-8 relative z-10">
                             <span className="w-16 h-px bg-earth-200 dark:bg-earth-800"></span> LIVE PORTAL EXPERIENCE <span className="w-16 h-px bg-earth-200 dark:bg-earth-800"></span>
                          </h4>
                          <div className="relative z-10">
                            {renderPortalContent(selectedBrand)}
                          </div>
                      </div>
                  </div>
                  
                  <div className="p-10 bg-earth-50 dark:bg-earth-900/30 text-center border-t border-earth-100 dark:border-earth-800">
                      <p className="text-[10px] text-earth-400 dark:text-earth-600 font-black uppercase tracking-[0.4em]">Powered by EnvirosAgro Unified Framework</p>
                  </div>
              </div>
          </div>
      )}

      {/* Unified Mission Strip */}
      <div className="bg-agro-900 dark:bg-agro-950 rounded-[6rem] p-24 lg:p-40 text-center text-white relative overflow-hidden shadow-2xl mb-24 transition-all">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-[60rem] h-[60rem] bg-white rounded-full blur-[250px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[60rem] h-[60rem] bg-agro-500 rounded-full blur-[250px] translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="relative z-10">
          <div className="w-32 h-32 bg-white/10 rounded-[3rem] flex items-center justify-center mx-auto mb-16 backdrop-blur-md border border-white/20 shadow-2xl ring-8 ring-white/5 animate-float">
              <Globe size={64} className="text-agro-300" />
          </div>
          <h3 className="text-6xl md:text-8xl font-serif font-bold mb-12 leading-tight max-w-5xl mx-auto tracking-tighter">A Unified Network of Excellence</h3>
          <p className="text-agro-100 text-3xl max-w-4xl mx-auto mb-24 leading-relaxed font-light">
            From industrial assets to child growth, every EnvirosAgro brand is bound by a shared commitment to the <strong>m(t) Resilience Constant</strong>, ensuring holistic progress for all stakeholders.
          </p>
          <div className="flex flex-wrap justify-center gap-y-16 gap-x-24 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-[2s]">
            {BRANDS.map(brand => (
                <span key={brand.id} className="text-4xl font-serif font-bold whitespace-nowrap hover:text-agro-300 cursor-default transition-all hover:scale-110">{brand.name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};