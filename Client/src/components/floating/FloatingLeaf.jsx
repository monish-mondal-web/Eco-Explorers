import React from "react";
import { motion } from "framer-motion";

const MotionSafe = ({ children, ...props }) => (
  <motion.div {...props} className={`motion-safe:block ${props.className || ""}`}>
    {children}
  </motion.div>
);

const FloatingLeaf = ({ style, delay }) => (
  <MotionSafe
    className="absolute text-green-400 opacity-40"
    style={style}
    initial={{ y: "-10vh", rotate: -15, opacity: 0 }}
    animate={{ y: "110vh", rotate: [0, 180, 360], opacity: [0, 0.4, 0.4, 0] }}
    transition={{ duration: 18 + Math.random() * 12, delay, repeat: Infinity, ease: "linear" }}
  >
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,2 C17,5 17,11 17,11 C17,11 17,17 12,20 C7,17 7,11 7,11 C7,11 7,5 12,2 Z" />
    </svg>
  </MotionSafe>
);

export default FloatingLeaf;
