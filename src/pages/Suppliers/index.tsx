import clsx from 'clsx';
import { Input } from '../../components/atoms/Input';
import { DialogDemo } from '../../components/molecules/Dialog';
import { Table } from '../../components/molecules/Table';
import { mockedData } from '../Home';
import { Title } from '../../components/atoms/Title';

export const Suppliers = () => {
  return (
    <div className="flex flex-col gap-8 mb-6">
      <Title>Fornecedores</Title>
      <div className="flex justify-between">
        <Input placeholder="Pesquisar" />
        <DialogDemo
          buttonLabel="Novo Usuário"
          variant="saveOrCancel"
          title="Novo usuário"
          description="Adicionar usuário">
          <form className="mt-2 space-y-2">
            <fieldset>
              {/* <legend>Choose your favorite monster</legend> */}
              <label
                htmlFor="firstName"
                className="text-xs font-medium text-gray-700 dark:text-gray-400">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Tim"
                autoComplete="given-name"
                className={clsx(
                  'mt-1 block w-full rounded-md',
                  'text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600',
                  'border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800',
                  'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                )}
              />
            </fieldset>
            <fieldset>
              <label
                htmlFor="familyName"
                className="text-xs font-medium text-gray-700 dark:text-gray-400">
                Family Name
              </label>
              <input
                id="familyName"
                type="text"
                placeholder="Cook"
                autoComplete="family-name"
                className={clsx(
                  'mt-1 block w-full rounded-md',
                  'text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600',
                  'border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800',
                  'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                )}
              />
            </fieldset>
          </form>
        </DialogDemo>
      </div>
      <Table keys={Object.keys(mockedData[0])} data={mockedData} />
    </div>
  );
};
