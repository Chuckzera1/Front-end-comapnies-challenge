export enum CompanyKeysEnum {
  id = 'id',
  tradeName = 'Nome Fantasia',
  document = 'Documento',
  cep = 'CEP',
}

export type Company = {
  id: string;
  tradeName: string;
  document: string;
  cep: string;
};
