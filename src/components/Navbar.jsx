import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FaShoppingBag, FaSignInAlt, FaUserPlus,
  FaSignOutAlt, FaThLarge, FaHome,
  FaInfoCircle
} from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/Bazarbd.jpg';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDashboard = location.pathname.startsWith('/dashboard');

  const handleLogout = () => {
    logOut().then(() => {});
    setMobileOpen(false);
  };

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  // Dashboard-specific navbar
  if (isDashboard) {
    return (
      <div className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-50 px-4 shadow-md sticky top-0 z-50 w-full">
        <div className="flex justify-between items-center py-2">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <img src={logo} alt="logo" className="w-12 h-12 rounded-full border border-[#CAEB66]" />
            <span className="hidden sm:inline">BazarBD</span>
          </Link>
          <button
            className="btn bg-[#EC5800] hover:bg-[#d44c00] text-white dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center gap-2"
            onClick={() => navigate('/')}
          >
            <FaThLarge /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
   <div className="bg-gradient-to-r from-[#EC5800] to-[#FFA500] dark:from-gray-900 dark:to-gray-800 text-gray-50 dark:text-gray-50 px-4 lg:px-10 shadow-md fixed top-0 w-full z-50">
  <div className="max-w-[84rem] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center py-2">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 text-xl font-bold">
        <img src={logo} alt="logo" className="w-12 h-12 rounded-full border border-black dark:border-gray-300" />
        <span className="hidden sm:inline ">BazarBD</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden lg:flex flex-grow justify-center">
        <ul className="menu menu-horizontal px-1 gap-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:bg-black hover:text-white dark:hover:bg-gray-700 dark:hover:text-white px-3 py-1 rounded ${
                  isActive ? "bg-black text-white dark:bg-gray-700 dark:text-white" : ""
                }`
              }
            >
              <FaHome className="inline mr-1" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-products"
              className={({ isActive }) =>
                `hover:bg-black hover:text-white dark:hover:bg-gray-700 dark:hover:text-white px-3 py-1 rounded ${
                  isActive ? "bg-black text-white dark:bg-gray-700 dark:text-white" : ""
                }`
              }
            >
              <FaShoppingBag className="inline mr-1" /> All Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                `hover:bg-black hover:text-white dark:hover:bg-gray-700 dark:hover:text-white px-3 py-1 rounded ${
                  isActive ? "bg-black text-white dark:bg-gray-700 dark:text-white" : ""
                }`
              }
            >
              <FaInfoCircle className="inline mr-1" /> About Us
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `hover:bg-black hover:text-white dark:hover:bg-gray-700 dark:hover:text-white px-3 py-1 rounded ${
                    isActive ? "bg-black text-white dark:bg-gray-700 dark:text-white" : ""
                  }`
                }
              >
                <FaThLarge className="inline mr-1" /> Dashboard
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* Desktop Auth */}
      <div className="hidden lg:flex gap-4 items-center">
        {!user ? (
          <>
            <NavLink className="btn hover:bg-black hover:text-white dark:hover:bg-gray-700 dark:hover:text-white text-gray-900 " to="/login">
              <FaSignInAlt className="inline mr-1" /> Login
            </NavLink>
            <NavLink className="btn hover:bg-black hover:text-white dark:hover:bg-gray-700 dark:hover:text-white text-gray-900 " to="/signup">
              <FaUserPlus className="inline mr-1" /> Sign Up
            </NavLink>
          </>
        ) : (
          <>
            <div className="tooltip tooltip-left" data-tip={user.displayName || "User"}>
              <img src={user.photoURL || "/default-avatar.png"} alt="User" className="w-10 h-10 rounded-full border border-black dark:border-gray-300" />
            </div>
            <button
              onClick={handleLogout}
              className="btn hover:bg-red-500 hover:text-white dark:hover:bg-red-600 text-red-600 dark:text-red-400 bg-red-200 dark:bg-red-700"
            >
              <FaSignOutAlt className="inline mr-1" /> Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="flex lg:hidden">
        <button onClick={toggleMobileMenu}>
          {mobileOpen ? <IoClose className="text-3xl" /> : <GiHamburgerMenu className="text-3xl" />}
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Menu */}
  <AnimatePresence>
    {mobileOpen && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="lg:hidden mt-2 bg-[#EC5800] dark:bg-gray-900 rounded shadow-lg overflow-hidden flex flex-col gap-2"
      >
        <NavLink
          onClick={() => setMobileOpen(false)}
          to="/"
          className="hover:bg-black hover:text-white dark:hover:bg-gray-700 dark:hover:text-white px-3 py-2 rounded"
        >
          Home
        </NavLink>
        <NavLink
          onClick={() => setMobileOpen(false)}
          to="/all-products"
          className="hover:bg-black hover:text-white dark:hover:bg-gray-700 dark:hover:text-white px-3 py-2 rounded"
        >
          All Products
        </NavLink>
        {user ? (
          <>
            <NavLink
              onClick={() => setMobileOpen(false)}
              to="/dashboard"
              className="hover:bg-black hover:text-white dark:hover:bg-gray-700 dark:hover:text-white px-3 py-2 rounded"
            >
              Dashboard
            </NavLink>
            <button
              onClick={handleLogout}
              className="hover:bg-red-500 hover:text-white dark:hover:bg-red-600 px-3 py-2 rounded text-red-600 dark:text-red-400 bg-red-200 dark:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              onClick={() => setMobileOpen(false)}
              to="/login"
              className="hover:bg-black hover:text-white dark:text-gray-50 dark:hover:bg-gray-700 dark:hover:text-white px-3 py-2 rounded"
            >
              Login
            </NavLink>
            <NavLink
              onClick={() => setMobileOpen(false)}
              to="/signup"
              className="hover:bg-black hover:text-white dark:text-gray-50 dark:hover:bg-gray-700 dark:hover:text-white px-3 py-2 rounded"
            >
              Sign Up
            </NavLink>
          </>
        )}
      </motion.div>
    )}
  </AnimatePresence>
</div>

  );
};

export default Navbar;
