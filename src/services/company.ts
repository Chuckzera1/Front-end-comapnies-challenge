import { CompanyDTO } from '../types/DTO/company';
import { Company } from '../types/entities/company';

export const listCompaniesRoute = async (searchTerm?: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/company${
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
    throw new Error('Um erro ocorreu ao tentar listar as empresas');
  return (await response.json()) as Company[];
};

export const createCompanyRoute = async (company: Omit<CompanyDTO, 'id'>) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/company`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(company),
  });
  return response;
};

export const updateCompanyRoute = async (
  id: string,
  company: Omit<CompanyDTO, 'id'>,
) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/company/${id}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(company),
    },
  );
  return response;
};

export const removeCompanyRoute = async (id: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/company/${id}`,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    },
  );
  if (!response.ok)
    throw new Error('Um erro ocorreu ao tentar deletar a empresa');
  return;
};

export const vinculateSupplierToCompanyRoute = async (
  companyId: string,
  supplierId: string,
) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_BASE_API_URL
    }/company/${companyId}/relateSupplier/${supplierId}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    },
  );
  if (!response.ok)
    throw new Error('Um erro ocorreu ao tentar víncular fornecedor à empresa');
  return;
};
