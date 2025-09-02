// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Backend er sathe connect korle ekhane API call hobe
    setUser({ name: "Monish Mondol", email });
  };

  const register = (name, email, password) => {
    setUser({ name, email });
  };

  const logout = () => setUser(null);
  const value = {
    user,
    login,
    register,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
