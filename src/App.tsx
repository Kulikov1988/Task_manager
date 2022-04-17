import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import SignIn from './components/SignIn/SignIn';

function App() {
  return (
    <div>
      <div>
        <NavLink to='/login'>Login</NavLink>
      </div>

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/sign_in' element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
