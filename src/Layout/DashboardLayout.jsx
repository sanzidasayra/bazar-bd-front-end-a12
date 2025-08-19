import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBackward, FaMoon, FaSun, FaUsers, FaBars, FaTimes } from "react-icons/fa";
import { SiProducthunt } from "react-icons/si";
import { FcAdvertising, FcComboChart, FcClock } from "react-icons/fc";
import { FaCartPlus } from "react-icons/fa";
import { IoBagAddSharp } from "react-icons/io5";
import { IoIosPersonAdd, IoMdMicrophone } from "react-icons/io";
import { RiMicAiFill } from "react-icons/ri";
import { FaShopify } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/Shared/Spinner";

const DashboardLayout = () => {
  const { role, loading } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = saved ? saved === "dark" : system;
    setIsDarkMode(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  const adminLinks = [
    { to: "/dashboard/admin/all-users", icon: <FaUsers />, text: "All Users" },
    { to: "/dashboard/admin/all-products", icon: <SiProducthunt />, text: "All Products" },
    { to: "/dashboard/admin/all-order", icon: <FaCartPlus />, text: "All Order" },
    { to: "/dashboard/admin/all-ads", icon: <FcAdvertising />, text: "All Advertisements" },
    { to: "/dashboard/admin/newsletter-subscribers", icon: <MdEmail />, text: "Newsletter Subscribers" },
  ];

  const vendorLinks = [
    { to: "/dashboard/vendor/add-products", icon: <IoBagAddSharp />, text: "Add Product" },
    { to: "/dashboard/vendor/my-products", icon: <IoIosPersonAdd />, text: "My Products" },
    { to: "/dashboard/vendor/add-ads", icon: <RiMicAiFill />, text: "Add Advertisement" },
    { to: "/dashboard/vendor/my-ads", icon: <IoMdMicrophone />, text: "My Advertisements" },
  ];

  const userLinks = [
    { to: "/dashboard/user/price-trends", icon: <FcComboChart />, text: "View price trends" },
    { to: "/dashboard/user/watchlist", icon: <FcClock />, text: "Manage watchlist" },
    { to: "/dashboard/user/my-orders", icon: <FaShopify />, text: "My Order List" },
  ];

  const homeLink = { to: "/", icon: <FaBackward />, text: "Back to Home" };

  let sidebarLinks = role === "admin" ? adminLinks : role === "vendor" ? vendorLinks : userLinks;
  sidebarLinks.push(homeLink);

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen relative">
        {/* Sidebar for large screens */}
        <aside className={`hidden md:flex w-64 p-4 transition-colors duration-300 ${isDarkMode ? "bg-gray-700" : "bg-blue-50"} flex-col`}>
          <h2 className={`text-2xl font-bold text-center mb-6 capitalize ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            {role ? `${role} Panel` : "Dashboard"}
          </h2>
          <ul className="space-y-3 flex-1">
            {sidebarLinks.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.to}
                  className={`btn w-full flex items-center gap-2 ${isDarkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-white text-gray-900 hover:bg-[#daffe7]"} border shadow-md p-2 rounded-lg`}
                >
                  {React.cloneElement(item.icon, { className: `${isDarkMode ? "text-yellow-400" : "text-blue-400"} text-lg` })}
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Mobile Sidebar */}
        <div className={`fixed inset-0 z-50 md:hidden transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className={`w-64 h-full p-4 ${isDarkMode ? "bg-gray-700" : "bg-blue-50"} shadow-xl flex flex-col`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold capitalize ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {role ? `${role} Panel` : "Dashboard"}
              </h2>
              <button onClick={toggleSidebar} className="text-white text-xl">
                <FaTimes />
              </button>
            </div>
            <ul className="space-y-3 flex-1">
              {sidebarLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.to}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`btn w-full flex items-center gap-2 ${isDarkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-white text-gray-900 hover:bg-[#daffe7]"} border shadow-md p-2 rounded-lg`}
                  >
                    {React.cloneElement(item.icon, { className: `${isDarkMode ? "text-yellow-400" : "text-blue-400"} text-lg` })}
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 bg-white dark:bg-gray-800 p-4">
          <div className="md:hidden mb-4 flex justify-between items-center">
            <button onClick={toggleSidebar} className="p-2 bg-gray-200 dark:bg-gray-600 rounded-lg shadow-md">
              <FaBars size={24} />
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 bg-gray-200 dark:bg-gray-600 rounded-lg shadow-md"
            >
              {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
          </div>

          <Outlet context={{ isDarkMode, toggleDarkMode }} />
        </main>
      </div>

      <Footer />

      {/* Floating Dark Mode Button */}
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-10 right-10 p-3 rounded-full bg-gray-800 text-white shadow-lg dark:bg-gray-200 dark:text-black flex items-center justify-center md:flex hidden"
      >
        {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>
    </>
  );
};

export default DashboardLayout;
