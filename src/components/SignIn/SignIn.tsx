//@ts-nocheck
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../../sharedStyles/sharedStyles.style';
import { Button } from '../../sharedStyles/button.style';
import * as S from './SignIn.style';
import { handleInputChangeProps } from '../Login/Login';
import { confirmPassword } from '../../slices/signInReducer';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');

  const dispatch = useDispatch();
  const { userEmail, userPassword } = useSelector(
    (state) => state
  ).signInReducer;

  const someErr = 'Check your password or email';

  const handleInputChange = ({ e, type }: handleInputChangeProps) => {
    if (type === 'email') {
      setEmail(e.target.value);
    } else if (type === 'password') {
      setPassword(e.target.value);
    } else {
      setPassword2(e.target.value);
    }
  };

  const handlerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password === password2) {
      dispatch(
        confirmPassword({
          userEmail: email,
          userPassword: password,
            })
      );
    } else {
      console.log(someErr);
    }
  };

  return (
    <S.SignIn>
      <S.SignInForm>
        <div></div>
        <div>Your email is: {userEmail}</div>
        <div>password: {userPassword}</div>
        <S.mainDiv>
          <h1>Sign In Page</h1>{' '}
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
        <S.Div>Confirm Password</S.Div>
        <Input
          type='password'
          placeholder='confirm password'
          value={password2}
          onChange={(e) => handleInputChange({ e, type: 'confirmPassword' })}
        />
        <div>
          <Button onClick={handlerClick}>Sign in</Button>
        </div>
      </S.SignInForm>
    </S.SignIn>
  );
};

export default SignIn;
