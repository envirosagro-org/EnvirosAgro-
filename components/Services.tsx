import React from 'react';
import { Microscope, Sprout, CloudRain, BookOpen, ArrowRight, ClipboardCheck } from 'lucide-react';

const SERVICES: any[] = [];

export const Services: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-agro-900 mb-4">Professional Services</h2>
        <p className="text-earth-600 max-w-2xl mx-auto">
          Leverage our network of experts to optimize your operations and transition to sustainable practices with confidence.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-earth-100 hover:border-agro-200 hover:shadow-md transition-all flex flex-col">
            <div className="w-16 h-16 bg-agro-50 text-agro-600 rounded-xl flex items-center justify-center mb-6">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-agro-900 mb-3">{service.title}</h3>
            <p className="text-earth-600 mb-6 flex-1">
              {service.description}
            </p>
            <div className="pt-6 border-t border-earth-100 flex items-center justify-between">
              <span className="font-semibold text-agro-800">{service.price}</span>
              <button className="text-sm font-bold text-earth-500 hover:text-agro-600 flex items-center gap-1 transition-colors">
                Book Now <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
        
        {/* Custom Service Card */}
        <div className="bg-agro-900 p-8 rounded-2xl shadow-lg flex flex-col justify-center text-white text-center lg:col-span-3">
            <h3 className="text-xl font-bold mb-4">Services Coming Soon</h3>
            <p className="text-agro-100 mb-8 max-w-lg mx-auto">
                We are currently onboarding certified service providers aligned with the EnvirosAgro Sustainability Framework.
            </p>
            <button className="bg-white text-agro-900 font-bold py-3 px-6 rounded-lg hover:bg-agro-100 transition-colors w-fit mx-auto">
                Contact for Inquiries
            </button>
        </div>
      </div>
    </div>
  );
};