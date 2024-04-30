import proxyBase from '../proxyBase';

export const requestDeleteAccount = user => {
  return proxyBase().post('/users/add-delete-account-request', {
    user
  });
};

export default requestDeleteAccount;
