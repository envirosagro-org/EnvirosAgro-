import React from 'react';
import { Scale, FileText, Lock, Globe } from 'lucide-react';

export const LegalGovernance: React.FC = () => {
  const items = [
    {
      title: "Regulatory Compliance",
      icon: <Scale size={24} />,
      bgColor: "bg-slate-100",
      textColor: "text-slate-700",
      desc: "EnvirosAgro strictly adheres to international agricultural standards, environmental protection laws, and labor regulations. We actively monitor changes in global policy to ensure our network remains compliant and ahead of regulatory curves."
    },
    {
      title: "Intellectual Property",
      icon: <FileText size={24} />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
      desc: "We balance the protection of proprietary agricultural innovations with the need for knowledge dissemination. Our legal team manages patents, trademarks, and licensing agreements to foster fair technology transfer."
    },
    {
      title: "Data Privacy & Sovereignty",
      icon: <Lock size={24} />,
      bgColor: "bg-amber-100",
      textColor: "text-amber-700",
      desc: "We champion 'Data Sovereignty' for farmers. All data collected via our digital tools is governed by strict privacy protocols, ensuring that farmers retain ownership and control over their agronomic information."
    },
    {
      title: "Land Rights Advocacy",
      icon: <Globe size={24} />,
      bgColor: "bg-green-100",
      textColor: "text-green-700",
      desc: "Recognizing that sustainable investment requires security, we provide legal resources and advocacy to support secure land tenure for smallholder communities, preventing displacement and encouraging long-term stewardship."
    }
  ];

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-serif font-bold text-agro-900 mb-4">Legal Framework & Governance</h3>
        <p className="text-earth-600 max-w-3xl mx-auto">
          Transparency, compliance, and the protection of rights form the legal backbone of our operations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-earth-100 hover:border-agro-200 transition-all">
            <div className="flex items-start gap-4">
              <div className={`${item.bgColor} p-3 rounded-xl ${item.textColor}`}>
                {item.icon}
              </div>
              <div>
                <h4 className="text-xl font-bold text-earth-900 mb-2">{item.title}</h4>
                <p className="text-earth-600 leading-relaxed text-sm">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
