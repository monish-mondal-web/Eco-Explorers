import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainHeader from "./components/layout/MainHeader";
import Home from "./pages/Home";
import Login from "./pages/Login";
import QuizPage from "./pages/QuizPage";
import QuizPlayPage from "./pages/QuizPlayPage";

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
        </Routes>
      </Router>
    </AuthProvider>
  );
}
