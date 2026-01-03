
import React from 'react';
import { UpcomingEvents } from '../UpcomingEvents';
import { View } from '../../types';

interface EventsTabProps {
  onNavigate: (view: View) => void;
}

const EventsTab: React.FC<EventsTabProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12">
      <UpcomingEvents />
      <div className="bg-earth-900 p-12 rounded-[4rem] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575861501-7ce0e22432c9?w=1600')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="ea-label-meta justify-center mb-6 text-agro-400">Annual Flagship Event</div>
          <h2 className="text-5xl font-serif font-black mb-6">ScaleUp Summit 2024</h2>
          <p className="text-lg text-earth-300 font-medium italic mb-10">
            "Resilience at Scale: Bridging the Gap between Professional Knowledge and Industrial Output."
          </p>
          <button 
            onClick={() => onNavigate(View.SCALEUP_SUMMIT)}
            className="bg-agro-600 text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-agro-600/40 hover:bg-agro-500 hover:scale-105 active:scale-95 transition-all"
          >
            Registration & Access Portal
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsTab;
