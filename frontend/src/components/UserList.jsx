import React from "react";

const UserList = ({ users, selectUser, selectedUser }) => {
  return (
    <div className="user-list">
      <h3>Users</h3>
      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => selectUser(user)}
          style={{
            cursor: "pointer",
            fontWeight: selectedUser?._id === user._id ? "bold" : "normal",
            marginBottom: "5px",
          }}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;
