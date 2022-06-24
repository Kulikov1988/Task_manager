import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '../../sharedStyles/sharedStyles.style';
import { Button } from '../../sharedStyles/button.style';
import * as S from './SignIn.style';
import { handleInputChangeProps } from '../Login/Login';
import { signUp } from '../../slices/authReducer';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const loginToTasks = () => {
    navigate('/task');
  };

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
        signUp({
          userEmail: email,
          password: password1,
          userName: name,
          isAuth: true,
          cb: loginToTasks,
        })
      );
    } else {
      return setErrorMessage(
        'Some error, check your password/ All inputs are required'
      );
    }
  };

  return (
    <S.SignIn>
      <S.SignInForm>
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
          <Button type='button' onClick={handleClick}>Sign in</Button>
        </div>
      </S.SignInForm>
    </S.SignIn>
  );
};

export default SignIn;
