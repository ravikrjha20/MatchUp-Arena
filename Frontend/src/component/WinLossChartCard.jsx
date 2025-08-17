// components/WinLossChartCard.js

import React from "react";
import { FaChartPie } from "react-icons/fa";
import { PieChart } from "react-minimal-pie-chart";

/**
 * A card component that displays a win/loss/draw record with a pie chart.
 * It shows a visual representation of performance and provides a fallback
 * UI for when no data is available.
 *
 * @param {object} props - The component props.
 * @param {number} props.wins - The number of wins.
 * @param {number} props.losses - The number of losses.
 * @param {number} props.draws - The number of draws.
 * @param {() => void} [props.onClick] - Optional click handler for the card.
 */
const WinLossChartCard = ({ wins = 0, losses = 0, draws = 0, onClick }) => {
  const totalMatches = wins + losses + draws;

  // Define the data for the pie chart
  const data = [
    { title: "Wins", value: wins, color: "#10B981" }, // emerald-500
    { title: "Losses", value: losses, color: "#EF4444" }, // red-500
    { title: "Draws", value: draws, color: "#6B7280" }, // gray-500
  ];

  const hasData = totalMatches > 0;

  return (
    <div
      onClick={onClick}
      // RESPONSIVE CHANGE: Adjusted padding
      className='group bg-white shadow rounded-2xl p-4 sm:p-5 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer flex flex-col justify-between'
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div>
        <div className='flex items-center justify-between'>
          <h3 className='text-gray-500 text-sm font-medium'>Performance</h3>
          <FaChartPie className='text-green-500' size={20} />
        </div>

        {/* RESPONSIVE CHANGE: Adjusted chart container height */}
        <div className='relative flex items-center justify-center my-4 h-28 sm:h-32'>
          {hasData ? (
            <PieChart
              data={data.filter((segment) => segment.value > 0)}
              lineWidth={25}
              rounded
              animate
              label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
              labelStyle={{
                fontSize: "8px",
                fontFamily: "sans-serif",
                fill: "#fff",
                fontWeight: "600",
              }}
              labelPosition={70}
            />
          ) : (
            // Fallback UI when there are no matches played
            <div className='relative w-full h-full flex items-center justify-center'>
              <svg viewBox='0 0 36 36' className='w-28 h-28'>
                <path
                  d='M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831'
                  fill='none'
                  stroke='#E5E7EB' // gray-200
                  strokeWidth='4'
                />
              </svg>
              <div className='absolute text-center'>
                <p className='text-xs text-gray-500'>No Matches</p>
                <p className='text-xs text-gray-400'>Play one to see stats</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='flex justify-between text-center border-t pt-3'>
        <div>
          {/* RESPONSIVE CHANGE: Adjusted font sizes */}
          <p className='text-lg sm:text-xl font-bold text-green-600'>{wins}</p>
          <p className='text-xs text-gray-500'>Wins</p>
        </div>
        <div>
          <p className='text-lg sm:text-xl font-bold text-red-600'>{losses}</p>
          <p className='text-xs text-gray-500'>Losses</p>
        </div>
        <div>
          <p className='text-lg sm:text-xl font-bold text-gray-600'>{draws}</p>
          <p className='text-xs text-gray-500'>Draws</p>
        </div>
      </div>
    </div>
  );
};

export default WinLossChartCard;
