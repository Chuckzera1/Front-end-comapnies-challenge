import { FormSupplierValues } from '../pages/Suppliers';
import { cepValidator } from '../services/validateCep';

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const validateCep = async (cep: string): Promise<boolean> => {
  try {
    const response = await cepValidator(cep);
    if (!response.ok) return false;
    const result = await response.json();
    if (Array.isArray(result)) return false;
    return true;
  } catch {
    return false;
  }
};

export const formatDataForCnpjSupplier = (values: FormSupplierValues) => {
  const cpfInputsNull: FormSupplierValues =
    values.documentType === 'cnpj'
      ? { ...values, rg: null, birthDate: null }
      : values;

  return cpfInputsNull;
};
