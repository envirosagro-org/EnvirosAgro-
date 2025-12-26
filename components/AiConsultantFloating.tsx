import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Loader2, Sparkles, MessageSquare, ArrowRight, Minimize2, Maximize2, Zap, BrainCircuit, ExternalLink } from 'lucide-react';
import { createAgroChat, sendMessageStream } from '../services/gemini';
import { ChatMessage } from '../types';
import { GenerateContentResponse, Chat } from "@google/genai";

interface AiConsultantFloatingProps {
    onOpenFull?: () => void;
}

export const AiConsultantFloating: React.FC<AiConsultantFloatingProps> = ({ onOpenFull }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hello! I am your EnvirosAgro AI Assistant. How can I help you advance your sustainable farming goals today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatInstance = useRef<Chat | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chatInstance.current) {
      chatInstance.current = createAgroChat();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (overrideText?: string) => {
    const messageText = overrideText || input;
    if (!messageText.trim() || !chatInstance.current || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: messageText, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const modelPlaceholder: ChatMessage = { role: 'model', text: '', timestamp: new Date() };
      setMessages(prev => [...prev, modelPlaceholder]);

      const stream = await sendMessageStream(chatInstance.current, messageText);
      let fullResponse = '';

      for await (const chunk of stream) {
        const response = chunk as GenerateContentResponse;
        const text = response.text();
        if (text) {
          fullResponse += text;
          setMessages(prev => {
            const next = [...prev];
            next[next.length - 1] = { ...next[next.length - 1], text: fullResponse };
            return next;
          });
        }
      }
    } catch (error) {
      console.error("Consultant Error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "I encountered a synchronization error. Please try again in a moment.", 
        timestamp: new Date() 
      }]);
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

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[60] bg-agro-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group border-4 border-white dark:border-earth-800"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
        <BrainCircuit size={28} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute right-full mr-4 bg-white text-agro-900 px-4 py-2 rounded-xl text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-earth-100">
          AI Assistant Online
        </span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-[60] flex flex-col transition-all duration-500 ease-out ${isMinimized ? 'h-16 w-64' : 'h-[600px] w-[400px] max-w-[90vw] max-h-[80vh]'}`}>
      <div className="bg-white dark:bg-earth-900 flex flex-col h-full rounded-[2rem] shadow-2xl border border-earth-100 dark:border-earth-800 overflow-hidden">
        
        {/* Header */}
        <div className="bg-agro-950 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-agro-500 p-2 rounded-xl">
              <Sparkles size={18} fill="white" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">AI Assistant</h3>
              <p className="text-[10px] text-agro-400 font-bold uppercase tracking-widest">Sustainability Expert</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button 
                onClick={() => { setIsOpen(false); onOpenFull?.(); }}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Open Full Interface"
            >
              <ExternalLink size={16} />
            </button>
            <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </button>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-earth-50/30 dark:bg-earth-950/20">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm border ${msg.role === 'user' ? 'bg-white text-earth-400 border-earth-200' : 'bg-agro-600 text-white border-agro-500'}`}>
                      {msg.role === 'user' ? <MessageSquare size={14} /> : <Bot size={14} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-agro-900 text-white rounded-tr-none' : 'bg-white dark:bg-earth-800 text-earth-800 dark:text-earth-100 shadow-sm border border-earth-100 dark:border-earth-700 rounded-tl-none'}`}>
                      {msg.text || (isLoading && i === messages.length - 1 ? <Loader2 size={18} className="animate-spin text-agro-600" /> : '')}
                    </div>
                  </div>
                </div>
              ))}
              {messages.length < 3 && !isLoading && (
                <div className="grid gap-2 pt-4">
                  <p className="text-[10px] font-black text-earth-400 uppercase tracking-widest px-2">Assistant Topics</p>
                  {["My soil resilience score", "Sustainable irrigation", "IA Thrust overview"].map((hint, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleSend(hint)}
                      className="text-left p-3 bg-white dark:bg-earth-800 hover:bg-agro-50 dark:hover:bg-agro-900/40 border border-earth-100 dark:border-earth-700 rounded-xl text-xs font-medium text-earth-600 dark:text-earth-400 transition-all flex items-center justify-between group"
                    >
                      {hint}
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-earth-900 border-t border-earth-100 dark:border-earth-800">
              <div className="relative flex items-center bg-earth-50 dark:bg-earth-800 rounded-2xl border border-earth-200 dark:border-earth-700 focus-within:ring-2 focus-within:ring-agro-500/20 transition-all">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask a question..."
                  className="w-full bg-transparent p-4 text-sm focus:outline-none dark:text-white"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="p-2 mr-2 bg-agro-600 text-white rounded-xl hover:bg-agro-700 disabled:opacity-50 transition-colors shadow-lg"
                >
                  {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
              </div>
              <div className="mt-3 flex items-center justify-center gap-4">
                <p className="text-[9px] text-earth-400 font-bold uppercase tracking-wider flex items-center gap-1">
                   <Zap size={10} fill="currentColor" className="text-amber-500" /> EnvirosAgro Trusted Intelligence
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};