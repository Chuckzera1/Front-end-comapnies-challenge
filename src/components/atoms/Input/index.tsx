import { forwardRef } from 'react';
import { defaultInputStyle } from './styles';
import InputMask from 'react-input-mask';

type InputProps = {
  mask?: string | (string | RegExp)[];
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, mask, error, ...rest }, ref) => {
    const classNameStyles = className || defaultInputStyle;
    return (
      <div className="block w-full min-w-[250px] flex-1">
        {mask ? (
          <InputMask mask={mask} {...rest}>
            <input className={classNameStyles} ref={ref} />
          </InputMask>
        ) : (
          <input className={classNameStyles} {...rest} ref={ref} />
        )}
        {error && (
          <span className="text-right text-red-500 block text-xs font-normal font-secondary mt-0.5">
            {error}
          </span>
        )}
      </div>
    );
  },
);
