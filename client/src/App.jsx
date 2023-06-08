import './App.css';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Register } from './components/pages/Register';
import { Login } from './components/pages/Login';
import { Home } from './components/pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/register" exact element={<Register />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" exact element={<Home />} />
    </Routes>
  );
}

export default App;
