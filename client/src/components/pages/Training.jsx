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
        <div className="mb-9 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <h1 className=" text-2xl text-gray-100">{name}</h1>
            <div className=" cursor-pointer rounded-full bg-green-500 px-4 py-2 text-sm  text-green-50" onClick={handleRefresh}>
              Refresh
            </div>
          </div>

          <label htmlFor="my-modal-5" className=" btn-outline btn border-2 border-green-600/80 bg-gray-950 text-sm font-bold text-gray-300  hover:border-green-600  hover:bg-green-600 hover:text-gray-100">
            Add exercise
          </label>
        </div>
        <Modal>
          <AddExerciseModalContent trainingId={routeParams.id} />
        </Modal>
        {!isLoading && exercisesData.exercises.length !== 0 ? exercisesData.exercises.map((exercise, index) => <ExerciseListItem key={index} name={exercise.name} reps={exercise.reps} checked={false} />) : <p className="text-xl text-gray-700">No exercises yet</p>}
      </div>
    </div>
  );
};
