import React, { useEffect, useState } from "react";
import axios from "axios";
import UserList from "../components/UserList";
import ChatBox from "../components/ChatBox";

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await axios.get("/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUser(res.data);
    };

    const fetchUsers = async () => {
      const res = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    };

    fetchCurrentUser();
    fetchUsers();
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <UserList
        users={users}
        selectUser={setSelectedUser}
        selectedUser={selectedUser}
      />
      {selectedUser && currentUser && (
        <ChatBox selectedUser={selectedUser} currentUser={currentUser} />
      )}
    </div>
  );
};

export default ChatPage;
