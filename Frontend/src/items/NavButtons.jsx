// src/component/NavButtons.jsx
import React, { useState, useRef } from "react";
import useAuthStore from "../store/useAuthStore";
import NavItemToggle from "./NavItemToggle";
import useClickOutside from "../hooks/useClickOutside";
import { getNavData } from "../../data";

const navItemClasses =
  "flex items-center gap-2 hover:text-yellow-300 hover:scale-105 hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-200 cursor-pointer w-full";

const NavButtons = ({ isMobile, setShowNavbar }) => {
  const { user } = useAuthStore();
  const navData = getNavData(user);
  const [openTab, setOpenTab] = useState(null);

  // Search state (was missing)
  const [search, setSearch] = useState("");

  const navRef = useRef();

  useClickOutside(navRef, () => setOpenTab(null));

  const toggleTab = (tab) => setOpenTab((prev) => (prev === tab ? null : tab));

  return (
    <ul
      ref={navRef}
      className={`${
        isMobile
          ? "flex flex-col items-center flex-1 gap-2 mt-6 w-full"
          : "flex gap-4 ml-auto"
      } text-lg`}
    >
      {/* SEARCH BAR */}

      {/* NAVIGATION BUTTONS */}
      {navData.map((item, index) => (
        <li
          key={index}
          className={`${isMobile ? "flex flex-col w-full" : "relative"}`}
        >
          <div
            className={navItemClasses}
            onClick={() => toggleTab(item.label)}
            tabIndex={0}
            aria-haspopup={!!item.children}
            aria-expanded={openTab === item.label}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggleTab(item.label);
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
          {item.children && (
            <NavItemToggle
              data={item.children}
              open={openTab === item.label}
              isMobile={isMobile}
              className={!isMobile ? "left-0" : ""}
              setOpenTab={setOpenTab}
              setShowNavbar={setShowNavbar}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavButtons;
