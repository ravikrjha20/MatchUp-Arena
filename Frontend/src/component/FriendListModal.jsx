// src/components/FriendListModal.js
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useFriendStore from "../store/useFriendStore";
import useClickOutside from "../hooks/useClickOutside";
import { FaTimes, FaUsers, FaSearch } from "react-icons/fa";

// --- Helper Functions for Avatars (can be shared from another file) ---
const generateColor = (name = "") => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  const colors = ["#3B82F6", "#10B981", "#F97316", "#8B5CF6", "#EC4899"];
  return colors[Math.abs(hash % colors.length)];
};

const getInitials = (name = "") => {
  const parts = name.trim().split(" ");
  if (parts.length === 1 && parts[0] === "") return "?";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (
    (parts[0].charAt(0) || "") + (parts[parts.length - 1].charAt(0) || "")
  ).toUpperCase();
};

const FriendListModal = ({ isOpen, onClose }) => {
  const { friends } = useFriendStore();
  const modalRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useClickOutside(modalRef, onClose);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 500); // Debounce time reduced to 500ms for better responsiveness
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [inputValue]);

  if (!isOpen) return null;

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- MODIFIED: FriendRow Component ---
  // Now includes an online status indicator
  const FriendRow = ({ user }) => (
    <Link
      to={`/profile/${user.username}`}
      onClick={onClose}
      className='flex items-center justify-between py-3 px-3 hover:bg-slate-100 rounded-xl transition-colors duration-200 group'
    >
      <div className='flex items-center gap-3 min-w-0'>
        {/* Wrapper for avatar and online status dot */}
        <div className='relative flex-shrink-0'>
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className='w-11 h-11 rounded-full object-cover'
            />
          ) : (
            <div
              className='w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base'
              style={{ backgroundColor: generateColor(user.name) }}
            >
              {getInitials(user.name)}
            </div>
          )}
          {/* ✅ Online Status Indicator */}
          {user.isOnline && (
            <span className='absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white'></span>
          )}
        </div>
        <div className='truncate'>
          <p className='font-bold text-slate-700 group-hover:text-blue-600 transition-colors truncate'>
            {user.name}
          </p>
          <p className='text-sm text-slate-500 truncate'>@{user.username}</p>
        </div>
      </div>
    </Link>
  );

  const EmptyState = ({ icon, message, details }) => (
    <div className='text-center py-12 px-4 bg-slate-50/80 rounded-lg mt-4 flex flex-col items-center'>
      <div className='text-5xl text-slate-300 mb-4'>{icon}</div>
      <p className='text-slate-600 font-semibold text-lg'>{message}</p>
      {details && <p className='text-slate-400 mt-1'>{details}</p>}
    </div>
  );

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div
        ref={modalRef}
        className='relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-4 sm:p-6 animate-modal-pop flex flex-col'
      >
        {/* Header */}
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-3'>
            <FaUsers className='text-sky-500' />
            Friends ({friends.length})
          </h2>
          <button
            onClick={onClose}
            className='text-slate-400 hover:text-red-500 transition-colors'
            aria-label='Close'
          >
            <FaTimes size={22} />
          </button>
        </div>

        {/* Search Bar */}
        <div className='relative mb-4'>
          <FaSearch className='absolute top-1/2 left-4 -translate-y-1/2 text-slate-400' />
          <input
            type='text'
            placeholder='Search by name or username...'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='w-full bg-slate-100 rounded-xl py-3 pl-10 pr-4 border-2 border-transparent focus:border-blue-500 focus:bg-white focus:outline-none transition-colors'
          />
        </div>

        {/* Content Area */}
        <div className='space-y-1 min-h-[250px] max-h-[55vh] overflow-y-auto -mr-2 pr-2'>
          {friends.length > 0 ? (
            filteredFriends.length > 0 ? (
              // --- MODIFIED: Sorting Logic ---
              // Sorts the list to show online friends first
              filteredFriends
                .sort((a, b) => b.isOnline - a.isOnline)
                .map((friend) => <FriendRow key={friend._id} user={friend} />)
            ) : (
              <EmptyState
                icon={<FaSearch />}
                message='No Friends Found'
                details={
                  searchTerm
                    ? `Your search for "${searchTerm}" returned no results.`
                    : "Start typing to search your friends."
                }
              />
            )
          ) : (
            <EmptyState
              icon={<FaUsers />}
              message='No Friends Yet'
              details='Find and add friends to see them here.'
            />
          )}
        </div>
      </div>

      <style>{`
        @keyframes modal-pop { 
          from{opacity:0; transform:scale(.96) translateY(18px);} 
          to{opacity:1; transform:scale(1) translateY(0);}
        }
        .animate-modal-pop { animation: modal-pop .45s cubic-bezier(.51,-0.04,.45,1.27) both; }
      `}</style>
    </div>
  );
};

export default FriendListModal;
