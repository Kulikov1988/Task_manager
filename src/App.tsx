import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './slices/authReducer';
import { ButtonLogOut } from './sharedStyles/buttons.style';
import { AppState } from './store';
import { HeaderForm, LoginDiv } from './AppStyles.style';
import MyLogo from './assets/images/logo1.png';
import { LogoDiv } from './sharedStyles/sharedStyles.style';
import MyCalendar from './components/Tasks/component/components/Calendar/MyCalendar';
import Tasks from './components/Tasks/Tasks';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state: AppState) => state.authReducer);

  const logoutOnClick = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <HeaderForm>
        <LogoDiv src={MyLogo} alt='' />
        <div>
          <LoginDiv isHidden={isAuth}>
            <NavLink to='/login'>Login</NavLink>
          </LoginDiv>
          <ButtonLogOut isHidden={isAuth} onClick={logoutOnClick}>
            Log Out
          </ButtonLogOut>
        </div>
      </HeaderForm>
      
        <MyCalendar />

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign_in' element={<SignUp />} />
        <Route path='/tasks' element={<Tasks />} />
      </Routes>
    </>
  );
}

export default App;
