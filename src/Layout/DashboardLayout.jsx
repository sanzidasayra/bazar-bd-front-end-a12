import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBackward, FaMoon, FaSun, FaUsers } from "react-icons/fa";
import { SiProducthunt } from "react-icons/si";
import { FcAdvertising, FcComboChart, FcClock } from "react-icons/fc";
import { FaCartPlus } from "react-icons/fa";
import { IoBagAddSharp } from "react-icons/io5";
import { IoIosPersonAdd, IoMdMicrophone } from "react-icons/io";
import { RiMicAiFill } from "react-icons/ri";
import { FaShopify } from "react-icons/fa6";
import { AuthContext } from "../context/AuthContext"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/Shared/Spinner";
import { MdEmail } from "react-icons/md";

const DashboardLayout = () => {
  const { role, loading } = useContext(AuthContext);

       const [isDarkMode, setIsDarkMode] = useState(false);

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



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-xl font-semibold"> <Spinner /> </span>
      </div>
    );
  }

  const adminLinks = [
    {
      to: "/dashboard/admin/all-users",
      icon: <FaUsers size={24} className="text-lg text-blue-400" />,
      text: "All Users",
    },
    {
      to: "/dashboard/admin/all-products",
      icon: <SiProducthunt size={24} className="text-lg text-blue-400" />,
      text: "All Products",
    },
    {
      to: "/dashboard/admin/all-order",
      icon: <FaCartPlus size={24} className="text-lg text-blue-400" />,
      text: "All Order",
    },
    {
      to: "/dashboard/admin/all-ads",
      icon: <FcAdvertising size={24} className="text-lg " />,
      text: "All Advertisements",
    },
    {
      to: "/dashboard/admin/newsletter-subscribers",
      icon: <MdEmail size={24} className="text-lg" />,
      text: "Newsletter Subscribers",
    },
  ];

  const vendorLinks = [
    {
      to: "/dashboard/vendor/add-products",
      icon: <IoBagAddSharp size={24} className="text-lg text-blue-400" />,
      text: "Add Product",
    },
    {
      to: "/dashboard/vendor/my-products",
      icon: <IoIosPersonAdd size={24} className="text-lg text-blue-400" />,
      text: "My Products",
    },
    {
      to: "/dashboard/vendor/add-ads",
      icon: <RiMicAiFill size={24} className="text-lg text-blue-400" />,
      text: "Add Advertisement",
    },
    {
      to: "/dashboard/vendor/my-ads",
      icon: <IoMdMicrophone size={24} className="text-lg text-blue-400" />,
      text: "My Advertisements",
    },
  ];

  const userLinks = [
    {
      to: "/dashboard/user/price-trends",
      icon: <FcComboChart size={24} className="text-lg text-blue-400" />,
      text: "View price trends",
    },
    {
      to: "/dashboard/user/watchlist",
      icon: <FcClock size={24} className="text-lg text-blue-400" />,
      text: "Manage watchlist",
    },
    {
      to: "/dashboard/user/my-orders",
      icon: <FaShopify size={24} className="text-lg text-blue-400" />,
      text: "My Order List",
    },
  ];

  const homeLink = {
    to: "/",
    icon: <FaBackward size={24} className="text-lg text-blue-400" />,
    text: "Back to Home",
  };

  let sidebarLinks = [];
  if (role === "admin") sidebarLinks = adminLinks;
  else if (role === "vendor") sidebarLinks = vendorLinks;
  else sidebarLinks = userLinks;

  sidebarLinks.push(homeLink);

  return (
     <>
           <Navbar />

    <div className="flex min-h-screen">
      <aside
  className={`w-64 p-4 transition-colors duration-300 ${
    isDarkMode ? "bg-gray-700" : "bg-blue-50"
  }`}
>
  <h2
    className={`text-2xl font-bold text-center mb-6 capitalize transition-colors duration-300 ${
      isDarkMode ? "text-white" : "text-gray-900"
    }`}
  >
    {role ? `${role} Panel` : "Dashboard"}
  </h2>
  <ul className="space-y-3">
    {sidebarLinks.map((item, idx) => (
      <li key={idx}>
        <Link
          to={item.to}
          className={`btn w-full flex items-center gap-2 transition-colors duration-300
            ${isDarkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-white text-gray-900 hover:bg-[#daffe7]"} 
            border shadow-md`}
        >
          {React.cloneElement(item.icon, {
            className: `${isDarkMode ? "text-yellow-400" : "text-blue-400"} text-lg`,
          })}
          {item.text}
        </Link>
      </li>
    ))}
  </ul>
</aside>
          
      <main className="flex-1 bg-white dark:bg-gray-800">
                <Outlet context={{ isDarkMode, toggleDarkMode }}></Outlet>
      </main>
           <button
      onClick={toggleDarkMode}
      className='fixed bottom-10 right-10 p-3 rounded-full bg-gray-800 text-white shadow-lg
                 dark:bg-gray-200 dark:text-black flex items-center justify-center'
    >
      {isDarkMode ? <FaSun size={20} /> :  <FaMoon size={20} /> }
    </button>
    </div>
      <Footer />
     </>
  );
};

export default DashboardLayout;
