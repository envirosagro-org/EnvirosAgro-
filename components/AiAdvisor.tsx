import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { createAgroChat, sendMessageStream } from '../services/gemini';
import { 
  Send, Bot, User, Loader2, Sparkles, AlertCircle, MessageSquare, 
  BrainCircuit, ShieldCheck, Zap, Layers, Users, Leaf, Cpu,
  Activity, X, Terminal, ArrowRight, ShieldAlert,
  Maximize2, Monitor, Settings, Globe, Command, Radio
} from 'lucide-react';
import { Chat, GenerateContentResponse } from "@google/genai";

const SUGGESTIONS = [
  "Calculate regional m(t) resilience",
  "Optimize In(val) soil integrity",
  "Identify EA Thrust deficiencies",
  "Scalability paths for Industrial Ag"
];

const THRUST_MAP = [
  { id: 'SA', icon: <Users size={16} />, label: 'Social Agriculture' },
  { id: 'EA', icon: <Leaf size={16} />, label: 'Environmental' },
  { id: 'HA', icon: <ShieldCheck size={16} />, label: 'Health Standards' },
  { id: 'TA', icon: <Cpu size={16} />, label: 'Technical Systems' },
  { id: 'IA', icon: <Layers size={16} />, label: 'Industrial Scale' }
];

