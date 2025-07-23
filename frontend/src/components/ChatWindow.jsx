// frontend/components/ChatWindow.jsx
import React, { useState } from 'react'
import MessageInput from './MessageInput.jsx'

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([
    { from: 'Rahul', text: 'Hey there!' },
    { from: 'You', text: 'Hello Rahul!' },
  ])

  const sendMessage = (text) => {
    if (text.trim() !== '') {
      setMessages([...messages, { from: 'You', text }])
    }
  }

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.from === 'You' ? 'sent' : 'received'}`}
          >
            <strong>{msg.from}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <MessageInput onSend={sendMessage} />
    </div>
  )
}

export default ChatWindow
