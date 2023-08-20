import { forwardRef } from 'react';

type CheckBoxProps = {
  label: string;
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ label, id, ...rest }, ref) => {
    return (
      <div className="flex items-center mr-4">
        <input
          id={id}
          type="radio"
          className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          {...rest}
          ref={ref}
        />
        <label
          htmlFor={id}
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </label>
      </div>
    );
  },
);
