// src/components/Notification.jsx
import React from "react";
import useNotificationStore from "../store/useNotificationStore"; // Corrected path
import { X, Check, Gamepad2, Bell } from "lucide-react";

const Notification = () => {
  const { isVisible, message, type, hideNotification, onAccept, onReject } =
    useNotificationStore();

  if (!isVisible) {
    return null;
  }

  // --- RENDER INVITATION (ENHANCED CSS) ---
  if (type === "invitation") {
    const handleAccept = () => {
      if (onAccept) onAccept();
      hideNotification();
    };

    const handleReject = () => {
      if (onReject) onReject();
      hideNotification();
    };

    return (
      <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 animate-fade-in'>
        <div className='bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center border border-slate-200 transform animate-scale-in'>
          {/* Enhanced Icon */}
          <div className='mx-auto bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mb-5'>
            <Gamepad2 className='h-9 w-9 text-blue-600' />
          </div>

          <h2 className='text-2xl font-bold text-slate-800'>Game Invitation</h2>
          <p className='text-slate-500 mt-2 text-base'>{message}</p>

          {/* Enhanced Buttons */}
          <div className='flex flex-col sm:flex-row gap-3 mt-8'>
            <button
              onClick={handleReject}
              className='w-full bg-slate-100 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-200 transition-all duration-200 transform hover:scale-105'
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className='w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2'
            >
              <Check size={20} />
              Accept
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER STANDARD NOTIFICATION (ENHANCED CSS) ---
  return (
    <div className='fixed top-6 right-6 max-w-xs sm:max-w-sm w-full bg-gradient-to-br from-slate-800 to-slate-900 text-white px-5 py-4 rounded-2xl shadow-xl flex items-center gap-4 animate-slide-in z-50 border border-white/10'>
      <div className='flex-shrink-0'>
        <Bell className='w-6 h-6 text-blue-400' />
      </div>
      <div className='flex-1 text-sm sm:text-base font-medium'>{message}</div>
      <button
        onClick={hideNotification}
        className='p-1.5 rounded-full hover:bg-white/10 transition-colors duration-200'
      >
        <X className='w-4 h-4' />
      </button>
    </div>
  );
};

export default Notification;
