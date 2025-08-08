// src/pages/Contact.jsx

import React from "react";

const Contact = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-100 to-white'>
      <div className='max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8'>
        <h1 className='text-3xl font-bold text-center text-indigo-600 mb-6'>
          Contact Us
        </h1>
        <p className='text-gray-700 mb-4 text-center'>
          Have feedback, questions, or suggestions about our Tic Tac Toe game?
          We'd love to hear from you! Whether it's a feature request, bug
          report, or general inquiry, feel free to reach out.
        </p>

        <div className='mt-8 space-y-4 text-gray-800 text-base'>
          <p>
            <strong>Email:</strong>{" "}
            <a
              href='mailto:tictactoeofficial2000@gmail.com'
              className='text-indigo-500 underline'
            >
              tictactoeofficial2000@gmail.com
            </a>
          </p>
          <p>
            <strong>Phone:</strong> +91 9876543210
          </p>
          <p>
            Our team is available 7 days a week to support your experience. If
            you encounter any issues during 1v1 play, feel free to drop us a
            message!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
