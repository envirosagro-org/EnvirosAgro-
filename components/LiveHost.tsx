import React, { useState } from 'react';
import { LiveHostHeader } from './livehost/LiveHostHeader';
import { Play, MessageCircle, Users, Activity, Settings, Maximize, Mic, Video, Share2, Volume2, X } from 'lucide-react';

export const LiveHost: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <LiveHostHeader />

      <div className="grid lg:grid-cols-4 gap-8">
        <div className={`lg:col-span-3 space-y-8 transition-all duration-500 ${!chatOpen ? 'lg:col-span-4' : ''}`}>
           <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl group border border-earth-200 dark:border-earth-800 bg-black">
              <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200" className="w-full h-full object-cover opacity-80" />
              
              <div className="absolute top-8 left-8 flex gap-3">
                 <div className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 animate-pulse shadow-lg">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div> LIVE BROADCAST
                 </div>
                 <div className="bg-black/40 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-mono tracking-tighter border border-white/10">
                    UTC 14:24:08
                 </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                 <div className="bg-black/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10 flex items-center gap-8 shadow-2xl">
                    <button onClick={() => setIsMuted(!isMuted)} className="text-white hover:text-red-500 transition-colors">
                       {isMuted ? <Volume2 size={24} className="opacity-40" /> : <Volume2 size={24} />}
                    </button>
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Current Segment</span>
                       <span className="text-white font-bold">Planetary Health Update: EA Cluster 01</span>
                    </div>
                 </div>
                 <div className="flex gap-3">
                    <button className="bg-black/40 backdrop-blur-md text-white p-3 rounded-2xl border border-white/10 hover:bg-white/10 transition-all"><Settings size={20} /></button>
                    <button className="bg-black/40 backdrop-blur-md text-white p-3 rounded-2xl border border-white/10 hover:bg-white/10 transition-all"><Maximize size={20} /></button>
                 </div>
              </div>
           </div>

           <div className="flex flex-wrap gap-4">
              {[
                 { label: 'Studio Link', icon: <Video />, color: 'bg-blue-600' },
                 { label: 'Voice Input', icon: <Mic />, color: 'bg-green-600' },
                 { label: 'Share Feed', icon: <Share2 />, color: 'bg-purple-600' },
                 { label: 'Interaction', icon: <MessageCircle />, color: 'bg-amber-600' }
              ].map((tool, i) => (
                 <button key={i} className="flex-1 min-w-[150px] bg-white dark:bg-earth-900 p-6 rounded-[2rem] border border-earth-100 dark:border-earth-800 shadow-sm flex flex-col items-center gap-4 group hover:shadow-xl hover:-translate-y-1 transition-all">
                    <div className={`p-4 ${tool.color} text-white rounded-2xl group-hover:scale-110 transition-transform`}>{tool.icon}</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-earth-900 dark:text-white">{tool.label}</span>
                 </button>
              ))}
           </div>
        </div>

        {chatOpen && (
           <div className="lg:col-span-1 h-full animate-in slide-in-from-right-8 duration-500">
              <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-[3rem] shadow-xl h-[600px] lg:h-full flex flex-col overflow-hidden">
                 <div className="p-6 border-b border-earth-50 dark:border-earth-800 flex justify-between items-center bg-earth-50/50 dark:bg-earth-800/50">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                       <h3 className="font-bold text-sm">Community Pulse</h3>
                    </div>
                    <button onClick={() => setChatOpen(false)} className="text-earth-300 hover:text-earth-900 dark:hover:text-white"><X size={18} /></button>
                 </div>
                 
                 <div className="flex-1 p-6 overflow-y-auto space-y-6 ea-scroll-container">
                    {[
                       { user: 'Kiriaini_F7', msg: 'The telemetry looks solid on our end.', color: 'text-blue-500' },
                       { user: 'Dr_Smith', msg: 'Can we zoom into quadrant 4?', color: 'text-purple-500' },
                       { user: 'EcoWatcher', msg: 'Great session on soil density today.', color: 'text-green-500' },
                       { user: 'AgTech_Global', msg: 'Link established. Listening from Nairobi.', color: 'text-amber-500' }
                    ].map((chat, i) => (
                       <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                          <span className={`text-[10px] font-black uppercase tracking-widest mb-1 block ${chat.color}`}>{chat.user}</span>
                          <p className="text-xs text-earth-600 dark:text-earth-300 leading-relaxed bg-earth-50 dark:bg-earth-800/50 p-3 rounded-2xl rounded-tl-none">{chat.msg}</p>
                       </div>
                    ))}
                 </div>

                 <div className="p-6 border-t border-earth-50 dark:border-earth-800 bg-earth-50/50 dark:bg-earth-800/50">
                    <div className="relative">
                       <input 
                        type="text" 
                        placeholder="Uplink message..." 
                        className="w-full bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-2xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-red-500 transition-all"
                       />
                       <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-red-600 hover:scale-110 transition-transform">
                          <Play size={16} fill="currentColor" />
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        )}
      </div>

      {!chatOpen && (
         <button 
          onClick={() => setChatOpen(true)}
          className="fixed bottom-10 right-10 bg-red-600 text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 border-4 border-white dark:border-earth-900"
         >
            <MessageCircle size={32} />
         </button>
      )}
    </div>
  );
};
