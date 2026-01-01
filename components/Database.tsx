import React, { useState, useRef, useEffect } from 'react';
import { 
  Database as DbIcon, Search, Download, FileText, Globe, Filter, ChevronRight, 
  Droplets, Wind, Sprout, Cat, UploadCloud, X, Calculator, BarChart3, 
  Activity, Lock, Zap, ArrowUp, ChevronDown, CheckCircle2, Loader2,
  FileUp, MapPin, Tag, Terminal, ShieldCheck, FileType, Paperclip,
  ShieldAlert, AlertCircle, Eye, RefreshCw, ArrowLeft
} from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { THRUSTS, DATASETS, RESOURCE_TYPES } from './data';
import { User, View } from '../types';
import { toast } from 'react-hot-toast';

interface DatabaseProps {
    user?: User | null;
    onAwardEac?: (amount: number) => void;
    onNavigate?: (view: View) => void;
}

const AUDIT_TASKS = [
    { 
        id: 'aud1', 
        type: 'Satellite Imagery', 
        target: 'NDVI Vegetation Change', 
        region: 'Rift Valley Cluster', 
        reward: 15,
        description: 'Verify if the marked sector shows signs of SI-D induced resource neglect compared to historical baseline.',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&auto=format&fit=crop&q=60'
    },
    { 
        id: 'aud2', 
        type: 'Sensor Validation', 
        target: 'Soil PH Telemetry', 
        region: 'Coastal Strip Hub', 
        reward: 10,
        description: 'Sensor ID: AE-942 reporting PH 4.2. Does this align with regional rainfall patterns for this cycle?',
        image: 'https://images.unsplash.com/photo-1592150621124-3c47ad43c316?w=400&auto=format&fit=crop&q=60'
    },
    { 
        id: 'aud3', 
        type: 'Yield Estimate', 
        target: 'Maize Height Analysis', 
        region: 'Central Highlands', 
        reward: 20,
        description: 'Cross-reference field drone footage with AI yield prediction for Sector 7.',
        image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&auto=format&fit=crop&q=60'
    }
];

