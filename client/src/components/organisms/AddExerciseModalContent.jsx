import React from 'react';
import { useState, useEffect } from 'react';
import { addTokenToRequestHeader } from '../../helpers/addTokenToRequestHeader';
import axios from 'axios';

export const AddExerciseModalContent = ({ trainingId }) => {
  const [data, setData] = useState({ name: '', reps: '' });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  useEffect(() => {
    setButtonDisabled(!data.name || !data.reps);
  }, [data.name, data.reps]);

  const handleSubmit = async (e) => {
    const headers = addTokenToRequestHeader();
    const res = {
      name: data.name,
      reps: data.reps,
    };
    try {
      const response = await axios.post(`http://localhost:8080/api/exercise/${trainingId}`, res, { headers });
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="mb-3 text-xl font-semibold text-gray-300">Add exercise</h1>

      <div className="mb-5 ">
        <label className="label">
          <span className="label-text text-base text-gray-300">Type the name of exercise</span>
        </label>

        <input type="text" required name="name" onChange={handleChange} placeholder="Type here" className="input-bordered input w-full  max-w-xs border-0 bg-gray-800 text-lg text-gray-200 placeholder:font-normal placeholder:text-gray-700" />
      </div>
      <div className="mb-5 ">
        <label className="label">
          <span className="label-text text-base text-gray-300">Enter number of reps</span>
        </label>

        <input
          type="text"
          name="reps"
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
      <label htmlFor="my-modal-5" onClick={handleSubmit} disabled={buttonDisabled} className="btn-outline btn mb-4 mt-5 w-full border-2 border-green-500 text-gray-300 hover:border-green-500 hover:bg-green-500 hover:text-gray-50">
        Add Transaction
      </label>
    </form>
  );
};
