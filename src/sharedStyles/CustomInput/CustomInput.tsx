import { FormikErrors, FormikTouched } from 'formik';
import React, { ChangeEvent } from 'react';
import { ErrorDiv, Input } from './CustomInput.style';
import * as S from '../../components/SignUp/SignUp.style';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value?: string;
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  touched?: FormikTouched<any> | boolean | string
}

const CustomInput = ({
  touched,
  value,
  label,
  name,
  placeholder,
  onChange,
  error,
  ...props
}: CustomInputProps) => {
  return (
    <>
      <div>
        <S.Div>{label && <label htmlFor='input-field'> {label}</label>}</S.Div>
        <Input
          // value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          {...props}
        />
      </div>
      {error && <ErrorDiv>{error}</ErrorDiv>}
    </>
  );
};

export default CustomInput;
