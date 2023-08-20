import { cepValidator } from '../services/validateCep';

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const validateCep = async (cep: string): Promise<boolean> => {
  try {
    const response = await cepValidator(cep);
    return response.ok;
  } catch {
    return false;
  }
};
