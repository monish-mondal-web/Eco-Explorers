import React from "react";
import { motion } from "framer-motion";

const MotionSafe = ({ children, ...props }) => (
  <motion.div
    {...props}
    className={`motion-safe:block motion-reduce:static ${props.className || ""}`}
  >
    {children}
  </motion.div>
);

const FloatingCloud = ({ style, delay }) => (
  <MotionSafe
    className="absolute text-white opacity-30"
    style={style}
    initial={{ x: "-10vw", opacity: 0 }}
    animate={{ x: "110vw", opacity: [0, 0.3, 0.3, 0] }}
    transition={{ duration: 25 + Math.random() * 20, delay, repeat: Infinity, ease: "linear" }}
  >
    <svg width="90" height="50" viewBox="0 0 80 40">
      <path d="M20,20 Q30,5 40,20 Q50,35 60,20 Q70,5 80,20 L80,40 L0,40 L0,20 Q10,5 20,20"
        fill="currentColor" />
    </svg>
  </MotionSafe>
);

export default FloatingCloud;
