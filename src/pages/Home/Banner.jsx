/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import tomato from '../../assets/tomato.webp';
import mutton from '../../assets/mutton.jpg';

const TypingEffect = () => {
  const text = "Explore Fresh Local Market Prices!!";
  const letters = text.split("");

  return (
    <motion.div
      className="text-4xl font-bold text-center mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Banner = () => {
  return (
    <motion.div
      className="flex flex-col lg:flex-row items-center justify-between bg-[#daffe7] p-10 rounded-b-4xl shadow-lg mb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="lg:w-1/2 p-6 text-center">
        <motion.h1
          className="text-4xl font-bold text-[#03373D]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <TypingEffect />
        </motion.h1>
        <motion.p
          className="text-xl text-[#03373D]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Discover fresh, local produce at unbeatable prices. Stay updated with real-time trends on fruits, vegetables, meats, and daily essentials. Make informed choices and save more every time!
        </motion.p>
      </div>

      <div className="lg:w-1/2 flex justify-center relative">
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.img
            src={tomato}
            alt="Tomato"
            className="max-w-sm border-8 border-[#03373D] rounded-t-[40px] rounded-br-[40px] shadow-2xl transform hover:scale-105 transition-all duration-500"
            animate={{
              y: [10, -10, 10],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          />

          <motion.img
            src={mutton}
            alt="Mutton"
            className="max-w-sm border-8 border-[#03373D] rounded-t-[40px] rounded-br-[40px] shadow-2xl transform hover:scale-105 transition-all duration-500 mt-10"
            animate={{
              x: [100, -100, 100],
              rotate: [0, 10, -10],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Banner;
