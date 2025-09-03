import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainHeader from "./components/layout/MainHeader";
import Home from "./pages/Home";
import Login from "./pages/Login";
import QuizPage from "./pages/QuizPage";
import QuizPlayPage from "./pages/QuizPlayPage";
import AiQuizPlayPage from "./pages/AiQuizPlayPage";
import EcoPointsMissions from "./pages/EcoPoint";
import SpokenEnglishPractice from "./pages/SpokenPractics";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <MainHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/quiz-play/:id" element={<QuizPlayPage />} />
          <Route path="/quiz-play/ai" element={<AiQuizPlayPage />} />
          <Route path="/eco-missions" element={<EcoPointsMissions />} />
          <Route path="/spoken" element={<SpokenEnglishPractice />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
