// src/components/Chat.jsx
import React, { useState } from "react";
import "./chat.css";

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  const handleSend = () => {
    if (!newMsg.trim()) return;
    const message = { sender: user.username || user.email, text: newMsg };
    setMessages([...messages, message]);
    setNewMsg("");
  };

  return (
    <div className="chat-container">
      <h2>Welcome, {user.username || user.email}</h2>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender === user.username ? "self" : ""}`}>
            <strong>{msg.sender}: </strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
