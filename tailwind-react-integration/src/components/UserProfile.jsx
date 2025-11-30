function UserProfile() {
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className="
          bg-gray-100 
          p-4 sm:p-6 md:p-8 
          max-w-xs sm:max-w-sm 
          mx-auto my-10 
          rounded-lg shadow-lg 
          text-center 
          transition-shadow duration-300 hover:shadow-xl
        "
      >
        {/* Profile Image with Hover Scale */}
        <img
          src="https://i.pravatar.cc/300"
          alt="User"
          className="
            w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36
            rounded-full mx-auto
            transition-transform duration-300 ease-in-out 
            hover:scale-110
          "
        />

        {/* User Name with Hover Text Color */}
        <h1
          className="
            text-lg sm:text-xl 
            text-blue-800 
            my-4 
            transition-colors duration-300 
            hover:text-blue-500
          "
        >
          John Doe
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600">
          Developer at Example Co. Loves to write code and explore new technologies.
        </p>
      </div>
    </div>
  );
}

export default UserProfile;
