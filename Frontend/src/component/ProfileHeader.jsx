// components/ProfileHeader.js
import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

import useAuthStore from "../store/useAuthStore";
import useFriendStore from "../store/useFriendStore";

const ProfileHeader = ({ user, isMyProfile }) => {
  const { user: authUser } = useAuthStore();
  const {
    friends,
    incomingRequests,
    outgoingRequests,
    sendRequest,
    acceptRequest,
    declineRequest,
    removeFriend,
  } = useFriendStore();

  /* --- local state for relationship flags --- */
  const [isFriend, setIsFriend] = useState(false);
  const [hasSentRequest, setHasSentRequest] = useState(false);
  const [hasReceivedRequest, setHasReceivedRequest] = useState(false);

  /* --- sync flags whenever store data changes --- */
  useEffect(() => {
    const id = user?._id;
    const notMe = !isMyProfile;

    setIsFriend(notMe && friends.some((f) => f?._id === id));
    setHasSentRequest(
      notMe && outgoingRequests.some((r) => r?.friendId?._id === id)
    );
    setHasReceivedRequest(
      notMe && incomingRequests.some((r) => r?.friendId?._id === id)
    );
  }, [friends, incomingRequests, outgoingRequests, user, isMyProfile]);
  console.log(isFriend);

  /* --- handlers --- */
  const handleSendRequest = () => sendRequest(user._id);
  const handleAcceptRequest = () => acceptRequest(user._id);
  const handleDeclineRequest = () => declineRequest(user._id);
  const handleRemoveFriend = () => removeFriend(user._id);

  /* --- choose right action button(s) --- */
  const renderActionButtons = () => {
    if (isMyProfile) {
      return (
        <Link to='/settings/edit-profile'>
          <button className='px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300'>
            Edit Profile
          </button>
        </Link>
      );
    }

    if (isFriend) {
      return (
        <button
          onClick={handleRemoveFriend}
          className='px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600'
        >
          Remove Friend
        </button>
      );
    }

    if (hasSentRequest) {
      return (
        <button
          disabled
          className='px-4 py-2 text-sm font-semibold text-gray-500 bg-gray-200 rounded-lg cursor-not-allowed'
        >
          Request Sent
        </button>
      );
    }

    if (hasReceivedRequest) {
      return (
        <div className='flex gap-2'>
          <button
            onClick={handleAcceptRequest}
            className='px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600'
          >
            Accept
          </button>
          <button
            onClick={handleDeclineRequest}
            className='px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300'
          >
            Decline
          </button>
        </div>
      );
    }

    // default: no friendship and no pending requests
    return (
      <button
        onClick={handleSendRequest}
        className='px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600'
      >
        Add Friend
      </button>
    );
  };

  /* --- render --- */
  return (
    <div className='flex items-center justify-between gap-6 mb-8'>
      {/* left: avatar & user info */}
      <div className='flex items-center gap-4'>
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className='w-20 h-20 rounded-full object-cover'
          />
        ) : (
          <FaUserCircle size={80} className='text-gray-300' />
        )}
        <div>
          <h2 className='text-3xl font-bold text-gray-800'>{user?.name}</h2>
          <p className='text-gray-500'>{user?.email}</p>
        </div>
      </div>

      {/* right: action buttons */}
      <div className='flex-shrink-0'>{authUser && renderActionButtons()}</div>
    </div>
  );
};

export default ProfileHeader;
