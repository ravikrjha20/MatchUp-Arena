import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMatchStore from "../../store/useMatchStore"; // Your Zustand store
import { setupMatchHandlers } from "../../socket/matchHandlers"; // Your socket handlers
import { getSocket } from "../../socket/socket"; // Assuming a socket context
import useAuthStore from "../../store/useAuthStore"; // To get the current user's info

function Spinner() {
  return (
    <div className='w-12 h-12 flex items-center justify-center'>
      <svg className='animate-spin h-10 w-10 text-blue-400' viewBox='0 0 24 24'>
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
          fill='none'
        />
        <path
          className='opacity-80'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
        />
      </svg>
    </div>
  );
}

export default function MatchmakingPage() {
  const navigate = useNavigate();
  const socket = getSocket();
  const { user: authUser } = useAuthStore(); // Get logged-in user info

  // Subscribe to the entire store or select specific states
  const {
    matchmakingStatus,
    matchmakingMessage,
    opponentName,
    opponentId,
    findPlayer,
    cancelSearch,
    resetMatch,
  } = useMatchStore();

  // Set up socket listeners when the component mounts
  useEffect(() => {
    const onMatchFound = ({ opponentId, opponentName }) => {
      // You can add logic here to automatically navigate after a short delay
      setTimeout(() => {
        // The game start logic will now be in one place
        handleStartGame({ opponentId, opponentName });
      }, 2000);
    };
    if (socket) {
      const cleanup = setupMatchHandlers(socket, onMatchFound);
      return cleanup; // Cleanup listeners when component unmounts
    }
  }, [socket, navigate]);

  const handleStartGame = ({ opponentId, opponentName }) => {
    navigate(`/online/quick/letsplay`);
  };

  const handleCancelSearch = () => {
    if (socket) {
      // Emit the cancel event through the store action
      cancelSearch(socket);
    }
  };

  const me = {
    name: authUser?.username || "You",
    avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${authUser?._id}`,
  };

  const opponentAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${
    opponentId || "Waiting"
  }`;

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4'>
      <div className='w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center relative overflow-hidden'>
        <h1 className='text-3xl md:text-4xl font-bold mb-7 text-blue-600 tracking-tight drop-shadow-xl'>
          1v1 Matchmaking
        </h1>

        {/* Players display */}
        <div className='w-full flex items-center justify-between gap-6 mb-7 transition-all duration-300'>
          {/* You */}
          <div className='flex flex-col items-center'>
            <img
              src={me.avatar}
              alt='you'
              className='w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-blue-400 shadow-lg'
            />
            <div className='font-semibold mt-2 text-blue-500 text-lg'>
              {me.name}
            </div>
          </div>

          {/* VS/Searching transition */}
          <div className='flex flex-col items-center'>
            {matchmakingStatus === "success" ? (
              <div className='text-xl md:text-2xl font-bold text-green-500 animate-pulse'>
                VS
              </div>
            ) : matchmakingStatus === "pending" ? (
              <Spinner />
            ) : (
              <div className='text-xl text-gray-400'>VS</div>
            )}
          </div>

          {/* Opponent */}
          <div
            className={`flex flex-col items-center transition-all duration-700 ${
              matchmakingStatus === "success"
                ? "opacity-100 translate-y-0"
                : "opacity-40 grayscale blur-sm translate-y-2"
            }`}
          >
            <img
              src={opponentAvatar}
              alt='opponent'
              className='w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-gray-300 shadow-lg'
            />
            <div className='font-semibold mt-2 text-gray-500 text-lg'>
              {matchmakingStatus === "success" ? opponentName : "Searching..."}
            </div>
          </div>
        </div>

        {/* Find/Cancel/Play buttons */}
        <div className='w-full h-24 flex flex-col items-center transition-all'>
          {matchmakingStatus === "idle" && (
            <button
              className='px-8 py-3 mb-3 rounded-full font-semibold text-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl hover:scale-105 transition'
              onClick={findPlayer}
            >
              Find Opponent
            </button>
          )}
          {matchmakingStatus === "pending" && (
            <button
              onClick={handleCancelSearch}
              className='px-6 py-2 mb-3 rounded-full font-semibold text-base bg-gray-200 hover:bg-gray-300 text-gray-600 transition'
            >
              Cancel Search
            </button>
          )}

          {/* Display matchmaking messages from the store */}
          {(matchmakingStatus === "pending" ||
            matchmakingStatus === "timeout" ||
            matchmakingStatus === "error") && (
            <div className='mt-4 text-blue-400 animate-pulse'>
              {matchmakingMessage || "Looking for an opponent..."}
            </div>
          )}
          {matchmakingStatus === "timeout" && (
            <button
              className='mt-4 px-8 py-3 mb-3 rounded-full font-semibold text-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl hover:scale-105 transition'
              onClick={() => resetMatch() && findPlayer()}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
