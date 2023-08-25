export type SupplierDocumentType = 'cnpj' | 'cpf';

export enum SupplierKeys {
  id = 'id',
  name = 'Nome',
  document = 'Documento',
  documentType = 'Tipo de Documento',
  rg = 'RG',
  email = 'E-mail',
  cep = 'CEP',
  birthDate = 'Data Nasc.',
}

export type Supplier = {
  id: string;
  name: string;
  document: string;
  documentType: SupplierDocumentType;
  rg?: string | null;
  email: string;
  cep: string;
  birthDate?: Date | null;
};
