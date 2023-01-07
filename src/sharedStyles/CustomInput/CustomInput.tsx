import {useField } from 'formik';
import React from 'react';
import { ErrorDiv, Input } from './CustomInput.style';
import * as S from '../../components/SignUp/SignUp.style';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  placeholder?: string;
}

const CustomInput = ({
  label,
  name,
  placeholder,
  ...props
}: CustomInputProps) => {
  const [field, meta, ] = useField(name)

  return (
    <>
      <div>
        <S.Div>{ <label htmlFor='input-field'> {label || name }</label>}</S.Div>
        <Input
          value={field.value}
          name={field.name}
          placeholder={placeholder || name}
          onChange={field.onChange}
          {...props}
        />
      </div>
      {meta.error && <ErrorDiv>{meta.error}</ErrorDiv>}
    </>
  );
};

export default CustomInput;
