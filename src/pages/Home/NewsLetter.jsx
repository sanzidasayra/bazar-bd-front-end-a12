import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Newsletter = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    if (!email) return toast.error("Please enter a valid email!");

    setLoading(true);
    try {
      const res = await fetch("https://bazar-bd-back-end-a12.onrender.com/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) return toast.info(data.message);

      toast.success("Subscribed successfully!");
      e.target.reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl py-12 px-4 rounded-xl mt-20 text-center">
      <h2 className="text-3xl font-bold mb-4 text-[#EC5800] dark:text-gray-50">
        Subscribe to Our Newsletter
      </h2>
      <p className="text-gray-700 mb-6 dark:text-gray-300">
        Get updates on latest products, offers, and tips!
      </p>
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
          disabled={loading}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 dark:bg-gray-600 dark:hover:bg-gray-700 font-semibold"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
