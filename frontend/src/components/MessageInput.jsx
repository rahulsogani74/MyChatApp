// frontend/components/MessageInput.jsx
import React, { useState } from 'react'

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState('')

  const handleSend = () => {
    onSend(text)
    setText('')
  }

  return (
    <div className="input-area">
      <input
        type="text"
        value={text}
        placeholder="Type a message..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  )
}

export default MessageInput
