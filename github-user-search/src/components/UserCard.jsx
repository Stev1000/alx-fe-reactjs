export default function UserCard({ user }) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-16 h-16 rounded-full border"
      />

      <div>
        <h2 className="text-xl font-semibold">{user.login}</h2>
        <a
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}
