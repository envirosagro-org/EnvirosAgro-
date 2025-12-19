import React from 'react';
import { Microscope, Sprout, CloudRain, ArrowRight, ShieldCheck } from 'lucide-react';
import { View } from '../types';

const SERVICES = [
  {
    title: "Precision Soil Lab Analysis",
    description: "Deep chemical and biological audit of your soil profiles, including NPK, trace minerals, and microbial health index.",
    price: "From $45/Plot",
    icon: <Microscope size={24} />,
    target: View.FARM_SCOUT
  },
  {
    title: "Regenerative Transition Strategy",
    description: "Personalized 12-month roadmap to switch from conventional to regenerative practices, maximizing your m(t) score.",
    price: "$250/Consult",
    icon: <Sprout size={24} />,
    target: View.ROADMAP_AI
  },
  {
    title: "Smart Irrigation Design",
    description: "Engineering blueprints for solar-powered drip and moisture-sensing irrigation systems tailored for arid regions.",
    price: "Custom Quote",
    icon: <CloudRain size={24} />,
    target: View.FARM_SCOUT
  },
  {
    title: "Ag-Compliance Audit",
    description: "Verification of your farming practices against international organic and fair-trade standards for export readiness.",
    price: "$150/Audit",
    icon: <ShieldCheck size={24} />,
    target: View.SUSTAINABILITY_FRAMEWORK
  }
];

interface ServicesProps {
    onNavigate?: (view: View) => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-agro-900 dark:text-white mb-4">Professional Services</h2>
        <p className="text-earth-600 dark:text-earth-400 max-w-2xl mx-auto">
          Leverage our network of experts to optimize your operations and transition to sustainable practices with confidence.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SERVICES.map((service, idx) => (
          <div key={idx} className="bg-white dark:bg-earth-900 p-8 rounded-2xl shadow-sm border border-earth-100 dark:border-earth-800 hover:border-agro-200 dark:hover:border-agro-500 hover:shadow-md transition-all flex flex-col">
            <div className="w-16 h-16 bg-agro-50 dark:bg-agro-900/30 text-agro-600 dark:text-agro-400 rounded-xl flex items-center justify-center mb-6">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-earth-900 dark:text-white mb-3 leading-tight">{service.title}</h3>
            <p className="text-earth-600 dark:text-earth-400 mb-6 flex-1 text-sm leading-relaxed">
              {service.description}
            </p>
            <div className="pt-6 border-t border-earth-100 dark:border-earth-800 flex items-center justify-between">
              <span className="font-semibold text-agro-800 dark:text-agro-400 text-sm">{service.price}</span>
              <button 
                  onClick={() => onNavigate && onNavigate(service.target)}
                  className="text-sm font-bold text-earth-500 dark:text-earth-300 hover:text-agro-600 flex items-center gap-1 transition-colors"
              >
                Book <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
        
        <div className="bg-agro-900 text-white p-8 rounded-2xl shadow-lg flex flex-col justify-center text-center lg:col-span-4 mt-8">
            <h3 className="text-2xl font-bold mb-4">Specialized Research Partnerships</h3>
            <p className="text-agro-100 mb-8 max-w-2xl mx-auto">
                Are you a research institution or a government body looking to leverage the EnvirosAgro Framework for regional development?
            </p>
            <button 
                onClick={() => onNavigate && onNavigate(View.PARTNERSHIPS)}
                className="bg-white text-agro-900 font-bold py-3 px-10 rounded-full hover:bg-agro-100 transition-colors w-fit mx-auto shadow-md"
            >
                Contact Strategy Team
            </button>
        </div>
      </div>
    </div>
  );
};