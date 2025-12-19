import React, { useState, useRef } from 'react';
import { 
  ShieldAlert, Map, AlertTriangle, Bug, Droplets, Thermometer, 
  ChevronRight, Bell, Phone, CheckCircle2, XCircle, X, Smartphone, 
  Loader2, Zap, Globe, ShieldCheck, MapPin, Camera, Send, Info,
  PhoneCall, LifeBuoy, AlertCircle, Radio, Navigation, Check,
  Activity, ArrowLeft, Share2, FileText, Microscope, Search,
  Clock, ListChecks, ExternalLink, Siren, Wifi, Users, SignalHigh
} from 'lucide-react';
import { View } from '../types';

const ALERTS = [
  {
    id: 1,
    title: "Fall Armyworm Outbreak",
    region: "Central & Eastern Zones",
    level: "Critical",
    type: "Pest",
    date: "2 hours ago",
    desc: "High larval density detected in maize fields. Immediate scouting recommended.",
    action: "Apply neem-based bio-pesticides or approved IPM controls immediately.",
    icon: <Bug size={24} />,
    color: "bg-red-50 border-red-200 text-red-800",
    fullReport: "Satellite telemetry from Sentinel-Sync indicates a 40% increase in larval canopy damage across the Central cluster. Weather conditions (humid/warm) are currently accelerating the life cycle. Failure to treat within 48 hours could result in a 60% yield loss for late-stage crops.",
    coordinates: "0.45S, 36.9E",
    protocol: ["Field Scouting", "Pheromone Trap Setup", "Biological Agent Deployment"]
  },
  {
    id: 2,
    title: "Coffee Berry Disease (CBD)",
    region: "High Altitude Areas",
    level: "High",
    type: "Fungal",
    date: "Today, 08:00 AM",
    desc: "Cold, wet conditions favoring Colletotrichum kahawae spread.",
    action: "Ensure proper canopy aeration and apply copper-based fungicides if threshold exceeded.",
    icon: <Droplets size={24} />,
    color: "bg-orange-50 border-orange-200 text-orange-800",
    fullReport: "In-situ moisture sensors (TA Thrust) are reporting 90% leaf wetness for sustained 6-hour intervals. This creates the optimal window for fungal germination. Farmers in altitudes above 1,600m are at maximum risk. Precision pruning is the first line of defense to increase airflow.",
    coordinates: "0.58S, 37.1E",
    protocol: ["Canopy Pruning", "Humidity Level Log", "Fungicide Rotation"]
  },
  {
    id: 3,
    title: "Heat Stress Warning",
    region: "Lowland Pastures",
    level: "Moderate",
    type: "Weather",
    date: "Yesterday",
    desc: "Temperatures expected to exceed 35°C. Livestock at risk of dehydration.",
    action: "Increase water availability and provide shade for all grazing animals.",
    icon: <Thermometer size={24} />,
    color: "bg-yellow-50 border-yellow-200 text-yellow-800",
    fullReport: "Regional m(t) indices predict a localized heat dome over the semi-arid pastures for the next 72 hours. Evapotranspiration rates are high. Soil moisture In(val) is dropping to critical levels (12%). Strategic water reserves must be managed for livestock priority.",
    coordinates: "1.12S, 38.2E",
    protocol: ["Livestock Shading", "Hydration Schedule", "Mulching Exposed Soil"]
  }
];

const EMERGENCY_CONTACTS = [
  { region: "Global HQ", service: "Strategic Response", phone: "+254 700 000 000" },
  { region: "East Africa", service: "Biological Threat Unit", phone: "999-AGRO" },
  { region: "Regional", service: "Water Authority (Crisis)", phone: "+254 800 111 222" },
  { region: "Veterinary", service: "Zoonotic Disease Alert", phone: "+254 722 999 888" }
];

interface SafeHarvestProps {
  onNavigate?: (view: View) => void;
}

