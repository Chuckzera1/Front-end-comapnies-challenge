import clsx from 'clsx';

const MenuItemStyles = {
  container: 'px-3 py-2 text-sm rounded-md',
  text: 'text-sm font-medium',
  active: 'cursor-default bg-purple-700 text-white',
  inactive:
    'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-100',
};

export const menuItemStyles = (variant: 'active' | 'inactive') =>
  clsx(MenuItemStyles.container, MenuItemStyles.text, MenuItemStyles[variant]);
