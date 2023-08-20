export type SupplierDocumentType = 'cnpj' | 'cpf';

export type Supplier = {
  id: string;
  name: string;
  document: string;
  documentType: SupplierDocumentType;
  rg?: string;
  email: string;
  cep: string;
  birthDate: Date;
};
