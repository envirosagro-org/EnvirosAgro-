import React, { useState, useRef, useEffect } from 'react';
import { 
  Calendar, Users, Video, Mic, MessageSquare, Star, ArrowRight, X, 
  Download, Globe, ChevronRight, Volume2, Settings, Maximize, Send, 
  Activity, Zap, ShieldCheck, Clock, Bot, User, Loader2, Sparkles
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
    // Inject brand context as first message (hidden or implicit)
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
      <div className="fixed inset-0 z-[120] bg-slate-950 flex flex-col animate-in fade-in duration-500">
        {/* Summit Header Overlay */}
        <div className="flex justify-between items-center bg-black/40 backdrop-blur-md p-6 border-b border-white/10 relative z-20">
          <div className="flex items-center gap-6">
            <div className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.4)]">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE BROADCAST
            </div>
            <div>
              <h3 className="text-white font-bold text-xl leading-none mb-1">Keynote: The Future of Food Security</h3>
              <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Main Stage • ScaleUp Summit 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/10 px-4 py-2 rounded-xl text-white text-[10px] font-black flex items-center gap-2 border border-white/10">
              <Users size={14} className="text-blue-400" /> 2,450 STREAMING
            </div>
            <button 
              onClick={() => setShowLiveStream(false)}
              className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all border border-white/10 group"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row min-h-0">
          {/* Main Cinematic Video Player */}
          <div className="flex-1 bg-black relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=1600&auto=format&fit=crop&q=80" 
              className="w-full h-full object-cover opacity-60"
              alt="Live Conference"
            />
            
            {/* Visual Overlays */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-end">
                <div className="bg-black/40 backdrop-blur-md p-5 rounded-[2rem] border border-white/10 text-white flex flex-col items-center gap-2 animate-in slide-in-from-right-10">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400">
                    <Activity size={24} className="animate-pulse" />
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest text-blue-300">Signal Integrity</span>
                </div>
              </div>

              <div className="flex items-end justify-between pointer-events-auto">
                <div className="bg-black/80 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/10 w-full max-w-2xl flex items-center gap-8 shadow-2xl">
                  <div className="flex items-center gap-4 border-r border-white/10 pr-8">
                    <button className="text-white hover:text-blue-400 transition-colors"><Volume2 size={24} /></button>
                    <button className="text-white hover:text-blue-400 transition-colors"><Settings size={20} /></button>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">Network Throughput</span>
                       <span className="text-[8px] font-mono text-white/40">12.4 Mbps</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[70%] shadow-[0_0_10px_#3b82f6]"></div>
                    </div>
                  </div>
                  <button className="text-white hover:text-blue-400 transition-colors"><Maximize size={24} /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Summit Social & Chat Panel */}
          <div className="w-full lg:w-96 bg-slate-900 border-l border-white/10 flex flex-col shadow-2xl">
            <div className="p-6 border-b border-white/10 bg-slate-800/50 flex justify-between items-center">
              <h4 className="font-black text-xs text-white uppercase tracking-widest flex items-center gap-2">
                <MessageSquare size={16} className="text-blue-400" /> Delegate Chat
              </h4>
              <span className="bg-blue-500/20 text-blue-400 text-[8px] font-black px-2 py-0.5 rounded uppercase border border-blue-500/30">Secure Channel</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {[
                { user: "Director Mark", msg: "This session on supply chain digitisation is vital for the Q3 roadmap.", time: "10:42" },
                { user: "Elena (EA)", msg: "Agreed. The m(t) constant alignment here is exactly what we discussed.", time: "10:44" },
                { user: "Summit Bot", msg: "Live interpretation available in the settings menu.", time: "System", isSys: true },
                { user: "Investor Hub", msg: "Will these slides be available for the Capital Exchange?", time: "10:45" }
              ].map((chat, i) => (
                <div key={i} className={`flex flex-col ${chat.isSys ? 'items-center' : 'items-start'}`}>
                  {chat.isSys ? (
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] bg-slate-800 px-4 py-1.5 rounded-full border border-white/5">{chat.msg}</p>
                  ) : (
                    <>
                      <div className="flex justify-between w-full mb-1">
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{chat.user}</span>
                        <span className="text-[8px] font-bold text-slate-500 uppercase">{chat.time}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 hover:bg-white/10 transition-colors">{chat.msg}</p>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-white/10 bg-slate-900">
              <form onSubmit={(e) => e.preventDefault()} className="relative">
                <input 
                  type="text" 
                  placeholder="Share your thoughts with delegates..." 
                  className="w-full bg-black/40 border border-white/10 rounded-2xl pl-5 pr-14 py-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20 active:scale-90 transition-all hover:bg-blue-500">
                  <Send size={18} />
                </button>
              </form>
              <p className="text-[8px] text-slate-500 mt-3 text-center uppercase tracking-widest font-bold">Press enter to broadcast to Summit</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                      {/* Sponsor List - Vertical Navigation */}
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
                                  <span>{sponsor}</span>
                                  {selectedSponsor === sponsor ? (
                                      <div className="flex items-center gap-3">
                                          <span className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa] animate-pulse"></span>
                                          <ChevronRight size={18} className="text-blue-400" />
                                      </div>
                                  ) : (
                                      <ChevronRight size={18} className="text-slate-600 group-hover:text-slate-400" />
                                  )}
                              </button>
                          ))}
                      </div>
                      
                      {/* Booth Detail */}
                      <div className="lg:col-span-2 bg-white/5 rounded-3xl p-8 border border-white/10 flex flex-col backdrop-blur-sm">
                          {selectedSponsor ? (
                              <div className="flex-1 flex flex-col">
                                  <div className="flex justify-between items-start mb-6">
                                      <div>
                                          <h3 className="text-4xl font-bold mb-2">{selectedSponsor}</h3>
                                          <p className="text-blue-400 text-sm font-mono tracking-wide uppercase">Premium Partner</p>
                                      </div>
                                      <span className="bg-green-500/20 text-green-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase border border-green-500/50 flex items-center gap-2 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                                          <span className="w-2 h-2 bg-green-400 rounded-full"></span> Live Now
                                      </span>
                                  </div>
                                  
                                  <div className="bg-black/20 rounded-2xl p-8 mb-8 border border-white/5 flex-1">
                                      <p className="text-slate-200 leading-relaxed text-lg">
                                          Welcome to the <strong>{selectedSponsor}</strong> virtual experience. We are pioneering industrial solutions to scale your operations efficiently and sustainably. 
                                          <br/><br/>
                                          Connect with our team to learn about our latest API integrations for supply chain transparency.
                                      </p>
                                  </div>

                                  <div className="mt-auto grid sm:grid-cols-2 gap-4">
                                      <button 
                                        onClick={handleStartChat}
                                        className="bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-600/30 hover:-translate-y-1"
                                      >
                                          <MessageSquare size={20} /> Chat with Rep
                                      </button>
                                      <button className="bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border border-white/10 hover:border-white/30">
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

              {/* REP CHAT MODAL */}
              {showRepChat && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-white/10 flex flex-col h-[600px]">
                        <div className="bg-blue-600 p-6 text-white flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner">
                                    <Bot size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-tight">{selectedSponsor} Rep</h3>
                                    <p className="text-blue-200 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online Now
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setShowRepChat(false)}
                                className="p-2 hover:bg-white/10 rounded-xl transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50 dark:bg-slate-950/20">
                            {chatMessages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                                    <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm border ${msg.role === 'user' ? 'bg-blue-100 text-blue-600 border-blue-200' : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'}`}>
                                            {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                        </div>
                                        <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-700'}`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isRepTyping && (
                                <div className="flex justify-start animate-in fade-in">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                                            <Loader2 size={14} className="animate-spin text-blue-600" />
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700 flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-150"></span>
                                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-300"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5">
                            <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
                                <input 
                                    type="text" 
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder="Ask about our industrial solutions..."
                                    className="flex-1 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl pl-5 pr-12 py-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all"
                                />
                                <button 
                                    type="submit"
                                    disabled={!chatInput.trim() || isRepTyping}
                                    className="p-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-500 disabled:opacity-50 transition-all"
                                >
                                    <Send size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
              )}
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
         <div className="aspect-video bg-black relative group cursor-pointer" onClick={() => setShowLiveStream(true)}>
             <img 
               src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=1600&auto=format&fit=crop&q=80" 
               className="w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-opacity"
               alt="Conference Keynote"
             />
             <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-center">
                     <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block animate-pulse shadow-lg">
                        Live Now
                     </span>
                     <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 drop-shadow-lg">Keynote: The Future of Food Security</h1>
                     <button 
                        onClick={(e) => { e.stopPropagation(); setShowLiveStream(true); }}
                        className="bg-white text-slate-900 font-bold py-4 px-10 rounded-full hover:bg-slate-100 transition-all flex items-center gap-3 mx-auto shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]"
                     >
                        <Video size={24} className="text-slate-900" /> <span className="text-lg">Join Stream</span>
                     </button>
                 </div>
             </div>
         </div>
         <div className="bg-slate-800 p-6 flex justify-between items-center text-white border-t border-slate-700">
             <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center border border-slate-600">
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

          <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden flex flex-col shadow-xl">
              <div className="relative z-10 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Star className="text-yellow-400" fill="currentColor" /> Virtual Expo Hall
                  </h3>
                  <p className="text-slate-300 mb-8">
                      Visit virtual booths from top industry partners. Experience demos and download resources.
                  </p>
                  
                  {/* Sponsor Selector Grid (Preview) */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                      {['AgriBank', 'EcoFert', 'LogiTech', 'SolarSystems'].map((sponsor, i) => (
                          <div
                              key={i}
                              className={`p-4 rounded-xl text-center font-bold text-sm border-2 border-transparent bg-white/10 text-slate-300`}
                          >
                              {sponsor}
                          </div>
                      ))}
                  </div>
                  
                  <button 
                    onClick={() => setShowExpo(true)}
                    className="w-full mt-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/50 hover:scale-[1.02]"
                  >
                      Enter Expo Hall <ArrowRight size={20} />
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};
