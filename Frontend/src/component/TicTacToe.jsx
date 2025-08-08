import React from "react";
import { useState } from "react";

const calculateWinner = (cells) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c])
      return cells[a];
  }
  return null;
};

const TicTacToe = () => {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const winner = calculateWinner(cells);
  const isDraw = !winner && cells.every((c) => c !== "");

  const handleClick = (i) => {
    if (cells[i] !== "" || winner) return;
    const next = [...cells];
    next[i] = turn;
    setCells(next);
    setTurn(turn === "X" ? "O" : "X");
  };
  const restart = () => {
    setCells(Array(9).fill(""));
    setTurn("X");
  };

  let status = winner
    ? `Winner: ${winner} 🎉`
    : isDraw
    ? "Draw! 🤝"
    : `Next: ${turn}`;

  return (
    <div className='flex flex-col items-center'>
      <div className='mb-2 text-white font-semibold'>{status}</div>
      <div className='grid grid-cols-3 gap-2'>
        {cells.map((_, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            className='w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border border-white/30 text-white font-bold cursor-pointer'
          >
            {cells[i]}
          </div>
        ))}
      </div>
      {(winner || isDraw) && (
        <button
          onClick={restart}
          className='mt-3 px-4 py-1 bg-white/20 hover:bg-white/40 text-white rounded transition'
        >
          Restart
        </button>
      )}
    </div>
  );
};

export default TicTacToe;
