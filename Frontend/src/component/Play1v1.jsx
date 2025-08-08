import React from "react";
import useMatchStore from "../../store/useMatchStore";
import { toast } from "react-toastify";
import { FaRedo } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { checkWin } from "../../Logic/Logic";

const FULL_MASK = (1 << 9) - 1;

export default function OnlineGame() {
  const {
    userMask,
    opponentMask,
    turn,
    opponentId,
    opponentName,
    setUserMask,
    setOpponentMask,
    setTurn,
    resetMatch,
    Mark,
    opponentMark,
  } = useMatchStore();

  const board = Array(9).fill(null);
  for (let i = 0; i < 9; ++i) {
    const bit = 1 << i;
    if (userMask & bit) board[i] = Mark;
    else if (opponentMask & bit) board[i] = opponentMark;
  }

  const gameOver =
    checkWin(userMask) ||
    checkWin(opponentMask) ||
    (userMask | opponentMask) === FULL_MASK;

  const userWon = checkWin(userMask);
  const opponentWon = checkWin(opponentMask);
  const draw =
    !userWon && !opponentWon && (userMask | opponentMask) === FULL_MASK;

  const handleClick = (i) => {
    if (gameOver) return;

    const bit = 1 << i;
    const allMask = userMask | opponentMask;

    if ((bit & allMask) !== 0) return;
    if (turn !== "user") return;

    const newUserMask = userMask | bit;
    setUserMask(newUserMask);

    if (checkWin(newUserMask)) {
      toast.success("🎉 You Win!");
    } else if ((newUserMask | opponentMask) === FULL_MASK) {
      toast.info("It's a draw!");
    }

    setTurn("opponent");

    // In real use, emit the move to opponent via socket
  };

  const renderStatus = () => {
    if (userWon) return "🎉 You Win!";
    if (opponentWon) return `😢 ${opponentName || "Opponent"} Wins!`;
    if (draw) return "🤝 It's a Draw!";
    return turn === "user"
      ? "Your Turn"
      : `${opponentName || "Opponent"}'s Turn`;
  };

  return (
    <div className='min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-100 via-blue-50 to-pink-50 py-8 px-3'>
      {/* Game Board */}
      <div
        className='grid grid-cols-3 gap-2 w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square bg-gradient-to-br from-gray-200 to-gray-50 rounded-3xl shadow-xl p-3 animate-fade-in'
        style={{ minHeight: 280, touchAction: "manipulation" }}
      >
        {board.map((val, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            style={{ aspectRatio: "1/1" }}
            disabled={val !== null || gameOver || turn !== "user"}
            className={`
              flex items-center justify-center select-none
              font-bold text-3xl sm:text-4xl md:text-5xl
              rounded-xl transition
              ${
                val === "X"
                  ? "bg-blue-400/90 text-white shadow-xl"
                  : val === "O"
                  ? "bg-rose-400/90 text-white shadow-xl"
                  : "bg-gray-700 hover:bg-gray-600 text-gray-300"
              }
            `}
          >
            {val}
          </button>
        ))}
      </div>

      {/* Game Status */}
      <div className='mt-5 text-center font-semibold text-gray-700 min-h-[1.6em]'>
        {renderStatus()}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetMatch}
        className='flex items-center gap-2 mt-4 px-7 py-2 rounded-full font-bold bg-gradient-to-r from-blue-500 to-green-400 text-white shadow-lg hover:brightness-110 transition'
      >
        <FaRedo className='mr-2' /> Reset
      </button>

      {/* CSS Animation */}
      <style>{`
        @keyframes fade-in {from{opacity:0}to{opacity:1}}
        .animate-fade-in{animation:fade-in .6s both}
      `}</style>
    </div>
  );
}
