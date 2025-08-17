// src/components/FriendRequestsModal.js
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import useFriendStore from "../store/useFriendStore";
import useClickOutside from "../hooks/useClickOutside";
import { FaTimes, FaUserFriends, FaCheck, FaBan } from "react-icons/fa";

// --- Helper Functions for Avatars (Unchanged) ---
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

const FriendRequestsModal = ({ isOpen, onClose }) => {
  const {
    incomingRequests,
    outgoingRequests,
    acceptRequest,
    declineRequest,
    cancelRequest,
  } = useFriendStore();

  const [activeTab, setActiveTab] = useState("incoming");
  const modalRef = useRef(null);

  useClickOutside(modalRef, onClose);

  if (!isOpen) {
    return null;
  }

  // --- Sub-component for a single request row with enhanced styling ---
  const RequestRow = ({ request, type }) => {
    const user = request.friendId;
    if (!user) return null;

    return (
      <div className='flex items-center justify-between py-3 px-2 border-b border-slate-100 last:border-b-0'>
        <Link
          to={`/profile/${user.username}`}
          onClick={onClose}
          className='flex items-center gap-3 group min-w-0'
        >
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className='w-11 h-11 rounded-full object-cover flex-shrink-0'
            />
          ) : (
            <div
              className='w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0'
              style={{ backgroundColor: generateColor(user.name) }}
            >
              {getInitials(user.name)}
            </div>
          )}
          <span className='font-bold text-slate-700 group-hover:text-blue-600 transition-colors truncate'>
            {user.name}
          </span>
        </Link>

        {/* --- More attractive Action Buttons --- */}
        <div className='flex items-center gap-2 pl-2'>
          {type === "incoming" ? (
            <>
              <button
                onClick={() => acceptRequest(user._id)}
                className='p-2.5 text-green-500 bg-green-50 hover:bg-green-100 rounded-full transition-all duration-200 transform hover:scale-110'
                aria-label='Accept Request'
              >
                <FaCheck />
              </button>
              <button
                onClick={() => declineRequest(user._id)}
                className='p-2.5 text-red-500 bg-red-50 hover:bg-red-100 rounded-full transition-all duration-200 transform hover:scale-110'
                aria-label='Decline Request'
              >
                <FaBan />
              </button>
            </>
          ) : (
            <button
              onClick={() => cancelRequest(user._id)}
              className='p-2.5 text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-full transition-all duration-200 transform hover:scale-110'
              aria-label='Cancel Request'
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>
    );
  };

  // --- Enhanced Empty State styling ---
  const EmptyState = ({ message }) => (
    <div className='text-center py-12 px-4 bg-slate-50/80 rounded-lg mt-4'>
      <FaUserFriends className='mx-auto text-5xl text-slate-300 mb-4' />
      <p className='text-slate-500 font-medium'>{message}</p>
    </div>
  );

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div
        ref={modalRef}
        className='relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-4 sm:p-6 animate-modal-pop flex flex-col'
      >
        {/* --- Header --- */}
        <div className='flex items-center justify-between mb-4 pb-4 border-b border-slate-200'>
          <h2 className='text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-3'>
            <FaUserFriends className='text-blue-500' />
            Friend Requests
          </h2>
          <button
            onClick={onClose}
            className='text-slate-400 hover:text-red-500 transition-colors'
            aria-label='Close'
          >
            <FaTimes size={22} />
          </button>
        </div>

        {/* --- Modern Pill-style Tabs --- */}
        <div className='bg-slate-100 p-1.5 rounded-xl flex items-center mb-2'>
          <button
            onClick={() => setActiveTab("incoming")}
            className={`w-1/2 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === "incoming"
                ? "bg-white text-blue-600 shadow"
                : "text-slate-500 hover:bg-slate-200/50"
            }`}
          >
            Incoming
            {incomingRequests.length > 0 && (
              <span className='bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                {incomingRequests.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("outgoing")}
            className={`w-1/2 py-2 text-sm font-bold rounded-lg transition-all ${
              activeTab === "outgoing"
                ? "bg-white text-blue-600 shadow"
                : "text-slate-500 hover:bg-slate-200/50"
            }`}
          >
            Sent
          </button>
        </div>

        {/* --- Content Area --- */}
        <div className='space-y-1 min-h-[250px] max-h-[55vh] overflow-y-auto -mr-2 pr-2'>
          {activeTab === "incoming" &&
            (incomingRequests.length > 0 ? (
              incomingRequests.map((req) => (
                <RequestRow key={req._id} request={req} type='incoming' />
              ))
            ) : (
              <EmptyState message='No incoming friend requests.' />
            ))}
          {activeTab === "outgoing" &&
            (outgoingRequests.length > 0 ? (
              outgoingRequests.map((req) => (
                <RequestRow key={req._id} request={req} type='outgoing' />
              ))
            ) : (
              <EmptyState message="You haven't sent any requests." />
            ))}
        </div>
      </div>

      {/* --- Animation Styles (Unchanged) --- */}
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

export default FriendRequestsModal;
