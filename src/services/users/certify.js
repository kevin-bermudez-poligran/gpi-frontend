import proxyBase from '../proxyBase';

export const certify = ({ user, newStatus }) => {
  return proxyBase().post('/users/certify', {
    user,
    new_status: newStatus
  });
};
