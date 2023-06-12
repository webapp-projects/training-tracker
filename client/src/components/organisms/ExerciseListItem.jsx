import React from 'react';

export const ExerciseListItem = ({ name, reps, onDelete }) => {
  return (
    <div className="mb-5  flex items-center  justify-between gap-9 rounded-md border-2 border-gray-800 bg-gray-900 p-6">
      <div className="flex items-center gap-5">
        <input type="checkbox" className="checkbox-primary checkbox" />
        <div className=" text-xl text-gray-200">{name}</div>
        <div className=" text-gray-600">.</div>
        <div className="text-lg text-gray-300">Powtórzenia: {reps}</div>
      </div>
    </div>
  );
};
