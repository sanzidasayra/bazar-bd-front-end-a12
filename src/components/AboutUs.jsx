import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <motion.div
      className="w-11/12 sm:w-10/12 md:w-10/12 lg:w-8/12 mx-auto py-16 mt-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center text-[#EC5800] mb-6">
        About Us
      </h1>

      {/* Intro Paragraph */}
      <p className="text-lg text-gray-700 dark:text-gray-200 text-center mb-12">
        Welcome to <span className="font-semibold">BazarBD</span> – your go-to
        platform for up-to-date local market prices and product comparisons. We
        aim to make your shopping experience smarter, faster, and more
        convenient by providing real-time market insights.
      </p>

      {/* Mission & Vision Section */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Mission */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-[#EC5800]">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300">
            To empower buyers and vendors with transparent pricing information,
            enabling informed decisions and promoting fair trade across local
            markets.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-[#EC5800]">Our Vision</h2>
          <p className="text-gray-700 dark:text-gray-300">
            To become the leading online platform for local market insights,
            fostering a community where buyers and sellers can connect, compare,
            and thrive together.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-[#EC5800] mb-6 text-center">Our Values</h2>
        <ul className="space-y-4 max-w-3xl mx-auto text-gray-700 dark:text-gray-300 list-disc list-inside">
          <li>Transparency in market pricing.</li>
          <li>Empowering both buyers and vendors.</li>
          <li>User-friendly experience on all devices.</li>
          <li>Real-time updates and reliable data.</li>
          <li>Encouraging fair trade and market efficiency.</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default AboutUs;
