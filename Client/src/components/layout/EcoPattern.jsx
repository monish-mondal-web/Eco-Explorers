import React from "react";

const EcoPattern = () => (
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none hidden md:block">
    <svg width="100%" height="100%" className="pattern">
      <defs>
        <pattern id="eco-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="8" fill="currentColor" />
          <path d="M12,2 C17,5 17,11 17,11 C17,11 17,17 12,20 C7,17 7,11 7,11 C7,11 7,5 12,2 Z"
            fill="currentColor" transform="translate(50,30) scale(0.6)" />
          <path d="M12,2 L14.5,8.5 L21,9.5 L16,14 L17.5,21 L12,17.5 L6.5,21 L8,14 L3,9.5 L9.5,8.5 Z"
            fill="currentColor" transform="translate(70,70) scale(0.5)" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#eco-pattern)" />
    </svg>
  </div>
);

export default EcoPattern;
