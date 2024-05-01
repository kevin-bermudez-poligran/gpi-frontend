import proxyBase from '../proxyBase';

export const getSpecailistSchedulesBySpecialist = specialist => {
  return proxyBase()
    .get('/specialist-schedules/' + specialist)
    .then(result => result.data.data);
};
