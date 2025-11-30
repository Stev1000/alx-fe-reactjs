import { useState } from "react";
import { fetchUserData, searchUsers } from "../services/githubService";
import UserCard from "./UserCard";

export default function Search() {
  const [mode, setMode] = useState("basic");

  // -------------------------------
  // BASIC SEARCH (Task 1)
  // -------------------------------
  const [usernameBasic, setUsernameBasic] = useState("");
  const [basicUser, setBasicUser] = useState(null);
  const [basicLoading, setBasicLoading] = useState(false);
  const [basicError, setBasicError] = useState("");

  const handleBasic = async (e) => {
    e.preventDefault();
    setBasicUser(null);
    setBasicError("");
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

  // -------------------------------
  // ADVANCED SEARCH (Task 2)
  // -------------------------------
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [advError, setAdvError] = useState("");

  const handleAdvanced = async (e) => {
    e.preventDefault();
    setAdvError("");
    setResults([]);

    try {
      const data = await searchUsers({
        username,
        location,
        minRepos,
        page: 1
      });

      // Fetch full details of each user
      const detailedUsers = await Promise.all(
        (data.items || []).map(async (u) => {
          const res = await fetch(`https://api.github.com/users/${u.login}`);
          return await res.json();
        })
      );

      setResults(detailedUsers);
      setPage(1);
    } catch {
      setAdvError("Failed to fetch users");
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;

    const data = await searchUsers({
      username,
      location,
      minRepos,
      page: nextPage
    });

    const detailedUsers = await Promise.all(
      (data.items || []).map(async (u) => {
        const res = await fetch(`https://api.github.com/users/${u.login}`);
        return await res.json();
      })
    );

    setResults((prev) => [...prev, ...detailedUsers]);
    setPage(nextPage);
  };

  // -------------------------------
  // RENDER
  // -------------------------------

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">

      {/* MODE SWITCH */}
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

      {/* ------------------ */}
      {/* BASIC SEARCH (Task 1) */}
      {/* ------------------ */}

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
            <div className="mt-6">
              <img src={basicUser.avatar_url} width="120" className="rounded" />
              <h3 className="text-xl font-bold">{basicUser.login}</h3>
              <a
                href={basicUser.html_url}
                className="text-blue-600 underline"
                target="_blank"
              >
                View GitHub Profile
              </a>
            </div>
          )}
        </div>
      )}

      {/* ------------------ */}
      {/* ADVANCED SEARCH (Task 2) */}
      {/* ------------------ */}

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
              type="number"
              className="border p-3 w-full"
              placeholder="Minimum Repositories"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
            />

            <button className="bg-blue-600 text-white w-full py-3 rounded">
              Search Users
            </button>
          </form>

          {advError && <p className="text-red-600">{advError}</p>}

          <div className="space-y-4">
            {results.map((user) => (
              <UserCard key={user.id} user={user} />
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
