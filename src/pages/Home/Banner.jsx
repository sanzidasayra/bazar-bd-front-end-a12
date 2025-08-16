import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Bashmati from "../../assets/basmati rice.jpg";
import Meats from "../../assets/meats.jpg";
import Vegies from "../../assets/vegies.avif";
import Fish from "../../assets/fish.webp";

const slides = [
  {
    image: Vegies,
    title: "Fresh Vegetables Everyday",
    desc: "Get farm-fresh veggies directly from your local markets at unbeatable prices."
  },
  {
    image: Meats,
    title: "Premium Quality Meat",
    desc: "Taste the difference with fresh, hygienic, and tender meat products."
  },
  {
    image: Fish,
    title: "Fresh Catch from the River",
    desc: "Delight in the authentic flavor of locally caught fish every day."
  },
  {
    image: Bashmati,
    title: "Best Rice Varieties",
    desc: "From premium aromatic rice to daily essentials, all at affordable rates."
  },
  
];

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[700px] overflow-hidden rounded-b-4xl shadow-lg mb-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          style={{
            backgroundImage: `url(${slides[current].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-[#EC5800] dark:bg-gray-700 bg-opacity-50 p-6 rounded-xl max-w-2xl">
            <h2 className="text-4xl font-bold text-white mb-3">{slides[current].title}</h2>
            <p className="text-lg text-gray-200">{slides[current].desc}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots Navigation */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === current ? "bg-white scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
