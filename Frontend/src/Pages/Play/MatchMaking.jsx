import React, { useState, useRef } from "react";

function Spinner() {
  return (
    <div className='w-12 h-12 flex items-center justify-center'>
      <svg className='animate-spin h-10 w-10 text-blue-400' viewBox='0 0 24 24'>
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
          fill='none'
        />
        <path
          className='opacity-80'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
        />
      </svg>
    </div>
  );
}

export default function MatchmakingPage() {
  const [status, setStatus] = useState("idle"); // idle | searching | found
  const [opponent, setOpponent] = useState(null);
  const timerRef = useRef();

  const me = {
    name: "You",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=YourName",
  };

  const mockFindOpponent = () => {
    setStatus("searching");
    timerRef.current = setTimeout(() => {
      setStatus("found");
      setOpponent({
        name: "DexterBlue",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=dexterblue",
        rating: 1530,
      });
    }, 2500 + Math.random() * 2000); // simulating random matchmaking time
  };

  const handleCancel = () => {
    setStatus("idle");
    setOpponent(null);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleStartGame = () => {
    // Plug into your real routing/game-start logic!
    alert("Game starting!");
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4'>
      <div className='w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center relative overflow-hidden'>
        <h1 className='text-3xl md:text-4xl font-bold mb-7 text-blue-600 tracking-tight drop-shadow-xl'>
          1v1 Matchmaking
        </h1>

        {/* Players display */}
        <div className='w-full flex items-center justify-between gap-6 mb-7 transition-all duration-300'>
          {/* You */}
          <div className='flex flex-col items-center'>
            <img
              src={me.avatar}
              alt='you'
              className='w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-blue-400 shadow-lg transition-transform duration-300'
            />
            <div className='font-semibold mt-2 text-blue-500 text-lg'>
              {me.name}
            </div>
          </div>

          {/* VS/Searching transition */}
          <div className='flex flex-col items-center'>
            {status === "found" ? (
              <div className='text-xl md:text-2xl font-bold text-green-500 animate-pulse'>
                VS
              </div>
            ) : status === "searching" ? (
              <Spinner />
            ) : (
              <div className='text-xl text-gray-400'>VS</div>
            )}
          </div>

          {/* Opponent */}
          <div
            className={`flex flex-col items-center transition-all duration-700 ${
              status === "found"
                ? "opacity-100 translate-y-0"
                : "opacity-40 grayscale blur-sm translate-y-2"
            }`}
          >
            <img
              src={
                status === "found"
                  ? opponent?.avatar
                  : "https://api.dicebear.com/7.x/micah/svg?seed=Waiting"
              }
              alt='opponent'
              className='w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-gray-300 shadow-lg'
            />
            <div className='font-semibold mt-2 text-gray-500 text-lg'>
              {status === "found" ? opponent?.name : "Searching..."}
            </div>
            {status === "found" && (
              <div className='text-xs text-gray-400 -mt-1'>{`Rating: ${opponent?.rating}`}</div>
            )}
          </div>
        </div>

        {/* Find/Cancel/Play buttons */}
        <div className='w-full flex flex-col items-center transition-all'>
          {status === "idle" && (
            <button
              className='px-8 py-3 mb-3 rounded-full font-semibold text-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl hover:scale-105 transition'
              onClick={mockFindOpponent}
            >
              Find Opponent
            </button>
          )}
          {status === "searching" && (
            <button
              onClick={handleCancel}
              className='px-6 py-2 mb-3 rounded-full font-semibold text-base bg-gray-200 hover:bg-gray-300 text-gray-600 transition'
            >
              Cancel Search
            </button>
          )}
          {status === "found" && (
            <button
              className='px-10 py-3 mt-2 rounded-full font-bold text-lg bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg hover:scale-105 transition'
              onClick={handleStartGame}
            >
              Start Game
            </button>
          )}

          {/* Optionally show tip during searching */}
          {status === "searching" && (
            <div className='mt-4 text-blue-400 animate-pulse'>
              Looking for an opponent...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
