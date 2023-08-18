import clsx from 'clsx';
import { ButtonVariant } from '.';

const DefaultButtonStyle = {
  primary: {
    container: `inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium bg-purple-700 text-gray-100`,
    hover: `hover:bg-purple-600`,
    border: `border border-transparent`,
    focus: `focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`,
  },
  secondary: {},
  outlined: {},
  danger: {
    container: `mr-2 inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium bg-red-700 text-gray-100`,
    hover: `hover:bg-red-600`,
    border: `border border-transparent`,
    focus: `focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75`,
  },
};

export const defaultButtonStyle = (variant: ButtonVariant) =>
  clsx(Object.values(DefaultButtonStyle[variant]));
