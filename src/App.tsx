import React from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Task from './components/Login/Task';
import SignIn from './components/SignIn/SignIn';
import { useDispatch } from 'react-redux';
import { logout } from './slices/loginReducer';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const moveToLoginPage = () => {
    navigate('/login');
  };

  const logoutOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(logout({ cb: moveToLoginPage }));
  };

  return (
    <div>
      <div>
        <NavLink to='/login'>Login</NavLink>
        <div>
          <button onClick={logoutOnClick}>Log Out</button>
        </div>
      </div>

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/sign_in' element={<SignIn />} />
        <Route path='/task' element={<Task />} />
      </Routes>
    </div>
  );
}

export default App;
