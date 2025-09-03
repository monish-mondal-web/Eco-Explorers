// src/pages/QuizPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Bot, BookOpen, Globe } from "lucide-react";
import { NavLink } from "react-router-dom";
import quizData from "../assets/data/quiz_data";

const iconMap = {
  BookOpen: <BookOpen size={40} className="mb-3" />,
  Globe: <Globe size={40} className="mb-3" />,
};

const QuizPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-200 via-pink-100 to-yellow-100 overflow-hidden font-['Fredoka_One']">
      {/* Header */}
      <header className="text-center py-12 mt-5">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 drop-shadow-sm">
          Choose Your Quiz Adventure
        </h1>
        <p className="mt-3 text-lg md:text-xl text-gray-700">
          Play, learn, and create your own quizzes with AI!
        </p>
      </header>

      {/* Cards */}
      <main className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Fixed AI Card */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="p-6 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-2xl shadow-xl border-4 border-yellow-300 relative"
          >
            <div className="absolute top-3 right-3 text-yellow-200 animate-pulse">
              <Bot size={40} />
            </div>
            <h2 className="text-2xl font-medium mb-2">Create Your Own Quiz</h2>
            <p className="mb-4">Powered by AI — design your quiz instantly!</p>
            <NavLink to="/quiz-play/ai">
              <button className="bg-yellow-300 text-purple-800 font-bold px-5 py-2 rounded-xl shadow hover:animate-bounce">
              Start Creating
            </button>
            </NavLink>
          </motion.div>

          {/* Dynamic Cards */}
          {quizData.map((quiz) => (
            <motion.div
              key={quiz.id}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className={`p-6 rounded-2xl shadow-xl text-white bg-gradient-to-br ${quiz.gradient}`}
            >
              {iconMap[quiz.icon]}
              <h2 className="text-xl font-medium mb-2">{quiz.title}</h2>
              <p className="mb-4">{quiz.description}</p>

              <NavLink to={`/quiz-play/${quiz.id}`}>
                <button className="bg-white text-purple-700 font-bold px-4 py-2 rounded-xl shadow hover:animate-bounce">
                  Play Now
                </button>
              </NavLink>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
