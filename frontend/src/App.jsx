import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./components/Chat";

const App = () => {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  if (!user) {
    return showRegister ? (
      <>
        <Register />
        <p style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <button onClick={() => setShowRegister(false)}>Login</button>
        </p>
      </>
    ) : (
      <>
        <Login onLogin={setUser} />
        <p style={{ textAlign: "center" }}>
          Don't have an account?{" "}
          <button onClick={() => setShowRegister(true)}>Register</button>
        </p>
      </>
    );
  }

  return (
    <div className="App">
      {user ? <Chat user={user} /> : <Login onLogin={setUser} />}
    </div>
  );
};

export default App;
