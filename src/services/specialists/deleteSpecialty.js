import proxyBase from '../proxyBase';

export const deleteSpecialist = specialist => {
  return proxyBase()
    .delete('/users/specialist/' + specialist)
    .then(result => result.data?.data);
};
