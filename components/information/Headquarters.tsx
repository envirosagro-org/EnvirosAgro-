import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

export const Headquarters: React.FC = () => {
  return (
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
  );
};
