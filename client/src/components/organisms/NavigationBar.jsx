import React from 'react';
import { Link } from 'react-router-dom';

export const NavigationBar = ({ handleLogout }) => {
  return (
    <div className="navbar flex items-center justify-between bg-gray-950 px-6 py-3">
      <div className="flex flex-col items-start ">
        <Link to={'/'}>
          <h1 className=" text-xl text-gray-100">Training Tracker</h1>
        </Link>
      </div>
      <div className="">
        <ul className="menu menu-horizontal px-1">
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="flex w-12 items-center justify-center rounded-full border-2 border-gray-900/80  bg-gray-800/50"></div>
            </label>
            <ul tabIndex={0} className="menu-compact dropdown-content menu rounded-box mt-3 w-52  bg-gray-800 p-2   shadow-2xl">
              <li>
                <Link to={'/settings'} className="text-lg">
                  Settings
                </Link>
              </li>
              <li>
                <a className="text-lg" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
};
