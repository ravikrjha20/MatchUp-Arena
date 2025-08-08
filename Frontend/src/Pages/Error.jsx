import React from "react";
import { useRouteError } from "react-router-dom";
import NotFoundImage from "../assets/NotFound.avif";
import SomethingWentWrong from "../assets/SomethingWentWrong.jpg";

const Error = () => {
  const error = useRouteError();
  console.error(error);

  const isNotFound = error?.status === 404;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center px-6 bg-gray-50'>
      <img
        src={isNotFound ? NotFoundImage : SomethingWentWrong}
        alt='Error'
        className='w-72 md:w-96 mb-8 rounded-2xl shadow-md'
      />

      <p className='text-lg text-gray-600 mb-6'>
        {isNotFound
          ? "Sorry, the page you're looking for doesn't exist."
          : "An unexpected error has occurred. Please try again later."}
      </p>

      <a
        href='/'
        className='bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-full transition'
      >
        ⬅ Go Back Home
      </a>
    </div>
  );
};

export default Error;
