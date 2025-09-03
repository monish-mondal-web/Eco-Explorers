import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- IMPORTANT NOTE ON SOUNDS ---
// The 'import' lines for local sound files are commented out because they 
// cannot be loaded in this web-based editor environment, causing an error.
// A simple browser-based tone will be played instead.
// To use your own files in your local project, uncomment the following lines:
import correctSoundFile from "../assets/sounds/pop_bonus.mp3";
import wrongSoundFile from "../assets/sounds/wrong_answer.mp3";

/* ------------------------
   Sound Utils
   ------------------------ */

// A simple tone player using the browser's Web Audio API as a fallback.
let audioCtx;
const playTone = (frequency, duration) => {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (!audioCtx) return;
        const oscillator = audioCtx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
        oscillator.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
        console.error("Web Audio API error:", e);
    }
};

const playCorrectSound = () => {
    // To use your local file, uncomment the line below and comment out playTone().
    if (typeof correctSoundFile !== 'undefined') new Audio(correctSoundFile).play().catch(e => console.error("Error playing sound:", e));
    // playTone(600, 0.15); // Plays a high-pitched tone for correct answers
};

const playWrongSound = () => {
    // To use your local file, uncomment the line below and comment out playTone().
    if (typeof wrongSoundFile !== 'undefined') new Audio(wrongSoundFile).play().catch(e => console.error("Error playing sound:", e));
    // playTone(300, 0.25); // Plays a low-pitched tone for wrong answers
};


/* ------------------------
   Confetti Burst Animation
   ------------------------ */
