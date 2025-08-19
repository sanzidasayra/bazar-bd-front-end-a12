/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { GiFruitBowl, GiPriceTag, GiFarmer, GiShoppingBag } from "react-icons/gi";

const MarketTips = () => {
  const tips = [
    {
      title: "Buy Seasonal Veggies",
      description: "Seasonal vegetables are fresher and cost less. Check our market trends to see what's in season.",
      icon: <GiFruitBowl size={40} className="text-[#EC5800] dark:text-green-400" />,
    },
    {
      title: "Compare Prices Before Buying",
      description: "Use our daily price tracker to compare prices across local markets and make smarter choices.",
      icon: <GiPriceTag size={40} className="text-[#EC5800] dark:text-green-400" />,
    },
    {
      title: "Freshness Matters",
      description: "Look for fresh and high-quality produce. Our freshness tips help you spot the best items.",
      icon: <GiFarmer size={40} className="text-[#EC5800] dark:text-green-400" />,
    },
    {
      title: "Plan Your Weekly Shopping",
      description: "Plan purchases in advance based on price trends to save money and avoid last-minute price spikes.",
      icon: <GiShoppingBag size={40} className="text-[#EC5800] dark:text-green-400" />,
    },
  ];

  return (
    <section className="mt-20  dark:from-gray-800 dark:to-gray-700">
      <div className="text-center">
        <h2 className="lg:text-4xl text-3xl font-bold mb-12 text-[#EC5800] dark:text-gray-100">
          Market Tips & Insights
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:scale-102 hover:shadow-xl transition-transform duration-300"
            >
              <div className="mb-4">{tip.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-[#EC5800] dark:text-gray-300">
                {tip.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{tip.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketTips;
