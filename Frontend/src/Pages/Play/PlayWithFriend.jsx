import React, { useState, useEffect } from "react";
import useFriendStore from "../../store/useFriendStore";
import useMatchStore from "../../store/useMatchStore";
import { FaGamepad, FaPaperPlane } from "react-icons/fa";

// Avatar color generator
const generateColor = (name = "") => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  const colors = ["#3B82F6", "#10B981", "#F97316", "#8B5CF6", "#EC4899"];
  return colors[Math.abs(hash % colors.length)];
};

const getInitials = (name) => {
  if (!name || typeof name !== "string") return "?";

  const clean = name.trim();
  if (!clean) return "?";

  const parts = clean.split(" ").filter(Boolean);

  if (parts.length === 1) {
    return parts[0]?.charAt(0)?.toUpperCase() || "?";
  }

  return (
    (
      (parts[0]?.charAt(0) || "") + (parts[parts.length - 1]?.charAt(0) || "")
    ).toUpperCase() || "?"
  );
};

const PlayWithFriendPage = () => {
  const { friends, getAllFriends } = useFriendStore();
  const { inviteFriend, cancelInvite, matchmakingStatus } = useMatchStore();

  const [waitingFriend, setWaitingFriend] = useState(null);

  const handleInvite = (friendId, friendName) => {
    setWaitingFriend(friendName);
    inviteFriend(friendId);
  };

  // Reset UI when matchmaking ends
  useEffect(() => {
    if (matchmakingStatus === "idle") {
      getAllFriends();
      setWaitingFriend(null);
    }
  }, [matchmakingStatus, getAllFriends]);

  const sortedFriends = [...friends].sort((a, b) => b.isOnline - a.isOnline);

  const FriendCard = ({ user }) => (
    <div className='bg-white rounded-2xl shadow-lg p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col sm:flex-row items-center justify-between gap-4'>
      {/* Avatar */}
      <div className='flex items-center gap-4'>
        <div className='relative flex-shrink-0'>
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className='w-14 h-14 rounded-full object-cover'
            />
          ) : (
            <div
              className='w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl'
              style={{ backgroundColor: generateColor(user.name) }}
            >
              {getInitials(user.name)}
            </div>
          )}
          {user.isOnline && (
            <span className='absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-green-500 border-2 border-white animate-pulse'></span>
          )}
        </div>
        {/* Name + Username */}
        <div className='text-center sm:text-left'>
          <p className='font-bold text-lg text-slate-800'>{user.name}</p>
          <p className='text-sm text-slate-500'>@{user.username}</p>
        </div>
      </div>

      {/* Invite / Offline */}
      <div className='flex-shrink-0'>
        {user.isOnline ? (
          <button
            onClick={() => handleInvite(user._id, user.name)}
            disabled={!!waitingFriend}
            className='flex items-center gap-2 bg-blue-500 text-white font-semibold py-2 px-5 rounded-full shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <FaPaperPlane />
            <span>Invite</span>
          </button>
        ) : (
          <div className='bg-slate-200 text-slate-500 font-semibold py-2 px-5 rounded-full text-sm'>
            Offline
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className='min-h-screen bg-slate-100 p-4 sm:p-6 md:p-8 relative'>
      {/* Content (No longer blurs here) */}
      <div
        className={`max-w-4xl mx-auto transition-opacity ${
          waitingFriend ? "pointer-events-none" : ""
        }`}
      >
        <header className='mb-8 text-center sm:text-left'>
          <h1 className='text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight flex items-center justify-center sm:justify-start gap-3'>
            <FaGamepad className='text-blue-500' />
            <span>Play with a Friend</span>
          </h1>
          <p className='mt-2 text-slate-500 text-lg'>
            Challenge your friends to a game of Tic-Tac-Toe.
          </p>
        </header>

        {/* Friends List */}
        <main>
          {sortedFriends.length > 0 ? (
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
              {sortedFriends.map((friend) => (
                <FriendCard key={friend._id} user={friend} />
              ))}
            </div>
          ) : (
            <div className='text-center py-20 px-6 bg-white rounded-2xl shadow-lg'>
              <h3 className='text-2xl font-bold text-slate-700'>
                No Friends Yet
              </h3>
              <p className='text-slate-500 mt-2'>
                Use the search to find and add friends to play with them.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Waiting Overlay with Backdrop Blur */}
      {waitingFriend && (
        <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm z-50 transition-opacity duration-300'>
          <div className='bg-white p-8 rounded-2xl shadow-xl text-center max-w-sm animate-fadeIn'>
            <div className='flex flex-col items-center gap-4'>
              {/* Spinner */}
              <div className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>

              <h2 className='text-2xl font-bold text-slate-800'>
                Waiting for {waitingFriend} to join...
              </h2>
              <p className='text-slate-500 animate-pulse'>
                Match Status: {matchmakingStatus}
              </p>

              {/* Cancel Button */}
              <button
                onClick={() => {
                  cancelInvite();
                  setWaitingFriend(null);
                }}
                className='bg-red-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-red-600 transition-all'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayWithFriendPage;
