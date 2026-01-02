
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { createAgroChat, sendMessageStream } from '../services/gemini';
import { 
  Send, Bot, User, Loader2, Sparkles, 
  BrainCircuit, ShieldCheck, Zap, Layers, Users, Leaf, Cpu,
  Activity, Terminal, 
  Maximize2, Monitor, Settings, Globe, Command, Radio,
  Mic, Image as ImageIcon, FileText, Share2, Search,
  Database, LineChart, Cpu as Processor, Network
} from 'lucide-react';
import type { ChatSession, Content } from "@google/generative-ai";

const SUGGESTIONS = [
  "Calculate regional m(t) resilience",
  "Optimize In(val) soil integrity",
  "Identify EA Thrust deficiencies",
  "Scalability paths for Industrial Ag"
];

const THRUST_MAP = [
  { id: 'SA', icon: <Users size={16} />, label: 'Social Agriculture', efficiency: 92, status: 'OPTIMAL' },
  { id: 'EA', icon: <Leaf size={16} />, label: 'Environmental', efficiency: 78, status: 'MONITOR' },
  { id: 'HA', icon: <ShieldCheck size={16} />, label: 'Health Standards', efficiency: 85, status: 'STABLE' },
  { id: 'TA', icon: <Cpu size={16} />, label: 'Technical Systems', efficiency: 64, status: 'UPGRADE' },
  { id: 'IA', icon: <Layers size={16} />, label: 'Industrial Scale', efficiency: 81, status: 'STABLE' }
];

const ANALYTICS_METRICS = [
  { label: 'Compute Power', value: '4.8 PFLOPS', icon: <Processor size={14} />, color: 'text-blue-400' },
  { label: 'Neural Density', value: '98.4%', icon: <Network size={14} />, color: 'text-purple-400' },
  { label: 'Data Ingest', value: '1.2 PB/day', icon: <Database size={14} />, color: 'text-agro-400' },
  { label: 'Predictive Acc', value: '99.2%', icon: <LineChart size={14} />, color: 'text-cyan-400' }
];

