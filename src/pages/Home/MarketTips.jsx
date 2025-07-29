// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { GiCarrot } from "react-icons/gi";
import { FcIdea } from "react-icons/fc";
import { RiShoppingCartFill } from "react-icons/ri";
import { LuVegan } from "react-icons/lu";

const tips = [
  {
    icon: <GiCarrot className="text-4xl text-orange-500 mx-auto mb-3" />,
    title: "Best Veggies to Buy in July",
    description: "July is perfect for carrots, gourds, and green chillies.",
  },
  {
    icon: <LuVegan className="text-4xl text-purple-600 mx-auto mb-3" />,
    title: "Why Onion Prices Rise Before Eid",
    description:
      "Due to high demand and low supply, onion prices spike during festivals.",
  },
  {
    icon: <RiShoppingCartFill className="text-4xl text-green-600 mx-auto mb-3" />,
    title: "Vendor Tip: Shop Early!",
    description:
      "Get the freshest items and best deals by shopping before 9 AM.",
  },
];

const MarketTips = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <FcIdea className="text-3xl sm:text-xl" /> Market Tips & Seasonal Insights
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center"
          >
            {tip.icon}
            <h3 className="text-lg sm:text-xl font-semibold mb-2">{tip.title}</h3>
            <p className="text-sm sm:text-base text-gray-600">{tip.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MarketTips;
