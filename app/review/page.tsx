'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Question {
  question: string;
  choices: string[];
  correct: string;
  subject: string;
}

const questions: Question[] = [
  // Crop Science
  {
    question: "Which of the following is the primary purpose of soil tillage in crop production?",
    choices: [
      "To increase soil compactness",
      "To control weeds and aerate the soil",
      "To reduce soil organic matter",
      "To increase water runoff"
    ],
    correct: "B",
    subject: "Crop Science"
  },
  {
    question: "What is the main function of photosynthesis in plants?",
    choices: [
      "To produce oxygen",
      "To convert light energy into chemical energy",
      "To absorb water from the soil",
      "To release carbon dioxide"
    ],
    correct: "B",
    subject: "Crop Science"
  },
  {
    question: "Which nutrient is primarily responsible for chlorophyll production in plants?",
    choices: [
      "Nitrogen",
      "Phosphorus",
      "Potassium",
      "Calcium"
    ],
    correct: "A",
    subject: "Crop Science"
  },
  // Soil Science
  {
    question: "What is the primary component of soil that provides nutrients to plants?",
    choices: [
      "Sand particles",
      "Organic matter",
      "Water",
      "Air"
    ],
    correct: "B",
    subject: "Soil Science"
  },
  {
    question: "Which soil texture has the largest particle size?",
    choices: [
      "Clay",
      "Silt",
      "Sand",
      "Loam"
    ],
    correct: "C",
    subject: "Soil Science"
  },
  // Crop Protection
  {
    question: "What is the primary goal of integrated pest management (IPM)?",
    choices: [
      "To eliminate all pests",
      "To use pesticides exclusively",
      "To minimize pesticide use while maintaining crop yield",
      "To focus only on biological control"
    ],
    correct: "C",
    subject: "Crop Protection"
  },
  {
    question: "Which of the following is a fungal disease affecting crops?",
    choices: [
      "Bacterial blight",
      "Powdery mildew",
      "Viral mosaic",
      "Nematode infection"
    ],
    correct: "B",
    subject: "Crop Protection"
  },
  // Animal Science
  {
    question: "What is the primary function of ruminant animals' multiple stomach compartments?",
    choices: [
      "To store food",
      "To digest cellulose through microbial fermentation",
      "To produce milk",
      "To regulate body temperature"
    ],
    correct: "B",
    subject: "Animal Science"
  },
  {
    question: "Which vitamin is essential for blood clotting in animals?",
    choices: [
      "Vitamin A",
      "Vitamin D",
      "Vitamin K",
      "Vitamin E"
    ],
    correct: "C",
    subject: "Animal Science"
  },
  // Agricultural Economics
  {
    question: "What does the law of diminishing returns state?",
    choices: [
      "As input increases, output increases proportionally",
      "As input increases, output increases but at a decreasing rate",
      "As input increases, output decreases",
      "Inputs have no effect on outputs"
    ],
    correct: "B",
    subject: "Agricultural Economics"
  },
  {
    question: "Which market structure is characterized by many buyers and sellers with no single entity controlling the market?",
    choices: [
      "Monopoly",
      "Oligopoly",
      "Perfect competition",
      "Monopolistic competition"
    ],
    correct: "C",
    subject: "Agricultural Economics"
  },
  // Extension
  {
    question: "What is the primary role of agricultural extension services?",
    choices: [
      "To enforce government regulations",
      "To disseminate research-based knowledge to farmers",
      "To sell agricultural products",
      "To manage farm finances"
    ],
    correct: "B",
    subject: "Extension"
  },
  {
    question: "Which communication method is most effective for reaching rural farmers?",
    choices: [
      "Social media only",
      "Radio broadcasts",
      "Personal visits and demonstrations",
      "Email newsletters"
    ],
    correct: "C",
    subject: "Extension"
  }
];

export default function ReviewPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const router = useRouter();

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      router.push('/login');
      return;
    }
    setCurrentUser(user);
  }, [router]);

  const handleSelect = (choice: string) => {
    setSelected(choice);
  };

  const handleNext = () => {
    if (!selected) {
      alert('Please select an answer first.');
      return;
    }

    // Check if correct
    if (selected === currentQuestion.correct) {
      setScore(score + 1);
    }

    // Move to next question or show results
    moveToNext();
  };

  const handleSkip = () => {
    setSkipped(skipped + 1);
    moveToNext();
  };

  const moveToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelected(null);
    } else {
      setShowResults(true);
      saveResults();
    }
  };

  const saveResults = () => {
    if (!currentUser) return;
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const result = {
      date: new Date().toISOString(),
      score,
      total: questions.length,
      skipped
    };
    users[currentUser].history = users[currentUser].history || [];
    users[currentUser].history.push(result);
    localStorage.setItem('users', JSON.stringify(users));
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelected(null);
    setScore(0);
    setSkipped(0);
    setShowResults(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center p-6 text-brand-dark">
        <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
          <h2 className="text-3xl font-bold mb-4 text-brand-primary">Quiz Complete!</h2>
          <p className="text-xl mb-2">
            Your score: {score} / {questions.length}
          </p>
          <p className="text-lg mb-2">
            Skipped: {skipped}
          </p>
          <p className="text-lg mb-6">
            Percentage: {Math.round((score / questions.length) * 100)}%
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={handleRestart}
              className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-dark transition-all shadow-md"
            >
              Restart Quiz
            </button>
            <button 
              onClick={() => router.push('/')}
              className="bg-gray-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-600 transition-all shadow-md"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center p-6 text-brand-dark">
      
      {/* Header / Progress Area */}
      <div className="w-full max-w-2xl mb-6 flex justify-between items-center">
        <span className="font-bold text-brand-primary">Board Exam Reviewer</span>
        <div className="flex items-center gap-4">
          <span className="text-sm bg-brand-accent text-white px-3 py-1 rounded-full">
            Question {currentQuestionIndex + 1} / {questions.length}
          </span>
          <button 
            onClick={() => router.push('/')}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-all"
          >
            Quit to Home
          </button>
        </div>
      </div>

      {/* The Question Card */}
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        
        {/* Subject */}
        <div className="mb-4">
          <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
            {currentQuestion.subject}
          </span>
        </div>
        
        {/* Question Text */}
        <h2 className="text-2xl font-bold mb-8 text-brand-primary leading-snug">
          {currentQuestion.question}
        </h2>

        {/* Choices Container */}
        <div className="space-y-3">
          {currentQuestion.choices.map((choice, index) => {
            const letter = String.fromCharCode(65 + index); // A, B, C, D
            return (
              <button 
                key={letter}
                onClick={() => handleSelect(letter)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group ${
                  selected === letter 
                    ? 'border-brand-primary bg-brand-light' 
                    : 'border-gray-100 hover:border-brand-primary hover:bg-brand-light'
                }`}
              >
                <span className="font-bold text-brand-accent mr-3">{letter}.</span>
                <span className={selected === letter ? 'text-brand-primary' : 'group-hover:text-brand-primary'}>
                  {choice}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full max-w-2xl mt-8 flex justify-between">
        <button 
          onClick={handleSkip}
          className="bg-gray-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-600 transition-all shadow-md"
        >
          Skip Question
        </button>
        <button 
          onClick={handleNext}
          className="bg-brand-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-dark transition-all shadow-md"
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
        </button>
      </div>

    </div>
  );
}