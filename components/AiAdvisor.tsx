import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { createAgroChat, sendMessageStream } from '../services/gemini';
import { Send, Bot, User, Loader2, Sparkles, AlertCircle, MessageSquare } from 'lucide-react';
import { Chat, GenerateContentResponse } from "@google/genai";

const SUGGESTIONS = [
  "How do I improve soil pH naturally?",
  "Explain the Five Thrusts framework",
  "Organic pest control for coffee",
  "Water harvesting techniques",
  "Signs of nutrient deficiency in maize"
];

export const AiAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hello! I'm your EnvirosAgro Sustainability Consultant. Ask me anything about sustainable farming practices, crop health, or environmental impact reduction.",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatInstance = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat session once
  useEffect(() => {
    if (!chatInstance.current) {
      chatInstance.current = createAgroChat();
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || !chatInstance.current) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Optimistic model message for streaming
      const modelMsgId = Date.now().toString();
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
      console.error("Gemini Error:", err);
      setError("I'm having trouble connecting to the network right now. Please try again later.");
      // Remove the empty model message if it failed completely initially
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
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col p-4 md:p-6">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col h-full border border-earth-200">
            {/* Header */}
            <div className="bg-agro-900 text-white p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-2 rounded-lg">
                        <Sparkles className="text-agro-300" size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">EnvirosAgro Consultant</h2>
                        <p className="text-agro-200 text-xs">Powered by Gemini AI • Expert Mode</p>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-earth-50">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            
                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-earth-300' : 'bg-agro-600'}`}>
                                {msg.role === 'user' ? <User size={16} className="text-earth-700" /> : <Bot size={16} className="text-white" />}
                            </div>

                            {/* Bubble */}
                            <div className={`p-4 rounded-2xl shadow-sm ${
                                msg.role === 'user' 
                                ? 'bg-white text-earth-900 rounded-tr-none border border-earth-100' 
                                : 'bg-agro-50 text-agro-950 rounded-tl-none border border-agro-100'
                            }`}>
                                <div className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                                    {msg.text || (isLoading && idx === messages.length - 1 ? <Loader2 className="animate-spin text-agro-600" size={20}/> : '')}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {error && (
                    <div className="flex justify-center my-4">
                        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm flex items-center gap-2 border border-red-100">
                            <AlertCircle size={16} /> {error}
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-earth-100">
                <div className="relative flex items-center bg-earth-50 rounded-xl border border-earth-200 focus-within:border-agro-400 focus-within:ring-2 focus-within:ring-agro-100 transition-all">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Ask about pest control, soil pH, or sustainable crops..."
                        className="w-full bg-transparent px-4 py-4 focus:outline-none text-earth-900 placeholder-earth-400"
                        disabled={isLoading}
                    />
                    <button 
                        onClick={() => handleSend()}
                        disabled={isLoading || !input.trim()}
                        className="p-3 mr-2 text-agro-600 hover:bg-agro-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                    </button>
                </div>

                {/* Suggestions Chips */}
                <div className="mt-3 flex flex-wrap gap-2">
                    {SUGGESTIONS.map((suggestion, index) => (
                        <button
                            key={index}
                            onClick={() => handleSend(suggestion)}
                            disabled={isLoading}
                            className="text-xs font-medium bg-earth-50 text-earth-600 border border-earth-200 px-3 py-1.5 rounded-full hover:bg-agro-50 hover:text-agro-700 hover:border-agro-200 transition-all disabled:opacity-50 flex items-center gap-1"
                        >
                            <MessageSquare size={12} className="opacity-70" /> {suggestion}
                        </button>
                    ))}
                </div>

                <p className="text-center text-[10px] text-earth-400 mt-3">
                    AI can make mistakes. Please verify important agricultural decisions with a local expert.
                </p>
            </div>
        </div>
    </div>
  );
};