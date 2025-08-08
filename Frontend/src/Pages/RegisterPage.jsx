import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import TicTacToe from "../component/TicTacToe";
import axios from "axios";
import { toast } from "react-toastify";
import bgLogin from "../assets/bgLogin.avif";
import useAuthStore from "../store/useAuthStore";
const Register = () => {
  const navigate = useNavigate();
  const { checkAuth, register } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, username, email, password, confirmPassword } = formData;

    if (!name || !username || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    register(formData);
    navigate("../");
    checkAuth();
  };

  return (
    <div
      className='min-h-screen flex items-center justify-center bg-cover bg-center p-4'
      style={{
        backgroundImage: `url(${bgLogin})`,
      }}
    >
      <div className='backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row gap-6 overflow-hidden'>
        <div className='w-full md:w-1/2 p-8 flex flex-col justify-center text-white'>
          <h2 className='text-3xl font-bold mb-4 text-center'>
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <label className='block mb-1 text-sm'>Full Name</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-full px-4 py-2 rounded bg-white/20 border border-white/30 placeholder-white/70 focus:ring-2 focus:ring-white text-white'
                placeholder='Your Name'
              />
            </div>
            <div>
              <label className='block mb-1 text-sm'>Username</label>
              <input
                type='text'
                name='username'
                value={formData.username}
                onChange={handleChange}
                className='w-full px-4 py-2 rounded bg-white/20 border border-white/30 placeholder-white/70 focus:ring-2 focus:ring-white text-white'
                placeholder='username'
              />
            </div>
            <div>
              <label className='block mb-1 text-sm'>Email</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-4 py-2 rounded bg-white/20 border border-white/30 placeholder-white/70 focus:ring-2 focus:ring-white text-white'
                placeholder='you@example.com'
              />
            </div>
            <div>
              <label className='block mb-1 text-sm'>Password</label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='w-full px-4 py-2 rounded bg-white/20 border border-white/30 placeholder-white/70 focus:ring-2 focus:ring-white text-white'
                placeholder='••••••••'
              />
            </div>
            <div>
              <label className='block mb-1 text-sm'>Confirm Password</label>
              <input
                type='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                className='w-full px-4 py-2 rounded bg-white/20 border border-white/30 placeholder-white/70 focus:ring-2 focus:ring-white text-white'
                placeholder='••••••••'
              />
            </div>
            <button
              type='submit'
              className='w-full py-2 bg-white/30 hover:bg-white/50 text-white rounded font-semibold transition'
            >
              Register
            </button>
          </form>
          <p className='text-xs text-center mt-4 text-white/80'>
            Already have an account?{" "}
            <Link to='../auth/login'>
              <button className='underline font-semibold'>Sign In</button>
            </Link>
          </p>
        </div>

        {/* Divider */}
        <div className='hidden md:block w-px bg-white/30 mx-2' />

        {/* Game Section */}
        <div className='hidden md:flex w-full md:w-1/2 p-6 flex-col justify-center items-center'>
          <h3 className='text-white mb-3 font-semibold'>Take a Break 🎮</h3>
          <TicTacToe />
        </div>
      </div>
    </div>
  );
};

export default Register;
