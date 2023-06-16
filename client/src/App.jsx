import './App.css';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Register } from './components/pages/Register';
import { Settings } from './components/pages/Settings';
import { Login } from './components/pages/Login';
import { Home } from './components/pages/Home';
import { useEffect } from 'react';
import { Training } from './components/pages/Training';

function App() {
  const user = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && window.location.pathname !== '/register') {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <Routes>
      {user && <Route path="/" exact element={<Home />} />}
      <Route path="/register" exact element={<Register />} />
      <Route path="/settings" exact element={<Settings />} />

      <Route path="/login" exact element={<Login />} />
      <Route path="/training/:id" element={<Training />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default App;
