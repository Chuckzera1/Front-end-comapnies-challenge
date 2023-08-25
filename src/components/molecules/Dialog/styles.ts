import clsx from 'clsx';

export const DialogueContent = clsx(
  'fixed z-50',
  'w-[95vw] max-w-3xl rounded-lg p-4 md:w-full',
  'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
  'bg-white dark:bg-gray-800',
  'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
);

export const DialogueClose = clsx(
  'absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1',
  'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
);
