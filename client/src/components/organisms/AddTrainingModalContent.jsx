import React from 'react';
import { useState, useEffect } from 'react';
import { addTokenToRequestHeader } from '../../helpers/addTokenToRequestHeader';
import axios from 'axios';

export const AddTrainingModalContent = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [data, setData] = useState({ name: '', time: '' });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  useEffect(() => {
    setButtonDisabled(!data.name || !data.time);
  }, [data.name, data.time]);

  const handleSubmit = async (e) => {
    const headers = addTokenToRequestHeader();
    const res = {
      name: data.name,
      time: data.time,
    };
    try {
      const response = await axios.post(`http://localhost:8080/api/training`, res, { headers });
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="mb-3 text-xl font-semibold text-gray-300">Add training</h1>
      <div className="mb-5 ">
        <label className="label">
          <span className="label-text text-base text-gray-300">Enter the name of training</span>
        </label>

        <input type="text" required name="name" onChange={handleChange} placeholder="Type here" className="input-bordered input w-full  max-w-xs border-0 bg-gray-800 text-lg text-gray-200 placeholder:font-normal placeholder:text-gray-700" />
      </div>
      <div className="mb-5 ">
        <label className="label">
          <span className="label-text text-base text-gray-300">Enter the length of training</span>
        </label>

        <input
          type="text"
          name="time"
          required
          onChange={handleChange}
          placeholder="Type here"
          className="input-bordered input w-full  max-w-xs border-0 bg-gray-800 text-lg text-gray-200 placeholder:font-normal placeholder:text-gray-700"
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </div>

      <label htmlFor="my-modal-5" onClick={handleSubmit} disabled={buttonDisabled} className="btn-outline btn mb-4 mt-5 w-full rounded-full border-2 border-green-500 text-gray-300 hover:border-green-500 hover:bg-green-500 hover:text-gray-50">
        Add Training
      </label>
    </div>
  );
};
