import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex flex-col items-center justify-center z-[9999]'>
      <FaSpinner className='animate-spin text-yellow-400 text-4xl mb-4' />
      <p className='text-white text-xl font-medium'>{text}</p>
    </div>
  );
};

export default Loading;
