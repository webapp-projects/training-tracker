import React from 'react';

export const TrainingListItem = ({ date, title, length, exerciseCount, onDelete }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div className="mb-6 ">
      <div className="cursor-pointer rounded-md  border-2 border-gray-800 bg-gray-900 p-6 shadow-lg transition hover:bg-gray-900/70 hover:shadow-2xl">
        <div className="flex justify-between">
          <div className="flex  items-center justify-start gap-6">
            <div className="flex items-center gap-5">
              <div className="h-9 w-9 rounded bg-gray-800"> a</div>
              <div className="">
                <div className="font-semibold text-gray-600">{date}</div>
                <div className="text-xl text-gray-300 ">{title}</div>
              </div>
            </div>
            <div className="mb-2 text-gray-600">.</div>
            {exerciseCount != 0 ? <div className="font-base text-gray-400">{exerciseCount} exercises</div> : <div className="font-base text-gray-400">No logged exercises yet</div>}
            <div className="mb-2 text-gray-600">.</div>
            <div className=" font-base text-gray-400">{length} minutes</div>
          </div>

          <button className="btn-sm btn border-rose-600/40 bg-gray-900 text-xs font-normal hover:border-rose-600/80 hover:bg-gray-900" onClick={handleDelete}>
            Usuń
          </button>
        </div>
      </div>
    </div>
  );
};
