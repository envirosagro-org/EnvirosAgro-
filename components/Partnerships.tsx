import React, { useState } from 'react';
import { 
  Users, Leaf, Cpu, Building2, X, ArrowRight, Globe, 
  PlusCircle, LayoutGrid, Activity, Layers, ChevronRight, 
  ShieldCheck, Loader2, Info
} from 'lucide-react';

const PARTNER_CATEGORIES = [
  {
    id: 'SA',
    title: 'Social Alliances',
    icon: <Users size={32} />,
    color: 'bg-rose-50 text-rose-600',
    description: 'Collaborating with NGOs, cooperatives, and educational institutions to foster community resilience.',
    opportunities: ["JOINT TRAINING WORKSHOPS", "COMMUNITY SEED BANKS", "CULTURAL HERITAGE DOCUMENTATION"]
  },
  {
    id: 'EA',
    title: 'Environmental Coalitions',
    icon: <Leaf size={32} />,
    color: 'bg-green-50 text-green-600',
    description: 'Partnering with conservation bodies to drive biodiversity restoration and carbon neutrality.',
    opportunities: ["CARBON SEQUESTRATION PROJECTS", "BIODIVERSITY MAPPING", "SUSTAINABLE WATER MANAGEMENT"]
  },
  {
    id: 'TA',
    title: 'Tech & Research Labs',
    icon: <Cpu size={32} />,
    color: 'bg-blue-50 text-blue-600',
    description: 'Joint ventures with universities to develop precision agriculture tools and AI diagnostics.',
    opportunities: ["AGTECH PILOT PROGRAMS", "DATA ANALYSIS & MODELING", "PRECISION FARMING TOOLS"]
  }
];

const TIERS = [
  { level: "Seed Partner", m: "1.0 - 2.5", benefits: ["Network ID", "Knowledge Base Access", "EAC Rewards"] },
  { level: "Growth Partner", m: "2.6 - 5.0", benefits: ["Supply Chain Integration", "Technical Audits", "Micro-Grants"] },
  { level: "Industrial Partner", m: "5.1+", benefits: ["Global Market Node", "Custom m(t) Dashboards", "Capital Exchange Priority"] }
];

