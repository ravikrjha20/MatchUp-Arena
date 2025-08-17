// components/Profile.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useAuthStore from "../store/useAuthStore";
import useFriendStore from "../store/useFriendStore";
import useSearchStore from "../store/useSearchStore";

import ProfileHeader from "../component/ProfileHeader";
import DashboardSection from "../component/DashboardSection";
import LoadingSpinner from "../component/Loading";
import StatCard from "../component/StatCard";
import FriendListModal from "../component/FriendListModal";

import { FaUsers } from "react-icons/fa";

// Import your socket instance and setup function
import { getSocket } from "../socket/socket";
import { setUpFriends } from "../socket/friendsSocket";

const Profile = () => {
  const { username } = useParams();
  const { user: authUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);

  const isMyProfile =
    username === authUser?.username ||
    (typeof username === "string" && username.toLowerCase() === "null");

  const {
    friends,
    incomingRequests,
    outgoingRequests,
    getAllFriends,
    getIncomingRequests,
    getOutgoingRequests,
  } = useFriendStore();

  const { searchedProfile, searchProfile, clearSearchedProfile } =
    useSearchStore();

  // --- Set up socket listeners ---
  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      const cleanup = setUpFriends(socket); // returns cleanup function
      return cleanup; // remove listeners when unmounting
    }
  }, []);

  // --- Load profile data ---
  useEffect(() => {
    let isSubscribed = true;
    const loadProfileData = async () => {
      if (username === "null") return;
      setIsLoading(true);
      await getAllFriends();
      await getIncomingRequests();
      await getOutgoingRequests();
      if (!isMyProfile) {
        await searchProfile(username);
      }
      if (isSubscribed) setIsLoading(false);
    };
    loadProfileData();
    return () => {
      isSubscribed = false;
      clearSearchedProfile();
    };
  }, [
    username,
    isMyProfile,
    getAllFriends,
    getIncomingRequests,
    getOutgoingRequests,
    searchProfile,
    clearSearchedProfile,
  ]);

  const profileData = isMyProfile ? authUser : searchedProfile;
  if (isLoading) return <LoadingSpinner />;

  const friendsCount = friends.length;
  const requestsCount = incomingRequests.length + outgoingRequests.length;

  return (
    <>
      <div className='p-4 sm:p-8 max-w-5xl mx-auto'>
        <ProfileHeader user={profileData} isMyProfile={isMyProfile} />

        <DashboardSection
          user={profileData}
          isMyProfile={isMyProfile}
          friendsCount={friendsCount}
          requestsCount={requestsCount}
        />

        {isMyProfile && (
          <div className='mt-6'>
            <StatCard
              icon={FaUsers}
              title='My Friends'
              value={friendsCount}
              color='sky'
              onClick={() => setIsFriendsModalOpen(true)}
            />
          </div>
        )}
      </div>

      <FriendListModal
        isOpen={isFriendsModalOpen}
        onClose={() => setIsFriendsModalOpen(false)}
      />
    </>
  );
};

export default Profile;
