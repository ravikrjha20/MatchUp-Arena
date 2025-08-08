import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getMove, checkWin } from "../../Logic/Logic";

const FULL_MASK = (1 << 9) - 1;
const getDifficulty = () =>
  (
    new URLSearchParams(window.location.search).get("difficulty") || "hard"
  ).toLowerCase();

export default function GridBoard() {
  const difficulty = getDifficulty();
  const [maskX, setMaskX] = useState(0);
  const [maskO, setMaskO] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [xTurn, setXTurn] = useState(Math.random() <= 0.5);
  const [board, setBoard] = useState(Array(9).fill(null));
  const aiTimeout = useRef();

  // Reset the board, and set a random first player
  const reset = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
    setMaskO(0);
    setMaskX(0);
    setXTurn(Math.random() <= 0.5);
  };

  // Update board for user move
  const userMove = (i) => {
    if (gameOver || board[i] !== null || xTurn === false) return;

    const bit = 1 << i;
    const newMaskO = maskO | bit;
    const newBoard = [...board];
    newBoard[i] = "O";

    setBoard(newBoard);
    setMaskO(newMaskO);

    if (checkWin(newMaskO)) {
      toast.success("🎉 You Win!");
      setGameOver(true);
      return;
    }
    if ((maskX | newMaskO) === FULL_MASK) {
      toast.success("It's a draw!");
      setGameOver(true);
      return;
    }
    setXTurn(false); // Now it's AI's turn
  };

  // Use useEffect to trigger aiMove after board/xTurn changes, but wait 700ms
  useEffect(() => {
    if (!gameOver && !xTurn) {
      aiTimeout.current = setTimeout(() => {
        // AI's move
        const i = getMove(difficulty, maskX, maskO);
        if (i === undefined || i === null) return;

        const bit = 1 << i;
        const newMaskX = maskX | bit;
        if (board[i] !== null) return; // already filled (shouldn't happen)

        const newBoard = [...board];
        newBoard[i] = "X";
        setBoard(newBoard);
        setMaskX(newMaskX);

        if (checkWin(newMaskX)) {
          toast.success("🤖 Ai Win!");
          setGameOver(true);
          return;
        }
        if ((newMaskX | maskO) === FULL_MASK) {
          toast.success("It's a draw!");
          setGameOver(true);
          return;
        }
        setXTurn(true); // Now user's turn
      }, 700); // delay in ms (e.g., 0.7s)
    }
    return () => clearTimeout(aiTimeout.current);
  }, [xTurn, board, maskX, maskO, gameOver, difficulty]);

  return (
    <div className='w-full flex flex-col items-center py-3 px-2'>
      {/* Ensure min-w and min-h on cell, text stays inside, size never jumps */}
      <div className='grid grid-cols-3 gap-2 w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square bg-gradient-to-br from-gray-200 to-gray-50 rounded-2xl shadow-xl p-2 mx-auto'>
        {board.map((val, i) => (
          <button
            disabled={gameOver || xTurn === false || board[i] !== null}
            key={i}
            onClick={() => userMove(i)}
            className={`
              board-box box-${i} 
              flex items-center justify-center 
              font-bold text-3xl sm:text-4xl md:text-5xl 
              leading-none 
              rounded-xl 
              transition 
              select-none 
              min-h-[68px] min-w-[68px] sm:min-h-[80px] sm:min-w-[80px] md:min-h-[96px] md:min-w-[96px] 
              aspect-square
              ${
                val === "X"
                  ? "bg-blue-400/90 text-white shadow-xl"
                  : val === "O"
                  ? "bg-rose-400/90 text-white shadow-xl"
                  : "bg-gray-700 hover:bg-gray-500/80 text-gray-300"
              }
              ${gameOver ? "cursor-not-allowed" : ""}
            `}
            style={{
              // Prevent outline jump on click, cell size stable
              outline: "none",
              boxSizing: "border-box",
            }}
          >
            <span className='w-full h-full flex items-center justify-center select-none transition-colors duration-75'>
              {val}
            </span>
          </button>
        ))}
      </div>

      <div className='text-base font-semibold text-gray-700 mt-5 min-h-[1.5em]'>
        {gameOver ? "Game Over" : xTurn ? "Your Turn" : "AI's Turn"}
      </div>

      <button
        onClick={reset}
        className='mt-4 px-7 py-2 rounded-full font-bold bg-gradient-to-r from-blue-500 to-green-400 text-white shadow-lg hover:brightness-110 transition'
      >
        {gameOver ? "Play Again" : "Reset"}
      </button>
    </div>
  );
}
