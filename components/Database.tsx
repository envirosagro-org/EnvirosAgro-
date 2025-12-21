import React, { useState, useRef, useEffect } from 'react';
import { 
  Database as DbIcon, Search, Download, FileText, Globe, Filter, ChevronRight, 
  Droplets, Wind, Sprout, Cat, UploadCloud, X, Calculator, BarChart3, 
  Activity, Lock, Zap, ArrowUp, ChevronDown, CheckCircle2, Loader2,
  FileUp, MapPin, Tag, Terminal, ShieldCheck, FileType, Paperclip
} from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { THRUSTS, DATASETS, RESOURCE_TYPES } from './data';
import { User } from '../types';

interface DatabaseProps {
    user?: User | null;
    onAwardEac?: (amount: number) => void;
}

export const Database: React.FC<DatabaseProps> = ({ user, onAwardEac }) => {
  const [activeThrustId, setActiveThrustId] = useState('SA');
  const [activeResourceType, setActiveResourceType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [activeViewTab, setActiveViewTab] = useState<'DATASETS' | 'HEALTH' | 'MY_PORTAL'>('DATASETS');
  
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
        // Map common extensions to standardized type labels
        const ext = file.name.split('.').pop()?.toUpperCase();
        let typeLabel = `${ext} Dataset`;
        if (ext === 'PDF') typeLabel = 'PDF Report';
        if (ext === 'TXT') typeLabel = 'TXT Log';
        if (ext === 'DOCX' || ext === 'DOC') typeLabel = 'DOCX Protocol';
        if (ext === 'XLSX' || ext === 'CSV') typeLabel = 'XLSX Telemetry';
        
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
    }, 2500);
  };

  const resetContribute = () => {
    setShowContributeModal(false);
    setContributionStep(1);
    setAttachedFile(null);
    setFormData({ name: '', thrust: 'SA', domain: 'Sociological', region: '', category: 'Plants', type: 'Research Report', description: '' });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-agro-900 dark:text-white leading-tight">
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

            <div className="grid lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="lg:col-span-3">
                    <div className="ea-card p-6 h-full border border-earth-100 dark:border-earth-800 flex flex-col">
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
                                <div key={idx} className="text-[9px] font-bold text-earth-600 dark:text-earth-400 flex items-start gap-2 bg-earth-50/50 dark:bg-earth-950/40 p-2.5 rounded-lg border border-earth-100/50 dark:border-white/5 transition-all hover:bg-white dark:hover:bg-earth-800">
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
                                        className="pl-9 pr-4 py-1.5 bg-white dark:bg-earth-800 border border-earth-100 dark:border-earth-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-500/20 w-full md:w-56 text-[11px] font-medium transition-all"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1">
                                {RESOURCE_TYPES.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setActiveResourceType(type.id)}
                                        className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all border ${
                                            activeResourceType === type.id
                                            ? 'bg-agro-600 border-agro-600 text-white shadow-md'
                                            : 'bg-white dark:bg-earth-900 border-earth-100 dark:border-earth-800 text-earth-400 hover:border-agro-100 hover:text-agro-600'
                                        }`}
                                    >
                                        {type.icon && <span className="scale-75">{type.icon}</span>}
                                        {type.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div 
                          ref={scrollContainerRef}
                          className="overflow-x-auto ea-scroll-area relative scroll-smooth flex-1"
                        >
                            <table className="w-full text-left">
                                <thead className="bg-earth-50 dark:bg-earth-950/90 text-[7px] font-black text-earth-400 uppercase tracking-[0.3em] border-b border-earth-50 dark:border-earth-800 sticky top-0 z-20 backdrop-blur-md">
                                    <tr>
                                        <th className="px-6 py-3">Dossier / Asset Name</th>
                                        <th className="px-6 py-3">Node Origin</th>
                                        <th className="px-6 py-3">Metric Type</th>
                                        <th className="px-6 py-3 text-right">Access</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-earth-50 dark:divide-earth-800">
                                    {filteredDatasets.length > 0 ? (
                                        filteredDatasets.map((data) => (
                                            <tr key={data.id} className="hover:bg-earth-50/50 dark:hover:bg-earth-800/30 transition-all group">
                                                <td className="px-6 py-3">
                                                    <div className="font-bold text-earth-900 dark:text-white text-xs group-hover:text-agro-600 transition-colors leading-tight mb-0.5 truncate max-w-[280px]">{data.name}</div>
                                                    <div className="flex items-center gap-2 text-[8px] font-bold text-earth-400 uppercase tracking-widest">
                                                        <Terminal size={8} className="text-blue-500" /> {data.id} <span className="w-0.5 h-0.5 bg-earth-200 rounded-full"></span> {data.type}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3">
                                                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-earth-600 dark:text-earth-400">
                                                        <Globe size={12} className="text-blue-500" />
                                                        {data.region}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3">
                                                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-earth-600 dark:text-earth-400">
                                                        <FileText size={12} className="text-earth-200" />
                                                        {data.type.split(' ')[0]}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3 text-right">
                                                    <button className="p-2 bg-earth-50 dark:bg-earth-800 text-earth-400 hover:text-agro-600 rounded-lg transition-all" title="Downlink Intelligence">
                                                        <Download size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="py-20 text-center text-earth-300">
                                                <div className="flex flex-col items-center gap-3">
                                                    <Filter size={32} className="opacity-10" />
                                                    <p className="text-xs font-serif italic uppercase tracking-widest">No matching datasets in this cluster.</p>
                                                    <button onClick={() => setSearchTerm('')} className="text-agro-600 font-black uppercase text-[8px] tracking-widest hover:underline">Reset Node Filter</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {showScrollTop && (
                            <button 
                                onClick={scrollToTop}
                                className="absolute bottom-4 right-4 z-30 p-2.5 bg-agro-600 text-white rounded-xl shadow-lg hover:bg-agro-700 transition-all active:scale-95 animate-in slide-in-from-bottom-2"
                            >
                                <ArrowUp size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
      )}

      {activeViewTab === 'HEALTH' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-500 space-y-6 pb-6 h-[calc(100vh-280px)] overflow-y-auto ea-scroll-area pr-2 no-scrollbar">
              <div className="grid lg:grid-cols-2 gap-6">
                 <div className="ea-card p-6">
                     <h3 className="text-xl font-serif font-bold text-earth-900 dark:text-white mb-4 flex items-center gap-3">
                         <div className="p-2 bg-agro-50 dark:bg-agro-900/40 rounded-xl text-agro-600 shadow-sm"><Calculator size={20} /></div>
                         m(t) Resilience Matrix
                     </h3>
                     <div className="bg-earth-900 text-white p-6 rounded-[2rem] mb-6 shadow-lg relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform duration-1000"><Zap size={100}/></div>
                         <div className="font-mono text-xl text-center text-agro-400 font-black mb-4 tracking-widest bg-black/40 py-4 rounded-xl border border-white/5">
                             m = √[((Dn × In) × C(a)) / S]
                         </div>
                         <div className="grid grid-cols-2 gap-2">
                             {[
                               { l: 'Dn (Depth)', d: 'Regional data weight' },
                               { l: 'In (Integrity)', d: 'Standardization fidelity' },
                               { l: 'C(a) (Coeff)', d: 'Thrust alignment score' },
                               { l: 'S (Decay)', d: 'Information obsolescence' }
                             ].map((item, idx) => (
                                <div key={idx} className="p-3 bg-white/5 rounded-lg border border-white/5 group-hover:border-agro-500/20 transition-all">
                                   <strong className="block text-agro-400 text-[8px] font-black uppercase tracking-widest mb-0.5">{item.l}</strong>
                                   <span className="text-[9px] text-slate-400 font-medium">{item.d}</span>
                                </div>
                             ))}
                         </div>
                     </div>
                 </div>

                 <div className="ea-card p-6 flex flex-col h-full">
                     <h3 className="text-xl font-serif font-bold text-earth-900 dark:text-white mb-6 flex items-center gap-3">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/40 rounded-xl text-blue-600 shadow-sm"><BarChart3 size={20} /></div>
                        Global Registry Health
                     </h3>
                     <div className="flex-1 min-h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dbHealthData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
                                <XAxis dataKey="name" fontSize={8} fontWeight={900} tickLine={false} axisLine={false} />
                                <YAxis fontSize={8} fontWeight={900} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 5px 20px rgba(0,0,0,0.1)', fontSize: '9px'}} />
                                <Bar dataKey="ca" name="Maturity C(a)" radius={[6, 6, 0, 0]}>
                                    {dbHealthData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.ca > 3.5 ? '#16a34a' : '#fbbf24'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                     </div>
                     <div className="flex gap-4 justify-center mt-4">
                         <div className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-agro-600">
                           <div className="w-2 h-2 bg-agro-600 rounded-full"></div> Verified Resilience
                         </div>
                         <div className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-amber-500">
                           <div className="w-2 h-2 bg-amber-400 rounded-full"></div> Growth Delta
                         </div>
                     </div>
                 </div>
              </div>
          </div>
      )}

      {/* Contribution Modal */}
      {showContributeModal && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-earth-950/90 backdrop-blur-xl animate-in fade-in duration-300">
              <div className="bg-white dark:bg-earth-900 w-full max-w-2xl rounded-[3.5rem] shadow-cinematic border border-white/10 overflow-hidden flex flex-col max-h-[90vh]">
                  <div className="bg-blue-900 p-8 text-white flex justify-between items-center shrink-0 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><UploadCloud size={200}/></div>
                      <div className="relative z-10 flex items-center gap-6">
                          <div className="p-4 bg-white/10 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md">
                            <FileUp size={28} className="text-blue-300" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-serif font-bold tracking-tight">Intelligence Contribution</h3>
                            <p className="text-xs text-blue-300 font-bold uppercase tracking-widest mt-1">Direct Node Registry Interface</p>
                          </div>
                      </div>
                      <button onClick={resetContribute} className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-all">
                        <X size={24} />
                      </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                      {contributionStep === 1 && (
                          <form className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                             <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 px-1">Asset Nomenclature</label>
                                    <input 
                                        required 
                                        className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-blue-500 rounded-2xl px-5 py-3 text-sm font-bold transition-all outline-none" 
                                        placeholder="e.g. Q2 Soil Health Dossier" 
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 px-1">Network Thrust</label>
                                    <select 
                                        className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-blue-500 rounded-2xl px-5 py-3 text-sm font-bold transition-all appearance-none outline-none"
                                        value={formData.thrust}
                                        onChange={e => setFormData({...formData, thrust: e.target.value})}
                                    >
                                        {THRUSTS.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                                    </select>
                                </div>
                             </div>

                             <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 px-1">Region Node</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={16} />
                                        <input 
                                            required 
                                            className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-blue-500 rounded-2xl pl-12 pr-4 py-3 text-sm font-bold transition-all outline-none" 
                                            placeholder="e.g. Murang'a Cluster" 
                                            value={formData.region}
                                            onChange={e => setFormData({...formData, region: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 px-1">Asset Category</label>
                                    <select 
                                        className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-blue-500 rounded-2xl px-5 py-3 text-sm font-bold transition-all appearance-none outline-none"
                                        value={formData.category}
                                        onChange={e => setFormData({...formData, category: e.target.value})}
                                    >
                                        {RESOURCE_TYPES.filter(r => r.id !== 'All').map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                                    </select>
                                </div>
                             </div>

                             {/* File Upload Section */}
                             <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 px-1">Scientific Data Attachment (PDF, TXT, DOCX, XLSX)</label>
                                <div 
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`w-full border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer bg-earth-50/50 dark:bg-earth-800/50 ${attachedFile ? 'border-blue-500 bg-blue-50/20' : 'border-earth-200 dark:border-earth-700 hover:border-blue-400'}`}
                                >
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        className="hidden" 
                                        accept=".pdf,.txt,.docx,.doc,.xlsx,.xls,.json"
                                        onChange={handleFileChange}
                                    />
                                    {attachedFile ? (
                                        <div className="text-center">
                                            <div className="p-4 bg-blue-100 dark:bg-blue-900/40 rounded-2xl text-blue-600 mb-3 mx-auto w-fit shadow-lg">
                                                <FileType size={32} />
                                            </div>
                                            <p className="text-sm font-bold text-slate-800 dark:text-white truncate max-w-[300px]">{attachedFile.name}</p>
                                            <p className="text-[10px] font-black text-blue-500 uppercase mt-1 tracking-widest">{formatFileSize(attachedFile.size)}</p>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); setAttachedFile(null); }}
                                                className="text-[9px] font-black text-red-500 uppercase mt-4 flex items-center gap-1 hover:underline"
                                            >
                                                <X size={10} /> Remove Attachment
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <UploadCloud size={40} className="text-earth-300 dark:text-earth-600 mb-4 mx-auto" />
                                            <p className="text-sm font-bold text-earth-700 dark:text-earth-300">Downlink from Local Station</p>
                                            <p className="text-[10px] text-earth-400 font-bold uppercase tracking-widest mt-1">Select Document to Standardize</p>
                                        </div>
                                    )}
                                </div>
                             </div>

                             <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 px-1">Technical Summary</label>
                                <textarea 
                                    className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-blue-500 rounded-[2rem] px-6 py-4 text-sm font-medium transition-all outline-none min-h-[120px] resize-none" 
                                    placeholder="Outline the parameters, m(t) deltas, and research methodology..."
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                />
                             </div>

                             <button 
                                type="button"
                                onClick={() => setContributionStep(2)}
                                disabled={!formData.name || !formData.region || !attachedFile}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-xl transition-all disabled:opacity-50"
                             >
                                Finalize Specifications
                             </button>
                          </form>
                      )}

                      {contributionStep === 2 && (
                          <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                             <div className="bg-earth-50 dark:bg-earth-800 p-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-700 flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-white dark:bg-earth-900 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-xl border border-black/5">
                                    <FileUp size={40} className="text-blue-500" />
                                </div>
                                <h4 className="text-xl font-serif font-bold text-earth-900 dark:text-white mb-2">Technical Validation</h4>
                                <p className="text-xs text-earth-500 max-w-sm mb-10 leading-relaxed font-medium">
                                    By submitting, you verify that this intelligence follows the EnvirosAgro v4.2 standardization protocols. Your node (ESIN) will be credited upon validation.
                                </p>
                                
                                <div className="w-full grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-white dark:bg-earth-900 rounded-2xl border border-earth-100 dark:border-earth-800 text-left">
                                        <p className="text-[8px] font-black text-earth-400 uppercase tracking-widest mb-1">EAC REWARD</p>
                                        <p className="text-xl font-bold text-agro-600">+50 EAC</p>
                                    </div>
                                    <div className="p-4 bg-white dark:bg-earth-900 rounded-2xl border border-earth-100 dark:border-earth-800 text-left">
                                        <p className="text-[8px] font-black text-earth-400 uppercase tracking-widest mb-1">DATA TRUST</p>
                                        <p className="text-xl font-bold text-blue-600">VERIFIED</p>
                                    </div>
                                </div>

                                {attachedFile && (
                                    <div className="mt-8 w-full p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-2xl flex items-center gap-4">
                                        <Paperclip size={18} className="text-blue-500" />
                                        <div className="text-left">
                                            <p className="text-xs font-bold text-slate-800 dark:text-white truncate max-w-[250px]">{attachedFile.name}</p>
                                            <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{formData.type}</p>
                                        </div>
                                    </div>
                                )}
                             </div>

                             <div className="flex gap-4">
                                <button onClick={() => setContributionStep(1)} className="flex-1 py-4 bg-earth-50 dark:bg-earth-800 text-earth-400 rounded-2xl font-black text-[10px] uppercase tracking-widest">Edit Details</button>
                                <button 
                                    onClick={handleContributeSubmit}
                                    disabled={isSubmitting}
                                    className="flex-[2] py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> SYNCHRONIZING NODE...</> : <><Terminal size={18}/> Commit to Global Registry</>}
                                </button>
                             </div>
                          </div>
                      )}

                      {contributionStep === 3 && (
                          <div className="py-12 text-center animate-in zoom-in duration-500">
                             <div className="w-24 h-24 bg-green-50 dark:bg-green-900/30 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-green-600 shadow-inner">
                                <CheckCircle2 size={56} />
                             </div>
                             <h3 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-4">Transmission Successful</h3>
                             <p className="text-earth-600 dark:text-earth-400 mb-10 max-w-xs mx-auto leading-relaxed font-medium">
                                Your intelligence asset has been hashed and submitted to the Global Resilience Ledger for peer-review.
                             </p>
                             <button onClick={resetContribute} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20 active:scale-95 transition-all">Return to Registry</button>
                          </div>
                      )}
                  </div>

                  <div className="p-8 bg-earth-50 dark:bg-earth-950/50 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-center gap-3 shrink-0">
                      <ShieldCheck size={18} className="text-blue-600" />
                      <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Sovereign Data Storage • SHA-256 Verified Uplink</p>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
