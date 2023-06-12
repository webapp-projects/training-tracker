import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrainingListItem } from '../organisms/TrainingListItem';
import axios from 'axios';
import { addTokenToRequestHeader } from '../../helpers/addTokenToRequestHeader';
import { NavigationBar } from '../organisms/NavigationBar';
import { Modal } from '../organisms/Modal';
import { AddTrainingModalContent } from '../organisms/AddTrainingModalContent';

export const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  useEffect(() => {
    const headers = addTokenToRequestHeader();

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/training', { headers });
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" h-screen  bg-gray-950  ">
      <NavigationBar handleLogout={handleLogout} />
      <div className=" flex items-center justify-between px-6">
        <div className="">
          <h1 className="text-2xl text-gray-100">Keep the work going!</h1>
          <h1 className=" mt-2 text-xl text-gray-300">Your Trainings: </h1>
        </div>
        <label htmlFor="my-modal-5" className=" btn-outline btn border-2 border-green-500/80 bg-gray-950 text-sm font-bold text-gray-300  hover:border-green-600  hover:bg-green-600 hover:text-gray-100">
          Add training
        </label>
      </div>
      <Modal>
        <AddTrainingModalContent />
      </Modal>
      <div className="mt-5 w-full px-6">{!isLoading && data.trainings.map((training, index) => <TrainingListItem title={training.name} key={training._id} length={training.time} exerciseCount={training.exercises.length} id={training._id} />)}</div>
    </div>
  );
};
