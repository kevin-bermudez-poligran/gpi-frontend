import proxyBase from '../proxyBase';

export const createSuperUsuario = data => {
  return proxyBase()
    .post('/users/superadmin', data)
    .then(result => result.data);
};
