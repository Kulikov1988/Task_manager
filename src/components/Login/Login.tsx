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
    register: { status },
  } = useSelector((state: AppState) => state.authReducer);

  console.log(error, 'error');
  // console.log(typeof error);

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

  // const serverError = () => {
  //   if (typeof error === 'object') {
  //     return console.log({error})
  //   } else { return (

  //     error.map((err, index) => {
  //       return (
  //         <div key={index}>
  //           {err.field} Field: {err.message}
  //         </div>
  //       );
  //     })
  //   )

  //   }
  // };

  // console.log(
  //   error.map((err) => {
  //     return err.field;
  //   })
  // );
  // console.log(serverError());

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

                    <S.Div>
                      {error &&
                        error.map((err, index) => {
                          if (err.field === 'email') {
                            return <div key={index}>{err.message}</div>;
                          } else {
                            return null;
                          }
                        })}
                    </S.Div>
                    <CustomInput
                      label='Password'
                      type='password'
                      name='password'
                      onChange={handleChange}
                    />
                    <S.Div>
                      {error &&
                        error.map((err, index) => {
                          if (err.field === 'password') {
                            return <div key={index}>{err.message}</div>;
                          } else {
                            return null;
                          }
                        })}
                    </S.Div>
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
