// components/StatCard.js

import React from "react";

const colorMap = {
  yellow: {
    base: "bg-yellow-100 text-yellow-600",
    hover: "group-hover:bg-yellow-500 group-hover:text-white",
  },
  violet: {
    base: "bg-violet-100 text-violet-600",
    hover: "group-hover:bg-violet-500 group-hover:text-white",
  },
  rose: {
    base: "bg-rose-100 text-rose-600",
    hover: "group-hover:bg-rose-500 group-hover:text-white",
  },
  amber: {
    base: "bg-amber-100 text-amber-600",
    hover: "group-hover:bg-amber-500 group-hover:text-white",
  },
  green: {
    base: "bg-green-100 text-green-600",
    hover: "group-hover:bg-green-500 group-hover:text-white",
  },
};

const StatCard = ({ icon: Icon, title, value, color = "violet", onClick }) => {
  const colorClasses = colorMap[color] || colorMap.violet;

  return (
    <div
      onClick={onClick}
      // RESPONSIVE CHANGE: Smaller padding on mobile, larger on sm+ screens.
      className='group bg-white shadow rounded-2xl p-4 sm:p-5 flex items-center space-x-3 sm:space-x-4 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer'
    >
      {/* This check prevents a crash if the 'icon' prop is missing */}
      {Icon && (
        <span
          // RESPONSIVE CHANGE: Smaller padding around the icon on mobile.
          className={`rounded-full p-3 sm:p-4 ${colorClasses.base} ${colorClasses.hover} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
        >
          <Icon size={28} aria-hidden='true' />
        </span>
      )}
      <div>
        <p className='text-gray-500 text-sm font-medium'>{title}</p>
        <p
          // RESPONSIVE CHANGE: Smaller font size on mobile, larger on sm+ screens.
          className='text-xl sm:text-2xl font-bold text-gray-800 mt-1'
        >
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
