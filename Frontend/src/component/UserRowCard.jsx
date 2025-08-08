import React from "react";

// A helper component for the star rating
const StarRating = ({ rating }) => (
  <div className='flex items-center'>
    <svg
      className='w-4 h-4 text-yellow-400'
      fill='currentColor'
      viewBox='0 0 20 20'
    >
      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
    </svg>
    <span className='ml-1 text-sm font-bold text-white'>
      {rating.toLocaleString()}
    </span>
  </div>
);

export const UserRowCard = ({ user, onClick }) => {
  // If rating is 0 or missing, generate a random one up to 1000.
  const displayRating =
    user.rating > 0 ? user.rating : Math.floor(Math.random() * 1000) + 1;

  return (
    <div
      onClick={onClick}
      className='flex items-center gap-4 p-3 w-full cursor-pointer rounded-lg hover:bg-gray-700/50 transition-colors duration-200'
    >
      {/* Avatar */}
      <img
        src={user.image || `https://i.pravatar.cc/150?u=${user._id}`}
        alt={user.name}
        className='w-12 h-12 rounded-full object-cover border-2 border-gray-600'
      />

      {/* User Info (takes up remaining space) */}
      <div className='flex-1 overflow-hidden'>
        <p className='font-bold text-white truncate'>{user.name}</p>
        <p className='text-sm text-gray-400 truncate'>@{user.username}</p>
      </div>

      {/* Rating (fixed on the right) */}
      <div className='flex-shrink-0'>
        <StarRating rating={displayRating} />
      </div>
    </div>
  );
};