export const AiAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Uplink established. EnvirosAgro Strategic AI is active. Current focus: m(t) resilience calibration. How shall we optimize your sector data today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatInstance = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatInstance.current) {
      chatInstance.current = createAgroChat();
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const detectThrust = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes('social') || t.includes('community')) return 'SA';
    if (t.includes('soil') || t.includes('environmental') || t.includes('earth')) return 'EA';
    if (t.includes('pest') || t.includes('health') || t.includes('safety')) return 'HA';
    if (t.includes('tech') || t.includes('ai') || t.includes('data')) return 'TA';
    if (t.includes('industrial') || t.includes('supply') || t.includes('scale')) return 'IA';
    return null;
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || !chatInstance.current || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      setMessages(prev => [...prev, { role: 'model', text: '', timestamp: new Date() }]);
      const result = await sendMessageStream(chatInstance.current, userMsg.text);
      let fullText = '';
      
      for await (const chunk of result) {
          const content = chunk as GenerateContentResponse;
          const text = content.text;
          if (text) {
              fullText += text;
              setMessages(prev => {
                  const next = [...prev];
                  next[next.length - 1] = { ...next[next.length - 1], text: fullText };
                  return next;
              });
          }
      }
    } catch (err) {
      console.error("Terminal Error:", err);
      setError("Network synchronization timeout. Re-establishing link...");
      setMessages(prev => prev.filter(m => m.text !== ''));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto h-[calc(100vh-200px)] flex flex-col p-6 gap-8 relative animate-in fade-in duration-1000">
        
        {/* Terminal Header */}
        <div className="ea-header-block mb-0 py-8 px-12 bg-slate-900/40 border-white/5 ring-1 ring-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10 shrink-0">
                <div className="flex items-center gap-8">
                    <div className="w-16 h-16 bg-blue-600 rounded-[1.8rem] flex items-center justify-center text-white shadow-glow-blue border border-white/20">
                        <BrainCircuit size={32} />
                    </div>
                    <div>
                        <div className="ea-label-meta mb-2">Cognitive Link Active</div>
                        <h2 className="text-4xl font-serif font-black text-slate-900 dark:text-white tracking-tighter">
                          Intelligence <span className="text-blue-500 italic">Terminal</span>
                        </h2>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                   <div className="bg-black/40 backdrop-blur-2xl px-6 py-3 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-4 text-agro-500 shadow-inner">
                      <div className="w-2.5 h-2.5 bg-agro-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                      Node Status: NOMINAL_SYNC
                   </div>
                   <button className="p-4 bg-white/5 hover:bg-white/10 rounded-[1.5rem] transition-all border border-white/10 text-slate-500 hover:text-white">
                      <Command size={20} />
                   </button>
                </div>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 h-full relative z-10 min-h-0">
            
            {/* Logic Sidebar */}
            <aside className="hidden lg:flex flex-col w-[350px] gap-8 shrink-0">
                <div className="ea-card p-10 flex flex-col h-full bg-slate-900/20 border-white/5 backdrop-blur-3xl ring-1 ring-white/5">
                    <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.6em] mb-12 flex items-center gap-4">
                        <Terminal size={18} className="text-blue-500" /> Active Modules
                    </h3>
                    <div className="space-y-8 flex-1">
                        {THRUST_MAP.map(t => (
                            <div key={t.id} className="group cursor-default">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-[1.2rem] bg-black/40 flex items-center justify-center text-slate-500 group-hover:text-blue-400 transition-all duration-700 border border-white/5 ring-1 ring-transparent group-hover:ring-blue-500/20 shadow-inner">
                                            {t.icon}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">{t.label}</span>
                                    </div>
                                    <span className="text-[9px] font-mono text-slate-600 group-hover:text-blue-500/60">SYNCED</span>
                                </div>
                                <div className="h-1 w-full bg-black/40 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 w-[78%] group-hover:w-[85%] transition-all duration-1000 shadow-[0_0_10px_#3b82f6]"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 bg-black/60 rounded-[3rem] p-8 text-white relative overflow-hidden shadow-cinematic-xl ring-1 ring-white/5 group">
                        <div className="absolute top-0 right-0 p-6 opacity-[0.03] transition-transform duration-1000 group-hover:scale-125"><Activity size={180} /></div>
                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-6 flex items-center gap-3 text-agro-500">
                          <Radio size={16} fill="currentColor" className="animate-pulse" /> Real-time Telemetry
                        </h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed relative z-10 font-medium italic">
                          "System prioritizing Soil Moisture (In) deltas for Q2 optimization path."
                        </p>
                    </div>
                </div>
            </aside>

            {/* Terminal Interface */}
            <div className="ea-card flex-1 flex flex-col min-w-0 bg-[#050a14]/60 border-white/5 shadow-cinematic-xl ring-1 ring-white/10 backdrop-blur-[80px]">
                {/* Channel Header */}
                <div className="bg-black/40 p-8 flex items-center justify-between shrink-0 border-b border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.02]"><Monitor size={250}/></div>
                    <div className="flex items-center gap-8 relative z-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-agro-600 rounded-[2rem] flex items-center justify-center text-white shadow-glow-blue border border-white/10 ring-4 ring-white/5">
                            <Zap size={28} fill="currentColor" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-serif font-black text-white tracking-tight leading-none mb-2">Strategic Support</h2>
                            <div className="flex items-center gap-4">
                               <div className="flex items-center gap-2 px-3 py-1 bg-agro-500/10 rounded-lg border border-agro-500/20">
                                  <div className="w-1.5 h-1.5 bg-agro-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                                  <span className="text-[9px] text-agro-400 font-black uppercase tracking-[0.4em]">Node_Connected</span>
                               </div>
                               <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Latency: 14ms</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                        <button className="p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5 text-slate-500 hover:text-white shadow-xl"><Maximize2 size={22}/></button>
                        <button className="p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5 text-slate-500 hover:text-white shadow-xl"><Settings size={22}/></button>
                    </div>
                </div>

                {/* Secure Log Stream */}
                <div className="flex-1 overflow-y-auto p-12 space-y-12 bg-gradient-to-b from-transparent to-black/20 ea-scroll-area scroll-smooth">
                    {messages.map((msg, idx) => {
                        const activeThrust = msg.role === 'model' ? detectThrust(msg.text) : null;
                        const thrustInfo = activeThrust ? THRUST_MAP.find(t => t.id === activeThrust) : null;

                        return (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-3 duration-700`}>
                                <div className={`flex gap-8 max-w-[90%] lg:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-strategic border-2 transition-all duration-1000 ${msg.role === 'user' ? 'bg-slate-900 border-slate-700 text-white' : 'bg-blue-600 border-blue-400 text-white'}`}>
                                        {msg.role === 'user' ? <User size={28} /> : <Bot size={28} />}
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <div className={`p-10 rounded-[3.5rem] shadow-strategic leading-relaxed text-lg md:text-xl font-medium transition-all duration-700 ring-1 ring-white/5 ${
                                            msg.role === 'user' 
                                            ? 'bg-slate-900/80 text-white rounded-tr-none border border-slate-700' 
                                            : 'bg-white dark:bg-slate-900/80 text-slate-800 dark:text-slate-100 rounded-tl-none border border-white/10 backdrop-blur-xl'
                                        }`}>
                                            {msg.text || (isLoading && idx === messages.length - 1 ? (
                                                <div className="flex items-center gap-6 text-blue-500">
                                                    <Loader2 className="animate-spin" size={24} />
                                                    <span className="text-[11px] font-black uppercase tracking-[0.5em] animate-pulse">SYNTHESIZING_INTELLIGENCE...</span>
                                                </div>
                                            ) : '')}
                                        </div>
                                        {thrustInfo && (
                                            <div className="flex items-center gap-3 px-6 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 w-fit animate-in fade-in">
                                               <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                                                  <Sparkles size={12} fill="currentColor" /> Context detected: {thrustInfo.label}
                                               </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* Uplink Deck */}
                <div className="p-10 bg-[#050a14]/80 border-t border-white/10 shrink-0">
                    <div className="max-w-6xl mx-auto space-y-8">
                        <div className="relative group">
                            <div className="relative flex items-center bg-black/40 rounded-[2.5rem] border border-white/10 focus-within:border-blue-500/50 focus-within:ring-8 focus-within:ring-blue-500/5 transition-all shadow-inner">
                                <div className="pl-10 text-slate-600 group-focus-within:text-blue-500 transition-colors">
                                   <Terminal size={24} />
                                </div>
                                <input 
                                    type="text" 
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Execute strategic query..."
                                    className="w-full bg-transparent px-8 py-7 focus:outline-none text-white placeholder-slate-700 font-bold text-xl"
                                    disabled={isLoading}
                                />
                                <button 
                                    onClick={() => handleSend()}
                                    disabled={isLoading || !input.trim()}
                                    className="p-4 mr-3 bg-blue-600 text-white rounded-3xl hover:bg-blue-500 disabled:opacity-30 transition-all shadow-glow-blue active:scale-90 group/btn"
                                >
                                    {isLoading ? <Loader2 size={28} className="animate-spin" /> : <Send size={28} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center">
                            {SUGGESTIONS.map((hint, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(hint)}
                                    disabled={isLoading}
                                    className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/5 text-slate-500 hover:text-blue-400 border border-white/5 hover:border-blue-500/30 px-8 py-4 rounded-2xl transition-all shadow-xl active:scale-95 hover:bg-white/10"
                                >
                                    {hint}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center px-12 pt-6 border-t border-white/5 opacity-40 text-[9px] font-black uppercase tracking-[0.6em] text-slate-500">
           <span className="flex items-center gap-5"><Globe size={16}/> Integrated Resilience Protocol v4.2.2</span>
           <div className="flex gap-16">
              <span className="hover:text-blue-500 cursor-pointer transition-colors">End-to-End Encryption</span>
              <span className="hover:text-blue-500 cursor-pointer transition-colors">Sovereign Data Storage</span>
           </div>
        </div>
    </div>
  );
};