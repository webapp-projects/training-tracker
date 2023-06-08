import React from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center gap-9 bg-gray-900 px-5 py-6">
      <div className="w-1/2">
        <h1 className="flex w-full justify-center text-5xl font-semibold text-gray-300">Fintess Training Tracker</h1>
        <p className="mt-2 flex w-full justify-center text-2xl text-gray-400">Easily track your fitness progress</p>
      </div>

      <div className=" w-2/5 max-w-sm  rounded-lg bg-gray-800 p-5">
        <form className="flex w-full flex-col items-center">
          <h1 className=" w-full text-2xl font-semibold text-gray-300">Log in</h1>
          <div className="mt-3 w-full">
            <label className="label ">
              <span className="label-text text-gray-400">Email</span>
            </label>
            <input type="text" placeholder="Type here" className="input-bordered input w-full max-w-sm bg-gray-800  placeholder:text-gray-600" />
          </div>
          <div className="mt-3 w-full">
            <label className="label">
              <span className="label-text text-gray-400">Password</span>
            </label>
            <input type="password" placeholder="********" className="input-bordered input w-full max-w-sm bg-gray-800 placeholder:text-gray-600" />
          </div>
          <button className="btn-primary btn mt-9 w-full border-0 bg-sky-600 hover:bg-sky-700">Log in</button>
        </form>
        <Link to={'/register'}>
          <h1 className="mt-7 text-center text-sm font-light">
            Don't have account yet? <span className="font-semibold">Register</span>
          </h1>
        </Link>
      </div>
    </div>
  );
};
