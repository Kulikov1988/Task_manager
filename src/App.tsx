import React, { useEffect } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login/Login';
import SignIn from './components/SignIn/SignIn';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './slices/authReducer';
import Tasks from './components/Tasks/Tasks';
import { ButtonLogOut } from './sharedStyles/buttons.style';
import { AppState } from './store';
import { HeaderForm, LoginDiv } from './AppStyles.style';
import { onAuthStateChanged, auth } from './firebase';
import MyLogo from './assets/images/logo1.png';
import { LogoDiv } from './sharedStyles/sharedStyles.style';

function App(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userName } = useSelector((state: AppState) => state.authReducer);

  const logoutOnClick = () => {
    dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in, send the user's details to redux, store the current user in the state
        dispatch(
          login({
            userEmail: userAuth.email,
            // @ts-ignore
            userId: userAuth.uid,
            // @ts-ignore
            tokenId: userAuth.accessToken,
            userName: userAuth.displayName,
          })
        );
      } else {
        dispatch(logout());
        navigate('/login');
      }
    });
  });

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
        <Route path='/login' element={<Login />} />
        <Route path='/sign_in' element={<SignIn />} />
        <Route path='/tasks' element={<Tasks />} />
      </Routes>
    </>
  );
}

export default App;
