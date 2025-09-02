import React from "react";
import { motion } from "framer-motion";

const MotionSafe = ({ children, ...props }) => (
  <motion.div {...props} className={`motion-safe:block ${props.className || ""}`}>
    {children}
  </motion.div>
);

const FloatingBubble = ({ style, delay }) => (
  <MotionSafe
    className="absolute rounded-full bg-blue-200 opacity-30"
    style={style}
    initial={{ y: "110vh", opacity: 0 }}
    animate={{ y: "-10vh", opacity: [0, 0.3, 0.3, 0] }}
    transition={{ duration: 14 + Math.random() * 10, delay, repeat: Infinity, ease: "linear" }}
  />
);

export default FloatingBubble;
