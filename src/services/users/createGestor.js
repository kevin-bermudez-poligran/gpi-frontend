import proxyBase from '../proxyBase';

export const createGestor = data => {
  return proxyBase()
    .post('/users/manager', data)
    .then(result => result.data);
};
