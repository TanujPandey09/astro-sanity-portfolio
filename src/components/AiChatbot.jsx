import React, { useState } from 'react';
import axios from 'axios';

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = { role: "user", content: input };
  const updatedMessages = [...messages, userMessage]; // Update messages array directly
  setMessages(updatedMessages); // Update state for UI
  
  setInput(""); // Clear input field

  const MAX_RETRIES = 3;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: updatedMessages, // Use updated messages array
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.PUBLIC_OPENAI_API_KEY}`,
          }
        }
      );

      const botMessage = {
        role: "assistant",
        content: response.data.choices[0].message.content,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      return; // Exit the loop after a successful response
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.warn("Rate limit exceeded. Retrying...");
        attempt++;
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
      } else {
        console.error("Error communicating with OpenAI API:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: "An error occurred. Please try again later." },
        ]);
        return;
      }
    }
  }

  // If all retries fail
  setMessages((prevMessages) => [
    ...prevMessages,
    { role: "assistant", content: "Rate limit exceeded. Please try again later." },
  ]);
};

  
  return (
    <div className="chatbot-container" style={{ maxWidth: "400px", margin: "20px auto", border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
      <div className="chat-window" style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "10px", backgroundColor: "#f9f9f9", padding: "10px" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.role === "user" ? "right" : "left", margin: "5px 0" }}>
            <span style={{ display: "inline-block", padding: "8px 12px", borderRadius: "10px", backgroundColor: msg.role === "user" ? "#d1f4ff" : "#e8ffd1" }}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div className="chat-input" style={{ display: "flex" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          style={{ flex: "1", padding: "10px", border: "1px solid #ccc", borderRadius: "8px 0 0 8px", outline: "none" }}
        />
        <button
          onClick={handleSend}
          style={{ padding: "10px 15px", border: "none", borderRadius: "0 8px 8px 0", backgroundColor: "#007bff", color: "white", cursor: "pointer" }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChatbot;
