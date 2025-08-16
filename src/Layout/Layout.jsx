import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import { FaMoon, FaSun } from 'react-icons/fa';

const Layout = () => {

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



    return (
        <div className={
        isDarkMode
          ? "bg-gray-700 text-gray-100"
          : "bg-gray-100 text-gray-800"
      }>
            <div className='overflow-x-hidden'>
                <Navbar></Navbar>
            
                <Outlet context={{ isDarkMode, toggleDarkMode }}></Outlet>
            <Footer></Footer>
            </div>
            <button
  onClick={toggleDarkMode}
  className='fixed bottom-10 right-10 p-3 rounded-full bg-gray-800 text-white shadow-lg
             dark:bg-gray-200 dark:text-black flex items-center justify-center'
>
  {isDarkMode ? <FaMoon size={20} /> : <FaSun size={20} />  }
</button>
        </div>
    );
};

export default Layout;