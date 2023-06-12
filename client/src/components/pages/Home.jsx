import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrainingListItem } from '../organisms/TrainingListItem';
import axios from 'axios';
import { addTokenToRequestHeader } from '../../helpers/addTokenToRequestHeader';
import { NavigationBar } from '../organisms/NavigationBar';

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
      <div className="mt-5 px-6">
        {!isLoading &&
          data.trainings.map((training, index) => (
            <Link key={training._id} to={`/training/${training._id}`}>
              <TrainingListItem title={training.name} length={training.time} exerciseCount={training.exercises.length} />
            </Link>
          ))}
      </div>
    </div>
  );
};
