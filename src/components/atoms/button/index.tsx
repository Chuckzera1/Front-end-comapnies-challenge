import { forwardRef } from 'react';
import { defaultButtonStyle } from './styles';

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'danger';

type ButtonProps = {
  variant?: ButtonVariant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'primary', ...rest }, ref) => {
    const classNameStyles = className || defaultButtonStyle(variant);
    return (
      <button className={classNameStyles} {...rest} ref={ref}>
        {children}
      </button>
    );
  },
);
