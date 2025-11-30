function UserProfile() {
  return (
    <div className="w-full flex items-center justify-center px-4 sm:px-6 md:px-0">
      <div className="
        bg-gray-100 
        p-4 sm:p-6 md:p-8 
        max-w-xs sm:max-w-sm md:max-w-md 
        mx-auto my-10 
        rounded-lg shadow-lg text-center
      ">
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="User"
          className="
            mx-auto rounded-full 
            w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 
          "
        />

        <h1 className="
          text-lg sm:text-xl md:text-2xl 
          text-blue-800 
          my-4
        ">
          John Doe
        </h1>

        <p className="
          text-gray-600 
          text-sm sm:text-base 
        ">
          Developer at Example Co. Loves to write code and explore new technologies.
        </p>
      </div>
    </div>
  );
}

export default UserProfile;
