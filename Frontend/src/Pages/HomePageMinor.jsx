import React, { useState } from "react";
import HomeImg from "../assets/Home.webp";
import { Link } from "react-router-dom";
import LearnMore from "./LearnMore";

const HomePageMinor = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='bg-gradient-to-br from-yellow-100 via-white to-yellow-200 min-h-screen'>
      <main className='flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-24 py-16 gap-12 max-w-6xl mx-auto'>
        {/* Text Section */}
        <section className='flex-1 text-center md:text-left'>
          <h1 className='text-4xl md:text-5xl font-bold mb-8 drop-shadow-lg'>
            Welcome to{" "}
            <span className='text-yellow-500 underline underline-offset-4'>
              TicTacZone
            </span>
          </h1>
          <p className='text-lg md:text-xl text-gray-700 mb-8 leading-relaxed'>
            🧠 Test your strategy.
            <br />
            👥 Challenge your friends.
            <br />
            🤖 Outsmart the AI.
            <br />
            <span className='font-semibold text-yellow-600'>
              All in one modern twist on the classic game.
            </span>
          </p>

          {/* This is the container for the buttons with the fix applied */}
          <div className='flex flex-col items-center sm:flex-row justify-center md:justify-start gap-6 mt-4'>
            <Link to='/computer'>
              <button
                className='
                  flex items-center gap-2
                  bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400
                  text-white font-semibold px-8 py-3
                  rounded-full shadow-xl
                  hover:scale-105 hover:bg-yellow-500
                  focus:outline-none focus:ring-2 focus:ring-yellow-500
                  active:scale-95
                  transition-all duration-200
                  text-lg
                '
              >
                🚀 Play Now
              </button>
            </Link>

            <button
              onClick={() => setOpen(true)}
              className='
                flex items-center gap-2
                bg-yellow-50 border border-yellow-300 text-yellow-700 font-semibold px-8 py-3
                rounded-full shadow-lg
                transition-all duration-200
                hover:bg-yellow-100 hover:border-yellow-400 hover:text-yellow-900
                focus:outline-none focus:ring-2 focus:ring-yellow-300
                active:scale-95
                text-lg
              '
            >
              Learn More
            </button>
          </div>
          {open && <LearnMore setOpen={setOpen} />}
        </section>

        {/* Image Section */}
        <section className='flex-1 hidden md:flex justify-end'>
          <img
            src={HomeImg}
            alt='Tic Tac Toe'
            className='w-full max-w-md mx-auto rounded-xl shadow-2xl border-[3px] border-yellow-200'
          />
        </section>
      </main>
    </div>
  );
};

export default HomePageMinor;
