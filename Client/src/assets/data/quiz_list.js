const quizList = [
  // Quiz 1: Practice English
  {
    id: "quiz001",
    title: "Practice English",
    subtitle: "Improve grammar, vocabulary & fun topics!",
    questions: [
      {
        id: "eng_q1",
        type: "mcq",
        question: "Which sentence is grammatically correct?",
        options: [
          "He don't like apples.",
          "She goes to the market.",
          "They is playing football.",
          "I has a new book.",
        ],
        answer: "She goes to the market.",
      },
      {
        id: "eng_q2",
        type: "typing",
        question: "Type the opposite of 'happy'.",
        answer: ["sad"],
      },
      {
        id: "eng_q3",
        type: "dragdrop",
        question: "Drag the nouns into the box.",
        items: [
          { id: "i1", label: "Cat 🐱", kind: "noun" },
          { id: "i2", label: "Run 🏃", kind: "verb" },
          { id: "i3", label: "Book 📚", kind: "noun" },
          { id: "i4", label: "Eat 🍔", kind: "verb" },
        ],
        answerKind: "noun",
      },
      {
        id: "eng_q4",
        type: "mcq",
        question: "What is the past tense of 'go'?",
        options: ["Goed", "Gone", "Went", "Going"],
        answer: "Went",
      },
      {
        id: "eng_q5",
        type: "typing",
        question: "Spell the word for a yellow fruit: 'b-a-n-a-n-a'",
        answer: ["banana"],
      },
    ],
  },

  // Quiz 2: Practice Geography
  {
    id: "quiz002",
    title: "Practice Geography",
    subtitle: "Test your knowledge of countries, rivers & wonders!",
    questions: [
      {
        id: "geo_q1",
        type: "mcq",
        question: "What is the capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        answer: "Tokyo",
      },
      {
        id: "geo_q2",
        type: "typing",
        question: "Which is the longest river in the world?",
        answer: ["nile", "the nile"],
      },
      {
        id: "geo_q3",
        type: "mcq",
        question: "Which continent is known as the 'Dark Continent'?",
        options: ["Asia", "Europe", "Africa", "Australia"],
        answer: "Africa",
      },
      {
        id: "geo_q4",
        type: "dragdrop",
        question: "Drag the wonders to their correct country.",
        items: [
            { id: "i1", label: "Eiffel Tower 🗼", kind: "France" },
            { id: "i2", label: "Taj Mahal 🕌", kind: "India" },
            { id: "i3", label: "Pyramids 🏜️", kind: "Egypt" },
        ],
        // Note: Drag-drop for matching is a different logic.
        // The current component supports "drag into a box".
        // For this example, let's just ask to drag the wonder from India.
        question: "Drag the wonder located in India into the box.",
        answerKind: "India",
      },
      {
        id: "geo_q5",
        type: "mcq",
        question: "Which is the largest desert in the world?",
        options: ["Sahara", "Gobi", "Kalahari", "Antarctic Polar"],
        answer: "Antarctic Polar",
      },
    ],
  },

  // Quiz 3: Math Quiz
  {
    id: "quiz003",
    title: "Math Quiz",
    subtitle: "Sharpen your problem-solving skills!",
    questions: [
      {
        id: "math_q1",
        type: "mcq",
        question: "What is 8 x 7?",
        options: ["48", "54", "56", "64"],
        answer: "56",
      },
      {
        id: "math_q2",
        type: "typing",
        question: "What is the next number in the sequence: 2, 4, 6, 8, ...?",
        answer: ["10"],
      },
      {
        id: "math_q3",
        type: "dragdrop",
        question: "Drag the even numbers into the box.",
        items: [
          { id: "i1", label: "12", kind: "even" },
          { id: "i2", label: "7", kind: "odd" },
          { id: "i3", label: "20", kind: "even" },
          { id: "i4", label: "15", kind: "odd" },
        ],
        answerKind: "even",
      },
      {
        id: "math_q4",
        type: "mcq",
        question: "How many sides does a triangle have?",
        options: ["Three", "Four", "Five", "Six"],
        answer: "Three",
      },
       {
        id: "math_q5",
        type: "typing",
        question: "Solve for x: x + 5 = 15",
        answer: ["10"],
      },
    ],
  },
];

export default quizList;