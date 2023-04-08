import { HeaderForm } from '../../../../../AppStyles.style';
import { LogoDiv } from '../../../../../sharedStyles/sharedStyles.style';
import { LoginDiv } from './../../../../../AppStyles.style';
import { NavLink, useNavigate } from 'react-router-dom';
import { ButtonLogOut } from '../../../../../sharedStyles/buttons.style';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../store';
import { logout } from '../../../../../slices/authReducer';
import MyLogo from '../../../../../../src/assets/images/logo1.png';
import Avatar from '@mui/material/Avatar';

const MyHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state: AppState) => state.authReducer);
  const { userName } = useSelector((state: AppState) => state.authReducer.user);

  const logoutOnClick = () => {
    dispatch(logout());
    navigate('/login');
  };

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    const nameLenght = name.split(' ').length;
    if (nameLenght === 2) {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
      };
    }
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: name.split(' ')[0][0],
    };
  }

  return (
    <>
      <HeaderForm>
        <LogoDiv src={MyLogo} alt='' />
        <div>
          <b>Hellow {userName}, it is your tasks:</b>
          <Avatar {...stringAvatar(userName)} />
          <LoginDiv isHidden={isAuth}>
            <NavLink to='/login'>Login</NavLink>
          </LoginDiv>
          <ButtonLogOut isHidden={isAuth} onClick={logoutOnClick}>
            Log Out
          </ButtonLogOut>
        </div>
      </HeaderForm>
    </>
  );
};

export default MyHeader;
