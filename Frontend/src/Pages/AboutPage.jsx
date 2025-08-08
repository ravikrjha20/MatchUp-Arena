import React from "react";
// If using react-router-dom for navigation, uncomment the next line
// import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className='relative min-h-screen bg-gradient-to-b from-blue-100 via-indigo-50 to-purple-100 font-sans text-gray-800 overflow-x-hidden'>
      {/* Decorative Blobs */}
      <div className='absolute top-0 -left-20 w-44 h-44 rounded-full bg-indigo-200 opacity-40 blur-2xl pointer-events-none'></div>
      <div className='absolute bottom-0 -right-24 w-56 h-56 rounded-full bg-purple-200 opacity-30 blur-3xl pointer-events-none'></div>

      <div className='relative container mx-auto max-w-4xl px-4 sm:px-8 py-10'>
        {/* Optional Back Button */}
        {/* <Link to="/" className="inline-block mb-6 text-indigo-600 hover:underline">
          ← Back to Home
        </Link> */}

        {/* Header */}
        <header className='text-center pt-8 pb-10 border-b border-gray-200 mb-10'>
          <h1 className='text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700 animate-fade-in-down'>
            Welcome to{" "}
            <span className='inline-block'>Tic-Tac-Toe Ultimate</span>
          </h1>
          <p className='text-lg sm:text-xl text-gray-500 mt-3 animate-fade-in'>
            The classic game of X's and O's, reimagined for the modern player.
          </p>
        </header>

        {/* Our Mission */}
        <section className='mb-16 animate-fade-in'>
          <h2 className='text-3xl font-semibold text-indigo-700 mb-4'>
            Our Mission
          </h2>
          <p className='text-base sm:text-lg leading-relaxed text-gray-700'>
            We believe even the simplest games can spark immense delight. Our
            mission is to reinvent the timeless Tic-Tac-Toe—featuring a
            beautiful interface, exciting new twists, and multiple ways to
            compete, learn, and have fun!
          </p>
        </section>

        {/* Features */}
        <section className='mb-16'>
          <h2 className='text-3xl font-semibold text-indigo-700 mb-8 text-center'>
            Game Modes
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* AI Mode Card */}
            <div className='group bg-white shadow-lg hover:shadow-2xl rounded-xl p-7 transition-all border border-indigo-100 hover:border-indigo-300 animate-fade-in-up'>
              <div className='flex items-center mb-4'>
                <span className='text-3xl md:text-4xl mr-2 animate-bounce-slow'>
                  🤖
                </span>
                <h3 className='text-xl md:text-2xl font-bold text-indigo-700'>
                  Play Against the AI
                </h3>
              </div>
              <p className='mb-2 text-gray-700'>
                Solo challenge? Try our custom-built AI with three levels:
              </p>
              <ul className='space-y-1 text-gray-600 list-disc list-inside pl-2'>
                <li>
                  <span className='font-semibold text-green-600'>Easy:</span>{" "}
                  Start basic and boost your confidence.
                </li>
                <li>
                  <span className='font-semibold text-yellow-600'>Medium:</span>{" "}
                  A smart opponent to sharpen your tactics.
                </li>
                <li>
                  <span className='font-semibold text-red-600'>Hard:</span> The
                  ultimate rival. Can you force a draw?
                </li>
              </ul>
            </div>

            {/* 1v1 Local Card */}
            <div className='group bg-white shadow-lg hover:shadow-2xl rounded-xl p-7 transition-all border border-green-100 hover:border-green-300 animate-fade-in-up delay-75'>
              <div className='flex items-center mb-4'>
                <span className='text-3xl md:text-4xl mr-2 animate-wiggle-slow'>
                  🧑‍🤝‍🧑
                </span>
                <h3 className='text-xl md:text-2xl font-bold text-green-700'>
                  1v1 Local Match
                </h3>
              </div>
              <p className='text-gray-700'>
                Challenge your friends on the same device—settle scores and
                claim bragging rights in real time!
              </p>
            </div>

            {/* Online Quick Match Card */}
            <div className='group bg-white shadow-lg hover:shadow-2xl rounded-xl p-7 transition-all border border-purple-100 hover:border-purple-300 animate-fade-in-up delay-150'>
              <div className='flex items-center mb-4'>
                <span className='text-3xl md:text-4xl mr-2 animate-spin-slow'>
                  🌐
                </span>
                <h3 className='text-xl md:text-2xl font-bold text-purple-700'>
                  Online Quick Match
                </h3>
              </div>
              <p className='text-gray-700'>
                Dive into instant battles with random opponents worldwide. Fast,
                fair, and fun—every match is a new challenge!
              </p>
            </div>

            {/* Tournament Card */}
            <div className='group bg-white shadow-lg hover:shadow-2xl rounded-xl p-7 transition-all border border-red-100 hover:border-red-300 animate-fade-in-up delay-200'>
              <div className='flex items-center mb-4'>
                <span className='text-3xl md:text-4xl mr-2 animate-pulse'>
                  🏆
                </span>
                <h3 className='text-xl md:text-2xl font-bold text-pink-700'>
                  Online Tournaments
                </h3>
              </div>
              <p className='text-gray-700'>
                Rise through knockout tournaments, test your mettle, and see
                your name soar up the leaderboards. Are you a legend?
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className='text-center mb-14 animate-fade-in'>
          <h2 className='text-2xl font-semibold text-indigo-700 mb-2'>
            Contact Us
          </h2>
          <p className='text-lg text-gray-700 mb-1'>
            Have questions, feature ideas, or just want to say hi?
          </p>
          <a
            href='mailto:tictactoeofficial2000@gmail.com'
            className='text-blue-600 hover:underline font-bold'
          >
            tictactoeofficial2000@gmail.com
          </a>
        </section>

        {/* Footer */}
        <footer className='text-center pt-8 pb-4 border-t border-gray-200 animate-fade-in'>
          <h2 className='text-2xl font-semibold mb-2 text-indigo-700'>
            Ready to Play?
          </h2>
          <p className='text-gray-600'>
            Choose a game mode from the home screen and get started. <br />
            Thanks for playing and being part of our amazing community!
          </p>
        </footer>
      </div>

      {/* Some simple Tailwind keyframes for subtle animations */}
      <style>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-2deg);}
          50% { transform: rotate(2deg);}
        }
        .animate-fade-in-down {animation: fade-in-down 0.6s cubic-bezier(.39,.575,.565,1) both;}
        .animate-fade-in-up {animation: fade-in-up 0.7s cubic-bezier(.39,.575,.565,1) both;}
        .animate-fade-in {animation: fade-in 1.2s cubic-bezier(.39,.575,.565,1) both;}
        .animate-bounce-slow {animation: bounce 2.6s infinite;}
        .animate-pulse {animation: pulse 1.8s infinite;}
        .animate-spin-slow {animation: spin 7s linear infinite;}
        .animate-wiggle-slow {animation: wiggle 2s infinite;}
      `}</style>
    </div>
  );
};

export default About;
