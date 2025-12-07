
import React, { useState } from 'react';
import { Calendar, Users, Video, Mic, MessageSquare, Star, ArrowRight, X, Download, Globe } from 'lucide-react';

export const ScaleUpSummit: React.FC = () => {
  const [showExpo, setShowExpo] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState<string | null>('AgriBank');

  if (showExpo) {
      return (
          <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4">
              <button onClick={() => setShowExpo(false)} className="mb-6 flex items-center gap-2 text-earth-600 hover:text-agro-600 font-bold transition-colors">
                  <ArrowRight className="rotate-180" size={20} /> Back to Lobby
              </button>
              
              <div className="bg-slate-900 text-white rounded-3xl p-8 lg:p-12 min-h-[70vh] relative overflow-hidden shadow-2xl">
                  {/* Background Accents */}
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-3xl rounded-full pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-purple-600/10 blur-3xl rounded-full pointer-events-none"></div>

                  <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-3 relative z-10">
                      <Star className="text-yellow-400" fill="currentColor" /> Virtual Expo Hall
                  </h2>
                  
                  <div className="grid lg:grid-cols-3 gap-8 relative z-10">
                      {/* Sponsor List */}
                      <div className="space-y-4">
                          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Exhibitors</h3>
                          {['AgriBank', 'EcoFert', 'LogiTech', 'SolarSystems'].map((sponsor) => (
                              <button
                                  key={sponsor}
                                  onClick={() => setSelectedSponsor(sponsor)}
                                  className={`w-full p-4 rounded-xl text-left font-bold transition-all border-2 flex justify-between items-center group ${
                                      selectedSponsor === sponsor
                                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-900/20'
                                      : 'bg-white/5 border-transparent hover:bg-white/10 text-slate-400 hover:text-white'
                                  }`}
                              >
                                  {sponsor}
                                  {selectedSponsor === sponsor && <div className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa]"></div>}
                              </button>
                          ))}
                      </div>
                      
                      {/* Booth Detail */}
                      <div className="lg:col-span-2 bg-white/5 rounded-3xl p-8 border border-white/10 flex flex-col">
                          {selectedSponsor ? (
                              <div className="flex-1 flex flex-col">
                                  <div className="flex justify-between items-start mb-6">
                                      <div>
                                          <h3 className="text-3xl font-bold mb-1">{selectedSponsor}</h3>
                                          <p className="text-blue-400 text-sm font-mono">Premium Partner</p>
                                      </div>
                                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase border border-green-500/50 flex items-center gap-2 animate-pulse">
                                          <span className="w-2 h-2 bg-green-400 rounded-full"></span> Live Now
                                      </span>
                                  </div>
                                  
                                  <div className="bg-black/20 rounded-xl p-6 mb-8 border border-white/5">
                                      <p className="text-slate-300 leading-relaxed text-lg">
                                          Welcome to the {selectedSponsor} virtual experience. We are pioneering industrial solutions to scale your operations efficiently and sustainably.
                                      </p>
                                  </div>

                                  <div className="mt-auto grid sm:grid-cols-2 gap-4">
                                      <button className="bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg">
                                          <MessageSquare size={20} /> Chat with Rep
                                      </button>
                                      <button className="bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors border border-white/10">
                                          <Download size={20} /> Download Kit
                                      </button>
                                  </div>
                              </div>
                          ) : (
                              <div className="h-full flex items-center justify-center text-slate-500">Select a sponsor to visit their booth</div>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      );
  }

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

          <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden flex flex-col">
              <div className="relative z-10 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Star className="text-yellow-400" fill="currentColor" /> Virtual Expo Hall
                  </h3>
                  <p className="text-slate-300 mb-8">
                      Visit virtual booths from top industry partners.
                  </p>
                  
                  {/* Sponsor Selector Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                      {['AgriBank', 'EcoFert', 'LogiTech', 'SolarSystems'].map((sponsor, i) => (
                          <button
                              key={i}
                              onClick={() => setSelectedSponsor(sponsor)}
                              className={`p-4 rounded-xl text-center font-bold text-sm transition-all border-2 ${
                                  selectedSponsor === sponsor
                                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-[1.02]'
                                  : 'bg-white/10 border-transparent hover:bg-white/20 text-slate-300'
                              }`}
                          >
                              {sponsor}
                          </button>
                      ))}
                  </div>
                  
                  <button 
                    onClick={() => setShowExpo(true)}
                    className="w-full mt-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/50 hover:scale-[1.02]"
                  >
                      Enter Expo Hall <ArrowRight size={18} />
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};
