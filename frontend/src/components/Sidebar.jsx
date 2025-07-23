// frontend/components/Sidebar.jsx
import React from 'react'

const users = ['Rahul', 'Priya', 'Aman', 'Simran']

const Sidebar = ({ onSelectUser }) => {
  return (
    <div className="sidebar">
      <h2>Chats</h2>
      <ul>
        {users.map(user => (
          <li key={user} style={{ cursor: 'pointer', marginBottom: '10px' }} onClick={() => onSelectUser(user)}>
            {user}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
