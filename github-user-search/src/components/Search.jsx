import { useState } from "react";
import { searchUsers } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const data = await searchUsers({
        username,
        location,
        minRepos,
      });

      if (!data || data.length === 0) {
        setError("No results found");
      } else {
        setResults(data);
      }
    } catch (err) {
      setError("Looks like we cant find the user");
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form
        className="space-y-4 bg-white p-6 rounded-xl shadow"
        onSubmit={handleSearch}
      >
        <input
          id="username"
          type="text"
          placeholder="Enter GitHub username"
          className="w-full border rounded-lg p-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          id="location"
          type="text"
          placeholder="Location"
          className="w-full border rounded-lg p-3"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          id="minRepos"
          type="number"
          placeholder="Minimum repositories"
          className="w-full border rounded-lg p-3"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
        >
          Search
        </button>
      </form>

      {/* Loading */}
      {loading && (
        <p className="mt-4 text-center text-gray-600">Loading...</p>
      )}

      {/* Error */}
      {error && (
        <p className="mt-4 text-center text-red-600">{error}</p>
      )}

      {/* Results */}
      <div className="mt-6 space-y-4">
        {results.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-4 p-4 border rounded-lg shadow"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="font-bold">{user.login}</p>
              <a
                href={user.html_url}
                target="_blank"
                className="text-blue-600 underline"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
