import React from 'react';

export const ModalContent = () => {
  return (
    <form>
      <h1 className="mb-3 text-xl font-semibold text-gray-300">Add exercise</h1>

      <div className="mb-5 ">
        <label className="label">
          <span className="label-text text-base text-gray-300">Type the name of exercise</span>
        </label>

        <input type="text" placeholder="Type here" className="input-bordered input w-full  max-w-xs border-0 bg-gray-800 text-lg text-gray-200 placeholder:font-normal placeholder:text-gray-700" />
      </div>
      <div className="mb-5 ">
        <label className="label">
          <span className="label-text text-base text-gray-300">Enter number of reps</span>
        </label>

        <input type="text" placeholder="Type here" className="input-bordered input w-full  max-w-xs border-0 bg-gray-800 text-lg text-gray-200 placeholder:font-normal placeholder:text-gray-700" />
      </div>
      <label htmlFor="my-modal-5" className="btn-outline btn mb-4 mt-5 w-full border-2 border-violet-500 text-gray-300 hover:border-violet-500 hover:bg-violet-500 hover:text-gray-50">
        Add Transaction
      </label>
    </form>
  );
};
