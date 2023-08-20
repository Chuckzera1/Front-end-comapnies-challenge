export const cepValidator = async (cep: string) => {
  const result = await fetch(`http://cep.la/${cep}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  return result;
};
