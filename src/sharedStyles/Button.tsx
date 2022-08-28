import * as S from './Button.style';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant: S.Variant;
  onClick?: () => void;
}

const Button = ({ variant, children, ...props }: ButtonProps) => {
  return <button>{children}</button>;
};

export default Button;