export const Partnerships: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'DIRECTORY' | 'TIERS' | 'APPLY' | 'STATUS'>('DIRECTORY');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appStep, setAppStep] = useState(1);
  const [formData, setFormData] = useState({
    orgName: '',
    email: '',
    category: 'SA',
    thrusts: [] as string[],
    proposal: ''
  });

  const toggleThrust = (id: string) => {
    setFormData(prev => ({
      ...prev,
      thrusts: prev.thrusts.includes(id) ? prev.thrusts.filter(t => t !== id) : [...prev.thrusts, id]
    }));
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setActiveTab('STATUS');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 animate-in fade-in duration-700">
      
      {/* 1. COMPRESSED NAVIGATION BAR (Matching Screenshot) */}
      <div className="flex items-center justify-between bg-white dark:bg-earth-900 border-b border-earth-100 dark:border-white/5 mb-16 overflow-x-auto no-scrollbar">
        <div className="flex items-center">
          {[
            { id: 'DIRECTORY', label: 'ECOSYSTEM DIRECTORY', icon: <LayoutGrid size={14}/> },
            { id: 'TIERS', label: 'PARTNERSHIP TIERS', icon: <Layers size={14}/> },
            { id: 'APPLY', label: 'APPLY CENTER', icon: <PlusCircle size={14}/> },
            { id: 'STATUS', label: 'TRACK APPLICATION', icon: <Activity size={14}/> }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 whitespace-nowrap border-b-2 ${
                activeTab === tab.id 
                ? 'bg-agro-600 text-white border-agro-600 rounded-t-2xl' 
                : 'text-earth-400 hover:text-earth-900 dark:hover:text-white border-transparent'
              }`}
            >
              {activeTab !== tab.id && <span className="opacity-40">{tab.icon}</span>}
              {tab.label}
            </button>
          ))}
        </div>
        <div className="px-6 text-blue-500 animate-pulse hidden md:block">
           <ArrowRight size={32} />
        </div>
      </div>

      {activeTab === 'DIRECTORY' && (
        <div className="space-y-20 animate-in slide-in-from-bottom-4 duration-500">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-agro-900 dark:text-white mb-6 tracking-tight">Strategic Alliances</h2>
            <p className="text-xl text-earth-500 dark:text-earth-400 leading-relaxed font-medium">
              We collaborate with global leaders to synchronize industrial operations with the Five Thrusts framework.
            </p>
          </div>

          {/* Alliance Cards Grid (Matching Screenshot) */}
          <div className="grid md:grid-cols-3 gap-8">
            {PARTNER_CATEGORIES.map((cat) => (
              <div key={cat.id} className="bg-earth-50 dark:bg-earth-900/50 rounded-[4rem] p-10 flex flex-col border border-earth-100 dark:border-white/5 transition-all hover:shadow-2xl group">
                <div className="bg-white dark:bg-earth-800 p-8 rounded-[2.5rem] mb-12 shadow-sm border border-earth-100 dark:border-white/10 relative">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-10 ${cat.color} shadow-inner`}>
                      {cat.icon}
                   </div>
                   <h3 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-6 leading-tight">{cat.title}</h3>
                   <p className="text-earth-500 dark:text-earth-400 text-sm leading-relaxed mb-10 font-medium opacity-80">
                      {cat.description}
                   </p>
                   
                   <ul className="space-y-4 mb-10">
                      {cat.opportunities.map(opp => (
                        <li key={opp} className="flex items-center gap-3 text-[9px] font-black text-earth-400 dark:text-earth-500 uppercase tracking-[0.2em]">
                           <span className="w-1.5 h-1.5 bg-agro-500 rounded-full"></span> {opp}
                        </li>
                      ))}
                   </ul>

                   <button 
                     onClick={() => { setFormData({...formData, category: cat.id}); setActiveTab('APPLY'); }}
                     className="w-full pt-8 border-t border-earth-100 dark:border-white/5 flex items-center justify-center gap-2 text-[10px] font-black text-earth-800 dark:text-earth-200 uppercase tracking-[0.3em] hover:text-agro-600 transition-colors group/btn"
                   >
                     APPLY TO THIS DOMAIN <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                   </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-earth-950 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl border-4 border-white/5">
              <div className="absolute top-0 right-0 p-16 opacity-5"><Layers size={300} /></div>
              <div className="max-w-2xl relative z-10">
                <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4">Industrial Maturity</div>
                <h3 className="text-4xl font-serif font-bold mb-6">Cross-Sector Innovation</h3>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">Our open innovation model allows partners to share data securely through the EnvirosAgro Data Base, improving regional maturity scores collectively.</p>
                <button 
                  onClick={() => setActiveTab('TIERS')}
                  className="bg-white text-earth-950 px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  View Tier Benefits
                </button>
              </div>
          </div>
        </div>
      )}

      {activeTab === 'TIERS' && (
        <div className="animate-in slide-in-from-right-4 duration-500 space-y-12">
           <div className="text-center max-w-2xl mx-auto">
             <h2 className="text-4xl font-serif font-bold text-agro-900 dark:text-white mb-4">Partnership Maturity Levels</h2>
             <p className="text-earth-500 dark:text-earth-400 font-medium">Standardizing participation based on m(t) resilience indices.</p>
           </div>
           
           <div className="grid lg:grid-cols-3 gap-8">
              {TIERS.map((tier, i) => (
                <div key={i} className="bg-white dark:bg-earth-900 p-10 rounded-[3rem] border border-earth-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
                   <div className="absolute -top-10 -right-10 w-32 h-32 bg-agro-500/5 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                   <div className="flex items-center justify-between mb-8">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-agro-600">Level 0{i+1}</span>
                      <div className="bg-agro-50 dark:bg-agro-900/30 px-3 py-1 rounded-lg text-[10px] font-black text-agro-700 dark:text-agro-400 border border-agro-100 dark:border-agro-800">
                        m(t) {tier.m}
                      </div>
                   </div>
                   <h3 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-10">{tier.level}</h3>
                   <div className="space-y-4 mb-12">
                      {tier.benefits.map(benefit => (
                        <div key={benefit} className="flex items-center gap-4 text-sm font-bold text-earth-600 dark:text-earth-400">
                           <ShieldCheck size={18} className="text-agro-600" /> {benefit}
                        </div>
                      ))}
                   </div>
                   <button 
                    onClick={() => setActiveTab('APPLY')}
                    className="w-full py-4 bg-agro-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-agro-800 transition-colors shadow-lg shadow-agro-900/20"
                   >
                     Initialize Onboarding
                   </button>
                </div>
              ))}
           </div>
        </div>
      )}

      {activeTab === 'APPLY' && (
        <div className="max-w-4xl mx-auto animate-in zoom-in-95 duration-500">
           <div className="bg-white dark:bg-earth-900 rounded-[4rem] shadow-cinematic border border-earth-100 dark:border-white/5 overflow-hidden">
              <div className="bg-agro-950 p-12 text-white flex justify-between items-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Building2 size={250}/></div>
                 <div className="relative z-10">
                    <h3 className="text-4xl font-serif font-bold mb-2">Application Center</h3>
                    <p className="text-agro-400 text-xs font-black uppercase tracking-[0.3em]">Network Entry Protocol v4.2</p>
                 </div>
                 <div className="relative z-10 flex gap-4">
                    {[1, 2, 3].map(step => (
                      <div key={step} className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs border-2 transition-all ${appStep === step ? 'bg-white text-agro-950 border-white shadow-xl' : 'border-white/20 text-white/40'}`}>
                         0{step}
                      </div>
                    ))}
                 </div>
              </div>

              <div className="p-12 lg:p-20">
                 <form onSubmit={handleApply} className="space-y-12">
                    
                    {appStep === 1 && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                         <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 px-1">Organization Legal Name</label>
                               <input 
                                 required
                                 className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-agro-500 rounded-2xl px-6 py-4 font-bold text-earth-900 dark:text-white transition-all outline-none"
                                 placeholder="e.g. GreenTech Cooperatives Ltd"
                                 value={formData.orgName}
                                 onChange={e => setFormData({...formData, orgName: e.target.value})}
                               />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 px-1">Corporate Email Address</label>
                               <input 
                                 required
                                 type="email"
                                 className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-agro-500 rounded-2xl px-6 py-4 font-bold text-earth-900 dark:text-white transition-all outline-none"
                                 placeholder="partners@greentech.org"
                                 value={formData.email}
                                 onChange={e => setFormData({...formData, email: e.target.value})}
                               />
                            </div>
                         </div>
                         <div className="space-y-6">
                            <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 px-1">Primary Thrust Alignment</label>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                               {['SA', 'EA', 'HA', 'TA', 'IA'].map(t => (
                                 <button 
                                   key={t}
                                   type="button"
                                   onClick={() => toggleThrust(t)}
                                   className={`py-5 rounded-2xl font-black text-xs transition-all border-2 ${formData.thrusts.includes(t) ? 'bg-agro-600 border-agro-600 text-white shadow-lg' : 'bg-earth-50 dark:bg-earth-800 border-transparent text-earth-50 hover:bg-earth-100'}`}
                                 >
                                   {t}
                                 </button>
                               ))}
                            </div>
                         </div>
                         <button 
                          type="button"
                          onClick={() => setAppStep(2)}
                          className="w-full py-5 bg-agro-600 hover:bg-agro-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-agro-600/20 active:scale-95 flex items-center justify-center gap-3"
                         >
                           Continue to Proposal <ArrowRight size={16}/>
                         </button>
                      </div>
                    )}

                    {appStep === 2 && (
                       <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest px-1">Resilience Mission Statement</label>
                             <textarea 
                               required
                               className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-agro-500 rounded-[2rem] px-8 py-6 font-medium text-earth-900 dark:text-white transition-all outline-none min-h-[200px] resize-none leading-relaxed"
                               placeholder="Briefly describe how your organization advances the m(t) constant..."
                               value={formData.proposal}
                               onChange={e => setFormData({...formData, proposal: e.target.value})}
                             />
                          </div>
                          
                          <div className="p-8 bg-blue-50 dark:bg-blue-900/10 rounded-[2.5rem] border border-blue-100 dark:border-blue-900/50 flex gap-6 items-start">
                             <div className="p-3 bg-white dark:bg-earth-800 rounded-xl shadow-sm text-blue-600"><Info size={24}/></div>
                             <div className="flex-1">
                                <h4 className="font-bold text-blue-900 dark:text-blue-100 text-sm mb-2 uppercase tracking-wide">Data Collaboration Opt-in</h4>
                                <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">By submitting, you agree to standardize shared agronomic data following the EnvirosAgro v4.2 communication protocol for collective m(t) improvement.</p>
                             </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                             <button 
                              type="button"
                              onClick={() => setAppStep(1)}
                              className="py-5 bg-white dark:bg-earth-800 border-2 border-earth-100 dark:border-white/5 text-earth-500 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
                             >
                               Back
                             </button>
                             <button 
                              type="button"
                              onClick={() => setAppStep(3)}
                              className="py-5 bg-agro-600 hover:bg-agro-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-agro-600/20 active:scale-95 flex items-center justify-center gap-3"
                             >
                               Final Review <ArrowRight size={16}/>
                             </button>
                          </div>
                       </div>
                    )}

                    {appStep === 3 && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                         <div className="bg-earth-50 dark:bg-earth-800/50 p-10 rounded-[3rem] border border-earth-100 dark:border-white/5 space-y-6">
                            <div className="flex justify-between items-center pb-6 border-b border-earth-100 dark:border-white/5">
                               <h4 className="text-2xl font-serif font-bold text-earth-900 dark:text-white">{formData.orgName || 'Unnamed Org'}</h4>
                               <span className="text-[10px] font-black text-agro-600 uppercase tracking-widest">Review Mode</span>
                            </div>
                            <div className="grid grid-cols-2 gap-10">
                               <div>
                                  <p className="text-[8px] font-black text-earth-400 uppercase tracking-widest mb-2">Primary Contact</p>
                                  <p className="font-bold text-earth-700 dark:text-earth-200">{formData.email}</p>
                               </div>
                               <div>
                                  <p className="text-[8px] font-black text-earth-400 uppercase tracking-widest mb-2">Thrust Matrix</p>
                                  <div className="flex gap-2">
                                     {formData.thrusts.map(t => (
                                       <span key={t} className="px-2 py-0.5 bg-agro-600 text-white rounded text-[8px] font-black">{t}</span>
                                     ))}
                                  </div>
                               </div>
                            </div>
                         </div>

                         <div className="flex flex-col gap-4">
                            <button 
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full py-6 bg-agro-600 hover:bg-agro-700 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-agro-600/30 active:scale-95 flex items-center justify-center gap-4"
                            >
                               {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> Verifying Node...</> : <><ShieldCheck size={20}/> Submit Proposal</>}
                            </button>
                         </div>
                      </div>
                    )}
                 </form>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'STATUS' && (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
           <div className="bg-white dark:bg-earth-900 rounded-[3.5rem] border border-earth-100 dark:border-white/5 shadow-cinematic p-12 lg:p-16">
              <div className="flex justify-between items-start mb-16">
                 <div>
                    <h3 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-2">Application Tracker</h3>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                       ID: EA-PART-2024-8842-X
                    </p>
                 </div>
                 <div className="bg-agro-50 dark:bg-agro-900/30 px-6 py-2 rounded-2xl border border-agro-100 dark:border-agro-800 text-agro-700 dark:text-agro-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-3">
                    <Activity size={16} className="animate-pulse" /> LIVE_AUDIT_ACTIVE
                 </div>
              </div>

              <div className="relative space-y-12">
                 <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-earth-100 dark:bg-white/5"></div>
                 
                 {[
                   { label: 'Uplink Initiated', status: 'COMPLETED', time: '12m ago', desc: 'Secure node established with central repository.' },
                   { label: 'Thrust Validation', status: 'COMPLETED', time: '8m ago', desc: 'Alignment with Environmental and Technical thrusts confirmed.' },
                   { label: 'm(t) Baseline Audit', status: 'PROCESSING', time: 'Ongoing', desc: 'Calculating localized resilience deltas based on shared data.' },
                   { label: 'Ecosystem Minting', status: 'PENDING', time: 'Expected 24h', desc: 'Issuance of authorized partner credentials and ESIN link.' }
                 ].map((step, i) => (
                   <div key={i} className="relative flex gap-10 items-start group">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-white dark:border-earth-900 shadow-xl transition-all duration-700 ${
                        step.status === 'COMPLETED' ? 'bg-agro-600 text-white' : 
                        step.status === 'PROCESSING' ? 'bg-blue-600 text-white animate-pulse' : 
                        'bg-earth-100 dark:bg-earth-800 text-earth-300'
                      }`}>
                         {step.status === 'COMPLETED' ? <ShieldCheck size={24} /> : 
                          step.status === 'PROCESSING' ? <Loader2 size={24} className="animate-spin" /> : 
                          <div className="w-2.5 h-2.5 rounded-full bg-current"></div>}
                      </div>
                      <div className={`flex-1 transition-all duration-500 ${step.status === 'PENDING' ? 'opacity-40 grayscale' : 'opacity-100'}`}>
                         <div className="flex justify-between items-center mb-1">
                            <h4 className="text-lg font-bold text-earth-900 dark:text-white">{step.label}</h4>
                            <span className="text-[9px] font-black text-earth-400 uppercase tracking-widest">{step.time}</span>
                         </div>
                         <p className="text-xs text-earth-500 dark:text-earth-400 leading-relaxed font-medium">{step.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* Footer Branding Ribbon */}
      <div className="mt-32 pt-16 border-t border-earth-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-earth-400">
         <span className="flex items-center gap-3"><Globe size={14} className="text-blue-500" /> Global Node Integration</span>
         <span className="flex items-center gap-3"><Layers size={14} className="text-agro-500" /> Trust Architecture v4.2.2</span>
         <span className="flex items-center gap-3 text-slate-600">© ENVIROSAGRO INFRASTRUCTURE</span>
      </div>

    </div>
  );
};
