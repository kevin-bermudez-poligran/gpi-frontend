import proxyBase from '../proxyBase';

export const install = data => {
  return proxyBase()
    .post('/system/install', data)
    .then(result => result.data);
};
