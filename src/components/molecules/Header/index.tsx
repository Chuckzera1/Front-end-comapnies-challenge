import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { clsx } from 'clsx';
import { Outlet, useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate('/');
  };
  const handleNavigateToCompanies = () => {
    navigate('/companies');
  };
  const handleNavigateToSuppliers = () => {
    navigate('/suppliers');
  };

  return (
    <>
      <div className="flex justify-center mb-10">
        <NavigationMenuPrimitive.Root className="relative">
          <NavigationMenuPrimitive.List className="flex flex-row rounded-lg bg-white dark:bg-gray-800 p-2 space-x-2">
            <NavigationMenuPrimitive.Item asChild>
              <NavigationMenuPrimitive.Link
                onClick={handleNavigateToHome}
                className={clsx(
                  'px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-900',
                  'text-sm font-medium text-gray-700 dark:text-gray-100',
                  'active:bg-amber-500',
                )}>
                Home
              </NavigationMenuPrimitive.Link>
            </NavigationMenuPrimitive.Item>

            <NavigationMenuPrimitive.Item asChild>
              <NavigationMenuPrimitive.Link
                onClick={handleNavigateToCompanies}
                className={clsx(
                  'px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-900',
                  'text-sm font-medium text-gray-700 dark:text-gray-100',
                )}>
                Companies
              </NavigationMenuPrimitive.Link>
            </NavigationMenuPrimitive.Item>

            <NavigationMenuPrimitive.Item asChild>
              <NavigationMenuPrimitive.Link
                onClick={handleNavigateToSuppliers}
                className={clsx(
                  'px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-900',
                  'text-sm font-medium text-gray-700 dark:text-gray-100',
                )}>
                Suppliers
              </NavigationMenuPrimitive.Link>
            </NavigationMenuPrimitive.Item>

            <NavigationMenuPrimitive.Indicator
              className={clsx(
                'z-10',
                'top-[100%] flex items-end justify-center h-2 overflow-hidden',
                'radix-state-visible:animate-fade-in',
                'radix-state-hidden:animate-fade-out',
                'transition-[width_transform] duration-[250ms] ease-[ease]',
              )}>
              <div className="top-1 relative bg-white dark:bg-gray-800 w-2 h-2 rotate-45" />
            </NavigationMenuPrimitive.Indicator>
          </NavigationMenuPrimitive.List>

          <div
            className={clsx(
              'absolute flex justify-center',
              'w-[140%] left-[-20%] top-[100%]',
            )}
            style={{
              perspective: '2000px',
            }}>
            <NavigationMenuPrimitive.Viewport
              className={clsx(
                'relative mt-2 shadow-lg rounded-md bg-white dark:bg-gray-800 overflow-hidden',
                'w-radix-navigation-menu-viewport',
                'h-radix-navigation-menu-viewport',
                'radix-state-open:animate-scale-in-content',
                'radix-state-closed:animate-scale-out-content',
                'origin-[top_center] transition-[width_height] duration-300 ease-[ease]',
              )}
            />
          </div>
        </NavigationMenuPrimitive.Root>
      </div>
      <Outlet />
    </>
  );
};
