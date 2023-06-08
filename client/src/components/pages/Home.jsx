import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className=" h-screen  bg-gray-900  ">
      <div className="navbar bg-gray-900 px-6">
        <div className="flex-1">
          <Link to={'/'}>
            <h1 className="text-xl font-semibold normal-case">Training Tracker</h1>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
                <div className="flex w-12 items-center justify-center rounded-full border-2 border-sky-900/80  bg-sky-900/50"></div>
              </label>
              <ul tabIndex={0} className="menu-compact dropdown-content menu rounded-box mt-3 w-52  bg-gray-800 p-2   shadow-2xl">
                <li>
                  <Link to={'/settings'} className="text-lg">
                    Settings
                  </Link>
                </li>
                <li>
                  <a className="text-lg">Logout</a>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};
