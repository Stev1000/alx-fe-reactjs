import { useState } from "react";
import { fetchUserData } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const data = await fetchUserData(username.trim());
      setUser(data);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "center", gap: "12px" }}
      >
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            border: "1px solid black",
            padding: "10px",
            width: "260px",
            color: "black",
            fontSize: "15px"
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 16px",
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "15px"
          }}
        >
          Search
        </button>
      </form>

      {/* Loading */}
      {loading && <p style={{ marginTop: "20px" }}>Loading...</p>}

      {/* Error */}
      {error && <p style={{ marginTop: "20px", color: "red" }}>{error}</p>}

      {/* User Result */}
      {user && (
        <div style={{ marginTop: "30px" }}>
          <img
            src={user.avatar_url}
            width={120}
            alt="avatar"
            style={{ borderRadius: "8px" }}
          />

          <h3 style={{ marginTop: "10px", fontSize: "20px" }}>{user.login}</h3>

          <a
            href={user.html_url}
            target="_blank"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
}
