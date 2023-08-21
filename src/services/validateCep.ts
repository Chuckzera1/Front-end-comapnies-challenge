export const cepValidator = async (cep: string) => {
  const response = await fetch(`${import.meta.env.VITE_CEP_LA_URL}/${cep}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  return response;
};
