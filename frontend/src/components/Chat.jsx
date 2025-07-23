// src/components/Chat.jsx
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "./chat.css";

const socket = io("http://localhost:5000"); // adjust if deployed

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const chatBoxRef = useRef();

  // Fetch old messages from MongoDB
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch("http://localhost:5000/api/messages");
      const data = await res.json();
      setMessages(data);
    };
    fetchMessages();
  }, []);

  // Setup socket listener
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("receiveMessage");
  }, []);

  

  const handleSend = async () => {
    if (!newMsg.trim()) return;

    const message = {
      sender: user.username || user.email,
      receiver: "public",
      content: newMsg,
    };

    // Emit through socket
    socket.emit("sendMessage", message);

    // Save to MongoDB
    await fetch("http://localhost:5000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    setMessages([...messages, message]);
    setNewMsg("");

    // Scroll to bottom
    setTimeout(() => {
      chatBoxRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="chat-container">
      <h2>Welcome, {user.username || user.email}</h2>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${
              msg.sender === user.username || msg.sender === user.email
                ? "self"
                : ""
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
        <div ref={chatBoxRef}></div>
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
