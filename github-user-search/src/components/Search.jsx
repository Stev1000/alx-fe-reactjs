import { useState } from "react";
import { searchUsers } from "../services/githubService";
import UserCard from "./UserCard";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    runSearch(1);
  };

  const runSearch = async (pageNum) => {
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const data = await searchUsers(
        username,
        location,
        minRepos,
        pageNum
      );

      if (!data.items || data.items.length === 0) {
        setError("No results found");
      } else {
        setResults(data.items);
      }
    } catch (err) {
      setError("Looks like we cant find the user");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5">
      <form onSubmit={handleSearch} className="space-y-4">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="text"
          placeholder="Location (e.g. Rwanda)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="number"
          placeholder="Minimum repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
          Search
        </button>
      </form>

      {/* Loading */}
      {loading && <p className="text-center mt-5">Loading...</p>}

      {/* Error */}
      {error && <p className="text-center text-red-600 mt-5">{error}</p>}

      {/* Results */}
      <div className="mt-8 space-y-4">
        {results.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Pagination */}
      {results.length > 0 && (
        <div className="flex justify-between mt-6">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
              runSearch(page - 1);
            }}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
          >
            Prev
          </button>

          <button
            onClick={() => {
              setPage(page + 1);
              runSearch(page + 1);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
