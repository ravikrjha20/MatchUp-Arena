import React, { useEffect, useState } from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import NavButtons from "../items/NavButtons";
import SearchBar from "./SearchBar";

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showNavbar, setShowNavbar] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setShowNavbar(true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`w-full bg-gray-800 text-white px-4 py-3 flex items-center justify-between ${
        isMobile && showNavbar ? "h-screen flex-col" : "h-16"
      } transition-all duration-300`}
    >
      {/* Logo + Toggle */}
      <div className='flex justify-between items-center w-full md:w-auto gap-4'>
        {" "}
        {/* 1. ADDED GAP */}
        <div className='text-2xl font-bold'>TicTacToe</div>
        {(!isMobile || !showNavbar) && <SearchBar />}
        {isMobile && (
          <div
            className='text-2xl cursor-pointer'
            onClick={() => setShowNavbar(!showNavbar)}
          >
            {showNavbar ? <FaTimes /> : <FaBars />}
          </div>
        )}
      </div>

      {/* Nav Items */}
      {(!isMobile || showNavbar) && (
        <NavButtons setShowNavbar={setShowNavbar} isMobile={isMobile} />
      )}
    </nav>
  );
};

export default NavBar;
