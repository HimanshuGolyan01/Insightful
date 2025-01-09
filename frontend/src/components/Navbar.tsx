import React, { useState } from "react";
import { Sigma, UserCircle, Search } from "lucide-react";
import Profile from "./Profile";

const Navbar: React.FC = () => {
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    setShowProfile((prev) => !prev);
  };

  return (
    <div className="fixed top-0 z-10 w-full px-6 py-4 shadow-md bg-white">
      <div className="flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <h1
            className="text-2xl font-extrabold text-gray-800"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            Insightful
          </h1>
        </div>

        {/* Search Section */}
        <div className="relative flex items-center w-full max-w-md">
          <Search
            size={24}
            className="absolute left-3 text-gray-500"
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Search the blog..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-gray-400 focus:outline-none"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          />
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          <span
            className="text-lg font-bold text-gray-800"
            style={{ fontFamily: "Roboto" }}
          >
            Hello,
          </span>
          <div onClick={handleProfileClick} className="cursor-pointer">
            <UserCircle size={40} className="text-gray-800" />
          </div>
        </div>
      </div>

      {/* Profile Dropdown */}
      {showProfile && (
        <div className="absolute right-6 top-16 mt-2 bg-white shadow-lg rounded-lg z-20 p-4">
          <Profile />
        </div>
      )}
    </div>
  );
};

export default Navbar;
