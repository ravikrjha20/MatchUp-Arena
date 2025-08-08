import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import TicTacToe from "../component/TicTacToe";
import bgLogin from "../assets/bgLogin.avif";
import useAuthStore from "../store/useAuthStore";

const LoginPage = () => {
  const { checkAuth, login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    login(formData);
    checkAuth();
    navigate("../");
  };

  return (
    <div
      className='min-h-screen flex items-center justify-center bg-cover bg-center p-4'
      style={{
        backgroundImage: `url(${bgLogin})`,
      }}
    >
      <div className='backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden'>
        {/* ─── Form Section ──────────────────────────── */}
        <div className='w-full md:w-1/2 p-8 flex flex-col justify-center text-white'>
          <h2 className='text-3xl font-bold mb-4 text-center'>Welcome Back</h2>
          <form onSubmit={submit} className='space-y-5'>
            <div>
              <label className='block mb-1 text-sm'>Email</label>
              <input
                type='email'
                name='email'
                required
                className='w-full px-4 py-2 rounded bg-white/20 border border-white/30 placeholder-white/70 focus:ring-2 focus:ring-white text-white'
                placeholder='you@example.com'
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className='block mb-1 text-sm'>Password</label>
              <input
                type='password'
                name='password'
                required
                className='w-full px-4 py-2 rounded bg-white/20 border border-white/30 placeholder-white/70 focus:ring-2 focus:ring-white text-white'
                placeholder='••••••••'
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button
              type='submit'
              className='w-full py-2 bg-white/30 hover:bg-white/50 text-white rounded font-semibold transition'
            >
              Sign In
            </button>
          </form>
          <p className='text-xs text-center mt-4 text-white/80'>
            Don’t have an account?{" "}
            <Link to='../auth/register'>
              <button className='underline font-semibold'>Sign up</button>
            </Link>
          </p>
        </div>

        {/* ─── Divider (desktop only) ──────────────────────────── */}
        <div className='hidden md:block w-px bg-white/30 mx-2' />

        {/* ─── Game Section ──────────────────────────── */}
        <div className='hidden md:flex w-full md:w-1/2 p-6 flex-col justify-center items-center'>
          <h3 className='text-white mb-3 font-semibold'>Take a Break 🎮</h3>
          <TicTacToe />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
