import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMatchStore from "../store/useMatchStore";
import useAuthStore from "../store/useAuthStore";

const { user } = useAuthStore.getState();

const PlayOnlyGameBoard = () => {
  const navigate = useNavigate();

  const {
    userMask,
    opponentMask,
    turn,
    mark,
    opponentMark,
    opponentId,
    opponentName,
    makeMove,
    resetMatch, // ✅ result-storing function
    matchStatus, // ✅ now using backend-provided match status
  } = useMatchStore();

  useEffect(() => {
    console.log(matchStatus);

    if (matchStatus !== "ongoing") {
      const timer = setTimeout(() => {
        resetMatch();
        navigate("../online/quick");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [matchStatus, navigate, user]);

  if (!opponentId) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen p-4 font-sans bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100'>
        <h1 className='mb-4 text-6xl font-bold tracking-tight text-white'>
          Tic-Tac-Toe
        </h1>
        <p className='text-xl text-gray-400 animate-pulse'>
          Waiting for an active game...
        </p>
      </div>
    );
  }

  const handleCellClick = (index) => {
    const bit = 1 << index;
    if (
      turn &&
      matchStatus === "ongoing" &&
      !((userMask | opponentMask) & bit)
    ) {
      makeMove(index);
    }
  };

  const getCellContent = (index) => {
    if ((userMask >> index) & 1) return mark;
    if ((opponentMask >> index) & 1) return opponentMark;
    return null;
  };

  const buttonClasses =
    "py-3 px-8 text-lg font-semibold text-white bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transform transition-all duration-300 ease-in-out";

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 font-sans bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100'>
      <div className='mb-6 text-center min-h-[90px]'>
        <h2 className='text-3xl font-bold text-white'>
          Playing against {opponentName || "Opponent"}
        </h2>
        {matchStatus === "ongoing" && (
          <p className='mt-2 text-xl text-gray-300'>
            {turn ? "Your turn" : `Waiting for ${opponentName}...`}
          </p>
        )}
        {matchStatus === "win" && (
          <h3 className='mt-3 text-3xl font-bold text-emerald-400 animate-pulse'>
            You Won!
          </h3>
        )}
        {matchStatus === "loss" && (
          <h3 className='mt-3 text-3xl font-bold text-rose-500'>You Lost</h3>
        )}
        {matchStatus === "draw" && (
          <h3 className='mt-3 text-3xl font-bold text-amber-400'>
            It's a Draw!
          </h3>
        )}
      </div>

      <div className='grid grid-cols-3 gap-3 p-4 bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg shadow-2xl'>
        {Array.from({ length: 9 }).map((_, index) => {
          const content = getCellContent(index);
          const isClickable = !content && turn && matchStatus === "ongoing";

          return (
            <div
              key={index}
              className={`w-24 h-24 md:w-28 md:h-28 flex justify-center items-center text-6xl font-extrabold rounded-md transition-all duration-200 ease-in-out transform ${
                isClickable
                  ? "bg-white/5 cursor-pointer hover:bg-white/20 hover:scale-105"
                  : "bg-transparent"
              }`}
              onClick={() => handleCellClick(index)}
            >
              <span
                className={`transition-colors duration-300 ${
                  content === "X" ? "text-rose-400" : ""
                } ${content === "O" ? "text-cyan-400" : ""}`}
              >
                {content}
              </span>
            </div>
          );
        })}
      </div>

      {matchStatus !== "ongoing" && (
        <div className='mt-8'>
          <button onClick={resetMatch} className={buttonClasses}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayOnlyGameBoard;
