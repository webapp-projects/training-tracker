import React from 'react';
import { NavigationBar } from '../organisms/NavigationBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { addTokenToRequestHeader } from '../../helpers/addTokenToRequestHeader';

export const Settings = () => {
  const [data, setData] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const headers = addTokenToRequestHeader();

  const handleChange = ({ currentTarget: input }) => {
    setUpdatedData({ ...updatedData, [input.name]: input.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put('http://localhost:8080/api/auth', updatedData, { headers });
      window.location.reload();

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user', { headers });
        setData(response.data);

        setUpdatedData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen bg-gray-900">
      <NavigationBar />
      <div className="px-6">
        <h1 className="mb-5 text-xl text-gray-300">Settings</h1>
        <div className="rounded-lg bg-gray-800 p-5">
          <form>
            <div className="mb-5 ">
              <label className="label">
                <span className="label-text text-base text-gray-300">Change user first name</span>
              </label>
              <input type="text" onChange={handleChange} name="firstName" placeholder={data.firstName} className="input-bordered input w-full max-w-lg border-0 bg-gray-700 text-lg text-gray-200  placeholder:text-gray-500" />
            </div>

            <div className="mb-5 ">
              <label className="label">
                <span className="label-text text-base text-gray-300">Change user second name</span>
              </label>
              <input type="text" onChange={handleChange} name="lastName" placeholder={data.lastName} className="input-bordered input w-full max-w-lg border-0 bg-gray-700 text-lg text-gray-200  placeholder:text-gray-500" />
            </div>

            <div className="mb-5 ">
              <label className="label">
                <span className="label-text text-base text-gray-300">Change user email</span>
              </label>
              <input type="email" onChange={handleChange} name="email" placeholder={data.email} className="input-bordered input w-full max-w-lg border-0 bg-gray-700 text-lg text-gray-200  placeholder:text-gray-500" />
            </div>

            <label htmlFor="my-modal-5" className="btn-outline btn mb-4 mt-5 rounded-full border-2 border-green-500 text-gray-300 hover:border-green-500 hover:bg-green-600 hover:text-gray-50" onClick={handleSubmit}>
              Edit Data
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};
