import React, { useState } from 'react';
import * as S from './Login.style';
import { Input } from '../../sharedStyles/sharedStyles.style';
import { Button } from '../../sharedStyles/button.style';
import { useDispatch, useSelector } from 'react-redux';
import { loginCheck, signUp } from '../../slices/loginReducer';
import { NavLink } from 'react-router-dom';
import { SignDiv } from '../../sharedStyles/sharedStyles.style';
import { AppState } from '../../store';

export type InputType = 'email' | 'password' | 'confirmPassword' | 'name';

export interface handleInputChangeProps {
  e: React.ChangeEvent<HTMLInputElement>;
  type: InputType;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();
  const { userEmail, userName, err } = useSelector(
    (state: AppState) => state.loginReducer
  );

  const handleInputChange = ({ e, type }: handleInputChangeProps) => {
    if (type === 'email') {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(
      loginCheck({
        userEmail: email,
        password,
      })
    );
  };

  const logoutOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      signUp({
        userName : '',
        password,
        userEmail,
      })
    );
  };

  const loginToTasks = (e: React.MouseEvent<HTMLButtonElement>) => {

  };

  return (
    <>
      <button onClick={logoutOnClick}>Log Out</button>
      <SignDiv>
        Don't have an account yet?
        <NavLink to='/sign_in'> Sign in</NavLink>
      </SignDiv>
      <S.Login>
        <S.loginForm>
          <div>Hello {userName}!</div>
          <div>{err}</div>
          <S.mainDiv>
            <h1>Login Page</h1>{' '}
          </S.mainDiv>
          <S.Div>Email</S.Div>
          <Input
            type='text'
            placeholder='email'
            value={email}
            onChange={(e) => handleInputChange({ e, type: 'email' })}
          />
          <S.Div>Password</S.Div>
          <Input
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => handleInputChange({ e, type: 'password' })}
          />
          <Button onClick={handleClick}>Login</Button>
          {/* <button onClick={loginToTasks}>go to '/'</button> */}
        </S.loginForm>
      </S.Login>
    </>
  );
};

export default Login;
