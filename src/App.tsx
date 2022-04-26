import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import SignIn from './components/SignIn/SignIn';
import { useDispatch } from 'react-redux';
import { logout } from './slices/authReducer';
import Task from './components/Task/component/Task';

function App() {
  const dispatch = useDispatch();

    const logoutOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(logout());
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
