import axios from "axios";

// Task 1 function (must be kept)
export async function fetchUserData(username) {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error("GitHub API error");
  }
}

// Task 2 function (NEW)
export async function searchUsers({ username, location, minRepos, page = 1 }) {
  try {
    let query = "";

    if (username) query += `${username} in:login `;
    if (location) query += `location:${location} `;
    if (minRepos) query += `repos:>=${minRepos} `;

    const encoded = encodeURIComponent(query.trim());

    const response = await axios.get(
      `https://api.github.com/search/users?q=${encoded}&page=${page}&per_page=10`
    );

    return response.data;
  } catch (error) {
    throw new Error("GitHub Advanced Search Failed");
  }
}
