import React, { useEffect } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login/Login';
import SignIn from './components/SignUp/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './slices/authReducer';
import Tasks from './components/Tasks/Tasks';
import { ButtonLogOut } from './sharedStyles/buttons.style';
import { AppState } from './store';
import { HeaderForm, LoginDiv } from './AppStyles.style';
import MyLogo from './assets/images/logo1.png';
import { LogoDiv } from './sharedStyles/sharedStyles.style';

function App(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userName } = useSelector((state: AppState) => state.authReducer.user);

  const logoutOnClick = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <HeaderForm>
        <LogoDiv src={MyLogo} alt='' />
        <div>
          <LoginDiv isHidden={!!userName}>
            <NavLink to='/login'>Login</NavLink>
          </LoginDiv>

          <ButtonLogOut isHidden={!!userName} onClick={logoutOnClick}>
            Log Out
          </ButtonLogOut>
        </div>
      </HeaderForm>

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign_in' element={<SignIn />} />
        <Route path='/tasks' element={<Tasks />} />
      </Routes>
    </>
  );
}

export default App;
