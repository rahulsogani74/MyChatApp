import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username) return;

    try {
      const res = await axios.post('http://localhost:5000/api/login', { username });
      setUser(res.data.user); // set in App
      localStorage.setItem('chat-user', JSON.stringify(res.data.user));
    } catch (err) {
      alert('Login failed');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login to Chat</h2>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
