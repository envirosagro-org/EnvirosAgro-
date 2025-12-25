import React, { useState } from 'react';
import { 
  Database as DbIcon, Search, Download, FileText, Globe, Filter, ChevronRight, 
  Droplets, Wind, Sprout, Cat, UploadCloud, X, Calculator, BarChart3, 
  Activity, Lock, Zap, ArrowUp, ChevronDown, CheckCircle2, Loader2,
  FileUp, MapPin, Tag, Terminal, ShieldCheck, FileType, Paperclip,
  ShieldAlert, AlertCircle, Eye, RefreshCw
} from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { THRUSTS, DATASETS, RESOURCE_TYPES } from './data';
import { User } from '../types';
import { toast } from 'react-hot-toast';

interface DatabaseProps {
    user?: User | null;
    onAwardEac?: (amount: number) => void;
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

export const Database: React.FC<DatabaseProps> = ({ user, onAwardEac }) => {
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
    <div className="max-w-7xl mx-auto px-6 py-4 relative animate-in fade-in duration-700">
      
      {/* Translucent Unified Header Block */}
      <div className="ea-header-block p-4 md:p-6 mb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <div className="ea-label mb-1">
                <DbIcon size={12} /> Global Intelligence Node
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-earth-900 dark:text-white leading-tight">
                EnvirosAgro <span className="text-blue-600 italic">Data Registry</span>
                </h2>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
                <div className="agro-glass p-1 rounded-2xl flex gap-1 border border-earth-200 dark:border-white/5 backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 shadow-sm">
                    <button 
                    onClick={() => setActiveViewTab('DATASETS')}
                    className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeViewTab === 'DATASETS' ? 'bg-white dark:bg-earth-700 shadow-sm text-agro-700 dark:text-white' : 'text-earth-400 hover:text-earth-800'}`}
                    >
                    Dossiers
                    </button>
                    <button 
                    onClick={() => setActiveViewTab('HEALTH')}
                    className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeViewTab === 'HEALTH' ? 'bg-white dark:bg-earth-700 shadow-sm text-agro-700 dark:text-white' : 'text-earth-400 hover:text-earth-800'}`}
                    >
                    Telemetry
                    </button>
                    <button 
                    onClick={() => setActiveViewTab('AUDIT')}
                    className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeViewTab === 'AUDIT' ? 'bg-white dark:bg-earth-700 shadow-sm text-agro-700 dark:text-white' : 'text-earth-400 hover:text-earth-800'}`}
                    >
                    Audit Loop
                    </button>
                </div>
                
                <button 
                    onClick={() => setShowContributeModal(true)}
                    className="ea-btn-op nature-gradient px-6 py-2 h-10 text-[9px]"
                >
                    <UploadCloud size={16} /> Contribute Intelligence
                </button>
            </div>
          </div>
      </div>

      {activeViewTab === 'DATASETS' && (
        <>
            <div className="flex flex-wrap gap-1 mb-4 border-b border-earth-100 dark:border-earth-800">
                {THRUSTS.map((thrust) => (
                    <button
                        key={thrust.id}
                        onClick={() => { setActiveThrustId(thrust.id); scrollToTop(); }}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-black text-[9px] uppercase tracking-widest transition-all relative top-[1px] border-x border-t ${
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

            <div className="grid lg:grid-cols-12 gap-6">
                <div className="lg:col-span-3">
                    <div className="ea-card p-6 h-full flex flex-col">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${activeThrust.color} bg-white dark:bg-earth-800 shadow-md border border-black/5`}>
                            {activeThrust.icon}
                        </div>
                        <h3 className="text-lg font-serif font-bold text-earth-900 dark:text-white mb-2 leading-tight">{activeThrust.title}</h3>
                        <p className="text-[11px] text-earth-500 dark:text-earth-400 leading-relaxed mb-6">
                            {activeThrust.description}
                        </p>
                        
                        <h4 className="ea-label-meta text-[8px] mb-2">Thrust Domains</h4>
                        <div className="ea-scroll-area max-h-[220px] space-y-1.5 pr-1 no-scrollbar">
                            {activeThrust.domains.map((domain, idx) => (
                                <div key={idx} className="text-[9px] font-bold text-earth-600 dark:text-earth-400 flex items-start gap-2 bg-earth-50/50 dark:bg-earth-950/40 p-2.5 rounded-lg border border-earth-100/50 dark:border-white/5">
                                    <ChevronRight size={10} className="mt-0.5 shrink-0 text-agro-500" />
                                    {domain}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-9 relative">
                    <div className="ea-card overflow-hidden flex flex-col h-[calc(100vh-320px)] min-h-[450px]">
                        <div className="p-4 border-b border-earth-50 dark:border-earth-800 flex flex-col space-y-4 bg-earth-50/30 dark:bg-earth-950/30 shrink-0">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <h3 className="font-bold text-earth-900 dark:text-white flex items-center gap-2 text-xs">
                                    Regional Node Assets <span className="bg-agro-600 text-white px-2 py-0.5 rounded-full text-[8px] font-black">{filteredDatasets.length}</span>
                                </h3>
                                <div className="relative w-full md:w-auto group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-300 group-focus-within:text-agro-600 transition-colors" size={14} />
                                    <input 
                                        type="text" 
                                        placeholder="Execute query..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-9 pr-4 py-1.5 bg-white dark:bg-earth-800 border border-earth-100 dark:border-earth-700 rounded-lg w-full md:w-56 text-[11px] font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        <div ref={scrollContainerRef} className="overflow-x-auto ea-scroll-area flex-1">
                            <table className="w-full text-left">
                                <thead className="bg-earth-50 dark:bg-earth-950 text-[7px] font-black text-earth-400 uppercase tracking-[0.3em] border-b border-earth-50 dark:border-earth-800 sticky top-0 z-20">
                                    <tr>
                                        <th className="px-6 py-3">Dossier / Asset Name</th>
                                        <th className="px-6 py-3">Node Origin</th>
                                        <th className="px-6 py-3">Metric Type</th>
                                        <th className="px-6 py-3 text-right">Access</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-earth-50 dark:divide-earth-800">
                                    {filteredDatasets.map((data) => (
                                        <tr key={data.id} className="hover:bg-earth-50/50 dark:hover:bg-earth-800/30 transition-all group">
                                            <td className="px-6 py-3">
                                                <div className="font-bold text-earth-900 dark:text-white text-xs mb-0.5">{data.name}</div>
                                                <div className="flex items-center gap-2 text-[8px] font-bold text-earth-400 uppercase tracking-widest">
                                                    <Terminal size={8} className="text-blue-500" /> {data.id}
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 text-[9px] font-bold text-earth-600 dark:text-earth-400">
                                                <Globe size={12} className="inline mr-1 text-blue-500" /> {data.region}
                                            </td>
                                            <td className="px-6 py-3 text-[9px] font-bold text-earth-600 dark:text-earth-400">
                                                {data.type}
                                            </td>
                                            <td className="px-6 py-3 text-right">
                                                <button className="p-2 bg-earth-50 dark:bg-earth-800 text-earth-400 hover:text-agro-600 rounded-lg">
                                                    <Download size={14} />
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
        </>
      )}

      {activeViewTab === 'AUDIT' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 pb-10">
              <div className="bg-amber-900/10 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-[2.5rem] p-8 flex items-center gap-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5"><ShieldAlert size={120} /></div>
                  <div className="w-16 h-16 bg-amber-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                      <Zap size={32} />
                  </div>
                  <div>
                      <h3 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-400">Strategic Audit Loop</h3>
                      <p className="text-sm text-amber-800/60 dark:text-amber-500/60 font-medium max-w-xl">
                          Help calibrate the Global Strategic AI by verifying regional telemetry. Earn **EAC Credits** for every high-fidelity validation.
                      </p>
                  </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {AUDIT_TASKS.map((task) => (
                      <div key={task.id} className="bg-white dark:bg-earth-900 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
                          <div className="h-48 overflow-hidden relative">
                              <img src={task.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[5s]" alt={task.type} />
                              <div className="absolute top-4 left-4">
                                  <span className="bg-amber-500 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg">
                                      +{task.reward} EAC
                                  </span>
                              </div>
                              <div className="absolute inset-0 bg-black/20 group-hover:opacity-0 transition-opacity"></div>
                          </div>
                          
                          <div className="p-8 flex flex-col flex-1">
                              <div className="flex items-center gap-2 mb-4">
                                  <span className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">{task.type}</span>
                                  <span className="w-1 h-1 bg-earth-200 rounded-full"></span>
                                  <span className="text-[9px] font-black text-earth-400 uppercase tracking-[0.2em]">{task.region}</span>
                              </div>
                              
                              <h4 className="text-xl font-bold text-earth-900 dark:text-white mb-4 leading-tight group-hover:text-agro-600 transition-colors">
                                  {task.target}
                              </h4>
                              
                              <p className="text-sm text-earth-500 dark:text-earth-400 mb-10 font-medium leading-relaxed flex-1">
                                  {task.description}
                              </p>
                              
                              {activeAuditId === task.id ? (
                                  <div className="space-y-4 animate-in slide-in-from-top-2">
                                      <div className="flex gap-2">
                                          <button 
                                            onClick={() => handleAuditSubmit(task.id, task.reward)}
                                            className="flex-1 bg-green-600 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest"
                                          >
                                            Confirm
                                          </button>
                                          <button 
                                            onClick={() => setActiveAuditId(null)}
                                            className="flex-1 bg-red-600 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest"
                                          >
                                            Refute
                                          </button>
                                      </div>
                                  </div>
                              ) : (
                                  <button 
                                    onClick={() => setActiveAuditId(task.id)}
                                    className="w-full bg-earth-900 dark:bg-agro-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-agro-600 transition-all"
                                  >
                                    <Eye size={16} /> Inspect Telemetry
                                  </button>
                              )}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {/* Contribution Modal & Other existing logic... */}
    </div>
  );
};