const AiAdvisor: React.FC = () => {
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
  const [isTyping, setIsTyping] = useState(false);
  const chatInstance = useRef<ChatSession | null>(null);
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
    setIsTyping(true);
    setError(null);

    try {
      setMessages(prev => [...prev, { role: 'model', text: '', timestamp: new Date() }]);
      const stream = await sendMessageStream(chatInstance.current, userMsg.text);
      let fullText = '';
      
      for await (const chunk of stream) {
          const chunkText = chunk.text();
          if (chunkText) {
              fullText += chunkText;
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
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-[1800px] mx-auto h-[calc(100vh-120px)] flex flex-col p-4 lg:p-6 gap-6 relative animate-in fade-in duration-1000 bg-earth-950/20 rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden font-sans">
        
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-agro-600/10 blur-[150px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-earth-600/10 blur-[150px] rounded-full"></div>
        </div>

        {/* Intelligence Header */}
        <header className="relative z-10 bg-earth-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 lg:p-10 shadow-strategic ring-1 ring-white/5 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-agro-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-8">
                    <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-agro-600 to-agro-800 rounded-[2rem] flex items-center justify-center text-white shadow-glow-green border border-white/20 relative z-10 transition-transform hover:scale-105 duration-500">
                            <BrainCircuit size={40} />
                        </div>
                        <div className="absolute -inset-2 bg-agro-500/20 blur-xl rounded-full animate-pulse"></div>
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                           <div className="text-[10px] font-black uppercase tracking-[0.3em] text-agro-400">Cognitive Link Active</div>
                           <span className="text-[9px] font-black text-earth-500 uppercase tracking-widest bg-earth-800/50 px-3 py-1 rounded-full border border-white/5">EA-INTEL-CORE-V5</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-serif font-black text-white tracking-tighter leading-tight">
                          EnvirosAgro <span className="text-agro-500 italic">Advisor</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
                    {ANALYTICS_METRICS.map((metric, i) => (
                        <div key={i} className="bg-black/40 p-4 rounded-2xl border border-white/10 flex flex-col justify-between group/metric hover:border-agro-500/30 transition-all">
                            <div className={`flex items-center gap-2 mb-1 ${metric.color}`}>
                                {metric.icon}
                                <span className="text-[9px] font-black uppercase tracking-widest text-earth-500">{metric.label}</span>
                            </div>
                            <span className="text-sm font-mono font-bold text-white">{metric.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 h-full relative z-10 min-h-0">
            
            {/* Logic Sidebar */}
            <aside className="hidden lg:flex flex-col w-[380px] gap-6 shrink-0 h-full">
                <div className="p-8 flex flex-col h-full bg-earth-900/40 border border-white/10 rounded-[2.5rem] backdrop-blur-3xl ring-1 ring-white/5 overflow-hidden shadow-strategic">
                    <h3 className="text-[11px] font-black text-earth-500 uppercase tracking-[0.6em] mb-10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <Terminal size={18} className="text-agro-500" /> Active Modules
                        </div>
                        <button className="text-[9px] font-black text-agro-500 hover:text-white transition-colors uppercase tracking-widest">DETAILS</button>
                    </h3>
                    
                    <div className="space-y-8 flex-1 overflow-y-auto ea-scroll-area pr-2">
                        {THRUST_MAP.map(t => (
                            <div key={t.id} className="group cursor-default bg-black/20 p-5 rounded-[2rem] border border-white/5 hover:border-agro-500/20 transition-all">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-[1.2rem] bg-agro-500/10 flex items-center justify-center text-agro-400 group-hover:bg-agro-500 group-hover:text-white transition-all duration-500 border border-agro-500/20">
                                            {t.icon}
                                        </div>
                                        <div>
                                           <span className="text-[10px] font-black uppercase tracking-widest text-earth-400 group-hover:text-white transition-colors block">{t.label}</span>
                                           <span className={`text-[8px] font-black tracking-[0.2em] ${t.status === 'OPTIMAL' ? 'text-agro-500' : t.status === 'UPGRADE' ? 'text-amber-500' : 'text-blue-500'}`}>{t.status}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                       <span className="text-lg font-mono font-bold text-white">{t.efficiency}%</span>
                                    </div>
                                </div>
                                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full bg-gradient-to-r transition-all duration-1000 shadow-[0_0_10px_rgba(34,197,94,0.3)] ${t.efficiency > 90 ? 'from-agro-600 to-emerald-400' : t.efficiency < 70 ? 'from-amber-600 to-red-400' : 'from-agro-500 to-cyan-400'}`} 
                                        style={{ width: `${t.efficiency}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 bg-gradient-to-br from-agro-600 to-earth-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl group cursor-pointer hover:scale-[1.02] transition-transform">
                        <div className="absolute top-[-20%] right-[-10%] p-6 opacity-[0.1] rotate-12 transition-transform duration-1000 group-hover:rotate-45"><Radio size={200} /></div>
                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center gap-3 text-white/80">
                          <Activity size={16} fill="currentColor" className="animate-pulse" /> Neural Insights
                        </h4>
                        <p className="text-xs text-white/90 leading-relaxed relative z-10 font-bold italic">
                          &quot;Predictive modeling suggests a 12% yield increase by recalibrating Thrust TA automation in North-East sectors.&quot;
                        </p>
                    </div>
                </div>
            </aside>

            {/* Terminal Interface */}
            <main className="flex-1 flex flex-col min-w-0 bg-earth-950/60 border border-white/10 shadow-cinematic-xl ring-1 ring-white/10 backdrop-blur-[120px] rounded-[3rem] overflow-hidden">
                {/* Interface Header */}
                <div className="bg-black/40 p-8 flex items-center justify-between shrink-0 border-b border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] transition-transform duration-1000 hover:rotate-6"><Monitor size={250}/></div>
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="w-16 h-16 bg-white/5 rounded-[1.8rem] flex items-center justify-center text-agro-500 border border-white/10 ring-1 ring-white/5 shadow-inner">
                            <Command size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-serif font-black text-white tracking-tight leading-none mb-2">Central Node Command</h2>
                            <div className="flex items-center gap-4">
                               <div className="flex items-center gap-2 px-3 py-1 bg-agro-500/10 rounded-lg border border-agro-500/20">
                                  <div className="w-1.5 h-1.5 bg-agro-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                                  <span className="text-[9px] text-agro-400 font-black uppercase tracking-[0.4em]">LIVE_STREAM_NOMINAL</span>
                               </div>
                               <div className="flex -space-x-2">
                                  {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-earth-950 bg-earth-800 flex items-center justify-center text-[8px] font-bold text-earth-400">P{i}</div>)}
                               </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 relative z-10">
                        <button className="p-4 bg-white/5 hover:bg-agro-500/10 rounded-2xl transition-all border border-white/5 text-earth-500 hover:text-white shadow-xl group/btn">
                           <Search size={20} className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                        <button className="p-4 bg-white/5 hover:bg-agro-500/10 rounded-2xl transition-all border border-white/5 text-earth-500 hover:text-white shadow-xl group/btn">
                           <Share2 size={20} className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                        <button className="p-4 bg-agro-600 hover:bg-agro-500 rounded-2xl transition-all border border-agro-400/20 text-white shadow-glow-green group/btn">
                           <Maximize2 size={20} className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Secure Log Stream */}
                <div className="flex-1 overflow-y-auto p-10 space-y-10 bg-gradient-to-b from-transparent to-black/20 ea-scroll-area scroll-smooth">
                    {messages.map((msg, idx) => {
                        const activeThrust = msg.role === 'model' ? detectThrust(msg.text) : null;
                        const thrustInfo = activeThrust ? THRUST_MAP.find(t => t.id === activeThrust) : null;

                        return (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-6 duration-700`}>
                                <div className={`flex gap-6 max-w-[90%] lg:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-14 h-14 rounded-[1.8rem] flex items-center justify-center shrink-0 shadow-strategic border-2 transition-all duration-500 group ${msg.role === 'user' ? 'bg-earth-900 border-earth-700 text-white' : 'bg-gradient-to-br from-agro-600 to-agro-800 border-agro-400/50 text-white shadow-glow-green'}`}>
                                        {msg.role === 'user' ? <User size={26} /> : <Bot size={26} className="group-hover:rotate-12 transition-transform" />}
                                    </div>

                                    <div className={`flex flex-col gap-3 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`p-8 rounded-[3rem] shadow-strategic leading-relaxed text-lg md:text-xl font-medium transition-all duration-700 ring-1 ring-white/10 relative overflow-hidden group ${
                                            msg.role === 'user' 
                                            ? 'bg-earth-900/90 text-white rounded-tr-none border border-earth-700' 
                                            : 'bg-white/5 dark:bg-white/5 text-white rounded-tl-none border border-white/10 backdrop-blur-3xl'
                                        }`}>
                                            {msg.role === 'model' && (
                                                <div className="absolute top-0 left-0 w-1 h-full bg-agro-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            )}
                                            <div className="relative z-10 whitespace-pre-wrap">
                                                {msg.text || (isLoading && idx === messages.length - 1 ? (
                                                    <div className="flex items-center gap-6 text-agro-500 py-2">
                                                        <Loader2 className="animate-spin" size={24} />
                                                        <span className="text-[11px] font-black uppercase tracking-[0.6em] animate-pulse">EXECUTING_LOGIC_GATE...</span>
                                                    </div>
                                                ) : '')}
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-4 px-2">
                                            {thrustInfo && (
                                                <div className="flex items-center gap-3 px-5 py-2 bg-agro-500/10 rounded-full border border-agro-500/20 w-fit animate-in zoom-in duration-500">
                                                    <span className="text-[9px] font-black text-agro-400 uppercase tracking-widest flex items-center gap-2">
                                                        <Sparkles size={12} fill="currentColor" /> {thrustInfo.label} Context
                                                    </span>
                                                </div>
                                            )}
                                            <span className="text-[9px] text-earth-600 font-bold uppercase tracking-widest">
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* Uplink Deck */}
                <div className="p-8 lg:p-10 bg-black/60 border-t border-white/10 shrink-0">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-wrap gap-3 justify-center mb-8">
                            {SUGGESTIONS.map((hint, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(hint)}
                                    disabled={isLoading}
                                    className="text-[9px] font-black uppercase tracking-[0.2em] bg-white/5 text-earth-500 hover:text-white border border-white/10 hover:border-agro-500/50 px-6 py-3 rounded-xl transition-all shadow-xl active:scale-95 hover:bg-agro-600/10"
                                >
                                    {hint}
                                </button>
                            ))}
                        </div>

                        <div className="relative group">
                            <div className="relative flex items-center bg-white/5 rounded-[2.5rem] border border-white/10 focus-within:border-agro-500 focus-within:ring-8 focus-within:ring-agro-500/5 transition-all shadow-inner overflow-hidden">
                                <div className="absolute left-0 w-2 h-full bg-agro-600 opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                                
                                <div className="flex items-center gap-4 pl-8">
                                    <button className="p-3 text-earth-500 hover:text-white transition-colors"><Processor size={22}/></button>
                                </div>

                                <input 
                                    type="text" 
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Input strategic command..."
                                    className="w-full bg-transparent px-6 py-7 focus:outline-none text-white placeholder-earth-700 font-bold text-xl"
                                    disabled={isLoading}
                                />

                                <div className="flex items-center gap-3 pr-4">
                                    <button className="p-4 text-earth-500 hover:text-white transition-colors bg-white/5 rounded-2xl border border-white/5"><ImageIcon size={22}/></button>
                                    <button className="p-4 text-earth-500 hover:text-white transition-colors bg-white/5 rounded-2xl border border-white/5"><Mic size={22}/></button>
                                    <button 
                                        onClick={() => handleSend()}
                                        disabled={isLoading || !input.trim()}
                                        className="p-5 bg-agro-600 text-white rounded-[1.8rem] hover:bg-agro-500 disabled:opacity-30 transition-all shadow-glow-green active:scale-95 group/btn border border-agro-400/50"
                                    >
                                        {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center gap-12 text-[9px] font-black text-earth-600 uppercase tracking-[0.5em]">
                            <span className="flex items-center gap-2"><FileText size={14}/> Log Exports Ready</span>
                            <span className="flex items-center gap-2"><Globe size={14}/> Network Edge Primed</span>
                            <span className="flex items-center gap-2"><Zap size={14}/> Thrust Sync 99.4%</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
  );
};

export default AiAdvisor;
