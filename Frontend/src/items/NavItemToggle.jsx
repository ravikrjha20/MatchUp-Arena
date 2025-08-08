// src/components/NavItemToggle.jsx
import React from "react";
import { Link } from "react-router-dom";

const NavItemToggle = ({
  data,
  open,
  isMobile,
  className = "",
  setOpenTab,
  setShowNavbar,
}) => {
  return (
    <ul
      className={`
        ${
          /* For desktop, use absolute positioning and match the parent's width */ ""
        }
        ${
          !isMobile
            ? "absolute z-20 top-full w-full opacity-70"
            : "w-full pl-4 mt-1"
        }
        ${className} 
        bg-gray-800 rounded-md shadow-lg
        overflow-hidden transition-all duration-300
        ${open ? "max-h-64 py-2 opacity-100" : "max-h-0 py-0 opacity-0"}
      `}
    >
      {data.map((item, idx) => (
        <Link key={idx} to={item.path}>
          <li
            onClick={() => {
              setOpenTab(null);
              setShowNavbar(false);
            }}
            className='px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2 text-sm text-gray-200 opacity-80 opacity-45'
          >
            {item.label}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default NavItemToggle;
