import React, { useEffect, useState } from "react";
import axios from "axios";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import UserRegistration from "./components/UserRegistration";

export default function App() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/messages").then((res) => {
      setChat(res.data);
    });
  }, []);

  const register = async () => {
    const res = await axios.post("http://localhost:5000/api/users", {
      username,
    });
    setUserId(res.data._id);
  };

  const sendMessage = async () => {
    const res = await axios.post("http://localhost:5000/api/messages", {
      sender: userId,
      content: message,
    });
    setChat((prev) => [...prev, res.data]);
    setMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      {!userId ? (
        <UserRegistration
          username={username}
          setUsername={setUsername}
          register={register}
        />
      ) : (
        <div>
          <h2>Welcome {username}</h2>
          <ChatWindow chat={chat} />
          <MessageInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      )}
    </div>
  );
}
