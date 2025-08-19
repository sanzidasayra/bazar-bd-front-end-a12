// HowItWorks.jsx
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaSearch, FaInfoCircle, FaShoppingCart, FaClipboardList } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch className="text-4xl text-orange-500 mb-4" />,
    title: "Browse Products",
    description: "Explore products on the Home or All Products page. See images, market name, date, and prices.",
  },
  {
    icon: <FaInfoCircle className="text-4xl text-green-500 mb-4" />,
    title: "View Details",
    description: "Click 'View Details' to see full product info, vendor details, and user reviews. Login required.",
  },
  {
    icon: <FaShoppingCart className="text-4xl text-blue-500 mb-4" />,
    title: "Buy Product",
    description: "Click 'Buy Product' to go to the Stripe payment page, enter details, and complete the purchase.",
  },
  {
    icon: <FaClipboardList className="text-4xl text-purple-500 mb-4" />,
    title: "Track Orders",
    description: "After purchase, check your orders in the User Dashboard. View details of all purchased products.",
  },
];

const HowItWorks = () => {
  return (
    <section className="mt-20">
      <div className=" text-center">
        <h2 className="lg:text-4xl text-3xl font-bold mb-3 text-[#EC5800] dark:text-gray-50">How It Works</h2>
        <p className="text-gray-700 lg:text-lg dark:text-gray-300 mb-6">
          Follow these simple steps to browse, buy, and track products easily.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-left hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div>{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
