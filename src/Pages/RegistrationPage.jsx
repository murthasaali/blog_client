import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../Config/axiosConfig';
import customToast from '../Constants/customToast';

function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav=useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await apiRequest.post('/auth/register', {
        username,
        email,
        password,
      });

      console.log('Registration successful:', response.data);
      customToast("registration succussfull")
      // Optionally, redirect to login page or show success message
      nav("/login")

    } catch (error) {
      console.error('Registration error:', error);
      if (error.response) {
        console.error('Registration failed with status code:', error.response.status);
        console.error('Error response:', error.response.data);
        setError(error.response.data.message || 'Registration failed'); 
      } else if (error.request) {
        console.error('No response received:', error.request);
        setError('No response from server');
      } else {
        console.error('Request setup error:', error.message);
        setError('Request error');
      }
    }
  };

  return (
    <div className='w-full h-screen bg-black text-cyan-300 font-bold text-xl flex flex-col justify-center items-center'>
      <form onSubmit={handleRegister} className='w-fit flex flex-col gap-2 text-xs font-thin'>
        <h1 className='font-thin text-white text-2xl'>Register</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          className='w-60 h-8 bg-slate-50 bg-opacity-10 outline-none ps-2'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
          type="submit"
          className='w-60 h-8 bg-slate-50 bg-opacity-80 rounded-3xl outline-none ps-2 flex justify-evenly items-center text-black'
        >
          <div>Create Account with Google</div>
          <div><FcGoogle /></div>
        </button>
        <div className='w-full flex justify-between items-end'>
          <button type="submit" className='px-4 py-2 bg-slate-50 bg-opacity-10 rounded-full'>Sign Up</button>
          <Link to="/login" className='text-xs text-slate-50 hover:underline'>Already have an account?</Link>
        </div>
      </form>
    </div>
  );
}

export default RegistrationPage;
