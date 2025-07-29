import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FaShoppingBag, FaSignInAlt, FaUserPlus,
  FaSignOutAlt, FaThLarge,
  FaBackward
} from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoHomeSharp } from "react-icons/io5";
import logo from '../assets/Bazarbd.jpg';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname.startsWith('/dashboard');

  const handleLogout = () => {
    logOut().then(() => {});
  };

  if (isDashboard) {
    return (
      <div className="navbar bg-gray-50 text-gray-900 px-4 shadow-md sticky top-0 z-50">
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <img src={logo} alt="logo" className="w-12 h-12 rounded-full border border-[#CAEB66]" />
            <span className="hidden sm:inline">BazarBD</span>
          </Link>
        </div>
        <div>
          <button
            className="btn bg-[#CAEB66] text-black"
            onClick={() => navigate('/')}
          >
            <FaBackward /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar bg-gray-50 text-gray-900 px-4 lg:px-10 shadow-md sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <img src={logo} alt="logo" className="w-12 h-12 rounded-full border border-[#CAEB66]" />
          <span className="hidden sm:inline">BazarBD</span>
        </Link>
      </div>

      <div className="hidden lg:flex flex-grow justify-center">
        <ul className="menu menu-horizontal px-1 gap-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => `hover:bg-[#CAEB66] text-gray-900 ${isActive ? 'bg-[#CAEB66]' : ''}`}
            >
              <IoHomeSharp className="inline mr-1" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-products"
              className={({ isActive }) => `hover:bg-[#CAEB66] text-gray-900 ${isActive ? 'bg-[#CAEB66]' : ''}`}
            >
              <FaShoppingBag className="inline mr-1" /> All Products
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {user && (
          <div className="tooltip tooltip-left" data-tip={user.displayName || "User"}>
            <img
              src={user.photoURL || "/default-avatar.png"}
              alt="User"
              className="w-10 h-10 rounded-full border border-[#CAEB66]"
            />
          </div>
        )}

        {!user ? (
          <div className="hidden lg:flex gap-4">
            <NavLink to="/login" className="btn hover:bg-[#CAEB66] text-gray-900">
              <FaSignInAlt className="inline mr-1" /> Login
            </NavLink>
            <NavLink to="/signup" className="btn hover:bg-[#CAEB66] text-gray-900">
              <FaUserPlus className="inline mr-1" /> Sign Up
            </NavLink>
          </div>
        ) : (
          <div className="hidden lg:flex gap-4">
            <NavLink to="/dashboard" className="btn hover:bg-[#CAEB66] text-gray-900">
              <FaThLarge className="inline mr-1" /> Dashboard
            </NavLink>
            <button onClick={handleLogout} className="btn text-red-600 bg-red-200 hover:bg-red-400 hover:text-black">
              <FaSignOutAlt className="inline mr-1" /> Logout
            </button>
          </div>
        )}

        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <GiHamburgerMenu className="text-2xl" />
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-[#CAEB66] rounded-box w-60 text-gray-900">
            <li>
              <NavLink to="/all-products">
                <FaShoppingBag className="inline mr-1" /> All Products
              </NavLink>
            </li>
            {!user ? (
              <>
                <li>
                  <NavLink to="/login">
                    <FaSignInAlt className="inline mr-1" /> Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup">
                    <FaUserPlus className="inline mr-1" /> Sign Up
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard">
                    <FaThLarge className="inline mr-1" /> Dashboard
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-red-600">
                    <FaSignOutAlt className="inline mr-1" /> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
