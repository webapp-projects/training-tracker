import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ExerciseListItem } from '../organisms/ExerciseListItem';
import { addTokenToRequestHeader } from '../../helpers/addTokenToRequestHeader';
import { NavigationBar } from '../organisms/NavigationBar';
import { Modal } from '../organisms/Modal';
import { AddExerciseModalContent } from '../organisms/AddExerciseModalContent';

const findNameById = (id, data) => {
  const foundObject = data.find((obj) => obj._id === id);
  if (foundObject) {
    return foundObject.name;
  }
  return null;
};

export const Training = () => {
  const routeParams = useParams();
  let endpoints = ['http://localhost:8080/api/training', `http://localhost:8080/api/exercise/${routeParams.id}`];

  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [nameData, setNameData] = useState('');
  const [exercisesData, setExercisesData] = useState('');

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    const headers = addTokenToRequestHeader();

    const fetchData = async () => {
      try {
        const dataPromises = endpoints.map(async (endpoint) => {
          const response = await axios.get(endpoint, { headers });
          return response.data;
        });

        const responseData = await Promise.all(dataPromises);
        setNameData(responseData[0]);
        setExercisesData(responseData[1]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setName(findNameById(routeParams.id, nameData.trainings));
    }
  }, [nameData]);

  return (
    <div className="h-screen bg-gray-950">
      <NavigationBar />
      <div className="px-6">
        <div className=" flex items-center justify-between">
          <h1 className=" text-3xl text-gray-50">{name}</h1>
          <div className="flex gap-5">
            <label htmlFor="my-modal-5" className=" btn-outline btn rounded-full border-2 border-green-600/80 bg-gray-950 text-sm font-bold text-gray-300  hover:border-green-600  hover:bg-green-600 hover:text-gray-100">
              Add exercise
            </label>
            <div className=" flex cursor-pointer items-center rounded-full bg-green-500  px-4 text-sm text-green-50 " onClick={handleRefresh}>
              Refresh
            </div>
          </div>
        </div>
        <Modal>
          <AddExerciseModalContent trainingId={routeParams.id} />
        </Modal>
        <h1 className=" mb-5 text-xl text-gray-300">Exercises: </h1>

        {!isLoading && exercisesData.exercises.length !== 0 ? exercisesData.exercises.map((exercise, index) => <ExerciseListItem key={index} name={exercise.name} reps={exercise.reps} checked={false} />) : <p className="text-center text-5xl text-gray-800/50">No exercises yet</p>}
      </div>
    </div>
  );
};
