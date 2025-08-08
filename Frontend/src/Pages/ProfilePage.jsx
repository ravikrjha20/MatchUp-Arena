// components/Profile.js

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import useFriendStore from "../store/useFriendStore";
import useSearchStore from "../store/useSearchStore"; // Import the new search store
import ProfileHeader from "../component/ProfileHeader";
import DashboardSection from "../component/DashboardSection";
import FriendList from "../component/FriendList";
import FriendRequests from "../component/FriendRequests";
import LoadingSpinner from "../component/Loading";
import { FaUserLock, FaUserSlash } from "react-icons/fa";

const Profile = () => {
  const { username } = useParams();
  const { user: authUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  // --- RESTORED ROBUST LOGIC ---
  // This correctly identifies the user's own profile page if:
  // 1. There is no username in the URL (e.g., /profile).
  // 2. The username in the URL matches the logged-in user's name.
  const isMyProfile = !username || username === authUser?.username;

  // --- Data from Friend Store ---
  const {
    friends,
    incomingRequests,
    outgoingRequests,
    getAllFriends,
    getIncomingRequests,
    getOutgoingRequests,
  } = useFriendStore();

  // --- Data from Search Store ---
  const { searchedProfile, searchProfile, clearSearchedProfile } =
    useSearchStore();

  useEffect(() => {
    const loadProfileData = async () => {
      setIsLoading(true);
      if (isMyProfile) {
        // If it's my profile, I must be logged in to see friends/requests.
        if (authUser) {
          getAllFriends();
          getIncomingRequests();
          getOutgoingRequests(); // Also fetch outgoing for the total count
        }
        setIsLoading(false);
      } else {
        // If it's someone else's profile, search for them.
        await searchProfile(username);
        setIsLoading(false);
      }
    };

    loadProfileData();

    return () => {
      // Clear the searched profile so we don't see stale data
      clearSearchedProfile();
    };
  }, [
    username,
    authUser,
    isMyProfile,
    getAllFriends,
    getIncomingRequests,
    getOutgoingRequests, // Add to dependency array
    searchProfile,
    clearSearchedProfile,
  ]);

  const profileData = isMyProfile ? authUser : searchedProfile;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isMyProfile && !profileData) {
    return (
      <div className='flex flex-col items-center justify-center h-[70vh] text-center'>
        <FaUserSlash className='text-6xl text-red-400 mb-4' />
        <h2 className='text-2xl font-bold text-gray-800'>User Not Found</h2>
        <p className='text-gray-600'>
          The profile for "{username}" could not be found.
        </p>
      </div>
    );
  }

  // Case: Trying to view my own profile but not logged in.
  if (isMyProfile && !authUser) {
    return (
      <div className='flex flex-col items-center justify-center h-[70vh] text-center'>
        <FaUserLock className='text-6xl text-yellow-400 mb-4' />
        <h2 className='text-2xl font-bold text-gray-800'>Login Required</h2>
        <p className='text-gray-600'>
          You must be logged in to view your profile.
        </p>
        <Link to='/auth/login'>
          <button className='mt-4 bg-yellow-500 text-white font-bold px-6 py-2 rounded-full'>
            Login to Continue
          </button>
        </Link>
      </div>
    );
  }

  // Calculate props to pass to the Dashboard section
  const friendsCount = isMyProfile
    ? friends.length
    : profileData?.friends?.length || 0;
  const requestsCount = isMyProfile
    ? incomingRequests.length + outgoingRequests.length
    : 0;

  return (
    <div className='p-4 sm:p-8 max-w-5xl mx-auto'>
      <ProfileHeader user={profileData} isMyProfile={isMyProfile} />
      {/* Pass all necessary data down as props */}
      <DashboardSection
        user={profileData}
        isMyProfile={isMyProfile}
        friendsCount={friendsCount}
        requestsCount={requestsCount}
      />

      {isMyProfile && (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
          <FriendList friends={friends} />
          <FriendRequests requests={incomingRequests} />
        </div>
      )}
    </div>
  );
};

export default Profile;
