import AddUser from "./addUser/addUser";
import "./chatList.css";
import { useState, useEffect } from "react";
import socket from "../../../lib/socket";

const ChatList = ({ currentUser, selectedUser, setSelectedUser }) => {
  const [addMode, setAddMode] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Track who is online via socket
  useEffect(() => {
    socket.on("onlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });
    return () => socket.off("onlineUsers");
  }, []);

  const addContact = (user) => {
    // Prevent duplicates
    setContacts((prev) =>
      prev.find((c) => c._id === user._id) ? prev : [user, ...prev]
    );
    setAddMode(false);
    setSelectedUser(user);
  };

  const filtered = contacts.filter((c) =>
    c.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>

      {filtered.length === 0 && (
        <p style={{ color: "#a5a5a5", padding: "20px", fontSize: "14px" }}>
          No contacts yet. Click + to add someone.
        </p>
      )}

      {filtered.map((user) => (
        <div
          key={user._id}
          className="item"
          onClick={() => setSelectedUser(user)}
          style={{
            background:
              selectedUser?._id === user._id
                ? "rgba(81,131,254,0.15)"
                : "transparent",
          }}
        >
          <img src={user.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{user.username}</span>
            <p>{onlineUsers.includes(user._id) ? "🟢 online" : "offline"}</p>
          </div>
        </div>
      ))}

      {addMode && (
        <AddUser currentUser={currentUser} onAdd={addContact} />
      )}
    </div>
  );
};

export default ChatList;
