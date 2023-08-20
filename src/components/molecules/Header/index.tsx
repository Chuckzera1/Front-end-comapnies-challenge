import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { menuItemStyles } from './styles';
import { Button } from '../../atoms/button';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
              <Button
                onClick={handleNavigateToHome}
                disabled={location.pathname === '/'}
                className={menuItemStyles(
                  location.pathname === '/' ? 'active' : 'inactive',
                )}>
                Ínicio
              </Button>
            </NavigationMenuPrimitive.Item>

            <NavigationMenuPrimitive.Item asChild>
              <Button
                onClick={handleNavigateToCompanies}
                disabled={location.pathname === '/companies'}
                className={menuItemStyles(
                  location.pathname === '/companies' ? 'active' : 'inactive',
                )}>
                Empresas
              </Button>
            </NavigationMenuPrimitive.Item>

            <NavigationMenuPrimitive.Item asChild>
              <Button
                onClick={handleNavigateToSuppliers}
                disabled={location.pathname === '/suppliers'}
                className={menuItemStyles(
                  location.pathname === '/suppliers' ? 'active' : 'inactive',
                )}>
                Fornecedores
              </Button>
            </NavigationMenuPrimitive.Item>
          </NavigationMenuPrimitive.List>
        </NavigationMenuPrimitive.Root>
      </div>
      <Outlet />
    </>
  );
};
