import React, { useState, useRef, useEffect } from 'react';
import { 
  Video, Mic, Share2, MessageSquare, Layout, Database, PlayCircle, 
  StopCircle, Eye, AlertCircle, Camera, RefreshCw, X, Maximize, 
  Settings, UserPlus, Info, Zap, Smartphone, Monitor, Radio, Mic2,
  Activity, Signal, BarChart3, Clock, Layers, Tv, Volume2, Sliders,
  User, CheckCircle2, AlertTriangle, MonitorPlay, ChevronDown,
  Users, Globe, ShieldCheck, Power, Terminal, Headphones, Move, Cast,
  ShieldAlert, SignalHigh, History, ArrowUpRight, ArrowDownLeft, TrendingUp,
  Cpu, ZapOff, Wifi, Map as MapIcon, HardDrive, Filter, MoreHorizontal,
  Droplet, TrendingDown, DollarSign, Sparkles, Binary, Gauge,
  MicOff, VideoOff, Menu, Loader2
} from 'lucide-react';

type Scene = 'SOLO' | 'INTERVIEW' | 'DATA_FOCUS' | 'GUEST_FULL';

export const LiveHost: React.FC = () => {
  const [isLive, setIsLive] = useState(false);
  const [isAutoDirector, setIsAutoDirector] = useState(false);
  const [streamTitle, setStreamTitle] = useState("Industrial Resilience Briefing Q2");
  const [viewerCount, setViewerCount] = useState(0);
  const [currentScene, setCurrentScene] = useState<Scene>('SOLO');
  const [activeOverlays, setActiveOverlays] = useState<string[]>(['M_Score', 'Price_Index']);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [audioActive, setAudioActive] = useState(true);
  const [masterVolume, setMasterVolume] = useState(82);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulated Broadcast Telemetry
  const [cpuUsage, setCpuUsage] = useState(28);
  const [bitrate, setBitrate] = useState(4850);
  const [serverLatency, setServerLatency] = useState(12);
  const [resilienceScore, setResilienceScore] = useState(8.54);
  const [systemLogs, setSystemLogs] = useState<string[]>([
    "STUDIO_OS_v4.2_BOOT: OK",
    "ENVIROSAGRO_CORE_LINK: SYNCED",
    "HARDWARE_CHECK: SENSORS_ONLINE",
    "AI_PRODUCER_INITIALIZED: STANDBY"
  ]);

  // Robust Stream Handling - Mounted to the DOM video ref
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(err => {
        console.warn("Autoplay was blocked by the browser. Interaction required.", err);
      });
    }
  }, [stream, cameraActive]);

  // AI Producer / Auto-Director Logic
  useEffect(() => {
    let directorInterval: any;
    if (isAutoDirector && isLive) {
      directorInterval = setInterval(() => {
        const scenes: Scene[] = ['SOLO', 'INTERVIEW', 'DATA_FOCUS', 'GUEST_FULL'];
        const nextScene = scenes[Math.floor(Math.random() * scenes.length)];
        setCurrentScene(nextScene);
        setSystemLogs(prev => [...prev, `AI_PRODUCER: Switched to ${nextScene} scene.`]);

        if (Math.random() > 0.7) {
          const overlays = ['Price_Index', 'Risk_Alert', 'M_Score'];
          const toggle = overlays[Math.floor(Math.random() * overlays.length)];
          setActiveOverlays(prev => prev.includes(toggle) ? prev.filter(o => o !== toggle) : [...prev, toggle]);
        }
      }, 8000);
    }
    return () => clearInterval(directorInterval);
  }, [isAutoDirector, isLive]);

  useEffect(() => {
    let interval: any;
    if (isLive) {
      interval = setInterval(() => {
        setViewerCount(prev => prev + Math.floor(Math.random() * 8));
        setCpuUsage(prev => Math.min(65, Math.max(20, prev + (Math.random() * 6 - 3))));
        setBitrate(prev => Math.min(6200, Math.max(4500, prev + (Math.random() * 300 - 150))));
        setResilienceScore(prev => parseFloat((prev + (Math.random() * 0.02 - 0.01)).toFixed(2)));
        
        const logs = [
          "PKT_SYNC: 0% LOSS",
          "M(T)_VAL: 8.54_NOMINAL",
          "REGION_SYNC: NAIROBI_LOCKED",
          "NODE_AGGREGATION: 92%_CAPACITY",
          "UPLINK_STABLE: 12.4_MBPS"
        ];
        setSystemLogs(prev => [...prev.slice(-8), logs[Math.floor(Math.random() * logs.length)]]);
      }, 3000);
    } else {
      setViewerCount(0);
      setCpuUsage(8);
      setBitrate(0);
    }
    return () => clearInterval(interval);
  }, [isLive]);

  const toggleCamera = async () => {
    if (cameraActive && stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setCameraActive(false);
      if (videoRef.current) videoRef.current.srcObject = null;
      setSystemLogs(prev => [...prev, "LOCAL_UPLINK: DISCONNECTED"]);
    } else {
      try {
        setSystemLogs(prev => [...prev, "INITIALIZING_CAPTURE_HANDSHAKE..."]);
        const s = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        setStream(s);
        setCameraActive(true);
        setSystemLogs(prev => [...prev, "LOCAL_UPLINK: SYNCED_ACTIVE"]);
      } catch (err) {
        console.error("Camera Error:", err);
        setSystemLogs(prev => [...prev, "ERROR: CAMERA_HANDSHAKE_FAILED"]);
        alert("Local uplink failed. Please grant camera/microphone permissions.");
      }
    }
  };

  const toggleLive = () => {
    if (!cameraActive && !isLive) {
      alert("Initialize Studio Feed before initiating Global Broadcast.");
      return;
    }
    setIsLive(!isLive);
    if (!isLive) {
      setSystemLogs(prev => [...prev, "GLOBAL_SYNC_ACTIVE", "BROADCAST_FEED: INITIALIZED"]);
    } else {
      setSystemLogs(prev => [...prev, "GLOBAL_SYNC_TERMINATED", "BROADCAST_FEED: OFFLINE"]);
      setIsAutoDirector(false);
    }
  };

  const toggleOverlay = (name: string) => {
    setActiveOverlays(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  return (
    <div className="max-w-[1700px] mx-auto h-[calc(100vh-140px)] flex flex-col p-6 gap-6 relative animate-in fade-in duration-1000">
      
      {/* Studio Header */}
      <div className="bg-slate-900 rounded-[3rem] p-6 flex flex-col md:flex-row justify-between items-center gap-6 border border-white/5 shadow-2xl relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-[0.02] pointer-events-none"></div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-blue-600 rounded-[1.8rem] flex items-center justify-center text-white shadow-glow-blue border border-white/10 group cursor-pointer">
             <Tv size={32} className="group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <h2 className="text-3xl font-serif font-black text-white tracking-tighter">Media Master <span className="text-blue-500 italic">Studio</span></h2>
            <div className="flex items-center gap-4 mt-1">
              <input 
                value={streamTitle}
                onChange={(e) => setStreamTitle(e.target.value)}
                className="bg-transparent border-none text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 focus:outline-none focus:text-blue-400 transition-colors w-96"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10">
           <div className="flex items-center gap-3 bg-black/40 px-6 py-3 rounded-2xl border border-white/5">
              <div className={`w-2.5 h-2.5 rounded-full ${isLive ? 'bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]' : 'bg-slate-600'}`}></div>
              <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isLive ? 'text-white' : 'text-slate-500'}`}>
                {isLive ? 'ON AIR' : 'STUDIO_IDLE'}
              </span>
           </div>
           <button 
             onClick={toggleLive}
             className={`px-10 py-4 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.4em] transition-all flex items-center gap-3 ${isLive ? 'bg-red-600 text-white shadow-glow-red hover:bg-red-500' : 'bg-blue-600 text-white shadow-glow-blue hover:bg-blue-500'}`}
           >
              {isLive ? <><StopCircle size={18} /> End Stream</> : <><PlayCircle size={18} /> Start Broadcast</>}
           </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        
        {/* Main Control & Preview */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          {/* Main Monitor */}
          <div className="flex-1 bg-black rounded-[4rem] border-[12px] border-slate-900 shadow-cinematic-xl relative overflow-hidden group">
              <div className="absolute inset-0 z-0">
                {cameraActive ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    muted 
                    playsInline 
                    className={`w-full h-full object-cover transition-all duration-700 ${currentScene === 'DATA_FOCUS' ? 'scale-75 translate-x-40 grayscale blur-[2px]' : ''}`}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-800 gap-6">
                    <Camera size={120} className="opacity-10 animate-float" />
                    <p className="text-[10px] font-black uppercase tracking-[0.8em] opacity-30">VIDEO_FEED_OFFLINE</p>
                  </div>
                )}
              </div>

              {/* Overlays */}
              <div className="absolute inset-0 pointer-events-none p-12 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                     {activeOverlays.includes('M_Score') && (
                       <div className="bg-agro-900/60 backdrop-blur-xl p-6 rounded-[2rem] border border-agro-500/30 text-white animate-in slide-in-from-left-4">
                          <p className="text-[9px] font-black uppercase tracking-widest text-agro-400 mb-1">Resilience m(t)</p>
                          <p className="text-3xl font-serif font-bold font-mono">{resilienceScore.toFixed(2)}</p>
                       </div>
                     )}
                     <div className="flex gap-4">
                        {isLive && (
                          <div className="bg-red-600 px-6 py-2 rounded-xl text-[10px] font-black text-white uppercase tracking-[0.4em] shadow-2xl flex items-center gap-3">
                             <Users size={14} /> {viewerCount.toLocaleString()}
                          </div>
                        )}
                        <div className="bg-black/60 backdrop-blur-md px-6 py-2 rounded-xl border border-white/10 text-white text-[10px] font-mono tracking-widest">
                           {new Date().toLocaleTimeString()}
                        </div>
                     </div>
                  </div>

                  <div className="flex justify-between items-end">
                     <div className="flex gap-4">
                        <div className="bg-black/60 backdrop-blur-xl p-5 rounded-2xl border border-white/10 text-white flex flex-col gap-1 items-center">
                           <Activity size={24} className="text-blue-500" />
                           <span className="text-[8px] font-black uppercase">Sync</span>
                        </div>
                        <div className="bg-black/60 backdrop-blur-xl p-5 rounded-2xl border border-white/10 text-white flex flex-col gap-1 items-center">
                           <SignalHigh size={24} className="text-agro-500" />
                           <span className="text-[8px] font-black uppercase">Uplink</span>
                        </div>
                     </div>
                     {activeOverlays.includes('Price_Index') && (
                        <div className="bg-black/60 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 text-white max-w-xs animate-in slide-in-from-right-4">
                           <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-blue-400">Market Indices</h4>
                           <div className="space-y-3">
                              <div className="flex justify-between text-xs font-bold uppercase"><span>Coffee</span> <span className="text-agro-400">+2.4%</span></div>
                              <div className="flex justify-between text-xs font-bold uppercase"><span>Tea</span> <span className="text-agro-400">+1.1%</span></div>
                              <div className="flex justify-between text-xs font-bold uppercase"><span>Grain</span> <span className="text-red-400">-0.5%</span></div>
                           </div>
                        </div>
                     )}
                  </div>
              </div>

              {/* Viewport Action Bar */}
              <div className="absolute inset-x-12 bottom-12 z-20 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-black/80 backdrop-blur-3xl p-4 rounded-[2.5rem] border border-white/10 flex items-center gap-6 shadow-3xl">
                      <button 
                        onClick={toggleCamera}
                        className="p-4 rounded-2xl transition-all bg-white/10 text-white hover:bg-white/20"
                      >
                         {cameraActive ? <Video size={24} className="text-agro-500" /> : <VideoOff size={24} />}
                      </button>
                      <button 
                        onClick={() => setAudioActive(!audioActive)}
                        className={`p-4 rounded-2xl transition-all ${audioActive ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-600 text-white shadow-glow-red'}`}
                      >
                         {audioActive ? <Mic size={24} /> : <MicOff size={24} />}
                      </button>
                      <div className="h-10 w-px bg-white/10"></div>
                      <button className="p-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all"><Maximize size={24}/></button>
                      <button className="p-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all"><Settings size={24}/></button>
                  </div>
              </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
              {[
                { label: "CPU Usage", value: `${cpuUsage.toFixed(1)}%`, icon: <Cpu />, color: cpuUsage > 60 ? 'text-red-500' : 'text-blue-500' },
                { label: "Stream Bitrate", value: `${bitrate} kbps`, icon: <Radio />, color: 'text-agro-500' },
                { label: "Server Latency", value: `${serverLatency}ms`, icon: <Zap />, color: 'text-amber-500' },
                { label: "Memory Usage", value: "4.2 GB", icon: <Layers />, color: 'text-purple-500' }
              ].map((stat, i) => (
                <div key={i} className="ea-card p-6 flex items-center gap-4 bg-white dark:bg-slate-900/40">
                   <div className={`p-3 bg-earth-50 dark:bg-black/40 rounded-xl shadow-inner border border-black/5 ${stat.color}`}>{stat.icon}</div>
                   <div>
                      <p className="text-[9px] font-black uppercase text-earth-400 tracking-widest">{stat.label}</p>
                      <p className="text-xl font-bold text-earth-900 dark:text-white leading-tight font-mono">{stat.value}</p>
                   </div>
                </div>
              ))}
          </div>
        </div>

        {/* Studio Sidebar: Director & Logs */}
        <aside className="w-full lg:w-[450px] flex flex-col gap-6 shrink-0">
           
           {/* Production Controls */}
           <div className="ea-card p-10 flex flex-col gap-10 bg-white dark:bg-slate-900/20 border border-white/5 shadow-cinematic backdrop-blur-3xl">
              <div>
                 <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.6em] mb-10 flex items-center gap-4">
                    <Sliders size={18} className="text-blue-500" /> Production Core
                 </h3>
                 
                 <div className="space-y-8">
                    {/* Scene Selection */}
                    <div>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Scene Selection</p>
                       <div className="grid grid-cols-2 gap-3">
                          {['SOLO', 'INTERVIEW', 'DATA_FOCUS', 'GUEST_FULL'].map(s => (
                            <button 
                                key={s} 
                                onClick={() => { setCurrentScene(s as Scene); setIsAutoDirector(false); }}
                                className={`p-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all border-2 ${currentScene === s ? 'bg-blue-600 border-blue-500 text-white shadow-glow-blue' : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10'}`}
                            >
                               {s.replace('_', ' ')}
                            </button>
                          ))}
                       </div>
                    </div>

                    {/* Auto Director Toggle */}
                    <div className={`p-6 rounded-[2.5rem] border-2 transition-all ${isAutoDirector ? 'bg-purple-900/20 border-purple-500 shadow-glow-blue' : 'bg-white/5 border-white/10'}`}>
                       <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-4">
                             <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isAutoDirector ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-800 text-slate-500'}`}>
                                <Zap size={20} className={isAutoDirector ? 'animate-pulse' : ''} />
                             </div>
                             <div>
                                <h4 className={`text-sm font-bold leading-none ${isAutoDirector ? 'text-white' : 'text-slate-500'}`}>AI Producer</h4>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1.5">Auto-Scene Switching</p>
                             </div>
                          </div>
                          <button 
                            onClick={() => setIsAutoDirector(!isAutoDirector)}
                            className={`w-14 h-8 rounded-full relative transition-all ${isAutoDirector ? 'bg-purple-600' : 'bg-slate-800'}`}
                          >
                             <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all shadow-xl ${isAutoDirector ? 'right-1' : 'left-1'}`}></div>
                          </button>
                       </div>
                    </div>

                    {/* Overlay Master */}
                    <div>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Overlays Master</p>
                       <div className="flex flex-wrap gap-3">
                          {['Price_Index', 'Risk_Alert', 'M_Score', 'Staff_Feed'].map(ov => (
                            <button 
                                key={ov} 
                                onClick={() => toggleOverlay(ov)}
                                className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${activeOverlays.includes(ov) ? 'bg-agro-600 border-agro-500 text-white shadow-glow-green' : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10'}`}
                            >
                               {ov.replace('_', ' ')}
                            </button>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              {/* Master Audio Control */}
              <div className="pt-10 border-t border-white/5">
                 <div className="flex justify-between items-end mb-6">
                    <div>
                       <h4 className="text-sm font-bold text-white mb-1">Master Gain</h4>
                       <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Global Link Volume</p>
                    </div>
                    <span className="font-mono text-xs font-black text-blue-500">{masterVolume}%</span>
                 </div>
                 <input 
                    type="range" min="0" max="100" 
                    value={masterVolume}
                    onChange={(e) => setMasterVolume(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500" 
                 />
              </div>
           </div>

           {/* System Console Logs */}
           <div className="ea-card p-10 flex-1 bg-slate-950/80 border border-white/5 shadow-inner overflow-hidden flex flex-col relative">
              <div className="absolute top-0 right-0 p-8 opacity-[0.02] text-blue-500 rotate-12 pointer-events-none"><Binary size={200} /></div>
              <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.6em] mb-10 flex items-center gap-4">
                 <Terminal size={18} className="text-blue-500" /> Console Logs
              </h3>
              <div className="flex-1 overflow-y-auto space-y-2 font-mono text-[10px] ea-scroll-area pr-4">
                 {systemLogs.map((log, i) => (
                    <div key={i} className="flex gap-4 animate-in slide-in-from-left-2 duration-300">
                       <span className="text-slate-700">[{new Date().toLocaleTimeString()}]</span>
                       <span className={log.includes('ERROR') ? 'text-red-500' : log.includes('SYNC') ? 'text-blue-400' : 'text-slate-400'}>
                         {log}
                       </span>
                    </div>
                 ))}
                 <div className="flex items-center gap-3 text-blue-500 pt-4 opacity-50">
                    <Loader2 size={12} className="animate-spin" />
                    <span className="animate-pulse uppercase tracking-[0.4em]">Listening_for_events...</span>
                 </div>
              </div>
           </div>
        </aside>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center px-12 py-4 opacity-40 text-[9px] font-black uppercase tracking-[0.6em] text-slate-500 shrink-0">
         <span className="flex items-center gap-5"><Globe size={16}/> Central Studio Node: LNK-422</span>
         <div className="flex gap-16">
            <span className="hover:text-blue-500 cursor-pointer transition-colors">Encrypted Multi-Link</span>
            <span className="hover:text-blue-500 cursor-pointer transition-colors">Broadcaster Sovereign Protection</span>
         </div>
      </div>
    </div>
  );
};