import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Newsletter = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();

    if (!email) {
      toast.error("Please enter a valid email!");
      return;
    }

    
    const existing = JSON.parse(localStorage.getItem("newsletterEmails")) || [];


    if (existing.includes(email)) {
      toast.info("You are already subscribed!");
      e.target.reset();
      return;
    }

    localStorage.setItem("newsletterEmails", JSON.stringify([...existing, email]));

    toast.success("Subscribed successfully!");
    e.target.reset();
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-2xl py-12 px-4 rounded-xl my-12 text-center">
      <h2 className="text-3xl font-bold mb-4 text-[#EC5800] dark:text-gray-50">Subscribe to Our Newsletter</h2>
      <p className="text-gray-700 mb-6 dark:text-gray-300">Get updates on latest products, offers, and tips!</p>
      <form 
        className="flex flex-col sm:flex-row justify-center items-center gap-2"
        onSubmit={handleSubmit}
      >
        <input 
          type="email" 
          name="email"
          placeholder="Enter your email" 
          className="px-4 py-2 rounded-lg border border-gray-300 w-full sm:w-64"
        />
        <button 
          type="submit" 
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 dark:bg-gray-600 dark:hover:bg-gray-700 font-semibold"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
