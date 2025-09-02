// src/pages/QuizPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Bot, BookOpen, Globe } from "lucide-react"; // যদি lucide-react install থাকে
import { NavLink } from "react-router-dom";

const floatAnim = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const QuizPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-200 via-pink-100 to-yellow-100 overflow-hidden font-['Fredoka_One']">
      {/* Floating Decorations */}
      <motion.div
        className="absolute top-10 left-10 text-yellow-500"
        {...floatAnim}
      >
        <Sparkles size={36} />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 text-green-500"
        {...floatAnim}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Globe size={40} />
      </motion.div>

      {/* Header Section */}
      <header className="text-center py-12 relative z-10 mt-5">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 drop-shadow-sm">
          Choose Your Quiz Adventure
        </h1>
        <p className="mt-3 text-lg md:text-xl text-gray-700">
          Play, learn, and create your own quizzes with AI!
        </p>
      </header>

      {/* Quiz Cards */}
      <main className="container mx-auto px-6 pb-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Create Quiz Card */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="col-span-1 sm:col-span-2 lg:col-span-1 p-6 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-2xl shadow-xl border-4 border-yellow-300 relative overflow-hidden"
          >
            <div className="absolute top-3 right-3 text-yellow-200 animate-pulse">
              <Bot size={40} />
            </div>
            <h2 className="text-2xl font-medium mb-2">Create Your Own Quiz</h2>
            <p className="mb-4">Powered by AI — design your quiz instantly!</p>
            <button className="bg-yellow-300 text-purple-800 font-bold px-5 py-2 rounded-xl shadow hover:animate-bounce">
              Start Creating
            </button>
          </motion.div>

          {/* English Card */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="p-6 bg-gradient-to-br from-sky-400 to-purple-500 text-white rounded-2xl shadow-xl"
          >
            <BookOpen size={40} className="mb-3" />
            <h2 className="text-xl font-medium mb-2">Practice English</h2>
            <p className="mb-4">Improve grammar, vocabulary & fun topics!</p>
            <NavLink to="/quiz-play">
              <button className="bg-white text-purple-700 font-bold px-4 py-2 rounded-xl shadow hover:animate-bounce">
              Play Now
            </button>
            </NavLink>
          </motion.div>

          {/* Geography Card */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="p-6 bg-gradient-to-br from-green-400 to-yellow-400 text-white rounded-2xl shadow-xl"
          >
            <Globe size={40} className="mb-3" />
            <h2 className="text-xl font-medium mb-2">Practice Geography</h2>
            <p className="mb-4">Test your knowledge of countries, rivers & wonders!</p>
            <button className="bg-white text-green-700 font-bold px-4 py-2 rounded-xl shadow hover:animate-bounce">
              Play Now
            </button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-700 font-semibold">
        Keep learning, keep playing! 🌱
      </footer>
    </div>
  );
};

export default QuizPage;
