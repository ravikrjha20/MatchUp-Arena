import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // << import this!

const difficulties = [
  {
    label: "Easy",
    desc: "Great for beginners – the AI makes simple, random moves.",
    color: "from-green-300 to-green-500",
  },
  {
    label: "Medium",
    desc: "A balanced challenge – the AI mixes smart and random moves.",
    color: "from-yellow-300 to-yellow-500",
  },
  {
    label: "Hard",
    desc: "Ultimate challenge – the AI plays perfectly every time. Can you draw?",
    color: "from-red-300 to-pink-400",
  },
];

const PlayWithBot = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleStart = () => {
    if (selected) {
      // navigate to "/game?difficulty=easy|medium|hard", enforcing lowercase
      navigate(`/computer/game?difficulty=${selected.toLowerCase()}`);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-pink-50 flex flex-col justify-center items-center py-8 px-4'>
      {/* AI Robot Header */}
      <div className='mb-5 animate-wiggle'>
        <FaRobot className='text-7xl text-blue-400 drop-shadow-lg' />
      </div>
      <h1 className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-600 to-pink-500 mb-2 text-center'>
        Play Against Computer
      </h1>
      <p className='text-md sm:text-lg text-gray-700 mb-7 max-w-xl text-center'>
        Select a difficulty and see if you can outwit our AI. Ready for a brainy
        challenge?
      </p>

      {/* Difficulty Selection */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-3xl mb-7'>
        {difficulties.map((d) => (
          <button
            className={`flex flex-col items-center shadow-md rounded-2xl p-5 transition border-2
              bg-gradient-to-tr ${d.color}
              ${
                selected === d.label
                  ? "border-blue-700 scale-105 shadow-xl"
                  : "border-transparent hover:border-blue-400 hover:scale-105"
              }
              `}
            key={d.label}
            style={{ minHeight: 120 }}
            onClick={() => setSelected(d.label)}
          >
            <span
              className={`text-lg sm:text-xl font-bold mb-2 mt-1 ${
                selected === d.label ? "text-blue-800" : "text-gray-700"
              }`}
            >
              {d.label}
            </span>
            <span
              className={`text-xs sm:text-sm ${
                selected === d.label ? "text-gray-900" : "text-gray-800"
              } text-center`}
            >
              {d.desc}
            </span>
          </button>
        ))}
      </div>

      {/* Start Game Button */}
      <button
        className={`mt-2 px-8 py-3 rounded-full text-lg font-bold transition
          ${
            selected
              ? "bg-gradient-to-r from-blue-600 to-pink-500 text-white shadow-lg hover:brightness-105"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }
          animate-fade-in
        `}
        disabled={!selected}
        onClick={handleStart}
      >
        {selected ? `Start Game (${selected})` : "Select Difficulty to Start"}
      </button>

      {/* Animation styles */}
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-5deg);}
          50% { transform: rotate(6deg);}
        }
        .animate-wiggle { animation: wiggle 2.6s infinite; }
        @keyframes fade-in {from{opacity:0} to{opacity:1}}
        .animate-fade-in {animation:fade-in .75s both;}
      `}</style>
    </div>
  );
};

export default PlayWithBot;
