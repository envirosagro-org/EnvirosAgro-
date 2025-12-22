import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

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

export const FAQ: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
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
  );
};
