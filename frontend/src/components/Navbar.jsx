import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by looking for the user's name in localStorage
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    // Clear user-related data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUserName(null);
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between p-4 text-white bg-blue-500 shadow-md">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        Tracker
      </Link>
      {/* Navigation Links */}
      <div className="flex items-center space-x-4">
        {userName ? (
          <>
            <span className="text-lg">Welcome, {userName}</span>
            <button
              onClick={handleLogout}
              className="text-lg hover:underline focus:outline-none"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-lg hover:underline focus:outline-none"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-lg hover:underline focus:outline-none"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
