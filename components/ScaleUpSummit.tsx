import React from 'react';
import { ScaleUpHeader } from './scaleup/ScaleUpHeader';
import { Ticket, Users, Mic, Laptop, Coffee, Rocket, ArrowRight } from 'lucide-react';

export const ScaleUpSummit: React.FC = () => {
  const highlights = [
    { title: 'The EA Thrust Roadmap', speaker: 'Dr. Elena Rossi', time: '10:00 AM', icon: <Mic className="text-indigo-500" /> },
    { title: 'IA Supply Chain Forensics', speaker: 'James Mwangi', time: '11:30 AM', icon: <Laptop className="text-blue-500" /> },
    { title: 'Impact Investment Lab', speaker: 'Sarah Miller', time: '02:00 PM', icon: <Rocket className="text-indigo-600" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <ScaleUpHeader />

      <div className="grid lg:grid-cols-3 gap-12 mb-20">
         <div className="lg:col-span-2 space-y-12">
            <div>
               <h3 className="text-3xl font-serif font-black text-earth-900 dark:text-white mb-8 border-l-4 border-indigo-600 pl-6">Main Stage Agenda</h3>
               <div className="space-y-4">
                  {highlights.map((h, i) => (
                     <div key={i} className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-8 rounded-[2rem] flex items-center gap-8 group hover:shadow-xl transition-all">
                        <div className="w-16 h-16 bg-earth-50 dark:bg-earth-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                           {React.cloneElement(h.icon as React.ReactElement, { size: 32 })}
                        </div>
                        <div className="flex-1">
                           <div className="flex justify-between items-center mb-1">
                              <h4 className="text-xl font-bold text-earth-900 dark:text-white group-hover:text-indigo-600 transition-colors">{h.title}</h4>
                              <span className="text-[10px] font-mono font-bold text-earth-400 bg-earth-50 px-3 py-1 rounded-lg">{h.time}</span>
                           </div>
                           <p className="text-sm text-earth-500 font-medium">Speaker: {h.speaker}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-12 rounded-[3rem] shadow-sm">
               <h3 className="text-2xl font-bold text-earth-900 dark:text-white mb-8">Why Attend?</h3>
               <div className="grid md:grid-cols-3 gap-8">
                  {[
                     { title: 'Global Access', desc: 'Direct link to EnvirosAgro hubs.', icon: <Users /> },
                     { title: 'Deep Data', desc: 'Exclusive access to EA Thrust logs.', icon: <Laptop /> },
                     { title: 'Market Scale', desc: 'Industrialized restoration models.', icon: <Rocket /> }
                  ].map((why, i) => (
                     <div key={i} className="text-center">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">{why.icon}</div>
                        <h4 className="font-bold text-earth-900 dark:text-white mb-2">{why.title}</h4>
                        <p className="text-xs text-earth-500 leading-relaxed">{why.desc}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="bg-indigo-900 dark:bg-indigo-950 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group border border-indigo-500/30">
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-[10s]"><Ticket size={160} /></div>
               <h3 className="text-2xl font-bold mb-4 relative z-10">Summit Pass</h3>
               <p className="text-indigo-200 text-sm mb-8 relative z-10 leading-relaxed">Full access to 3 days of workshops, networking, and the IA digital terminal.</p>
               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
                  <span className="text-3xl font-black block mb-1">500 EAC</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Early Bird Rate</span>
               </div>
               <button className="w-full py-5 bg-white text-indigo-900 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-indigo-50 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3">
                  <Ticket size={20} /> Register Seat
               </button>
               <p className="text-[9px] text-center mt-6 text-indigo-400 font-bold uppercase tracking-widest">Limited to 100 industrial delegates</p>
            </div>

            <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 p-8 rounded-[2rem] shadow-sm">
               <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-xl">
                     <Mic size={24} />
                  </div>
                  <div>
                     <h4 className="font-bold text-earth-900 dark:text-white">Live Update</h4>
                     <p className="text-xs text-earth-400">Speaker Announcement</p>
                  </div>
               </div>
               <p className="text-xs text-earth-600 dark:text-earth-300 leading-relaxed mb-6 font-medium">
                  We are excited to welcome the Global Biodiversity lead from the SA cluster for the keynote session...
               </p>
               <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2 group">
                  Read Press Release <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};
