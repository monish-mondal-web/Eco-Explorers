import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Helper Components ---

// 1. Floating Icons for the background
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

// 2. Confetti Burst for mission completion
const ConfettiBurst = () => {
  const colors = ["#F59E0B", "#10B981", "#3B82F6", "#EC4899", "#8B5CF6", "#FACC15"];
  return Array.from({ length: 50 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute left-1/2 top-1/2 rounded-full"
      style={{ background: colors[i % colors.length], width: '10px', height: '10px' }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{
        y: (Math.random() - 0.5) * 600,
        x: (Math.random() - 0.5) * 600,
        scale: [1, 1.5, 0],
        opacity: [1, 1, 0],
      }}
      transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.015 }}
    />
  ));
};

// --- Main Page Component ---

export default function EcoPointsMissions() {
  const [missions, setMissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState('selection'); // 'selection', 'steps', 'completed'
  const [selectedMission, setSelectedMission] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

  // Mock data that would come from your MongoDB backend
  const mockMissionsFromDB = [
    {
      id: 'clean',
      icon: '🧹',
      title: 'Clean the Street',
      description: 'Help keep your neighborhood clean!',
      steps: [
        'Find a safe spot in your area that needs cleaning.',
        'With a grown-up, pick up the litter carefully.',
        'Upload a photo of your amazing work!',
      ],
      color: 'from-orange-400 to-amber-500',
      shadow: 'shadow-orange-400/50',
    },
    {
      id: 'plant',
      icon: '🌱',
      title: 'Plant a Tree',
      description: 'Make the Earth greener!',
      steps: [
        'Find a good spot to plant a new tree or flower.',
        'Plant your new green friend carefully in the soil.',
        'Upload a photo of your new plant!',
      ],
      color: 'from-green-500 to-emerald-600',
      shadow: 'shadow-green-500/50',
    },
    {
      id: 'help',
      icon: '🤝',
      title: 'Help the Community',
      description: 'Do something kind for society!',
      steps: [
        'Think of a kind act, like helping a neighbor.',
        'Complete your kind mission with a big smile.',
        'Upload a photo showing your kindness!',
      ],
      color: 'from-sky-500 to-indigo-600',
      shadow: 'shadow-sky-500/50',
    },
  ];

  // This useEffect simulates fetching data from a backend like MongoDB
  useEffect(() => {
    const fetchMissions = () => {
      setIsLoading(true);
      // Simulate a 1.5 second network request
      setTimeout(() => {
        setMissions(mockMissionsFromDB);
        setIsLoading(false);
      }, 1500);
    };

    fetchMissions();
  }, []);


  const handleSelectMission = (mission) => {
    setSelectedMission(mission);
    setCurrentStep(0);
    setUploadedImage(null); // Reset image on new mission
    setView('steps');
  };

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(step => step + 1);
    } else {
      setView('completed');
    }
  };

  const handleGoHome = () => {
    setView('selection');
    setSelectedMission(null);
    setUploadedImage(null); // Reset image when going home
  };

  const handlePhotoUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Revoke the old object URL to prevent memory leaks
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
      setUploadedImage(URL.createObjectURL(file));
    }
  };


  const backgroundIcons = [
    { icon: '🍃', className: 'top-[10%] left-[10%]', animation: { initial: { y: 0, rotate: 0 }, animate: { y: [0, 20, 0], rotate: [0, 10, 0] }, transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' } } },
    { icon: '⭐', className: 'top-[20%] right-[15%]', animation: { initial: { y: 0, scale: 1 }, animate: { y: [0, -20, 0], scale: [1, 1.2, 1] }, transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } } },
    { icon: '🌳', className: 'bottom-[15%] left-[20%]', animation: { initial: { y: 0 }, animate: { y: [0, -15, 0] }, transition: { duration: 10, repeat: Infinity, ease: 'easeInOut' } } },
    { icon: '♻️', className: 'bottom-[25%] right-[10%]', animation: { initial: { rotate: 0 }, animate: { rotate: 360 }, transition: { duration: 12, repeat: Infinity, ease: 'linear' } } },
    { icon: '☀️', className: 'top-[40%] left-[30%]', animation: { initial: { scale: 1 }, animate: { scale: [1, 1.3, 1] }, transition: { duration: 9, repeat: Infinity, ease: 'easeInOut' } } },
  ];
  
  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-green-500"></div>
        <h2 className="mt-6 text-2xl font-bold text-gray-700">Loading Missions...</h2>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-sky-100 via-emerald-50 to-yellow-100 overflow-hidden flex items-center justify-center p-4 font-['Fredoka_One',_sans_serif]">
      {backgroundIcons.map((item, index) => <FloatingIcon key={index} {...item} />)}

      <AnimatePresence mode="wait">
        {isLoading ? (
             <motion.div key="loading">{renderLoading()}</motion.div>
        ) : view === 'selection' ? (
          <motion.div
            key="selection"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, transition: { staggerChildren: 0.1 } }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500 mb-2 drop-shadow-sm">EcoPoints Missions</h1>
            <p className="text-gray-600 text-lg md:text-xl mb-12">Choose a mission to help the Earth!</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {missions.map((mission) => (
                <motion.div
                  key={mission.id}
                  className={`p-8 rounded-3xl text-white shadow-xl cursor-pointer bg-gradient-to-br ${mission.color} transition-all duration-300 transform-gpu`}
                  onClick={() => handleSelectMission(mission)}
                  whileHover={{ scale: 1.05, y: -15, boxShadow: `0px 20px 30px -10px var(--tw-shadow-color)`, shadow: `var(--tw-shadow-color, ${mission.shadow})` }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.2, type: 'spring', stiffness: 200 } }} className="text-7xl mb-4">{mission.icon}</motion.div>
                  <h2 className="text-3xl font-medium mb-2">{mission.title}</h2>
                  <p className="font-medium">{mission.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : view === 'steps' && selectedMission ? (
          <motion.div
            key="steps"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative w-full max-w-lg bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border-2 border-white"
          >
            <motion.button onClick={() => setView('selection')} whileHover={{scale: 1.1, rotate: 90}} className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-gray-800 transition-colors">&times;</motion.button>
            <div className="text-center">
              <motion.div initial={{scale:0}} animate={{scale:1, transition:{type:'spring'}}} className="text-7xl mb-4">{selectedMission.icon}</motion.div>
              <h2 className="text-3xl font-bold text-gray-800">{selectedMission.title}</h2>
            </div>
            
            <div className="flex justify-between items-center my-8">
              {[0, 1, 2].map(step => (
                <React.Fragment key={step}>
                  <motion.div
                    animate={{ scale: currentStep === step ? 1.2 : 1 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl text-white transition-all duration-300 ${currentStep >= step ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    {step + 1}
                  </motion.div>
                  {step < 2 && <div className={`flex-grow h-1.5 transition-all duration-300 ${currentStep > step ? 'bg-green-500' : 'bg-gray-300'}`} />}
                </React.Fragment>
              ))}
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="text-center p-4 min-h-[140px] flex flex-col items-center justify-center bg-green-50/50 rounded-2xl"
              >
                <p className="text-xl text-gray-800 font-semibold">{selectedMission.steps[currentStep]}</p>
                {currentStep === 2 && (
                  <>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    {!uploadedImage ? (
                        <motion.div onClick={handlePhotoUploadClick} whileHover={{scale:1.05}} className="mt-4 w-full h-24 border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center gap-3 bg-gray-50 text-gray-500 cursor-pointer hover:bg-gray-100 hover:border-green-500 hover:text-green-600 transition-colors">
                            <span className="text-2xl">📷</span> Click to Upload Photo
                        </motion.div>
                    ) : (
                        <div className="mt-4 w-full flex flex-col items-center">
                            <img src={uploadedImage} alt="Mission Upload Preview" className="rounded-xl max-h-32 shadow-md" />
                            <button onClick={handlePhotoUploadClick} className="mt-2 text-sm font-semibold text-indigo-600 hover:underline">Change Photo</button>
                        </div>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.button
              onClick={handleNextStep}
              disabled={currentStep === 2 && !uploadedImage}
              className={`w-full mt-8 py-4 rounded-2xl text-white font-bold text-xl shadow-lg bg-gradient-to-r transition-all duration-300 ${currentStep === 2 ? 'from-green-500 to-emerald-600' : 'from-blue-500 to-indigo-600'} disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed`}
              whileHover={{ scale: (currentStep === 2 && !uploadedImage) ? 1 : 1.05, y: (currentStep === 2 && !uploadedImage) ? 0 : -3 }}
              whileTap={{ scale: (currentStep === 2 && !uploadedImage) ? 1 : 0.95 }}
            >
              {currentStep === 2 ? 'Submit Mission ✨' : 'Next Step →'}
            </motion.button>
          </motion.div>
        ) : view === 'completed' ? (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center relative"
          >
            <div className="relative inline-block mb-4">
                <ConfettiBurst />
                <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-lg">Great Job! 🌟</h1>
            </div>
            <p className="text-2xl text-gray-700 font-semibold mb-10">Mission Completed! You earned EcoPoints 🎉</p>
            <motion.button
              onClick={handleGoHome}
              className="px-12 py-5 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold text-2xl rounded-full shadow-xl"
              whileHover={{ scale: 1.1, rotate: -2, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              Go Back to Home
            </motion.button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

