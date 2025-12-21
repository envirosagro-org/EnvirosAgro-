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
  Droplet
} from 'lucide-react';

type Scene = 'SOLO' | 'INTERVIEW' | 'DATA_FOCUS' | 'GUEST_FULL';

export const LiveHost: React.FC = () => {
  const [isLive, setIsLive] = useState(false);
  const [streamTitle, setStreamTitle] = useState("Industrial Resilience Briefing Q2");
  const [viewerCount, setViewerCount] = useState(0);
  const [currentScene, setCurrentScene] = useState<Scene>('SOLO');
  const [activeOverlays, setActiveOverlays] = useState<string[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [audioActive, setAudioActive] = useState(true);
  const [masterVolume, setMasterVolume] = useState(82);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulated Broadcast Telemetry
  const [cpuUsage, setCpuUsage] = useState(28);
  const [bitrate, setBitrate] = useState(4850);
  const [serverLatency, setServerLatency] = useState(12);
  const [systemLogs, setSystemLogs] = useState<string[]>([
    "STUDIO_OS_v4.2_BOOT: OK",
    "LINK_ESTABLISHED: EA-CORE-CENTRAL",
    "HARDWARE_CHECK: SENSORS_ONLINE"
  ]);

  useEffect(() => {
    let interval: any;
    if (isLive) {
      interval = setInterval(() => {
        setViewerCount(prev => prev + Math.floor(Math.random() * 5));
        setCpuUsage(prev => Math.min(65, Math.max(20, prev + (Math.random() * 6 - 3))));
        setBitrate(prev => Math.min(6200, Math.max(4500, prev + (Math.random() * 300 - 150))));
        setServerLatency(prev => Math.min(25, Math.max(8, prev + (Math.random() * 2 - 1))));
        
        const logs = [
          "PKT_SYNC: 0% LOSS",
          "M(T)_VAL: 8.54_NOMINAL",
          "REGION_SYNC: NAIROBI_LOCKED",
          "ENCRYPTION: AES_256_ACTIVE",
          "UPLINK_STABLE: 12.4_MBPS"
        ];
        setSystemLogs(prev => [...prev.slice(-6), logs[Math.floor(Math.random() * logs.length)]]);
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
    } else {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 1920, height: 1080, frameRate: 60 }, 
          audio: true 
        });
        setStream(s);
        setCameraActive(true);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (err) {
        console.error("Camera access failed:", err);
        alert("Studio Hardware Error: Uplink failed. Please verify capture device connectivity.");
      }
    }
  };

  const toggleLive = () => {
    if (!cameraActive && !isLive) {
      alert("Initialize Studio Feed (Primary Link) before initiating Global Broadcast.");
      return;
    }
    setIsLive(!isLive);
    if (!isLive) setSystemLogs(prev => [...prev, "GLOBAL_BROADCAST_INITIATED"]);
    else setSystemLogs(prev => [...prev, "BROADCAST_TERMINATED_CLEAN"]);
  };

  const toggleOverlay = (name: string) => {
    setActiveOverlays(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  return (
    <div className="max-w-[1900px] mx-auto px-6 py-10 bg-[#020617] min-h-screen text-slate-300 font-sans selection:bg-blue-500/30 overflow-hidden">
      
      {/* Studio Top Control Bar */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-8">
        <div className="flex items-center gap-10">
          <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center transition-all duration-700 shadow-2xl border-4 ${isLive ? 'bg-red-600 border-red-400 shadow-red-600/30 rotate-12 scale-110' : 'bg-slate-900 border-white/5 rotate-0'}`}>
            <Radio size={42} className={`text-white ${isLive ? 'animate-pulse' : 'opacity-40'}`} />
          </div>
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-4xl md:text-5xl font-serif font-black text-white tracking-tighter">Media Master <span className="text-blue-500 italic">Studio</span></h1>
              <span className="bg-blue-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-blue-600/20">Production Elite v4.2</span>
            </div>
            <div className="flex items-center gap-8 mt-4">
              <div className="flex items-center gap-2.5">
                <div className={`w-3 h-3 rounded-full ${cameraActive ? 'bg-green-500 shadow-[0_0_15px_#22c55e]' : 'bg-slate-800'}`}></div>
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">Local Uplink</span>
              </div>
              <div className="h-4 w-px bg-white/10"></div>
              <div className="flex items-center gap-2.5">
                <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-500 shadow-[0_0_15px_#ef4444] animate-pulse' : 'bg-slate-800'}`}></div>
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">Global Sync</span>
              </div>
              <div className="h-4 w-px bg-white/10"></div>
              <span className="text-[11px] font-mono text-blue-500/60 font-black tracking-widest">ID: EA-BROADCAST-NODE-XRAY</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-black/60 p-3 rounded-[2.5rem] border border-white/10 backdrop-blur-3xl shadow-inner">
           {[
             { label: 'Latency', val: `${serverLatency}ms`, color: 'text-blue-400', icon: <Wifi size={14} /> },
             { label: 'Bitrate', val: isLive ? `${(bitrate/1000).toFixed(1)}M` : '0.0', color: 'text-agro-400', icon: <Activity size={14}/> },
             { label: 'CPU', val: `${cpuUsage}%`, color: cpuUsage > 50 ? 'text-amber-500' : 'text-white', icon: <Cpu size={14} /> }
           ].map(stat => (
             <div key={stat.label} className="flex items-center gap-4 px-8 border-r border-white/5 last:border-0 h-10">
               <div className="text-slate-600">{stat.icon}</div>
               <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
                  <span className={`text-sm font-black font-mono leading-none ${stat.color}`}>{stat.val}</span>
               </div>
             </div>
           ))}
           <button className="p-4 bg-white/5 hover:bg-blue-600 hover:text-white rounded-[1.8rem] transition-all text-slate-500 shadow-xl">
              <Settings size={22} />
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 flex-1 min-h-[75vh]">
        
        {/* Left Column: Vision & Graphics Mixers */}
        <div className="lg:col-span-2 flex flex-col gap-6">
           <div className="bg-slate-900/60 p-8 rounded-[3.5rem] border border-white/5 shadow-2xl backdrop-blur-xl flex-1">
              <h3 className="text-[11px] font-black text-slate-600 uppercase tracking-[0.5em] mb-10 px-2 flex items-center gap-3">
                 <Layout size={16} className="text-blue-500" /> Vision Mixer
              </h3>
              <div className="space-y-4">
                 {[
                   { id: 'SOLO', label: 'Primary Host', icon: <User size={20} />, res: '1080p60' },
                   { id: 'INTERVIEW', label: 'Remote Guest', icon: <Users size={20} />, res: '720p30' },
                   { id: 'DATA_FOCUS', label: 'M(t) Metrics', icon: <BarChart3 size={20} />, res: 'Data-HD' },
                   { id: 'GUEST_FULL', label: 'Summit Link', icon: <Cast size={20} />, res: 'Uplink' }
                 ].map(scene => (
                   <button 
                     key={scene.id}
                     onClick={() => setCurrentScene(scene.id as Scene)}
                     className={`group relative w-full p-5 rounded-2xl text-left transition-all border-2 overflow-hidden flex items-center gap-5 ${currentScene === scene.id ? 'bg-blue-600/10 border-blue-500 text-white shadow-[0_0_25px_rgba(59,130,246,0.3)]' : 'bg-black/20 border-white/5 text-slate-500 hover:bg-white/5 hover:border-white/10'}`}
                   >
                      <div className={`p-3 rounded-xl transition-all duration-500 ${currentScene === scene.id ? 'bg-blue-600 text-white scale-110' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700'}`}>
                        {scene.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-[11px] font-black uppercase tracking-wider">{scene.label}</p>
                        <p className="text-[9px] font-mono text-slate-500 mt-0.5">{scene.res}</p>
                      </div>
                      {currentScene === scene.id && <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-blue-500 animate-pulse"></div>}
                   </button>
                 ))}
              </div>

              <div className="mt-12 pt-10 border-t border-white/5">
                <h3 className="text-[11px] font-black text-slate-600 uppercase tracking-[0.5em] mb-8 px-2 flex items-center gap-3">
                   <MonitorPlay size={16} className="text-agro-500" /> Overlays
                </h3>
                <div className="grid grid-cols-1 gap-3">
                   {[
                      { id: 'Price_Index', label: 'Market Ticker', color: 'agro' },
                      { id: 'Risk_Alert', label: 'HA Alert-Bar', color: 'red' },
                      { id: 'M_Score', label: 'Resilience HUD', color: 'blue' }
                   ].map(ov => (
                     <button 
                       key={ov.id}
                       onClick={() => toggleOverlay(ov.id)}
                       className={`w-full p-4 rounded-xl text-left transition-all border-2 flex items-center justify-between group ${activeOverlays.includes(ov.id) ? 'bg-agro-600/10 border-agro-500 text-white shadow-xl' : 'bg-black/20 border-white/5 text-slate-500 hover:bg-white/5'}`}
                     >
                        <span className="text-[10px] font-black uppercase tracking-widest">{ov.label}</span>
                        {activeOverlays.includes(ov.id) ? <CheckCircle2 size={14} className="text-agro-500" /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>}
                     </button>
                   ))}
                </div>
              </div>
           </div>
        </div>

        {/* Center Column: Program Output & Broadcast Engine */}
        <div className="lg:col-span-7 flex flex-col gap-8">
           
           {/* Primary Program Monitor */}
           <div className="bg-black rounded-[4.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] relative flex-1 border-[12px] border-slate-900 group ring-1 ring-white/10">
              
              {/* HUD: Program Status */}
              <div className="absolute top-12 left-12 z-40 flex gap-5 pointer-events-none">
                 <div className={`px-8 py-3 rounded-2xl text-[12px] font-black uppercase tracking-[0.4em] flex items-center gap-5 border shadow-3xl backdrop-blur-2xl ${isLive ? 'bg-red-600 text-white border-red-400 animate-pulse' : 'bg-slate-800/90 text-slate-400 border-white/10'}`}>
                    {isLive ? 'TRANSMITTING' : 'PRE-FLIGHT'}
                    <div className={`w-2.5 h-2.5 rounded-full ${isLive ? 'bg-white shadow-[0_0_10px_white]' : 'bg-slate-600'}`}></div>
                 </div>
                 {isLive && (
                    <div className="bg-black/60 text-white px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-5 border border-white/10 backdrop-blur-2xl shadow-3xl">
                        <Users size={20} className="text-blue-500" /> {viewerCount.toLocaleString()} SYNCED
                    </div>
                 )}
              </div>

              {/* HUD: Timecode & Locators */}
              <div className="absolute top-12 right-12 z-40">
                  <div className="bg-black/40 backdrop-blur-xl px-8 py-3 rounded-2xl border border-white/10 font-mono text-2xl font-black tracking-[0.2em] text-white/90 shadow-3xl">
                    {isLive ? '00:15:42:08' : '00:00:00:00'}
                  </div>
              </div>

              {/* Program Output Rendering */}
              <div className="w-full h-full bg-[#050505] flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
                 
                 {cameraActive ? (
                    <div className={`w-full h-full relative transition-all duration-[1.5s] cubic-bezier(0.16, 1, 0.3, 1) ${currentScene === 'DATA_FOCUS' ? 'scale-75 translate-x-[-15%]' : currentScene === 'INTERVIEW' ? 'scale-75 translate-x-[-22%]' : ''}`}>
                      <video 
                          ref={videoRef}
                          autoPlay 
                          playsInline 
                          muted={true}
                          className={`w-full h-full object-cover transition-all duration-[3s] ${isLive ? 'opacity-100 contrast-125 saturate-110' : 'opacity-40 grayscale blur-[3px]'}`} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                 ) : (
                    <div className="text-center animate-pulse">
                        <div className="w-40 h-40 bg-white/5 rounded-[4rem] flex items-center justify-center mx-auto mb-12 border border-white/10 shadow-3xl">
                          <Tv size={72} className="text-slate-800" />
                        </div>
                        <p className="font-mono text-sm uppercase tracking-[0.8em] text-slate-700 font-black">UPLINK_STANDBY_MODE</p>
                    </div>
                 )}

                 {/* Advanced Composite: Remote Guest */}
                 {currentScene === 'INTERVIEW' && (
                    <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[38%] aspect-square bg-slate-900 rounded-[4rem] border-8 border-white/10 shadow-3xl overflow-hidden animate-in slide-in-from-right-40 duration-1000 z-20 ring-1 ring-blue-500/40">
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600" className="w-full h-full object-cover opacity-70" alt="Remote Guest" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                        <div className="absolute bottom-8 left-10">
                            <p className="text-[12px] font-black text-blue-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                <Radio size={14} className="animate-pulse" /> SAT-LINK_08
                            </p>
                            <h4 className="text-white font-black text-2xl tracking-tight">Dr. Elena Rossi</h4>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Environmental Lead</p>
                        </div>
                    </div>
                 )}

                 {/* Advanced Composite: Live Telemetry */}
                 {currentScene === 'DATA_FOCUS' && (
                    <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[45%] h-[78%] bg-slate-900/95 backdrop-blur-3xl rounded-[4rem] border border-white/10 p-12 shadow-3xl animate-in zoom-in duration-700 z-30 overflow-hidden ring-1 ring-agro-500/30">
                       <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-agro-500"><TrendingUp size={350} /></div>
                       <div className="flex justify-between items-center mb-12 relative z-10">
                          <div className="flex items-center gap-5">
                             <div className="p-4 bg-agro-500/20 rounded-2xl text-agro-400 shadow-2xl border border-agro-500/20"><Activity size={32} /></div>
                             <div>
                                <h4 className="font-black text-white text-lg uppercase tracking-widest leading-none">Cluster Delta</h4>
                                <p className="text-[10px] text-agro-500 font-black mt-2 tracking-widest">NODE_VERIFIED: EA-774</p>
                             </div>
                          </div>
                          <div className="bg-black/60 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
                             <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"></div>
                             <span className="text-[10px] font-mono text-white/80">REALTIME_SYNC</span>
                          </div>
                       </div>
                       <div className="space-y-8 relative z-10">
                          {[
                            { label: 'Network Resilience m(t)', val: '8.54', color: 'text-agro-400', trend: '+2.4%', icon: <Zap size={16} /> },
                            { label: 'Soil Integrity index In(val)', val: '4.82', color: 'text-blue-400', trend: 'Stable', icon: <Droplet size={16} /> },
                            { label: 'Cumulative Maturity C(a)', val: '24.8M', color: 'text-amber-400', trend: 'Growing', icon: <Layers size={16} /> }
                          ].map(stat => (
                            <div key={stat.label} className="bg-black/40 p-7 rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition-all group shadow-inner">
                               <div className="flex justify-between items-center mb-3">
                                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-3">
                                    {stat.icon} {stat.label}
                                  </p>
                                  <span className={`text-[10px] font-black ${stat.color} opacity-60`}>{stat.trend}</span>
                               </div>
                               <p className={`text-4xl font-black font-mono tracking-tighter ${stat.color}`}>{stat.val}</p>
                            </div>
                          ))}
                       </div>
                    </div>
                 )}

                 {/* Graphics Layer: Lower Thirds */}
                 {activeOverlays.map((ov, i) => (
                    <div key={i} className="absolute bottom-16 left-16 z-50 bg-black/90 backdrop-blur-3xl border-l-[6px] border-blue-600 p-10 rounded-r-[3rem] animate-in slide-in-from-left-40 duration-700 shadow-3xl max-w-lg ring-1 ring-white/5">
                       <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4 block">ACTIVE_PAYLOAD_TRANSMISSION</span>
                       <h4 className="text-white font-serif font-black text-4xl leading-none tracking-tight">{ov.replace('_', ' ')}</h4>
                       <div className="flex items-center gap-5 mt-6 border-t border-white/5 pt-6">
                          <Activity size={20} className="text-blue-500 animate-pulse" />
                          <div className="flex flex-col">
                             <span className="text-[10px] font-mono text-slate-400 font-black uppercase tracking-widest">SYNC_ID: EA-GRAPHIC-{i}-HASHED</span>
                             <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter mt-1">Verified via m(t) Blockchain</span>
                          </div>
                       </div>
                    </div>
                 ))}

                 {/* Network Bug */}
                 <div className="absolute bottom-12 right-12 z-50 group pointer-events-auto">
                    <div className="flex items-center gap-4 bg-black/60 backdrop-blur-xl px-6 py-3 rounded-[1.5rem] border border-white/10 shadow-2xl transition-all hover:scale-105 hover:bg-black/80 group">
                        <Globe size={24} className="text-blue-500 group-hover:rotate-45 transition-transform duration-1000" />
                        <span className="text-[11px] font-black text-white uppercase tracking-[0.3em]">EnvirosAgro <span className="text-blue-500">Live</span></span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Master Production Control Deck */}
           <div className="bg-slate-900/90 backdrop-blur-3xl p-12 rounded-[4.5rem] border border-white/10 shadow-[0_-30px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                 
                 {/* Hardware Control Rack */}
                 <div className="flex items-center gap-10 pr-12 border-r border-white/5">
                    <div className="flex flex-col items-center gap-8">
                       <button 
                         onClick={() => setAudioActive(!audioActive)}
                         className={`w-24 h-24 rounded-[2rem] transition-all shadow-3xl flex items-center justify-center border-4 ${audioActive ? 'bg-slate-800 border-agro-500/40 text-agro-400' : 'bg-red-600 border-red-400 text-white animate-pulse'}`}
                       >
                          {audioActive ? <Mic size={40} /> : <ZapOff size={40} />}
                       </button>
                       <div className="flex flex-col items-center">
                          <div className="h-32 w-2.5 bg-slate-800 rounded-full relative overflow-hidden cursor-pointer border border-white/5 shadow-inner">
                             <div 
                               className="absolute bottom-0 w-full bg-gradient-to-t from-agro-600 to-agro-400 transition-all duration-300 shadow-[0_0_20px_#22c55e]" 
                               style={{ height: `${masterVolume}%` }}
                             ></div>
                          </div>
                          <span className="text-[10px] font-black text-slate-500 mt-4 uppercase tracking-[0.2em]">AUDIO_GAIN</span>
                       </div>
                    </div>

                    <div className="flex flex-col items-center gap-8">
                       <button 
                         onClick={toggleCamera}
                         className={`w-24 h-24 rounded-[2rem] transition-all shadow-3xl flex items-center justify-center border-4 ${cameraActive ? 'bg-slate-800 border-blue-500/40 text-blue-400' : 'bg-slate-900 border-white/5 text-slate-800'}`}
                       >
                          <Video size={40} />
                       </button>
                       <div className="flex flex-col items-center">
                          <div className="h-32 w-2.5 bg-slate-800 rounded-full relative overflow-hidden border border-white/5 shadow-inner">
                             <div className={`absolute top-0 w-full bg-blue-500/30 transition-all duration-1000 ${cameraActive ? 'h-full animate-pulse' : 'h-0'}`}></div>
                          </div>
                          <span className="text-[10px] font-black text-slate-500 mt-4 uppercase tracking-[0.2em]">VIDEO_FEED</span>
                       </div>
                    </div>
                 </div>

                 {/* Broadcast Config Area */}
                 <div className="flex-1 w-full max-w-2xl px-4">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.6em] block mb-6">Broadcast Identity & Payload Metadata</span>
                    <input 
                      type="text" 
                      value={streamTitle}
                      onChange={(e) => setStreamTitle(e.target.value)}
                      className="w-full bg-transparent font-serif font-black text-5xl text-white border-b-4 border-transparent focus:border-blue-600 focus:outline-none transition-all tracking-tight pb-6 placeholder-slate-700"
                    />
                    <div className="flex flex-wrap items-center gap-10 mt-10">
                       <div className="flex items-center gap-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                          <Globe size={18} className="text-blue-500" /> Source: Central Hub Nairobi
                       </div>
                       <div className="flex items-center gap-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                          <ShieldCheck size={18} className="text-agro-500" /> Integrity: Grade AAA
                       </div>
                    </div>
                 </div>

                 {/* Master Executive Switch */}
                 <div className="flex flex-col gap-6 items-center shrink-0">
                    <button 
                      onClick={toggleLive}
                      className={`px-16 py-10 rounded-[3rem] font-black flex items-center gap-6 transition-all shadow-[0_30px_70px_rgba(0,0,0,0.6)] text-base uppercase tracking-[0.4em] relative overflow-hidden group border-4 active:scale-95 ${isLive ? 'bg-red-600 border-red-400 text-white' : 'bg-blue-600 border-blue-400 text-white hover:bg-blue-700'}`}
                    >
                       <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
                       {isLive ? <><StopCircle size={32} fill="currentColor" className="animate-pulse" /> CUT BROADCAST</> : <><PlayCircle size={32} fill="currentColor" /> START GLOBAL FEED</>}
                    </button>
                    <div className="flex gap-5">
                        <button className="p-5 bg-white/5 hover:bg-blue-600 hover:text-white rounded-[1.8rem] transition-all border border-white/5 shadow-2xl group"><Share2 size={24} className="group-hover:scale-110 transition-transform"/></button>
                        <button className="p-5 bg-white/5 hover:bg-blue-600 hover:text-white rounded-[1.8rem] transition-all border border-white/5 shadow-2xl group"><UserPlus size={24} className="group-hover:scale-110 transition-transform"/></button>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Column: Engineering & Node Analytics */}
        <div className="lg:col-span-3 space-y-8 flex flex-col min-h-0">
           
           {/* System Integrity Panel */}
           <div className="bg-slate-900 rounded-[4rem] border border-white/10 shadow-3xl overflow-hidden flex flex-col h-[52%] ring-1 ring-white/5">
              <div className="p-10 border-b border-white/5 bg-black/40 flex justify-between items-center">
                 <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-500 shadow-inner ring-1 ring-blue-500/30">
                        <Terminal size={24} />
                    </div>
                    <h3 className="font-black text-white uppercase tracking-[0.2em] text-xs">System Terminal</h3>
                 </div>
                 <div className="bg-agro-500/10 px-4 py-2 rounded-xl border border-agro-500/20 flex items-center gap-2">
                    <SignalHigh size={14} className="text-agro-400" />
                    <span className="text-[10px] font-black text-agro-400 uppercase tracking-widest">SYNC_OK</span>
                 </div>
              </div>
              
              <div className="flex-1 p-10 space-y-10 overflow-y-auto custom-scrollbar bg-black/20">
                 <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 tracking-widest">
                       <span>Buffer Saturation</span>
                       <span className="text-blue-400">NOMINAL</span>
                    </div>
                    <div className="h-2.5 w-full bg-black/60 rounded-full overflow-hidden shadow-inner ring-1 ring-white/5">
                       <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 w-[92%] shadow-[0_0_20px_rgba(37,99,235,0.5)]"></div>
                    </div>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="bg-black/40 p-8 rounded-[2.5rem] border border-white/5 shadow-inner">
                       <div className="flex items-center gap-4 mb-6">
                          <Users size={20} className="text-blue-500" />
                          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Stakeholder Clusters</span>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          {['East-Hub', 'West-Delta', 'South-Rift', 'City-Portal'].map(loc => (
                             <div key={loc} className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all cursor-default group">
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse group-hover:scale-150 transition-transform"></div>
                                <span className="text-[11px] font-black text-white/80 uppercase truncate">{loc}</span>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="p-8 bg-slate-950/80 rounded-[2.5rem] font-mono text-[10px] text-green-500 space-y-2 border border-white/5 shadow-2xl h-44 overflow-hidden relative">
                       <div className="absolute top-0 right-0 p-4 opacity-5"><Activity size={64} /></div>
                       {systemLogs.map((log, i) => (
                          <div key={i} className="flex items-center gap-3 animate-in slide-in-from-left-4">
                             <span className="opacity-40">{">"}</span>
                             <span className="tracking-widest uppercase">{log}</span>
                          </div>
                       ))}
                       <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Production Management Panel */}
           <div className="bg-slate-900 rounded-[4rem] border border-white/10 shadow-3xl overflow-hidden flex flex-col flex-1 ring-1 ring-white/5">
              <div className="p-10 border-b border-white/5 bg-black/40 flex justify-between items-center">
                 <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-amber-600/20 rounded-2xl flex items-center justify-center text-amber-500 shadow-inner ring-1 ring-amber-500/30">
                        <MonitorPlay size={24} />
                    </div>
                    <h3 className="font-black text-white uppercase tracking-[0.2em] text-xs">Production Deck</h3>
                 </div>
                 <button className="text-slate-500 hover:text-white transition-all"><MoreHorizontal size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                 <div className="grid grid-cols-2 gap-5">
                    {[
                       { icon: <MessageSquare size={24}/>, label: 'Q&A Inbox', color: 'blue' },
                       { icon: <Smartphone size={24}/>, label: 'Remote Cam', color: 'agro' },
                       { icon: <Sliders size={24}/>, label: 'Stream FX', color: 'purple' },
                       { icon: <HardDrive size={24}/>, label: 'Auto-Archive', color: 'amber' }
                    ].map((tool, i) => (
                       <button key={i} className="bg-white/5 hover:bg-white/10 p-8 rounded-[2.5rem] border border-white/5 flex flex-col items-center gap-5 transition-all group active:scale-95 shadow-2xl hover:-translate-y-1">
                          <div className={`text-slate-600 transition-colors duration-500 group-hover:scale-110 group-hover:text-${tool.color}-500`}>
                             {tool.icon}
                          </div>
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-300">{tool.label}</span>
                       </button>
                    ))}
                 </div>

                 <div className="p-8 bg-blue-600/10 border-2 border-blue-500/20 rounded-[2.5rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-45 transition-transform duration-1000"><ShieldCheck size={80} /></div>
                    <div className="flex items-center gap-4 mb-4 text-blue-400 relative z-10">
                       <ShieldAlert size={22} className="animate-pulse" />
                       <span className="text-[12px] font-black uppercase tracking-widest leading-none">Security Verified</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium relative z-10">
                       All transmission packets hashed via m(t) ledger. End-to-end biological integrity confirmed.
                    </p>
                 </div>
              </div>
              <div className="p-8 bg-black/60 border-t border-white/5">
                 <button className="w-full bg-slate-800 hover:bg-red-600 hover:text-white py-5 rounded-[1.8rem] font-black text-[11px] text-slate-500 uppercase tracking-[0.4em] transition-all shadow-2xl active:scale-95 border border-white/5">
                    REBOOT STUDIO_OS
                 </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