const ConfettiBurst = ({ count = 30 }) => {
  const particles = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0 z-50">
      {particles.map((_, i) => {
        const xStart = 50 + (Math.random() - 0.5) * 20;
        const yStart = 60 + (Math.random() - 0.5) * 20;
        const rotate = Math.random() * 360;
        const scale = Math.random() * 0.5 + 0.5;
        const dx = (Math.random() - 0.5) * 600;
        const dy = -400 - Math.random() * 300;
        const colors = ["#F59E0B", "#10B981", "#3B82F6", "#EC4899", "#8B5CF6", "#F97316"];
        const bg = colors[Math.floor(Math.random() * colors.length)];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 1, x: `${xStart}%`, y: `${yStart}%`, rotate, scale }}
            animate={{ x: `${xStart + dx}px`, y: `${yStart + dy}px`, opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.1, 1, 0.3, 1] }}
            style={{ position: "absolute", left: '0%', top: "0%" }}
          >
            <div
              style={{
                width: 10 + Math.random() * 12,
                height: 10 + Math.random() * 12,
                background: bg,
                borderRadius: `${Math.random() > 0.5 ? '50%' : '4px'}`,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

/* ========================================
   QUESTION COMPONENTS
   ======================================== */

const MCQ = ({ q, onResult, disabled }) => {
  const [picked, setPicked] = React.useState(null);

  const handlePick = (opt) => {
    if (disabled) return;
    setPicked(opt);
    const correct = opt === q.answer;
    onResult(correct);
    correct ? playCorrectSound() : playWrongSound();
  };

  return (
    <div className="grid gap-4 mt-6">
      {q.options.map((opt, idx) => {
        const isPicked = picked === opt;
        const isCorrect = opt === q.answer;

        return (
          <motion.button
            key={idx}
            onClick={() => handlePick(opt)}
            whileHover={{ scale: disabled ? 1 : 1.03, transition: { duration: 0.2 } }}
            whileTap={{ scale: disabled ? 1 : 0.97 }}
            className={`w-full text-left px-5 py-4 rounded-xl font-bold text-lg border-2 transition-all duration-300
              ${
                disabled
                  ? isCorrect
                    ? "bg-green-500 border-green-600 text-white shadow-lg"
                    : isPicked
                    ? "bg-red-500 border-red-600 text-white"
                    : "bg-gray-100 border-gray-200 text-gray-500 opacity-60"
                  : "bg-white border-gray-200 text-gray-800 hover:border-purple-400 hover:shadow-md"
              }
            `}
            disabled={disabled}
          >
            {opt}
          </motion.button>
        );
      })}
    </div>
  );
};

const Typing = ({ q, onResult, disabled }) => {
    const [value, setValue] = React.useState("");

    const handleSubmit = () => {
        if (disabled || !value) return;
        const answerArr = Array.isArray(q.answer) ? q.answer.map(a => a.toLowerCase()) : [q.answer.toLowerCase()];
        const correct = answerArr.includes(value.trim().toLowerCase());
        onResult(correct);
        correct ? playCorrectSound() : playWrongSound();
    };

    return (
        <div className="mt-6">
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-300/50 text-lg transition"
                placeholder="Type your answer..."
                disabled={disabled}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
             {disabled && <p className="mt-3 text-md text-green-700 font-semibold">Correct Answer: {Array.isArray(q.answer) ? q.answer.join(', ') : q.answer}</p>}
            <div className="flex gap-3 mt-4">
                <button
                    onClick={handleSubmit}
                    disabled={disabled || !value}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold shadow-md hover:scale-105 transition disabled:bg-gray-400 disabled:from-gray-400 disabled:to-gray-500 disabled:hover:scale-100"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

// A default quiz to load if the API call fails
const sampleQuiz = {
  id: "sample-quiz-001",
  title: "General Knowledge",
  subtitle: "A fun sample quiz to get you started!",
  questions: [
    { id: "q1", type: "mcq", question: "What is the capital of Japan?", options: ["Beijing", "Seoul", "Tokyo", "Bangkok"], answer: "Tokyo" },
    { id: "q2", type: "typing", question: "Which element has the chemical symbol 'O'?", answer: "Oxygen" },
    { id: "q3", type: "mcq", question: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], answer: "7" },
    { id: "q4", type: "typing", question: "What is the largest mammal in the world?", answer: ["Blue Whale", "Whale"] },
  ]
};


/* ========================================
   MAIN APP COMPONENT
   ======================================== */
export default function AiQuizPlayPage() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [numQuestions, setNumQuestions] = React.useState(5);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const [quizData, setQuizData] = React.useState(null);
  const [qIndex, setQIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [answered, setAnswered] = React.useState(false);
  const [lastCorrect, setLastCorrect] = React.useState(null);
  const [showConfetti, setShowConfetti] = React.useState(false);
  
  const GEMINI_API_KEY = "AIzaSyDhm5jnjRunsA5i-aB9xeCczmMUzQc3wsE";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;


  const handleGenerateQuiz = async (e) => {
    e.preventDefault();
    if (!title || !description) {
        setError("Please provide a title and description.");
        return;
    }
    setIsLoading(true);
    setError(null);

    const prompt = `Based on the topic "${title}" (${description}), generate a ${numQuestions}-question quiz. Include 'mcq' (4 options) and 'typing' types. Return a single, valid JSON object with the structure: {"id": "...", "title": "...", "subtitle": "...", "questions": [{"id": "...", "type": "...", "question": "...", "options": [...], "answer": "..."}, ...]}. Ensure the JSON is clean, without any markdown.`;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        
        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0].content.parts[0].text) {
             throw new Error("Invalid response structure from API.");
        }

        const textResponse = data.candidates[0].content.parts[0].text;
        const cleanedJsonString = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        const generatedQuiz = JSON.parse(cleanedJsonString);
        
        setQuizData(generatedQuiz);
    } catch (err) {
        console.error("API Error:", err);
        setError("AI quiz failed to generate. Loading a sample quiz for you to play!");
        setQuizData(sampleQuiz); // Fallback to sample quiz
    } finally {
        setIsLoading(false);
    }
  };

  const handleResult = (correct) => {
    if (answered) return;
    setAnswered(true);
    setLastCorrect(correct);
    if (correct) {
      setScore((s) => s + 1);
      setShowConfetti(true);
    }
  };

  const goNext = () => {
    if (!answered) return;
    setShowConfetti(false);
    setQIndex((i) => i + 1);
    setAnswered(false);
    setLastCorrect(null);
  };

  const restart = () => {
    setShowConfetti(false);
    setQIndex(0);
    setScore(0);
    setAnswered(false);
    setLastCorrect(null);
  };
  
  const startNewQuiz = () => {
      setQuizData(null);
      setTitle("");
      setDescription("");
      setNumQuestions(5);
      restart();
  }

  const renderQuizCreator = () => (
    <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200"
    >
        <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-700">AI Quiz Crafter</h1>
            <p className="mt-3 text-gray-600 text-lg">Turn any topic into a fun quiz!</p>
        </div>
        <form onSubmit={handleGenerateQuiz} className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-lg font-bold text-gray-800 mb-2">Title</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-5 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300/50 transition text-lg" placeholder="e.g., Solar System Adventure"/>
            </div>
            <div>
                <label htmlFor="description" className="block text-lg font-bold text-gray-800 mb-2">Topic Details</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="w-full px-5 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300/50 transition text-lg" placeholder="e.g., A quiz about planets, moons, and stars."/>
            </div>
            <div>
                 <label htmlFor="numQuestions" className="block text-lg font-bold text-gray-800 mb-2">Number of Questions: <span className="text-purple-600">{numQuestions}</span></label>
                 <input type="range" id="numQuestions" value={numQuestions} min="3" max="15" onChange={(e) => setNumQuestions(Number(e.target.value))} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-purple-600"/>
            </div>
            {error && <p className="text-orange-600 text-center font-bold bg-orange-100 p-3 rounded-lg">{error}</p>}
            <button type="submit" disabled={isLoading} className="w-full py-4 text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl shadow-lg hover:scale-[1.03] hover:shadow-xl transition-all duration-300 disabled:from-gray-400 disabled:hover:scale-100 flex items-center justify-center gap-3">
                {isLoading && <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                <span>{isLoading ? 'Crafting Quiz...' : 'Start Creating'}</span>
            </button>
        </form>
    </motion.div>
  );

  const renderQuizPlayer = () => {
    if (!quizData || !quizData.questions) return null; // Safety check
    
    const finished = qIndex >= quizData.questions.length;
    const currentQ = !finished ? quizData.questions[qIndex] : null;

    return (
     <div className="w-full max-w-3xl relative">
       {showConfetti && <ConfettiBurst />}
       <header className="text-center mb-6">
         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">{quizData.title}</h1>
         <p className="text-gray-600 mt-2 text-lg">{quizData.subtitle}</p>
       </header>

       {!finished && (
         <div className="mb-6">
           <div className="flex justify-between text-lg text-gray-700 font-bold mb-2">
             <span>Question {qIndex + 1} / {quizData.questions.length}</span>
             <span>Score: {score} ⭐</span>
           </div>
           <div className="h-4 bg-white/80 rounded-full overflow-hidden shadow-inner border">
             <motion.div initial={{ width: 0 }} animate={{ width: `${(qIndex / quizData.questions.length) * 100}%` }} transition={{ duration: 0.5, type: 'spring' }} className="h-full bg-gradient-to-r from-lime-400 to-green-500 rounded-full" />
           </div>
         </div>
       )}

       <AnimatePresence mode="wait">
         {!finished && currentQ ? (
           <motion.section
             key={currentQ.id}
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -50 }}
             transition={{ duration: 0.4, ease: "easeInOut" }}
             className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-200"
           >
             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">{currentQ.question}</h2>
             
             {currentQ.type === "mcq" && <MCQ q={currentQ} onResult={handleResult} disabled={answered} />}
             {currentQ.type === "typing" && <Typing q={currentQ} onResult={handleResult} disabled={answered} />}
             
             <div className="mt-8 h-10 flex justify-end items-center">
               {answered && (
                   <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`font-bold text-xl absolute left-8 ${lastCorrect ? "text-green-600" : "text-red-600"}`}>
                       {lastCorrect ? "✅ That's Right!" : "❌ Not Quite!"}
                   </motion.div>
               )}
               <button onClick={goNext} disabled={!answered} className="px-8 py-3 rounded-full font-bold text-white shadow-lg transition-all duration-300 disabled:bg-gray-400 disabled:hover:scale-100 bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105">
                 {qIndex + 1 < quizData.questions.length ? "Next →" : "Finish"}
               </button>
             </div>
           </motion.section>
         ) : (
           <motion.section
             key="final"
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5, type: 'spring' }}
             className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 text-center border border-gray-200"
           >
             <h2 className="text-4xl font-extrabold text-green-600">🎉 Well Done! 🎉</h2>
             <p className="mt-4 text-2xl font-semibold text-gray-800">Your Final Score:</p>
             <p className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-700 my-4">{score} / {quizData.questions.length}</p>
             <div className="flex gap-4 justify-center mt-8">
                <button onClick={restart} className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform text-lg">Play Again</button>
                <button onClick={startNewQuiz} className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform text-lg">Create New Quiz</button>
             </div>
           </motion.section>
         )}
       </AnimatePresence>
     </div>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-100 via-rose-100 to-amber-100 p-6 font-['Fredoka_One',_sans_serif] flex items-center justify-center">
        { !quizData ? renderQuizCreator() : renderQuizPlayer() }
    </main>
  );
}

