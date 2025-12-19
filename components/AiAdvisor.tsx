
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { createAgroChat, sendMessageStream } from '../services/gemini';
import { 
  Send, Bot, User, Loader2, Sparkles, AlertCircle, MessageSquare, 
  BrainCircuit, ShieldCheck, Zap, Layers, Users, Leaf, Cpu, Factory 
} from 'lucide-react';
import { Chat, GenerateContentResponse } from "@google/genai";

const SUGGESTIONS = [
  "How do I improve soil pH naturally?",
  "Calculate my m(t) resilience score",
  "Organic pest control for coffee",
  "Explain the IA Thrust benefits"
];

const THRUST_MAP = [
  { id: 'SA', icon: <Users size={12} />, label: 'Social' },
  { id: 'EA', icon: <Leaf size={12} />, label: 'Env' },
  { id: 'HA', icon: <ShieldCheck size={12} />, label: 'Health' },
  { id: 'TA', icon: <Cpu size={12} />, label: 'Tech' },
  { id: 'IA', icon: <Layers size={12} />, label: 'Ind' }
];

export const AiAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Greetings! I am the EnvirosAgro AI Assistant. I'm calibrated to the Five Thrusts framework. What agricultural stability metrics shall we optimize today?",
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

  // Simple heuristic to "detect" the thrust being discussed
  const detectThrust = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes('social') || t.includes('community') || t.includes('si-d')) return 'SA';
    if (t.includes('soil') || t.includes('water') || t.includes('environmental')) return 'EA';
    if (t.includes('pest') || t.includes('disease') || t.includes('health') || t.includes('pathogen')) return 'HA';
    if (t.includes('tech') || t.includes('ai') || t.includes('precision') || t.includes('data')) return 'TA';
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
                  const newMessages = [...prev];
                  const lastMsg = newMessages[newMessages.length - 1];
                  if (lastMsg.role === 'model') {
                      lastMsg.text = fullText;
                  }
                  return newMessages;
              });
          }
      }

    } catch (err) {
      console.error("Assistant Error:", err);
      setError("Network synchronization error. Please try again.");
      setMessages(prev => prev.filter(m => m.text !== ''));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-160px)] flex flex-col p-4 md:p-6 gap-6 relative">
        {/* Background Formula Trace */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
            <span className="text-[20vw] font-black italic">m(t)</span>
        </div>

        <div className="flex flex-col md:flex-row gap-6 h-full relative z-10">
            
            {/* Context Sidebar */}
            <div className="hidden lg:flex flex-col w-80 gap-6">
                <div className="bg-white dark:bg-earth-900 p-6 rounded-3xl border border-earth-100 dark:border-earth-800 shadow-sm">
                    <h3 className="font-bold text-earth-900 dark:text-white mb-4 flex items-center gap-2">
                        <ShieldCheck className="text-agro-600" size={18} /> Diagnostic Engine
                    </h3>
                    <p className="text-xs text-earth-600 dark:text-earth-400 leading-relaxed mb-6">
                        Optimizing regional resilience through steady-state adaptive modeling.
                    </p>
                    <div className="space-y-4">
                        {THRUST_MAP.map(t => (
                            <div key={t.id} className="flex items-center justify-between group">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-lg bg-earth-50 dark:bg-earth-800 flex items-center justify-center text-earth-400 group-hover:text-agro-600 transition-colors">
                                        {t.icon}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-earth-500">{t.label}</span>
                                </div>
                                <div className="h-1 flex-1 mx-3 bg-earth-100 dark:bg-earth-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-agro-500 w-[60%] opacity-20"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-agro-950 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
                    <BrainCircuit size={100} className="absolute -bottom-10 -right-10 opacity-10" />
                    <h4 className="font-bold text-sm mb-2 relative z-10">Steady-State Logic</h4>
                    <p className="text-xs text-agro-200 relative z-10 leading-relaxed">
                        Calculations prioritized by $Dn$ and $In$ variables to maximize $m(t)$ efficiency.
                    </p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-white dark:bg-earth-900 rounded-[2.5rem] shadow-xl overflow-hidden flex flex-col border border-earth-100 dark:border-earth-800">
                {/* Header */}
                <div className="bg-agro-950 text-white p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-agro-500 p-2.5 rounded-2xl shadow-lg ring-4 ring-white/5">
                            <Zap className="text-white" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Unified Intel Hub</h2>
                            <p className="text-agro-300 text-[10px] font-black uppercase tracking-[0.2em]">Framework Synchronization Mode</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-bold text-agro-400 uppercase tracking-widest">Resilience: 8.54 m(t)</span>
                    </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-earth-50/30 dark:bg-earth-950/30 custom-scrollbar">
                    {messages.map((msg, idx) => {
                        const activeThrust = msg.role === 'model' ? detectThrust(msg.text) : null;
                        const thrustInfo = activeThrust ? THRUST_MAP.find(t => t.id === activeThrust) : null;

                        return (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                <div className={`flex gap-4 max-w-[85%] md:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border ${msg.role === 'user' ? 'bg-white dark:bg-earth-800 text-earth-400 border-earth-200' : 'bg-agro-600 text-white border-agro-500'}`}>
                                        {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <div className={`p-5 rounded-[2rem] shadow-sm leading-relaxed text-sm md:text-base ${
                                            msg.role === 'user' 
                                            ? 'bg-agro-900 text-white rounded-tr-none' 
                                            : 'bg-white dark:bg-earth-800 text-earth-800 dark:text-earth-100 rounded-tl-none border border-earth-100 dark:border-earth-700'
                                        }`}>
                                            {msg.text || (isLoading && idx === messages.length - 1 ? (
                                                <div className="flex items-center gap-2 text-agro-600">
                                                    <Loader2 className="animate-spin" size={18} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest animate-pulse">Calculating Stability...</span>
                                                </div>
                                            ) : '')}
                                        </div>
                                        
                                        {thrustInfo && (
                                            <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-500">
                                                <div className="flex items-center gap-1.5 px-3 py-1 bg-agro-50 dark:bg-agro-900/40 text-agro-700 dark:text-agro-400 rounded-full border border-agro-100 dark:border-agro-800 text-[10px] font-black uppercase tracking-widest">
                                                    {thrustInfo.icon} {thrustInfo.label} Thrust Alignment
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {error && (
                        <div className="flex justify-center my-4">
                            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-red-100 dark:border-red-900/50">
                                <AlertCircle size={16} /> {error}
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Controls */}
                <div className="p-6 bg-white dark:bg-earth-900 border-t border-earth-100 dark:border-earth-800">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative flex items-center bg-earth-50 dark:bg-earth-800 rounded-2xl border border-earth-200 dark:border-earth-700 focus-within:ring-4 focus-within:ring-agro-500/10 transition-all">
                            <input 
                                type="text" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Query the framework (e.g. 'Optimize my EA scores')..."
                                className="w-full bg-transparent px-6 py-5 focus:outline-none text-earth-900 dark:text-white placeholder-earth-400"
                                disabled={isLoading}
                            />
                            <button 
                                onClick={() => handleSend()}
                                disabled={isLoading || !input.trim()}
                                className="p-3 mr-3 bg-agro-600 text-white rounded-xl hover:bg-agro-700 disabled:opacity-50 disabled:scale-95 transition-all shadow-lg shadow-agro-600/20"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
                            </button>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                            {SUGGESTIONS.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSend(suggestion)}
                                    disabled={isLoading}
                                    className="text-[10px] font-black uppercase tracking-widest bg-white dark:bg-earth-800 text-earth-500 dark:text-earth-400 border border-earth-100 dark:border-earth-700 px-3 py-2 rounded-full hover:bg-agro-50 dark:hover:bg-agro-900/40 hover:text-agro-700 transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm"
                                >
                                    <MessageSquare size={12} className="opacity-70" /> {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
