'use client';
import React, { useState, useEffect, useRef } from 'react';

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

const renderInlineMarkdown = (text, keyPrefix = "in") => {
  const tokenRegex =
    /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\((?:https?:\/\/[^\s)]+|\/[^\s)]+|mailto:[^\s)]+)\)|https?:\/\/[^\s,)]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  let idx = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    const key = `${keyPrefix}-${idx++}`;

    if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(
        <strong key={key} className="font-semibold text-[#0F172A]">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code key={key} className="px-1.5 py-0.5 rounded bg-slate-100 text-[#5E6AD2] font-mono text-[12px]">
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("[")) {
      const m = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (m) {
        const [, label, href] = m;
        const isExternal = href.startsWith("http");
        parts.push(
          <a
            key={key}
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="text-[#5E6AD2] underline underline-offset-2 font-medium hover:text-[#4854B8]"
          >
            {label}
          </a>
        );
      } else {
        parts.push(token);
      }
    } else if (token.startsWith("http://") || token.startsWith("https://")) {
      parts.push(
        <a
          key={key}
          href={token}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#5E6AD2] underline underline-offset-2 font-medium break-all hover:text-[#4854B8]"
        >
          {token.replace(/^https?:\/\//, "")}
        </a>
      );
    } else if (token.includes("@")) {
      parts.push(
        <a
          key={key}
          href={`mailto:${token}`}
          className="text-[#5E6AD2] underline underline-offset-2 font-medium hover:text-[#4854B8]"
        >
          {token}
        </a>
      );
    } else {
      parts.push(token);
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

const FormattedMessage = ({ content }) => {
  const lines = String(content || "").split(/\r?\n/);
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }

    // Headings (#, ##, ###)
    const headingMatch = line.match(/^#{1,4}\s+(.+)$/);
    if (headingMatch) {
      blocks.push(
        <h4 key={`h-${i}`} className="font-grotesk font-bold text-[13.5px] text-[#0F172A] mt-2 first:mt-0 mb-1">
          {renderInlineMarkdown(headingMatch[1], `h-${i}`)}
        </h4>
      );
      i++;
      continue;
    }

    // Unordered list (*, -, •)
    if (/^[-*•]\s+/.test(line)) {
      const items = [];
      const start = i;
      while (i < lines.length && /^[-*•]\s+/.test(lines[i].trim())) {
        const itemText = lines[i].trim().replace(/^[-*•]\s+/, "");
        items.push(
          <li key={`li-${i}`} className="leading-relaxed">
            {renderInlineMarkdown(itemText, `ul-${i}`)}
          </li>
        );
        i++;
      }
      blocks.push(
        <ul key={`ul-${start}`} className="list-disc pl-4 space-y-1 my-1.5 marker:text-[#5E6AD2]">
          {items}
        </ul>
      );
      continue;
    }

    // Ordered list (1. 2. ...)
    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      const start = i;
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        const itemText = lines[i].trim().replace(/^\d+\.\s+/, "");
        items.push(
          <li key={`oli-${i}`} className="leading-relaxed">
            {renderInlineMarkdown(itemText, `ol-${i}`)}
          </li>
        );
        i++;
      }
      blocks.push(
        <ol key={`ol-${start}`} className="list-decimal pl-4 space-y-1 my-1.5 marker:text-[#5E6AD2] marker:font-semibold">
          {items}
        </ol>
      );
      continue;
    }

    // Normal paragraph
    blocks.push(
      <p key={`p-${i}`} className="leading-relaxed my-1.5 first:mt-0 last:mb-0">
        {renderInlineMarkdown(line, `p-${i}`)}
      </p>
    );
    i++;
  }

  return <div className="space-y-1">{blocks}</div>;
};

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [intents, setIntents] = useState(DEFAULT_INTENTS);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [suggestions, setSuggestions] = useState([
    "Core Skills",
    "Work Experience",
    "Top Projects",
    "Get in Touch"
  ]);
  const [isMinimized, setIsMinimized] = useState(true);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    fetch('/api/chatbot')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setIntents([...data, ...DEFAULT_INTENTS]);
        }
      })
      .catch(() => {
        setIntents(DEFAULT_INTENTS);
      });
  }, []);

  // Scroll only the internal chat container (never hijack page/Lenis scroll)
  useEffect(() => {
    if (!isMinimized && chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isLoading, isMinimized]);

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
      setSuggestions(["Core Skills", "Work Experience"]);
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

    const nextHistory = [...messages];
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    setShowSuggestions(false);
    setIsLoading(true);

    fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: text,
        history: nextHistory
      })
    })
      .then(res => res.json())
      .then(data => {
        const reply = data.response || "I am having trouble processing this message right now.";
        setMessages(prev => [...prev, { role: "assistant", content: reply }]);
        setIsLoading(false);
        if (isMinimized) setHasNewMessage(true);
      })
      .catch(() => {
        setMessages(prev => [
          ...prev,
          { role: "assistant", content: "Apologies, I could not reach the assistant right now. Please try again." }
        ]);
        setIsLoading(false);
      });
  };

  const handleFocus = () => {
    generateSuggestions(input);
    setShowSuggestions(true);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[110]">
        <button
          type="button"
          onClick={() => { setIsMinimized(false); setHasNewMessage(false); }}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-[#5E6AD2] hover:bg-[#4854B8] text-white rounded-2xl shadow-[0_12px_32px_rgba(94,106,210,0.42)] ring-2 ring-white/25 flex items-center justify-center group transition-all duration-200 relative active:scale-95 cursor-pointer"
          aria-label="Open Chatbot"
        >
          <span className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-[#5E6AD2] animate-ping opacity-25"></span>
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white transition-transform duration-200 group-hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          {hasNewMessage && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5">
              <span className="relative inline-flex rounded-full h-5 w-5 bg-white text-[10px] text-[#5E6AD2] font-bold items-center justify-center border-2 border-[#5E6AD2]">1</span>
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[390px] h-[min(560px,calc(100dvh-6rem))] bg-white border border-black/15 rounded-2xl shadow-[0_24px_64px_rgba(15,23,42,0.22)] z-[110] overflow-hidden flex flex-col"
      role="dialog"
      aria-label="Tanuj AI Assistant"
    >
      {/* Solid High-Contrast Header Bar */}
      <div className="px-5 py-4 bg-[#0F172A] text-white border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></span>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-grotesk font-bold text-white tracking-wide truncate">
              Tanuj&apos;s AI Assistant
            </span>
            <span className="text-[11px] font-mono text-slate-300 truncate">
              Online · Ask about projects or stack
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsMinimized(true)}
          className="w-8 h-8 rounded-lg border border-white/15 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
          aria-label="Close Chatbot"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Scrollable Message Space (Lenis-isolated) */}
      <div
        ref={chatBodyRef}
        data-lenis-prevent
        className="flex-1 overflow-y-auto px-5 py-5 space-y-4 bg-[#FAFAFB]"
        id="chat-messages"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-3 px-4">
            <div className="w-11 h-11 rounded-xl bg-[#5E6AD2] flex items-center justify-center text-white font-grotesk font-bold text-sm">
              AI
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-grotesk font-bold text-[#0F172A]">Ask Anything</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-[260px]">
                Ask about Tanuj&apos;s full-stack experience, shipped SaaS &amp; AI projects, or commercial templates.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[88%] px-4 py-2.5 rounded-2xl text-[13.5px] leading-relaxed font-sans ${
                  msg.role === 'user'
                    ? 'bg-[#5E6AD2] text-white rounded-tr-sm whitespace-pre-wrap'
                    : 'bg-white border border-black/[0.08] text-[#0F172A] rounded-tl-sm shadow-2xs'
                }`}
              >
                {msg.role === 'user' ? msg.content : <FormattedMessage content={msg.content} />}
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#5E6AD2]">
            <span className="w-2 h-2 rounded-full bg-[#5E6AD2] animate-pulse"></span>
            <span>Thinking...</span>
          </div>
        )}
      </div>

      {/* Input Panel & Suggestions */}
      <div className="p-4 bg-white border-t border-black/[0.08] space-y-3 shrink-0">
        {showSuggestions && suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 max-h-[72px] overflow-y-auto">
            {suggestions.map((s, i) => (
              <button
                type="button"
                key={i}
                onClick={() => { setInput(""); handleSend(s); }}
                className="px-3 py-1 bg-slate-50 border border-black/[0.08] text-[11px] text-slate-700 font-mono rounded-full hover:bg-[#5E6AD2]/10 hover:text-[#5E6AD2] hover:border-[#5E6AD2]/35 transition-colors cursor-pointer"
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
            className="w-full h-11 bg-slate-50 border border-black/10 rounded-full px-4 pr-12 text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#5E6AD2] transition-colors font-sans"
          />
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="absolute right-1.5 top-1.5 bottom-1.5 w-8 bg-[#0F172A] hover:bg-[#5E6AD2] disabled:opacity-40 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Send Message"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 7-7 7 7M12 19V5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
