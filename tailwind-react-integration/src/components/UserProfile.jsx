function UserProfile() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="
        bg-gray-100 
        p-6 sm:p-8 
        max-w-xs sm:max-w-sm md:max-w-md 
        rounded-lg shadow-lg 
        text-center
      ">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User"
          className="
            w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32
            rounded-full mx-auto
          "
        />

        <h1 className="text-lg sm:text-xl md:text-2xl text-blue-800 font-semibold mt-4">
          John Doe
        </h1>

        <p className="text-gray-600 text-sm sm:text-base md:text-lg mt-2 leading-relaxed">
          Developer at Example Co. Loves to write code and explore new technologies.
        </p>
      </div>
    </div>
  );
}

export default UserProfile;
