
import React from 'react';
import { ShieldCheck, Users, MessageCircle, Heart, Scale, AlertTriangle, CheckCircle, Handshake, Leaf, ArrowLeft } from 'lucide-react';
import { View } from '../types';

interface CommunityGuidelinesProps {
    onNavigate: (view: View) => void;
}

export const CommunityGuidelines: React.FC<CommunityGuidelinesProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Back Button */}
      <button 
        onClick={() => onNavigate(View.COMMUNITY)}
        className="mb-8 flex items-center gap-2 text-earth-500 hover:text-agro-600 font-bold transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Community
      </button>

      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-agro-50 text-agro-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-agro-100">
            <ShieldCheck size={16} /> Code of Conduct
        </div>
        <h2 className="text-4xl font-serif font-bold text-earth-900 mb-6">Community Guidelines</h2>
        <p className="text-xl text-earth-600 max-w-3xl mx-auto">
          To ensure EnvirosAgro remains a safe, productive, and sustainable network for all stakeholders, we ask that you adhere to the following standards of interaction.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-earth-100 hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6">
                <Users size={28} />
            </div>
            <h3 className="text-xl font-bold text-earth-900 mb-3">Respect & Inclusivity</h3>
            <p className="text-earth-600 leading-relaxed text-sm">
                We celebrate diversity in agricultural practices and backgrounds. Harassment, hate speech, or discrimination of any kind will not be tolerated. Treat every farmer, researcher, and stakeholder with dignity.
            </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-earth-100 hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Scale size={28} />
            </div>
            <h3 className="text-xl font-bold text-earth-900 mb-3">Scientific Integrity</h3>
            <p className="text-earth-600 leading-relaxed text-sm">
                As a data-driven network, we value accuracy. When sharing agronomic advice or data, ensure it is evidence-based. Misinformation that could harm crops or livelihoods is strictly prohibited.
            </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-earth-100 hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Leaf size={28} />
            </div>
            <h3 className="text-xl font-bold text-earth-900 mb-3">Sustainable Action</h3>
            <p className="text-earth-600 leading-relaxed text-sm">
                Our mission is sustainability. Content promoting illegal deforestation, banned chemical inputs, or environmentally destructive practices violates the core ethos of EnvirosAgro.
            </p>
        </div>
      </div>

      {/* Specific Guidelines List */}
      <div className="bg-earth-50 rounded-3xl p-8 md:p-12 mb-16 border border-earth-200">
          <h3 className="text-2xl font-bold text-earth-900 mb-8 flex items-center gap-3">
              <Handshake className="text-agro-600" /> Standards of Engagement
          </h3>
          
          <div className="grid md:grid-cols-2 gap-12">
              <div>
                  <h4 className="font-bold text-agro-800 mb-6 flex items-center gap-2">
                      <CheckCircle className="text-agro-600" size={20} /> Encouraged Behaviors
                  </h4>
                  <ul className="space-y-4">
                      <li className="flex gap-3 items-start">
                          <span className="w-1.5 h-1.5 bg-agro-400 rounded-full mt-2 shrink-0"></span>
                          <p className="text-sm text-earth-700"><strong>Knowledge Sharing:</strong> Freely share your experiences with crop rotation, pest management, and soil health.</p>
                      </li>
                      <li className="flex gap-3 items-start">
                          <span className="w-1.5 h-1.5 bg-agro-400 rounded-full mt-2 shrink-0"></span>
                          <p className="text-sm text-earth-700"><strong>Constructive Feedback:</strong> Critique ideas, not people. Offer helpful suggestions to improve others' farming techniques.</p>
                      </li>
                      <li className="flex gap-3 items-start">
                          <span className="w-1.5 h-1.5 bg-agro-400 rounded-full mt-2 shrink-0"></span>
                          <p className="text-sm text-earth-700"><strong>Data Contribution:</strong> Upload accurate datasets to the Knowledge Hub to improve the global Sustainability Coefficient C(a).</p>
                      </li>
                      <li className="flex gap-3 items-start">
                          <span className="w-1.5 h-1.5 bg-agro-400 rounded-full mt-2 shrink-0"></span>
                          <p className="text-sm text-earth-700"><strong>Community Support:</strong> Use the forum to mentor young farmers and support local cooperative initiatives.</p>
                      </li>
                  </ul>
              </div>

              <div>
                  <h4 className="font-bold text-red-800 mb-6 flex items-center gap-2">
                      <AlertTriangle className="text-red-600" size={20} /> Prohibited Behaviors
                  </h4>
                  <ul className="space-y-4">
                      <li className="flex gap-3 items-start">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0"></span>
                          <p className="text-sm text-earth-700"><strong>Spam & Solicitation:</strong> Do not use the community feed for unauthorized commercial advertising or spam.</p>
                      </li>
                      <li className="flex gap-3 items-start">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0"></span>
                          <p className="text-sm text-earth-700"><strong>Data Theft:</strong> Do not harvest member data or share personal contact information without explicit consent.</p>
                      </li>
                      <li className="flex gap-3 items-start">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0"></span>
                          <p className="text-sm text-earth-700"><strong>Impersonation:</strong> Do not pretend to be an EnvirosAgro official, government representative, or another user.</p>
                      </li>
                      <li className="flex gap-3 items-start">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0"></span>
                          <p className="text-sm text-earth-700"><strong>Harmful Content:</strong> Posting content that incites violence or promotes illegal agricultural practices will result in an immediate ban.</p>
                      </li>
                  </ul>
              </div>
          </div>
      </div>

      {/* Enforcement & Contact */}
      <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-earth-200">
              <h3 className="font-bold text-lg text-earth-900 mb-4">Enforcement Policy</h3>
              <p className="text-earth-600 text-sm mb-4">
                  We employ a <strong>3-Strike System</strong> for minor violations. Serious offenses result in immediate suspension of your ESIN (EnvirosAgro Social ID) and loss of access to financial and data services.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-agro-700 bg-agro-50 px-3 py-2 rounded-lg w-fit">
                  <ShieldCheck size={14} /> Moderated by Community Council
              </div>
          </div>

          <div className="bg-agro-900 text-white p-8 rounded-3xl shadow-lg">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <MessageCircle size={20} /> Report a Violation
              </h3>
              <p className="text-agro-100 text-sm mb-6">
                  If you witness behavior that violates these guidelines, please report it to our moderation team immediately. Your report will remain anonymous.
              </p>
              <a href="mailto:support@envirosagro.org" className="inline-flex items-center gap-2 bg-white text-agro-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-agro-50 transition-colors">
                  Contact Support
              </a>
          </div>
      </div>
    </div>
  );
};
