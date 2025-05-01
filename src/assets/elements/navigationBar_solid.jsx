import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TokonetLogo from "../images/tokonet_logo.png";
import { isLoggedIn, getCurrentUser } from "../utils/userRequests";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLoggedIn()) {
      setUser(getCurrentUser());
    }
  }, []);

  return (
    <nav className="fixed w-full z-10 bg-orange-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <span className="block w-6 h-6 flex items-center justify-center font-bold text-lg">×</span>
              ) : (
                <span className="block w-6 h-6 flex items-center justify-center font-bold text-lg">≡</span>
              )}
            </button>
          </div>

          <div className="flex-1 flex items-center justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img
                  className="block h-8 w-auto"
                  src={TokonetLogo}
                  alt="Tokonet Logo"
                />
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {user && (
              <span className="hidden sm:block text-white font-medium">
                Welcome, {user.name}
              </span>
            )}
            
            <Link
              to="/"
              className="bg-white text-orange-500 font-bold py-2 px-4 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105 text-sm"
            >
              Home
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} sm:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-orange-600">
          {user && (
            <div className="block px-3 py-2 rounded-md text-white font-medium">
              Welcome, {user.name}
            </div>
          )}
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-white font-medium"
          >
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
}
