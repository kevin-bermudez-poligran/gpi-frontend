import proxyBase from '../proxyBase';

export const getSpecialistSchedulesBId = id => {
  return proxyBase()
    .get('/specialist-schedules-by-id/' + id)
    .then(result => result.data.data);
};
