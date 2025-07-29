/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-[#CAEB66] via-[#f5f5f5] to-[#8EC5FC] px-4">
      <div className="mb-3">
        <FaShoppingCart className="text-[7rem] text-[#03373D] drop-shadow-lg" />
      </div>

      <h1 className="text-[4rem] font-extrabold text-[#03373D] drop-shadow-xl">
        404
      </h1>

      <p className="text-xl md:text-2xl text-gray-700 mb-2 text-center">
        Oops! The page you’re looking for{" "}
        <span className="font-bold text-[#03373D]">doesn’t exist</span>.<br />
        Maybe you got lost in the bazar!
      </p>

      <div>
        <Link
          to="/"
          className="mt-4 px-7 py-3 rounded-full bg-[#CAEB66] hover:bg-[#A3D75C] text-black font-bold text-lg shadow transition duration-200 inline-block"
        >
          <span className="inline-block mr-2 align-middle">
            <FaShoppingCart />
          </span>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
