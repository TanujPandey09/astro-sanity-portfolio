'use client';
import React, { useState, useEffect, useRef } from 'react';
import { getChatbotData } from '../lib/sanityClient';

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [intents, setIntents] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isMinimized, setIsMinimized] = useState(true);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    getChatbotData().then(setIntents);
  }, []);

  useEffect(() => {
    if (!isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isMinimized]);

  const generateSuggestions = (inputValue) => {
    if (!inputValue.trim()) {
      setSuggestions(["Architecture", "Experience", "Contact Intel", "Frameworks"]);
      return;
    }
    const matchingSuggestions = [];
    intents.forEach(intent => {
      intent.userQuestions?.forEach(question => {
        if (question.toLowerCase().includes(inputValue.toLowerCase()) && !matchingSuggestions.includes(question)) {
          matchingSuggestions.push(question);
        }
      });
    });
    setSuggestions(matchingSuggestions.slice(0, 4));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value.trim()) {
      generateSuggestions(value);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSend = (messageText = null) => {
    const text = messageText || input;
    if (!text.trim() || isLoading) return;

    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    setShowSuggestions(false);
    setIsLoading(true);

    setTimeout(() => {
      const matched = intents.find(intent =>
        intent.userQuestions?.some(q => text.toLowerCase().includes(q.toLowerCase()))
      );

      const response = matched ? matched.botResponse : "I'm processing this frequency but it's unclear. Can you rephrase the request? 🤔";

      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsLoading(false);
      if (isMinimized) setHasNewMessage(true);
    }, 1000);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-8 right-8 z-[100]">
        <button
          onClick={() => { setIsMinimized(false); setHasNewMessage(false); }}
          className="w-16 h-16 bg-[#599692] text-white rounded-2xl shadow-2xl flex items-center justify-center group hover:scale-110 transition-all duration-500 relative"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          {hasNewMessage && <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full animate-bounce"></div>}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 w-96 bg-[#11172a] border border-white/10 rounded-[2.5rem] shadow-2xl z-[100] overflow-hidden flex flex-col h-[600px] backdrop-blur-3xl">
      <div className="p-8 bg-white/5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-[#599692] animate-pulse"></div>
          <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Neural Link Beta</span>
        </div>
        <button onClick={() => setIsMinimized(true)} className="text-[#626c7d] hover:text-white transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-6 rounded-[2rem] text-[13px] font-medium leading-relaxed italic ${msg.role === 'user' ? 'bg-[#599692] text-white' : 'bg-white/5 text-[#dfe5ec]'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-[10px] font-black text-[#599692] uppercase tracking-widest animate-pulse">Syncing...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-8 space-y-6">
        {showSuggestions && suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => { setInput(s); handleSend(s); }} className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] text-[#626c7d] font-black uppercase tracking-widest rounded-full hover:bg-white/10 hover:text-white transition-all">
                {s}
              </button>
            ))}
          </div>
        )}
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Input Frequency..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-8 text-[13px] text-white placeholder-white/20 focus:outline-none focus:border-[#599692] transition-all italic"
          />
          <button onClick={() => handleSend()} className="absolute right-2 top-2 bottom-2 aspect-square bg-white rounded-full flex items-center justify-center text-black hover:bg-[#599692] hover:text-white transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="m5 12 7-7 7 7M12 19V5" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;