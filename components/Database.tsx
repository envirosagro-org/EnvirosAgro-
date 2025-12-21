import React, { useState, useRef, useEffect } from 'react';
import { Database as DbIcon, Search, Download, FileText, Globe, Filter, ChevronRight, Droplets, Wind, Sprout, Cat, UploadCloud, X, Calculator, BarChart3, Activity, Lock, Zap, ArrowUp, ChevronDown } from 'lucide-react';
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
  const [activeModalTab, setActiveModalTab] = useState<'SUBMIT' | 'TOOLS'>('SUBMIT');
  const [activeViewTab, setActiveViewTab] = useState<'DATASETS' | 'HEALTH' | 'COMPARE' | 'MY_PORTAL'>('DATASETS');
  
  // Scroll tracking states
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeThrust = THRUSTS.find(t => t.id === activeThrustId) || THRUSTS[0];
  
  const filteredDatasets = DATASETS.filter(d => 
    d.thrust === activeThrustId && 
    (activeResourceType === 'All' || d.category === activeResourceType) &&
    (
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.region.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const dbHealthData = [
      { name: 'Social (SA)', ca: 3.2, volume: 38 },
      { name: 'Env (EA)', ca: 4.1, volume: 30 },
      { name: 'Health (HA)', ca: 2.8, volume: 14 },
      { name: 'Tech (TA)', ca: 3.9, volume: 16 },
      { name: 'Ind (IA)', ca: 2.5, volume: 12 },
  ];

  // Monitor scroll for the "Back to Top" button and hints
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowScrollTop(container.scrollTop > 200);
      if (container.scrollTop > 50) setHasScrolled(true);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeViewTab]);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-4 relative animate-in fade-in duration-700">
      
      {/* Translucent Unified Header Block - COMPRESSED */}
      <div className="ea-header-block p-4 md:p-6 mb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <div className="ea-label mb-1">
                <DbIcon size={12} /> Global Intelligence Node
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-agro-900 dark:text-white leading-tight">
                EnvirosAgro <span className="text-blue-600 italic">Data Base</span>
                </h2>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
                <div className="agro-glass p-1 rounded-2xl flex gap-1 border border-earth-200 dark:border-white/5 backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 shadow-sm">
                    <button 
                    onClick={() => setActiveViewTab('DATASETS')}
                    className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeViewTab === 'DATASETS' ? 'bg-white dark:bg-earth-700 shadow-sm text-agro-700 dark:text-white' : 'text-earth-400 hover:text-earth-800'}`}
                    >
                    Datasets
                    </button>
                    <button 
                    onClick={() => setActiveViewTab('HEALTH')}
                    className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeViewTab === 'HEALTH' ? 'bg-white dark:bg-earth-700 shadow-sm text-agro-700 dark:text-white' : 'text-earth-400 hover:text-earth-800'}`}
                    >
                    Health
                    </button>
                </div>
                
                {user && (
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setActiveViewTab('MY_PORTAL')}
                            className={`px-4 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center gap-2 transition-all border ${activeViewTab === 'MY_PORTAL' ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white dark:bg-earth-800 border-earth-100 dark:border-earth-800 text-blue-700 dark:text-blue-300'}`}
                        >
                            <Lock size={12} /> Portal
                        </button>
                        <button 
                            onClick={() => { setActiveModalTab('SUBMIT'); setShowContributeModal(true); }}
                            className="ea-button-primary nature-gradient px-4 py-2 text-[9px]"
                        >
                            <UploadCloud size={14} /> Contribute
                        </button>
                    </div>
                )}
            </div>
          </div>
      </div>

      {activeViewTab === 'DATASETS' && (
        <>
            {/* Standardized Navigation Tabs - COMPRESSED */}
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
                
                {/* Sidebar Detail Panel - Independent Scroll COMPRESSED */}
                <div className="lg:col-span-3">
                    <div className="ea-card p-6 h-full border border-earth-100 dark:border-earth-800 flex flex-col">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${activeThrust.color} bg-white dark:bg-earth-800 shadow-md border border-black/5`}>
                            {activeThrust.icon}
                        </div>
                        <h3 className="text-lg font-serif font-bold text-earth-900 dark:text-white mb-2 leading-tight">{activeThrust.title}</h3>
                        <p className="text-[11px] text-earth-500 dark:text-earth-400 leading-relaxed mb-6">
                            {activeThrust.description}
                        </p>
                        
                        <h4 className="ea-label text-[8px] mb-2">Strategic Domains</h4>
                        <div className="ea-scroll-container max-h-[220px] space-y-1.5 pr-1">
                            {activeThrust.domains.map((domain, idx) => (
                                <div key={idx} className="text-[9px] font-bold text-earth-600 dark:text-earth-400 flex items-start gap-2 bg-earth-50/50 dark:bg-earth-950/40 p-2.5 rounded-lg border border-earth-100/50 dark:border-white/5 transition-all hover:bg-white dark:hover:bg-earth-800">
                                    <ChevronRight size={10} className="mt-0.5 shrink-0 text-agro-500" />
                                    {domain}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dataset Hub - Optimized Internal Scroll */}
                <div className="lg:col-span-9 relative">
                    <div className="ea-card overflow-hidden flex flex-col h-[calc(100vh-320px)] min-h-[450px]">
                        {/* Control Deck - COMPRESSED */}
                        <div className="p-4 border-b border-earth-50 dark:border-earth-800 flex flex-col space-y-4 bg-earth-50/30 dark:bg-earth-950/30 shrink-0">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <h3 className="font-bold text-earth-900 dark:text-white flex items-center gap-2 text-xs">
                                    Network Directory <span className="bg-agro-600 text-white px-2 py-0.5 rounded-full text-[8px] font-black">{filteredDatasets.length}</span>
                                </h3>
                                <div className="relative w-full md:w-auto group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-300 group-focus-within:text-agro-600 transition-colors" size={14} />
                                    <input 
                                        type="text" 
                                        placeholder="Query registry..."
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
                                            : 'bg-white dark:bg-earth-800 border-earth-100 dark:border-earth-800 text-earth-400 hover:border-agro-100 hover:text-agro-600'
                                        }`}
                                    >
                                        {type.icon && <span className="scale-75">{type.icon}</span>}
                                        {type.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Continuous List View - ADJUSTED HEIGHT */}
                        <div 
                          ref={scrollContainerRef}
                          className="overflow-x-auto ea-scroll-container relative scroll-smooth flex-1"
                        >
                            <table className="w-full text-left">
                                <thead className="bg-earth-50 dark:bg-earth-950/90 text-[7px] font-black text-earth-400 uppercase tracking-[0.3em] border-b border-earth-50 dark:border-earth-800 sticky top-0 z-20 backdrop-blur-md">
                                    <tr>
                                        <th className="px-6 py-3">Asset Name</th>
                                        <th className="px-6 py-3">Domain Lens</th>
                                        <th className="px-6 py-3">Type</th>
                                        <th className="px-6 py-3">Sync</th>
                                        <th className="px-6 py-3 text-right">Access</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-earth-50 dark:divide-earth-800">
                                    {filteredDatasets.length > 0 ? (
                                        filteredDatasets.map((data) => (
                                            <tr key={data.id} className="hover:bg-earth-50/50 dark:hover:bg-earth-800/30 transition-all group">
                                                <td className="px-6 py-3">
                                                    <div className="font-bold text-earth-900 dark:text-white text-xs group-hover:text-agro-600 transition-colors leading-tight mb-0.5 truncate max-w-[180px]">{data.name}</div>
                                                    <div className="flex items-center gap-2 text-[8px] font-bold text-earth-400 uppercase tracking-widest">
                                                        <Globe size={8} className="text-blue-500" /> {data.region} <span className="w-0.5 h-0.5 bg-earth-200 rounded-full"></span> {data.date}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3">
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="text-[7px] font-black text-earth-400 dark:text-earth-500 uppercase tracking-widest truncate max-w-[110px]">
                                                            {data.domain.split(':')[0]}
                                                        </span>
                                                        <div className="flex items-center gap-1 text-[7px] font-black text-agro-600 dark:text-agro-400 uppercase">
                                                            {data.category}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3">
                                                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-earth-600 dark:text-earth-400">
                                                        <FileText size={12} className="text-earth-200" />
                                                        {data.type}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3">
                                                    <div className="flex items-center gap-1.5">
                                                       <div className="w-1 h-1 bg-agro-500 rounded-full animate-pulse"></div>
                                                       <span className="text-[8px] font-mono text-earth-400">OK</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3 text-right">
                                                    <button className="p-1.5 bg-earth-50 dark:bg-earth-800 text-earth-400 hover:text-agro-600 rounded-lg transition-all" title="Downlink Asset">
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
                                                    <p className="text-xs font-serif italic">No nodes matching criteria.</p>
                                                    <button onClick={() => setSearchTerm('')} className="text-agro-600 font-black uppercase text-[8px] tracking-widest hover:underline">Reset</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            
                            {/* Scroll Hint Indicator */}
                            {!hasScrolled && filteredDatasets.length > 5 && (
                                <div className="sticky bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce pointer-events-none opacity-50">
                                    <div className="bg-agro-600 text-white px-3 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest shadow-xl">Scroll</div>
                                    <ChevronDown size={12} className="text-agro-600" />
                                </div>
                            )}
                        </div>

                        {/* Back to Top Tooltip Overlay - ADJUSTED POSITION */}
                        {showScrollTop && (
                            <button 
                                onClick={scrollToTop}
                                className="absolute bottom-4 right-4 z-30 p-2.5 bg-agro-600 text-white rounded-xl shadow-lg hover:bg-agro-700 transition-all active:scale-95 animate-in slide-in-from-bottom-2"
                                title="Scroll to Top"
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
          <div className="animate-in fade-in slide-in-from-top-2 duration-500 space-y-6 pb-6 h-[calc(100vh-280px)] overflow-y-auto ea-scroll-container pr-2">
              <div className="grid lg:grid-cols-2 gap-6">
                 <div className="ea-card p-6">
                     <h3 className="text-xl font-serif font-bold text-earth-900 dark:text-white mb-4 flex items-center gap-3">
                         <div className="p-2 bg-agro-50 dark:bg-agro-900/40 rounded-xl text-agro-600 shadow-sm"><Calculator size={20} /></div>
                         Resilience Equation
                     </h3>
                     <div className="bg-earth-900 text-white p-6 rounded-[2rem] mb-6 shadow-lg relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform duration-1000"><Zap size={100}/></div>
                         <div className="font-mono text-xl text-center text-agro-400 font-black mb-4 tracking-widest bg-black/40 py-4 rounded-xl border border-white/5">
                             m = √[((Dn × In) × C(a)) / S]
                         </div>
                         <div className="grid grid-cols-2 gap-2">
                             {[
                               { l: 'Dn (Depth)', d: 'Data volume' },
                               { l: 'In (Integrity)', d: 'Standardization' },
                               { l: 'C(a) (Coeff)', d: 'Thrust alignment' },
                               { l: 'S (Obsol)', d: 'Info decay' }
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
                        Thrust Health
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
                           <div className="w-2 h-2 bg-agro-600 rounded-full"></div> Resilient
                         </div>
                         <div className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-amber-500">
                           <div className="w-2 h-2 bg-amber-400 rounded-full"></div> Growth
                         </div>
                     </div>
                 </div>
              </div>
          </div>
      )}

      {/* FOOTER STRIP - COMPRESSED */}
      <div className="mt-6 pt-4 border-t border-earth-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] font-black uppercase tracking-[0.3em] text-earth-400">
         <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><DbIcon size={10} className="text-blue-500"/> Nodes Hashed</span>
            <span className="flex items-center gap-1.5"><Globe size={10} className="text-agro-600"/> Distributed Protocol</span>
         </div>
         <p className="opacity-40 uppercase">Ledger Sync: v4.2.2-STABLE</p>
      </div>
      
    </div>
  );
};