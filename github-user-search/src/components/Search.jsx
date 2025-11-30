import { useState } from "react";
import { fetchUserData, searchUsers } from "../services/githubService";

export default function Search() {
  const [mode, setMode] = useState("basic");

  // Basic search (Task 1)
  const [usernameBasic, setUsernameBasic] = useState("");
  const [basicUser, setBasicUser] = useState(null);
  const [basicLoading, setBasicLoading] = useState(false);
  const [basicError, setBasicError] = useState("");

  // Advanced search (Task 2)
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [advError, setAdvError] = useState("");

  // --------------------------
  // Task 1 handler
  // --------------------------
  const handleBasic = async (e) => {
    e.preventDefault();
    setBasicError("");
    setBasicUser(null);
    setBasicLoading(true);

    try {
      const data = await fetchUserData(usernameBasic.trim());
      setBasicUser(data);
    } catch {
      setBasicError("Looks like we cant find the user");
    } finally {
      setBasicLoading(false);
    }
  };

  // --------------------------
  // Task 2 handler
  // --------------------------
  const handleAdvanced = async (e) => {
    e.preventDefault();
    setAdvError("");

    try {
      const data = await searchUsers({
        username,
        location,
        minRepos,
        page: 1,
      });

      setResults(data.items || []);
      setPage(1);
    } catch {
      setAdvError("Failed to fetch users");
    }
  };

  const loadMore = async () => {
    const newPage = page + 1;
    const data = await searchUsers({
      username,
      location,
      minRepos,
      page: newPage,
    });

    setResults((prev) => [...prev, ...(data.items || [])]);
    setPage(newPage);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Mode Switch */}
      <div className="flex gap-4">
        <button
          onClick={() => setMode("basic")}
          className={`px-4 py-2 rounded ${
            mode === "basic" ? "bg-black text-white" : "bg-gray-300"
          }`}
        >
          Basic Search
        </button>

        <button
          onClick={() => setMode("advanced")}
          className={`px-4 py-2 rounded ${
            mode === "advanced" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
        >
          Advanced Search
        </button>
      </div>

      {/* =============================== */}
      {/* TASK 1 — BASIC SEARCH (ALX)     */}
      {/* =============================== */}
      {mode === "basic" && (
        <div>
          <form onSubmit={handleBasic} className="flex gap-4">
            <input
              className="border p-3 w-full"
              placeholder="Enter GitHub username"
              value={usernameBasic}
              onChange={(e) => setUsernameBasic(e.target.value)}
            />
            <button className="bg-black text-white px-4 py-2 rounded">
              Search
            </button>
          </form>

          {basicLoading && <p>Loading...</p>}
          {basicError && <p className="text-red-600">{basicError}</p>}

          {basicUser && (
            <div className="mt-6 space-y-2">
              <img
                src={basicUser.avatar_url}
                width="120"
                className="rounded"
              />
              <h3 className="text-xl font-bold">{basicUser.login}</h3>
              <a
                className="text-blue-600 underline"
                href={basicUser.html_url}
                target="_blank"
              >
                View GitHub Profile
              </a>
            </div>
          )}
        </div>
      )}

      {/* =============================== */}
      {/* TASK 2 — ADVANCED SEARCH         */}
      {/* =============================== */}
      {mode === "advanced" && (
        <div className="space-y-6">
          <form onSubmit={handleAdvanced} className="space-y-4">
            <input
              className="border p-3 w-full"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              className="border p-3 w-full"
              placeholder="Location (e.g. Rwanda)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <input
              className="border p-3 w-full"
              type="number"
              placeholder="Minimum Repositories"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
            />

            <button className="bg-blue-600 text-white py-3 w-full rounded">
              Search Users
            </button>
          </form>

          {advError && <p className="text-red-600">{advError}</p>}

          <div className="space-y-4">
            {results.map((user) => (
              <div
                key={user.id}
                className="p-4 border rounded shadow flex items-center gap-4"
              >
                <img
                  src={user.avatar_url}
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

          {results.length > 0 && (
            <button
              onClick={loadMore}
              className="w-full py-3 bg-gray-800 text-white rounded"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
}
