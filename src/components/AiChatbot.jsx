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
  const [isMinimized, setIsMinimized] = useState(true); // Start minimized by default
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

  // Generate autosuggestions based on intents
  const generateSuggestions = (inputValue) => {
    if (!inputValue.trim()) {
      setSuggestions([
        "Hello",
        "How can you help me?",
        "Tell me more",
        "Contact information"
      ]);
      return;
    }

    const matchingSuggestions = [];
    intents.forEach(intent => {
      intent.userQuestions?.forEach(question => {
        if (question.toLowerCase().includes(inputValue.toLowerCase()) && 
            !matchingSuggestions.includes(question) &&
            matchingSuggestions.length < 4) {
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

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setShowSuggestions(false);
    setTimeout(() => handleSend(suggestion), 100);
  };

  const toggleChatbot = () => {
    setIsMinimized(!isMinimized);
    setHasNewMessage(false);
    if (!isMinimized) {
      // When minimizing, hide suggestions
      setShowSuggestions(false);
    }
  };

  const handleSend = (messageText = null) => {
    const messageToSend = messageText || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage = { role: "user", content: messageToSend };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput("");
    setShowSuggestions(false);
    setIsLoading(true);

    // Enhanced greeting responses
    const greetings = ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"];
    if (greetings.includes(messageToSend.toLowerCase().trim())) {
      const botMessage = {
        role: "assistant",
        content: "Hello! How are you doing today? I'm here to help you with anything you need! 😊",
      };
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, botMessage]);
        setIsLoading(false);
        if (isMinimized) setHasNewMessage(true);
      }, 800);
      return;
    }

    // Handle "how are you" responses
    const howAreYouQuestions = ["how are you", "how do you do", "what's up", "how's it going"];
    if (howAreYouQuestions.some(q => messageToSend.toLowerCase().includes(q))) {
      const botMessage = {
        role: "assistant",
        content: "I'm doing great, thank you for asking! I'm here and ready to assist you. What can I help you with today? 🚀",
      };
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, botMessage]);
        setIsLoading(false);
        if (isMinimized) setHasNewMessage(true);
      }, 800);
      return;
    }

    // Original intent matching logic
    setTimeout(() => {
      const matched = intents.find((intent) =>
        intent.userQuestions?.some((q) => {
          const userInput = messageToSend.toLowerCase().replace(/[^\w\s]/g, '');
          const question = q.toLowerCase().replace(/[^\w\s]/g, '');
          return userInput.includes(question) || question.includes(userInput);
        })
      );

      let response = "I'm sorry, I didn't quite understand that. Could you please try rephrasing your question? 🤔";

      if (matched) {
        response = matched.botResponse;
        if (matched.linkedBlog) {
          response += ` 👉 /blog/${matched.linkedBlog.slug.current}`;
        }
      }

      const botMessage = {
        role: "assistant",
        content: response,
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsLoading(false);
      if (isMinimized) setHasNewMessage(true);
    }, 800 + Math.random() * 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleInputFocus = () => {
    if (input.trim()) {
      generateSuggestions(input);
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      setShowSuggestions(false);
    }, 150);
  };

  // Minimized view
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleChatbot}
          className="relative w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          aria-label="Open chatbot"
        >
          {/* Chat Icon */}
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          
          {/* New message notification */}
          {hasNewMessage && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            </div>
          )}
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Click to open chat
            <div className="absolute top-full right-4 w-2 h-2 bg-gray-800 transform rotate-45 -mt-1"></div>
          </div>
        </button>
      </div>
    );
  }

  // Full chatbot view
  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-2xl rounded-xl border border-gray-200 overflow-hidden backdrop-blur-lg bg-white/95 z-50 animate-slideUp">
      {/* Enhanced Header with close button */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Chat With Me</h3>
              <p className="text-sm opacity-90">Online • Ready to help!</p>
            </div>
          </div>
          <button
            onClick={toggleChatbot}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            title="Close chat"
            aria-label="Close chatbot"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">👋</span>
            </div>
            <p className="font-medium">Hi! How can I help you today?</p>
            <p className="text-sm mt-1">Start typing to see suggestions...</p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-2xl text-sm shadow-sm ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
                  : "bg-white text-gray-800 rounded-bl-md border border-gray-100"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start animate-fadeIn">
            <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions Panel */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Suggestions:</p>
          <div className="flex flex-wrap gap-1">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1 bg-white text-gray-700 text-xs rounded-full border border-gray-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Input Section */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Type your message..."
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-50 transition-all duration-200"
            />
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg"
            aria-label="Send message"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AIChatbot;