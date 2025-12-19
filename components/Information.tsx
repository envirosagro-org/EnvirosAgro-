import React, { useState } from 'react';
import { Target, Lightbulb, Heart, ShieldCheck, Scale, FileText, Lock, Globe, ChevronDown, HelpCircle, Eye, RefreshCw, Users, Smile, Gavel, Leaf, MapPin, ExternalLink, AlertTriangle, Zap } from 'lucide-react';

const FAQS = [
  {
    question: "What is the difference between Sustainable Integrated Development and SI-D?",
    answer: "Sustainable Integrated Development is our overarching organizational strategy to harmonize all five agricultural thrusts for global resilience. Social Influenza Disease (SI-D), however, is a specific socio-psychological framework within the Social Agriculture thrust used to identify and treat harmful narratives and fractures that block development. One is the goal; the other is a primary obstacle we diagnose."
  },
  {
    question: "What is the EnvirosAgro Sustainability Framework?",
    answer: "It is a holistic model organizing agricultural development into five interconnected thrusts: Social (SA), Environmental (EA), Health (HA), Technical (TA), and Industrial (IA). This framework ensures that farming practices are not just productive but also socially equitable, environmentally regenerative, and economically scalable."
  },
  {
    question: "How is the Sustainable Time Constant m(t) calculated?",
    answer: "The m(t) score is calculated using our proprietary formula: m = √[((Dn × In) × C(a)) / S]. It takes into account natural variables like rainfall (Dn) and soil moisture (In), multiplied by the Sustainability Coefficient C(a), and divided by crop requirements (S). A higher 'm' value indicates greater resilience against environmental shocks."
  },
  {
    question: "What is an ESIN and why do I need one?",
    answer: "ESIN stands for EnvirosAgro Social Identification Number. It is a unique digital identifier assigned to registered farmers, groups, and societies. It serves as your 'sustainability passport,' allowing you to track your impact, access financial grants, and verify the authenticity of your produce in the supply chain."
  },
  {
    question: "How does EnvirosAgro protect my data?",
    answer: "We champion 'Data Sovereignty.' All agronomic and personal data collected through our platforms remains the property of the user. We adhere to strict privacy protocols and only aggregate anonymized data for research purposes with your consent."
  }
];

