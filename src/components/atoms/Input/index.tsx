import { defaultInputStyle } from './styles';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...rest }: InputProps) => {
  const classNameStyles = className || defaultInputStyle;
  return <input className={classNameStyles} {...rest} />;
};
