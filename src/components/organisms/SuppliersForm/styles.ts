import clsx from 'clsx';

const InputStyles = {
  container: 'mt-1 block w-full rounded-md py-2',
  text: 'text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600',
  border:
    'border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800',
  focus:
    'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
};

export const formInputStyles = clsx(InputStyles.border);
