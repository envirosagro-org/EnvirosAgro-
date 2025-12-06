
import React, { useState } from 'react';
import { Database as DbIcon, Search, Download, FileText, Globe, Filter, ChevronRight, Droplets, Wind, Sprout, Cat, UploadCloud, X, ClipboardList, FileSpreadsheet, CheckCircle2, Plus, Calculator, BarChart3, Activity } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { THRUSTS, DATASETS, RESOURCE_TYPES, COLLECTION_TOOLS } from '../data';

export const Database: React.FC = () => {
  const [activeThrustId, setActiveThrustId] = useState('SA');
  const [activeResourceType, setActiveResourceType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<'SUBMIT' | 'TOOLS'>('SUBMIT');
  const [activeViewTab, setActiveViewTab] = useState<'DATASETS' | 'HEALTH'>('DATASETS');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sustainability Feedback State
  const [sustainScore, setSustainScore] = useState<number | null>(null);
  const [sustainParams, setSustainParams] = useState({
      dn: 5, // Data Depth (1-10)
      in_val: 5, // Integrity (1-10)
      ca: 1.0, // Adoption/Application Coefficient (1-5)
      s: 2 // Obsolescence Rate (1-10, lower is slower decay)
  });

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

  const calculateSustainability = () => {
      // Formula: m = sqrt[ ((Dn * In) * C(a)) / S ]
      // Dn = Data Depth (Volume)
      // In = Integrity (Standardization)
      // C(a) = Application Coefficient (Thrust Alignment)
      // S = Obsolescence Rate (Demand/Decay)
      
      const { dn, in_val, ca, s } = sustainParams;
      const numerator = (dn * in_val) * ca;
      const m = Math.sqrt(numerator / s);
      setSustainScore(parseFloat(m.toFixed(2)));
  };

  const handleContributeSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setTimeout(() => {
          setIsSubmitting(false);
          setShowContributeModal(false);
          alert(`Thank you! Your dataset has been submitted. Calculated Sustainability Score (m): ${sustainScore || 'Pending Review'}\nYou earned 50 EAC for this contribution!`);
          setSustainScore(null); // Reset
      }, 1500);
  };

  const dbHealthData = [
      { name: 'Social (SA)', ca: 3.2, volume: 38 },
      { name: 'Env (EA)', ca: 4.1, volume: 30 },
      { name: 'Health (HA)', ca: 2.8, volume: 14 },
      { name: 'Tech (TA)', ca: 3.9, volume: 16 },
      { name: 'Ind (IA)', ca: 2.5, volume: 12 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <h2 className="text-3xl font-bold text-agro-900 flex items-center gap-3 mb-2">
            <DbIcon className="text-agro-600" /> EnvirosAgro Data Base
            </h2>
            <p className="text-earth-600">
                A comprehensive repository organized by the Five Thrusts Framework.
            </p>
        </div>
        <div className="flex gap-3">
             <div className="bg-earth-100 p-1 rounded-xl flex gap-1">
                <button 
                   onClick={() => setActiveViewTab('DATASETS')}
                   className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeViewTab === 'DATASETS' ? 'bg-white shadow-sm text-agro-700' : 'text-earth-500 hover:text-earth-800'}`}
                >
                   Datasets
                </button>
                <button 
                   onClick={() => setActiveViewTab('HEALTH')}
                   className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeViewTab === 'HEALTH' ? 'bg-white shadow-sm text-agro-700' : 'text-earth-500 hover:text-earth-800'}`}
                >
                   <Activity size={16} /> Database Health
                </button>
             </div>
             <button 
                onClick={() => { setActiveModalTab('SUBMIT'); setShowContributeModal(true); }}
                className="bg-agro-600 text-white px-5 py-2 rounded-xl font-bold shadow-md hover:bg-agro-700 transition-colors flex items-center gap-2"
             >
                <UploadCloud size={18} /> Contribute Data
             </button>
        </div>
      </div>

      {activeViewTab === 'DATASETS' ? (
        <>
            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-earth-200 pb-1">
                {THRUSTS.map((thrust) => (
                    <button
                        key={thrust.id}
                        onClick={() => setActiveThrustId(thrust.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-bold text-sm transition-all relative top-[1px] ${
                            activeThrustId === thrust.id 
                            ? `bg-white text-agro-900 border-x border-t border-earth-200 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]` 
                            : 'text-earth-500 hover:text-agro-700 hover:bg-earth-50'
                        }`}
                    >
                        {thrust.icon}
                        <span className="hidden md:inline">{thrust.title}</span>
                        <span className="md:hidden">{thrust.id}</span>
                    </button>
                ))}
            </div>

            <div className="grid lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Sidebar / Info Panel */}
                <div className="lg:col-span-1">
                    <div className={`rounded-2xl p-6 border ${activeThrust.color.replace('text', 'border').replace('700', '200')} bg-opacity-30 h-full`}>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${activeThrust.color} bg-white shadow-sm`}>
                            {activeThrust.icon}
                        </div>
                        <h3 className="text-xl font-bold text-earth-900 mb-3">{activeThrust.title}</h3>
                        <p className="text-earth-600 text-sm mb-6 leading-relaxed">
                            {activeThrust.description}
                        </p>
                        
                        <h4 className="font-bold text-xs uppercase tracking-wider text-earth-400 mb-3">Key Domains</h4>
                        <ul className="space-y-3">
                            {activeThrust.domains.map((domain, idx) => (
                                <li key={idx} className="text-xs text-earth-600 flex items-start gap-2 bg-white/50 p-2 rounded-lg">
                                    <ChevronRight size={14} className="mt-0.5 shrink-0 text-agro-500" />
                                    {domain}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Dataset List */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl shadow-sm border border-earth-100 overflow-hidden">
                        
                        {/* Search & Filter Bar */}
                        <div className="p-6 border-b border-earth-100 flex flex-col space-y-4 bg-earth-50/50">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <h3 className="font-bold text-earth-700 flex items-center gap-2">
                                    Available Datasets <span className="bg-agro-100 text-agro-700 px-2 py-0.5 rounded-full text-xs">{filteredDatasets.length}</span>
                                </h3>
                                <div className="relative w-full md:w-auto">
                                    <Search className="absolute left-3 top-2.5 text-earth-400" size={18} />
                                    <input 
                                        type="text" 
                                        placeholder={`Search ${activeThrust.title} by name, domain, region...`}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 rounded-lg border border-earth-200 focus:outline-none focus:ring-2 focus:ring-agro-500 w-full md:w-64 text-sm"
                                    />
                                </div>
                            </div>
                            
                            {/* Element Filter */}
                            <div className="flex flex-wrap gap-2">
                                {RESOURCE_TYPES.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setActiveResourceType(type.id)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                                            activeResourceType === type.id
                                            ? 'bg-agro-600 text-white'
                                            : 'bg-white border border-earth-200 text-earth-500 hover:border-agro-400 hover:text-agro-600'
                                        }`}
                                    >
                                        {type.icon}
                                        {type.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-earth-50 text-xs font-bold text-earth-400 uppercase tracking-wider">
                                    <tr>
                                        <th className="p-6">Dataset Name</th>
                                        <th className="p-6">Domain & Element</th>
                                        <th className="p-6">Type</th>
                                        <th className="p-6">Access</th>
                                        <th className="p-6">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-earth-100">
                                    {filteredDatasets.length > 0 ? (
                                        filteredDatasets.map((data) => (
                                            <tr key={data.id} className="hover:bg-earth-50/50 transition-colors group">
                                                <td className="p-6">
                                                    <div className="font-bold text-agro-900 group-hover:text-agro-600 transition-colors">{data.name}</div>
                                                    <div className="flex items-center gap-2 text-xs text-earth-500 mt-1">
                                                        <Globe size={12} /> {data.region} • {data.date}
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs font-medium text-earth-600 bg-earth-100 px-2 py-1 rounded w-fit">
                                                            {data.domain.split(':')[0]}
                                                        </span>
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-agro-600 flex items-center gap-1">
                                                            {/* Icon Logic for Element */}
                                                            {data.category === 'Plants' && <Sprout size={10} />}
                                                            {data.category === 'Animals' && <Cat size={10} />}
                                                            {data.category === 'Water' && <Droplets size={10} />}
                                                            {data.category === 'Soil' && <DbIcon size={10} />}
                                                            {data.category === 'Air' && <Wind size={10} />}
                                                            {data.category}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex items-center gap-1 text-sm text-earth-600">
                                                        <FileText size={16} className="text-earth-400" />
                                                        {data.type}
                                                        <span className="text-xs text-earth-400">({data.size})</span>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                                        data.access === 'Public' 
                                                        ? 'bg-green-100 text-green-700' 
                                                        : 'bg-amber-100 text-amber-700'
                                                    }`}>
                                                        {data.access}
                                                    </span>
                                                </td>
                                                <td className="p-6">
                                                    <button className="text-agro-600 hover:bg-agro-50 p-2 rounded-lg transition-colors" title="Download">
                                                        <Download size={20} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="p-12 text-center text-earth-500">
                                                <div className="flex flex-col items-center gap-3">
                                                    <Filter size={32} className="text-earth-300" />
                                                    <p>No datasets found for this criteria.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
      ) : (
          /* DATABASE HEALTH DASHBOARD */
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                 <div className="bg-white p-8 rounded-3xl border border-earth-100 shadow-sm">
                     <h3 className="text-2xl font-bold text-agro-900 mb-6 flex items-center gap-2">
                         <Calculator className="text-agro-600" /> Data Sustainability Equation
                     </h3>
                     <div className="bg-earth-50 p-6 rounded-2xl mb-6">
                         <div className="font-serif text-2xl text-center text-agro-800 font-bold mb-4">
                             m = √[((Dn × In) × C(a)) / S]
                         </div>
                         <div className="grid grid-cols-2 gap-4 text-sm">
                             <div className="p-3 bg-white rounded-lg border border-earth-100">
                                 <strong className="block text-agro-700">Dn (Depth)</strong>
                                 <span className="text-earth-500">Volume of data records</span>
                             </div>
                             <div className="p-3 bg-white rounded-lg border border-earth-100">
                                 <strong className="block text-agro-700">In (Integrity)</strong>
                                 <span className="text-earth-500">Standardization Level</span>
                             </div>
                             <div className="p-3 bg-white rounded-lg border border-earth-100">
                                 <strong className="block text-agro-700">C(a) (Coefficient)</strong>
                                 <span className="text-earth-500">Alignment with 5 Thrusts</span>
                             </div>
                             <div className="p-3 bg-white rounded-lg border border-earth-100">
                                 <strong className="block text-agro-700">S (Obsolescence)</strong>
                                 <span className="text-earth-500">Data Decay Rate</span>
                             </div>
                         </div>
                     </div>
                     <p className="text-earth-600 leading-relaxed text-sm">
                         We use this formula to measure the health of our knowledge base. A high <strong>m-score</strong> means our data is deep, standardized, highly relevant to sustainability goals, and durable over time.
                     </p>
                 </div>

                 <div className="bg-white p-8 rounded-3xl border border-earth-100 shadow-sm">
                     <h3 className="text-xl font-bold text-earth-900 mb-6 flex items-center gap-2">
                         <BarChart3 className="text-blue-600" /> Knowledge Base Health by Thrust
                     </h3>
                     <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dbHealthData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} />
                                <YAxis fontSize={12} />
                                <Tooltip cursor={{fill: 'transparent'}} />
                                <Bar dataKey="ca" name="Sustainability C(a)" fill="#16a34a" radius={[4, 4, 0, 0]}>
                                    {dbHealthData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.ca > 3.5 ? '#16a34a' : '#fbbf24'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                     </div>
                     <div className="flex gap-4 justify-center mt-4 text-xs text-earth-500">
                         <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-600 rounded-sm"></div> High Resilience</div>
                         <div className="flex items-center gap-1"><div className="w-3 h-3 bg-amber-400 rounded-sm"></div> Moderate Resilience</div>
                     </div>
                 </div>
              </div>

              <div className="bg-agro-900 text-white p-10 rounded-3xl text-center">
                  <h3 className="text-2xl font-serif font-bold mb-4">Improve Our Database Health</h3>
                  <p className="text-agro-100 max-w-2xl mx-auto mb-8">
                      By contributing standardized data using our tools, you directly increase the <strong>Integrity (In)</strong> and <strong>Depth (Dn)</strong> variables, boosting the global resilience score.
                  </p>
                  <button 
                    onClick={() => { setActiveModalTab('TOOLS'); setShowContributeModal(true); }}
                    className="bg-white text-agro-900 px-8 py-3 rounded-full font-bold hover:bg-agro-100 transition-colors"
                  >
                      Download Standardization Tools
                  </button>
              </div>
          </div>
      )}

      {/* CONTRIBUTE MODAL */}
      {showContributeModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
               
               {/* Modal Header */}
               <div className="p-6 border-b border-earth-100 flex justify-between items-center bg-agro-50">
                  <div>
                      <h3 className="font-bold text-xl text-agro-900 flex items-center gap-2">
                         <UploadCloud className="text-agro-600" /> Data Collection & Contribution
                      </h3>
                      <p className="text-xs text-agro-700 mt-1">Help us improve the EnvirosAgro database.</p>
                  </div>
                  <button onClick={() => setShowContributeModal(false)} className="text-agro-400 hover:text-agro-700 transition-colors p-2 hover:bg-agro-100 rounded-full">
                     <X size={24} />
                  </button>
               </div>

               {/* Modal Tabs */}
               <div className="flex border-b border-earth-100 bg-white px-6">
                   <button 
                      onClick={() => setActiveModalTab('SUBMIT')}
                      className={`px-4 py-3 text-sm font-bold border-b-2 transition-all ${activeModalTab === 'SUBMIT' ? 'border-agro-600 text-agro-700' : 'border-transparent text-earth-500 hover:text-earth-800'}`}
                   >
                      Submit & Analyze
                   </button>
                   <button 
                      onClick={() => setActiveModalTab('TOOLS')}
                      className={`px-4 py-3 text-sm font-bold border-b-2 transition-all ${activeModalTab === 'TOOLS' ? 'border-blue-600 text-blue-700' : 'border-transparent text-earth-500 hover:text-earth-800'}`}
                   >
                      Download Collection Tools
                   </button>
               </div>
               
               {/* Modal Content */}
               <div className="p-8 overflow-y-auto flex-1">
                   {activeModalTab === 'SUBMIT' ? (
                       <form onSubmit={handleContributeSubmit} className="space-y-6">
                          
                          {/* Metadata Section */}
                          <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                 <label className="text-xs font-bold text-earth-600 uppercase">Dataset Name</label>
                                 <input required type="text" className="w-full border border-earth-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-agro-500 text-sm" placeholder="e.g. Local Rainfall Log 2024" />
                              </div>
                              <div className="space-y-1">
                                 <label className="text-xs font-bold text-earth-600 uppercase">Region / Location</label>
                                 <input required type="text" className="w-full border border-earth-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-agro-500 text-sm" placeholder="e.g. Kiriaini, Kenya" />
                              </div>
                              <div className="space-y-1">
                                 <label className="text-xs font-bold text-earth-600 uppercase">Primary Thrust</label>
                                 <select className="w-full border border-earth-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-agro-500 text-sm bg-white">
                                     {THRUSTS.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                                 </select>
                              </div>
                              <div className="space-y-1">
                                 <label className="text-xs font-bold text-earth-600 uppercase">Resource Type</label>
                                 <select className="w-full border border-earth-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-agro-500 text-sm bg-white">
                                     {RESOURCE_TYPES.filter(r => r.id !== 'All').map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                                 </select>
                              </div>
                          </div>

                          {/* Data Sustainability Calculator */}
                          <div className="bg-earth-50 border border-earth-200 rounded-2xl p-5">
                              <div className="flex justify-between items-center mb-4">
                                  <h4 className="font-bold text-agro-800 text-sm flex items-center gap-2">
                                      <Calculator size={16} /> Data Impact Calculator
                                  </h4>
                                  {sustainScore !== null ? (
                                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Score: {sustainScore}</span>
                                  ) : (
                                      <span className="text-xs text-earth-400">Calculate below</span>
                                  )}
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div>
                                      <label className="text-[10px] font-bold text-earth-500 uppercase block mb-1">Data Volume (Dn)</label>
                                      <input 
                                        type="range" min="1" max="10" 
                                        value={sustainParams.dn}
                                        onChange={(e) => setSustainParams({...sustainParams, dn: parseInt(e.target.value)})}
                                        className="w-full h-1 bg-earth-200 rounded-lg appearance-none cursor-pointer accent-agro-600"
                                      />
                                      <div className="flex justify-between text-[10px] text-earth-400"><span>Low</span><span>High</span></div>
                                  </div>
                                  <div>
                                      <label className="text-[10px] font-bold text-earth-500 uppercase block mb-1">Standardization (In)</label>
                                      <input 
                                        type="range" min="1" max="10" 
                                        value={sustainParams.in_val}
                                        onChange={(e) => setSustainParams({...sustainParams, in_val: parseInt(e.target.value)})}
                                        className="w-full h-1 bg-earth-200 rounded-lg appearance-none cursor-pointer accent-agro-600"
                                      />
                                      <div className="flex justify-between text-[10px] text-earth-400"><span>Poor</span><span>Perfect</span></div>
                                  </div>
                              </div>
                              <button 
                                type="button"
                                onClick={calculateSustainability}
                                className="w-full bg-white border border-earth-200 text-agro-600 font-bold py-2 rounded-xl text-xs hover:bg-earth-50 transition-colors"
                              >
                                  Calculate Resilience Score (m)
                              </button>
                          </div>

                          <div className="border-2 border-dashed border-earth-200 rounded-xl p-6 text-center cursor-pointer hover:bg-earth-50 transition-colors">
                              <Plus className="mx-auto text-earth-400 mb-2" />
                              <p className="text-sm text-earth-600 font-bold">Upload File (CSV, XLSX, PDF)</p>
                              <p className="text-xs text-earth-400">Max size: 50MB</p>
                          </div>

                          <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-agro-600 hover:bg-agro-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                          >
                             {isSubmitting ? 'Uploading...' : <><CheckCircle2 size={18} /> Submit Contribution</>}
                          </button>
                       </form>
                   ) : (
                       <div className="space-y-6">
                           <div className="text-center mb-6">
                              <ClipboardList className="mx-auto text-blue-600 mb-2" size={32} />
                              <h4 className="font-bold text-lg text-earth-900">Standardized Data Collection Tools</h4>
                              <p className="text-sm text-earth-600">Download these templates to maximize your <strong>Integrity (In)</strong> score.</p>
                           </div>

                           <div className="grid gap-4">
                               {COLLECTION_TOOLS.map((tool, idx) => (
                                   <div key={idx} className="bg-white border border-earth-200 p-4 rounded-xl flex items-center justify-between hover:shadow-md transition-shadow group">
                                       <div className="flex items-start gap-3">
                                           <div className="bg-earth-100 p-2 rounded-lg text-earth-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                               <FileSpreadsheet size={20} />
                                           </div>
                                           <div>
                                               <h5 className="font-bold text-earth-900 text-sm">{tool.name}</h5>
                                               <p className="text-xs text-earth-500">{tool.desc}</p>
                                               <div className="flex gap-2 mt-1">
                                                   <span className="text-[10px] bg-earth-100 text-earth-600 px-1.5 rounded font-mono">{tool.type}</span>
                                                   <span className="text-[10px] bg-earth-100 text-earth-600 px-1.5 rounded font-mono">{tool.size}</span>
                                               </div>
                                           </div>
                                       </div>
                                       <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                                           <Download size={20} />
                                       </button>
                                   </div>
                               ))}
                           </div>
                       </div>
                   )}
               </div>
            </div>
         </div>
      )}

    </div>
  );
};
