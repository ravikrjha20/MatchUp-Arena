import React, { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  useEffect(() => {
    // Call your logout method (ensure the method name is 'logout', not 'Logout')
    logout?.();

    // Add a slight delay for feedback, then redirect (optional: adjust delay as you like)
    const timer = setTimeout(() => navigate("../"), 1200);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-yellow-100 via-yellow-50 to-white'>
      <FaSignOutAlt className='text-5xl text-yellow-500 mb-4 animate-spin-slow' />
      <h2 className='text-2xl font-bold text-gray-800 mb-2 animate-fade-in'>
        Logging you out...
      </h2>
      <p className='text-gray-600 animate-fade-in-down'>
        We hope to see you back soon!
      </p>
      <style>{`
        @keyframes fade-in { from{opacity:0} to{opacity:1} }
        @keyframes fade-in-down { from{opacity:0; transform:translateY(-14px);} to{opacity:1; transform:translateY(0);} }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 2s linear infinite; }
        .animate-fade-in { animation: fade-in .6s both;}
        .animate-fade-in-down { animation: fade-in-down .7s cubic-bezier(.42,0,.58,1) both;}
      `}</style>
    </div>
  );
};

export default Logout;
