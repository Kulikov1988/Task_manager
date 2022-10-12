import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../../sharedStyles/sharedStyles.style';
import { Button } from '../../sharedStyles/buttons.style';
import * as S from './SignUp.style';
import { handleInputChangeProps } from '../Login/Login';
import { useNavigate } from 'react-router-dom';
import { registerUser, resetRegister } from '../../slices/authReducer';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AppState } from '../../store';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

export const SignUpSchema = Yup.lazy((values) =>
  Yup.object().shape({
    name: Yup.string().max(25, 'Too Long').required('required'),
    email: Yup.string().when('name', {
      is: (input) => {
        // console.log({ values });
        return input.lenght > 2;
      },
      then: Yup.string().email('Valid email required').required('reqiured'),
    }),
    password: Yup.string()
      .min(3, 'minimum 3 symbols reqiured')
      .required('required'),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  })
);

const SignUp: React.FC = () => {
  // const [email, setEmail] = useState<string>('');
  // const [password1, setPassword1] = useState<string>('');
  // const [password2, setPassword2] = useState<string>('');
  // const [name, setName] = useState<string>('');

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
  }, [status]);

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
        onSubmit={(values) => {
          handleClick({ values });
          console.log(values.name);
        }}
      >
        {({ errors, touched }) => {
          console.log(errors);

          return (
            <Form>
              <S.SignIn>
                <S.SignInDiv>
                  <S.MainDiv>
                    <h1>Sign Up</h1>
                  </S.MainDiv>
                  <S.Div>Name</S.Div>
                  <Field name='name' placeholder='Name' />
                  {errors.name && touched.name ? (
                    <div> {errors.name}</div>
                  ) : null}
                  <S.Div>Email</S.Div>
                  <Field name='email' placeholder='Email' type='email' />
                  {errors.email && touched.email ? (
                    <div> {errors.email} </div>
                  ) : null}
                  <S.Div>Password</S.Div>
                  <Field
                    name='password'
                    type='password'
                    placeholder='password'
                  />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                  <S.Div>Confirm Password</S.Div>
                  <Field
                    name='confirmPassword'
                    type='password'
                    placeholder='Confirm Password'
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div>{errors.confirmPassword}</div>
                  ) : null}
                  <Button type='button'> Submit </Button>
                </S.SignInDiv>
              </S.SignIn>
            </Form>
          );
        }}
      </Formik>
      ;
    </div>
  );

  // const handleInputChange = ({ e, type }: handleInputChangeProps) => {
  //   if (type === 'email') {
  //     setEmail(e.target.value);
  //   } else if (type === 'password') {
  //     setPassword1(e.target.value);
  //   } else if (type === 'confirmPassword') {
  //     setPassword2(e.target.value);
  //   } else {
  //     setName(e.target.value);
  //   }
  // };

  // return (
  //     <S.SignIn>
  //       <S.SignInDiv>
  //         <div> {error &&
  //           error.map((err) => {
  //             return (
  //               <div>
  //                 {err.field}: {err.message}
  //               </div>
  //             );
  //           })}</div>
  //         <S.MainDiv>
  //           <h1>Sign In Page</h1>{' '}
  //         </S.MainDiv>
  //         <S.Div>Name</S.Div>
  //         <Input
  //           type='text'
  //           placeholder='your name'
  //           value={name}
  //           onChange={(e) => handleInputChange({ e, type: 'name' })}
  //         />
  //         <S.Div>Email</S.Div>
  //         <Input
  //           type='text'
  //           placeholder='email'
  //           value={email}
  //           onChange={(e) => handleInputChange({ e, type: 'email' })}
  //         />
  //         <S.Div>Password</S.Div>
  //         <Input
  //           type='password'
  //           placeholder='password'
  //           value={password1}
  //           onChange={(e) => handleInputChange({ e, type: 'password' })}
  //         />
  //         <S.Div>Confirm Password</S.Div>
  //         <Input
  //           type='password'
  //           placeholder='confirm password'
  //           value={password2}
  //           onChange={(e) => handleInputChange({ e, type: 'confirmPassword' })}
  //         />
  //         <div>
  //           <Button type='button' onClick={handleClick}>
  //             Sign in
  //           </Button>
  //         </div>

  //       </S.SignInDiv>
  //     </S.SignIn>
  // );
};

export default SignUp;
