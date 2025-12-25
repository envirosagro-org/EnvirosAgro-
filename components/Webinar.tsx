import React from 'react';
import { WebinarHeader } from './webinar/WebinarHeader';
import { Play, Calendar, Users, Clock, ArrowRight } from 'lucide-react';

export const Webinar: React.FC = () => {
  const upcoming = [
    { title: 'AI-Driven Irrigation Management', host: 'Dr. James Chen', date: 'Oct 24, 2024', time: '14:00 UTC', type: 'Advanced' },
    { title: 'Soil Carbon Verification Protocols', host: 'Elena Rossi', date: 'Oct 26, 2024', time: '10:00 UTC', type: 'Workshop' },
    { title: 'Drone Telemetry in Cocoa Systems', host: 'Amani K.', date: 'Oct 30, 2024', time: '16:00 UTC', type: 'Case Study' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <WebinarHeader />

      <div className="grid lg:grid-cols-3 gap-12 mb-20">
        <div className="lg:col-span-2">
           <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl group border border-earth-200 dark:border-earth-800 bg-slate-900">
              <img src="https://images.unsplash.com/photo-1591115711422-2430febbb524?w=1200" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[10s]" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <button className="w-24 h-24 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
                    <Play size={40} fill="currentColor" className="ml-2" />
                 </button>
              </div>
              <div className="absolute bottom-10 left-10 right-10">
                 <div className="flex items-center gap-3 mb-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">Live</span>
                    <span className="text-white text-sm font-bold">Scaling Multi-Trophic Aquaculture Systems</span>
                 </div>
                 <div className="flex gap-6 text-[10px] font-black text-white/80 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Users size={14} /> 842 Watching</span>
                    <span className="flex items-center gap-2"><Clock size={14} /> 45:12 / 1:30:00</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <h3 className="text-2xl font-bold text-earth-900 dark:text-white flex items-center gap-3">
              <Calendar size={24} className="text-blue-600" /> Upcoming Sessions
           </h3>
           <div className="space-y-4">
              {upcoming.map((web, i) => (
                 <div key={i} className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-6 rounded-[2rem] hover:border-blue-500/30 transition-all shadow-sm group">
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest px-2 py-1 bg-blue-50 rounded-lg mb-4 inline-block">
                       {web.type}
                    </span>
                    <h4 className="font-bold text-earth-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">{web.title}</h4>
                    <p className="text-xs text-earth-500 mb-4">Host: {web.host}</p>
                    <div className="flex justify-between items-center text-[10px] font-black text-earth-400 uppercase tracking-widest">
                       <span>{web.date}</span>
                       <span>{web.time}</span>
                    </div>
                    <button className="w-full mt-6 py-3 bg-earth-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors">
                       Register Now
                    </button>
                 </div>
              ))}
           </div>
           <button className="w-full py-4 border-2 border-dashed border-earth-200 dark:border-earth-800 rounded-[2rem] text-[10px] font-black text-earth-400 uppercase tracking-widest hover:border-blue-500 hover:text-blue-600 transition-all">
              Propose a Technical Topic
           </button>
        </div>
      </div>

      <div className="mt-20 pt-16 border-t border-earth-100 dark:border-earth-800">
         <div className="flex items-center justify-between mb-10">
            <h3 className="text-3xl font-serif font-black text-earth-900 dark:text-white">Webinar Archive</h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">View All Records →</button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
               <div key={i} className="group cursor-pointer">
                  <div className="aspect-video bg-earth-200 dark:bg-earth-800 rounded-2xl mb-4 overflow-hidden relative border border-earth-100 dark:border-earth-800">
                     <img src={`https://images.unsplash.com/photo-${1590000000000 + i}?w=400`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play size={24} className="text-white" />
                     </div>
                  </div>
                  <h4 className="font-bold text-sm text-earth-900 dark:text-white group-hover:text-blue-600 transition-colors">Strategic Planning for Q{i} Crops</h4>
                  <span className="text-[10px] font-bold text-earth-400 uppercase tracking-widest">Aug 2024 • 1h 12m</span>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};
