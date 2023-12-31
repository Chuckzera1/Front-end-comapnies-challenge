import clsx from 'clsx';

const DefaultInputStyle = {
  container: 'bg-gray-300 dark:bg-gray-800 px-4 py-2 rounded-md',
  placeHolder: 'placeholder:text-gray-700 dark:placeholder:text-gray-500',
};

export const defaultInputStyle = clsx(Object.values(DefaultInputStyle));
