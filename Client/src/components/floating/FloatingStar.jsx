import React from "react";
import { motion } from "framer-motion";

const MotionSafe = ({ children, ...props }) => (
  <motion.div {...props} className={`motion-safe:block ${props.className || ""}`}>
    {children}
  </motion.div>
);

const FloatingStar = ({ style, delay }) => (
  <MotionSafe
    className="absolute text-yellow-300 opacity-50"
    style={style}
    initial={{ y: "-10vh", opacity: 0 }}
    animate={{ y: "110vh", rotate: 360, opacity: [0, 0.5, 0.5, 0] }}
    transition={{ duration: 20 + Math.random() * 10, delay, repeat: Infinity, ease: "linear" }}
  >
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,2 L14.5,8.5 L21,9.5 L16,14 L17.5,21 L12,17.5 L6.5,21 L8,14 L3,9.5 L9.5,8.5 Z" />
    </svg>
  </MotionSafe>
);

export default FloatingStar;
