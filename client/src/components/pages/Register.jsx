import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export const Register = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8080/api/user';
      const { data: res } = await axios.post(url, data);
      navigate('/login');
      console.log(res.message);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className="flex h-screen items-center justify-center gap-9 bg-gray-900 px-5 py-6">
      <div className="w-1/2">
        <h1 className="flex w-full justify-center text-5xl font-semibold text-gray-300 ">Fitness Training Tracker</h1>
        <p className="mt-2 flex w-full justify-center text-2xl text-gray-400">Easily track your fitness progress</p>
      </div>

      <div className=" w-2/5 max-w-sm  rounded-lg bg-gray-800 p-5">
        <form className="flex w-full flex-col items-center" onSubmit={handleSubmit}>
          <h1 className=" w-full text-2xl font-semibold text-gray-300">Sign in</h1>
          <div className="mt-3 w-full">
            <label className="label ">
              <span className="label-text text-gray-400">First Name</span>
            </label>
            <input type="text" placeholder="Type here" className="input-bordered input w-full max-w-sm bg-gray-800 placeholder:text-gray-600" name="firstName" onChange={handleChange} required />
          </div>{' '}
          <div className="mt-3 w-full">
            <label className="label ">
              <span className="label-text text-gray-400">Last Name</span>
            </label>
            <input type="text" placeholder="Type here" className="input-bordered input w-full max-w-sm bg-gray-800 placeholder:text-gray-600" name="lastName" onChange={handleChange} required />
          </div>
          <div className="mt-3 w-full">
            <label className="label ">
              <span className="label-text text-gray-400" onChange={handleChange}>
                Email
              </span>
            </label>
            <input type="email" placeholder="Type here" className="input-bordered input w-full max-w-sm bg-gray-800 placeholder:text-gray-600" name="email" onChange={handleChange} required />
          </div>
          <div className="mt-3 w-full">
            <label className="label">
              <span className="label-text text-gray-400" onChange={handleChange}>
                Password
              </span>
            </label>
            <input type="password" placeholder="********" className="input-bordered input w-full max-w-sm bg-gray-800 placeholder:text-gray-600" name="password" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-primary btn mt-9 w-full border-0 bg-green-500 hover:bg-green-600">
            Sign in
          </button>
        </form>
        <Link to={'/login'}>
          <h1 className="font-base mt-7 text-center text-sm font-light">
            Already have an accout?<span className="font-semibold"> Log in</span>
          </h1>
        </Link>
      </div>
    </div>
  );
};
