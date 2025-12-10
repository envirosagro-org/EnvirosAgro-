
import React, { useState } from 'react';
import { Video, Mic, Share2, MessageSquare, Layout, Database, PlayCircle, StopCircle, Eye, AlertCircle } from 'lucide-react';
import { DATASETS } from './data';

export const LiveHost: React.FC = () => {
  const [isLive, setIsLive] = useState(false);
  const [streamTitle, setStreamTitle] = useState("Weekly Ag-Tech Review");
  const [viewerCount, setViewerCount] = useState(0);
  const [selectedOverlay, setSelectedOverlay] = useState<string | null>(null);

  const toggleStream = () => {
    setIsLive(!isLive);
    if (!isLive) setViewerCount(Math.floor(Math.random() * 500) + 50);
    else setViewerCount(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 h-[calc(100vh-80px)]">
      <div className="grid lg:grid-cols-3 gap-8 h-full">
        
        {/* Left: Stream Controls & Preview */}
        <div className="lg:col-span-2 flex flex-col gap-6">
           <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative flex-1 min-h-[400px] border-4 border-slate-800 group">
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                 <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isLive ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-700 text-slate-400'}`}>
                    {isLive ? 'LIVE' : 'OFFLINE'}
                 </span>
                 {isLive && (
                    <span className="bg-black/50 backdrop-blur text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-2">
                        <Eye size={14} /> {viewerCount}
                    </span>
                 )}
              </div>

              {/* Stream Preview Area */}
              <div className="w-full h-full bg-slate-950 flex items-center justify-center relative">
                 {isLive ? (
                    <img 
                        src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1200&auto=format&fit=crop&q=80" 
                        className="w-full h-full object-cover opacity-80" 
                        alt="Stream Feed"
                    />
                 ) : (
                    <div className="text-center text-slate-600">
                        <Video size={64} className="mx-auto mb-4 opacity-50" />
                        <p className="font-mono text-sm">Camera Feed Standby</p>
                    </div>
                 )}

                 {/* Data Overlay */}
                 {isLive && selectedOverlay && (
                    <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-2xl max-w-xs animate-in slide-in-from-bottom-10 border-l-4 border-agro-600">
                        <h4 className="font-bold text-agro-900 text-sm mb-1 flex items-center gap-2">
                            <Database size={14} /> Live Data Insight
                        </h4>
                        <p className="text-earth-700 text-xs font-medium">{selectedOverlay}</p>
                    </div>
                 )}
              </div>
           </div>

           {/* Control Bar */}
           <div className="bg-white p-4 rounded-2xl border border-earth-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <button className="p-3 rounded-full bg-earth-50 hover:bg-earth-100 text-earth-600 transition-colors"><Mic size={20} /></button>
                 <button className="p-3 rounded-full bg-earth-50 hover:bg-earth-100 text-earth-600 transition-colors"><Video size={20} /></button>
                 <button className="p-3 rounded-full bg-earth-50 hover:bg-earth-100 text-earth-600 transition-colors"><Layout size={20} /></button>
              </div>

              <div className="flex-1 mx-8">
                 <input 
                    type="text" 
                    value={streamTitle}
                    onChange={(e) => setStreamTitle(e.target.value)}
                    className="w-full bg-transparent font-bold text-center text-earth-900 border-b border-transparent focus:border-agro-500 focus:outline-none py-1"
                 />
              </div>

              <button 
                onClick={toggleStream}
                className={`px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all ${isLive ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-agro-600 text-white hover:bg-agro-700 shadow-lg'}`}
              >
                 {isLive ? <><StopCircle size={20} /> End Stream</> : <><PlayCircle size={20} /> Go Live</>}
              </button>
           </div>
        </div>

        {/* Right: Database Integration */}
        <div className="bg-white rounded-3xl border border-earth-200 shadow-sm flex flex-col overflow-hidden">
            <div className="p-6 border-b border-earth-100 bg-agro-50">
               <h3 className="font-bold text-agro-900 flex items-center gap-2">
                  <Database size={20} className="text-agro-600" /> EnvirosAgro Data Base
               </h3>
               <p className="text-xs text-agro-700 mt-1">Select a dataset to overlay on your stream.</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
               {DATASETS.map((data) => (
                  <div 
                    key={data.id}
                    onClick={() => setSelectedOverlay(selectedOverlay === data.name ? null : data.name)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedOverlay === data.name ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-300' : 'bg-white border-earth-100 hover:border-agro-200 hover:shadow-sm'}`}
                  >
                     <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-bold uppercase text-earth-400 bg-earth-50 px-1.5 py-0.5 rounded">{data.thrust}</span>
                        <span className="text-[10px] text-earth-400">{data.type}</span>
                     </div>
                     <h4 className="font-bold text-sm text-earth-900 leading-tight mb-2">{data.name}</h4>
                     {selectedOverlay === data.name && (
                        <div className="text-xs text-blue-600 font-bold flex items-center gap-1 animate-in fade-in">
                           <Eye size={12} /> Active Overlay
                        </div>
                     )}
                  </div>
               ))}
            </div>

            <div className="p-4 border-t border-earth-100 bg-earth-50">
                <div className="flex items-center gap-3 text-xs text-earth-500 bg-white p-3 rounded-xl border border-earth-100">
                   <AlertCircle size={16} className="text-amber-500 shrink-0" />
                   Pro Tip: Use datasets to validate your discussion points in real-time.
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};
