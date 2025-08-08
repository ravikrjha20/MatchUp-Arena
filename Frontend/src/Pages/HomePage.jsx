import React from "react";
import NavBar from "../component/Navbar";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <div className='min-h-screen flex flex-col bg-white text-gray-800'>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default HomePage;
