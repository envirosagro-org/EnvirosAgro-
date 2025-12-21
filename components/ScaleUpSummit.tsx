
import React, { useState, useRef, useEffect } from 'react';
import { 
  Calendar, Users, Video, Mic, MessageSquare, Star, ArrowRight, X, 
  Download, Globe, ChevronRight, Volume2, Settings, Maximize, Send, 
  Activity, Zap, ShieldCheck, Clock, Bot, User, Loader2, Sparkles,
  Award, TrendingUp, Radio, MonitorPlay, Heart, Layout, BarChart3,
  MapPin, ShieldAlert, Cpu, Box,
  // Added missing icons for sponsors and footer branding
  Coins, Leaf, Monitor
} from 'lucide-react';
import { createAgroChat, sendMessageStream } from '../services/gemini';
import { ChatMessage, View } from '../types';
import { GenerateContentResponse } from "@google/genai";

export const ScaleUpSummit: React.FC = () => {
  const [showExpo, setShowExpo] = useState(false);
  const [showLiveStream, setShowLiveStream] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState<string | null>('AgriBank');
  
  // Rep Chat States
  const [showRepChat, setShowRepChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isRepTyping, setIsRepTyping] = useState(false);
  const chatInstance = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isRepTyping]);

  const handleStartChat = () => {
    const repName = selectedSponsor === 'AgriBank' ? 'Marcus' : 
                    selectedSponsor === 'EcoFert' ? 'Sarah' : 
                    selectedSponsor === 'LogiTech' ? 'Kevin' : 'Amani';
    
    setChatMessages([
      {
        role: 'model',
        text: `Hello! I'm ${repName}, your dedicated representative from ${selectedSponsor}. Welcome to our virtual booth at the ScaleUp Summit. How can I help you optimize your industrial operations today?`,
        timestamp: new Date()
      }
    ]);
    setShowRepChat(true);
    
    // Initialize AI with brand-specific context
    const ai = createAgroChat();
    chatInstance.current = ai;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isRepTyping) return;

    const userText = chatInput;
    setChatInput('');
    const userMsg: ChatMessage = { role: 'user', text: userText, timestamp: new Date() };
    setChatMessages(prev => [...prev, userMsg]);
    setIsRepTyping(true);

    try {
      if (!chatInstance.current) chatInstance.current = createAgroChat();
      
      const prompt = `[CONTEXT: You are acting as a corporate representative for ${selectedSponsor} at the ScaleUp Summit. Stay professional and focused on ${selectedSponsor}'s industrial ag solutions.] ${userText}`;
      
      const stream = await sendMessageStream(chatInstance.current, prompt);
      let fullResponse = '';
      
      setChatMessages(prev => [...prev, { role: 'model', text: '', timestamp: new Date() }]);

      for await (const chunk of stream) {
        const response = chunk as GenerateContentResponse;
        const text = response.text;
        if (text) {
          fullResponse += text;
          setChatMessages(prev => {
            const next = [...prev];
            next[next.length - 1] = { ...next[next.length - 1], text: fullResponse };
            return next;
          });
        }
      }
    } catch (err) {
      console.error("Rep Chat Error:", err);
    } finally {
      setIsRepTyping(false);
    }
  };

  if (showLiveStream) {
    return (
      <div className="fixed inset-0 z-[120] bg-slate-950 flex flex-col animate-in fade-in duration-500 overflow-hidden">
        {/* Summit Header Overlay - Refined Spacing */}
        <div className="flex justify-between items-center bg-black/60 backdrop-blur-xl p-6 pt-24 lg:pt-20 border-b border-white/5 relative z-20 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 animate-pulse shadow-[0_0_25px_rgba(220,38,38,0.5)]">
              <span className="w-2 h-2 bg-white rounded-full"></span> LIVE BROADCAST
            </div>
            <div className="h-10 w-px bg-white/10 hidden md:block"></div>
            <div>
              <h3 className="text-white font-serif font-bold text-xl md:text-2xl leading-none mb-1 tracking-tight">The Future of Food Security</h3>
              <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">Main Stage • ScaleUp Summit 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
               <span className="text-[10px] text-white/60 font-black uppercase">Studio Linked</span>
            </div>
            <div className="bg-blue-600/20 px-5 py-2.5 rounded-2xl text-blue-400 text-[10px] font-black flex items-center gap-3 border border-blue-500/20 shadow-inner">
              <Users size={16} /> 2.4K WATCHING
            </div>
            <button 
              onClick={() => setShowLiveStream(false)}
              className="p-3 bg-white/5 hover:bg-red-600/20 text-white hover:text-red-400 rounded-2xl transition-all border border-white/10 group"
              title="Leave Stream"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row min-h-0">
          {/* Main Cinematic Video Player */}
          <div className="flex-1 bg-black relative overflow-hidden group">
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
            <img 
              src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=1600&auto=format&fit=crop&q=80" 
              className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[10s]"
              alt="Live Conference"
            />
            
            {/* HUD Overlays */}
            <div className="absolute inset-0 p-10 flex flex-col justify-between pointer-events-none z-20">
              <div className="flex justify-end">
                <div className="bg-black/60 backdrop-blur-xl p-5 rounded-[2.5rem] border border-white/10 text-white flex flex-col items-center gap-3 animate-in slide-in-from-right-10 shadow-3xl">
                  <div className="w-12 h-12 bg-blue-600/30 rounded-[1.2rem] flex items-center justify-center text-blue-400 shadow-inner ring-1 ring-blue-500/30">
                    <Activity size={24} className="animate-pulse" />
                  </div>
                  <div className="text-center">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-blue-300 block">Integrity</span>
                    <span className="text-[10px] font-mono text-white font-black">99.8%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-between pointer-events-auto">
                <div className="bg-black/80 backdrop-blur-3xl p-6 rounded-[3rem] border border-white/10 w-full max-w-2xl flex items-center gap-10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)]">
                  <div className="flex items-center gap-6 border-r border-white/10 pr-10">
                    <button className="text-white hover:text-blue-400 transition-all hover:scale-110 active:scale-95"><Volume2 size={28} /></button>
                    <button className="text-white hover:text-blue-400 transition-all hover:scale-110 active:scale-95"><Settings size={22} /></button>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-3">
                       <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.3em]">Network Feed Uplink</span>
                       <span className="text-[10px] font-mono text-white/40 font-black">4K UHD / 60 FPS</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 w-[88%] shadow-[0_0_20px_rgba(37,99,235,0.6)]"></div>
                    </div>
                  </div>
                  <button className="text-white hover:text-blue-400 transition-all hover:scale-110 active:scale-95"><Maximize size={28} /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Summit Social & Chat Panel - Refined production look */}
          <div className="w-full lg:w-[400px] bg-slate-950 border-l border-white/5 flex flex-col shadow-2xl relative pt-12 lg:pt-0">
            <div className="p-8 pt-12 lg:pt-8 border-b border-white/10 bg-slate-900/50 backdrop-blur-md flex justify-between items-center shrink-0">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-600/20">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="font-black text-xs text-white uppercase tracking-[0.2em]">Delegate Feed</h4>
                  <p className="text-[9px] text-blue-400 font-bold uppercase tracking-widest mt-0.5">Real-Time Sync</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                 <div className="w-1.5 h-1.5 bg-agro-500 rounded-full animate-pulse"></div>
                 <span className="text-[8px] font-black text-white/60 uppercase">Encrypted</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-gradient-to-b from-slate-950 to-slate-900">
              {[
                { user: "Mark V.", role: "Global Director", msg: "The m(t) formula in slide 14 perfectly quantifies our Q4 yield gap.", time: "10:42", avatar: "M" },
                { user: "Elena Rossi", role: "Scientific Lead", msg: "Agreed. The Social Integrity variable is the primary constraint here.", time: "10:44", avatar: "E" },
                { user: "Summit AI", msg: "Automatic translation enabled for localized dialects.", time: "System", isSys: true },
                { user: "Kevin Chen", role: "Investor Hub", msg: "Will the raw dataset for the Wankan Village case study be released?", time: "10:45", avatar: "K" }
              ].map((chat, i) => (
                <div key={i} className={`flex flex-col ${chat.isSys ? 'items-center' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`} style={{animationDelay: `${i*100}ms`}}>
                  {chat.isSys ? (
                    <div className="bg-white/5 px-5 py-2 rounded-full border border-white/5 flex items-center gap-3">
                       <Bot size={14} className="text-blue-500" />
                       <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{chat.msg}</p>
                    </div>
                  ) : (
                    <div className="flex gap-4 w-full group">
                      <div className="w-10 h-10 rounded-[1.2rem] bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 font-black shadow-lg shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                         {chat.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1.5">
                          <span className="text-[11px] font-black text-blue-400 uppercase tracking-widest truncate mr-4">{chat.user}</span>
                          <span className="text-[9px] font-bold text-slate-600 uppercase whitespace-nowrap">{chat.time}</span>
                        </div>
                        <p className="text-[13px] text-slate-300 leading-relaxed bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 group-hover:bg-white/10 transition-colors shadow-sm">
                          {chat.msg}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-8 border-t border-white/10 bg-slate-950 shrink-0">
              <form onSubmit={(e) => e.preventDefault()} className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500">
                  <Activity size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Contribute to the summit dialogue..." 
                  className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] pl-14 pr-16 py-5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all shadow-inner"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-600/30 active:scale-90 transition-all hover:bg-blue-500">
                  <Send size={20} />
                </button>
              </form>
              <p className="text-[9px] text-slate-600 mt-4 text-center uppercase tracking-[0.3em] font-black">Global Delegate Uplink Active</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showExpo) {
      return (
          <div className="max-w-7xl mx-auto px-8 pt-32 pb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <button 
                onClick={() => setShowExpo(false)} 
                className="mb-10 flex items-center gap-3 text-earth-400 hover:text-blue-600 font-black text-[11px] uppercase tracking-[0.3em] transition-all group"
              >
                  <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={20} /> Back to Lobby
              </button>
              
              <div className="bg-slate-900 text-white rounded-[4rem] p-10 lg:p-20 min-h-[75vh] relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5">
                  {/* Background Textures */}
                  <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-blue-600/10 to-transparent blur-[150px] rounded-full pointer-events-none"></div>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-[0.03] pointer-events-none"></div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
                     <div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-4 flex items-center gap-6">
                            <Star className="text-amber-400" fill="currentColor" size={48} /> 
                            Industrial Expo Hall
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl font-medium leading-relaxed">Connect directly with the pioneering organizations scaling Sustainable Integrated Development.</p>
                     </div>
                     <div className="bg-white/5 backdrop-blur-xl px-8 py-4 rounded-[2rem] border border-white/10 flex flex-col items-end gap-1 shadow-2xl">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Live Exhibitors</span>
                        <span className="text-2xl font-black font-mono text-blue-400">12 / 12 ACTIVE</span>
                     </div>
                  </div>
                  
                  <div className="grid lg:grid-cols-12 gap-12 relative z-10">
                      {/* Sponsor List - Vertical Navigation */}
                      <div className="lg:col-span-4 space-y-4">
                          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-6 px-4">Elite Partners</h3>
                          {[
                            { name: 'AgriBank', sub: 'Global Finance', icon: <Coins className="text-amber-400"/> },
                            { name: 'EcoFert', sub: 'Biological Inputs', icon: <Leaf className="text-agro-400"/> },
                            { name: 'LogiTech', sub: 'Fleet Optimization', icon: <TruckIcon className="text-blue-400"/> },
                            { name: 'SolarSystems', sub: 'Energy Infrastructure', icon: <Zap className="text-yellow-400"/> }
                          ].map((sponsor) => (
                              <button
                                  key={sponsor.name}
                                  onClick={() => setSelectedSponsor(sponsor.name)}
                                  className={`w-full p-6 rounded-[2rem] text-left transition-all border-2 flex justify-between items-center group relative overflow-hidden ${
                                      selectedSponsor === sponsor.name
                                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-2xl shadow-blue-950/40 translate-x-2'
                                      : 'bg-white/5 border-transparent hover:bg-white/10 text-slate-500 hover:text-white'
                                  }`}
                              >
                                  <div className="flex items-center gap-6 relative z-10">
                                      <div className={`p-3 rounded-xl transition-all duration-500 ${selectedSponsor === sponsor.name ? 'bg-blue-600 text-white shadow-lg rotate-3' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700'}`}>
                                          {sponsor.icon}
                                      </div>
                                      <div>
                                        <p className="font-black text-base tracking-tight leading-none mb-1">{sponsor.name}</p>
                                        <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">{sponsor.sub}</p>
                                      </div>
                                  </div>
                                  {selectedSponsor === sponsor.name ? (
                                      <div className="flex items-center gap-4 relative z-10">
                                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-[0_0_12px_#60a5fa]"></div>
                                          <ChevronRight size={20} className="text-blue-400" />
                                      </div>
                                  ) : (
                                      <ChevronRight size={20} className="text-slate-800 group-hover:text-slate-600 relative z-10" />
                                  )}
                              </button>
                          ))}
                      </div>
                      
                      {/* Booth Detail */}
                      <div className="lg:col-span-8 bg-white/5 backdrop-blur-2xl rounded-[3.5rem] p-12 border border-white/10 flex flex-col shadow-inner relative group/booth overflow-hidden">
                          <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-blue-400 rotate-12 group-hover/booth:scale-110 transition-transform duration-[10s] pointer-events-none">
                              <MonitorPlay size={400} />
                          </div>
                          
                          {selectedSponsor ? (
                              <div className="flex-1 flex flex-col relative z-10">
                                  <div className="flex justify-between items-start mb-12">
                                      <div>
                                          <h3 className="text-5xl font-serif font-black mb-3 tracking-tighter">{selectedSponsor}</h3>
                                          <div className="flex items-center gap-4">
                                            <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg">Tier 1 Partner</span>
                                            <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Globe size={14}/> GLOBAL_SYNC_ACTIVE</span>
                                          </div>
                                      </div>
                                      <div className="bg-agro-500/20 text-agro-400 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-agro-500/30 flex items-center gap-3 animate-pulse shadow-2xl shadow-agro-500/10">
                                          <span className="w-2 h-2 bg-agro-400 rounded-full"></span> Live Consultant Online
                                      </div>
                                  </div>
                                  
                                  <div className="bg-black/30 rounded-[2.5rem] p-10 mb-12 border border-white/5 flex-1 shadow-inner relative overflow-hidden">
                                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-600/40"></div>
                                      <p className="text-slate-200 leading-[1.8] text-xl font-medium text-balance">
                                          Welcome to the <strong>{selectedSponsor}</strong> industrial terminal. We are currently pioneering regional scalability solutions to stabilize the <span className="text-blue-400 font-black">m(t) Resilience Constant</span> across East African supply chains. 
                                          <br/><br/>
                                          Our latest integration provides real-time financial settlement for cooperatives adopting regenerative EA Thrust standards.
                                      </p>
                                  </div>

                                  <div className="grid sm:grid-cols-2 gap-6">
                                      <button 
                                        onClick={handleStartChat}
                                        className="bg-blue-600 hover:bg-blue-500 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all shadow-xl shadow-blue-600/30 hover:-translate-y-1 active:scale-95"
                                      >
                                          <MessageSquare size={24} /> Chat with Specialist
                                      </button>
                                      <button className="bg-white/5 hover:bg-white/10 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all border border-white/10 hover:border-white/20 active:scale-95">
                                          <Download size={24} /> Partner Toolkit
                                      </button>
                                  </div>
                              </div>
                          ) : (
                              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center">
                                 <MonitorPlay size={64} className="mb-6 opacity-20" />
                                 <p className="text-xl font-serif italic">Select an exhibitor from the directory to enter their terminal</p>
                              </div>
                          )}
                      </div>
                  </div>
              </div>

              {/* REP CHAT MODAL - Enhanced */}
              {showRepChat && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 border-4 border-blue-900/20 flex flex-col h-[700px] max-h-[90vh]">
                        <div className="bg-blue-900 p-10 text-white flex justify-between items-center shrink-0 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><MessageSquare size={200} /></div>
                            <div className="flex items-center gap-6 relative z-10">
                                <div className="w-16 h-16 bg-white/10 rounded-[1.8rem] flex items-center justify-center shadow-inner border border-white/20">
                                    <Bot size={32} className="text-blue-300" />
                                </div>
                                <div>
                                    <h3 className="font-black text-2xl tracking-tight leading-none mb-2">{selectedSponsor} Rep</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                                        <p className="text-blue-300 text-[10px] font-black uppercase tracking-[0.3em]">Operational Uplink OK</p>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => setShowRepChat(false)}
                                className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 active:scale-90"
                            >
                                <X size={28} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar bg-slate-50 dark:bg-slate-950/40">
                            {chatMessages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                    <div className={`max-w-[85%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`w-10 h-10 rounded-[1.2rem] flex items-center justify-center shrink-0 shadow-xl border-2 transition-all ${msg.role === 'user' ? 'bg-blue-600 text-white border-blue-500' : 'bg-white dark:bg-slate-800 text-blue-500 border-white dark:border-slate-700'}`}>
                                            {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                                        </div>
                                        <div className={`p-6 rounded-[2.5rem] text-[15px] leading-relaxed shadow-sm font-medium ${msg.role === 'user' ? 'bg-blue-900 text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-700'}`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isRepTyping && (
                                <div className="flex justify-start animate-in fade-in">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-[1.2rem] bg-white dark:bg-slate-800 border-2 border-white dark:border-slate-700 flex items-center justify-center shadow-lg">
                                            <Loader2 size={20} className="animate-spin text-blue-600" />
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] rounded-tl-none border border-slate-100 dark:border-slate-700 flex gap-1.5 items-center">
                                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-150"></span>
                                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-300"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="p-10 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5 shrink-0">
                            <form onSubmit={handleSendMessage} className="relative flex items-center gap-4">
                                <div className="flex-1 relative group">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                        <Activity size={20} />
                                    </div>
                                    <input 
                                        type="text" 
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="Inquire about industrial solutions..."
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-[2rem] pl-16 pr-8 py-5 text-sm text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all shadow-inner"
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    disabled={!chatInput.trim() || isRepTyping}
                                    className="p-5 bg-blue-600 text-white rounded-[1.8rem] shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)] hover:bg-blue-500 disabled:opacity-50 transition-all active:scale-90"
                                >
                                    <Send size={24} />
                                </button>
                            </form>
                            <p className="text-center text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mt-6">Secure Industrial Communication Protocol Enabled</p>
                        </div>
                    </div>
                </div>
              )}
          </div>
      );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 pt-32 pb-24 animate-in fade-in duration-1000">
      {/* Header Lobby Section */}
      <div className="text-center mb-20 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-3 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-10 border border-blue-100 dark:border-blue-800 shadow-sm animate-pulse-gentle">
            <Radio size={16} fill="currentColor" /> VIRTUAL CONFERENCE HUB
        </div>
        <h2 className="text-6xl md:text-8xl font-serif font-bold text-agro-900 dark:text-white mb-8 tracking-tighter leading-[0.85]">ScaleUp <br/><span className="text-blue-600 italic">Summit 2024</span></h2>
        <p className="text-2xl text-earth-600 dark:text-earth-400 font-medium max-w-3xl mx-auto leading-relaxed text-balance">
          The premier gathering for industrial agriculture leaders. Exploring global supply chain resilience and the next iteration of the **m(t)** framework.
        </p>
      </div>

      {/* Hero Stream Area - Squizzed Refined Look */}
      <div className="bg-slate-900 rounded-[4rem] overflow-hidden shadow-cinematic-lg mb-20 border-[8px] border-slate-800 relative group/hero">
         <div className="aspect-[21/9] bg-black relative cursor-pointer" onClick={() => setShowLiveStream(true)}>
             <img 
               src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=1600&auto=format&fit=crop&q=80" 
               className="w-full h-full object-cover opacity-60 group-hover/hero:opacity-40 transition-all duration-[8s] group-hover/hero:scale-105"
               alt="Conference Keynote"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
             
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                 <div className="bg-red-600 text-white px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-[0.3em] mb-10 inline-block animate-pulse shadow-2xl ring-4 ring-red-600/20">
                    Live Stream Now Active
                 </div>
                 <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-12 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] leading-tight max-w-4xl text-balance">Keynote: The Future of <br/><span className="text-blue-400 italic">Global Food Security</span></h1>
                 <button 
                    onClick={(e) => { e.stopPropagation(); setShowLiveStream(true); }}
                    className="bg-white text-slate-950 font-black py-6 px-16 rounded-full hover:scale-110 active:scale-95 transition-all flex items-center gap-6 mx-auto shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:shadow-[0_20px_60px_rgba(255,255,255,0.4)]"
                 >
                    <Video size={32} className="text-blue-600" /> 
                    <span className="text-lg uppercase tracking-[0.2em]">Join Broadcast</span>
                 </button>
             </div>
         </div>
         
         <div className="bg-slate-800/80 backdrop-blur-3xl p-10 flex flex-col md:flex-row justify-between items-center text-white border-t border-white/5 gap-10">
             <div className="flex items-center gap-8">
                 <div className="relative group/speaker">
                    <div className="w-20 h-20 bg-slate-700 rounded-3xl flex items-center justify-center border-2 border-slate-600 shadow-2xl group-hover/speaker:rotate-3 transition-transform">
                        <Mic size={32} className="text-blue-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-red-600 w-6 h-6 rounded-full border-4 border-slate-800 animate-pulse"></div>
                 </div>
                 <div>
                     <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-1.5">Keynote Speaker</p>
                     <h4 className="text-2xl font-serif font-bold">Dr. Amina Juma</h4>
                     <p className="text-xs text-slate-500 font-black uppercase tracking-widest mt-1">CEO • AgriGlobal Ventures</p>
                 </div>
             </div>
             
             <div className="h-10 w-px bg-white/5 hidden lg:block"></div>
             
             <div className="flex gap-16 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                 <div className="flex flex-col items-center gap-2 group cursor-default">
                    <Users size={20} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                    <span>2.4k Streamers</span>
                 </div>
                 <div className="flex flex-col items-center gap-2 group cursor-default">
                    <MessageSquare size={20} className="text-slate-600 group-hover:text-agro-400 transition-colors" />
                    <span>Live Dialogue</span>
                 </div>
                 <div className="flex flex-col items-center gap-2 group cursor-default">
                    <Activity size={20} className="text-slate-600 group-hover:text-amber-400 transition-colors" />
                    <span>4K Transmission</span>
                 </div>
             </div>
         </div>
      </div>

      {/* Agenda & Expo Entry Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          <div className="bg-white dark:bg-earth-900 p-12 rounded-[3.5rem] border border-earth-100 dark:border-earth-800 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-12">
                  <h3 className="text-3xl font-serif font-bold text-earth-900 dark:text-white flex items-center gap-5">
                    <div className="p-3 bg-agro-50 dark:bg-agro-900/30 rounded-2xl text-agro-600"><Calendar size={28} /></div>
                    Session Agenda
                  </h3>
                  <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Full PDF Download</button>
              </div>
              <div className="space-y-10 flex-1">
                  {[
                      { time: "10:00 AM", title: "Supply Chain Digitization", speaker: "Tech Intelligence Panel", status: "Active Now", active: true },
                      { time: "11:30 AM", title: "Sustainable Mechanization", speaker: "Dr. L. Wangari • John Deere", status: "Up Next", active: false },
                      { time: "02:00 PM", title: "Carbon Markets for Industry", speaker: "Regional Climate Fund", status: "Upcoming", active: false }
                  ].map((session, idx) => (
                      <div key={idx} className={`flex gap-8 items-start pb-8 border-b last:border-0 last:pb-0 border-earth-50 dark:border-earth-800 group transition-all ${session.active ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                          <div className={`text-sm font-black font-mono pt-1 shrink-0 ${session.active ? 'text-blue-600' : 'text-earth-400'}`}>{session.time}</div>
                          <div className="flex-1 min-w-0">
                              <h4 className={`font-bold text-xl mb-1 truncate transition-colors ${session.active ? 'text-earth-900 dark:text-white' : 'text-earth-500 group-hover:text-earth-900'}`}>{session.title}</h4>
                              <p className="text-[11px] font-black text-earth-400 uppercase tracking-widest mb-4">{session.speaker}</p>
                              <div className="flex items-center gap-3">
                                <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border transition-all ${session.active ? 'bg-blue-600 text-white border-blue-500 shadow-lg animate-pulse' : 'bg-earth-50 dark:bg-earth-800 text-earth-500 border-earth-100 dark:border-earth-700'}`}>
                                    {session.status}
                                </span>
                                {session.active && <div className="text-[9px] font-bold text-blue-600 flex items-center gap-1.5"><Radio size={12}/> Link active in main stage</div>}
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <div className="bg-slate-900 text-white p-16 rounded-[3.5rem] relative overflow-hidden flex flex-col shadow-cinematic transition-all hover:shadow-[0_50px_100px_-20px_rgba(59,130,246,0.3)] group/expo border border-white/5">
              <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid.png')]"></div>
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full group-hover/expo:scale-125 transition-transform duration-[5s]"></div>
              
              <div className="relative z-10 flex-1 flex flex-col">
                  <div className="w-16 h-16 bg-white/10 rounded-[1.8rem] flex items-center justify-center mb-10 border border-white/20 backdrop-blur-md shadow-2xl group-hover/expo:rotate-12 transition-transform">
                    <Star className="text-amber-400" fill="currentColor" size={28} />
                  </div>
                  <h3 className="text-4xl font-serif font-bold mb-6 tracking-tight">Virtual Expo Hall</h3>
                  <p className="text-slate-400 text-lg mb-12 leading-relaxed font-medium">
                      Visit interactive booths from global industrial partners. Download technical blueprints, join private breakouts, and network with procurement leads.
                  </p>
                  
                  {/* Exhibitor Micro-Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-12">
                      {['AgriBank', 'EcoFert', 'LogiTech', 'SolarSystems'].map((sponsor, i) => (
                          <div
                              key={i}
                              className={`p-4 rounded-2xl text-center font-black text-[10px] uppercase tracking-widest border-2 border-white/5 bg-white/5 text-slate-500 group-hover/expo:border-blue-500/20 group-hover/expo:text-blue-400 transition-all duration-700`}
                              style={{ transitionDelay: `${i*100}ms` }}
                          >
                              {sponsor}
                          </div>
                      ))}
                  </div>
                  
                  <button 
                    onClick={() => setShowExpo(true)}
                    className="w-full mt-auto bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-[2rem] transition-all flex items-center justify-center gap-6 shadow-2xl shadow-blue-900/50 hover:scale-[1.02] active:scale-95 text-sm uppercase tracking-[0.2em]"
                  >
                      Explore Industrial Partners <ArrowRight size={24} />
                  </button>
              </div>
          </div>
      </div>
      
      {/* Footer Branding Ribbon */}
      <div className="mt-24 pt-16 border-t border-earth-100 dark:border-earth-800 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-earth-400">
         <div className="flex items-center gap-8">
            <span className="flex items-center gap-3"><Monitor size={14} className="text-blue-500"/> Virtual Presence Node</span>
            <span className="flex items-center gap-3"><ShieldCheck size={14} className="text-agro-600"/> Industrial Data Secure</span>
         </div>
         <p className="opacity-40">SUMMIT REVISION v4.2.2-LIVE</p>
      </div>
    </div>
  );
};

// Helper Icon
function TruckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-5h-4v5a1 1 0 0 0 1 1Z"/><path d="M16 8h3.3a2 2 0 0 1 1.6.8l2.1 3.2"/><circle cx="7.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  );
}
