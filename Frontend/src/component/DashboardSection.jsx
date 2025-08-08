// components/DashboardSection.js

import React from "react";
import { FaCoins, FaTrophy, FaGamepad, FaEnvelope } from "react-icons/fa";
import StatCard from "./StatCard";

// This is now a "dumb" component that just displays the data it's given.
const DashboardSection = ({
  user,
  isMyProfile,
  friendsCount,
  requestsCount,
}) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6'>
      <StatCard
        icon={FaTrophy}
        title='Rating'
        value={user?.rating || 0}
        color='yellow'
      />
      <StatCard
        icon={FaCoins}
        title='Coins'
        value={user?.coins || 0}
        color='amber'
      />
      <StatCard
        icon={FaGamepad}
        title='Friends'
        // Use the friendsCount prop passed down from the Profile component
        value={friendsCount}
        color='violet'
      />
      {/* The Requests card is now correctly shown ONLY on your own profile */}
      {isMyProfile && (
        <StatCard
          icon={FaEnvelope}
          title='Requests'
          value={requestsCount}
          color='rose'
        />
      )}
    </div>
  );
};

export default DashboardSection;