export const SafeHarvest: React.FC<SafeHarvestProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'ALERTS' | 'MAP'>('ALERTS');
  const [selectedAlert, setSelectedAlert] = useState<typeof ALERTS[0] | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Modals
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [showHotlineModal, setShowHotlineModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showSpecializedModal, setShowSpecializedModal] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  
  // States
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsStatus, setSmsStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS'>('IDLE');
  const [reportStatus, setReportStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS'>('IDLE');
  const [specializedStatus, setSpecializedStatus] = useState<'IDLE' | 'DISPATCHING' | 'CONFIRMED'>('IDLE');
  const [broadcastStatus, setBroadcastStatus] = useState<'IDLE' | 'PROPAGATING' | 'COMPLETED'>('IDLE');
  
  const [isGpsSyncing, setIsGpsSyncing] = useState(false);
  const [evidenceImage, setEvidenceImage] = useState<string | null>(null);
  const [dispatchLog, setDispatchLog] = useState<string[]>([]);
  const [propagationCount, setPropagationCount] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [reportForm, setReportForm] = useState({
    type: 'Pest Outbreak',
    severity: 'High',
    location: '',
    description: ''
  });

  const handleSmsSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setSmsStatus('LOADING');
    setTimeout(() => setSmsStatus('SUCCESS'), 2000);
  };

  const handleGpsSync = () => {
    setIsGpsSyncing(true);
    setTimeout(() => {
      const lat = (-0.6 + Math.random() * 0.1).toFixed(4);
      const lon = (36.8 + Math.random() * 0.1).toFixed(4);
      setReportForm(prev => ({
        ...prev,
        location: `Lat: ${lat}, Lon: ${lon} (Verified Field Node)`
      }));
      setIsGpsSyncing(false);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setEvidenceImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportStatus('SUBMITTING');
    setTimeout(() => {
        setReportStatus('SUCCESS');
        setTimeout(() => {
            setShowReportModal(false);
            setReportStatus('IDLE');
            setEvidenceImage(null);
            setReportForm({ type: 'Pest Outbreak', severity: 'High', location: '', description: '' });
        }, 2500);
    }, 2500);
  };

  const handleRequestSpecialized = () => {
    setShowSpecializedModal(true);
    setSpecializedStatus('DISPATCHING');
    setDispatchLog(['Establishing secure link to BTU Hub...']);
    
    const steps = [
        "Biological Threat Unit (BTU) acknowledged signal.",
        "Regional response team 'Alpha-4' mobilized.",
        "Treatment payload: 'Azadirachtin Bio-Inhibitor' reserved.",
        "Estimated arrival: 45 minutes to designated coordinates."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
        if (currentStep < steps.length) {
            setDispatchLog(prev => [...prev, steps[currentStep]]);
            currentStep++;
        } else {
            clearInterval(interval);
            setSpecializedStatus('CONFIRMED');
        }
    }, 1500);
  };

  const handleBroadcastNeighbors = () => {
    setShowBroadcastModal(true);
    setBroadcastStatus('PROPAGATING');
    setPropagationCount(0);
    
    const total = Math.floor(Math.random() * 40) + 12;
    const increment = Math.ceil(total / 10);
    
    const interval = setInterval(() => {
        setPropagationCount(prev => {
            const next = prev + increment;
            if (next >= total) {
                clearInterval(interval);
                setBroadcastStatus('COMPLETED');
                return total;
            }
            return next;
        });
    }, 300);
  };

  const handleViewAlert = (alert: typeof ALERTS[0]) => {
    setIsVerifying(true);
    setTimeout(() => {
        setIsVerifying(false);
        setSelectedAlert(alert);
    }, 1200);
  };

  const renderAlertDetail = (alert: typeof ALERTS[0]) => (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
        <button 
            onClick={() => setSelectedAlert(null)}
            className="mb-8 flex items-center gap-2 text-earth-500 hover:text-red-600 font-black text-[10px] uppercase tracking-[0.2em] transition-all group"
        >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Feed
        </button>

        <div className="bg-white dark:bg-earth-900 rounded-[3rem] shadow-2xl border border-earth-100 dark:border-earth-800 overflow-hidden mb-12">
            <div className={`p-8 md:p-12 ${alert.color.split(' ')[0]} dark:bg-red-950/20 border-b border-earth-100 dark:border-earth-800 relative`}>
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    {React.cloneElement(alert.icon as React.ReactElement, { size: 180 })}
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-6">
                        <div className="p-5 bg-white dark:bg-earth-800 rounded-[2rem] shadow-xl text-red-600">
                            {alert.icon}
                        </div>
                        <div>
                            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block">Active {alert.type} Threat</span>
                            <h2 className="text-4xl font-serif font-bold text-earth-900 dark:text-white">{alert.title}</h2>
                        </div>
                    </div>
                    <div className="flex flex-col md:items-end text-sm font-bold text-earth-500">
                        <span className="flex items-center gap-2 uppercase tracking-widest"><MapPin size={16} className="text-red-500" /> {alert.region}</span>
                        <span className="flex items-center gap-2 uppercase tracking-widest mt-1"><Clock size={16} /> Broadcasted {alert.date}</span>
                    </div>
                </div>
            </div>

            <div className="p-8 md:p-16">
                <div className="grid lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-7">
                        <section className="mb-12">
                            <h4 className="text-xs font-black text-red-600 uppercase tracking-[0.3em] mb-6">Diagnostic Intelligence</h4>
                            <p className="text-xl text-earth-700 dark:text-earth-300 leading-relaxed font-medium">
                                {alert.fullReport}
                            </p>
                        </section>

                        <div className="bg-earth-50 dark:bg-earth-800/50 p-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-700">
                            <h4 className="text-xs font-black text-red-600 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                                <ListChecks size={18} /> Emergency Response Protocol
                            </h4>
                            <div className="space-y-4">
                                {alert.protocol.map((step, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-white dark:bg-earth-900 p-4 rounded-2xl border border-earth-100 dark:border-earth-800 shadow-sm">
                                        <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg flex items-center justify-center font-black text-xs">{i+1}</div>
                                        <span className="font-bold text-earth-800 dark:text-earth-200">{step}</span>
                                        <CheckCircle2 size={18} className="ml-auto text-earth-200" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent"></div>
                            <div className="relative z-10">
                                <h4 className="text-xs font-black text-red-400 uppercase tracking-[0.3em] mb-6">Target Vector Coordinates</h4>
                                <div className="p-5 bg-white/5 border border-white/10 rounded-2xl mb-8 flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <Globe size={20} className="text-red-400" />
                                        <span className="font-mono text-xl tracking-widest">{alert.coordinates}</span>
                                    </div>
                                    <button className="text-blue-400 hover:text-blue-300"><ExternalLink size={20} /></button>
                                </div>
                                <div className="aspect-video rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center relative overflow-hidden">
                                    <MapPin size={48} className="text-red-600 animate-bounce relative z-10" />
                                    <div className="absolute inset-0 opacity-40">
                                        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <button 
                                onClick={handleRequestSpecialized}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-red-600/20 text-xs uppercase tracking-widest flex items-center justify-center gap-3 active:scale-[0.98]"
                            >
                                <Zap size={20} /> Request Specialized Response
                            </button>
                            <button 
                                onClick={handleBroadcastNeighbors}
                                className="w-full bg-white dark:bg-earth-800 border-2 border-red-100 dark:border-red-900/50 text-red-700 dark:text-red-400 font-black py-5 rounded-2xl transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3 active:scale-[0.98]"
                            >
                                <Share2 size={20} /> Broadcast to Neighbors
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="p-8 bg-red-50 dark:bg-red-950/30 rounded-[3rem] border border-red-100 dark:border-red-900/50 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-white dark:bg-earth-800 rounded-full flex items-center justify-center mb-4 shadow-xl border border-red-100">
                <Microscope size={32} className="text-red-600" />
            </div>
            <h4 className="text-xl font-bold text-red-900 dark:text-red-100 mb-2">Verified Biological Audit</h4>
            <p className="text-red-800 dark:text-red-300 text-sm max-w-xl mx-auto leading-relaxed">
                This alert has been hashed and verified via regional field diagnostics and satellite biomass deltas. For technical assistance with treatment calibration, consult the AI Advisor.
            </p>
        </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      
      {/* VERIFYING OVERLAY */}
      {isVerifying && (
          <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-red-950/90 backdrop-blur-xl animate-in fade-in duration-300">
              <div className="relative">
                  <div className="w-32 h-32 rounded-full border-[8px] border-red-500/20 border-t-red-500 animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                      <ShieldAlert size={48} className="text-red-500 animate-pulse" />
                  </div>
              </div>
              <h4 className="text-white font-serif text-3xl font-bold mt-10 tracking-tight">Accessing Threat Telemetry</h4>
              <p className="text-red-400 font-mono text-xs uppercase tracking-[0.4em] mt-4 animate-pulse">Syncing with Biological Audit Node...</p>
          </div>
      )}

      {/* DETAILED VIEW RENDER */}
      {selectedAlert ? renderAlertDetail(selectedAlert) : (
        <>
            {/* Header */}
            <div className="bg-red-900 rounded-[3.5rem] p-10 md:p-16 text-white mb-16 relative overflow-hidden shadow-2xl border-4 border-red-950/20">
                <div className="absolute top-0 right-0 p-8 opacity-10 transform scale-150 pointer-events-none">
                    <ShieldAlert size={300} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 text-red-300 font-black uppercase tracking-[0.3em] text-[10px] mb-6">
                            <span className="w-2 h-2 bg-red-400 rounded-full animate-ping"></span> Health Agriculture Intelligence
                        </div>
                        <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-[0.9] tracking-tighter">SafeHarvest <br/><span className="text-red-400 italic">Alert Network</span></h2>
                        <p className="text-red-100 text-xl max-w-2xl leading-relaxed font-medium">
                            Protecting the global food system through real-time biological threat detection and standardized emergency response.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <button 
                            onClick={() => setShowSmsModal(true)}
                            className="flex-1 md:flex-none bg-white text-red-900 px-10 py-5 rounded-[2rem] font-black uppercase text-[10px] tracking-widest hover:bg-red-50 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                        >
                            <Bell size={18} /> Subscribe to SMS
                        </button>
                        <button 
                            onClick={() => setShowHotlineModal(true)}
                            className="flex-1 md:flex-none bg-red-800 text-white border-2 border-red-700/50 px-10 py-5 rounded-[2rem] font-black uppercase text-[10px] tracking-widest hover:bg-red-700 transition-all flex items-center justify-center gap-3 shadow-lg"
                        >
                            <Phone size={18} /> Emergency Hotline
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-12 border-b border-earth-200 dark:border-earth-800 pb-1">
                <button 
                    onClick={() => setActiveTab('ALERTS')}
                    className={`px-8 py-4 font-black text-xs uppercase tracking-widest rounded-t-2xl transition-all flex items-center gap-3 relative top-[1px] ${activeTab === 'ALERTS' ? 'bg-white dark:bg-earth-900 text-red-700 dark:text-red-400 border-x border-t border-earth-200 dark:border-earth-800 shadow-sm' : 'text-earth-400 hover:text-red-600'}`}
                >
                    <AlertTriangle size={18} /> Active Alerts <span className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 px-2 py-0.5 rounded-full text-[10px] font-black">{ALERTS.length}</span>
                </button>
                <button 
                    onClick={() => setActiveTab('MAP')}
                    className={`px-8 py-4 font-black text-xs uppercase tracking-widest rounded-t-2xl transition-all flex items-center gap-3 relative top-[1px] ${activeTab === 'MAP' ? 'bg-white dark:bg-earth-900 text-red-700 dark:text-red-400 border-x border-t border-earth-200 dark:border-earth-800 shadow-sm' : 'text-earth-400 hover:text-red-600'}`}
                >
                    <Map size={18} /> Risk Telemetry
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
                
                {/* Main Content Area */}
                <div className="lg:col-span-2">
                    {activeTab === 'ALERTS' ? (
                        <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                            {ALERTS.map((alert) => (
                                <div 
                                    key={alert.id} 
                                    onClick={() => handleViewAlert(alert)}
                                    className={`rounded-[2.5rem] p-10 border border-earth-100 dark:border-earth-800 bg-white dark:bg-earth-900 transition-all hover:shadow-2xl hover:-translate-y-1 group cursor-pointer relative overflow-hidden`}
                                >
                                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity">
                                        {React.cloneElement(alert.icon as React.ReactElement, { size: 150 })}
                                    </div>

                                    <div className="flex justify-between items-start mb-8 relative z-10">
                                        <div className="flex gap-6">
                                            <div className={`p-5 rounded-2xl h-fit bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 shadow-inner text-red-600`}>
                                                {alert.icon}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-bold text-2xl text-earth-900 dark:text-white leading-tight">{alert.title}</h3>
                                                    {alert.level === 'Critical' && (
                                                        <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase animate-pulse shadow-lg shadow-red-600/20">Critical</span>
                                                    )}
                                                </div>
                                                <p className="text-[10px] text-earth-400 font-black uppercase tracking-widest flex items-center gap-2">
                                                    {alert.region} <span className="w-1 h-1 bg-earth-200 rounded-full"></span> {alert.date}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bg-earth-50 dark:bg-earth-800 p-3 rounded-full text-earth-300 group-hover:text-red-500 group-hover:scale-110 transition-all">
                                            <ChevronRight size={24} />
                                        </div>
                                    </div>
                                    
                                    <p className="text-earth-600 dark:text-earth-400 mb-8 text-lg leading-relaxed relative z-10 font-medium line-clamp-2">
                                        {alert.desc}
                                    </p>
                                    
                                    <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-2xl border border-red-100 dark:border-red-900/50 flex items-center justify-between group-hover:bg-red-100 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-white dark:bg-earth-800 rounded-full flex items-center justify-center text-red-600 shadow-sm">
                                                <Zap size={16} fill="currentColor" />
                                            </div>
                                            <span className="text-sm font-bold text-red-900 dark:text-red-200">Recommended Intervention Active</span>
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-red-600 dark:text-red-400">View Protocol</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-earth-900 rounded-[3.5rem] p-6 border border-earth-100 dark:border-earth-800 shadow-sm h-[700px] relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
                            <img 
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&auto=format&fit=crop&q=80" 
                                className="w-full h-full object-cover rounded-[3rem] opacity-90 grayscale-[20%]"
                                alt="Risk Map"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white/95 dark:from-earth-950 via-transparent to-transparent pointer-events-none"></div>
                            
                            <div className="absolute top-1/2 left-1/3 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-full shadow-2xl border-4 border-white dark:border-earth-800 animate-bounce flex items-center gap-2">
                                <Bug size={14} /> Critical Pest Zone
                            </div>
                            <div className="absolute top-1/3 right-1/4 bg-orange-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-full shadow-2xl border-4 border-white dark:border-earth-800 flex items-center gap-2">
                                <Droplets size={14} /> High Fungal Risk
                            </div>

                            <div className="absolute bottom-10 left-10 right-10 bg-white/95 dark:bg-earth-900/95 backdrop-blur-md p-10 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-2xl">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h4 className="font-black text-earth-900 dark:text-white uppercase tracking-[0.3em] text-xs mb-1">Regional Status: Central Province</h4>
                                        <p className="text-[10px] font-bold text-earth-400 uppercase">Last Sync: 4m ago via Sentinel-Sync</p>
                                    </div>
                                    <span className="text-[10px] font-black text-red-600 uppercase tracking-widest bg-red-50 dark:bg-red-950/30 px-3 py-1.5 rounded-xl border border-red-100 dark:border-red-900/50">High Resilience Gap</span>
                                </div>
                                <div className="w-full bg-earth-200 dark:bg-earth-800 h-4 rounded-full overflow-hidden mb-4 shadow-inner">
                                    <div className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-600 w-[85%] h-full relative">
                                        <div className="absolute inset-0 bg-white/20 animate-progress"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between text-[9px] text-earth-400 font-black uppercase tracking-[0.4em] px-1">
                                    <span>Stable Baseline</span>
                                    <span>Monitoring Active</span>
                                    <span className="text-red-500">Crisis Threshold Reached</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar: Report & Prevention */}
                <div className="space-y-8">
                    <div className="bg-white dark:bg-earth-900 p-10 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm text-center group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] rotate-12 group-hover:scale-110 transition-transform">
                           <AlertTriangle size={150} />
                        </div>
                        <div className="w-20 h-20 bg-red-50 dark:bg-red-950/30 rounded-3xl flex items-center justify-center mx-auto mb-8 text-red-600 shadow-inner group-hover:scale-110 transition-transform duration-500 relative z-10">
                            <AlertTriangle size={40} />
                        </div>
                        <h3 className="font-bold text-2xl text-earth-900 dark:text-white mb-3 relative z-10">Spot a Threat?</h3>
                        <p className="text-earth-500 dark:text-earth-400 text-sm mb-10 leading-relaxed font-medium relative z-10">
                            Early detection is the cornerstone of the HA Thrust. Report unusual biological activity to trigger a localized audit.
                        </p>
                        <button 
                            onClick={() => setShowReportModal(true)}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-red-600/20 active:scale-95 uppercase text-xs tracking-[0.2em] relative z-10"
                        >
                            Submit Field Report
                        </button>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/10 p-10 rounded-[3rem] border border-green-100 dark:border-earth-800 shadow-sm">
                        <h3 className="font-bold text-xl text-green-900 dark:text-green-100 mb-8 flex items-center gap-3">
                            <CheckCircle2 size={24} className="text-green-600" /> Prevention Standards
                        </h3>
                        <ul className="space-y-6">
                            {[
                                { t: "Break Pest Cycles", d: "Alternate host crops (e.g. Maize/Beans) to prevent larval establishment." },
                                { t: "Field Sanitation", d: "Standardized disposal of infected debris at 10m minimum from core plots." },
                                { t: "Inbound Verification", d: "Only utilize ESIN-Verified disease-free seeds for seasonal restarts." }
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4 items-start group">
                                    <div className="w-6 h-6 bg-white dark:bg-earth-800 rounded-full flex items-center justify-center text-[10px] font-black text-green-600 shadow-sm group-hover:scale-110 transition-transform shrink-0 mt-1">
                                        {i+1}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-green-900 dark:text-green-100 text-sm leading-none mb-1.5">{item.t}</h4>
                                        <p className="text-xs text-green-800 dark:text-green-400 leading-relaxed font-medium">{item.d}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-agro-950 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 transition-transform duration-1000 group-hover:rotate-45">
                            <ShieldCheck size={180} />
                        </div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-3 relative z-10">
                            <ShieldCheck size={24} className="text-agro-400" /> Global Immunity
                        </h3>
                        <p className="text-agro-200 text-sm mb-10 leading-relaxed font-medium relative z-10">
                            The Health Ag Thrust integrates human, plant, and animal health into a singular biological defense protocol.
                        </p>
                        <button 
                            onClick={() => onNavigate?.(View.SUSTAINABILITY_FRAMEWORK)}
                            className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all relative z-10"
                        >
                            View Framework Docs
                        </button>
                    </div>
                </div>
            </div>
        </>
      )}

      {/* SPECIALIZED RESPONSE MODAL */}
      {showSpecializedModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-red-950/95 backdrop-blur-xl animate-in fade-in duration-300">
              <div className="bg-white dark:bg-earth-900 w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden border border-white/10 flex flex-col">
                  <div className="bg-red-600 p-8 text-white flex justify-between items-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><Siren size={150} /></div>
                      <div className="relative z-10">
                          <h3 className="text-2xl font-serif font-bold">Rapid Response Unit</h3>
                          <p className="text-xs text-red-200 font-bold uppercase tracking-widest mt-1">Direct Strategic Intervention</p>
                      </div>
                      <button 
                        onClick={() => { setShowSpecializedModal(false); setSpecializedStatus('IDLE'); }}
                        className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-all"
                      >
                          <X size={24} />
                      </button>
                  </div>

                  <div className="p-10">
                      {specializedStatus === 'CONFIRMED' ? (
                          <div className="text-center py-8 animate-in zoom-in">
                              <div className="w-24 h-24 bg-green-50 dark:bg-green-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6 text-green-600 shadow-inner ring-8 ring-green-50">
                                  <CheckCircle2 size={56} className="animate-bounce" />
                              </div>
                              <h3 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-4">Response Confirmed</h3>
                              <p className="text-earth-600 dark:text-earth-400 mb-10 max-w-xs mx-auto leading-relaxed">
                                  Unit Alpha-4 is en-route. Please clear technical access lanes and maintain signal parity.
                              </p>
                              <div className="bg-slate-900 text-agro-400 p-4 rounded-xl font-mono text-[10px] tracking-widest uppercase shadow-inner">
                                  ETA: 42M | REF: BTU-XRAY-42
                              </div>
                          </div>
                      ) : (
                          <div className="space-y-6">
                              <div className="bg-slate-950 rounded-2xl p-6 font-mono text-[10px] text-green-400 h-64 overflow-y-auto custom-scrollbar border border-white/5 shadow-2xl">
                                  {dispatchLog.map((log, i) => (
                                      <p key={i} className="mb-2 animate-in fade-in slide-in-from-left-2">{'>'} {log}</p>
                                  ))}
                                  {specializedStatus === 'DISPATCHING' && (
                                      <p className="animate-pulse flex items-center gap-2 mt-4 text-agro-500 font-black tracking-widest">
                                          <Loader2 size={12} className="animate-spin" /> SYNCHRONIZING_ASSET_MOVE_
                                      </p>
                                  )}
                              </div>
                              <p className="text-[10px] text-center text-earth-400 uppercase tracking-widest font-bold">Connecting via Secure SAT-Link</p>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      )}

      {/* BROADCAST NEIGHBORS MODAL */}
      {showBroadcastModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
              <div className="bg-white dark:bg-earth-900 w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden border border-white/10">
                  <div className="bg-slate-900 p-10 text-white flex justify-between items-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><Wifi size={150} /></div>
                      <div className="relative z-10">
                          <h3 className="text-3xl font-serif font-bold">Mesh Propagation</h3>
                          <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mt-1">Localized Alert Broadcast</p>
                      </div>
                      <button 
                        onClick={() => { setShowBroadcastModal(false); setBroadcastStatus('IDLE'); }}
                        className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-all"
                      >
                          <X size={24} />
                      </button>
                  </div>

                  <div className="p-12">
                      <div className="flex flex-col items-center text-center space-y-10">
                          <div className="relative">
                              <div className={`w-32 h-32 rounded-full border-[6px] transition-all duration-1000 ${broadcastStatus === 'COMPLETED' ? 'border-agro-600 bg-agro-50' : 'border-blue-50 border-t-blue-600 animate-spin'}`}></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                  {broadcastStatus === 'COMPLETED' ? (
                                      <Check size={48} className="text-agro-600" />
                                  ) : (
                                      <SignalHigh size={48} className="text-blue-600 animate-pulse" />
                                  )}
                              </div>
                          </div>
                          
                          <div>
                              <div className="text-6xl font-serif font-bold text-slate-900 dark:text-white mb-2">{propagationCount}</div>
                              <p className="text-[10px] font-black text-earth-400 uppercase tracking-[0.4em]">Neighbors Notified</p>
                          </div>

                          <div className="w-full space-y-4">
                              <p className="text-sm text-earth-600 dark:text-earth-400 font-medium leading-relaxed">
                                  {broadcastStatus === 'COMPLETED' 
                                    ? "Critical alert has been successfully propagated to all nodes within the regional radius." 
                                    : "Propagating encrypted threat data across the local mesh network..."}
                              </p>
                              {broadcastStatus === 'COMPLETED' && (
                                  <div className="flex items-center justify-center gap-4 animate-in slide-in-from-bottom-2">
                                      <div className="flex items-center gap-2 text-[10px] font-bold text-agro-600">
                                          <Users size={14} /> Community Shield Active
                                      </div>
                                  </div>
                              )}
                          </div>

                          {broadcastStatus === 'COMPLETED' && (
                              <button 
                                onClick={() => setShowBroadcastModal(false)}
                                className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl text-xs uppercase tracking-widest shadow-xl"
                              >
                                  Return to Brief
                              </button>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* SMS SUBSCRIPTION MODAL */}
      {showSmsModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-earth-950/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowSmsModal(false)}>
              <div 
                  className="bg-white dark:bg-earth-900 w-full max-md rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10"
                  onClick={(e) => e.stopPropagation()}
              >
                  <div className="bg-red-600 p-8 text-white flex justify-between items-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><Bell size={120} /></div>
                      <div className="relative z-10">
                          <h3 className="text-2xl font-serif font-bold">SMS Alerts</h3>
                          <p className="text-xs text-red-200 font-bold uppercase tracking-widest mt-1">Real-time Pathogen Broadcast</p>
                      </div>
                      <button 
                          onClick={() => setShowSmsModal(false)}
                          className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-all"
                      >
                          <X size={24} />
                      </button>
                  </div>

                  <div className="p-10">
                      {smsStatus === 'SUCCESS' ? (
                          <div className="text-center py-6 animate-in zoom-in">
                              <div className="w-20 h-20 bg-green-50 dark:bg-green-900/30 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-green-600 shadow-inner">
                                  <CheckCircle2 size={40} />
                              </div>
                              <h4 className="text-2xl font-bold text-earth-900 dark:text-white mb-2">Subscription Active</h4>
                              <p className="text-earth-500 dark:text-earth-400 text-sm mb-8 leading-relaxed px-4">
                                  You will now receive instant biological threat alerts for your region. Stay safe.
                              </p>
                              <button 
                                  onClick={() => setShowSmsModal(false)}
                                  className="w-full bg-earth-900 dark:bg-earth-700 text-white font-black py-4 rounded-2xl text-xs uppercase tracking-widest shadow-xl"
                              >
                                  Return to Dashboard
                              </button>
                          </div>
                      ) : (
                          <form onSubmit={handleSmsSubscribe} className="space-y-8">
                              <div className="flex items-center gap-4 text-earth-600 dark:text-earth-300">
                                  <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-2xl text-red-600 shrink-0">
                                      <Smartphone size={24} />
                                  </div>
                                  <p className="text-sm font-medium leading-relaxed">
                                      Receive critical pest and disease outbreak notifications directly to your phone.
                                  </p>
                              </div>

                              <div className="space-y-3">
                                  <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest block px-1">Phone Number</label>
                                  <div className="relative">
                                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-earth-200 dark:border-earth-700 pr-3">
                                          <Globe size={14} className="text-earth-400" />
                                          <span className="text-xs font-bold text-earth-600">+254</span>
                                      </div>
                                      <input 
                                          type="tel"
                                          required
                                          value={phoneNumber}
                                          onChange={(e) => setPhoneNumber(e.target.value)}
                                          placeholder="700 000 000"
                                          className="w-full bg-earth-50 dark:bg-earth-800 border border-earth-100 dark:border-earth-700 rounded-2xl pl-24 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-mono text-lg text-earth-900 dark:text-white"
                                      />
                                  </div>
                                  <p className="text-[9px] text-earth-400 font-bold uppercase tracking-widest px-1">Carrier rates may apply • Unsubscribe at any time</p>
                              </div>

                              <button 
                                  type="submit"
                                  disabled={smsStatus === 'LOADING' || !phoneNumber}
                                  className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-red-600/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-xs uppercase tracking-[0.2em]"
                              >
                                  {smsStatus === 'LOADING' ? <><Loader2 size={18} className="animate-spin" /> Syncing Gateway...</> : <><Zap size={18} /> Activate Alerts</>}
                              </button>
                          </form>
                      )}
                  </div>

                  <div className="p-6 bg-earth-50 dark:bg-earth-950/50 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-center gap-2">
                      <ShieldCheck size={16} className="text-agro-600" />
                      <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">SafeHarvest Encrypted Protocol</p>
                  </div>
              </div>
          </div>
      )}

      {/* HOTLINE MODAL */}
      {showHotlineModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-red-950/90 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setShowHotlineModal(false)}>
              <div 
                  className="bg-white dark:bg-earth-900 w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border-4 border-red-500/30"
                  onClick={(e) => e.stopPropagation()}
              >
                  <div className="bg-red-700 p-10 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><PhoneCall size={180} /></div>
                      <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                             <div className="bg-white/20 p-2 rounded-xl border border-white/20"><Radio size={24} className="animate-pulse" /></div>
                             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-200">Critical Response Network</span>
                          </div>
                          <h3 className="text-4xl font-serif font-bold tracking-tight">Crisis Hotlines</h3>
                      </div>
                      <button onClick={() => setShowHotlineModal(false)} className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-all"><X size={28} /></button>
                  </div>

                  <div className="p-10 space-y-6">
                      <p className="text-earth-600 dark:text-earth-400 text-sm font-medium leading-relaxed bg-red-50 dark:bg-red-950/30 p-4 rounded-2xl border border-red-100 dark:border-red-900/50 flex gap-3">
                          <AlertCircle size={20} className="text-red-600 shrink-0" />
                          If you are witnessing a rapid biological outbreak or severe environmental crisis, contact the relevant hub immediately.
                      </p>
                      
                      <div className="space-y-4">
                          {EMERGENCY_CONTACTS.map((contact, i) => (
                              <a 
                                key={i} 
                                href={`tel:${contact.phone}`}
                                className="flex items-center justify-between p-5 bg-white dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-700 hover:shadow-lg hover:border-red-200 transition-all group"
                              >
                                  <div className="flex items-center gap-4">
                                      <div className="w-12 h-12 bg-red-50 dark:bg-red-900/30 rounded-xl flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                                          <Phone size={24} />
                                      </div>
                                      <div>
                                          <p className="text-[10px] font-black text-earth-400 dark:text-earth-50 uppercase tracking-widest mb-0.5">{contact.region} • {contact.service}</p>
                                          <p className="text-xl font-black text-earth-900 dark:text-white font-mono tracking-tighter">{contact.phone}</p>
                                      </div>
                                  </div>
                                  <div className="p-3 bg-red-600 text-white rounded-full shadow-lg group-hover:rotate-[360deg] transition-transform duration-700">
                                      <PhoneCall size={20} />
                                  </div>
                              </a>
                          ))}
                      </div>
                  </div>

                  <div className="p-6 bg-earth-50 dark:bg-earth-950/50 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-center gap-2">
                      <LifeBuoy size={16} className="text-red-600" />
                      <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Authorized Support Only • Monitoring in Progress</p>
                  </div>
              </div>
          </div>
      )}

      {/* SUBMIT FIELD REPORT MODAL */}
      {showReportModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-earth-950/90 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowReportModal(false)}>
              <div 
                  className="bg-white dark:bg-earth-900 w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10"
                  onClick={(e) => e.stopPropagation()}
              >
                  <div className="bg-red-900 p-8 text-white flex justify-between items-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><Smartphone size={150} /></div>
                      <div className="relative z-10">
                          <h3 className="text-2xl font-serif font-bold">Field Incident Report</h3>
                          <p className="text-xs text-red-300 font-bold uppercase tracking-widest mt-1">Direct Telemetry Submission</p>
                      </div>
                      <button onClick={() => setShowReportModal(false)} className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-all"><X size={24} /></button>
                  </div>

                  <div className="p-10">
                      {reportStatus === 'SUCCESS' ? (
                          <div className="text-center py-12 animate-in zoom-in">
                              <div className="w-24 h-24 bg-green-50 dark:bg-green-900/30 rounded-[3rem] flex items-center justify-center mx-auto mb-8 text-green-600 shadow-inner">
                                  <CheckCircle2 size={48} />
                              </div>
                              <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white mb-2">Report Transmitted</h3>
                              <p className="text-earth-500 dark:text-earth-400 text-sm mb-6 leading-relaxed max-w-xs mx-auto">
                                  Thank you. Your report has been hashed and propagated to the regional response hub.
                              </p>
                              <div className="text-[10px] font-mono text-earth-400 uppercase tracking-widest">REF: EA-HA-REPORT-{Date.now().toString().slice(-6)}</div>
                          </div>
                      ) : (
                          <form onSubmit={handleReportSubmit} className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                      <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest px-1">Incident Type</label>
                                      <select 
                                        className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-red-500 rounded-2xl px-4 py-3 text-sm font-bold appearance-none transition-all dark:text-white"
                                        value={reportForm.type}
                                        onChange={e => setReportForm({...reportForm, type: e.target.value})}
                                      >
                                          <option>Pest Outbreak</option>
                                          <option>Disease (Crop)</option>
                                          <option>Disease (Livestock)</option>
                                          <option>Weather Damage</option>
                                          <option>Soil Contamination</option>
                                      </select>
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest px-1">Severity</label>
                                      <select 
                                        className={`w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-red-500 rounded-2xl px-4 py-3 text-sm font-black appearance-none transition-all ${reportForm.severity === 'Critical' ? 'text-red-600' : 'dark:text-white'}`}
                                        value={reportForm.severity}
                                        onChange={e => setReportForm({...reportForm, severity: e.target.value})}
                                      >
                                          <option>Low</option>
                                          <option>Medium</option>
                                          <option>High</option>
                                          <option>Critical</option>
                                      </select>
                                  </div>
                              </div>

                              <div className="space-y-2">
                                  <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest px-1">Location Details</label>
                                  <div className="relative">
                                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" size={18} />
                                      <input 
                                        required
                                        className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-red-500 rounded-2xl pl-12 pr-12 py-4 text-sm font-medium transition-all dark:text-white" 
                                        placeholder="e.g. Block B, Northwest Quadrant" 
                                        value={reportForm.location}
                                        onChange={e => setReportForm({...reportForm, location: e.target.value})}
                                      />
                                      <button 
                                        type="button" 
                                        onClick={handleGpsSync}
                                        disabled={isGpsSyncing}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-all text-blue-600"
                                      >
                                        {isGpsSyncing ? <Loader2 size={16} className="animate-spin" /> : <Navigation size={16} />}
                                      </button>
                                  </div>
                                  <p className="text-[9px] text-earth-400 font-bold uppercase tracking-widest px-1">Satellite Precision: ± 2.4m</p>
                              </div>

                              <div className="space-y-2">
                                  <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest px-1">Observation Details</label>
                                  <textarea 
                                    required
                                    className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-red-500 rounded-2xl px-5 py-4 text-sm font-medium transition-all min-h-[100px] resize-none dark:text-white" 
                                    placeholder="Describe symptoms, pest density, or damage levels..."
                                    value={reportForm.description}
                                    onChange={e => setReportForm({...reportForm, description: e.target.value})}
                                  />
                              </div>

                              {evidenceImage && (
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-agro-500 animate-in zoom-in">
                                    <img src={evidenceImage} className="w-full h-full object-cover" alt="Evidence" />
                                    <button 
                                        onClick={() => setEvidenceImage(null)}
                                        className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full hover:bg-red-500 transition-colors"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                              )}

                              <div className="grid grid-cols-2 gap-4 pt-2">
                                  <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    accept="image/*" 
                                    onChange={handleFileChange} 
                                  />
                                  <button 
                                    type="button" 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center justify-center gap-3 bg-earth-100 dark:bg-earth-800 hover:bg-earth-200 text-earth-600 dark:text-earth-400 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
                                  >
                                      {evidenceImage ? <Check size={18} className="text-agro-600" /> : <Camera size={18} />} 
                                      {evidenceImage ? 'Evidence Attached' : 'Add Evidence'}
                                  </button>
                                  <button 
                                    type="submit"
                                    disabled={reportStatus === 'SUBMITTING'}
                                    className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-red-600/20 disabled:opacity-50"
                                  >
                                      {reportStatus === 'SUBMITTING' ? <Loader2 size={18} className="animate-spin" /> : <><Send size={18} /> Send Report</>}
                                  </button>
                              </div>
                          </form>
                      )}
                  </div>

                  <div className="p-8 bg-earth-50 dark:bg-earth-950/50 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-center gap-3">
                      <ShieldCheck size={18} className="text-agro-600" />
                      <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Emergency Pathogen Verification Protocol</p>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
