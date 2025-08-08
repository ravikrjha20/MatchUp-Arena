import React from "react";

// Pick from Tailwind color set for vibrancy
const colorMap = {
  yellow: "bg-yellow-100 text-yellow-600",
  violet: "bg-violet-100 text-violet-600",
  rose: "bg-rose-100 text-rose-600",
  amber: "bg-amber-100 text-amber-600",
  green: "bg-green-100 text-green-600", // Added another option for variety
};

const StatCard = ({ icon: Icon, title, value, color = "violet" }) => {
  // Enhancement 3: Fallback to the default color if the provided color isn't in the map.
  const colorClasses = colorMap[color] || colorMap.violet;

  return (
    // Enhancement 2: Added `group` to enable group-hover effects on child elements.
    <div className='group bg-white shadow rounded-2xl p-5 flex items-center space-x-4 hover:shadow-lg transition-all duration-300 ease-in-out'>
      <span
        className={`rounded-full p-3 ${colorClasses} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
      >
        {/* Enhancement 1: Added aria-hidden and a dynamic size */}
        <Icon size={28} aria-hidden='true' />
      </span>
      <div>
        <p className='text-gray-500 text-sm font-medium'>{title}</p>
        <p className='text-2xl font-bold text-gray-800 mt-1'>{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
