import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { FaUserFriends, FaRedo, FaPlay } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { checkWin } from "../../Logic/Logic";
/* ---------- helpers ---------- */
function useClickOutside(ref, onClose) {
  React.useEffect(() => {
    const handler = (e) =>
      ref.current && !ref.current.contains(e.target) && onClose();
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose, ref]);
}

/* ---------- name modal ---------- */
const PlayerModal = ({ open, onSubmit, onClose }) => {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const box = useRef(null);
  useClickOutside(box, onClose);

  if (!open) return null;
  return (
    <div className='fixed inset-0 z-40 bg-black/50 flex items-center justify-center'>
      <form
        ref={box}
        className='bg-white rounded-2xl shadow-xl px-7 py-8 w-80 flex flex-col items-center'
        onSubmit={(e) => {
          e.preventDefault();
          if (p1.trim() && p2.trim()) {
            onSubmit([p1.trim(), p2.trim()]);
            setP1("");
            setP2("");
          }
        }}
      >
        <FaUserFriends className='text-blue-400 text-4xl mb-2' />
        <h2 className='text-2xl font-extrabold mb-6 text-blue-700'>
          Enter player names
        </h2>
        <input
          value={p1}
          onChange={(e) => setP1(e.target.value)}
          placeholder="First player's name"
          className='mb-4 px-4 py-2 rounded-lg border w-full focus:ring-2 focus:ring-blue-300'
          maxLength={20}
          autoFocus
          required
        />
        <input
          value={p2}
          onChange={(e) => setP2(e.target.value)}
          placeholder="Second player's name"
          className='mb-6 px-4 py-2 rounded-lg border w-full focus:ring-2 focus:ring-pink-300'
          maxLength={20}
          required
        />
        <button
          type='submit'
          disabled={!p1.trim() || !p2.trim()}
          className='px-7 py-2 rounded-full font-bold bg-gradient-to-r from-blue-500 to-green-400 text-white shadow-lg hover:brightness-110 transition'
        >
          Let&rsquo;s Play!
        </button>
      </form>
    </div>
  );
};

