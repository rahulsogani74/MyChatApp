import React, { useState, useRef, useEffect } from 'react';

const ChatBox = ({ currentUser }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { sender: 'Rahul', receiver: 'Priya', text: 'Hey Priya!' },
    { sender: 'Priya', receiver: 'Rahul', text: 'Hi Rahul!' },
  ]);

  const chatEndRef = useRef(null);

  const sendMessage = () => {
    if (message.trim()) {
      const receiver = currentUser === 'Rahul' ? 'Priya' : 'Rahul';
      setChat([...chat, { sender: currentUser, receiver, text: message }]);
      setMessage('');
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const filteredChat = chat.filter(
    (msg) =>
      (msg.sender === currentUser || msg.receiver === currentUser)
  );

  return (
    <div className="chatbox">
      <div className="messages">
        {filteredChat.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.sender === currentUser ? 'sent' : 'received'}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Type your message…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>📤</button>
      </div>
    </div>
  );
};

export default ChatBox;
