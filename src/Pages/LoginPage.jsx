import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../Redux/Features/authSlice';
import customToast from '../Constants/customToast';
import apiRequest from '../Config/axiosConfig';
import { saveToken } from '../utils/localStorageFunctions';
function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nav =useNavigate()

  const handleLogin = async (e) => {

    e.preventDefault();
    dispatch(loginStart());
    try {
      const response = await apiRequest.post('/auth/login', { email, password });
      const { user } = response.data;
      console.log(response)
      saveToken(user.token);
      dispatch(loginSuccess({ user }));
      customToast("Logged in successfully");
      nav('/')
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || error.message));
      customToast("Login failed");
    }
  };

  return (
    <div className='w-full h-screen backdrop-blur-sm bg-black text-cyan-300 font-bold text-xl flex flex-col justify-center items-center'>
      <form className='w-fit flex flex-col gap-2 text-xs font-thin' onSubmit={handleLogin}>
        <h1 className='font-thin text-white text-2xl'>Login</h1>
        <input
          type="email"
          className='w-60 h-8 bg-slate-50 bg-opacity-10 outline-none ps-2'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className='w-60 h-8 bg-slate-50 bg-opacity-10 outline-none ps-2'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
         
          className='w-60 h-8 bg-slate-50 bg-opacity-80 rounded-3xl outline-none ps-2 flex justify-evenly items-center text-black'
        >
          <div>Continue with Google</div>
          <div><FcGoogle /></div>
        </button>
        <div className='w-full flex justify-between items-end'>
          <button  type="submit" className='w-fit px-4 h-fit py-2 bg-slate-50 bg-opacity-10 rounded-full' to={"/"}>Login now</button>
          <Link className='text-xs text-slate-50 hover:underline' to={"/register"}>Don't have an account yet?</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
