import { useState } from "react";
import fetchUserData from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUserData(null);

    const result = await fetchUserData(username);

    if (result?.message === "Not Found" || result === null) {
      setError("Looks like we can not find the user");

    } else {
      setUserData(result);
    }

    setLoading(false);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {/* Search Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "10px", width: "250px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* User Data */}
      {userData && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={userData.avatar_url}
            alt={userData.login}
            width="120"
            style={{ borderRadius: "50%" }}
          />
          <h2>{userData.name || userData.login}</h2>

          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00aaff" }}
          >
            Visit GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default Search;
