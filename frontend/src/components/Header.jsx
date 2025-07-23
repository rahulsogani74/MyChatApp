import React from 'react';

const Header = ({ user }) => {
  return (
    <header className="header">
      <h1>💬 MyChatApp</h1>
      <span className="logged-in">👤 {user}</span>
    </header>
  );
};

export default Header;
