import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import logo from '../assets/Bazarbd.jpg'

const Footer = () => {
  return (
    <footer className="bg-[#0B0B0B] text-white py-10 px-4 md:px-10 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
       
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold mb-2">
            <img src={logo} alt="BazarBD Logo" className="w-10 h-10 rounded-full" />
            <span>BazarBD</span>
          </div>
          <p className="text-gray-400">Track daily local market prices with ease and accuracy.</p>
        </div>

        
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p className="flex items-center gap-2 text-gray-300">
            <FaMapMarkerAlt /> Dhaka, Bangladesh
          </p>
          <p className="flex items-center gap-2 text-gray-300 mt-1">
            <FaEnvelope /> support@bazarbd.com
          </p>
          <p className="flex items-center gap-2 text-gray-300 mt-1">
            <FaPhoneAlt /> +880 1234 567890
          </p>
        </div>

        
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <p className="flex items-center gap-2 text-gray-300 hover:underline cursor-pointer">
            <BsFillShieldLockFill /> Terms & Conditions
          </p>
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-400">
              <FaTwitter size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-400">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>

      
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} BazarBD. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
