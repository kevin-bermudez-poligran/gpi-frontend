import proxyBase from '../proxyBase';

export const getUsersByProfile = profile => {
  return proxyBase()
    .get('/users/' + profile)
    .then(result => result.data.data);
};
