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

export function removeAccents(letter: string) {
  return letter
    .toLowerCase()
    .replace(/á/g, 'a')
    .replace(/ã/g, 'a')
    .replace(/â/g, 'a')
    .replace(/à/g, 'a')
    .replace(/é/g, 'e')
    .replace(/ê/g, 'e')
    .replace(/è/g, 'e')
    .replace(/í/g, 'i')
    .replace(/î/g, 'i')
    .replace(/ì/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ô/g, 'o')
    .replace(/õ/g, 'o')
    .replace(/ò/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/û/g, 'u')
    .replace(/ù/g, 'u')
    .replace(/ç/g, 'c');
}
