import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../sharedStyles/buttons.style';
import * as S from './SignUp.style';
import { useNavigate } from 'react-router-dom';
import { registerUser, resetRegister } from '../../slices/authReducer';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AppState } from '../../store';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import CustomInput from '../../sharedStyles/CustomInput/CustomInput';

export const SignUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'To short')
      .max(25, 'Too Long')
      .required('required'),
    email: Yup.string()
      .required('Valid email required')
      .email('Valid email required'),
    password: Yup.string()
      .min(3, 'minimum 3 symbols reqiured')
      .required('required'),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  })


const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<{}, void, AnyAction>>();

  const { status, error } = useSelector(
    (state: AppState) => state.authReducer.register
  );

  useEffect(() => {
    if (status === 'success') {
      navigate('/login');
      dispatch(resetRegister());
    }
  }, [status, navigate, dispatch]);

  const handleClick = (values) => {
    dispatch(
      registerUser({
        email: values.email,
        name: values.name,
        password: values.password,
      })
    );
  };
  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          name: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={SignUpSchema}
        onSubmit={handleClick}
      >
        {({ errors, touched, submitForm, handleChange }) => {

          return (
            <Form>
              <S.SignIn>
                <S.SignInDiv>
                  <S.MainDiv>
                    <h1>Sign Up</h1>
                  </S.MainDiv>
                  <div>
                    {' '}
                    {error &&
                      error.map((err) => {
                        return (
                          <div>
                            {err.field} field : {err.message}
                          </div>
                        );
                      })}
                  </div>
                  <CustomInput
                    label='Name'
                    type='text'
                    name='name'
                    placeholder='Name'
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <CustomInput
                    label='Email'
                    name='email'
                    placeholder='Email'
                    type='text'
                    onChange={handleChange}
                    error={errors.email}
                  />
                  <CustomInput
                    name='password'
                    type='password'
                    placeholder='password'
                    onChange={handleChange}
                    label='password'
                    error={errors.password}
                  />
                  <CustomInput
                    label='ConfirmPassword'
                    name='confirmPassword'
                    type='password'
                    placeholder='Confirm Password'
                    onChange={handleChange}
                    error={errors.confirmPassword}
                  />
                  
                  <Button type='button' onClick={() => submitForm()}>
                    {' '}
                    Submit{' '}
                  </Button>
                </S.SignInDiv>
              </S.SignIn>
            </Form>
          );
        }}
      </Formik>
      ;
    </div>
  );
};

export default SignUp;
