
import React from 'react';
/* Added missing Zap icon import from lucide-react to fix 'Cannot find name Zap' error */
import { ShieldCheck, Lock, Eye, Database, Fingerprint, Scale, Server, Bell, Globe, ArrowLeft, FileText, CheckCircle2, Zap } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="mb-16 border-b border-earth-100 pb-12">
        <div className="inline-flex items-center gap-2 bg-agro-50 text-agro-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-agro-100">
           <ShieldCheck size={14} /> Trust & Governance
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-earth-900 mb-6 leading-tight">
          Privacy & Data <br/>Sovereignty Policy
        </h1>
        <p className="text-xl text-earth-600 max-w-3xl leading-relaxed">
          At EnvirosAgro, we believe that data is the new fertilizer. This policy outlines our commitment to protecting your information and ensuring you remain the sole owner of your agronomic intelligence.
        </p>
        <div className="mt-8 flex items-center gap-6 text-xs font-bold text-earth-400 uppercase tracking-widest">
            <span>Last Updated: May 2024</span>
            <span className="w-1 h-1 bg-earth-200 rounded-full"></span>
            <span>Version 2.1.0</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-16">
        {/* Table of Contents - Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-32 space-y-4">
             <p className="text-[10px] font-black text-earth-300 uppercase tracking-[0.2em] mb-4">Quick Navigation</p>
             {[
               { id: 'sovereignty', label: 'Data Sovereignty' },
               { id: 'collection', label: 'What We Collect' },
               { id: 'usage', label: 'How Data is Used' },
               { id: 'sharing', label: 'Network Transparency' },
               { id: 'security', label: 'Asset Security' },
               { id: 'rights', label: 'Your User Rights' }
             ].map((item) => (
               <a 
                 key={item.id} 
                 href={`#${item.id}`}
                 className="block text-sm font-bold text-earth-500 hover:text-agro-600 transition-colors border-l-2 border-transparent hover:border-agro-200 pl-4 py-1"
               >
                 {item.label}
               </a>
             ))}
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-20 pb-32">
          
          {/* Pillar: Data Sovereignty */}
          <section id="sovereignty">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-agro-900 text-white rounded-2xl shadow-xl">
                    <Scale size={24} />
                </div>
                <h2 className="text-2xl font-serif font-bold text-earth-900 uppercase tracking-tight">01. Data Sovereignty</h2>
            </div>
            <div className="prose prose-earth max-w-none">
              <p className="text-lg text-earth-700 leading-relaxed font-medium mb-6">
                We champion the principle that **Farmers own their data.** EnvirosAgro acts as a custodian, not an owner, of the information generated on your land.
              </p>
              <ul className="grid md:grid-cols-2 gap-4 list-none p-0">
                  <li className="bg-earth-50 p-4 rounded-2xl border border-earth-100 flex gap-3">
                      <CheckCircle2 className="text-agro-600 shrink-0 mt-1" size={18} />
                      <span className="text-sm text-earth-600">You retain full intellectual property rights to your unique farming methodologies.</span>
                  </li>
                  <li className="bg-earth-50 p-4 rounded-2xl border border-earth-100 flex gap-3">
                      <CheckCircle2 className="text-agro-600 shrink-0 mt-1" size={18} />
                      <span className="text-sm text-earth-600">You can export or request the permanent deletion of your data at any time.</span>
                  </li>
              </ul>
            </div>
          </section>

          {/* Pillar: Collection */}
          <section id="collection">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl">
                    <Database size={24} />
                </div>
                <h2 className="text-2xl font-serif font-bold text-earth-900 uppercase tracking-tight">02. Information We Collect</h2>
            </div>
            <div className="space-y-6">
              <p className="text-earth-600 leading-relaxed">
                To provide the advanced resilience metrics of the Five Thrusts framework, we collect three primary categories of data:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-white border border-earth-100 rounded-3xl shadow-sm">
                    <h4 className="font-bold text-earth-900 mb-2 flex items-center gap-2 text-sm"><Fingerprint size={16} className="text-blue-500" /> Identity</h4>
                    <p className="text-xs text-earth-500 leading-relaxed">Name, contact info, and ESIN (Social ID) used for verification and financial grant processing.</p>
                </div>
                <div className="p-6 bg-white border border-earth-100 rounded-3xl shadow-sm">
                    <h4 className="font-bold text-earth-900 mb-2 flex items-center gap-2 text-sm"><Globe size={16} className="text-green-500" /> Agronomic</h4>
                    <p className="text-xs text-earth-500 leading-relaxed">Soil pH, moisture levels (In), rainfall duration (Dn), and crop yield telemetry via AI Field Scout.</p>
                </div>
                <div className="p-6 bg-white border border-earth-100 rounded-3xl shadow-sm">
                    <h4 className="font-bold text-earth-900 mb-2 flex items-center gap-2 text-sm"><FileText size={16} className="text-amber-500" /> Network</h4>
                    <p className="text-xs text-earth-500 leading-relaxed">Interactions within community groups, media engagement, and marketplace transaction history.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pillar: Usage */}
          <section id="usage">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-agro-600 text-white rounded-2xl shadow-xl">
                    <Zap size={24} />
                </div>
                <h2 className="text-2xl font-serif font-bold text-earth-900 uppercase tracking-tight">03. Use of Information</h2>
            </div>
            <div className="bg-earth-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
                    <Server size={200} />
                </div>
                <p className="text-lg font-medium mb-8 relative z-10">
                    We use your data to power the **m(t) Resilience Metric**—a predictive tool that helps you withstand environmental shocks.
                </p>
                <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <div className="w-1.5 h-1.5 bg-agro-400 rounded-full"></div>
                        <p className="text-sm text-agro-100">**Personalization**: Tailoring AI Advisor responses to your specific soil chemistry.</p>
                    </div>
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <div className="w-1.5 h-1.5 bg-agro-400 rounded-full"></div>
                        <p className="text-sm text-agro-100">**Rewards**: Calculating EAC earnings based on verified sustainable practices.</p>
                    </div>
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <div className="w-1.5 h-1.5 bg-agro-400 rounded-full"></div>
                        <p className="text-sm text-agro-100">**Industrial Sync**: Anonymizing data for regional supply chain optimization.</p>
                    </div>
                </div>
            </div>
          </section>

          {/* Pillar: Security */}
          <section id="security">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-earth-950 text-white rounded-2xl shadow-xl">
                    <Lock size={24} />
                </div>
                <h2 className="text-2xl font-serif font-bold text-earth-900 uppercase tracking-tight">04. Data Security</h2>
            </div>
            <div className="bg-white border border-earth-200 rounded-3xl p-8 shadow-sm">
                <div className="grid md:grid-cols-2 gap-10">
                    <div>
                        <h4 className="font-bold text-earth-900 mb-3 flex items-center gap-2"><ShieldCheck size={18} className="text-agro-600" /> End-to-End Encryption</h4>
                        <p className="text-sm text-earth-500 leading-relaxed">
                            All sensor data and financial transactions are protected via 256-bit AES encryption. Our servers are globally distributed to ensure 99.9% uptime and redundant backups.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-earth-900 mb-3 flex items-center gap-2"><Eye size={18} className="text-blue-600" /> Access Control</h4>
                        <p className="text-sm text-earth-500 leading-relaxed">
                            Strict internal protocols restrict data access to essential technical staff. Every access event is logged on a private organizational ledger to prevent data harvesting.
                        </p>
                    </div>
                </div>
            </div>
          </section>

          {/* Pillar: User Rights */}
          <section id="rights" className="pb-20">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-xl">
                    <Bell size={24} />
                </div>
                <h2 className="text-2xl font-serif font-bold text-earth-900 uppercase tracking-tight">05. Your Rights</h2>
            </div>
            <p className="text-earth-600 mb-10 leading-relaxed">
                As a member of the EnvirosAgro network, you are protected by international data protection standards (GDPR, KDP Act). You have the right to:
            </p>
            <div className="grid gap-4">
                {[
                    "Access a copy of all data points collected via your ESIN.",
                    "Rectify inaccurate sensor readings or personal profile info.",
                    "Restrict processing of your data for specific network thrusts.",
                    "Request permanent 'Data Erasure' upon account termination."
                ].map((right, i) => (
                    <div key={i} className="flex gap-4 items-center p-5 bg-white border border-earth-100 rounded-2xl hover:shadow-md transition-shadow">
                        <span className="w-8 h-8 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0">{i+1}</span>
                        <p className="text-sm font-medium text-earth-700">{right}</p>
                    </div>
                ))}
            </div>
          </section>

          {/* Final Call to Action */}
          <div className="bg-agro-50 rounded-[3rem] p-12 text-center border border-agro-100">
             <h3 className="text-2xl font-serif font-bold text-agro-900 mb-4">Questions about Sovereignty?</h3>
             <p className="text-agro-700 mb-8 max-w-xl mx-auto">Our Data Governance Council is here to ensure your assets remain your own. Contact us for a full audit of your account data.</p>
             <a href="mailto:privacy@envirosagro.org" className="bg-agro-600 hover:bg-agro-700 text-white font-bold py-4 px-10 rounded-full transition-all shadow-xl shadow-agro-600/20 inline-block">
                Contact Privacy Officer
             </a>
          </div>

        </div>
      </div>
    </div>
  );
};
