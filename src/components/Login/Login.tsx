import React, { useState } from 'react';
import * as S from './Login.style';
import { Input } from '../../sharedStyles/sharedStyles.style';
import { Button } from '../../sharedStyles/button.style';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginToUserTasks, logout} from '../../slices/authReducer';
import { NavLink } from 'react-router-dom';
import { SignDiv } from '../../sharedStyles/sharedStyles.style';
import { AppState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';

export type InputType = 'email' | 'password' | 'confirmPassword' | 'name';

export interface handleInputChangeProps {
  e: React.ChangeEvent<HTMLInputElement>;
  type: InputType;
}

interface LoginUserResponse {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered: boolean;
}

const Login: React.FC = () => {
  const [localEmail, setLocalEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();

  // const { err } = useSelector((state: AppState) => state.authReducer);

  const navigate = useNavigate();

  const handleInputChange = ({ e, type }: handleInputChangeProps) => {
    if (type === 'email') {
      setLocalEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const loginToTasks = () => {
    navigate('/tasks');
  };

  const handleClick = () => {
    console.log('handle Click');
    const auth = getAuth();
    signInWithEmailAndPassword(auth, localEmail, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          login({
            userEmail: user.email,
            // @ts-ignore
            userId: user.uid,
            // @ts-ignore
            tokenId: user.accessToken,
            userName: user.displayName,
            
          })
        );
      })
      .catch((error) => {
        console.log('error');
        dispatch(logout())
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
      dispatch(
        loginToUserTasks({
          cb: loginToTasks,
        })
      );
  };

  return (
    <>
      <SignDiv>
        Don't have an account yet?
        <NavLink to='/sign_in'> Sign in</NavLink>
      </SignDiv>
      <S.Login>
        <S.loginDiv>
          {/* <S.Div>{err}</S.Div> */}
          <S.mainDiv>
            <h1>Login Page</h1>{' '}
          </S.mainDiv>
          <S.Div>Email</S.Div>
          <Input
            type='text'
            placeholder='email'
            value={localEmail}
            onChange={(e) => handleInputChange({ e, type: 'email' })}
          />
          <S.Div>Password</S.Div>
          <Input
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => handleInputChange({ e, type: 'password' })}
          />
          <Button type='button' onClick={handleClick}>
            Login
          </Button>
        </S.loginDiv>
      </S.Login>
    </>
  );
};

export default Login;
