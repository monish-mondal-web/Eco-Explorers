import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------
   Dummy quiz JSON (10 Qs)
   ------------------------ */
const QUIZ_DATA = [
  {
    id: 1,
    type: "mcq",
    question: "Which animal is known as the King of the Jungle?",
    options: ["Elephant", "Lion", "Tiger", "Giraffe"],
    answer: "Lion",
  },
  {
    id: 2,
    type: "typing",
    question: "Type the capital of France",
    answer: ["paris"],
  },
  {
    id: 3,
    type: "mcq",
    question: "What color is the sky on a clear day?",
    options: ["Blue", "Green", "Red", "Yellow"],
    answer: "Blue",
  },
  {
    id: 4,
    type: "dragdrop",
    question: "Drag the fruits into the basket (drag only fruits)",
    items: [
      { id: "i1", label: "🍎", kind: "fruit" },
      { id: "i2", label: "🍌", kind: "fruit" },
      { id: "i3", label: "🍪", kind: "snack" },
      { id: "i4", label: "🥕", kind: "veg" },
    ],
    answerKind: "fruit",
  },
  {
    id: 5,
    type: "mcq",
    question: "Which animal barks?",
    options: ["Cat", "Cow", "Dog", "Sheep"],
    answer: "Dog",
  },
  {
    id: 6,
    type: "typing",
    question: "Type the word that names a big flowing water — 'river' spelled:",
    answer: ["river"],
  },
  {
    id: 7,
    type: "mcq",
    question: "Which is a vegetable?",
    options: ["Apple", "Carrot", "Banana", "Mango"],
    answer: "Carrot",
  },
  {
    id: 8,
    type: "dragdrop",
    question: "Drag the animals that can fly",
    items: [
      { id: "d1", label: "🦅", kind: "fly" },
      { id: "d2", label: "🐘", kind: "ground" },
      { id: "d3", label: "🦋", kind: "fly" },
      { id: "d4", label: "🐄", kind: "ground" },
    ],
    answerKind: "fly",
  },
  {
    id: 9,
    type: "typing",
    question: "What does 'eco' relate to? (one word)",
    answer: ["environment", "ecology"],
  },
  {
    id: 10,
    type: "mcq",
    question: "What is 2 + 2 ?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
];

/* ------------------------
   Placeholder Sounds
   ------------------------ */
const playCorrectSound = () => {
  console.log("✅ Play Correct Sound"); // later add audio
};
const playWrongSound = () => {
  console.log("❌ Play Wrong Sound");
};

/* ------------------------
   Confetti Burst Animation
   ------------------------ */
const ConfettiBurst = ({ count = 15, onComplete }) => {
  const particles = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
      {particles.map((_, i) => {
        const left = 50 + (Math.random() - 0.5) * 40;
        const rotate = Math.random() * 360;
        const dx = (Math.random() - 0.5) * 400;
        const dy = -200 - Math.random() * 200;
        const colors = ["#F59E0B", "#10B981", "#3B82F6", "#EC4899", "#8B5CF6"];
        const bg = colors[Math.floor(Math.random() * colors.length)];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 1, x: `${left}%`, y: "50%", rotate }}
            animate={{ x: `${left + dx}px`, y: dy, opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{ position: "absolute", left: `${left}%`, top: "40%" }}
            onAnimationComplete={() => {
              if (i === particles.length - 1 && onComplete) onComplete();
            }}
          >
            <div
              style={{
                width: 10 + Math.random() * 12,
                height: 10 + Math.random() * 12,
                background: bg,
                borderRadius: 4,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

/* ------------------------
   MCQ Component
   ------------------------ */
const MCQ = ({ q, onResult, disabled }) => {
  const [picked, setPicked] = useState(null);

  const handlePick = (opt) => {
    if (disabled) return;
    setPicked(opt);
    const correct = opt === q.answer;
    onResult(correct);
    correct ? playCorrectSound() : playWrongSound();
  };

  return (
    <div className="grid gap-3 mt-4">
      {q.options.map((opt, idx) => {
        const isPicked = picked === opt;
        return (
          <motion.button
            key={idx}
            onClick={() => handlePick(opt)}
            whileTap={{ scale: 0.97 }}
            className={`w-full text-left px-4 py-3 rounded-2xl font-semibold text-lg shadow-md transition-colors
              ${
                isPicked
                  ? opt === q.answer
                    ? "bg-green-400 text-white"
                    : "bg-red-400 text-white"
                  : "bg-gradient-to-r from-blue-100 to-purple-100 hover:scale-[1.02]"
              }
            `}
          >
            {opt}
          </motion.button>
        );
      })}
    </div>
  );
};

/* ------------------------
   Typing Component
   ------------------------ */
const Typing = ({ q, onResult, disabled }) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (disabled) return;
    const answerArr = Array.isArray(q.answer) ? q.answer : [q.answer];
    const correct = answerArr.some(
      (a) => a.toLowerCase() === value.trim().toLowerCase()
    );
    onResult(correct);
    correct ? playCorrectSound() : playWrongSound();
  };

  return (
    <div className="mt-4">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 rounded-xl border-2 border-indigo-300 focus:outline-none text-lg"
        placeholder="Type your answer..."
        disabled={disabled}
      />
      <div className="flex gap-3 mt-3">
        <button
          onClick={handleSubmit}
          className="flex-1 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-2xl font-bold shadow-md hover:scale-105 transition"
        >
          Submit
        </button>
        <button
          onClick={() => setValue("")}
          className="px-4 py-3 bg-white rounded-2xl border shadow"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

/* ------------------------
   Drag & Drop Component
   ------------------------ */
const DragDrop = ({ q, onResult, disabled }) => {
  const [selected, setSelected] = useState([]);
  useEffect(() => setSelected([]), [q]);

  const onDrop = (e) => {
    e.preventDefault();
    if (disabled) return;
    const id = e.dataTransfer.getData("text/plain");
    const item = q.items.find((it) => it.id === id);
    if (item && !selected.find((s) => s.id === id)) {
      setSelected((s) => [...s, item]);
    }
  };

  const checkAnswer = () => {
    const correctItems = q.items
      .filter((it) => it.kind === q.answerKind)
      .map((it) => it.id);
    const selIds = selected.map((s) => s.id).sort();
    const corrIds = correctItems.sort();
    const correct =
      selIds.length === corrIds.length &&
      selIds.every((v, i) => v === corrIds[i]);
    onResult(correct);
    correct ? playCorrectSound() : playWrongSound();
  };

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-3 mb-3">
        {q.items.map((it) => (
          <div
            key={it.id}
            draggable={!disabled}
            onDragStart={(e) => e.dataTransfer.setData("text/plain", it.id)}
            className="cursor-grab select-none bg-white p-3 rounded-xl shadow text-2xl"
          >
            {it.label}
          </div>
        ))}
      </div>

      <div
        className="min-h-[80px] rounded-xl border-2 border-dashed border-gray-300 bg-white/90 flex items-center justify-center p-4"
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {selected.length === 0 ? (
          <div className="text-gray-500">Drop items here</div>
        ) : (
          <div className="flex gap-3 items-center">
            {selected.map((s) => (
              <div key={s.id} className="p-2 bg-green-50 rounded-lg">
                {s.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={checkAnswer}
        className="mt-4 w-full py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-2xl font-bold shadow hover:scale-105 transition"
      >
        Check
      </button>
    </div>
  );
};

/* ------------------------
   Progress Dots
   ------------------------ */
const ProgressDots = ({ total, index }) => (
  <div className="flex gap-2 items-center justify-center mt-4">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`w-3 h-3 rounded-full ${
          i <= index ? "bg-green-500" : "bg-gray-300"
        }`}
      />
    ))}
  </div>
);

/* ------------------------
   Main QuizPlayPage
   ------------------------ */
export default function QuizPlayPage() {
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentQ = QUIZ_DATA[qIndex];
  const finished = qIndex >= QUIZ_DATA.length;

  const handleResult = (correct) => {
    if (answered) return;
    setAnswered(true);
    setLastCorrect(correct);
    if (correct) {
      setScore((s) => s + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1200);
    }
  };

  const goNext = () => {
    if (!answered) return;
    setQIndex((i) => i + 1);
    setAnswered(false);
  };

  const restart = () => {
    setQIndex(0);
    setScore(0);
    setAnswered(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-pink-100 to-yellow-100 p-6 font-['Fredoka_One'] flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <header className="text-center mb-4 relative">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700">
            Let's Play English Quiz!
          </h1>
          <p className="text-gray-700 mt-2">
            Answer fun questions and collect stars ⭐
          </p>
        </header>

        {/* Progress bar */}
        {!finished && (
          <div className="mb-4">
            <div className="h-3 bg-white/60 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(qIndex / QUIZ_DATA.length) * 100}%` }}
                transition={{ duration: 0.4 }}
                className="h-3 bg-gradient-to-r from-green-400 to-green-600"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>Progress</span>
              <span>Score: {score} ⭐</span>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.section
              key={currentQ.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-3xl shadow-2xl p-6 relative"
            >
              <div className="text-sm text-gray-500">
                Q{qIndex + 1} of {QUIZ_DATA.length}
              </div>
              <h2 className="text-xl md:text-2xl font-bold mt-2">
                {currentQ.question}
              </h2>

              <div className="mt-4">
                {currentQ.type === "mcq" && (
                  <MCQ
                    q={currentQ}
                    onResult={handleResult}
                    disabled={answered}
                  />
                )}
                {currentQ.type === "typing" && (
                  <Typing
                    q={currentQ}
                    onResult={handleResult}
                    disabled={answered}
                  />
                )}
                {currentQ.type === "dragdrop" && (
                  <DragDrop
                    q={currentQ}
                    onResult={handleResult}
                    disabled={answered}
                  />
                )}
              </div>

              <div className="mt-6 flex justify-between items-center">
                {answered && (
                  <div
                    className={`font-semibold ${
                      lastCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {lastCorrect ? "✅ Correct!" : "❌ Wrong!"}
                  </div>
                )}
                <button
                  onClick={goNext}
                  disabled={!answered}
                  className={`px-4 py-2 rounded-2xl font-bold text-white shadow-md transition
                    ${
                      !answered
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105"
                    }
                  `}
                >
                  {qIndex + 1 < QUIZ_DATA.length ? "Next →" : "Finish"}
                </button>
              </div>

              <ProgressDots total={QUIZ_DATA.length} index={qIndex} />

              {showConfetti && (
                <ConfettiBurst onComplete={() => setShowConfetti(false)} />
              )}
            </motion.section>
          ) : (
            <motion.section
              key="final"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-2xl p-8 text-center"
            >
              <h2 className="text-3xl font-bold text-green-600">
                🎉 You Completed the Quiz!
              </h2>
              <p className="mt-3 text-lg">
                Your Score: {score} / {QUIZ_DATA.length}
              </p>
              <button
                onClick={restart}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-400 to-red-500 text-white rounded-2xl font-bold shadow hover:scale-105 transition"
              >
                Play Again
              </button>
              {showConfetti && (
                <ConfettiBurst
                  count={25}
                  onComplete={() => setShowConfetti(false)}
                />
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
