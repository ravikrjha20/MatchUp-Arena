import React, { useState, useRef, useEffect } from "react";
import useSearchStore from "../store/useSearchStore";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const { suggestedFriends, getSuggestions } = useSearchStore();
  const handleUserClick = (user) => {
    navigate(`/profile/${user.username || user._id}`);
  };
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (searchTerm.trim() === "") {
      setShowDropdown(false);
      return;
    }

    timerRef.current = setTimeout(() => {
      getSuggestions(searchTerm);
      setShowDropdown(true);
    }, 1000);

    return () => clearTimeout(timerRef.current);
  }, [searchTerm, getSuggestions]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  // Dropdown show/hide logic for animation
  const dropdownVisible =
    showDropdown && suggestedFriends && suggestedFriends.length > 0;

  return (
    <div
      className='relative w-full max-w-xs md:max-w-md'
      ref={inputRef}
      style={{ zIndex: 40 }}
    >
      <input
        type='text'
        placeholder='Search for users...'
        autoComplete='off'
        value={searchTerm}
        onFocus={() => {
          if (suggestedFriends.length > 0) setShowDropdown(true);
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-full bg-gray-700 text-white rounded-full px-4 py-2 pl-9 border border-gray-600 focus:outline-none focus:border-yellow-400 transition-all duration-200'
      />
      <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'>
        <svg
          width='18'
          height='18'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          viewBox='0 0 24 24'
        >
          <circle cx='11' cy='11' r='7' />
          <line x1='18' y1='18' x2='15.5' y2='15.5' />
        </svg>
      </span>
      {/* Suggestions Dropdown Always Mounted With Smooth Transition */}
      <ul
        className={`
          absolute left-0 mt-2 w-full
          bg-gray-800 text-white rounded-lg shadow-lg border border-gray-700
          max-h-60 overflow-y-auto
          transition-all duration-300 ease-in-out
          ${
            dropdownVisible
              ? "opacity-100 translate-y-0 pointer-events-auto visible"
              : "opacity-0 -translate-y-2 pointer-events-none invisible"
          }
        `}
      >
        {(suggestedFriends || []).map((user, idx) => (
          <li
            key={user._id || user.username || idx}
            className='flex items-center gap-2 px-4 py-2 hover:bg-gray-700 cursor-pointer transition-all'
            onClick={() => handleUserClick(user)}
          >
            {
              <img
                src={user.image || `https://i.pravatar.cc/150?u=${user._id}`}
                alt={user.name}
                className='w-7 h-7 rounded-full object-cover'
              />
            }
            <span className='font-semibold'>{user.name}</span>
            {user.username && (
              <span className='text-gray-400 ml-1 text-sm'>
                @{user.username}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
