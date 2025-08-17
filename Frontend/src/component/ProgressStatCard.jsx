// components/ProgressStatCard.js

import React from "react";
const colorMap = {
  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
    progress: "bg-yellow-400",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    progress: "bg-blue-400",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    progress: "bg-green-400",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
    progress: "bg-red-400",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    progress: "bg-purple-400",
  },
  indigo: {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    progress: "bg-indigo-400",
  },
};

const ProgressStatCard = ({
  icon: Icon,
  title,
  value,
  maxValue,
  color,
  onClick,
}) => {
  // Calculate progress, ensuring no division by zero.
  const progressPercentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

  // Select color styles from the map, with a fallback to 'yellow'.
  const styles = colorMap[color] || colorMap.yellow;

  return (
    <div
      onClick={onClick}
      // RESPONSIVE CHANGE: Adjusted padding
      className='group bg-white shadow rounded-2xl p-4 sm:p-5 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer flex flex-col justify-between'
      role='button'
      tabIndex={onClick ? 0 : -1}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Top section with Icon and Text */}
      <div>
        <div className='flex items-center space-x-3 sm:space-x-4'>
          {Icon && (
            <span
              className={`rounded-full p-3 sm:p-4 ${styles.bg} ${styles.text} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
            >
              <Icon size={28} aria-hidden='true' />
            </span>
          )}
          <div>
            <p className='text-gray-500 text-sm font-medium'>{title}</p>
            {/* RESPONSIVE CHANGE: Adjusted font size */}
            <p className='text-xl sm:text-2xl font-bold text-gray-800 mt-1'>
              {value}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom section with Progress Bar */}
      <div className='mt-4'>
        <div className='flex justify-between items-center mb-1'>
          <span className='text-xs font-medium text-gray-500'>Progress</span>
          <span className={`text-xs font-semibold ${styles.text}`}>
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2'>
          <div
            className={`h-2 rounded-full ${styles.progress} transition-all duration-500 ease-out`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressStatCard;
