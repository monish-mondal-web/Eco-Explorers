import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const AuthModal = ({ open, onClose }) => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  // reset error when switching tab
  useEffect(() => setError(""), [isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let ok = false;
    if (isLogin) {
      ok = await login(form.email, form.password);
    } else {
      ok = await register(form.name, form.email, form.password);
    }
    if (!ok) setError("Something went wrong. Please try again!");
    else onClose(); // close on success
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose} // click outside to close
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            onMouseDown={(e) => e.stopPropagation()} // prevent close on inner click
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-md bg-white/85 backdrop-blur-xl rounded-2xl shadow-2xl p-6 mx-4 font-['Fredoka_One']"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl text-green-700 font-bold">
                {isLogin ? "Welcome Back 🌱" : "Join Eco Explorers 🌍"}
              </h3>
              <button
                onClick={onClose}
                className="px-2 text-gray-600 hover:text-gray-900"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-2 bg-green-100 rounded-xl p-1 mb-5">
              <button
                onClick={() => setIsLogin(true)}
                className={`py-2 rounded-lg transition ${
                  isLogin ? "bg-white shadow font-bold" : "text-green-700"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`py-2 rounded-lg transition ${
                  !isLogin ? "bg-white shadow font-bold" : "text-green-700"
                }`}
              >
                Register
              </button>
            </div>

            {error && (
              <p className="text-red-600 font-semibold text-center mb-3">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full p-3 rounded-lg border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                className="w-full p-3 rounded-lg border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                className="w-full p-3 rounded-lg border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-bold shadow-md hover:scale-[1.01] transition"
              >
                {isLogin ? "Login" : "Create Account"}
              </button>
            </form>

            <p className="mt-4 text-center text-gray-700">
              {isLogin ? "New here?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin((v) => !v)}
                className="text-green-600 font-semibold"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
