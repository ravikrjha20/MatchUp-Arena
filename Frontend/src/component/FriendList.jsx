// components/FriendList.js

import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaTrash } from "react-icons/fa";
import useFriendStore from "../store/useFriendStore"; // Needed for the remove action

// The component now receives the friends list as a prop.
const FriendList = ({ friends }) => {
  // We only need the store for actions, not for fetching data here.
  const { removeFriend } = useFriendStore();

  const handleRemoveFriend = (friendId, friendName) => {
    if (window.confirm(`Are you sure you want to remove ${friendName}?`)) {
      removeFriend(friendId);
    }
  };

  return (
    <div className='bg-white rounded-2xl shadow p-6'>
      <h3 className='text-xl font-bold mb-4 text-gray-800'>Friends</h3>
      {friends.length === 0 ? (
        <div className='text-center py-8'>
          <p className='text-gray-500'>No friends yet.</p>
          <p className='text-sm text-gray-400'>
            Find and add friends to get started!
          </p>
        </div>
      ) : (
        <ul className='space-y-3'>
          {friends.map((friend) => (
            <li
              key={friend._id}
              className='flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group'
            >
              <Link
                to={`/profile/${friend.username}`}
                className='flex items-center gap-3'
              >
                {friend.avatar ? (
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className='w-10 h-10 rounded-full object-cover'
                  />
                ) : (
                  <FaUserCircle size={40} className='text-gray-300' />
                )}
                <div>
                  <p className='font-semibold text-gray-700'>{friend.name}</p>
                  <p className='text-sm text-gray-500'>@{friend.username}</p>
                </div>
              </Link>

              {/* "Remove Friend" button, visible on hover */}
              <button
                onClick={() => handleRemoveFriend(friend._id, friend.name)}
                className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity'
                title={`Remove ${friend.name}`}
              >
                <FaTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendList;
