import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { Link, NavLink } from "react-router-dom";

const Logo = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transform -rotate-12"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
      fill="url(#logo-gradient)"
    />
    <path
      d="M15.5 10.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5S13.2 9 14 9s1.5.7 1.5 1.5Z"
      fill="white"
    />
    <path
      d="M10 10.5c0 .8-.7 1.5-1.5 1.5S7 11.3 7 10.5 7.7 9 8.5 9 10 9.7 10 10.5Z"
      fill="white"
    />
    <path
      d="M16.5 15c0 .8-.7 1.5-1.5 1.5H9c-.8 0-1.5-.7-1.5-1.5S8.2 13.5 9 13.5h6c.8 0 1.5.7 1.5 1.5Z"
      fill="white"
      transform="rotate(10 12 15)"
    />
    <defs>
      <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
    </defs>
  </svg>
);

const MainHeader = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full bg-white/70 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <NavLink to="/">
          <div className="flex items-center space-x-3">
            <Logo />
            <div className="hidden sm:block">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-wider font-['Fredoka_One']">
                Eco Explorers
              </h1>
              <p className="text-green-700 text-sm md:text-lg mt-0.5 font-['Fredoka_One']">
                Learn • Play • Act
              </p>
            </div>
          </div>
        </NavLink>

        {/* Right side */}
        <div className="relative">
          {user ? (
            <>
              <img
                src={user.avatar || "https://i.pravatar.cc/100"}
                alt="Profile"
                className="w-9 h-9 md:w-11 md:h-11 rounded-full border-2 border-green-500 shadow-md cursor-pointer"
                onClick={() => setMenuOpen((v) => !v)}
              />
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-green-200 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-gray-800 font-semibold">{user.name}</p>
                      <p className="text-green-600 text-sm">{user.role}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-red-600 font-semibold hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl text-sm md:text-base font-medium shadow hover:scale-105 transition font-['Fredoka_One']"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
