import { ReactNode } from 'react';
import { defaultButtonStyle } from './styles';

type ButtonProps = {
  children: ReactNode | string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, className, ...rest }: ButtonProps) => {
  const classNameStyles = className || defaultButtonStyle;
  return (
    <button className={classNameStyles} {...rest}>
      {children}
    </button>
  );
};
