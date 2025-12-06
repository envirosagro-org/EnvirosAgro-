import React from 'react';
import { Users, Leaf, ShieldPlus, Cpu, Factory, Heart, Smile, MessageCircle, Star, Award } from 'lucide-react';

const CUSTOMER_SEGMENTS: any[] = [];

export const Customer: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold text-agro-900 mb-4">Customer Experience</h2>
        <p className="text-xl text-earth-600 max-w-3xl mx-auto">
          We serve a diverse ecosystem of stakeholders, tailoring our value proposition to meet specific needs across the Five Thrusts.
        </p>
      </div>

      {/* Customer Personas Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {CUSTOMER_SEGMENTS.length > 0 ? (
            CUSTOMER_SEGMENTS.map((persona) => (
                <div key={persona.id} className={`p-8 rounded-3xl border ${persona.border} ${persona.bg} hover:shadow-lg transition-all relative overflow-hidden group`}>
                    <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
                        {persona.icon}
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="bg-white/60 p-2 rounded-xl backdrop-blur-sm">
                                {persona.icon}
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider bg-white/50 px-2 py-1 rounded">
                                {persona.thrust}
                            </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-2">{persona.title}</h3>
                        <p className="text-sm font-bold opacity-70 mb-6 uppercase tracking-wide flex items-center gap-2">
                            <Star size={14} fill="currentColor" /> {persona.focus}
                        </p>
                        
                        <div className="bg-white/40 p-6 rounded-xl italic leading-relaxed">
                            "{persona.quote}"
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <div className="col-span-full md:col-span-1 lg:col-span-2 py-12 px-8 bg-earth-50 rounded-3xl border border-earth-100 flex flex-col justify-center items-center text-center">
                <Users size={48} className="text-earth-300 mb-4" />
                <h3 className="text-xl font-bold text-earth-600 mb-2">Customer Segments Updating</h3>
                <p className="text-earth-500 text-sm">We are currently refining our customer personas data. Please check back soon.</p>
            </div>
        )}
        
        {/* Call to Action Card */}
        <div className="bg-agro-900 text-white p-8 rounded-3xl flex flex-col justify-center items-center text-center">
            <Heart size={48} className="text-agro-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Customer First</h3>
            <p className="text-agro-100 mb-8">
                Our support team is available 24/7 to assist with any inquiries across all sectors.
            </p>
            <button className="bg-white text-agro-900 px-6 py-3 rounded-full font-bold hover:bg-agro-100 transition-colors flex items-center gap-2">
                <MessageCircle size={18} /> Contact Support
            </button>
        </div>
      </div>

      {/* Satisfaction Metrics */}
      <div className="bg-white border border-earth-100 rounded-3xl p-12 shadow-sm">
         <div className="grid md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-earth-100">
             <div className="p-4">
                 <div className="text-4xl font-serif font-bold text-agro-600 mb-2">98%</div>
                 <div className="text-earth-500 font-medium">Customer Retention</div>
             </div>
             <div className="p-4">
                 <div className="text-4xl font-serif font-bold text-blue-600 mb-2">24/7</div>
                 <div className="text-earth-500 font-medium">Technical Support</div>
             </div>
             <div className="p-4">
                 <div className="text-4xl font-serif font-bold text-rose-600 mb-2">15k+</div>
                 <div className="text-earth-500 font-medium">Active Community</div>
             </div>
             <div className="p-4">
                 <div className="text-4xl font-serif font-bold text-amber-500 mb-2">4.9/5</div>
                 <div className="text-earth-500 font-medium">Average Rating</div>
             </div>
         </div>
      </div>
    </div>
  );
};