import React from "react";
import useAuthStore from "../store/useAuthStore";
import {
  FaTrophy,
  FaCoins,
  FaUserCircle,
  FaCrown,
  FaEnvelope,
  FaChartLine,
} from "react-icons/fa";
import { FaUserLock, FaGamepad } from "react-icons/fa";
import { Link } from "react-router-dom";
const statClasses =
  "flex flex-col items-center justify-center bg-white/70 rounded-xl shadow-md p-6 sm:p-8 text-center transition hover:scale-105 hover:shadow-2xl";

const Dashboard = () => {
  const { user, login } = useAuthStore(); // Ensure your store provides the user object

  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center h-[70vh] bg-gradient-to-br from-yellow-100 via-yellow-50 to-white px-4'>
        {/* Friendly Icon or SVG */}
        <div className='mb-6 animate-fade-in'>
          <FaUserLock className='text-[5rem] text-yellow-400 drop-shadow-md' />
        </div>
        {/* Message */}
        <div className='text-center mb-8 animate-fade-in-down'>
          <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>
            Welcome, Challenger!
          </h2>
          <p className='text-gray-600 text-lg'>
            You must be logged in to view your dashboard and stats.
            <br />
            Join the action and track your progress!
          </p>
        </div>
        {/* Button */}
        <Link to='../auth/login' tabIndex={0}>
          <button
            className='bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 shadow-lg text-white font-bold px-8 py-3 rounded-full text-lg transition-all ring-yellow-400 focus:ring-2 focus:outline-none animate-bounce 
          hover:shadow-yellow-200 mt-2'
          >
            Login to Continue
          </button>
        </Link>
        {/* Add a fade-in keyframe! */}
        <style>{`
        @keyframes fade-in { from{opacity:0} to{opacity:1} }
        @keyframes fade-in-down { from{opacity:0; transform:translateY(-16px);} to{opacity:1; transform:translateY(0);} }
        .animate-fade-in { animation: fade-in .6s both;}
        .animate-fade-in-down { animation: fade-in-down .8s cubic-bezier(.42,0,.58,1) both;}
      `}</style>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-tr from-purple-100 via-blue-50 to-pink-50 px-3 pb-16'>
      <div className='max-w-3xl mx-auto pt-8'>
        {/* Profile Card */}
        <div className='flex flex-col items-center bg-white/90 rounded-2xl shadow-xl px-7 py-10 mb-10 mt-5 relative z-10'>
          <div className='mb-4'>
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className='w-24 h-24 rounded-full border-4 border-blue-200 object-cover'
              />
            ) : (
              <FaUserCircle className='w-24 h-24 text-indigo-300 mb-1' />
            )}
          </div>
          <h2 className='text-3xl font-extrabold text-indigo-700 flex gap-2 items-center'>
            {user.name}
            <FaCrown
              className='text-yellow-400 inline-block text-2xl'
              title='Player'
            />
          </h2>
          <p className='text-gray-600 mt-1 font-mono text-base'>
            {user.username}
          </p>
          <a
            href={`mailto:${user.email}`}
            className='text-sm text-indigo-500 hover:underline mt-2 flex items-center gap-1'
            title='Contact Email'
          >
            <FaEnvelope className='inline-block' />
            {user.email}
          </a>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 mb-10'>
          {/* Coins */}
          <div className={statClasses}>
            <FaCoins className='text-3xl sm:text-4xl text-yellow-400 mb-2' />
            <span className='text-xl font-semibold text-gray-800'>
              {user.coins}
            </span>
            <span className='text-xs sm:text-sm text-gray-500 uppercase tracking-wide'>
              Coins
            </span>
          </div>
          {/* Rating */}
          <div className={statClasses}>
            <FaChartLine className='text-3xl sm:text-4xl text-blue-500 mb-2' />
            <span className='text-xl font-semibold text-gray-800'>
              {user.rating}
            </span>
            <span className='text-xs sm:text-sm text-gray-500 uppercase tracking-wide'>
              Rating
            </span>
          </div>
          {/* Wins */}
          <div className={statClasses}>
            <FaTrophy className='text-3xl sm:text-4xl text-green-500 mb-2' />
            <span className='text-xl font-semibold text-gray-800'>
              {user.wins}
            </span>
            <span className='text-xs sm:text-sm text-gray-500 uppercase tracking-wide'>
              Wins
            </span>
          </div>
          {/* Losses */}
          <div className={statClasses}>
            <span
              role='img'
              aria-label='Sad'
              className='text-3xl sm:text-4xl text-red-400 mb-2'
            >
              😔
            </span>
            <span className='text-xl font-semibold text-gray-800'>
              {user.losses}
            </span>
            <span className='text-xs sm:text-sm text-gray-500 uppercase tracking-wide'>
              Losses
            </span>
          </div>
          {/* Draws */}
          <div className={statClasses}>
            <span
              role='img'
              aria-label='Handshake'
              className='text-3xl sm:text-4xl text-yellow-600 mb-2'
            >
              🤝
            </span>
            <span className='text-xl font-semibold text-gray-800'>
              {user.draws}
            </span>
            <span className='text-xs sm:text-sm text-gray-500 uppercase tracking-wide'>
              Draws
            </span>
          </div>
          {/* Matches Played */}
          <div className={statClasses}>
            <FaGamepad className='text-3xl sm:text-4xl text-indigo-400 mb-2' />
            <span className='text-xl font-semibold text-gray-800'>
              {(user.matches && user.matches.length) ||
                user.wins + user.losses + user.draws}
            </span>
            <span className='text-xs sm:text-sm text-gray-500 uppercase tracking-wide'>
              Matches
            </span>
          </div>
        </div>

        {/* Online status */}
        <div className='flex justify-center items-center space-x-2 mt-6'>
          <span
            className={`inline-block w-3 h-3 rounded-full ${
              user.isOnline ? "bg-green-400 animate-pulse" : "bg-gray-400"
            }`}
            title={user.isOnline ? "Online" : "Offline"}
          ></span>
          <span
            className={`text-sm font-medium ${
              user.isOnline ? "text-green-500" : "text-gray-500"
            }`}
          >
            {user.isOnline ? "Online now" : "Offline"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