export const Information: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold text-agro-900 mb-4">About EnvirosAgro</h2>
        <p className="text-xl text-earth-600 max-w-3xl mx-auto">
          We are a pioneering network committed to establishing a comprehensive ecosystem that advances and supports agricultural sustainability globally.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
         <div className="bg-agro-900 text-white p-10 rounded-3xl flex flex-col justify-center text-center shadow-lg">
            <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-agro-300">
               <Target size={32} />
            </div>
            <h3 className="text-3xl font-serif font-bold mb-4">Our Mission</h3>
            <p className="text-xl text-agro-100 leading-relaxed italic">
               "To ensure agriculture and its environ is smooth, reliable and safe."
            </p>
         </div>

         <div className="bg-white border border-earth-100 p-10 rounded-3xl flex flex-col justify-center text-center shadow-sm">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
               <Eye size={32} />
            </div>
            <h3 className="text-3xl font-serif font-bold text-earth-900 mb-4">Our Vision</h3>
            <p className="text-xl text-earth-600 leading-relaxed italic">
               "To have socioeconomic and healthy future for agricultural community."
            </p>
         </div>
      </div>

      {/* Concept Distinction Section */}
      <div className="mb-20">
         <div className="bg-white border-2 border-agro-100 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <AlertTriangle size={200} />
            </div>
            <div className="relative z-10">
                <h3 className="text-2xl font-serif font-bold text-agro-900 mb-8 flex items-center gap-3">
                   <Zap className="text-agro-600" /> Key Framework Distinctions
                </h3>
                <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-agro-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest w-fit">
                            Strategic Framework
                        </div>
                        <h4 className="text-xl font-bold text-earth-900">Sustainable Integrated Development</h4>
                        <p className="text-sm text-earth-600 leading-relaxed">
                            This is our <strong>overarching organizational model</strong>. It focuses on the horizontal integration of technology, society, and nature to build long-term stability. Measured by the Sustainable Time Constant m(t).
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest w-fit">
                            Diagnostic Framework
                        </div>
                        <h4 className="text-xl font-bold text-earth-900">Social Influenza Disease (SI-D)</h4>
                        <p className="text-sm text-earth-600 leading-relaxed">
                            A specific <strong>socio-psychological framework</strong> within the Social Agriculture thrust. It treats societal fractures as "infections"—diagnosing how harmful narratives and stressors prevent integrated growth.
                        </p>
                    </div>
                </div>
            </div>
         </div>
      </div>

      {/* Principles Section */}
      <div className="mb-20">
        <h3 className="text-3xl font-serif font-bold text-agro-900 mb-10 text-center">Principles of EnvirosAgro</h3>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { title: "Integration", icon: <Users size={24} />, desc: "Unifying diverse agricultural sectors." },
            { title: "Vision", icon: <Eye size={24} />, desc: "Forward-thinking strategies for the future." },
            { title: "Innovation", icon: <Lightbulb size={24} />, desc: "Embracing technology and creative solutions." },
            { title: "Sustainability", icon: <Leaf size={24} />, desc: "Ensuring long-term ecological balance." },
            { title: "Kaizen", icon: <RefreshCw size={24} />, desc: "Continuous improvement in all practices." }
          ].map((principle, idx) => (
             <div key={idx} className="bg-white p-6 rounded-2xl border border-earth-100 shadow-sm hover:border-agro-300 hover:shadow-md transition-all text-center group">
                <div className="w-12 h-12 bg-earth-50 rounded-full flex items-center justify-center mx-auto mb-4 text-earth-600 group-hover:bg-agro-50 group-hover:text-agro-600 transition-colors">
                   {principle.icon}
                </div>
                <h4 className="font-bold text-lg text-earth-900 mb-2">{principle.title}</h4>
                <p className="text-sm text-earth-500">{principle.desc}</p>
             </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-20 bg-earth-50 rounded-3xl p-10 border border-earth-100">
        <h3 className="text-3xl font-serif font-bold text-agro-900 mb-10 text-center">Values of EnvirosAgro</h3>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
           {[
            { title: "Ethical", icon: <ShieldCheck size={28} />, color: "text-amber-600" },
            { title: "Communal", icon: <Users size={28} />, color: "text-rose-600" },
            { title: "Optimistic", icon: <Smile size={28} />, color: "text-yellow-500" },
            { title: "Supportive", icon: <Heart size={28} />, color: "text-green-600" },
            { title: "Governed", icon: <Gavel size={28} />, color: "text-blue-600" }
           ].map((value, idx) => (
              <div key={idx} className="flex flex-col items-center">
                 <div className={`mb-4 ${value.color}`}>{value.icon}</div>
                 <h4 className="font-bold text-lg text-earth-900">{value.title}</h4>
              </div>
           ))}
        </div>
      </div>

      {/* Legal & Governance Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
           <h3 className="text-3xl font-serif font-bold text-agro-900 mb-4">Legal Framework & Governance</h3>
           <p className="text-earth-600 max-w-3xl mx-auto">
             Transparency, compliance, and the protection of rights form the legal backbone of our operations.
           </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-earth-100 hover:border-agro-200 transition-all">
                <div className="flex items-start gap-4">
                    <div className="bg-slate-100 p-3 rounded-xl text-slate-700">
                        <Scale size={24} />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-earth-900 mb-2">Regulatory Compliance</h4>
                        <p className="text-earth-600 leading-relaxed text-sm">
                            EnvirosAgro strictly adheres to international agricultural standards, environmental protection laws, and labor regulations. We actively monitor changes in global policy to ensure our network remains compliant and ahead of regulatory curves.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-earth-100 hover:border-agro-200 transition-all">
                <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-700">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-earth-900 mb-2">Intellectual Property</h4>
                        <p className="text-earth-600 leading-relaxed text-sm">
                            We balance the protection of proprietary agricultural innovations with the need for knowledge dissemination. Our legal team manages patents, trademarks, and licensing agreements to foster fair technology transfer.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-earth-100 hover:border-agro-200 transition-all">
                <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-3 rounded-xl text-amber-700">
                        <Lock size={24} />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-earth-900 mb-2">Data Privacy & Sovereignty</h4>
                        <p className="text-earth-600 leading-relaxed text-sm">
                            We champion "Data Sovereignty" for farmers. All data collected via our digital tools is governed by strict privacy protocols, ensuring that farmers retain ownership and control over their agronomic information.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-earth-100 hover:border-agro-200 transition-all">
                <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-xl text-green-700">
                        <Globe size={24} />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-earth-900 mb-2">Land Rights Advocacy</h4>
                        <p className="text-earth-600 leading-relaxed text-sm">
                            Recognizing that sustainable investment requires security, we provide legal resources and advocacy to support secure land tenure for smallholder communities, preventing displacement and encouraging long-term stewardship.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="mb-20">
         <div className="text-center mb-12">
           <h3 className="text-3xl font-serif font-bold text-agro-900 mb-4 flex items-center justify-center gap-3">
             <MapPin className="text-agro-600" /> Our Headquarters
           </h3>
           <p className="text-earth-600 max-w-2xl mx-auto">
             Located in Kiriaini, Kenya, serving as the central hub for our global sustainability network.
           </p>
         </div>
         
         <div className="bg-white p-4 rounded-3xl shadow-sm border border-earth-100 h-[400px] w-full relative overflow-hidden group">
            <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src="https://maps.google.com/maps?cid=15197208055071949030&output=embed"
                className="rounded-2xl w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                title="EnvirosAgro Location"
                loading="lazy"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-2xl"></div>
            
            {/* Overlay Button */}
            <div className="absolute bottom-6 right-6 z-10">
                <a 
                    href="https://www.google.com/maps?cid=15197208055071949030" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-agro-900 font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:bg-agro-50 transition-all flex items-center gap-2"
                >
                    <ExternalLink size={18} /> View Business Profile
                </a>
            </div>
         </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-20">
         <div className="text-center mb-12">
           <h3 className="text-3xl font-serif font-bold text-agro-900 mb-4 flex items-center justify-center gap-3">
             <HelpCircle className="text-agro-600" /> Frequently Asked Questions
           </h3>
           <p className="text-earth-600 max-w-2xl mx-auto">
             Common questions about our mission, methodology, and membership.
           </p>
         </div>
         
         <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl border ${openFaqIndex === index ? 'border-agro-500 ring-4 ring-agro-50' : 'border-earth-100'} shadow-sm transition-all overflow-hidden cursor-pointer`}
                onClick={() => toggleFaq(index)}
              >
                <div className="p-6 flex justify-between items-center gap-4">
                  <h4 className={`font-bold text-lg ${openFaqIndex === index ? 'text-agro-800' : 'text-earth-800'}`}>
                    {faq.question}
                  </h4>
                  <div className={`p-2 rounded-full transition-transform duration-300 ${openFaqIndex === index ? 'bg-agro-100 text-agro-700 rotate-180' : 'bg-earth-50 text-earth-400'}`}>
                    <ChevronDown size={20} />
                  </div>
                </div>
                {openFaqIndex === index && (
                  <div className="px-6 pb-6 text-earth-600 leading-relaxed animate-in slide-in-from-top-2 fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
         </div>
      </div>

      {/* Footer Quote */}
      <div className="bg-agro-900 text-white p-12 rounded-3xl text-center">
        <blockquote className="text-xl md:text-2xl font-serif italic max-w-4xl mx-auto leading-relaxed">
          "To ensure agriculture and its environ is smooth, reliable and safe."
        </blockquote>
      </div>
    </div>
  );
};