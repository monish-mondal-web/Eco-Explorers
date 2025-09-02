import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom"; // ⬅️ Add NavLink

// Layout Components
import EcoPattern from "../components/layout/EcoPattern";

// Floating Components
import FloatingCloud from "../components/floating/FloatingCloud";
import FloatingLeaf from "../components/floating/FloatingLeaf";
import FloatingStar from "../components/floating/FloatingStar";
import FloatingBubble from "../components/floating/FloatingBubble";

// UI Components
import GameCard from "../components/ui/GameCard";
import { QuizIcon, SpeechIcon, EcoPointsIcon } from "../components/ui/Icons";

export default function Home() {
  const cardData = [
    {
      icon: <QuizIcon />,
      title: "Quiz Zone",
      text: "Test your eco-knowledge with fun quizzes & unlock levels!",
      buttonText: "Start Quiz",
      gradient: "bg-gradient-to-br from-yellow-400 to-orange-500",
      link: "/quiz",
    },
    {
      icon: <SpeechIcon />,
      title: "Spoken English",
      text: "Practice English conversations with AI & boost your confidence!",
      buttonText: "Practice Now",
      gradient: "bg-gradient-to-br from-blue-400 to-purple-500",
      link: "/english",
    },
    {
      icon: <EcoPointsIcon />,
      title: "EcoPoints Challenge",
      text: "Take eco-friendly actions, earn EcoPoints & become a Green Champion!",
      buttonText: "Join Challenge",
      gradient: "bg-gradient-to-br from-green-400 to-teal-500",
      link: "/ecopoints",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-sky-300 via-green-100 to-yellow-200 font-['Fredoka_One',_cursive] overflow-hidden">
      {/* Background Pattern */}
      <EcoPattern />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence>
          <FloatingCloud key="cloud" style={{ top: "15%" }} delay={0} />
          <FloatingLeaf key="leaf" style={{ left: "10%" }} delay={4} />
          <FloatingStar key="star" style={{ left: "20%" }} delay={5} />
          <FloatingBubble key="bubble" style={{ left: "30%" }} delay={3} />
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <main className="py-12 md:py-20 mt-10">
          <div className="container mx-auto px-6">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.2 } },
              }}
            >
              {cardData.map((card, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {/* Wrap GameCard with NavLink */}
                  <NavLink to={card.link}>
                    <GameCard {...card} />
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
