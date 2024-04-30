import proxyBase from '../proxyBase';

export const createToken = ({ email, password }) => {
  return proxyBase().post('/access', { email, password });
};

export default createToken;
