import React from "react";
import { motion } from "framer-motion";

const GameCard = ({ icon, title, text, buttonText, gradient }) => (
  <motion.div
    className={`rounded-3xl p-8 text-white text-center flex flex-col items-center justify-between shadow-2xl ${gradient} cursor-pointer relative z-20`}
    whileHover={{ scale: 1.05, y: -15 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
  >
    <div className="mb-6">{icon}</div>
    <h3 className="text-3xl mb-4">{title}</h3>
    <p className="text-lg mb-8 h-24">{text}</p>
    <motion.button
      className="bg-white text-gray-800 font-bold py-4 px-10 rounded-full shadow-lg text-xl"
      whileHover={{ scale: 1.1, backgroundColor: "#f0f0f0" }}
      whileTap={{ scale: 0.95 }}
    >
      {buttonText}
    </motion.button>
  </motion.div>
);

export default GameCard;
