import React from 'react';
import { useState } from 'react';

export const ExerciseListItem = ({ name, reps }) => {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked(!checked);
  };

  return (
    <div className="mb-5  flex cursor-pointer items-center justify-between  gap-9 rounded-md border-2 border-gray-800 bg-gray-800 p-6 transition hover:bg-gray-800/80" onClick={handleClick}>
      <div className="flex items-center gap-5">
        <input type="checkbox" checked={checked} className=" checkbox   hover:border-green-500" onChange={handleClick} />
        <div className=" text-xl text-gray-200">{name}</div>
        <div className=" mb-2 text-gray-600">.</div>
        <div className="text-lg text-gray-300">Powtórzenia: {reps}</div>
      </div>
    </div>
  );
};
