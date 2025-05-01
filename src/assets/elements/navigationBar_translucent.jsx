import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TokonetLogo from "../images/tokonet_logo.png";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed z-10 transition-all duration-300 ease-in-out ${
        scrolled 
          ? "bg-white shadow-lg mt-4 mx-4 rounded-lg" 
          : "bg-transparent"
      }`}
      style={{ 
        width: scrolled ? 'calc(100% - 2rem)' : '100%'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${
                scrolled
                  ? "text-orange-500 hover:bg-gray-100"
                  : "text-white hover:bg-black hover:bg-opacity-20"
              }`}
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
                  className="block h-8 w-auto logo-shadow"
                  src={TokonetLogo}
                  alt="Tokonet Logo"
                />
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/"
              className={`hidden sm:block px-3 py-2 rounded-md font-medium nav-link-underline ${
                scrolled
                  ? "text-orange-500"
                  : "text-white"
              }`}
            >
              Home
            </Link>
            
            <Link
              to="/login"
              className={`shop-now-btn-small ${
                scrolled 
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-white hover:bg-gray-100 text-orange-500"
              }`}
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} sm:hidden`}
        id="mobile-menu"
      >
        <div className={`px-2 pt-2 pb-3 space-y-1 rounded-md ${
          scrolled 
            ? "bg-white" 
            : "bg-black bg-opacity-70 backdrop-filter backdrop-blur-sm"
        }`}>
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md font-medium nav-link-underline ${
              scrolled
                ? "text-orange-500"
                : "text-white"
            }`}
          >
            Home
          </Link>
          <Link
            to="/login"
            className={`block px-3 py-2 rounded-md font-medium ${
              scrolled
                ? "text-orange-500 hover:bg-gray-100"
                : "text-white hover:bg-black hover:bg-opacity-50"
            }`}
          >
            Shop Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
