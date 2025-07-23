import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatBox = ({ selectedUser, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const fetchMessages = async () => {
    if (!selectedUser) return;
    const token = localStorage.getItem("token");
    const res = await axios.get(`/api/messages/${selectedUser._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages(res.data);
  };

  const sendMessage = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      "/api/messages",
      { receiver: selectedUser._id, text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setText("");
    fetchMessages();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 3000); // fetch every 3 sec
    return () => clearInterval(interval);
  }, [selectedUser]);

  useEffect(() => {
    fetchMessages();
  }, [selectedUser]);

  return (
    <div className="chat-box">
      <h3>Chat with {selectedUser?.name}</h3>
      <div
        className="messages"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        {messages.map((msg) => (
          <div
            key={msg._id}
            style={{
              textAlign: msg.sender === currentUser._id ? "right" : "left",
              marginBottom: "5px",
            }}
          >
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={text}
          placeholder="Type a message"
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
