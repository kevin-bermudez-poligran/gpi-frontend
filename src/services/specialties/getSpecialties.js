import proxyBase from '../proxyBase';

export const getSpecialties = () => {
  return proxyBase()
    .get('/specialties')
    .then(result => result.data?.data);
};
