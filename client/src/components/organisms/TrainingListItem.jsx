import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { addTokenToRequestHeader } from '../../helpers/addTokenToRequestHeader';

export const TrainingListItem = ({ date, title, length, exerciseCount, id }) => {
  const headers = addTokenToRequestHeader();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/training/${id}`, { headers });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-6 flex w-full items-center">
      <Link to={`/training/${id}`} className="w-full">
        <div className="w-full cursor-pointer  rounded-md border-2 border-gray-800 bg-gray-900 p-6 shadow-lg transition hover:bg-gray-900/70 hover:shadow-2xl">
          <div className="flex justify-between">
            <div className="flex  items-center justify-start gap-6">
              <div className="flex items-center gap-5">
                <div className="h-9 w-9 rounded bg-gray-800"> a</div>
                <div className="">
                  <div className="text-2xl text-gray-200 ">{title}</div>
                </div>
              </div>
              <div className="mb-2 text-gray-600">.</div>
              <div className=" font-base  text-gray-500">{length} minutes</div>
              <div className="mb-2 text-gray-600">.</div>
              {exerciseCount !== 0 ? <div className="font-base text-gray-500">{exerciseCount} exercises</div> : <div className="font-base text-gray-500">No logged exercises yet</div>}
            </div>
          </div>
        </div>
      </Link>
      <button className="btn-sm btn -ml-24 rounded-full border-gray-600/40 bg-gray-800 text-xs font-normal text-gray-300 hover:border-rose-600/80 hover:bg-gray-900" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
