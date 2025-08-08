import React, { useState, useRef } from "react";
import {
  FaTimes,
  FaUsers,
  FaRobot,
  FaRegSmileBeam,
  FaHandPeace,
} from "react-icons/fa";
import useClickOutside from "../hooks/useClickOutside";

const GradientDivider = () => (
  <div className='w-full h-1 rounded-full my-4 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400' />
);

const Step = ({ number, children }) => (
  <li className='flex items-start gap-3'>
    <span className='flex-shrink-0 w-7 h-7 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-full text-white flex items-center justify-center font-bold shadow-md text-base'>
      {number}
    </span>
    <span className='text-gray-700'>{children}</span>
  </li>
);

const LearnMore = ({ setOpen }) => {
  const [modeInfo, setModeInfo] = useState(null);
  const modalRef = useRef(null);

  // Close on outside click
  useClickOutside(modalRef, () => {
    setOpen(false);
    setModeInfo(null);
  });

  // Animation for modal pop-in
  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-auto'>
      <div
        ref={modalRef}
        className='relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-0 animate-modal-pop'
        style={{ minHeight: 340 }}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            setOpen(false);
            setModeInfo(null);
          }}
          className='absolute top-4 right-4 text-gray-500 hover:text-red-500 transition'
          aria-label='Close'
        >
          <FaTimes size={22} />
        </button>

        {/* Content */}
        <div className='p-7 pt-8 pb-6 flex flex-col items-center'>
          {/* Stage 1: How to Play */}
          {!modeInfo && (
            <>
              {/* Title */}
              <h2 className='text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-center mb-2 animate-fade-in-down'>
                How to Play Tic Tac Toe
              </h2>
              <GradientDivider />

              {/* Cute illustration */}
              <div className='mb-5 mt-1'>
                <FaRegSmileBeam
                  size={52}
                  className='text-blue-300 drop-shadow'
                />
              </div>

              {/* Steps */}
              <ol className='list-none mb-6 flex flex-col gap-4 w-full sm:w-11/12 mx-auto animate-fade-in'>
                <Step number={1}>
                  Players take turns placing their mark (
                  <span className='font-bold text-blue-500'>X</span> or{" "}
                  <span className='font-bold text-green-500'>O</span>) in an
                  empty cell.
                </Step>
                <Step number={2}>
                  The first to get three in a row—horizontally, vertically, or
                  diagonally—wins the game.
                </Step>
                <Step number={3}>
                  If all nine cells fill up with no winner, it ends in a
                  friendly draw{" "}
                  <FaHandPeace className='inline text-yellow-400 ml-1' />.
                </Step>
              </ol>

              {/* Mode CTA */}
              <p className='text-gray-500 mb-4 text-center'>
                Pick a mode below to learn what makes each way to play unique!
              </p>
              <div className='flex gap-3 w-full'>
                <button
                  onClick={() => setModeInfo("1v1")}
                  className='flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:from-purple-500 hover:to-blue-500 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-300'
                >
                  <FaUsers className='text-lg' />
                  1v1 Local Play
                </button>
                <button
                  onClick={() => setModeInfo("computer")}
                  className='flex-1 py-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-400 text-white font-semibold shadow-lg hover:from-blue-400 hover:to-green-500 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-300'
                >
                  <FaRobot className='text-lg' />
                  Computer AI
                </button>
              </div>
            </>
          )}

          {/* Stage 2a: 1v1 Info */}
          {modeInfo === "1v1" && (
            <>
              <h2 className='text-2xl font-bold mb-3 text-blue-600 flex items-center gap-2 animate-fade-in-down'>
                <FaUsers className='text-xl' />
                1v1 Local Play
              </h2>
              <GradientDivider />
              <p className='text-gray-700 mb-4 text-center animate-fade-in'>
                Challenge a friend face-to-face on the same device. <br />
                Take turns placing X and O—first to three in a row takes the
                glory!
                <br />
                <span className='inline-block mt-3 text-purple-500 font-semibold'>
                  Perfect for friendly showdowns!
                </span>
              </p>
              <button
                onClick={() => setModeInfo(null)}
                className='mt-2 text-blue-500 hover:underline transition font-semibold animate-fade-in'
              >
                ← Back to modes
              </button>
            </>
          )}

          {/* Stage 2b: Computer Info */}
          {modeInfo === "computer" && (
            <>
              <h2 className='text-2xl font-bold mb-3 text-green-600 flex items-center gap-2 animate-fade-in-down'>
                <FaRobot className='text-xl' />
                Computer AI
              </h2>
              <GradientDivider />
              <p className='text-gray-700 mb-4 text-center animate-fade-in'>
                Play solo against our clever computer opponent.
                <br />
                Try <span className='font-semibold text-green-500'>
                  Easy
                </span>{" "}
                to warm up,
                <span className='font-semibold text-yellow-500 mx-1'>
                  Medium
                </span>{" "}
                for a challenge, or test your skills on{" "}
                <span className='font-semibold text-red-500'>Hard</span>!
                <br />
                <span className='inline-block mt-3 text-blue-500 font-semibold'>
                  Boost your strategy, anytime!
                </span>
              </p>
              <button
                onClick={() => setModeInfo(null)}
                className='mt-2 text-green-600 hover:underline transition font-semibold animate-fade-in'
              >
                ← Back to modes
              </button>
            </>
          )}
        </div>
        {/* Modal entrance animation */}
        <style>{`
          @keyframes modal-pop { 
            from{opacity:0; transform:scale(.96) translateY(18px);} 
            to{opacity:1; transform:scale(1) translateY(0);}
          }
          .animate-modal-pop { animation: modal-pop .45s cubic-bezier(.51,-0.04,.45,1.27) both; }
          @keyframes fade-in { from{opacity:0} to{opacity:1} }
          .animate-fade-in { animation: fade-in .75s both;}
          @keyframes fade-in-down { from{opacity:0; transform:translateY(-18px);} to{opacity:1; transform:translateY(0);} }
          .animate-fade-in-down { animation: fade-in-down .58s cubic-bezier(.42,0,.58,1) both;}
        `}</style>
      </div>
    </div>
  );
};

export default LearnMore;
