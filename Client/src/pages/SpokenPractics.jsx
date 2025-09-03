import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

// --- Helper Component for Floating Icons ---
const FloatingIcon = ({ icon, className, animation }) => (
  <motion.div
    className={`absolute text-5xl md:text-7xl opacity-15 select-none ${className}`}
    initial={animation.initial}
    animate={animation.animate}
    transition={animation.transition}
  >
    {icon}
  </motion.div>
);


// --- Main Page Component ---
export default function SpokenEnglishPractice() {
  // This useEffect hook handles the dynamic loading of the ElevenLabs Convai widget script.
  useEffect(() => {
    const scriptId = 'elevenlabs-convai-script';

    // Avoid adding the script if it already exists
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';

    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        // It's often better to leave third-party scripts loaded,
        // but this shows how to clean up if needed.
        // document.body.removeChild(existingScript);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const backgroundIcons = [
    { icon: '🎙️', className: 'top-[15%] left-[10%]', animation: { initial: { y: 0 }, animate: { y: [0, -15, 0] }, transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' } } },
    { icon: '💬', className: 'top-[25%] right-[15%]', animation: { initial: { scale: 1 }, animate: { scale: [1, 1.2, 1] }, transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' } } },
    { icon: '🎧', className: 'bottom-[20%] left-[20%]', animation: { initial: { rotate: 0 }, animate: { rotate: [0, 15, -10, 0] }, transition: { duration: 9, repeat: Infinity, ease: 'easeInOut' } } },
    { icon: '💡', className: 'bottom-[30%] right-[10%]', animation: { initial: { opacity: 0.5 }, animate: { opacity: [0.5, 1, 0.5] }, transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' } } },
  ];

  const conversationStarters = [
    "Tell me about your favorite hobby.",
    "What's your dream vacation?",
    "Describe your favorite food.",
    "What did you do last weekend?",
    "Tell me about a book or movie you love."
  ];

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-200 overflow-hidden flex flex-col items-center justify-center p-4 font-['Poppins',_sans-serif]">
      {backgroundIcons.map((item, index) => <FloatingIcon key={index} {...item} />)}
      
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 drop-shadow-sm">
          Practice Spoken English
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mt-3">
          Talk to our friendly AI Tutor and boost your confidence!
        </p>
      </motion.div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Conversation Starters */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-1 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Conversation Starters</h2>
          <ul className="space-y-3">
            {conversationStarters.map((starter, index) => (
              <li key={index} className="flex items-start">
                <span className="text-purple-500 mr-3 mt-1">✨</span>
                <span className="text-gray-700">{starter}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right Side: AI Tutor Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          className="lg:col-span-2 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-4 border border-white h-[60vh] min-h-[400px]"
        >
          {/* This is the custom element for the ElevenLabs widget */}
          {/* The agent-id is provided by you */}
          <elevenlabs-convai agent-id="agent_4601k48cwz2hfnkr48420dy59tf6"></elevenlabs-convai>
        </motion.div>
      </div>
    </div>
  );
}