export const Database: React.FC<DatabaseProps> = ({ user, onAwardEac, onNavigate }) => {
  const [activeThrustId, setActiveThrustId] = useState('SA');
  const [activeResourceType, setActiveResourceType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [activeViewTab, setActiveViewTab] = useState<'DATASETS' | 'HEALTH' | 'AUDIT'>('DATASETS');
  
  // Audit State
  const [activeAuditId, setActiveAuditId] = useState<string | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);

  // Contribution Form State
  const [contributionStep, setContributionStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    thrust: 'SA',
    domain: 'Sociological & Anthropological',
    region: '',
    category: 'Plants',
    type: 'Research Report',
    description: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const activeThrust = THRUSTS.find(t => t.id === activeThrustId) || THRUSTS[0];
  
  const filteredDatasets = DATASETS.filter(d => 
    d.thrust === activeThrustId && 
    (activeResourceType === 'All' || d.category === activeResourceType) &&
    (
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.region.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const dbHealthData = [
      { name: 'Social', ca: 3.2, volume: 38 },
      { name: 'Env', ca: 4.1, volume: 30 },
      { name: 'Health', ca: 2.8, volume: 14 },
      { name: 'Tech', ca: 3.9, volume: 16 },
      { name: 'Ind', ca: 2.5, volume: 12 },
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const handleScroll = () => setShowScrollTop(container.scrollTop > 200);
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeViewTab]);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setAttachedFile(file);
        const ext = file.name.split('.').pop()?.toUpperCase();
        let typeLabel = `${ext} Dataset`;
        if (ext === 'PDF') typeLabel = 'PDF Report';
        setFormData(prev => ({ ...prev, type: typeLabel }));
    }
  };

  const handleContributeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
        setIsSubmitting(false);
        setContributionStep(3);
        if (onAwardEac) onAwardEac(50);
        toast.success("Intelligence Contribution Synchronized!");
    }, 2500);
  };

  const handleAuditSubmit = (taskId: string, reward: number) => {
    setIsAuditing(true);
    setTimeout(() => {
        setIsAuditing(false);
        setActiveAuditId(null);
        if (onAwardEac) onAwardEac(reward);
        toast.success(`Audit Complete! +${reward} EAC Awarded.`);
    }, 2000);
  };

  const resetContribute = () => {
    setShowContributeModal(false);
    setContributionStep(1);
    setAttachedFile(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative animate-in fade-in duration-700 bg-white dark:bg-earth-950 min-h-screen">
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-10">
        <button 
          onClick={() => onNavigate?.(View.HOME)}
          className="flex items-center gap-2 text-earth-400 hover:text-agro-600 font-black text-[10px] uppercase tracking-widest transition-all group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Home
        </button>
      </div>

      {/* Translucent Unified Header Block */}
      <div className="ea-header-block p-8 md:p-10 mb-12 bg-slate-900/5 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-inner backdrop-blur-3xl">
          <div className="flex flex-col xl:flex-row justify-between items-center gap-8">
            <div>
                <div className="ea-label mb-4">
                <DbIcon size={14} className="inline mr-2" /> Global Intelligence Node
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-black text-earth-900 dark:text-white leading-tight tracking-tighter">
                EnvirosAgro <span className="text-blue-600 italic">Data Registry</span>
                </h2>
                <p className="mt-4 text-earth-500 dark:text-earth-400 font-medium max-w-2xl">
                    Standardized agricultural data repository across the Five Thrusts framework. Access high-fidelity telemetry, dossiers, and audit cycles.
                </p>
            </div>
            <div className="flex gap-4 flex-wrap justify-center items-center">
                <div className="agro-glass p-1.5 rounded-[1.8rem] flex gap-1 border border-earth-200 dark:border-white/5 backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 shadow-sm">
                    <button 
                    onClick={() => setActiveViewTab('DATASETS')}
                    className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeViewTab === 'DATASETS' ? 'bg-white dark:bg-earth-700 shadow-lg text-agro-700 dark:text-white' : 'text-earth-400 hover:text-earth-800'}`}
                    >
                    Dossiers
                    </button>
                    <button 
                    onClick={() => setActiveViewTab('AUDIT')}
                    className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeViewTab === 'AUDIT' ? 'bg-white dark:bg-earth-700 shadow-lg text-agro-700 dark:text-white' : 'text-earth-400 hover:text-earth-800'}`}
                    >
                    Audit Loop
                    </button>
                </div>
                
                <button 
                    onClick={() => setShowContributeModal(true)}
                    className="ea-btn-op nature-gradient px-8 h-14 rounded-2xl text-xs font-black uppercase"
                >
                    <UploadCloud size={20} /> Contribute Intelligence
                </button>
            </div>
          </div>
      </div>

      {activeViewTab === 'DATASETS' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-wrap gap-1 mb-8 border-b border-earth-100 dark:border-earth-800">
                {THRUSTS.map((thrust) => (
                    <button
                        key={thrust.id}
                        onClick={() => { setActiveThrustId(thrust.id); scrollToTop(); }}
                        className={`flex items-center gap-3 px-6 py-4 rounded-t-[2rem] font-black text-[10px] uppercase tracking-widest transition-all relative top-[1px] border-x border-t ${
                            activeThrustId === thrust.id 
                            ? `bg-white dark:bg-earth-900 text-agro-950 dark:text-white border-earth-100 dark:border-earth-800 shadow-sm` 
                            : 'text-earth-400 hover:text-earth-700 dark:hover:text-earth-200 border-transparent bg-transparent'
                        }`}
                    >
                        {thrust.icon}
                        <span>{thrust.title}</span>
                    </button>
                ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4">
                    <div className="ea-card p-10 h-full flex flex-col bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${activeThrust.color} bg-white dark:bg-earth-800 shadow-xl border border-black/5`}>
                            {React.cloneElement(activeThrust.icon as React.ReactElement, { size: 28 })}
                        </div>
                        <h3 className="text-2xl font-serif font-black text-earth-900 dark:text-white mb-4 leading-tight">{activeThrust.title}</h3>
                        <p className="text-sm text-earth-500 dark:text-earth-400 leading-relaxed font-medium mb-10 italic">
                            {activeThrust.description}
                        </p>
                        
                        <div className="space-y-4">
                            <h4 className="ea-label-meta text-[10px] mb-4">Strategic Domains</h4>
                            <div className="space-y-3">
                                {activeThrust.domains.map((domain, idx) => (
                                    <div key={idx} className="text-[10px] font-bold text-earth-600 dark:text-earth-400 flex items-start gap-4 bg-earth-50/50 dark:bg-earth-950/40 p-4 rounded-2xl border border-earth-100/50 dark:border-white/5 transition-all hover:border-agro-500/30 group/dom">
                                        <div className="w-1.5 h-1.5 rounded-full bg-agro-500 mt-1.5 shrink-0 group-hover/dom:scale-150 transition-transform"></div>
                                        {domain}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8">
                    <div className="ea-card overflow-hidden flex flex-col h-[700px] bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800">
                        <div className="p-8 border-b border-earth-50 dark:border-earth-800 flex flex-col md:flex-row justify-between items-center gap-8 bg-earth-50/30 dark:bg-earth-950/30 shrink-0">
                            <div className="flex items-center gap-4">
                                <h3 className="font-black text-earth-900 dark:text-white flex items-center gap-3 text-sm uppercase tracking-widest">
                                    Regional Node Assets 
                                </h3>
                                <span className="bg-agro-600 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg shadow-agro-600/20">{filteredDatasets.length} Units</span>
                            </div>
                            <div className="relative group w-full md:w-auto">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-300 group-focus-within:text-agro-600 transition-colors" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Search dossiers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-12 pr-6 py-3.5 bg-white dark:bg-earth-800 border border-earth-100 dark:border-earth-700 rounded-2xl w-full md:w-72 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-agro-500/5 transition-all"
                                />
                            </div>
                        </div>

                        <div ref={scrollContainerRef} className="overflow-x-auto ea-scroll-area flex-1">
                            <table className="w-full text-left">
                                <thead className="bg-earth-50 dark:bg-earth-950 text-[9px] font-black text-earth-400 uppercase tracking-[0.4em] border-b border-earth-50 dark:border-earth-800 sticky top-0 z-20">
                                    <tr>
                                        <th className="px-8 py-5">Asset Metadata</th>
                                        <th className="px-8 py-5">Uplink Origin</th>
                                        <th className="px-8 py-5">Format</th>
                                        <th className="px-8 py-5 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-earth-50 dark:divide-earth-800">
                                    {filteredDatasets.map((data) => (
                                        <tr key={data.id} className="hover:bg-earth-50/50 dark:hover:bg-earth-800/30 transition-all group">
                                            <td className="px-8 py-6">
                                                <div className="font-bold text-earth-900 dark:text-white text-sm mb-1 group-hover:text-agro-600 transition-colors">{data.name}</div>
                                                <div className="flex items-center gap-3 text-[10px] font-bold text-earth-400 uppercase tracking-widest">
                                                    <Terminal size={12} className="text-blue-500" /> {data.id} 
                                                    <span className="w-1 h-1 bg-earth-200 rounded-full"></span>
                                                    <span>v{data.version}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3 text-xs font-bold text-earth-600 dark:text-earth-400">
                                                    <Globe size={16} className="text-blue-500" /> {data.region}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-[10px] font-black text-earth-500 dark:text-earth-400 uppercase tracking-widest px-3 py-1 bg-earth-50 dark:bg-earth-800 rounded-lg border border-earth-100 dark:border-earth-800">
                                                    {data.type}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button className="p-3 bg-earth-50 dark:bg-earth-800 text-earth-400 hover:text-agro-600 rounded-xl border border-transparent hover:border-agro-500/20 transition-all shadow-sm group/btn">
                                                    <Download size={18} className="group-hover/btn:scale-110 transition-transform" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {activeViewTab === 'AUDIT' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12 pb-20">
              <div className="bg-amber-900/10 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-[4rem] p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-5"><ShieldAlert size={250} /></div>
                  <div className="w-24 h-24 bg-amber-500 text-white rounded-[2rem] flex items-center justify-center shrink-0 shadow-2xl shadow-amber-500/20">
                      <Zap size={48} />
                  </div>
                  <div className="text-center md:text-left relative z-10">
                      <h3 className="text-3xl font-serif font-black text-amber-900 dark:text-amber-400 uppercase tracking-tight mb-4">Strategic Audit Loop</h3>
                      <p className="text-lg text-amber-800/80 dark:text-amber-500/60 font-medium max-w-2xl leading-relaxed italic">
                          "Help calibrate the Global Strategic AI by verifying regional telemetry. Earn **EAC Credits** for every high-fidelity validation session."
                      </p>
                  </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {AUDIT_TASKS.map((task) => (
                      <div key={task.id} className="bg-white dark:bg-earth-900 rounded-[3.5rem] border border-earth-100 dark:border-earth-800 overflow-hidden shadow-sm hover:shadow-cinematic transition-all duration-700 group flex flex-col h-full cursor-default">
                          <div className="h-56 overflow-hidden relative">
                              <img src={task.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[8s]" alt={task.type} />
                              <div className="absolute top-6 left-6">
                                  <span className="bg-amber-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                                      +{task.reward} EAC Reward
                                  </span>
                              </div>
                              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all duration-1000"></div>
                          </div>
                          
                          <div className="p-10 flex flex-col flex-1">
                              <div className="flex items-center gap-3 mb-6">
                                  <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.3em] bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg">{task.type}</span>
                                  <span className="w-1.5 h-1.5 bg-earth-200 rounded-full"></span>
                                  <span className="text-[10px] font-black text-earth-400 uppercase tracking-[0.3em]">{task.region}</span>
                              </div>
                              
                              <h4 className="text-2xl font-serif font-black text-earth-900 dark:text-white mb-6 leading-tight group-hover:text-agro-600 transition-colors">
                                  {task.target}
                              </h4>
                              
                              <p className="text-sm text-earth-500 dark:text-earth-400 mb-12 font-medium leading-relaxed flex-1 italic">
                                  "{task.description}"
                              </p>
                              
                              <div className="mt-auto">
                                  {activeAuditId === task.id ? (
                                      <div className="space-y-4 animate-in slide-in-from-top-4 duration-500">
                                          <div className="flex gap-3">
                                              <button 
                                                onClick={() => handleAuditSubmit(task.id, task.reward)}
                                                className="flex-1 bg-agro-600 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-agro-600/20 hover:bg-agro-500 active:scale-95 transition-all"
                                              >
                                                Confirm Sync
                                              </button>
                                              <button 
                                                onClick={() => setActiveAuditId(null)}
                                                className="flex-1 bg-red-600 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-red-600/20 hover:bg-red-500 active:scale-95 transition-all"
                                              >
                                                Refute Link
                                              </button>
                                          </div>
                                      </div>
                                  ) : (
                                      <button 
                                        onClick={() => setActiveAuditId(task.id)}
                                        className="w-full bg-earth-900 dark:bg-white text-white dark:text-earth-900 py-5 rounded-[1.8rem] font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl"
                                      >
                                        <Eye size={20} /> Inspect Telemetry
                                      </button>
                                  )}
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {/* Contribution Modal & Logic... */}
    </div>
  );
};
