import "./addUser.css";
import { useState } from "react";

const API = (import.meta.env.VITE_BACKEND_URL || "http://localhost:5000") + "/api";

const AddUser = ({ onAdd }) => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${API}/users/search?username=${encodeURIComponent(query)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch {
      console.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">{loading ? "..." : "Search"}</button>
      </form>

      {results.length === 0 && query && !loading && (
        <p style={{ color: "#a5a5a5", marginTop: "20px", fontSize: "14px" }}>
          No users found.
        </p>
      )}

      {results.map((user) => (
        <div className="user" key={user._id}>
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={() => onAdd(user)}>Add User</button>
        </div>
      ))}
    </div>
  );
};

export default AddUser;
