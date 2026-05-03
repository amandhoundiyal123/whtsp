import { useState, useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import socket from "./lib/socket";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // On mount, check if user is already logged in
  useEffect(() => {
    const saved = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (saved && token) {
      const user = JSON.parse(saved);
      setCurrentUser(user);
      // Connect socket and register user as online
      socket.connect();
      socket.emit("register", user._id);
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    socket.connect();
    socket.emit("register", user._id);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    socket.disconnect();
    setCurrentUser(null);
    setSelectedUser(null);
  };

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List
            currentUser={currentUser}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
          <Chat
            currentUser={currentUser}
            selectedUser={selectedUser}
          />
          <Detail
            currentUser={currentUser}
            selectedUser={selectedUser}
            onLogout={handleLogout}
          />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
      <Notification />
    </div>
  );
};

export default App;
