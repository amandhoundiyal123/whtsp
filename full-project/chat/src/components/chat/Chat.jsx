import "./chat.css";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import socket from "../../lib/socket";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const API = `${BASE_URL}/api`;

const Chat = ({ currentUser, selectedUser }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const endRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load message history when a chat is selected
  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/messages/${selectedUser._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    };

    fetchMessages();
  }, [selectedUser]);

  // Listen for incoming real-time messages
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      // Only add if it's from the currently open chat
      if (selectedUser && message.senderId === selectedUser._id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [selectedUser]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleSend = async () => {
    if (!text.trim() || !selectedUser) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverId: selectedUser._id,
          text,
        }),
      });

      const message = await res.json();

      // Add to local state immediately (optimistic update)
      setMessages((prev) => [...prev, message]);

      // Emit via socket so receiver gets it in real-time
      socket.emit("sendMessage", {
        receiverId: selectedUser._id,
        message,
      });

      setText("");
    } catch {
      console.error("Failed to send message");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!selectedUser) {
    return (
      <div className="chat" style={{ alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#a5a5a5" }}>Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={selectedUser.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{selectedUser.username}</span>
            <p>online</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>

      <div className="center">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`message ${msg.senderId === currentUser._id ? "own" : ""}`}
          >
            {msg.senderId !== currentUser._id && (
              <img src={selectedUser.avatar || "./avatar.png"} alt="" />
            )}
            <div className="texts">
              {msg.img && <img src={msg.img} alt="" />}
              {msg.text && <p>{msg.text}</p>}
              <span>{formatTime(msg.createdAt)}</span>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Type a message ..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
