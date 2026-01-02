import React from 'react';
import { ShieldCheck, Users, MessageCircle, Scale, AlertTriangle, CheckCircle, Handshake, Leaf, ArrowLeft } from 'lucide-react';
import { View } from '../types';

interface CommunityGuidelinesProps {
    onNavigate: (view: View) => void;
}

export const CommunityGuidelines: React.FC<CommunityGuidelinesProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 font-sans">
      {/* Back Button */}
      <button 
        onClick={() => onNavigate(View.COMMUNITY)}
        className="mb-8 flex items-center gap-2 text-earth-400 hover:text-agro-400 font-bold transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Community
      </button>

      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-agro-500/10 text-agro-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-agro-500/20">
            <ShieldCheck size={16} /> Code of Conduct
        </div>
        <h2 className="text-5xl font-serif font-black text-white mb-6 tracking-tighter">Community Guidelines</h2>
        <p className="text-xl text-earth-300 max-w-3xl mx-auto leading-relaxed">
          To ensure EnvirosAgro remains a safe, productive, and sustainable network for all stakeholders, we ask that you adhere to the following standards of interaction.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-earth-900/40 p-8 rounded-3xl shadow-strategic border border-white/5 hover:border-agro-500/30 transition-all backdrop-blur-sm group">
            <div className="w-14 h-14 bg-rose-500/10 text-rose-400 rounded-2xl flex items-center justify-center mb-6 border border-rose-500/20 group-hover:scale-110 transition-transform">
                <Users size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Respect & Inclusivity</h3>
            <p className="text-earth-400 leading-relaxed text-sm font-medium">
                We celebrate diversity in agricultural practices and backgrounds. Harassment, hate speech, or discrimination of any kind will not be tolerated. Treat every farmer, researcher, and stakeholder with dignity.
            </p>
        </div>

        <div className="bg-earth-900/40 p-8 rounded-3xl shadow-strategic border border-white/5 hover:border-agro-500/30 transition-all backdrop-blur-sm group">
            <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
                <Scale size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Scientific Integrity</h3>
            <p className="text-earth-400 leading-relaxed text-sm font-medium">
                As a data-driven network, we value accuracy. When sharing agronomic advice or data, ensure it is evidence-based. Misinformation that could harm crops or livelihoods is strictly prohibited.
            </p>
        </div>

        <div className="bg-earth-900/40 p-8 rounded-3xl shadow-strategic border border-white/5 hover:border-agro-500/30 transition-all backdrop-blur-sm group">
            <div className="w-14 h-14 bg-agro-500/10 text-agro-400 rounded-2xl flex items-center justify-center mb-6 border border-agro-500/20 group-hover:scale-110 transition-transform">
                <Leaf size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Sustainable Action</h3>
            <p className="text-earth-400 leading-relaxed text-sm font-medium">
                Our mission is sustainability. Content promoting illegal deforestation, banned chemical inputs, or environmentally destructive practices violates the core ethos of EnvirosAgro.
            </p>
        </div>
      </div>

      {/* Specific Guidelines List */}
      <div className="bg-earth-900/60 rounded-[3rem] p-8 md:p-12 mb-16 border border-white/10 backdrop-blur-md">
          <h3 className="text-3xl font-serif font-black text-white mb-8 flex items-center gap-4">
              <Handshake className="text-agro-400" size={32} /> Standards of Engagement
          </h3>
          
          <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-black/20 p-8 rounded-2xl border border-agro-500/10">
                  <h4 className="font-black text-agro-400 mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
                      <CheckCircle size={20} /> Encouraged Behaviors
                  </h4>
                  <ul className="space-y-4">
                      <li className="flex gap-4 items-start group">
                          <span className="w-2 h-2 bg-agro-500 rounded-full mt-1.5 shrink-0 group-hover:scale-150 transition-transform"></span>
                          <p className="text-sm text-earth-200"><strong className="text-white">Knowledge Sharing:</strong> Freely share your experiences with crop rotation, pest management, and soil health.</p>
                      </li>
                      <li className="flex gap-4 items-start group">
                          <span className="w-2 h-2 bg-agro-500 rounded-full mt-1.5 shrink-0 group-hover:scale-150 transition-transform"></span>
                          <p className="text-sm text-earth-200"><strong className="text-white">Constructive Feedback:</strong> Critique ideas, not people. Offer helpful suggestions to improve others' farming techniques.</p>
                      </li>
                      <li className="flex gap-4 items-start group">
                          <span className="w-2 h-2 bg-agro-500 rounded-full mt-1.5 shrink-0 group-hover:scale-150 transition-transform"></span>
                          <p className="text-sm text-earth-200"><strong className="text-white">Data Contribution:</strong> Upload accurate datasets to the Knowledge Hub to improve the global Sustainability Coefficient C(a).</p>
                      </li>
                      <li className="flex gap-4 items-start group">
                          <span className="w-2 h-2 bg-agro-500 rounded-full mt-1.5 shrink-0 group-hover:scale-150 transition-transform"></span>
                          <p className="text-sm text-earth-200"><strong className="text-white">Community Support:</strong> Use the forum to mentor young farmers and support local cooperative initiatives.</p>
                      </li>
                  </ul>
              </div>

              <div className="bg-black/20 p-8 rounded-2xl border border-red-500/10">
                  <h4 className="font-black text-red-400 mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
                      <AlertTriangle size={20} /> Prohibited Behaviors
                  </h4>
                  <ul className="space-y-4">
                      <li className="flex gap-4 items-start group">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0 group-hover:scale-150 transition-transform"></span>
                          <p className="text-sm text-earth-200"><strong className="text-white">Spam & Solicitation:</strong> Do not use the community feed for unauthorized commercial advertising or spam.</p>
                      </li>
                      <li className="flex gap-4 items-start group">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0 group-hover:scale-150 transition-transform"></span>
                          <p className="text-sm text-earth-200"><strong className="text-white">Data Theft:</strong> Do not harvest member data or share personal contact information without explicit consent.</p>
                      </li>
                      <li className="flex gap-4 items-start group">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0 group-hover:scale-150 transition-transform"></span>
                          <p className="text-sm text-earth-200"><strong className="text-white">Impersonation:</strong> Do not pretend to be an EnvirosAgro official, government representative, or another user.</p>
                      </li>
                      <li className="flex gap-4 items-start group">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0 group-hover:scale-150 transition-transform"></span>
                          <p className="text-sm text-earth-200"><strong className="text-white">Harmful Content:</strong> Posting content that incites violence or promotes illegal agricultural practices will result in an immediate ban.</p>
                      </li>
                  </ul>
              </div>
          </div>
      </div>

      {/* Enforcement & Contact */}
      <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-earth-900/40 p-8 rounded-3xl shadow-strategic border border-white/5 backdrop-blur-sm">
              <h3 className="font-black text-white mb-4 uppercase tracking-[0.2em] text-sm">Enforcement Policy</h3>
              <p className="text-earth-300 text-sm mb-6 leading-relaxed">
                  We employ a <strong className="text-agro-400">3-Strike System</strong> for minor violations. Serious offenses result in immediate suspension of your ESIN (EnvirosAgro Social ID) and loss of access to financial and data services.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black text-agro-400 bg-agro-500/10 px-4 py-2 rounded-full border border-agro-500/20 w-fit uppercase tracking-widest">
                  <ShieldCheck size={14} /> Moderated by Community Council
              </div>
          </div>

          <div className="bg-gradient-to-br from-agro-600 to-indigo-900 text-white p-8 rounded-3xl shadow-cinematic-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                  <MessageCircle size={120} />
              </div>
              <h3 className="font-black text-xl mb-4 flex items-center gap-3 relative z-10">
                  <MessageCircle size={24} /> Report a Violation
              </h3>
              <p className="text-agro-100 text-sm mb-8 leading-relaxed relative z-10 max-w-sm font-medium">
                  If you witness behavior that violates these guidelines, please report it to our moderation team immediately. Your report will remain anonymous.
              </p>
              <a href="mailto:support@envirosagro.org" className="inline-flex items-center gap-3 bg-white text-agro-900 px-8 py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-agro-50 transition-all hover:scale-105 shadow-xl relative z-10">
                  Contact Support
              </a>
          </div>
      </div>
    </div>
  );
};
