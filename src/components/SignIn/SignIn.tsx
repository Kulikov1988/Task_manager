import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '../../sharedStyles/sharedStyles.style';
import { Button } from '../../sharedStyles/buttons.style';
import * as S from './SignIn.style';
import { handleInputChangeProps } from '../Login/Login';
import { signUp } from '../../slices/authReducer';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../slices/authReducer';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const dispatch = useDispatch<ThunkDispatch<{},void, AnyAction>>();

  const navigate = useNavigate();

  const handleInputChange = ({ e, type }: handleInputChangeProps) => {
    if (type === 'email') {
      setEmail(e.target.value);
    } else if (type === 'password') {
      setPassword1(e.target.value);
    } else if (type === 'confirmPassword') {
      setPassword2(e.target.value);
    } else {
      setName(e.target.value);
    }
  };

  const handleClick = () => {
    if (password1 === password2 && name !== '') {
      dispatch(
        registerUser({
          email,
          name,
        })
      );
      navigate('/tasks');
    } else {
      return setErrorMessage(
        'Some error, check your password / All inputs are required'
      );
    }
  };

  return (
    <S.SignIn>
      <S.SignInDiv>
        <div> {errorMessage}</div>
        <S.MainDiv>
          <h1>Sign In Page</h1>{' '}
        </S.MainDiv>
        <S.Div>Name</S.Div>
        <Input
          type='text'
          placeholder='your name'
          value={name}
          onChange={(e) => handleInputChange({ e, type: 'name' })}
        />
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
          value={password1}
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
          <Button type='button' onClick={handleClick}>
            Sign in
          </Button>
        </div>
      </S.SignInDiv>
    </S.SignIn>
  );
};

export default SignIn;