/* ---------- main board ---------- */
const OfflineBoard = () => {
  const [names, setNames] = useState(["", ""]);
  const [modalOpen, setModalOpen] = useState(false);

  const [xMask, setXMask] = useState(0);
  const [oMask, setOMask] = useState(0);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [firstX, setFirstX] = useState(true); // true→names[0] is X

  /* start / submit */
  const startGame = (enteredNames) => {
    const randomX = Math.random() < 0.5;
    setFirstX(randomX);
    setNames(enteredNames);
    setIsXTurn(randomX);
    setBoard(Array(9).fill(null));
    setXMask(0);
    setOMask(0);
    setGameOver(false);
    setModalOpen(false);
  };

  /* auto-reset after win/draw */
  useEffect(() => {
    if (gameOver) {
      const t = setTimeout(() => {
        setBoard(Array(9).fill(null));
        setXMask(0);
        setOMask(0);
        setGameOver(false);
        setIsXTurn(firstX);
      }, 2_000);
      return () => clearTimeout(t);
    }
  }, [gameOver, firstX]);

  /* move */
  const move = (idx) => {
    if (modalOpen) {
      toast.info("Enter player names first!"); // safeguard
      return;
    }
    if (board[idx] || gameOver) return;

    const next = [...board];
    next[idx] = isXTurn ? "X" : "O";
    setBoard(next);

    if (isXTurn) {
      const mask = xMask | (1 << idx);
      setXMask(mask);
      if (checkWin(mask)) {
        toast.success(`🎉 ${firstX ? names[0] : names[1]} wins!`);
        setGameOver(true);
        return;
      }
    } else {
      const mask = oMask | (1 << idx);
      setOMask(mask);
      if (checkWin(mask)) {
        toast.success(`🎉 ${firstX ? names[1] : names[0]} wins!`);
        setGameOver(true);
        return;
      }
    }

    if (next.every(Boolean)) {
      toast.info("It’s a draw!");
      setGameOver(true);
      return;
    }
    setIsXTurn((t) => !t);
  };

  /* banner helper */
  const turnName = () =>
    isXTurn ? (firstX ? names[0] : names[1]) : firstX ? names[1] : names[0];

  /* jsx */
  return (
    <div className='min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-100 via-blue-50 to-pink-50 py-8 px-3'>
      <PlayerModal
        open={modalOpen}
        onSubmit={startGame}
        onClose={() => setModalOpen(false)}
      />

      {/* header */}
      <div className='flex flex-col items-center mb-6 animate-fade-in-down'>
        <FaUserFriends className='text-6xl text-blue-400 mb-2' />
        <h1 className='text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-600 to-pink-500'>
          Local 2-Player
        </h1>
        <p className='text-gray-600 mt-1 text-center'>
          Pass the device and take turns – first to line up three wins.
        </p>

        {/* start / roles */}
        <button
          className='flex items-center gap-2 mt-4 px-7 py-2 rounded-full font-bold bg-gradient-to-r from-pink-500 to-blue-400 text-white shadow-lg hover:brightness-110 transition'
          onClick={() => setModalOpen(true)}
        >
          <FaPlay /> Start
        </button>

        {!modalOpen && names[0] && names[1] && (
          <div className='mt-3 flex gap-3'>
            <span className='bg-blue-100 px-3 py-1 rounded-lg font-semibold text-blue-700'>
              <b>{firstX ? names[0] : names[1]}</b> is X
            </span>
            <span className='bg-pink-100 px-3 py-1 rounded-lg font-semibold text-pink-700'>
              <b>{firstX ? names[1] : names[0]}</b> is O
            </span>
          </div>
        )}
      </div>

      {/* board */}
      <div
        className='grid grid-cols-3 gap-2 w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square bg-gradient-to-br from-gray-200 to-gray-50 rounded-3xl shadow-xl p-3 animate-fade-in'
        style={{ minHeight: 280, touchAction: "manipulation" }}
      >
        {Array.from({ length: 9 }, (_, i) => (
          <button
            key={i}
            onClick={() => move(i)}
            style={{ aspectRatio: "1/1" }}
            disabled={modalOpen}
            className={`
              flex items-center justify-center select-none
              font-bold text-3xl sm:text-4xl md:text-5xl
              rounded-xl transition
              ${
                board[i] === "X"
                  ? "bg-blue-400/90 text-white shadow-xl"
                  : board[i] === "O"
                  ? "bg-rose-400/90 text-white shadow-xl"
                  : "bg-gray-700 hover:bg-gray-600 text-gray-300"
              }
            `}
          >
            {board[i]}
          </button>
        ))}
      </div>

      {/* status */}
      <div className='mt-5 text-center font-semibold text-gray-700 min-h-[1.6em]'>
        {modalOpen || !names[0]
          ? ""
          : gameOver
          ? "Game over • new round in 2 s"
          : `Turn: ${turnName()}`}
      </div>

      {/* new players button */}
      <button
        onClick={() => {
          setNames(["", ""]);
          setModalOpen(true);
        }}
        disabled={modalOpen}
        className='flex items-center gap-2 mt-4 px-7 py-2 rounded-full font-bold bg-gradient-to-r from-blue-500 to-green-400 text-white shadow-lg hover:brightness-110 transition'
      >
        <FaRedo /> New Players
      </button>

      {/* animations */}
      <style>{`
        @keyframes fade-in {from{opacity:0}to{opacity:1}}
        @keyframes fade-in-down {from{opacity:0;transform:translateY(-18px);}to{opacity:1;transform:translateY(0);}}
        .animate-fade-in{animation:fade-in .6s both}
        .animate-fade-in-down{animation:fade-in-down .7s both}
      `}</style>
    </div>
  );
};

export default OfflineBoard;
