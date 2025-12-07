
import React from 'react';
import { Calendar, Users, Video, Mic, MessageSquare, Star, ArrowRight } from 'lucide-react';

export const ScaleUpSummit: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-slate-200">
            <Video size={16} /> Virtual Conference Hub
        </div>
        <h2 className="text-4xl font-serif font-bold text-agro-900 mb-4">ScaleUp Summit 2024</h2>
        <p className="text-xl text-earth-600 max-w-2xl mx-auto">
          The premier gathering for industrial agriculture leaders. Explore global supply chain resilience, agri-fintech, and large-scale mechanization.
        </p>
      </div>

      {/* Hero Stream Area */}
      <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl mb-12 border-4 border-slate-800">
         <div className="aspect-video bg-black relative group cursor-pointer">
             <img 
               src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=1600&auto=format&fit=crop&q=80" 
               className="w-full h-full object-cover opacity-60"
               alt="Conference Keynote"
             />
             <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-center">
                     <span className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-4 inline-block animate-pulse">
                        Live Now
                     </span>
                     <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Keynote: The Future of Food Security</h1>
                     <button className="bg-white text-slate-900 font-bold py-3 px-8 rounded-full hover:bg-slate-200 transition-colors flex items-center gap-2 mx-auto">
                        <Video size={20} /> Join Stream
                     </button>
                 </div>
             </div>
         </div>
         <div className="bg-slate-800 p-6 flex justify-between items-center text-white">
             <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                    <Mic size={24} className="text-blue-400" />
                 </div>
                 <div>
                     <h4 className="font-bold">Dr. Amina Juma</h4>
                     <p className="text-xs text-slate-400">CEO, AgriGlobal Ventures</p>
                 </div>
             </div>
             <div className="flex gap-6 text-sm font-bold text-slate-400">
                 <span className="flex items-center gap-2"><Users size={16} /> 2,450 Attendees</span>
                 <span className="flex items-center gap-2"><MessageSquare size={16} /> Live Chat</span>
             </div>
         </div>
      </div>

      {/* Agenda & Expo */}
      <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-earth-200 shadow-sm">
              <h3 className="text-2xl font-bold text-earth-900 mb-6 flex items-center gap-2">
                  <Calendar className="text-agro-600" /> Session Agenda
              </h3>
              <div className="space-y-6">
                  {[
                      { time: "10:00 AM", title: "Supply Chain Digitization", speaker: "Tech Panel", status: "Up Next" },
                      { time: "11:30 AM", title: "Sustainable Mechanization", speaker: "John Deere Rep", status: "Upcoming" },
                      { time: "02:00 PM", title: "Carbon Markets for Industry", speaker: "Climate Fund", status: "Upcoming" }
                  ].map((session, idx) => (
                      <div key={idx} className="flex gap-4 items-start pb-4 border-b border-earth-50 last:border-0 last:pb-0">
                          <div className="text-sm font-bold text-earth-500 w-20 pt-1">{session.time}</div>
                          <div className="flex-1">
                              <h4 className="font-bold text-earth-900 text-lg">{session.title}</h4>
                              <p className="text-xs text-earth-500 mb-2">{session.speaker}</p>
                              <span className={`text-[10px] font-bold px-2 py-1 rounded ${idx === 0 ? 'bg-green-100 text-green-700' : 'bg-earth-100 text-earth-600'}`}>
                                  {session.status}
                              </span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden">
              <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Star className="text-yellow-400" /> Virtual Expo Hall
                  </h3>
                  <p className="text-slate-300 mb-8">
                      Visit virtual booths from top industry partners. Download whitepapers, watch demos, and chat with representatives.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                      {['AgriBank', 'EcoFert', 'LogiTech', 'SolarSystems'].map((sponsor, i) => (
                          <div key={i} className="bg-white/10 p-4 rounded-xl text-center font-bold text-sm hover:bg-white/20 cursor-pointer transition-colors">
                              {sponsor}
                          </div>
                      ))}
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                      Enter Expo Hall <ArrowRight size={18} />
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};
