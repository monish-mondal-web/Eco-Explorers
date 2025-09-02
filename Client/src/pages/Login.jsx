// src/pages/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      register(formData.name, formData.email, formData.password);
    } else {
      login(formData.email, formData.password);
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-300 via-green-100 to-yellow-200 font-['Fredoka_One',cursive] px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-green-200">
        {/* Title */}
        <h2 className="text-3xl font-medium text-center text-green-700 mb-2">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {isRegister ? "Join Eco Explorers today 🌱" : "Login to continue your journey 🌍"}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-green-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-green-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-green-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium text-lg shadow-md transition-all"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        {/* Toggle */}
        <p className="mt-6 text-center text-gray-700">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-green-600 font-medium hover:underline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}
