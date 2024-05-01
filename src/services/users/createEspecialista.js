import proxyBase from '../proxyBase';

export const createEspecialista = data => {
  return proxyBase()
    .post('/users/specialist', data)
    .then(result => result.data);
};
