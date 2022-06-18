import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import SignIn from './components/SignIn/SignIn';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './slices/authReducer';
import Tasks from './components/Tasks/Tasks';
import { ButtonLogOut } from './sharedStyles/button.style';
import { AppState } from './store';
import { LoginDiv } from './AppStyles.style';
import EditForm from './components/Tasks/component/components/editForm/EditTaskForm';

function App(props) {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: AppState) => state.authReducer);

   const logoutOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(logout());
  };

  return (
    <>
      <div>
        <LoginDiv isHidden={isAuth}>
          <NavLink to='/login'>Login</NavLink>
        </LoginDiv>
        <div>
          <ButtonLogOut isHidden={isAuth} onClick={logoutOnClick}>
            Log Out
          </ButtonLogOut>
        </div>
      </div>

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/sign_in' element={<SignIn />} />
        <Route path='/task' element={<Tasks />} />
        <Route path='/edit_task' element={<EditForm />} />
      </Routes>
    </>
  );
}

export default App;
