import clsx from 'clsx';

const TableStyles = {
  container: 'w-full text-sm text-left text-gray-500 dark:text-gray-400',
  header:
    'text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-50 dark:bg-gray-700 dark:text-gray-400',
  body: {
    container:
      'bg-white border-b border-gray-300 bg-gray-100 dark:bg-gray-800 dark:border-gray-700',
    rowStrong:
      'px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white',
    edit: 'font-medium text-blue-600 dark:text-blue-500 hover:underline',
    remove: 'font-medium text-red-600 dark:text-red-500 hover:underline',
    relate: 'font-medium text-green-700 dark:text-purple-400 hover:underline',
  },
};

export const tableContainer = clsx(TableStyles.container);
export const tableHeader = clsx(TableStyles.header);
export const tableBody = clsx(TableStyles.body.container);
export const tableBodyRowStrong = clsx(TableStyles.body.rowStrong);
export const tableBodyEdit = clsx(TableStyles.body.edit);
export const tableBodyRemove = clsx(TableStyles.body.remove);
export const tableBodyRelate = clsx(TableStyles.body.relate);
