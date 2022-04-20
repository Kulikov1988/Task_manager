import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../../sharedStyles/sharedStyles.style';
import { Button } from '../../sharedStyles/button.style';
import * as S from './SignIn.style';
import { handleInputChangeProps } from '../Login/Login';
import { AppState } from '../../store';
import { signUp } from '../../slices/loginReducer';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [name, setName] = useState<string>('');

  const dispatch = useDispatch();
  const { userEmail, userName } = useSelector(
    (state: AppState) => state.loginReducer
  );

  const navigate = useNavigate();

  const loginToTasks = () => {
    navigate('/task');
  };

  const someErr = 'Check your password or email';

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

  const handlerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password1 === password2 && name !== '') {
      dispatch(
        signUp({
          userEmail: email,
          password: password1,
          userName: name,
          cb: loginToTasks,
        })
      );
    } else {
      console.log(someErr);
    }
  };

  return (
    <S.SignIn>
      <S.SignInForm>
        <div>Hello {userName}!</div>
        <div>Your email is: {userEmail}</div>
        <S.mainDiv>
          <h1>Sign In Page</h1>{' '}
        </S.mainDiv>
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
          <Button onClick={handlerClick}>Sign in</Button>
        </div>
      </S.SignInForm>
    </S.SignIn>
  );
};

export default SignIn;
