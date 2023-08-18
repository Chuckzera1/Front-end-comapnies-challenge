import { defaultButtonStyle } from './styles';

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'danger';

type ButtonProps = {
  variant?: ButtonVariant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  className,
  variant = 'primary',
  ...rest
}: ButtonProps) => {
  const classNameStyles = className || defaultButtonStyle(variant);
  return (
    <button className={classNameStyles} {...rest}>
      {children}
    </button>
  );
};
