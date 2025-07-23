import React, { useState, useEffect } from 'react';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('chat-user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <div>
      {user ? <Chat user={user} /> : <Login setUser={setUser} />}
    </div>
  );
}

export default App;
