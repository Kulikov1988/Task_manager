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
    user: { userEmail },
  } = useSelector((state: AppState) => state.authReducer);

  useEffect(() => {
    if (isAuth) {
      navigate('/tasks');
      dispatch(resetLogin());
    } 
  }, [isAuth, navigate, dispatch]);

  console.log(isAuth)

  const handleClick = (values) => {
    dispatch(
      loginUser({
        email: values.email,
        password: values.password,
      })
    );
  };

  return (
    <>
      <Formik
        initialValues={{
          email: userEmail,
          password: '123456',
        }}
        validationSchema={LoginSchema}
        onSubmit={handleClick}
      >
        {({ errors, submitForm, handleChange }) => {
          return (
            <Form>
              <SignDiv>
                Don't have an account yet?
                <NavLink to='/sign_in'> Sign up</NavLink>
              </SignDiv>
              <S.Login>
                <S.loginDiv>
                  <S.Div>
                    {error &&
                      error.map((err) => {
                        return (
                          <div>
                            {err.field} Field: {err.message}
                          </div>
                        );
                      })}
                  </S.Div>
                  <S.mainDiv>
                    <h1>Login Page</h1>
                    <CustomInput
                      type='text'
                      name='email'
                      label='Email'
                      placeholder='Email'
                      error={errors.email}
                      onChange={handleChange}
                    />
                    <CustomInput
                      label='Password'
                      type='password'
                      name='password'
                      placeholder='Password'
                      error={errors.password}
                      onChange={handleChange}
                    />
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
