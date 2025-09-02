import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [scores, setScores] = useState([]); // New State

  const login = (email, password) => {
    setUser({ name: "Monish Mondol", email });
  };

  const register = (name, email, password) => {
    setUser({ name, email });
  };

  const logout = () => setUser(null);

  const addScore = (quizId, score, total) => {
    setScores((prev) => [
      ...prev,
      { quizId, score, total, date: new Date().toISOString() },
    ]);
  };

  const value = {
    user,
    login,
    register,
    logout,
    scores,
    addScore,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
