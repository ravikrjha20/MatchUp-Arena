// src/Pages/PlayWithComputer.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaRobot, FaChevronLeft } from "react-icons/fa";
import GridBoard from "../../component/BotBoard";

// Difficulty options for the banner
const DIFFICULTY_OPTIONS = {
  easy: {
    label: "Easy",
    banner: "from-green-400 via-lime-400 to-green-600",
    icon: (
      <span role='img' aria-label='Easy Bot'>
        🟢
      </span>
    ),
    desc: "The AI makes random, friendly moves! Good luck!",
    textColor: "text-green-700",
  },
  medium: {
    label: "Medium",
    banner: "from-yellow-400 via-orange-300 to-yellow-600",
    icon: (
      <span role='img' aria-label='Medium Bot'>
        🟡
      </span>
    ),
    desc: "The AI mixes smart and random moves. Stay sharp!",
    textColor: "text-yellow-800",
  },
  hard: {
    label: "Hard",
    banner: "from-red-400 via-pink-400 to-pink-600",
    icon: (
      <span role='img' aria-label='Hard Bot'>
        🔴
      </span>
    ),
    desc: "No mistakes, no mercy. The AI is at peak brainpower!",
    textColor: "text-rose-700",
  },
};

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const PlayWithComputer = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const difficulty = (query.get("difficulty") || "easy").toLowerCase();
  const mode = DIFFICULTY_OPTIONS[difficulty] || DIFFICULTY_OPTIONS.easy;

  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-blue-50 to-pink-50 overflow-x-hidden'>
      {/* Glowy blurred blobs in the background for extra depth */}
      <div className='fixed top-0 left-0 w-48 h-48 bg-green-200 opacity-25 rounded-full blur-[50px] -z-10 sm:block hidden' />
      <div className='fixed bottom-0 right-0 w-72 h-48 bg-pink-300 opacity-15 rounded-full blur-[70px] -z-10 sm:block hidden' />

      {/* Banner */}
      <section
        className={`
        w-full py-8 sm:py-11 text-center
        bg-gradient-to-r ${mode.banner} shadow-lg relative z-10
        rounded-b-3xl animate-fade-down
      `}
      >
        <div className='flex flex-col items-center justify-center text-white'>
          <FaRobot className='text-[2.4rem] sm:text-[2.9rem] mb-2 animate-robot-wiggle' />
          <div className='flex items-center gap-2 mb-1'>
            <span className='text-2xl'>{mode.icon}</span>
            <span className='text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-lg'>
              {mode.label} Mode
            </span>
          </div>
          <div className='text-base sm:text-lg max-w-xl mx-auto px-3 text-white/95'>
            {mode.desc}
          </div>
        </div>
      </section>

      {/* Controls */}
      <div className='pt-3 px-4 flex items-center'>
        <button
          onClick={() => navigate("/computer")}
          className='flex items-center gap-2 px-4 py-2 rounded-lg bg-white/95 hover:bg-blue-100 text-blue-500 font-semibold shadow-lg border border-blue-100 transition hover:scale-[1.04] focus:outline-none focus:ring-2 focus:ring-blue-300'
        >
          <FaChevronLeft /> Back to Mode Select
        </button>
      </div>

      {/* Game Board Panel */}
      <main className='flex-grow flex flex-col items-center justify-center pt-2 pb-8 md:pb-12 px-4'>
        {/* Game Area Container */}
        <div className='w-full flex flex-col items-center justify-center'>
          <div
            className='w-full max-w-xs sm:max-w-sm md:max-w-[420px] bg-white/95 shadow-xl rounded-3xl p-4 pb-7 mt-4
              border border-slate-200 animate-fade-up
          '
          >
            {/* Board injected here (will scale well on all screens) */}
            <GridBoard />
          </div>
        </div>
        {/* Optional: Extra info or tip bar */}
        <div
          className={`mt-7 text-[1.08rem] font-bold ${mode.textColor} text-center max-w-md animate-fade-in`}
        >
          ⚡ Hint:{" "}
          {mode.label === "easy"
            ? "Practice your basics and enjoy the game!"
            : mode.label === "medium"
            ? "Watch for AI tricks, but stay confident."
            : "The AI is unbeatable — can you force a draw?"}
        </div>
      </main>

      {/* Animations */}
      <style>{`
        @keyframes robot-wiggle {0%,100%{transform:rotate(-8deg);}50%{transform:rotate(7deg);}}
        .animate-robot-wiggle{animation:robot-wiggle 2.1s infinite}
        @keyframes fade-down{from{opacity:0;transform:translateY(-24px);}to{opacity:1;transform:translateY(0);}}
        .animate-fade-down{animation:fade-down 0.7s cubic-bezier(.49,.37,.62,1.07) both}
        @keyframes fade-up{from{opacity:0;transform:translateY(34px);}to{opacity:1;transform:translateY(0);}}
        .animate-fade-up{animation:fade-up 0.6s cubic-bezier(.33,.72,.45,1.19) both}
        @keyframes fade-in{from{opacity:0;}to{opacity:1;}}
        .animate-fade-in{animation:fade-in .82s both;}
      `}</style>
    </div>
  );
};

export default PlayWithComputer;
