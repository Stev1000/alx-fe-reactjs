export default function UserCard({ user }) {
  return (
    <div className="p-4 border rounded shadow flex items-center gap-4 bg-white">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-16 h-16 rounded-full"
      />

      <div>
        <p className="font-bold text-lg">{user.login}</p>

        <p className="text-gray-600">
          📍 {user.location || "Location not available"}
        </p>

        <p className="text-gray-600">
          📦 Public Repositories: {user.public_repos}
        </p>

        <a
          href={user.html_url}
          target="_blank"
          className="text-blue-600 underline"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}
