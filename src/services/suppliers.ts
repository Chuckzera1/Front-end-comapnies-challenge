import { Supplier } from '../types/entities/supplier';

export const listSuppliersRoute = async (searchTerm?: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/supplier${
      searchTerm ? `?searchTerm=${searchTerm}` : ''
    }`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
  );
  if (!response.ok)
    throw new Error('Um erro ocorreu ao tentar listar os Fornecedores');
  return (await response.json()) as Supplier[];
};

export const createSupplierRoute = async (supplier: Omit<Supplier, 'id'>) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/supplier`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(supplier),
    },
  );
  return response;
};
