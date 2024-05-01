import proxyBase from '../proxyBase';

export const createToken = data => {
  return proxyBase().post('/users/login', data);
};

export default createToken;
