import React from 'react';

const Sidebar = () => {
  const users = ['Rahul', 'Priya', 'Aman', 'Meena', 'Karan'];

  return (
    <aside className="sidebar">
      <h2>Active Chats</h2>
      <ul>
        {users.map((user, i) => (
          <li key={i} className="user">
            <span className="avatar">{user[0]}</span>
            <span>{user}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
