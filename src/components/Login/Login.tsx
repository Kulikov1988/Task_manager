import React, { useEffect } from 'react';
import * as S from './Login.style';
import { Button } from '../../sharedStyles/buttons.style';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetLogin } from '../../slices/authReducer';
import { NavLink } from 'react-router-dom';
import { SignDiv } from '../../sharedStyles/sharedStyles.style';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AppState } from '../../store';
import { Form, Formik } from 'formik';
import CustomInput from '../../sharedStyles/CustomInput/CustomInput';

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Valid email required')
    .email('Valid email required'),
  password: Yup.string().min(3, 'minimum 3 symbols').required('required'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<void, {}, AnyAction>>();

  const {
    isAuth,
    login: { error },
  } = useSelector((state: AppState) => state.authReducer);

  useEffect(() => {
    if (isAuth) {
      navigate('/tasks');
      dispatch(resetLogin());
    }
  }, [isAuth, navigate, dispatch]);

  const handleClick = (values) => {
    dispatch(
      loginUser({
        email: values.email,
        password: values.password,
      })
    );
  };

  const serverError = (error) => {
    if (error === null) {
      return;
    } else if (Array.isArray(error)) {
      return Object.fromEntries(error.map((obj) => [obj.field, obj.message]));
    } else if (!Array.isArray(error)) {
      return { message: error?.message };
    }
  };

  const error2 = serverError(error);

  console.log(error2);

  return (
    <>
      <Formik
        initialValues={{
          email: 'a@a.com',
          password: '123456',
        }}
        // validationSchema={LoginSchema}
        onSubmit={handleClick}
      >
        {({ submitForm, handleChange }) => {
          return (
            <Form>
              <SignDiv>
                Don't have an account yet?
                <NavLink to='/sign_in'> Sign up</NavLink>
              </SignDiv>
              <S.Login>
                <S.loginDiv>
                  <S.mainDiv>
                    <h1>Login Page</h1>
                    <CustomInput
                      name='email'
                      label='Email'
                      onChange={handleChange}
                    />
                    <S.Div>{error2 && error2.email}</S.Div>
                    <CustomInput
                      label='Password'
                      type='password'
                      name='password'
                      onChange={handleChange}
                    />
                    <S.Div>{error2 && error2.message}</S.Div>
                    <Button type='button' onClick={() => submitForm()}>
                      Submit
                    </Button>
                  </S.mainDiv>
                </S.loginDiv>
              </S.Login>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default Login;
