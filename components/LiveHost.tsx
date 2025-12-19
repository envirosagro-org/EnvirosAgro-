import React, { useState, useRef, useEffect } from 'react';
import { 
  Video, Mic, Share2, MessageSquare, Layout, Database, PlayCircle, 
  StopCircle, Eye, AlertCircle, Camera, RefreshCw, X, Maximize, 
  Settings, UserPlus, Info, Zap, Smartphone, Monitor, Radio, Mic2
} from 'lucide-react';
import { DATASETS } from './data';

export const LiveHost: React.FC = () => {
  const [isLive, setIsLive] = useState(false);
  const [streamTitle, setStreamTitle] = useState("Weekly Ag-Tech Review");
  const [viewerCount, setViewerCount] = useState(0);
  const [selectedOverlay, setSelectedOverlay] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [audioActive, setAudioActive] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-increment viewer count when live
  useEffect(() => {
    let interval: any;
    if (isLive) {
        interval = setInterval(() => {
            setViewerCount(prev => prev + Math.floor(Math.random() * 3));
        }, 5000);
    }
    return () => {
        if (interval) clearInterval(interval);
    };
  }, [isLive]);

  const toggleCamera = async () => {
    if (cameraActive && stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
        setCameraActive(false);
        if (videoRef.current) videoRef.current.srcObject = null;
    } else {
        try {
            const s = await navigator.mediaDevices.getUserMedia({ 
                video: { width: 1280, height: 720 }, 
                audio: true 
            });
            setStream(s);
            setCameraActive(true);
            if (videoRef.current) {
                videoRef.current.srcObject = s;
            }
        } catch (err) {
            console.error("Camera access failed:", err);
            alert("Could not access camera. Please ensure permissions are granted.");
        }
    }
  };

  const toggleLive = () => {
    if (!cameraActive && !isLive) {
        alert("Please activate your camera first.");
        return;
    }
    setIsLive(!isLive);
    if (!isLive) setViewerCount(Math.floor(Math.random() * 50) + 10);
    else setViewerCount(0);
  };

  const toggleAudio = () => {
      if (stream) {
          const audioTrack = stream.getAudioTracks()[0];
          if (audioTrack) {
              audioTrack.enabled = !audioTrack.enabled;
              setAudioActive(audioTrack.enabled);
          }
      }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 h-[calc(100vh-100px)] flex flex-col">
      
      {/* Broadcast Dashboard Header */}
      <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${isLive ? 'bg-red-600 animate-pulse' : 'bg-slate-800'} text-white shadow-lg transition-colors`}>
                  <Radio size={24} />
              </div>
              <div>
                  <h2 className="text-2xl font-serif font-bold text-agro-900 dark:text-white">Media Host Studio</h2>
                  <div className="flex items-center gap-4 mt-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-earth-400 flex items-center gap-1">
                        <Monitor size={10} /> Output: 1080p 60fps
                      </span>
                      {isLive && (
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-500 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span> Live to Network
                        </span>
                      )}
                  </div>
              </div>
          </div>
          <div className="flex gap-3">
              <button className="bg-white dark:bg-earth-800 p-3 rounded-2xl border border-earth-100 dark:border-earth-800 shadow-sm text-earth-500 hover:text-agro-600 transition-all">
                  <Settings size={20} />
              </button>
              <button className="bg-white dark:bg-earth-800 p-3 rounded-2xl border border-earth-100 dark:border-earth-800 shadow-sm text-earth-500 hover:text-blue-600 transition-all">
                  <UserPlus size={20} />
              </button>
          </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8 flex-1 min-h-0">
        
        {/* Main Feed Area */}
        <div className="lg:col-span-3 flex flex-col gap-6 h-full">
           <div className="bg-black rounded-[2.5rem] overflow-hidden shadow-2xl relative flex-1 border-4 border-slate-900 group">
              <div className="absolute top-6 left-6 z-20 flex gap-3">
                 <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 border ${isLive ? 'bg-red-600 text-white border-red-500 animate-pulse' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                    {isLive ? 'ON AIR' : 'STANDBY'}
                 </div>
                 {isLive && (
                    <div className="bg-black/60 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 border border-white/10">
                        <Eye size={12} className="text-agro-400" /> {viewerCount} Viewers
                    </div>
                 )}
              </div>

              {/* Real Camera Preview */}
              <div className="w-full h-full bg-slate-950 flex items-center justify-center relative">
                 {cameraActive ? (
                    <video 
                        ref={videoRef}
                        autoPlay 
                        playsInline 
                        muted={true}
                        className={`w-full h-full object-cover transition-opacity duration-500 ${isLive ? 'opacity-100' : 'opacity-60 grayscale-[50%]'}`} 
                    />
                 ) : (
                    <div className="text-center text-slate-700">
                        <Video size={80} className="mx-auto mb-6 opacity-20" />
                        <p className="font-mono text-xs uppercase tracking-[0.3em] font-bold">Signal Encrypted • Host Not Present</p>
                        <button 
                            onClick={toggleCamera}
                            className="mt-8 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-8 py-3 rounded-2xl border border-blue-600/30 transition-all font-bold text-sm uppercase tracking-widest"
                        >
                            Initialize Camera
                        </button>
                    </div>
                 )}

                 {/* Studio Overlay Widgets - Removed blur */}
                 {isLive && selectedOverlay && (
                    <div className="absolute bottom-10 right-10 bg-white/95 p-6 rounded-[2rem] shadow-2xl max-w-sm animate-in slide-in-from-right-10 border border-white/20 ring-1 ring-white/10">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-agro-500 rounded-xl text-white shadow-lg">
                                <Database size={18} />
                            </div>
                            <span className="font-black text-[10px] text-earth-900 uppercase tracking-widest">Source: Data Hub</span>
                        </div>
                        <h4 className="text-xl font-bold text-earth-900 leading-tight mb-2">{selectedOverlay}</h4>
                        <div className="flex items-center gap-2 text-agro-600 font-bold text-xs">
                            <Zap size={14} fill="currentColor" /> Verified Sustainable Metric
                        </div>
                    </div>
                 )}
                 
                 {/* Recording Indicator */}
                 {isLive && (
                    <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-red-500/30">
                        <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Recording</span>
                    </div>
                 )}
              </div>
           </div>

           {/* Production Switcher Bar */}
           <div className="bg-white dark:bg-earth-900 p-6 rounded-[2rem] border border-earth-200 dark:border-earth-800 shadow-xl flex items-center gap-8">
              <div className="flex items-center gap-3 pr-8 border-r border-earth-100 dark:border-earth-800">
                 <button 
                    onClick={toggleAudio}
                    className={`p-4 rounded-2xl transition-all shadow-sm ${audioActive ? 'bg-earth-50 dark:bg-earth-800 text-earth-700 dark:text-earth-100' : 'bg-red-50 text-red-600 shadow-inner'}`}
                 >
                    <Mic size={24} />
                 </button>
                 <button 
                    onClick={toggleCamera}
                    className={`p-4 rounded-2xl transition-all shadow-sm ${cameraActive ? 'bg-earth-50 dark:bg-earth-800 text-earth-700 dark:text-earth-100' : 'bg-red-50 text-red-600 shadow-inner'}`}
                 >
                    <Video size={24} />
                 </button>
                 <button className="p-4 rounded-2xl bg-earth-50 dark:bg-earth-800 text-earth-700 dark:text-earth-100 transition-all hover:bg-earth-100 shadow-sm"><Layout size={24} /></button>
              </div>

              <div className="flex-1">
                 <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest block mb-1">Session Title</label>
                 <input 
                    type="text" 
                    value={streamTitle}
                    onChange={(e) => setStreamTitle(e.target.value)}
                    className="w-full bg-transparent font-serif font-bold text-2xl text-earth-900 dark:text-white border-b-2 border-transparent focus:border-agro-500 focus:outline-none transition-colors"
                 />
              </div>

              <div className="flex gap-4 items-center">
                  <button className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-all"><Share2 size={24} /></button>
                  <button 
                    onClick={toggleLive}
                    className={`px-12 py-4 rounded-2xl font-black flex items-center gap-3 transition-all shadow-2xl ${isLive ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-agro-600 text-white hover:bg-agro-700 shadow-agro-600/30'}`}
                  >
                     {isLive ? <><StopCircle size={24} fill="currentColor" /> END STREAM</> : <><PlayCircle size={24} fill="currentColor" /> GO LIVE</>}
                  </button>
              </div>
           </div>
        </div>

        {/* Right Panel: Chat & Assets */}
        <div className="flex flex-col gap-6 h-full min-h-0">
            {/* Chat/Messages */}
            <div className="bg-white dark:bg-earth-900 rounded-[2rem] border border-earth-200 dark:border-earth-800 shadow-sm flex flex-col h-1/2 overflow-hidden">
                <div className="p-6 border-b border-earth-100 dark:border-earth-800 bg-earth-50/50 dark:bg-earth-800/50 flex justify-between items-center">
                   <h3 className="font-bold text-earth-900 dark:text-white flex items-center gap-2">
                      <MessageSquare size={18} className="text-blue-500" /> Live Feedback
                   </h3>
                   <span className="text-[10px] font-black text-agro-600">Active</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {isLive ? (
                        <>
                            <div className="bg-earth-50 dark:bg-earth-800 p-3 rounded-xl border-l-4 border-blue-500 animate-in slide-in-from-right-2">
                                <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Dr. Elena Rossi</p>
                                <p className="text-xs text-earth-700 dark:text-earth-300 font-medium">The data on Kiriaini yields is impressive. Can you zoom in on the TA thrust metrics?</p>
                            </div>
                            <div className="bg-earth-50 dark:bg-earth-800 p-3 rounded-xl border-l-4 border-green-500 animate-in slide-in-from-right-4 delay-100">
                                <p className="text-[10px] font-bold text-green-600 uppercase mb-1">Muna Ibrahim</p>
                                <p className="text-xs text-earth-700 dark:text-earth-300 font-medium">Great point about vertical mulching!</p>
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center px-6">
                            <Info size={32} className="text-earth-200 mb-2" />
                            <p className="text-xs text-earth-400 font-bold uppercase tracking-widest">Connect to Live Stream to enable interaction</p>
                        </div>
                    )}
                </div>
                <div className="p-4 bg-earth-50 dark:bg-earth-800/50 border-t border-earth-100 dark:border-earth-800">
                    <div className="relative">
                        <input 
                            disabled={!isLive}
                            type="text" 
                            placeholder="Type as host..." 
                            className="w-full bg-white dark:bg-earth-900 border border-earth-200 dark:border-earth-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-agro-500 disabled:opacity-50"
                        />
                    </div>
                </div>
            </div>

            {/* Asset Overlays */}
            <div className="bg-white dark:bg-earth-900 rounded-[2rem] border border-earth-200 dark:border-earth-800 shadow-sm flex flex-col h-1/2 overflow-hidden">
                <div className="p-6 border-b border-earth-100 dark:border-earth-800 bg-agro-50/50 dark:bg-agro-900/10">
                   <h3 className="font-bold text-agro-900 dark:text-agro-400 flex items-center gap-2">
                      <Database size={18} /> Production Assets
                   </h3>
                   <p className="text-[10px] text-agro-700 dark:text-agro-500 mt-1 font-bold uppercase tracking-widest">Overlay Control</p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                   {DATASETS.map((data) => (
                      <button 
                        key={data.id}
                        disabled={!isLive}
                        onClick={() => setSelectedOverlay(selectedOverlay === data.name ? null : data.name)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all disabled:opacity-50 group ${selectedOverlay === data.name ? 'bg-agro-600 border-agro-500 text-white shadow-lg' : 'bg-white dark:bg-earth-900 border-earth-100 dark:border-earth-800 hover:border-agro-200 hover:bg-earth-50 dark:hover:bg-earth-800'}`}
                      >
                         <div className="flex justify-between items-start mb-2">
                            <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded border ${selectedOverlay === data.name ? 'bg-white/20 border-white/20 text-white' : 'bg-earth-50 dark:bg-earth-800 border-earth-200 dark:border-earth-700 text-earth-400'}`}>
                                {data.thrust}
                            </span>
                            {selectedOverlay === data.name && <Maximize size={12} className="animate-pulse" />}
                         </div>
                         <h4 className={`font-bold text-xs leading-tight ${selectedOverlay === data.name ? 'text-white' : 'text-earth-900 dark:text-white'}`}>
                            {data.name}
                         </h4>
                      </button>
                   ))}
                </div>

                <div className="p-4 border-t border-earth-100 dark:border-earth-800 bg-earth-50 dark:bg-earth-800/50">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-earth-500 dark:text-earth-400 bg-white dark:bg-earth-900 p-3 rounded-2xl border border-earth-100 dark:border-earth-800 shadow-sm">
                       <AlertCircle size={16} className="text-amber-500 shrink-0" />
                       Click a dataset to push it live to your broadcast feed.
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};