import { Supplier } from './supplier';

export const CompanyKeys = {
  id: 'id',
  tradeName: 'Nome Fantasia',
  document: 'Documento',
  cep: 'CEP',
  suppliers: 'Fornecedores',
};

export const EditCompanySuppliersKeys = {
  id: 'id',
  name: 'Nome',
  document: 'Documento',
  documentType: 'Tipo de Documento',
  birthDate: 'Data Nasc.',
};

export type Company = {
  id: string;
  tradeName: string;
  document: string;
  cep: string;
  suppliers: Supplier[];
};
