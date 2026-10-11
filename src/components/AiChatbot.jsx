'use client';
import React, { useState, useEffect, useRef } from 'react';

// Robust fallback intents in case Sanity database is empty or offline
const DEFAULT_INTENTS = [
  {
    intent: "skills",
    userQuestions: ["skills", "expertise", "tech stack", "technologies", "what do you use", "what stack", "what coding languages"],
    botResponse: "Tanuj specializes in Full Stack Development & AI integrations. His core stack includes React, Next.js, Node.js, Express, TypeScript, MongoDB, and PostgreSQL. He also builds custom AI agent workflows, RAG pipelines, and vector store structures."
  },
  {
    intent: "experience",
    userQuestions: ["experience", "work history", "how many years", "work experience", "resume"],
    botResponse: "Tanuj has 4+ years of professional engineering experience building production-ready SaaS platforms, scalable APIs, and intelligent product workflows. Feel free to download his resume directly from the About page!"
  },
  {
    intent: "contact",
    userQuestions: ["contact", "email", "get in touch", "hire", "phone", "reach out", "socials"],
    botResponse: "You can get in touch with Tanuj using the contact form at the bottom of the page, or connect with him directly via LinkedIn. He's always excited to chat about freelance builds, AI consultancy, or full-stack positions!"
  },
  {
    intent: "projects",
    userQuestions: ["projects", "what have you built", "show projects", "portfolio", "work"],
    botResponse: "Tanuj has built several high-performance SaaS applications and AI platforms. You can browse through them on the Projects page of this portfolio, which features active links, core codebases, and architectural details."
  },
  {
    intent: "greeting",
    userQuestions: ["hi", "hello", "hey", "greetings", "yo", "sup"],
    botResponse: "Hello! I am Tanuj's AI Assistant. Ask me anything about his expertise, background, or top projects, and I will be happy to help!"
  }
];

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [intents, setIntents] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [suggestions, setSuggestions] = useState([
    "Core Skills",
    "Work Experience",
    "Top Projects",
    "Get in Touch"
  ]);
  const [isMinimized, setIsMinimized] = useState(true);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch intents from Sanity API and merge with defaults
  useEffect(() => {
    fetch('/api/chatbot')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setIntents([...data, ...DEFAULT_INTENTS]);
        } else {
          setIntents(DEFAULT_INTENTS);
        }
      })
      .catch(err => {
        console.error("Error loading chatbot data:", err);
        setIntents(DEFAULT_INTENTS);
      });
  }, []);

  useEffect(() => {
    if (!isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isMinimized]);

  // Handle typing suggestions
  const generateSuggestions = (inputValue) => {
    if (!inputValue.trim()) {
      setSuggestions([
        "Core Skills",
        "Work Experience",
        "Top Projects",
        "Get in Touch"
      ]);
      return;
    }

    const matchingSuggestions = [];
    intents.forEach(intent => {
      intent.userQuestions?.forEach(question => {
        if (
          question.toLowerCase().includes(inputValue.toLowerCase()) && 
          !matchingSuggestions.includes(question)
        ) {
          matchingSuggestions.push(question);
        }
      });
    });

    if (matchingSuggestions.length > 0) {
      setSuggestions(matchingSuggestions.slice(0, 4));
    } else {
      setSuggestions([
        "Core Skills",
        "Work Experience"
      ]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    generateSuggestions(value);
    setShowSuggestions(true);
  };

  const handleSend = (messageText = null) => {
    const text = (messageText || input).trim();
    if (!text || isLoading) return;

    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    setShowSuggestions(false);
    setIsLoading(true);

    fetch('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: text,
        history: messages
      })
    })
    .then(res => res.json())
    .then(data => {
      const reply = data.response || "I am having trouble processing this message right now.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      setIsLoading(false);
      if (isMinimized) setHasNewMessage(true);
    })
    .catch(err => {
      console.error("Chat error:", err);
      setMessages(prev => [...prev, { role: "assistant", content: "Apologies, my intelligence core went offline. Please try again! ⚡" }]);
      setIsLoading(false);
    });
  };

  // Reset to default suggestions on input focus
  const handleFocus = () => {
    generateSuggestions(input);
    setShowSuggestions(true);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-8 right-8 z-[100]">
        <button
          onClick={() => { setIsMinimized(false); setHasNewMessage(false); }}
          className="w-16 h-16 bg-accent-primary text-white rounded-2xl shadow-ambient flex items-center justify-center group hover:scale-110 hover:brightness-110 transition-all duration-500 relative active:scale-95"
          aria-label="Open Chatbot"
        >
          {/* Pulse Ring Overlay */}
          <div className="absolute inset-0 rounded-2xl border-2 border-accent-primary animate-ping opacity-30"></div>
          
          <svg className="w-7 h-7 text-white font-bold group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          {hasNewMessage && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-white text-[9px] text-accent-primary font-black items-center justify-center">1</span>
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-[calc(100vw-2rem)] sm:w-[380px] bg-canvas/95 border border-border-subtle rounded-[2rem] shadow-ambient z-[100] overflow-hidden flex flex-col h-[520px] md:h-[620px] backdrop-blur-2xl transition-all duration-500">
      
      {/* Header bar */}
      <div className="px-6 py-5 bg-white/5 border-b border-border-subtle flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-live opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-status-live"></span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-text-primary uppercase tracking-[0.25em]">Tanuj's Assistant</span>
            <span className="text-[7px] font-mono text-text-dim uppercase tracking-widest">Sys_Status: Active // Lat: 12ms</span>
          </div>
        </div>
        <button 
          onClick={() => setIsMinimized(true)} 
          className="w-8 h-8 rounded-full border border-border-subtle bg-white/5 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/10 transition-colors"
          aria-label="Minimize Chatbot"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Message space */}
      <div className="flex-grow overflow-y-auto px-6 py-6 space-y-6" id="chat-messages">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 px-4 my-auto">
            <div className="w-12 h-12 rounded-2xl bg-accent-primary flex items-center justify-center text-white font-black text-base shadow-ambient">
              AI
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-black text-text-primary uppercase tracking-widest">Initialize Assistant</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Welcome! Ask me anything about Tanuj's skillset, portfolio projects, or professional background.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] px-5 py-3 rounded-2xl text-[13.5px] font-normal leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-accent-primary text-white rounded-tr-none shadow-card font-sans' 
                    : 'bg-surface-elevated border border-border-subtle text-text-primary rounded-tl-none font-sans'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex items-center gap-2 text-[10px] font-mono text-accent-primary uppercase tracking-widest">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-primary"></span>
            </span>
            Compiling Response...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input panel & suggestions */}
      <div className="p-6 bg-white/2 border-t border-border-subtle space-y-4">
        {showSuggestions && suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto">
            {suggestions.map((s, i) => (
              <button 
                key={i} 
                onClick={() => { setInput(""); handleSend(s); }} 
                className="px-3.5 py-1.5 bg-surface-card border border-border-subtle text-[9px] text-text-dim font-mono uppercase tracking-wider rounded-full hover:bg-accent-primary/10 hover:text-accent-primary hover:border-accent-primary/30 transition-all active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <div className="relative flex items-center w-full">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="w-full h-12 bg-surface-card border border-border-subtle rounded-full px-6 pr-14 text-[13.5px] text-text-primary placeholder:text-text-dim/60 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/40 transition-all font-sans"
          />
          <button 
            onClick={() => handleSend()} 
            className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square bg-accent-primary text-white hover:brightness-110 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-ambient"
            aria-label="Send Message"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 7-7 7 7M12 19V5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;