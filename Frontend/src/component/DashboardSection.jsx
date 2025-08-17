// components/DashboardSection.js

import React, { useState } from "react";
import { FaCoins, FaGamepad, FaEnvelope, FaTrophy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// FIX 1: Correct the component name in the import statement.
import FriendRequestsModal from "./FriendRequestsModal";

// Import the specialized cards
import StatCard from "./StatCard";
import WinLossChartCard from "./WinLossChartCard";
import ProgressStatCard from "./ProgressStatCard";

const DashboardSection = ({
  user,
  isMyProfile,
  friendsCount,
  requestsCount,
}) => {
  const navigate = useNavigate();
  const MAX_RATING = 2500;
  const [isModalOpen, setIsModalOpen] = useState(false); // Renamed for clarity

  if (!user) {
    return (
      <div className='text-center p-8 text-gray-500'>Loading dashboard...</div>
    );
  }

  return (
    // We return a single root div, just like your original component
    <div className='w-full mt-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <WinLossChartCard
          wins={user.wins}
          losses={user.losses}
          draws={user.draws}
          onClick={() => navigate("/game-history")}
        />

        <ProgressStatCard
          icon={FaTrophy}
          title='Rating'
          value={user.rating}
          maxValue={MAX_RATING}
          color='yellow'
          onClick={() => navigate("/leaderboard")}
        />

        <StatCard
          icon={FaCoins}
          title='Coins'
          value={user.coins}
          color='amber'
          onClick={() => navigate("/store")}
        />

        {isMyProfile ? (
          <StatCard
            icon={FaEnvelope}
            title='Requests'
            value={requestsCount}
            color='rose'
            // FIX 2: The onClick handler should explicitly open the modal.
            onClick={() => setIsModalOpen(true)}
            // The unnecessary `setOpen` prop has been removed.
          />
        ) : (
          <StatCard
            icon={FaGamepad}
            title='Friends'
            value={friendsCount}
            color='violet'
          />
        )}
        {/* The modal is no longer rendered here inside the grid */}
      </div>

      {/* 
        FIX 3: Render the modal outside the grid and pass the required props.
        It will only appear when `isModalOpen` is true.
      */}
      <FriendRequestsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default DashboardSection;
