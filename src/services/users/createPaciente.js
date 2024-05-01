import proxyBase from '../proxyBase';

export const createPaciente = data => {
  return proxyBase()
    .post('/users/patient', data)
    .then(result => result.data);
};
